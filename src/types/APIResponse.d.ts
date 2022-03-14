/**
 * The bare minimum interface to be implemented by a response object.
 *
 * @interface APIResponse
 */
declare interface APIResponse {
    success: boolean;
    error?: Error;
}

declare interface IGameCreatedResponse extends APIResponse {
    gameKey: string[];
}
