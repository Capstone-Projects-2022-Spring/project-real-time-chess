import * as express from 'express';
import { GameCreatedResponse } from '../APIResponse';
import ChessGame from '../ChessGame';
import UserDAO from '../dao/UserDAO';

const gameRouter = express.Router();
const games: ChessGame[] = [];

gameRouter.post('/create', (req, res) => {
    const dao = new UserDAO();
    dao.findOne({ _id: req.query.uid }).then(user => {
        const game = new ChessGame();
        game.black = user;
        games.push(game);
        res.send(new GameCreatedResponse(['bruh']));
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
