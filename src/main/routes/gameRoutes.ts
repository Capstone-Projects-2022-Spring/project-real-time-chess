import { ErrorAPIResponse } from '../APIResponse';
import GameHistoryDAO from '../dao/GameHistoryDAO';
import GameCreatedAPIResponse from '../GameCreatedAPIResponse';
import GameManager from '../GameManager';
import Logger from '../Logger';
import SupportedEmojis from '../SupportedEmojis';

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
    static createGame(req: CreateGameRequest, res: CreateGameResponse) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                const game = GameManager.createGame(user, req.body.cooldown);
                if (game) {
                    res.send(new GameCreatedAPIResponse(game.gameKey));
                    Logger.info(
                        `New game created\nUID: ${req.cookies.uid}\nGame Key: ${game.gameKey.map(
                            name => SupportedEmojis.find(e => e.name === name)?.emoji,
                        )}`,
                    );
                } else {
                    res.send(new ErrorAPIResponse('User not found.'));
                    Logger.warn(`User not found with uid: ${req.cookies.uid}`);
                }
            })
            .catch(err => {
                res.send(new ErrorAPIResponse(err));
                Logger.error(
                    `Error thrown in GameManager.verifyUserAccess (UID=${req.cookies.uid}, AUTH=${req.cookies.auth})\n\n${err}`,
                );
            });
    }

    /**
     * The handler for requests where a user joins a game.
     *
     * @param req - The express request object
     * @param res - The express response object
     */
    static joinGame(req: JoinGameRequest, res: JoinGameResponse) {
        GameManager.verifyUserAccess(req.cookies.uid, req.cookies.auth)
            .then(user => {
                if (user) {
                    const game = GameManager.findGameByKey(req.body.gameKey);
                    if (game) {
                        game.white = user;
                        game.addMessage({ message: `${user.name.first} joined the game.` });
                        res.send(new GameCreatedAPIResponse(game.gameKey));
                        Logger.info(`User (uid=${user._id}) joined game`);
                    } else {
                        res.send(new ErrorAPIResponse('Could not find game'));
                        Logger.warn(
                            `User (uid=${
                                req.cookies.uid
                            }) tried joining game, but none was found.\nGame Key: ${req.body.gameKey!.map(
                                name => SupportedEmojis.find(e => e.name === name)?.emoji,
                            )}`,
                        );
                    }
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
    static getHistory(req: GameHistoryAPIRequest, res: GameHistoryAPIResponse) {
        const dao = new GameHistoryDAO();
        dao.getAllGames(req.cookies.uid)
            .then(games => res.send(games))
            .catch(() => res.send(undefined));
    }
}

export default GameRoutes;
