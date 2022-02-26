interface APIResponse {
    success: boolean;
    error?: Error;
}

abstract class BaseAPIResponse implements APIResponse {
    success: boolean;
    error?: Error;

    constructor(success: boolean, error?: Error) {
        this.success = success;
        this.error = error;
    }
}

export class ErrorAPIResponse extends BaseAPIResponse {
    constructor(error: Error | string) {
        super(false, typeof error === 'string' ? new Error(error) : error);
    }
}
