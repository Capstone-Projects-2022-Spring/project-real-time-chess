import EventEmitter from 'events';

interface QueueMember {
    playerId: import('mongodb').ObjectId;
    skillRating: number;
}

/**
 * A queue for the MatchmakingManager to pull players from
 */
class MatchmakingQueue {
    /**
     * internal array for queue
     */
    private queue: QueueMember[];
    /**
     * time since last player was popped off of the queue
     */
    private timeSinceLastMatch;
    /**
     * event emitter for broadcasting matchmaking queue events
     */
    private eventEmitter;
    /**
     * max queue time, lets manager know if queue needs to be switched
     */
    private static readonly MAX_QUEUE_TIME = 60;
    /**
     * creates instance of matchmaking queue
     */
    constructor() {
        this.queue = [];
        this.timeSinceLastMatch = 0;
        this.eventEmitter = new EventEmitter();
    }

    /**
     * A wrapper for the internal array's shift() method
     * @returns the first member of the queue and removes it
     */
    public shift(): () => QueueMember | undefined {
        this.setTimer();
        return this.queue.shift;
    }

    /**
     * @returns the first element of the internal array without removing it
     */
    public peek(): QueueMember {
        return this.queue[0];
    }

    /**
     * A wrapper for the internal array's push() method
     * @param item the QueueMember to add to the queue
     */
    public push(item: QueueMember): void {
        this.queue.push(item);
        this.eventEmitter.emit('push', this);
    }

    /**
     * @returns true if the queue is empty
     */
    public empty(): boolean {
        return this.queue.length === 0;
    }

    /**
     * @returns the length of the internal array
     */
    public length(): number {
        return this.queue.length;
    }

    /**
     * Increments time since last match
     */
    private setTimer() {
        this.timeSinceLastMatch = 0;
        setInterval(() => {
            this.timeSinceLastMatch += 1;
            if (this.timeSinceLastMatch >= 60) {
                this.eventEmitter.emit('maxtime', this);
                this.timeSinceLastMatch = 0;
            }
        }, 1000);
    }

    /**
     * @returns time since last match
     */
    get time() {
        return this.timeSinceLastMatch;
    }
}

export { MatchmakingQueue, QueueMember };
