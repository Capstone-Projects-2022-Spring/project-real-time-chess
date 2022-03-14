import * as express from 'express';
import { ErrorAPIResponse, GameCreatedResponse } from '../APIResponse';
import ChessGame from '../ChessGame';
import UserDAO from '../dao/UserDAO';

const gameRouter = express.Router();
const games: ChessGame[] = [];

gameRouter.post('/create', (req, res) => {
    const dao = new UserDAO();
    dao.findOne({ _id: req.cookies.uid })
        .then(user => {
            const game = new ChessGame();
            game.black = user;
            games.push(game);
            game.addMessage({
                message: `${user.username} created the game.`,
            });
            res.send(new GameCreatedResponse(game.gameKey));
        })
        .catch(() => {
            res.send(new ErrorAPIResponse('Could not find user'));
        });
});

gameRouter.post('/join', (req, res) => {
    const dao = new UserDAO();
    dao.findOne({ _id: req.cookies.uid })
        .then(user => {
            const game = games.find(game => game.gameKey === req.body.gameKey);
            if (game) {
                game.white = user;
                game.addMessage({ message: `${user.username} joined the game.` });
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
    dao.authenticateKey(req.cookies.uid, req.cookies.auth)
        .then(authorized => {
            if (authorized) {
                const game = games.find(game => game.black?._id === req.query?._id);
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

export default gameRouter;
