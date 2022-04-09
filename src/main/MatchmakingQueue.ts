import { EventEmitter } from 'events';
import { IUser } from './dao/UserDAO';

/**
 * A queue for the MatchmakingManager to pull players from
 */
class MatchmakingQueue {
    /**
     * internal array for queue
     */
    private queue: IUser[];

    /**
     * event emitter for broadcasting matchmaking queue events
     */
    public event: EventEmitter;

    /**
     * creates instance of matchmaking queue
     */
    constructor() {
        this.queue = [];
        this.event = new EventEmitter();
    }

    /**
     * A wrapper for the internal array's shift() method
     * @returns the first member of the queue and removes it
     */
    public shift(): IUser {
        return this.queue.shift()!;
    }

    /**
     * @returns the first element of the internal array without removing it
     */
    public peek(): IUser {
        return this.queue[0]!;
    }

    /**
     * A wrapper for the internal array's push() method
     * @param item - the QueueMember to add to the queue
     */
    public push(item: IUser): number {
        const position = this.queue.push(item);
        this.event.emit('push');
        return position;
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
}

export default MatchmakingQueue;
