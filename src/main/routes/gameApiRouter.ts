import * as express from 'express';
import { ObjectId } from 'mongodb';
import { ErrorAPIResponse, GameCreatedResponse, GameMessagesResponse } from '../APIResponse';
import ChessGame from '../ChessGame';
import UserDAO from '../dao/UserDAO';

const gameRouter = express.Router();
const games: ChessGame[] = [];

gameRouter.post('/create', (req, res) => {
    const dao = new UserDAO();
    dao.findOne({ _id: new ObjectId(req.cookies.uid) })
        .then(user => {
            if (user) {
                const game = new ChessGame();
                game.black = user;
                games.push(game);
                game.addMessage({
                    message: `${user.name.first} created the game.`,
                });
                res.send(new GameCreatedResponse(game.gameKey));
            } else {
                res.send(new ErrorAPIResponse('User not found.'));
            }
        })
        .catch(err => {
            console.log(err);
            res.send(new ErrorAPIResponse(err));
        });
});

gameRouter.post('/join', (req, res) => {
    const dao = new UserDAO();
    dao.findOne({ _id: new ObjectId(req.cookies.uid) })
        .then(user => {
            const game = games.find(game => game.gameKey === req.body.gameKey);
            if (game) {
                game.white = user;
                game.addMessage({ message: `${user.name.first} joined the game.` });
                res.send(new GameCreatedResponse(game.gameKey));
            } else {
                res.send(new ErrorAPIResponse('Could not find game'));
            }
        })
        .catch(err => {
            res.send(new ErrorAPIResponse(err));
        });
});

gameRouter.post('/move', (req, res) => {
    const dao = new UserDAO();
    dao.authenticateKey(new ObjectId(req.cookies.uid), req.cookies.auth)
        .then(authorized => {
            if (authorized) {
                const game = games.find(game => game.black?._id?.equals(req.cookies.uid));
                if (game) {
                    game.move(req.body.from, req.body.to);
                    res.send({ success: true });
                } else {
                    res.send({
                        success: false,
                        error: new Error('No game with user ' + req.cookies.cookie),
                    });
                }
            } else res.send({ success: false, error: new Error('Invalid User') });
        })
        .catch(err => {
            res.send({ success: false, error: err });
        });
});

gameRouter.get('/messages', (req, res) => {
    const uid = new ObjectId(req.cookies.uid);
    console.log('UID', uid);
    console.log('GAMES', games);
    const game = games.find(game => game.black?._id?.equals(uid) || game.white?._id?.equals(uid));
    console.log('GAME', game);
    if (game) {
        res.send(new GameMessagesResponse(game.getMessages()));
    } else {
        res.send(new ErrorAPIResponse('Could not find game'));
    }
});

export default gameRouter;
