import { BaseAPIResponse } from './APIResponse';

export default class GameMessagesAPIResponse
    extends BaseAPIResponse
    implements IGameMessagesAPIResponse
{
    messages: IGameMessage[];

    constructor(messages: IGameMessage[]) {
        super(true);
        this.messages = messages;
    }
}
