import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import express = require('express');
import * as path from 'path';
import DatabaseConnector from './dao/DatabaseConnector';
import Logger from './Logger';
import apiRouter from './routes/apiRouter';
import * as http from 'http';
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
import { ObjectId } from 'mongodb';
import { ErrorAPIResponse } from './APIResponse';
import GameManager from './GameManager';
import GameStateAPIResponse from './GameStateAPIResponse';

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
            let cookies: { [key: string]: string };

            if (typeof socket.handshake.headers.cookie === 'string') {
                cookies = cookie.parse(socket.handshake.headers.cookie);
            } else {
                cookies = {};
            }

            Logger.info(`Opened Socket Connection with:\nUID: ${cookies.uid}`);

            socket.on('game state', () => {
                GameManager.verifyUserAccess(cookies.uid!, cookies.auth!)
                    .then(user => {
                        if (user) {
                            const game = GameManager.findGameByUser(new ObjectId(cookies.uid));
                            if (game) {
                                socket.broadcast.emit(
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
                                    `Game State Request Successful\nUID: ${cookies.uid}\nFEN: ${
                                        game.fen
                                    }\n${game.getMessages().length} messages`,
                                );
                            } else {
                                socket.broadcast.emit(
                                    'game state',
                                    new ErrorAPIResponse('Could not find game'),
                                );
                                Logger.warn(`Could not find game with user: ${cookies.uid}`);
                            }
                        }
                    })
                    .catch(err => {
                        socket.broadcast.emit('game state', new ErrorAPIResponse(err));
                        Logger.error(
                            `Error thrown in GameManager.verifyUserAccess (UID=${cookies.uid}, AUTH=${cookies.auth})\n\n${err}`,
                        );
                    });
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
