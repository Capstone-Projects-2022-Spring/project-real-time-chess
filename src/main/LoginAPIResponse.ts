import { BaseAPIResponse } from './APIResponse';
import { AuthInfo } from './dao/UserDAO';

/**
 * The API response when a successful request is made to log a user in.
 */
export default class LoginAPIResponse extends BaseAPIResponse {
    auth: AuthInfo;

    /**
     * Creates an instance of LoginAPIResponse.
     * @param auth - The authentication information
     * required for the client to authenticated themselves.
     */
    constructor(auth: AuthInfo) {
        super(true);
        this.auth = auth;
    }
}
