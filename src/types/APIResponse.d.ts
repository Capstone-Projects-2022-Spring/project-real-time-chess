declare interface APIResponse {
    success: boolean;
    error?: Error;
}

declare interface IErrorAPIResponse {
    success: false;
    error: Error;
}

declare interface IGameCreatedAPIResponse extends APIResponse {
    gameKey: string[];
}

declare interface IGameStateAPIResponse extends APIResponse {
    fen: string;
    gameKey: string[];
    cooldowns: Record<import('chess.js').Square, ICooldown>;
    players: {
        black?: ISanitizedUser | AIString;
        white?: ISanitizedUser | AIString;
    };
}

declare interface IMatchCreatedAPIResponse extends APIResponse {
    queuePosition: number;
}

declare interface IGameFoundResponse extends APIResponse {
    white: string;
    black: string;
}

declare type Req = import('express').Request;

declare type Res = import('express').Response;
