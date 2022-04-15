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
    public players: { black?: ISanitizedUser | AIString; white?: ISanitizedUser | AIString };

    /**
     * Creates an instance of GameStateAPIResponse.
     * @param game - The game to extract the state data from
     */
    constructor(game: IChessGame) {
        super(true);
        this.fen = game.fen;
        this.gameKey = game.gameKey;
        this.messages = game.messages;

        let black;
        let white;

        if (game.black) {
            if (typeof game.black === 'string') black = game.black;
            else black = UserDAO.sanitize(game.black);
        }
        if (game.white) {
            if (typeof game.white === 'string') white = game.white;
            else white = UserDAO.sanitize(game.white);
        }

        this.players = {
            black,
            white,
        };
    }
}

export default GameStateAPIResponse;
