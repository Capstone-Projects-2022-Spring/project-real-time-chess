import { ErrorAPIResponse } from '../APIResponse';
import Logger from '../Logger';
import MatchmakingManager from '../MatchmakingManager';
import MatchQueueAPIResponse from '../MatchQueueAPIResponse';

/**
 * Utility class for matchmaking routes
 */
class MatchRoutes {
    /**
     *
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
}

export default MatchRoutes;
