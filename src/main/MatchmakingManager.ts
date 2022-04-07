import MatchmakingQueue from './MatchmakingQueue';
import GameManager from './GameManager';
import UserDAO from './dao/UserDAO';

/**
 * class for managing matchmaking queues
 * use instance() to get singleton instance
 */
export default class MatchmakingManager {
    /**
     * singleton instance of MatchmakingManager
     */
    private static singleton: MatchmakingManager;

    /**
     * the queue for players looking for matches
     */
    private matchmakingQueue: MatchmakingQueue;

    /**
     * instantiates a matchmaking manager and sets it to listen for queue events
     * use instance() to return singleton instance
     */
    private constructor() {
        this.matchmakingQueue = new MatchmakingQueue();
        this.listen(this.matchmakingQueue);
    }

    /**
     * @returns a singleton instance of MatchmakingManager
     */
    public static instance(): MatchmakingManager {
        if (MatchmakingManager.singleton === undefined || MatchmakingManager.singleton === null) {
            MatchmakingManager.singleton = new MatchmakingManager();
        }
            return MatchmakingManager.singleton;
    }

    /**
     * places the player in a queue based on their win loss ratio
     * @param userId - id of user requesting matchmaking
     */
    async enqueue(userId: string): Promise<void> {
        const dao = new UserDAO();
        const user = await dao.retrieveUser(userId);
        this.matchmakingQueue.push(user);;
    }

    /**
     * begin listening for matchmaking queue events
     */
    private listen(queue: MatchmakingQueue): void {
        queue.event.on('push', () => {
            if (queue.length() >= 2) {
                const player1 = this.matchmakingQueue.shift();
                const game = GameManager.createGame(player1);
                const player2 = this.matchmakingQueue.shift();
                GameManager.joinGame(player2, game!.gameKey);
            }
        });
    }
}
