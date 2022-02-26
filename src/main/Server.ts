import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import express = require('express');
import DatabaseConnector from './dao/DatabaseConnector';
import apiRouter from './routes/apiRouter';
import * as path from 'path';
import * as Error from './constants/Error';
import * as Event from './constants/Event';
import { createServer } from 'http';
import { Server } from 'socket.io';

interface GameLobby {
    roomKey: string;
    player1: string;
    player2: string;
}

export default class RTCServer {
    private app: express.Express;
    private PORT: number;
    private lobbies = new Map<string, GameLobby>();
    private httpServer = createServer(this.app);
    private io = new Server(httpServer);

    constructor() {
        this.app = express();
        this.PORT = parseInt(process.env.PORT ?? '3000');

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
            console.log('Connection made with client, Socket ID: ' + socket.id);
        });

        this.io.on(Event.CREATE_LOBBY, socket => {
            let key = '';
            do {
                for (let i = 0; i < 8; i++) {
                    key += Math.floor(Math.random() % 36);
                }
            } while (lobbies.has(key));
            socket.join(key);
            lobbies.set(key, {
                roomKey: key,
                player1: socket.id,
                player2: '',
            });
            io.to(socket.id).emit(Event.CREATE_LOBBY_SUCCESS);
        });

        io.on(Event.JOIN_LOBBY, (socket, roomKey) => {
            let currentLobby = lobbies.get(roomKey);
            if (currentLobby != undefined) {
                if (currentLobby.player2 === '') {
                    socket.join(roomKey);
                    currentLobby.player2 = socket.id;
                    io.to(socket.id).emit(Event.JOIN_LOBBY_SUCCESS);
                } else if (currentLobby.player1 === '') {
                    socket.join(roomKey);
                    currentLobby.player1 = socket.id;
                    io.to(socket.id).emit(Event.JOIN_LOBBY_SUCCESS);
                } else {
                    io.to(socket.id).emit(Event.JOIN_LOBBY_FAILED, Error.LOBBY_FULL_ERROR);
                }
            } else {
                io.to(socket.id).emit(Event.JOIN_LOBBY_FAILED, Error.LOBBY_CLOSED_ERROR);
            }
        });

        io.on(Event.LEAVE_LOBBY, (socket, roomKey) => {
            let currentLobby = lobbies.get(roomKey);
            if (currentLobby != undefined) {
                if (currentLobby.player1 === socket.id) {
                    currentLobby.player1 = '';
                }
                if (currentLobby.player2 === socket.id) {
                    currentLobby.player2 = '';
                }
                socket.leave(roomKey);
                if (currentLobby.player1 === '' && currentLobby.player2 === '') {
                    lobbies.delete(roomKey);
                }
            }
        });

        httpServer.listen(PORT, () => {
            console.log(`Listening on PORT: ${PORT}`);
        });
    }
}
