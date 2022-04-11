import { BaseAPIResponse } from './APIResponse';
import UserDAO from './dao/UserDAO';

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
     * @param game - The game to extract the state data from
     */
    constructor(game: IChessGame) {
        super(true);
        this.fen = game.fen;
        this.gameKey = game.gameKey;
        this.messages = game.messages;
        this.players = {
            black: game.black ? UserDAO.sanitize(game.black) : undefined,
            white: game.white ? UserDAO.sanitize(game.white) : undefined,
        };
    }
}

export default GameStateAPIResponse;
