interface GameHistory {
    black: import('mongodb').ObjectId | 'AI';
    white: import('mongodb').ObjectId | 'AI';
    game_key: string[];
    history: MoveRecord[];
}

type GameHistoryAPIRequest = import('express').Request;

type GameHistoryAPIResponse = import('express').Response<GameHistory[]>;
