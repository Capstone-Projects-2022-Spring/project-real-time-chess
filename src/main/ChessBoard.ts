type ChessPieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
type ChessColor = 'w' | 'b';

interface ChessPiece {
    type: ChessPieceType;
    color: ChessColor;
}

export { ChessPieceType, ChessColor, ChessPiece };

export default class ChessBoard {
    private board: (ChessPiece | null)[][];

    constructor() {
        this.board = [];
        this.setupBoard();
    }

    setupBoard() {
        this.board = [];
        for (let i = 0; i < 8; i++) {
            this.board[i] = [];
            for (let j = 0; j < 8; j++) {
                this.board[i]![j] = null;
            }
        }

        this.board[0]![0] = { type: 'r', color: 'w' };
        this.board[0]![1] = { type: 'n', color: 'w' };
        this.board[0]![2] = { type: 'b', color: 'w' };
        this.board[0]![3] = { type: 'q', color: 'w' };
        this.board[0]![4] = { type: 'k', color: 'w' };
        this.board[0]![5] = { type: 'b', color: 'w' };
        this.board[0]![6] = { type: 'n', color: 'w' };
        this.board[0]![7] = { type: 'r', color: 'w' };

        for (let i = 0; i < 8; i++) {
            this.board[1]![i] = { type: 'p', color: 'w' };
        }

        this.board[7]![0] = { type: 'r', color: 'b' };
        this.board[7]![1] = { type: 'n', color: 'b' };
        this.board[7]![2] = { type: 'b', color: 'b' };
        this.board[7]![3] = { type: 'q', color: 'b' };
        this.board[7]![4] = { type: 'k', color: 'b' };
        this.board[7]![5] = { type: 'b', color: 'b' };
        this.board[7]![6] = { type: 'n', color: 'b' };
        this.board[7]![7] = { type: 'r', color: 'b' };

        for (let i = 0; i < 8; i++) {
            this.board[6]![i] = { type: 'p', color: 'b' };
        }
    }

    validateRookMove(from: [number, number], to: [number, number]) {
        const [fromX, fromY] = from;
        const [toX, toY] = to;

        if (fromX === toX && fromY !== toY) {
            return true;
        }

        if (fromY === toY && fromX !== toX) {
            return true;
        }

        return false;
    }

    validateKnightMove(from: [number, number], to: [number, number]) {
        const [fromX, fromY] = from;
        const [toX, toY] = to;

        if (Math.abs(fromX - toX) === 2 && Math.abs(fromY - toY) === 1) {
            return true;
        }

        if (Math.abs(fromX - toX) === 1 && Math.abs(fromY - toY) === 2) {
            return true;
        }

        return false;
    }

    validateBishopMove(from: [number, number], to: [number, number]) {
        const [fromX, fromY] = from;
        const [toX, toY] = to;

        if (Math.abs(fromX - toX) === Math.abs(fromY - toY)) {
            return true;
        }

        return false;
    }

    validateQueenMove(from: [number, number], to: [number, number]) {
        return this.validateRookMove(from, to) || this.validateBishopMove(from, to);
    }

    validateKingMove(from: [number, number], to: [number, number]) {
        const [fromX, fromY] = from;
        const [toX, toY] = to;

        if (Math.abs(fromX - toX) <= 1 && Math.abs(fromY - toY) <= 1) {
            return true;
        }

        return false;
    }

    validatePawnMove(from: [number, number], to: [number, number]) {
        const [fromX, fromY] = from;
        const [toX, toY] = to;

        if (fromY === toY) {
            if (fromX === toX) {
                return false;
            }

            if (fromX < toX) {
                return true;
            }

            return false;
        }

        if (fromY < toY) {
            return true;
        }

        return false;
    }

    validateMove(from: [number, number], to: [number, number]) {
        const [fromX, fromY] = from;

        const piece = this.board[fromY]![fromX];

        if (piece === null) {
            return false;
        }

        switch (piece!.type) {
            case 'p':
                return this.validatePawnMove(from, to);
            case 'r':
                return this.validateRookMove(from, to);
            case 'n':
                return this.validateKnightMove(from, to);
            case 'b':
                return this.validateBishopMove(from, to);
            case 'q':
                return this.validateQueenMove(from, to);
            case 'k':
                return this.validateKingMove(from, to);
        }
    }

    move(from: [number, number], to: [number, number]) {
        const [fromX, fromY] = from;
        const [toX, toY] = to;

        if (!this.validateMove(from, to)) {
            throw new Error('Invalid move');
        }

        const piece = this.board[fromY]![fromX];

        this.board[fromY]![fromX] = null;
        this.board[toY]![toX] = piece!;
    }
}
