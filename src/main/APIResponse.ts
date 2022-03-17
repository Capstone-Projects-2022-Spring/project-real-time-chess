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

export { BaseAPIResponse, ErrorAPIResponse };
