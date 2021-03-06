/* eslint-disable complexity */
import { Move, PieceType, Square } from 'chess.js';
import { ObjectId } from 'mongodb';
import { GameStateAPIResponse } from '../APIResponse';
import GameHistoryDAO from '../dao/GameHistoryDAO';
import UserDAO from '../dao/UserDAO';
import GrandMaster from '../GrandMaster/GrandMaster';
import ModifiedChess, { ModifiedChessInstance } from '../GrandMaster/modified.chess';
import Logger from '../Logger';
import Cooldown from './Cooldown';

/**
 * A wrapper class for a ChessJS game to work with Real-time Chess.
 */
class ChessGame implements IChessGame {
    public owner: IUser;

    public gameKey: string[];

    public black?: IUser | AIString;

    public white?: IUser | AIString;

    private blackSocket?: ChessGameSocket;

    private whiteSocket?: ChessGameSocket;

    private game: ModifiedChessInstance;

    public cooldownMap: Record<Square, Cooldown>;

    public static readonly COOLDOWN_TIME = 5;

    private moveHistory: MoveRecord[] = [];

    private moveQueue: MoveRequest[] = [];

    private moveJob: NodeJS.Timer;

    private moveJobLock: boolean;

    private autopilot: AutoPilotGameState;

    private cooldown: number;

    public status: 'playing' | 'ended';

