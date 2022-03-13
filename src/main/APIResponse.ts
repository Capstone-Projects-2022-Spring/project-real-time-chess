/**
 * The bare minimum interface to be implemented by a response object.
 *
 * @export
 * @interface APIResponse
 */
export interface APIResponse {
    success: boolean;
    error?: Error;
}

/**
 * The base class for all API responses.
 *
 * @export
 * @abstract
 * @class BaseAPIResponse
 * @implements {APIResponse}
 */
export abstract class BaseAPIResponse implements APIResponse {
    success: boolean;

    error?: Error;

    /**
     * Creates an instance of BaseAPIResponse.
     * @param {boolean} success Whether the desired task was successfully completed.
     * @param {Error} [error] The error that occurred while trying to complete the request.
     *
     * @memberOf BaseAPIResponse
     */
    constructor(success: boolean, error?: Error) {
        this.success = success;
        this.error = error;
    }
}

/**
 * The API response when an error occurs on the server.
 *
 * @export
 * @class ErrorAPIResponse
 * @extends {BaseAPIResponse}
 */
export class ErrorAPIResponse extends BaseAPIResponse {
    /**
     * Creates an instance of ErrorAPIResponse.
     * @param {(Error | string)} error The error that occurred.
     * If a string is provided instead of an error object, then
     * the string will be used to create an error object with
     * the string as the specified error message.
     *
     * @memberOf ErrorAPIResponse
     */
    constructor(error: Error | string) {
        super(false, typeof error === 'string' ? new Error(error) : error);
    }
}

export class GameCreatedResponse extends BaseAPIResponse {
    gameKey: string[];

    constructor(gameKey: string[]) {
        super(true);
        this.gameKey = gameKey;
    }
}
