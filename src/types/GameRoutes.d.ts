declare type CreateGameRequest = import('express').Request<
    EmptyRecord,
    IGameCreatedAPIResponse | IErrorAPIResponse,
    EmptyRecord,
    EmptyRecord
>;

declare type CreateGameResponse = import('express').Response<
    IGameCreatedAPIResponse | IErrorAPIResponse
>;

declare type CreateAIvAIGameRequest = import('express').Request<
    EmptyRecord,
    { gameKey: string[] } | IErrorAPIResponse,
    { bot1: number; bot2: number },
    EmptyRecord
>;

declare type CreateAIvAIGameResponse = import('express').Response<
    { gameKey: string[] } | IErrorAPIResponse
>;

declare type CreateSinglePlayerGameRequest = import('express').Request<
    EmptyRecord,
    { gameKey: string[] } | IErrorAPIResponse,
    { bot: number },
    EmptyRecord
>;

declare type CreateSinglePlayerGameResponse = import('express').Response<
    { gameKey: string[] } | IErrorAPIResponse
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

declare type ChessGameSocket = import('socket.io').Socket<
    import('socket.io/dist/typed-events').DefaultEventsMap,
    import('socket.io/dist/typed-events').DefaultEventsMap,
    import('socket.io/dist/typed-events').DefaultEventsMap,
    Record<string, unknown>
>;

type GameHistoryAPIRequest = import('express').Request;

type GameHistoryAPIResponse = import('express').Response<GameHistory[]>;
