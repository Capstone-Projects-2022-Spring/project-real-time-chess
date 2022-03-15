import { BaseAPIResponse } from './APIResponse';

class GameCreatedAPIResponse extends BaseAPIResponse implements IGameCreatedAPIResponse {
    gameKey: string[];

    constructor(gameKey: string[]) {
        super(true);
        this.gameKey = gameKey;
    }
}

export default GameCreatedAPIResponse;
