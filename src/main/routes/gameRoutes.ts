import { ErrorAPIResponse, GameCreatedAPIResponse, GameFoundAPIResponse } from '../APIResponse';
import GameHistoryDAO from '../dao/GameHistoryDAO';
import ChessGame from '../gameplay/ChessGame';
import GameManager from '../gameplay/GameManager';
import Logger from '../Logger';
import SupportedEmojis from '../SupportedEmojis';

/**
 * Utility class for all the game routes
 */
class GameRoutes {
    /**
     * Handles responding to any kind of create game request.
     *
     * @param game - The gmae that was created.
     * @param req - The API request object. (Provided by ExpressJS)
     * @param res - The API response object. (Provided by ExpressJS)
     */
    private static onGameCreated(game: ChessGame | null, req: Req, res: Res) {
        if (game) {
            res.send(new GameCreatedAPIResponse(game.gameKey));
            Logger.info(
                `New game created\nUID: ${req.cookies.uid}\nGame Key: ${game.gameKey.map(
                    name => SupportedEmojis.find(e => e.name === name)?.emoji,
                )}`,
            );
        } else {
            GameRoutes.onGameNotCreated(new Error('Game could not be created.'), req, res);
        }
    }

    /**
     * Handles response to a game created request when there was an
     * error creating the game.
     *
     * @param error - The error that was raised.
     * @param req - The API request object. (Provided by ExpressJS)
     * @param res - The API response object. (Provided by ExpressJS)
     */
    private static onGameNotCreated(err: Error, req: Req, res: Res) {
        res.send(new ErrorAPIResponse(err));
        Logger.error(
            `Error thrown in GameManager.verifyUserAccess (UID=${req.cookies.uid}, AUTH=${req.cookies.auth})\n\n${err}`,
        );
    }

    /**
     * The handler for requests where a game is created
     *
     * @param req - The express request object
     * @param res - The express response object
     */
    static createGame(req: Req, res: Res) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                Logger.debug(`User specified cooldown: ${req.body.cooldown}`);
                const game = GameManager.createGame(user, req.body.cooldown ?? 5);
                GameRoutes.onGameCreated(game, req, res);
            })
            .catch(err => GameRoutes.onGameNotCreated(err, req, res));
    }

    /**
     * Handles requests to create an AI v AI game
     *
     * @param req - The create game request
     * @param res - A response object which will be sent to the client with the game key
     */
    static createAIvAIGame(req: Req, res: Res) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                const game = GameManager.createAIvAIGame(user, +req.body.bot1, +req.body.bot2);
                GameRoutes.onGameCreated(game, req, res);
            })
            .catch(err => GameRoutes.onGameNotCreated(err, req, res));
    }

    /**
     * Handles requests to create a single-player AI game
     *
     * @param req - The create game request
     * @param res - A response object which will be sent to the client with the game key
     */
    static createSinglePlayerGame(req: Req, res: Res) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                const game = GameManager.createSinglePlayerGame(user, +req.body.bot);
                GameRoutes.onGameCreated(game, req, res);
            })
            .catch(err => GameRoutes.onGameNotCreated(err, req, res));
    }

    /**
     * The handler for requests where a user joins a game.
     *
     * @param req - The express request object
     * @param res - The express response object
     */
    static joinGame(req: Req, res: Res) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                if (user) {
                    const game = GameManager.joinGame(user, req.body.gameKey);
                    if (game) res.send({ success: true, gameKey: game.gameKey });
                    else res.send({ success: false });
                } else {
                    res.send(new ErrorAPIResponse('Invalid User'));
                    Logger.warn(
                        `User Not Found\nUID: ${req.cookies.uid}\nAUTH: ${req.cookies.auth}`,
                    );
                }
            })
            .catch(err => {
                res.send(new ErrorAPIResponse('Unknown Database Error'));
                Logger.error(
                    `Error thrown in GameManager.verifyUserAccess (UID=${req.cookies.uid}, AUTH=${req.cookies.auth})\n\n${err}`,
                );
            });
    }

    /**
     * Retrieves a list of games that belong to a specified user
     *
     * @param req - The express request object
     * @param res - The express response object
     */
    static getHistory(req: Req, res: Res) {
        const dao = new GameHistoryDAO();
        dao.getAllGames(req.cookies.uid)
            .then(games => res.send(games))
            .catch(() => res.send(undefined));
    }

    /**
     * Returns an object containing the uids of the white and black players from a recent game
     * @param req - The express request object
     * @param res - The express response object
     */
    static getRecent(req: Req, res: Res) {
        const game = GameManager.findGameByUser(req.cookies.uid);
        if (game) {
            const white = typeof game.white !== 'string' ? game.white?._id : game.white;
            const black = typeof game.black !== 'string' ? game.black?._id : game.black;
            res.send(new GameFoundAPIResponse(String(white), String(black)));
        } else {
            res.send(new ErrorAPIResponse('No game found.'));
            Logger.error(`Error thrown in GameManager.FindGameByUser (UID=${req.cookies.uid})`);
        }
    }
}

export default GameRoutes;
