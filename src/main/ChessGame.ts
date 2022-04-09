import { Chess, ChessInstance, Move, Square } from 'chess.js';
import Cooldown from './Cooldown';
import GameHistoryDAO from './dao/GameHistoryDAO';
import { IUser } from './dao/UserDAO';
import GameStateAPIResponse from './GameStateAPIResponse';

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
     * Number of players from matchmaking ready to play
     */
    private readyCount = 0;

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
    public cooldownMap: Record<Square, Cooldown>;

    /**
     * Time before a recently moved piece may be moved again
     */
    public static readonly COOLDOWN_TIME = 5;

    /**
     * A record of every single move made in the game.
     */
    private moveHistory: MoveRecord[] = [];

    /**
     * Creates an instance of ChessGame.
     */
    constructor(gameKey: string[]) {
        this.game = new Chess();
        this.gameKey = gameKey;
        this.messages = [];
        this.cooldownMap = {} as Record<Square, Cooldown>;
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
     * Retrieves the first name of the black player.
     */
    public get blackName(): string | undefined {
        return this.black?.name.first;
    }

    /**
     * Retrieves the first name of the white player.
     */
    public get whiteName(): string | undefined {
        return this.white?.name.first;
    }

    /**
     * Forces the turn (in the FEN string) to change to the specified color.
     *
     * @param color - The color to switch the turn to.
     */
    public forceTurnChange(color: 'w' | 'b') {
        const tokens = this.game.fen().split(' ');
        tokens[1] = color;
        this.game.load(tokens.join(' '));
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
        const cooldown = this.cooldownMap[source];
        if (cooldown === undefined || cooldown.ready()) {
            const movingColor = this.game.get(source)!.color;
            if (this.game.turn() !== movingColor) this.forceTurnChange(movingColor);
            move = this.game.move(`${source}-${target}`, { sloppy: true });
            if (move !== null) {
                delete this.cooldownMap[source];
                this.cooldownMap[target] = new Cooldown(5);
                this.moveHistory.push({
                    fen: this.game.fen(),
                    timestamp: Date.now(),
                    move,
                });
                if (this.winner !== null) this.endGame();
            }
        }

        return move ?? null;
    }

    /**
     * Ends the game and publishes the game to the database.
     */
    private endGame() {
        const dao = new GameHistoryDAO();
        dao.insertOne({
            black: this.black!._id!,
            white: this.white!._id!,
            game_key: this.gameKey,
            history: this.moveHistory,
        });
    }

    /**
     * for matchmaking communication with the client controlling the black pieces
     */
    public listenBlack() {
        this.blackSocket?.emit('count', this.readyCount);
        this.blackSocket!.once('ready', () => {
            this.readyCount++;
            this.blackSocket?.emit('count', this.readyCount);
            this.whiteSocket?.emit('count', this.readyCount);
            if (this.readyCount === 2) {
                this.blackSocket?.emit('start', 'b');
                this.whiteSocket?.emit('start', 'w');
            }
        });
    }

    /**
     * for matchmaking communication with the client controlling the white pieces
     */
    public listenWhite() {
        this.whiteSocket?.emit('count', this.readyCount);
        this.whiteSocket!.once('ready', () => {
            this.readyCount++;
            this.whiteSocket!.emit('count', this.readyCount);
            this.blackSocket?.emit('count', this.readyCount);
            if (this.readyCount === 2) {
                this.blackSocket?.emit('start', 'b');
                this.whiteSocket?.emit('start', 'w');
            }
        });
    }

    /**
     * The winner of the game if one exists
     */
    get winner(): 'w' | 'b' | null {
        // First element of `kings` represents whether the white king exists
        // Second element of `kings` represents whether th black king exists
        const kings: [boolean, boolean] = [false, false];
        this.game.board().forEach(boardRow => {
            boardRow.forEach(piece => {
                if (piece !== null && piece.type === 'k') {
                    if (piece.color === 'w') {
                        kings[0] = true;
                    } else {
                        kings[1] = true;
                    }
                }
            });
        });
        if (kings[0] && kings[1]) return null;
        if (kings[0]) return 'w';
        if (kings[1]) return 'b';
        return null;
    }

    /**
     * The player the game is waiting on to play.
     */
    get turn(): 'w' | 'b' {
        return this.game.turn();
    }

    /**
     * @returns Whether the player to move is in checkmate.
     */
    get checkMate(): boolean {
        return this.game.in_checkmate();
    }

    /**
     * @returns Whether or not the game is over.
     */
    get gameOver(): boolean {
        return this.game.game_over();
    }

    /**
     * The history of all moves made in the game.
     */
    get moves(): MoveRecord[] {
        return this.moveHistory;
    }
}

export default ChessGame;
