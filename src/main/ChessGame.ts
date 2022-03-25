import { Chess, ChessInstance, Move, Square } from 'chess.js';
import { IUser } from './dao/UserDAO';
import GameStateAPIResponse from './GameStateAPIResponse';
import Cooldown from './Cooldown';

/**
 * A wrapper class for a ChessJS game to work with Real-time Chess.
 */
class ChessGame {
    /**
     * The game key used for both players to identify the game before it starts.
     */
    public gameKey: string[];

    /**
     * The IUser object representing the black player.
     */
    public black?: IUser;

    /**
     * The IUser object representing the white player.
     */
    public white?: IUser;

    /**
     * The web socket for the black player.
     */
    public blackSocket?: ChessGameSocket;

    /**
     * The web socket for the white player.
     */
    public whiteSocket?: ChessGameSocket;

    /**
     * The chess.js game instance
     */
    private game: ChessInstance;

    /**
     * A list of all the game messages.
     */
    private messages: IGameMessage[];

    /**
     * An array of all active cooldown timers
     */
    public cooldownMap: Map<Square, Cooldown>;

    /**
     * Time before a recently moved piece may be moved again
     */
    public static readonly COOLDOWN_TIME = 5;

    /**
     * Creates an instance of ChessGame.
     */
    constructor(gameKey: string[]) {
        this.game = new Chess();
        this.gameKey = gameKey;
        this.messages = [];
        this.cooldownMap = new Map();
    }

    /**
     * Adds a message to the list of messages associated with this game.
     * All messages are added to the end of the array.
     *
     * @param message - The IGameMessage object to add. The only required field is
     * `{ message: string }`, however, additional fields can be added for
     * different types of messages (which will be handled by the front-end).
     */
    public addMessage(message: IGameMessage) {
        this.messages.push(message);
        this.blackSocket?.emit(
            'game state',
            new GameStateAPIResponse(this.game.fen(), this.gameKey, this.messages, {
                black: this.black,
                white: this.white,
            }),
        );
        this.whiteSocket?.emit(
            'game state',
            new GameStateAPIResponse(this.game.fen(), this.gameKey, this.messages, {
                black: this.black,
                white: this.white,
            }),
        );
    }

    /**
     * @returns The array of messages associated with this game.
     */
    public getMessages(): IGameMessage[] {
        return this.messages;
    }

    /**
     * Retrieves the Forsyth-Edwards Notation (FEN) string for the current game.
     * This used the chess.js library to generate the FEN string. For the purpose
     * of this product, the FEN strings are ONLY handled by ChessJS and not RTC.
     */
    public get fen(): string {
        return this.game.fen();
    }

    /**
     * Move a piece from a source square to a target square.
     *
     * @param source - The square which the piece is currently located.
     * @param target - The square which the piece is moving to.
     * @returns A chess.js Move object if the move is valid.
     * If an invalid move (source to target) is attempted, then `null` is returned.
     */
    move(source: Square, target: Square): Move | null {
        let move;
        const cooldown = this.cooldownMap.get(source);
        if (this.game.turn() === 'b' && (cooldown === undefined || cooldown.ready())) {
            move = this.game.move(`${source}-${target}`, { sloppy: true });
            this.cooldownMap.delete(source);
            this.cooldownMap.set(target, new Cooldown(ChessGame.COOLDOWN_TIME));
        } else {
            move = this.game.move(`${source}-${target}`, { sloppy: true });
        }
        return move ?? null;
    }

    get turn(): 'w' | 'b' {
        return this.game.turn();
    }
}

export default ChessGame;
