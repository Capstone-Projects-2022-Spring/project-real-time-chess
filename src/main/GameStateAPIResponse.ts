import { BaseAPIResponse } from './APIResponse';

/**
 * An API response constructor for when the game state is requested or updated.
 */
class GameStateAPIResponse extends BaseAPIResponse implements IGameStateAPIResponse {
    /**
     * The FEN string representing the entire game state.
     */
    public fen: string;

    /**
     * The list of emoji names which represent the game key
     */
    public gameKey: string[];

    /**
     * A list of every game message belonging to the game.
     * This includes chat messages **and** game history.
     */
    public messages: IGameMessage[];

    /**
     * The players belonging to the game.
     */
    public players: { black?: ISanitizedUser; white?: ISanitizedUser };

    /**
     * Creates an instance of GameStateAPIResponse.
     * @param fen - The games FEN strings.
     * @param gameKey - The game key (list of emoji names).
     * @param messages - The list of messages belonging to the game.
     * @param players - The players belonging to the game (black and white).
     */
    constructor(
        fen: string,
        gameKey: string[],
        messages: IGameMessage[],
        players: { black?: ISanitizedUser; white?: ISanitizedUser },
    ) {
        super(true);
        this.fen = fen;
        this.gameKey = gameKey;
        this.messages = messages;
        this.players = {
            black: players.black,
            white: players.white,
        };
    }
}

export default GameStateAPIResponse;
