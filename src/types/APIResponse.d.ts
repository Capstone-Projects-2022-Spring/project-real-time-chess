/**
 * The bare minimum interface to be implemented by a response object.
 */
declare interface APIResponse {
    success: boolean;
    error?: Error;
}

declare interface IGameCreatedAPIResponse extends APIResponse {
    gameKey: string[];
}

declare interface IGameMessagesAPIResponse extends APIResponse {
    messages: IGameMessage[];
}
