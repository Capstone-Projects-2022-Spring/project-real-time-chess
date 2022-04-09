/**
 * Express Request for entering the matchmaking queue
 */
declare type MatchQueueRequest = import('express').Request<
    EmptyRecord,
    APIResponse | IErrorAPIResponse,
    { uid: string },
    EmptyRecord
>;

/**
 * Express Response for entering the matchmaking queue
 */
declare type MatchQueueResponse = import('express').Response<APIResponse, IErrorAPIResponse>;

/**
 * Express Request for asking if a game was found
 */
declare type MatchQueryRequest = import('express').Request<
    EmptyRecord,
    APIResponse | IErrorAPIResponse,
    { uid: string },
    EmptyRecord
>;

/**
 * Express response for asking if a game was found
 */
declare type MatchQueryResponse = import('express').Response<APIResponse, IErrorAPIResponse>;
