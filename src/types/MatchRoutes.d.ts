/**
 * Express Request for entering the matchmaking queue
 */
declare type MatchQueueRequest = import('express').Request<
    EmptyRecord,
    APIResponse | IErrorAPIResponse,
    { uid: string },
    EmptyRecord
>;

declare type MatchQueueResponse = import('express').Response<APIResponse, IErrorAPIResponse>;
