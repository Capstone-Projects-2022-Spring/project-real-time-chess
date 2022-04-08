import { BaseAPIResponse } from './APIResponse';

/**
 * The API response for when a client enters the matchmaking queue
 */
class MatchQueueAPIResponse extends BaseAPIResponse implements IMatchCreatedAPIResponse {
    queuePosition: number;

    /**
     * Creates a new instance of MatchQueueAPIResponse
     */
    constructor(position: number) {
        super(true);
        this.queuePosition = position;
    }
}

export default MatchQueueAPIResponse;
