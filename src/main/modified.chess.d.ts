/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
export default ModifiedChess;

declare function ModifiedChess(fen: string): ModifiedChessInstance;

export { ModifiedChessInstance };

declare interface ModifiedChessInstance {
    WHITE: string;
    BLACK: string;
    PAWN: string;
    KNIGHT: string;
    BISHOP: string;
    ROOK: string;
    QUEEN: string;
    KING: string;
    SQUARES: string[];
    FLAGS: {
        NORMAL: string;
        CAPTURE: string;
        BIG_PAWN: string;
        EP_CAPTURE: string;
        PROMOTION: string;
        KSIDE_CASTLE: string;
        QSIDE_CASTLE: string;
    };
    load: (fen: any) => boolean;
    reset: () => void;
    moves: (options: any) => {}[];
    ugly_moves: (options: any) => any[];
    in_check: () => boolean;
    in_checkmate: () => boolean;
    in_stalemate: () => boolean;
    in_draw: () => boolean;
    insufficient_material: () => boolean;
    in_threefold_repetition: () => boolean;
    game_over: () => boolean;
    validate_fen: (fen: any) => {
        valid: boolean;
        error_number: number;
        error: string;
    };
    fen: () => string;
    board: () => {
        type: any;
        color: any;
    }[][];
    pgn: (options: any) => string;
    load_pgn: (pgn: any, options: any) => boolean;
    header: (...args: any[]) => {};
    ascii: () => string;
    turn: () => string;
    move: (move: any, options: any) => {};
    ugly_move: (move_obj: any, options?: any) => import('chess.js').Move;
    undo: () => {};
    clear: () => void;
    put: (piece: any, square: any) => boolean;
    get: (square: any) => {
        type: any;
        color: any;
    };
    remove: (square: any) => {
        type: any;
        color: any;
    };
    perft: (depth: any) => number;
    square_color: (square: any) => 'light' | 'dark';
    history: (options: any) => {}[];
    get_comment: () => any;
    set_comment: (comment: any) => void;
    delete_comment: () => any;
    get_comments: () => {
        fen: string;
        comment: any;
    }[];
    delete_comments: () => {
        fen: string;
        comment: any;
    }[];
}
