interface GameHistory {
    black: import('mongodb').ObjectId | AIString | 'No Player';
    white: import('mongodb').ObjectId | AIString | 'No Player';
    game_key: string[];
    history: MoveRecord[];
}

type GameHistoryAPIRequest = import('express').Request;

type GameHistoryAPIResponse = import('express').Response<GameHistory[]>;

type AIString =
    | 'AI-1'
    | 'AI-2'
    | 'AI-3'
    | 'AI-4'
    | 'AI-5'
    | 'AI-6'
    | 'AI-7'
    | 'AI-8'
    | 'AI-9'
    | 'AI-10';
