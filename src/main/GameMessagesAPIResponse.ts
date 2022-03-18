import { BaseAPIResponse } from './APIResponse';

/**
 * The response object for when a game mesage is received or sent.
 */
class GameMessagesAPIResponse extends BaseAPIResponse implements IGameMessagesAPIResponse {
    /**
     * A list of every message in chronological order.
     */
    messages: IGameMessage[];

    /**
     * Creates an instance of GameMessagesAPIResponse.
     * @param messages - The list of messages for the current game.
     */
    constructor(messages: IGameMessage[]) {
        super(true);
        this.messages = messages;
    }
}

export default GameMessagesAPIResponse;
