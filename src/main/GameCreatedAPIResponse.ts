import { BaseAPIResponse } from './APIResponse';

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

export default GameCreatedAPIResponse;
