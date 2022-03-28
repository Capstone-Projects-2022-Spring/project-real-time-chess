/**
 * Express Request for creating a new game
 */
declare type CreateGameRequest = import('express').Request<
    EmptyRecord,
    IGameCreatedAPIResponse | IErrorAPIResponse,
    EmptyRecord,
    EmptyRecord
>;

/**
 * Express Response for creating a new game
 */
declare type CreateGameResponse = import('express').Response<
    IGameCreatedAPIResponse | IErrorAPIResponse
>;

/**
 * Express Request for joining a game
 */
declare type JoinGameRequest = import('express').Request<
    EmptyRecord,
    IGameCreatedAPIResponse | IErrorAPIResponse,
    { gameKey: string[] },
    EmptyRecord
>;

/**
 * Express Response for joining a game
 */
declare type JoinGameResponse = import('express').Response<
    IGameCreatedAPIResponse | IErrorAPIResponse
>;

/**
 * Type alias for a SocketIO socket to live on the server-side
 * for a player currently assigned to a game.
 */
declare type ChessGameSocket = import('socket.io').Socket<
    import('socket.io/dist/typed-events').DefaultEventsMap,
    import('socket.io/dist/typed-events').DefaultEventsMap,
    import('socket.io/dist/typed-events').DefaultEventsMap,
    Record<string, unknown>
>;
