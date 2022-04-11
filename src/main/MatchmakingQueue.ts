import { ObjectId } from 'mongodb';
import { EventEmitter } from 'events';
import { Socket } from 'socket.io';

/**
 * Object to go on the matchmaking queue
 * Keeps track of the client and a socket to communicate with them
 */
class UserSocketPair {
    public user: IUser;

    public socket: Socket;

    /**
     * Creates a new UserSocketPair
     * @param user - the user associated with the client
     * @param socket - the socket associated with the client
     */
    constructor(user: IUser, socket: Socket) {
        this.user = user;
        this.socket = socket;
    }
}

/**
 * A queue for the MatchmakingManager to pull players from
 */
class MatchmakingQueue {
    /**
     * internal array for queue
     */
    private queue: UserSocketPair[];

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
    public shift(): UserSocketPair {
        return this.queue.shift()!;
    }

    /**
     * @returns the first element of the internal array without removing it
     */
    public peek(): UserSocketPair {
        return this.queue[0]!;
    }

    /**
     * A wrapper for the internal array's push() method
     * @param item - the QueueMember to add to the queue
     */
    public push(item: UserSocketPair): number {
        const position = this.queue.push(item);
        this.event.emit('push');
        return position;
    }

    /**
     * Removes a UserSocketPair from the queue with the given id
     * @param uid - user id of UserSocketPair to remove from the queue
     */
    public removeById(uid: string) {
        this.queue.splice(
            this.queue.findIndex(item => item.user._id === new ObjectId(uid)),
            1,
        );
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
export { UserSocketPair };
