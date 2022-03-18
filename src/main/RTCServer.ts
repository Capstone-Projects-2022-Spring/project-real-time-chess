import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import express = require('express');
import { Square } from 'chess.js';
import * as http from 'http';
import { ObjectId } from 'mongodb';
import * as path from 'path';
import { Server, Socket } from 'socket.io';
import { ErrorAPIResponse } from './APIResponse';
import ChessGame from './ChessGame';
import DatabaseConnector from './dao/DatabaseConnector';
import GameManager from './GameManager';
import GameStateAPIResponse from './GameStateAPIResponse';
import Logger from './Logger';
import apiRouter from './routes/apiRouter';

/**
 * The RTCServer class is responsible for starting the server and handling
 * all incoming routes, along with distributing the workload of all incoming
 * API requests and WebSocket events.
 */
class RTCServer {
    private server: http.Server;

    private app: express.Express;

    private PORT: number;

    private socketIO: Server;

    /**
     * Creates an instance of RTCServer.
     */
    constructor() {
        this.app = express();
        this.PORT = parseInt(process.env.PORT ?? '3000', 10);
        this.server = http.createServer(this.app);
        this.socketIO = new Server(this.server);

        DatabaseConnector.open();

        this.bindMiddleware();
        this.bindRoutes();

        this.app.set('view engine', 'pug');
    }

    bindMiddleware() {
        this.app.use(express.static(path.resolve('./static/public')));

        this.app.use(bodyParser({ extended: true }));

        this.app.use(cookieParser());

        this.app.use((req, _, next) => {
            Logger.info(`${req.method} ${req.url} – [IP=${req.ip}] [UID=${req.cookies.uid}]`);
            next();
        });
    }

    bindRoutes() {
        this.app.use('/api', apiRouter);

        this.app.get('/', (_, res) => {
            res.render('index');
        });

        this.app.get('/logs', (_, res) => {
            res.sendFile(path.resolve('./server.log'));
        });

        this.socketIO.on('connection', (socket: Socket) => {
            let uid: string;
            let auth: string;
            let game: ChessGame;

            setTimeout(() => {
                socket.emit('connection-success');
            }, 4000);

            socket.on('authorize', (_uid: string | ObjectId, _auth: string) => {
                Logger.info(`Authorizing user\nUID: ${_uid}`);
                uid = _uid.toString();
                auth = _auth;
                game = GameManager.findGameByUser(uid)!;
                if (game) {
                    if (game.black && uid.toString() === game.black._id!.toString()) {
                        game!.blackSocket = socket;
                        Logger.info(`Authorized Socket Connection with:\nUID: ${uid}`);
                    } else if (game.white && uid.toString() === game.white._id!.toString()) {
                        game!.whiteSocket = socket;
                        Logger.info(`Authorized Socket Connection with:\nUID: ${uid}`);
                    } else {
                        Logger.error(`No game found for user: ${uid}`);
                    }
                } else {
                    Logger.warn(`No game found for specified user\nUID: ${uid}`);
                }
            });

            socket.on('game state', () => {
                GameManager.verifyUserAccess(uid.toString(), auth!)
                    .then(user => {
                        if (user) {
                            if (game) {
                                socket.emit(
                                    'game state',
                                    new GameStateAPIResponse(
                                        game.fen,
                                        game.gameKey,
                                        game.getMessages(),
                                        {
                                            black: game.black,
                                            white: game.white,
                                        },
                                    ),
                                );
                                Logger.info(
                                    `Game State Request Successful\nUID: ${uid}\nFEN: ${
                                        game.fen
                                    }\n${game.getMessages().length} messages`,
                                );
                            } else {
                                socket.emit(
                                    'game state',
                                    new ErrorAPIResponse('Could not find game'),
                                );
                                Logger.warn(`Could not find game with user: ${uid}`);
                            }
                        }
                    })
                    .catch(err => {
                        socket.emit('game state', new ErrorAPIResponse(err));
                        Logger.error(
                            `Error thrown in GameManager.verifyUserAccess (UID=${uid}, AUTH=${auth})\n\n${err}`,
                        );
                    });
            });

            socket.on('move piece', (source: Square, target: Square) => {
                const move = game.move(source, target);
                if (move) {
                    if (game.turn === 'b') {
                        game.blackSocket!.emit('move piece', {
                            success: true,
                            gameKey: game.gameKey,
                            fen: game.fen,
                            messages: game.getMessages(),
                            players: {
                                black: game.black,
                                white: game.white,
                            },
                            move,
                        });
                    } else {
                        game.whiteSocket!.emit('move piece', {
                            success: true,
                            gameKey: game.gameKey,
                            fen: game.fen,
                            messages: game.getMessages(),
                            players: {
                                black: game.black,
                                white: game.white,
                            },
                            move,
                        });
                    }

                    Logger.info(
                        `User successfully made a move\nUID: ${uid}\nMove: ${JSON.stringify(
                            move,
                        )}\nFEN: ${game.fen}`,
                    );
                } else {
                    socket.broadcast.emit('move piece', new ErrorAPIResponse('Invalid move'));
                    Logger.info(
                        `User submitted an invalid move\nUID: ${uid}\nFrom: ${source}\nTo: ${target}\nFEN: ${game.fen}`,
                    );
                }
            });
        });
    }

    /**
     * Begins listening on the specified port. The port
     * is automatically specified based on the environment.
     * If an environment variable (`process.env.PORT`) is not
     * defined, then the default port (`3000`) is used.
     */
    listen() {
        this.server.listen(this.PORT, () => {
            Logger.info(`
        ▢----------------------▢--------------------------▢
        | Field                | Value                    |
        ▢----------------------▢--------------------------▢
          Listening on PORT      ${this.PORT}
          Website                http://localhost:${this.PORT}
        ▢----------------------▢--------------------------▢`);
        });
    }
}

export default RTCServer;
