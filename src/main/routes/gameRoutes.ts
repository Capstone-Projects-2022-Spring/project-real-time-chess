import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ErrorAPIResponse } from '../APIResponse';
import UserDAO from '../dao/UserDAO';
import GameCreatedAPIResponse from '../GameCreatedAPIResponse';
import GameManager from '../GameManager';
import GameMessagesAPIResponse from '../GameMessagesAPIResponse';

function createGame(req: Request, res: Response) {
    GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
        .then(user => {
            const game = GameManager.createGame(user);
            if (game) {
                res.send(new GameCreatedAPIResponse(game.gameKey));
            } else {
                res.send(new ErrorAPIResponse('User not found.'));
            }
        })
        .catch(err => {
            res.send(new ErrorAPIResponse(err));
        });
}

function joinGame(req: Request, res: Response) {
    const uid = new ObjectId(req.cookies.uid);
    GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
        .then(user => {
            const game = GameManager.findGameByUser(uid);
            if (game) {
                game.white = user;
                game.addMessage({ message: `${user.name.first} joined the game.` });
                res.send(new GameCreatedAPIResponse(game.gameKey));
            } else {
                res.send(new ErrorAPIResponse('Could not find game'));
            }
        })
        .catch(() => {
            res.send(new ErrorAPIResponse('Unknown Database Error'));
        });
}

function movePiece(req: Request, res: Response) {
    const dao = new UserDAO();
    const uid = new ObjectId(req.cookies.uid);
    dao.authenticateKey(uid, req.cookies.auth)
        .then(authorized => {
            if (authorized) {
                const game = GameManager.findGameByUser(uid);
                if (game) {
                    const { source, target } = req.body;
                    const move = game.move(source, target);
                    if (move) {
                        res.send({ success: true, move });
                    } else {
                        res.send(new ErrorAPIResponse('Invalid move'));
                    }
                } else {
                    res.send({
                        success: false,
                        error: new Error(`No game with user ${req.cookies.cookie}`),
                    });
                }
            } else res.send({ success: false, error: new Error('Invalid User') });
        })
        .catch(err => {
            res.send({ success: false, error: err });
        });
}

function getFEN(req: Request, res: Response) {
    const dao = new UserDAO();
    const uid = new ObjectId(req.cookies.uid);
    dao.authenticateKey(uid, req.cookies.auth)
        .then(authorized => {
            if (authorized) {
                const game = GameManager.findGameByUser(uid);
                if (game) {
                    res.send({ success: true, fen: game.fen });
                } else {
                    res.send({
                        success: false,
                        error: new Error(`No game with user ${uid}`),
                    });
                }
            } else res.send({ success: false, error: new Error('Invalid User') });
        })
        .catch(err => {
            res.send({ success: false, error: err });
        });
}

function getMessages(req: Request, res: Response) {
    const uid = new ObjectId(req.cookies.uid);
    const game = GameManager.findGameByUser(uid);
    if (game) {
        res.send(new GameMessagesAPIResponse(game.getMessages()));
    } else {
        res.send(new ErrorAPIResponse('Could not find game'));
    }
}

export { createGame, joinGame, movePiece, getFEN, getMessages };
