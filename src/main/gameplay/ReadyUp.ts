import { Socket } from 'socket.io';
import { EventEmitter } from 'events';

/**
 * A class for tracking whether both players matched by the matchmaking manager are ready
 */
class ReadyUp {
    /**
     * number of players that have readied up
     */
    public count: number;

    /**
     * the socket for communication with player 1
     */
    public blackSocket: Socket;

    /**
     * the socket for communication with player 2
     */
    public whiteSocket: Socket;

    /**
     * id number of ready up room
     */
    public id: number;

    /**
     * Event emitter used to tell matchmaking manager when both players have readied up
     */
    public event: EventEmitter;

    /**
     * Creates a new ReadyUp object
     * @param id - id number
     * @param blackSocket - socket for player 1
     * @param whiteSocket - socket for player 2
     */
    constructor(id: number, blackSocket: Socket, whiteSocket: Socket) {
        this.count = 0;
        this.event = new EventEmitter();
        this.id = id;
        this.blackSocket = blackSocket;
        this.whiteSocket = whiteSocket;

        blackSocket.once('ready', () => {
            this.increment();
            this.tryReady();
        });
        whiteSocket.once('ready', () => {
            this.increment();
            this.tryReady();
        });

        blackSocket.once('disconnect', () => {
            whiteSocket.emit('requeue');
            this.event.emit('remove', this.id);
        });
        whiteSocket.once('disconnect', () => {
            blackSocket.emit('requeue');
            this.event.emit('remove', this.id);
        });
    }

    /**
     * Increment the ready counter and update the client
     */
    private increment() {
        this.count++;
        this.blackSocket.emit('ready clicked', this.count);
        this.whiteSocket.emit('ready clicked', this.count);
    }

    /**
     * Check if both players are ready
     */
    private tryReady() {
        if (this.count >= 2) {
            this.blackSocket.emit('start');
            this.whiteSocket.emit('start');
            this.blackSocket.removeAllListeners();
            this.whiteSocket.removeAllListeners();
            this.event.emit('remove', this.id);
        }
    }
}

export default ReadyUp;
