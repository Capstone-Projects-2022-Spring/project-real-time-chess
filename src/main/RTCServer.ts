import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import express = require('express');
import { Square } from 'chess.js';
import * as http from 'http';
import { ObjectId } from 'mongodb';
import * as path from 'path';
import { Server, Socket } from 'socket.io';
import { GameStateAPIResponse } from './APIResponse';
import DatabaseConnector from './dao/DatabaseConnector';
import ChessGame from './gameplay/ChessGame';
import GameManager from './gameplay/GameManager';
import GameSocketHandler from './gameplay/GameSocketHandler';
import MatchmakingManager from './gameplay/MatchmakingManager';
import apiRouter from './routes/apiRouter';
import Logger from './Logger';

/**
 * The RTCServer class is responsible for starting the server and handling
 * all incoming routes, along with distributing the workload of all incoming
 * API requests and WebSocket events.
 */
class RTCServer {
    private server: http.Server;

    private app: express.Express;

    private socketIO: Server;

    /**
     * Creates an instance of RTCServer.
     */
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.socketIO = new Server(this.server);

        DatabaseConnector.open();

        this.bindMiddleware();
        this.bindRoutes();

        this.app.set('view engine', 'pug');
    }

    /**
     * Binds all the middleware for the Realtime Chess server.
     */
    bindMiddleware() {
        this.app.use(express.static(path.resolve('./static/public')));

        this.app.use(bodyParser({ extended: true }));

        this.app.use(cookieParser());

        this.app.use((req, _, next) => {
            Logger.info(`${req.method} ${req.url} – [IP=${req.ip}] [UID=${req.cookies.uid}]`);
            next();
        });
    }

    /**
     * Binds all the routes for the Realtime Chess server.
     */
    bindRoutes() {
        this.app.use('/api', apiRouter);

        this.app.get('/', (_, res) => {
            res.render('index');
        });

        this.app.get('/logs', (_, res) => {
            res.sendFile(path.resolve('./server.log'));
        });

        this.socketIO.on('connection', (socket: Socket) => {
            socket.on('queue', (uid: string) => {
                const matchmakingManager = MatchmakingManager.instance();
                matchmakingManager
                    .enqueue(uid, socket)
                    .then(position => {
                        socket.emit('queue success', position);
                    })
                    .catch(() => {
                        socket.emit('queue failed');
                    })
                    .finally(() => matchmakingManager.tryMatch());
            });

            let uid: string;
            let game: ChessGame;

            socket.on(
                'authorize',
                (
                    _uid: string | ObjectId,
                    _auth: string,
                    callback?: (response: IGameStateAPIResponse) => void,
                ) => {
                    Logger.info(`Authorizing user\nUID: ${_uid}`);
                    uid = _uid.toString();
                    game = GameManager.findGameByUser(uid)!;
                    if (game) {
                        if (
                            game.black &&
                            typeof game.black !== 'string' &&
                            uid.toString() === game.black._id!.toString()
                        ) {
                            game.bindSocket({
                                black: socket,
                            });
                            Logger.info(`Authorized Socket Connection with:\nUID: ${uid}`);
                            callback?.(new GameStateAPIResponse(game));
                        } else if (
                            game.white &&
                            typeof game.white !== 'string' &&
                            uid.toString() === game.white._id!.toString()
                        ) {
                            game.bindSocket({
                                white: socket,
                            });
                            Logger.info(`Authorized Socket Connection with:\nUID: ${uid}`);
                            callback?.(new GameStateAPIResponse(game));
                        } else {
                            Logger.error(`No game found for user: ${uid}`);
                        }
                    } else {
                        Logger.warn(`No game found for specified user\nUID: ${uid}`);
                    }
                },
            );

            socket.on(
                'authorize-ai-v-ai',
                (
                    _uid: string | ObjectId,
                    _auth: string,
                    callback?: (response: IGameStateAPIResponse) => void,
                ) => {
                    Logger.info(`Authorizing user\nUID: ${_uid}`);
                    uid = _uid.toString();
                    game = RTCServer.authorizeUserWithAI(new ObjectId(_uid), socket, callback);
                },
            );

            socket.on(
                'authorize-single-player',
                (
                    _uid: string | ObjectId,
                    _auth: string,
                    callback?: (response: IGameStateAPIResponse) => void,
                ) => {
                    Logger.info(`Authorizing user\nUID: ${_uid}`);
                    uid = _uid.toString();
                    game = RTCServer.authorizeUserWithAI(new ObjectId(_uid), socket, callback);
                },
            );

            socket.on('game state', () => GameSocketHandler.onGameStateRequest(socket, game));

            socket.on('move piece', (source: Square, target: Square) =>
                GameSocketHandler.onMovePieceRequest(game, uid, source, target),
            );

            socket.on('move ai', () => GameSocketHandler.onAIMoveRequest(game, uid));

            socket.on('autopilot', (action: 'enable' | 'disable') => {
                if (action === 'enable') GameSocketHandler.enableAutopilot(game, uid);
                else if (action === 'disable') GameSocketHandler.disableAutopilot(game, uid);
            });
        });
    }

    /**
     * Authorizes a user with a socket
     *
     * @param uid - The user's ID
     */
    private static authorizeUserWithAI(
        uid: ObjectId,
        socket: ChessGameSocket,
        callback?: (response: GameStateAPIResponse) => void,
    ) {
        Logger.info(`Authorizing user\nUID: ${uid.toString()}`);
        const game = GameManager.findGameByOwner(uid)!;
        if (game) {
            game.bindSocket({
                black: socket,
            });
            Logger.info(`Authorized Socket Connection with:\nUID: ${uid}`);
            callback?.(new GameStateAPIResponse(game));
        } else {
            Logger.warn(`No game found for specified user\nUID: ${uid}`);
        }
        return game;
    }

    /**
     * Begins listening on the specified port. The port
     * is automatically specified based on the environment.
     * If an environment variable (`process.env.PORT`) is not
     * defined, then the default port (`3000`) is used.
     */
    listen() {
        const PORT = parseInt(process.env.PORT ?? '3000', 10);
        this.server.listen(PORT, () => {
            Logger.info(`
        ▢----------------------▢--------------------------▢
        | Field                | Value                    |
        ▢----------------------▢--------------------------▢
          Listening on PORT      ${PORT}
          Website                http://localhost:${PORT}
        ▢----------------------▢--------------------------▢`);
        });
    }

    /**
     * Kills the server. As a result, the server will no longer
     * listen for new requests.
     */
    kill() {
        this.server.close();
    }
}

export default RTCServer;
