import MatchmakingQueue from './MatchmakingQueue';
import GameManager from './GameManager';
import UserDAO from './dao/UserDAO';
import Logger from './Logger';

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
        // this.listen(this.matchmakingQueue);
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
    async enqueue(userId: string): Promise<number> {
        const dao = new UserDAO();
        return new Promise<number>((resolve, reject) => {
            dao.retrieveUser(userId)
                .then(user => {
                    resolve(this.matchmakingQueue.push(user));
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * begin listening for matchmaking queue events
     */
    // private listen(queue: MatchmakingQueue): void {
    //     queue.event.on('push', () => {
    //         if (queue.length() >= 2) {
    //             const player1 = this.matchmakingQueue.shift();
    //             const game = GameManager.createGame(player1);
    //             const player2 = this.matchmakingQueue.shift();
    //             GameManager.joinGame(player2, game!.gameKey);
    //         }
    //     });
    // }

    /**
     * Attempts to pull 2 players off of the queue to create a game
     */
    public tryMatch() {
        if (this.matchmakingQueue.length() >= 2) {
            const player1 = this.matchmakingQueue.shift();
            Logger.debug(`Attempting to create a game with Player 1: (${player1._id})`);
            const game = GameManager.createGame(player1);
            const player2 = this.matchmakingQueue.shift();
            Logger.debug(`Attempting to join game with Player 2: (${player2._id})`);
            GameManager.joinGame(player2, game!.gameKey);
        }
    }
}
