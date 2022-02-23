import * as express from 'express';
import * as path from 'path';
import DatabaseConnector from './dao/DatabaseConnector';
import UserDAO from './dao/UserDAO';
import * as Event from './constants/Event';
import * as Error from './constants/Error';

// import required to integrate socket.io
import { createServer } from "http";
import { Server } from "socket.io";

interface GameLobby {
    roomKey: string,
    player1: string,
    player2: string
}

const lobbies = new Map<string,GameLobby>();

const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// init server using socket.io
// server is created here instead of using app.listen(...)
const httpServer = createServer(app);
const io = new Server(httpServer);

DatabaseConnector.open();

app.use(express.static(path.resolve('./static/public')));
app.use(bodyParser({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (_, res) => {
    res.render('index');
});

app.post('/api/user/create', (req, res) => {
    const dao = new UserDAO();
    dao.createUser(req.body)
        .then(() =>
            res.send({
                success: true,
            })
        )
        .catch(error =>
            res.send({
                success: false,
                error,
            })
        );
});

io.on("connection", (socket) => {
    console.log("Connection made with client, Socket ID: " + socket.id);
});

io.on(Event.CREATE_LOBBY, (socket) => {
    let key = '';
    do {
        for (let i = 0; i < 8; i++) {
            key += Math.floor(Math.random()%36);
        }
    } while (lobbies.has(key));
    socket.join(key);
    lobbies.set(key, {
        roomKey: key,
        player1: socket.id,
        player2: ''
    });
    io.to(socket.id).emit(Event.CREATE_LOBBY_SUCCESS);
});

io.on(Event.JOIN_LOBBY, (socket, roomKey) => {
    let currentLobby = lobbies.get(roomKey);
    if (currentLobby != undefined) {
        if (currentLobby.player2 === ''){
            socket.join(roomKey);
            currentLobby = socket.id;
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