interface GameHistory {
    black: import('mongodb').ObjectId;
    white: import('mongodb').ObjectId;
    game_key: string[];
    history: MoveRecord[];
}

type GameHistoryAPIRequest = import('express').Request;

type GameHistoryAPIResponse = import('express').Response<GameHistory[]>;
