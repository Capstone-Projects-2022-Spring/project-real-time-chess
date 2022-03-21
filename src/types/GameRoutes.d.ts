declare type CreateGameRequest = import('express').Request<
    EmptyRecord,
    IGameCreatedAPIResponse | IErrorAPIResponse,
    EmptyRecord,
    EmptyRecord
>;

declare type CreateGameResponse = import('express').Response<
    IGameCreatedAPIResponse | IErrorAPIResponse
>;

declare type JoinGameRequest = import('express').Request<
    EmptyRecord,
    IGameCreatedAPIResponse | IErrorAPIResponse,
    { gameKey: string[] },
    EmptyRecord
>;

declare type JoinGameResponse = import('express').Response<
    IGameCreatedAPIResponse | IErrorAPIResponse
>;

declare type ChessGameSocket = import('socket.io').Socket<any, any, any, any>;