    /**
     * Creates an instance of ChessGame.
     */
    constructor(owner: IUser, gameKey: string[], cooldown?: number) {
        this.owner = owner;
        this.game = ModifiedChess();
        this.gameKey = gameKey;
        this.cooldownMap = {} as Record<Square, Cooldown>;
        this.cooldown = cooldown || ChessGame.COOLDOWN_TIME;
        this.moveJobLock = false;
        this.status = 'playing';
        this.moveJob = setInterval(() => {
            if (!this.moveJobLock) {
                this.moveJobLock = true;
                while (this.moveQueue.length > 0) {
                    const move = this.moveQueue.shift()!;
                    this.doSingleMove(move.source, move.target, move.color);
                }
                this.moveJobLock = false;
            }
        }, 500);
        this.autopilot = {
            black: {
                enabled: false,
            },
            white: {
                enabled: false,
            },
        };
        Logger.debug(`Created a new game with the following properties:
        Owner: ${this.owner.name.first} ${this.owner.name.last}
        Cooldown: ${this.cooldown}`);
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
     * Converts a player/AI/undefined to their first name/AI name.
     *
     * @param player - The player to convert
     * @returns The name of the player. If the player is an AI, then
     * it returns the difficulty category of the AI along with its
     * difficulty level. If the player is undefined, then it returns
     * 'No Player'.
     */
    private static playerToName(player?: IUser | AIString): string {
        if (player && typeof player === 'string') {
            const difficulty = +(player as string).split('-')[1]!;

            if (difficulty < 2) return `Extremely Easy AI (${difficulty})`;
            if (difficulty < 4) return `Easy AI (${difficulty})`;
            if (difficulty < 6) return `Normal AI (${difficulty})`;
            if (difficulty < 8) return `Hard AI (${difficulty})`;

            return `Extremely Hard AI (${difficulty})`;
        }
        if (player) return player.name.first;

        return 'No Player';
    }

    /**
     * Retrieves the first name of the black player.
     */
    public get blackName(): string {
        return ChessGame.playerToName(this.black);
    }

    /**
     * Retrieves the first name of the white player.
     */
    public get whiteName(): string {
        return ChessGame.playerToName(this.white);
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
     * Constructs a new (isolated) chess game instance with the specified turn
     *
     * @param color - The player who's turn should be next
     * @returns The new chess.js instance
     */
    public constructGameWithTurn(color: 'w' | 'b'): ModifiedChessInstance {
        const tokens = this.game.fen().split(' ');
        tokens[1] = color;
        return ModifiedChess(tokens.join(' '));
    }

    /**
     * Adds a move to the move queue.
     *
     * @param source - The source square
     * @param target - The target square
     * @param color - The color of the piece being moved
     */
    public move(source: Square, target: Square, color: 'w' | 'b'): void {
        this.moveQueue.push({ source, target, color });
    }

    /**
     * Submit a request for a random legal move
     * TODO: Make this truly random
     */
    public randomMove(): void {
        this.move('e2', 'e4', 'w');
    }

    /**
     * Checks if the game is in stalemate. The game is determined to
     * be in a stalemate if both players have each made three consecutive
     * moves. This is not a conclusive check, but it is a check that
     * can be used to determine if the game should be over
     *
     * @returns True if the game is in stalemate, false otherwise.
     */
    private isStalemate(): boolean {
        return this.game.in_stalemate();
    }

    /**
     * Move a piece from a source square to a target square.
     *
     * @param source - The square which the piece is currently located.
     * @param target - The square which the piece is moving to.
     * @param color - The color of the piece being moved.
     * @returns A chess.js Move object if the move is valid.
     * If an invalid move (source to target) is attempted, then `null` is returned.
     */
    private doSingleMove(source: Square, target: Square, color: 'w' | 'b'): Move | null {
        Logger.debug(
            `Processing move of ${
                color === 'w' ? 'White' : 'Black'
            } piece from ${source} to ${target}`,
        );

        let move: Move | null = null;
        const cooldown = this.cooldownMap[source];
        if (cooldown === undefined || cooldown.ready()) {
            Logger.debug(`Piece at ${source} is not in cooldown`);
            this.forceTurnChange(color);
            try {
                move = this.game.move(`${source}-${target}`, { sloppy: true });
            } catch (e) {
                Logger.debug(`There was an error with the move from ${source} to ${target}`);
                move = null;
            }

            if (move !== null) {
                Logger.debug(`Move from ${source} to ${target} was successful`);
                delete this.cooldownMap[source];
                this.cooldownMap[target] = new Cooldown(this.cooldown);

                if (typeof this.black === 'string' && typeof this.white === 'string') {
                    this.blackSocket?.emit(
                        'move-notification',
                        `${
                            color === 'w' ? 'White' : 'Black'
                        } moved their ${ChessGame.pieceTypeToName(move.piece)} to ${target}`,
                    );
                    this.whiteSocket?.emit(
                        'move-notification',
                        `${
                            color === 'w' ? 'White' : 'Black'
                        } moved their ${ChessGame.pieceTypeToName(move.piece)} to ${target}`,
                    );
                } else if (color === 'b') {
                    this.whiteSocket?.emit(
                        'move-notification',
                        `Black moved their ${ChessGame.pieceTypeToName(move.piece)} to ${target}`,
                    );
                } else if (color === 'w') {
                    this.blackSocket?.emit(
                        'move-notification',
                        `White moved their ${ChessGame.pieceTypeToName(move.piece)} to ${target}`,
                    );
                }

                this.moveHistory.push({
                    fen: this.game.fen(),
                    timestamp: Date.now(),
                    move,
                });

                if (this.isStalemate()) {
                    this.endGame();
                }

                if (this.winner !== null) this.endGame();

                this.emitToPlayers('game state', new GameStateAPIResponse(this));
            } else {
                Logger.debug(`The piece at ${source} cannot move to ${target}. Invalid move.`);
            }
        } else {
            Logger.debug(`The piece on square ${source} is on cooldown`);
        }

        return move;
    }

    /**
     * Converts a chess.js PieceType string to a human-readable piece name.
     *
     * @param piece - The PieceType string to convert to human-readable name.
     * @returns A human readable name for the piece.
     */
    private static pieceTypeToName(piece: PieceType): string {
        switch (piece) {
            case 'p':
                return 'Pawn';
            case 'r':
                return 'Rook';
            case 'n':
                return 'Knight';
            case 'b':
                return 'Bishop';
            case 'q':
                return 'Queen';
            case 'k':
                return 'King';
            default:
                return 'Unknown';
        }
    }

    /**
     * Ends the game and publishes the game to the database.
     */
    public endGame() {
        this.status = 'ended';
        clearInterval(this.moveJob);
        if (this.autopilot.black.enabled && this.autopilot.black.job) {
            clearInterval(this.autopilot.black.job);
        }

        if (this.autopilot.white.enabled && this.autopilot.white.job) {
            clearInterval(this.autopilot.white.job);
        }

        const gameHistoryDao = new GameHistoryDAO();
        const userDao = new UserDAO();

        let black: ObjectId | AIString | 'No Player';
        let white: ObjectId | AIString | 'No Player';

        if (typeof this.black === 'string') black = this.black;
        else black = this.black?._id ?? 'No Player';

        if (typeof this.white === 'string') white = this.white;
        else white = this.white?._id ?? 'No Player';

        if (black !== 'No Player' && white !== 'No Player') {
            gameHistoryDao
                .insertOne({
                    black,
                    white,
                    label: `${this.whiteName} vs ${this.blackName}`,
                    game_key: this.gameKey,
                    history: this.moveHistory,
                    timestamp: Date.now(),
                })
                .catch(err => Logger.error(err));
            const { winner } = this;
            if (winner === 'b') {
                const promises = [];
                if (typeof this.black === 'object') {
                    promises.push(userDao.recordWin(this.black!._id));
                }

                if (typeof this.white === 'object') {
                    promises.push(userDao.recordLoss(this.white!._id));
                }

                Promise.all(promises)
                    .then(() => {
                        this.emitToPlayers('blackWin', this.blackName);
                    })
                    .catch(err => {
                        Logger.error(err);
                    });
            } else if (winner === 'w') {
                const promises = [];

                if (typeof this.white === 'object') {
                    promises.push(userDao.recordWin(this.white!._id));
                }

                if (typeof this.black === 'object') {
                    promises.push(userDao.recordLoss(this.black!._id));
                }

                Promise.all(promises)
                    .then(() => {
                        this.emitToPlayers('whiteWin', this.whiteName);
                    })
                    .catch(err => {
                        Logger.error(err);
                    });
            }
        }
    }

    /**
     * Uses Joe's API to fetch the next best move in the current game.
     * This uses artificial intelligence to determine the best move.
     *
     * @param color - The color of the player making the move.
     */
    public requestAIMove(color: 'w' | 'b'): void {
        const correctedGame = this.constructGameWithTurn(color);
        const gm = new GrandMaster(correctedGame);

        if (this.moveHistory.length > 0) {
            const [bestNextMove] = gm.getBestMove(
                color,
                gm.evaluateBoard(
                    ModifiedChess(correctedGame.fen()),
                    this.moveHistory[this.moveHistory.length - 1]!.move,
                    0,
                    color,
                ),
                true,
            );

            if (bestNextMove) this.move(bestNextMove.from, bestNextMove.to, bestNextMove.color);
        }
    }

    /**
     * Binds sockets to the chess game
     *
     * @param sockets - The sockets to bind for either the black or white player.
     */
    bindSocket(sockets: { black?: ChessGameSocket; white?: ChessGameSocket }) {
        if (sockets.black) this.blackSocket = sockets.black;
        if (sockets.white) this.whiteSocket = sockets.white;
    }

    /**
     * Emits an event to both players.
     *
     * @param ev - The event to emit.
     * @param args - The arguments to pass to the event.
     */
    emitToPlayers(ev: string, ...args: unknown[]) {
        this.blackSocket?.emit(ev, ...args);
        this.whiteSocket?.emit(ev, ...args);
    }

    /**
     * Enables autopilot for the specified player at a given rate.
     *
     * @param color - The color which autopilot should be enabled for.
     * @param frequency - The frequency which moves should be made (in milliseconds).
     */
    enableAutopilot(color: 'b' | 'w', frequency: number) {
        const autopilotState = color === 'w' ? this.autopilot.white : this.autopilot.black;
        if (autopilotState.enabled && autopilotState.job) clearInterval(autopilotState.job);
        autopilotState.enabled = true;
        autopilotState.job = setInterval(() => this.requestAIMove(color), frequency);
    }

    /**
     * Disables autopilot for the specified player.
     *
     * @param color - The player to disable autopilot for.
     */
    disableAutopilot(color: 'b' | 'w') {
        const autopilotState = color === 'w' ? this.autopilot.white : this.autopilot.black;
        if (autopilotState.enabled && autopilotState.job) clearInterval(autopilotState.job);
        autopilotState.enabled = false;
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
        // TODO: Figure out where to emit to players
        if (kings[0]) {
            return 'w';
        }
        if (kings[1]) {
            return 'b';
        }
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
