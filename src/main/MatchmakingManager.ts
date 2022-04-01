import { MatchmakingQueue } from './MatchmakingQueue';

/**
 * class for managing matchmaking queues
 */
export default class MatchmakingManager {
    /**
     * for players with win loss ratios above 1.2
     */
    private highSkillQueue: MatchmakingQueue;

    /**
     * for players with win loss ratios between 0.8 and 1.2
     */
    private averageSkillQueue: MatchmakingQueue;

    /**
     * for players with win loss ratios below 0.8
     */
    private lowSkillQueue: MatchmakingQueue;

    /**
     * instantiates a matchmaking manager and sets it to listen for queue events
     */
    constructor() {
        this.highSkillQueue = new MatchmakingQueue();
        this.averageSkillQueue = new MatchmakingQueue();
        this.lowSkillQueue = new MatchmakingQueue();
        this.listen(this.highSkillQueue);
        this.listen(this.averageSkillQueue);
        this.listen(this.lowSkillQueue);
    }

    /**
     * places the player in a queue based on their win loss ratio
     * @param user - user requesting matchmaking
     */
    public enqueue(user: IUser): void {
        const skr = user.wins / user.losses;
        const player = {
            playerId: user._id,
            skillRating: skr,
        };
        if (skr < 0.8) {
            this.lowSkillQueue.push(player);
        } else if (skr > 1.2) {
            this.highSkillQueue.push(player);
        } else {
            this.averageSkillQueue.push(player);
        }
    }

    /**
     * begin listening for matchmaking queue events
     */
    private listen(queue: MatchmakingQueue): void {
        queue.event.on('push', () => {
            if (queue.length() >= 2) {
                // pop 2 players and create a game
            }
        });
        queue.event.on('maxtime', queue => {
            this.averageSkillQueue.push(queue.shift());
        });
    }
}
