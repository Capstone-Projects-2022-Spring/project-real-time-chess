interface IChessGame {
    gameKey: string[];
    black?: IUser | AIString;
    white?: IUser | AIString;
    fen: string;
    cooldownMap: Record<import('chess.js').Square, ICooldown>;
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

declare interface ICooldown {
    time: number;
}

interface GameHistory {
    black: import('mongodb').ObjectId | AIString | 'No Player';
    white: import('mongodb').ObjectId | AIString | 'No Player';
    game_key: string[];
    history: MoveRecord[];
}

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
