import { AuthInfo } from './dao/UserDAO';

export interface APIResponse {
    success: boolean;
    error?: Error;
}

export abstract class BaseAPIResponse implements APIResponse {
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

export class LoginAPIResponse extends BaseAPIResponse {
    auth: AuthInfo;

    constructor(auth: AuthInfo) {
        super(true);
        this.auth = auth;
    }
}
