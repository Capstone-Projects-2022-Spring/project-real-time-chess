import { ErrorAPIResponse } from '../APIResponse';
import Logger from '../Logger';
import MatchmakingManager from '../MatchmakingManager';
import MatchQueueAPIResponse from '../MatchQueueAPIResponse';
import GameManager from '../GameManager';
import MatchQueryAPIResponse from '../MatchQueryAPIResponse';

/**
 * Utility class for matchmaking routes
 */
class MatchRoutes {
    /**
     * Attempts to add client to the matchmaking queue
     * @param req - The express request object
     * @param res - The express reponse object
     */
    static queue(req: MatchQueueRequest, res: MatchQueueResponse) {
        const matchmakingManager = MatchmakingManager.instance();
        matchmakingManager
            .enqueue(req.body.uid)
            .then(position => {
                if (position) {
                    res.send(new MatchQueueAPIResponse(position));
                    Logger.debug(
                        `User with id (${req.body.uid}) placed in queue at position ${position}`,
                    );
                } else {
                    res.send(new ErrorAPIResponse('Failed to join queue.'));
                    Logger.debug(`Failed to place user with id (${req.body.uid}) on queue.`);
                }
            })
            .catch(() => {
                res.send(new ErrorAPIResponse('Failed to join queue.'));
                Logger.debug(
                    `Failed to resolve queue position for user with id (${req.body.uid}).`,
                );
            })
            .finally(() => matchmakingManager.tryMatch());
    }

    /**
     * Checks whether a game has been created for the player waiting in matchmaking
     * @param req - The express request object
     * @param res - The express reponse object
     */
    static query(req: MatchQueryRequest, res: MatchQueryResponse) {
        const game = GameManager.findGameByUser(req.body.uid);
        if (game) {
            res.send(new MatchQueryAPIResponse());
            Logger.debug(`Game found for user (${req.body.uid}).`);
        } else {
            res.send(
                new ErrorAPIResponse(
                    `Could not find game for user (${req.body.uid}). Matchmaking will continue.`,
                ),
            );
        }
    }
}

export default MatchRoutes;
