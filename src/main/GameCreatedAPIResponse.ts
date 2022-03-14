import { BaseAPIResponse } from './APIResponse';

export default class GameCreatedAPIResponse
    extends BaseAPIResponse
    implements IGameCreatedAPIResponse
{
    gameKey: string[];

    constructor(gameKey: string[]) {
        super(true);
        this.gameKey = gameKey;
    }
}
