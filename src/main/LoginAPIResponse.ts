import { BaseAPIResponse } from './APIResponse';

/**
 * The API response when a successful request is made to log a user in.
 */
class LoginAPIResponse extends BaseAPIResponse {
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

export default LoginAPIResponse;
