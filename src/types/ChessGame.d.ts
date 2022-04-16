interface IChessGame {
    gameKey: string[];
    black?: IUser | AIString;
    white?: IUser | AIString;
    messages: IGameMessage[];
    fen: string;
    cooldownMap: Record<import('chess.js').Square, CooldownInterface>;
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
