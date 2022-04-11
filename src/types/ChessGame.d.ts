interface IChessGame {
    gameKey: string[];
    black?: IUser;
    white?: IUser;
    messages: IGameMessage[];
    fen: string;
}

interface MoveRecord {
    fen: string;
    timestamp: number;
    move: import('chess.js').Move;
}
