import { Square } from 'chess.js';
import UserDAO from './dao/UserDAO';

/**
 * The base class for all API responses.
 */
abstract class BaseAPIResponse implements APIResponse {
    success: boolean;

    error?: Error;

    /**
     * Creates an instance of BaseAPIResponse.
     * @param success - Whether the desired task was successfully completed.
     * @param error - The error that occurred while trying to complete the request.
     */
    constructor(success: boolean, error?: Error) {
        this.success = success;
        this.error = error;
    }
}

/**
 * The API response when an error occurs on the server.
 */
class ErrorAPIResponse implements IErrorAPIResponse {
    public success: false;

    public error: Error;

    /**
     * Creates an instance of ErrorAPIResponse.
     *
     * @param error - The error that occurred.
     * If a string is provided instead of an error object, then
     * the string will be used to create an error object with
     * the string as the specified error message.
     */
    constructor(error: Error | string) {
        this.success = false;
        this.error = error instanceof Error ? error : new Error(error);
    }
}

/**
 * An API response constructor for when the game state is requested or updated.
 */
class GameStateAPIResponse extends BaseAPIResponse implements IGameStateAPIResponse {
    public fen: string;

    public gameKey: string[];

    public players: { black?: ISanitizedUser | AIString; white?: ISanitizedUser | AIString };

    public cooldowns: Record<Square, ICooldown>;

    /**
     * Creates an instance of GameStateAPIResponse.
     * @param game - The game to extract the state data from
     */
    constructor(game: IChessGame) {
        super(true);
        this.fen = game.fen;
        this.gameKey = game.gameKey;
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

/**
 * The API Response for when a client requests a new game.
 */
class GameCreatedAPIResponse extends BaseAPIResponse implements IGameCreatedAPIResponse {
    /**
     * The game key for the game that was created.
     */
    gameKey: string[];

    /**
     * Creates an instance of GameCreatedAPIResponse.
     * @param gameKey - The game key for the game that was created.
     */
    constructor(gameKey: string[]) {
        super(true);
        this.gameKey = gameKey;
    }
}

/**
 * The response object for when a game mesage is received or sent.
 */

/**
 * The API response when a successful request is made to log a user in.
 */
class LoginAPIResponse extends BaseAPIResponse {
    auth: AuthInfo;

    /**
     * Creates an instance of LoginAPIResponse.
     * @param auth - The authentication information
     * required for the client to authenticated themselves.
     */
    constructor(auth: AuthInfo) {
        super(true);
        this.auth = auth;
    }
}

export {
    BaseAPIResponse,
    ErrorAPIResponse,
    GameStateAPIResponse,
    GameCreatedAPIResponse,
    LoginAPIResponse,
};
