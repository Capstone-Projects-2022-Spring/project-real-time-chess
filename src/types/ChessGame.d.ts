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

interface MoveRequest {
    source: import('chess.js').Square;
    target: import('chess.js').Square;
    color: 'w' | 'b';
}

interface AutoPilotState {
    enabled: boolean;
    job?: NodeJS.Timer;
}

interface AutoPilotGameState {
    black: AutoPilotState;
    white: AutoPilotState;
}
