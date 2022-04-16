import { Square } from 'chess.js';
import { BaseAPIResponse } from './APIResponse';
import UserDAO from './dao/UserDAO';

/**
 * An API response constructor for when the game state is requested or updated.
 */
class GameStateAPIResponse extends BaseAPIResponse implements IGameStateAPIResponse {
    public fen: string;

    public gameKey: string[];

    public messages: IGameMessage[];

    public players: { black?: ISanitizedUser | AIString; white?: ISanitizedUser | AIString };

    public cooldowns: Record<Square, CooldownInterface>;

    /**
     * Creates an instance of GameStateAPIResponse.
     * @param game - The game to extract the state data from
     */
    constructor(game: IChessGame) {
        super(true);
        this.fen = game.fen;
        this.gameKey = game.gameKey;
        this.messages = game.messages;
        this.cooldowns = game.cooldownMap;

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
