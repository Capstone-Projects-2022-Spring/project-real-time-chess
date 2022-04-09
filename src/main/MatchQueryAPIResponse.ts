import { BaseAPIResponse } from './APIResponse';

/**
 * The API response for when a client enters the matchmaking queue
 */
class MatchQueryAPIResponse extends BaseAPIResponse implements APIResponse {
    /**
     * Creates a new instance of MatchQueueAPIResponse
     */
    constructor() {
        super(true);
    }
}

export default MatchQueryAPIResponse;
