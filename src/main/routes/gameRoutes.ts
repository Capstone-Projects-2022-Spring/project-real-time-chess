import { Move, Square } from 'chess.js';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ErrorAPIResponse } from '../APIResponse';
import GameCreatedAPIResponse from '../GameCreatedAPIResponse';
import GameManager from '../GameManager';
import GameMessagesAPIResponse from '../GameMessagesAPIResponse';
import GameStateAPIResponse from '../GameStateAPIResponse';
import Logger from '../Logger';

/**
 * Utility class for all the game routes
 */
class GameRoutes {
    /**
     * The handler for requests where a game is created
     *
     * @param req - The express request object
     * @param res - The express response object
     */
    static createGame(
        req: Request<
            Record<string, never>,
            IGameCreatedAPIResponse | IErrorAPIResponse,
            Record<string, never>,
            Record<string, never>
        >,
        res: Response<IGameCreatedAPIResponse | IErrorAPIResponse>,
    ) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                const game = GameManager.createGame(user);
                if (game) {
                    res.send(new GameCreatedAPIResponse(game.gameKey));
                    Logger.info('New game created');
                } else {
                    res.send(new ErrorAPIResponse('User not found.'));
                    Logger.warn(`User not found with uid: ${req.cookies.uid}`);
                }
            })
            .catch(err => {
                res.send(new ErrorAPIResponse(err));
                Logger.error(`Error thrown in GameManager.verifyUserAccess: ${err}`);
            });
    }

    /**
     * The handler for requests where a user joins a game.
     *
     * @param req - The express request object
     * @param res - The express response object
     */
    static joinGame(
        req: Request<
            Record<string, never>,
            IGameCreatedAPIResponse | IErrorAPIResponse,
            Record<string, never>,
            Record<string, never>
        >,
        res: Response<IGameCreatedAPIResponse | IErrorAPIResponse>,
    ) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                const game = GameManager.findGameByUser(new ObjectId(req.cookies.uid));
                if (game) {
                    game.white = user;
                    game.addMessage({ message: `${user.name.first} joined the game.` });
                    res.send(new GameCreatedAPIResponse(game.gameKey));
                } else {
                    res.send(new ErrorAPIResponse('Could not find game'));
                }
            })
            .catch(err => {
                res.send(new ErrorAPIResponse('Unknown Database Error'));
                Logger.error(`Error thrown in GameManager.verifyUserAccess: ${err}`);
            });
    }

    /**
     * The handler for requests where a user moves a chessboard piece
     *
     * @param req - The express request object
     * @param res - The express response object
     */
    static movePiece(
        req: Request<
            Record<string, never>,
            (APIResponse & { move: Move }) | IErrorAPIResponse,
            { source: Square; target: Square },
            Record<string, never>
        >,
        res: Response<(APIResponse & { move: Move }) | IErrorAPIResponse>,
    ) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                if (user) {
                    const game = GameManager.findGameByUser(new ObjectId(req.cookies.uid));
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
                Logger.error(`Error thrown in GameManager.verifyUserAccess: ${err}`);
            });
    }

    /**
     * The handler for when the client requests the Forsyth-Edwards Notation.
     * This is used by ChessJS to configure the pieces on the board.
     *
     * @param req - The express request object
     * @param res - The express response object
     */
    static getFEN(
        req: Request<
            Record<string, never>,
            (APIResponse & { fen: string }) | IErrorAPIResponse,
            Record<string, never>,
            Record<string, never>
        >,
        res: Response<(APIResponse & { fen: string }) | IErrorAPIResponse>,
    ) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                if (user) {
                    const game = GameManager.findGameByUser(new ObjectId(req.cookies.uid));
                    if (game) {
                        res.send({ success: true, fen: game.fen });
                    } else {
                        res.send({
                            success: false,
                            error: new Error(`No game with user ${req.cookies.uid}`),
                        });
                    }
                } else res.send({ success: false, error: new Error('Invalid User') });
            })
            .catch(err => {
                res.send({ success: false, error: err });
                Logger.error(`Error thrown in GameManager.verifyUserAccess: ${err}`);
            });
    }

    /**
     * The handler for when the client requests the game messages.
     *
     * @param req - The express request object.
     * @param res - The express response object.
     */
    static getMessages(
        req: Request<
            Record<string, never>,
            IGameMessagesAPIResponse | IErrorAPIResponse,
            Record<string, never>,
            Record<string, never>
        >,
        res: Response<IGameMessagesAPIResponse | IErrorAPIResponse>,
    ) {
        const uid = new ObjectId(req.cookies.uid);
        const game = GameManager.findGameByUser(uid);
        if (game) {
            res.send(new GameMessagesAPIResponse(game.getMessages()));
        } else {
            res.send(new ErrorAPIResponse('Could not find game'));
        }
    }

    static getGameState(
        req: Request<
            Record<string, never>,
            IGameStateAPIResponse | IErrorAPIResponse,
            Record<string, never>,
            Record<string, never>
        >,
        res: Response<IGameStateAPIResponse | IErrorAPIResponse>,
    ) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                if (user) {
                    const game = GameManager.findGameByUser(new ObjectId(req.cookies.uid));
                    if (game) {
                        res.send(
                            new GameStateAPIResponse(game.fen, game.gameKey, game.getMessages(), {
                                black: game.black,
                                white: game.white,
                            }),
                        );
                    } else {
                        res.send(new ErrorAPIResponse('Could not find game'));
                    }
                }
            })
            .catch(err => {
                res.send(new ErrorAPIResponse(err));
                Logger.error(`Error thrown in GameManager.verifyUserAccess: ${err}`);
            });
    }
}

export default GameRoutes;
