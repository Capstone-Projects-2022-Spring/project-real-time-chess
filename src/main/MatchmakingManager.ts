import { Socket } from 'socket.io';
import MatchmakingQueue, { UserSocketPair } from './MatchmakingQueue';
import GameManager from './GameManager';
import UserDAO from './dao/UserDAO';
import Logger from './Logger';
import ReadyUp from './ReadyUp';

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
     * list of all ready up objects
     * ready up objects are created when a match is made
     */
    private readyUpList: ReadyUp[];

    /**
     * the next id to give out to a new ready up object
     */
    private nextId: number;

    /**
     * instantiates a matchmaking manager and sets it to listen for queue events
     * use instance() to return singleton instance
     */
    private constructor() {
        this.matchmakingQueue = new MatchmakingQueue();
        this.readyUpList = [];
        this.nextId = 0;
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
     * @param socket - socket for communication with the client
     */
    async enqueue(userId: string, socket: Socket): Promise<number> {
        const dao = new UserDAO();
        return new Promise<number>((resolve, reject) => {
            dao.retrieveUser(userId)
                .then(user => {
                    resolve(this.matchmakingQueue.push(new UserSocketPair(user, socket)));
                })
                .catch(() => {
                    reject();
                })
                .finally(() =>
                    socket.on('disconnect', () => {
                        this.matchmakingQueue.removeById(userId);
                    }),
                );
        });
    }

    /**
     * Attempts to pull 2 players off of the queue to create a game
     */
    public tryMatch() {
        if (this.matchmakingQueue.length() >= 2) {
            const player1 = this.matchmakingQueue.shift();
            Logger.debug(`Attempting to create a game with Player 1: (${player1.user._id})`);
            const game = GameManager.createGame(player1.user, 5);
            const player2 = this.matchmakingQueue.shift();
            Logger.debug(`Attempting to join game with Player 2: (${player2.user._id})`);
            GameManager.joinGame(player2.user, game!.gameKey);

            player1.socket.emit('match found', 'b');
            player2.socket.emit('match found', 'w');

            const readyUp = new ReadyUp(this.nextId, player1.socket, player2.socket);
            this.readyUpList.push(readyUp);
            readyUp.event.on('remove', (id: number) => {
                this.readyUpList.splice(
                    this.readyUpList.findIndex(el => el.id === id),
                    1,
                );
            });
        }
    }
}
