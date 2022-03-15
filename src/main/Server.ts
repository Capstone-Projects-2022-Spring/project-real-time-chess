import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import express = require('express');
import * as http from 'http';
import * as path from 'path';
import { Server } from 'socket.io';
import * as Error from './constants/Error';
import * as Event from './constants/Event';
import DatabaseConnector from './dao/DatabaseConnector';
import Logger from './Logger';
import apiRouter from './routes/apiRouter';

/**
 * Type definition of a game lobby object.
 */
interface GameLobby {
    roomKey: string;
    player1: string;
    player2: string;
}

/**
 * The RTCServer class is responsible for starting the server and handling
 * all incoming routes, along with distributing the workload of all incoming
 * API requests and WebSocket events.
 */
export default class RTCServer {
    private app: express.Express;

    private PORT: number;

    private lobbies = new Map<string, GameLobby>();

    private httpServer: http.Server;

    private io: Server;

    /**
     * Creates an instance of RTCServer.
     */
    constructor() {
        this.app = express();
        this.PORT = parseInt(process.env.PORT ?? '3000', 10);
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer);

        DatabaseConnector.open();

        this.app.set('view engine', 'pug');

        this.app.use(express.static(path.resolve('./static/public')));
        this.app.use(bodyParser({ extended: true }));
        this.app.use(cookieParser());
        this.app.use('/api', apiRouter);

        this.app.get('/', (_, res) => {
            res.render('index');
        });
    }

    /**
     * Begins listening on the specified port. The port
     * is automatically specified based on the environment.
     * If an environment variable (`process.env.PORT`) is not
     * defined, then the default port (`3000`) is used.
     */
    listen() {
        //     this.app.listen(this.PORT, () => {
        //         console.log(`
        // ▢----------------------▢--------------------------▢
        // | Field                | Value                    |
        // ▢----------------------▢--------------------------▢
        //   Listening on PORT      ${this.PORT}
        //   Website                http://localhost:${this.PORT}
        // ▢----------------------▢--------------------------▢`);
        //     });
        this.io.on('connection', socket => {
            Logger.info(`Connection made with client, Socket ID: ${socket.id}`);
        });

        this.io.on(Event.CREATE_LOBBY, socket => {
            let key = '';
            do {
                for (let i = 0; i < 8; i++) {
                    key += Math.floor(Math.random() % 36);
                }
            } while (this.lobbies.has(key));
            socket.join(key);
            this.lobbies.set(key, {
                roomKey: key,
                player1: socket.id,
                player2: '',
            });
            this.io.to(socket.id).emit(Event.CREATE_LOBBY_SUCCESS);
        });

        this.io.on(Event.JOIN_LOBBY, (socket, roomKey) => {
            const currentLobby = this.lobbies.get(roomKey);
            if (currentLobby !== undefined) {
                if (currentLobby.player2 === '') {
                    socket.join(roomKey);
                    currentLobby.player2 = socket.id;
                    this.io.to(socket.id).emit(Event.JOIN_LOBBY_SUCCESS);
                } else if (currentLobby.player1 === '') {
                    socket.join(roomKey);
                    currentLobby.player1 = socket.id;
                    this.io.to(socket.id).emit(Event.JOIN_LOBBY_SUCCESS);
                } else {
                    this.io.to(socket.id).emit(Event.JOIN_LOBBY_FAILED, Error.LOBBY_FULL_ERROR);
                }
            } else {
                this.io.to(socket.id).emit(Event.JOIN_LOBBY_FAILED, Error.LOBBY_CLOSED_ERROR);
            }
        });

        this.io.on(Event.LEAVE_LOBBY, (socket, roomKey) => {
            const currentLobby = this.lobbies.get(roomKey);
            if (currentLobby !== undefined) {
                if (currentLobby.player1 === socket.id) {
                    currentLobby.player1 = '';
                }
                if (currentLobby.player2 === socket.id) {
                    currentLobby.player2 = '';
                }
                socket.leave(roomKey);
                if (currentLobby.player1 === '' && currentLobby.player2 === '') {
                    this.lobbies.delete(roomKey);
                }
            }
        });

        this.httpServer.listen(this.PORT, () => {
            Logger.info(`Listening on PORT: ${this.PORT}`);
        });
    }
}
