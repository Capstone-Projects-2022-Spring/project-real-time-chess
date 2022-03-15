import { BaseAPIResponse } from './APIResponse';

class GameMessagesAPIResponse extends BaseAPIResponse implements IGameMessagesAPIResponse {
    messages: IGameMessage[];

    constructor(messages: IGameMessage[]) {
        super(true);
        this.messages = messages;
    }
}

export default GameMessagesAPIResponse;
