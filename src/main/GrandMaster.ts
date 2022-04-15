/* eslint-disable no-lonely-if */
/* eslint-disable radix */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChessInstance, Move, PieceType } from 'chess.js';
import ModifiedChess, { ModifiedChessInstance } from './modified.chess.js';

/**
 * The GrandMaster class is an internal library written to retrieve the best move
 * in a game of real-time chess.
 *
 * This library is a heavily modified version of zeyu2001/chess-ai
 * Link: https://github.com/zeyu2001/chess-ai/blob/main/js/main.js
 *
 * Modifications:
 * 1. Converted terribly written JS code to well-written TypeScript
 * 2. Adapted code for use in any chess game
 * 3. Interoperability with regular chess.js (along with type definitions for modified chess.js)
 * 4. Removed non-library code
 * 5. Removed unused/useless code
 * 6. Adapted code to better fit most projects
 */
class GrandMaster {
    // TODO: Make all fields readonly and see if they change
    // If errors are introduced, then revert back
    // If no errors are introduced, make static AND readonly

    // private positionCount: number;

    private game: ModifiedChessInstance;

    private weights: {
        p: number;
        n: number;
        b: number;
        r: number;
        q: number;
        k: number;
        k_e: number;
    };

    private pst_w = {
        p: [
            [100, 100, 100, 100, 105, 100, 100, 100],
            [78, 83, 86, 73, 102, 82, 85, 90],
            [7, 29, 21, 44, 40, 31, 44, 7],
            [-17, 16, -2, 15, 14, 0, 15, -13],
            [-26, 3, 10, 9, 6, 1, 0, -23],
            [-22, 9, 5, -11, -10, -2, 3, -19],
            [-31, 8, -7, -37, -36, -14, 3, -31],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        n: [
            [-66, -53, -75, -75, -10, -55, -58, -70],
            [-3, -6, 100, -36, 4, 62, -4, -14],
            [10, 67, 1, 74, 73, 27, 62, -2],
            [24, 24, 45, 37, 33, 41, 25, 17],
            [-1, 5, 31, 21, 22, 35, 2, 0],
            [-18, 10, 13, 22, 18, 15, 11, -14],
            [-23, -15, 2, 0, 2, 0, -23, -20],
            [-74, -23, -26, -24, -19, -35, -22, -69],
        ],
        b: [
            [-59, -78, -82, -76, -23, -107, -37, -50],
            [-11, 20, 35, -42, -39, 31, 2, -22],
            [-9, 39, -32, 41, 52, -10, 28, -14],
            [25, 17, 20, 34, 26, 25, 15, 10],
            [13, 10, 17, 23, 17, 16, 0, 7],
            [14, 25, 24, 15, 8, 25, 20, 15],
            [19, 20, 11, 6, 7, 6, 20, 16],
            [-7, 2, -15, -12, -14, -15, -10, -10],
        ],
        r: [
            [35, 29, 33, 4, 37, 33, 56, 50],
            [55, 29, 56, 67, 55, 62, 34, 60],
            [19, 35, 28, 33, 45, 27, 25, 15],
            [0, 5, 16, 13, 18, -4, -9, -6],
            [-28, -35, -16, -21, -13, -29, -46, -30],
            [-42, -28, -42, -25, -25, -35, -26, -46],
            [-53, -38, -31, -26, -29, -43, -44, -53],
            [-30, -24, -18, 5, -2, -18, -31, -32],
        ],
        q: [
            [6, 1, -8, -104, 69, 24, 88, 26],
            [14, 32, 60, -10, 20, 76, 57, 24],
            [-2, 43, 32, 60, 72, 63, 43, 2],
            [1, -16, 22, 17, 25, 20, -13, -6],
            [-14, -15, -2, -5, -1, -10, -20, -22],
            [-30, -6, -13, -11, -16, -11, -16, -27],
            [-36, -18, 0, -19, -15, -15, -21, -38],
            [-39, -30, -31, -13, -31, -36, -34, -42],
        ],
        k: [
            [4, 54, 47, -99, -99, 60, 83, -62],
            [-32, 10, 55, 56, 56, 55, 10, 3],
            [-62, 12, -57, 44, -67, 28, 37, -31],
            [-55, 50, 11, -4, -19, 13, 0, -49],
            [-55, -43, -52, -28, -51, -47, -8, -50],
            [-47, -42, -43, -79, -64, -32, -29, -32],
            [-4, 3, -14, -50, -57, -18, 13, 4],
            [17, 30, -3, -14, 6, -1, 40, 18],
        ],

        // Endgame King Table
        k_e: [
            [-50, -40, -30, -20, -20, -30, -40, -50],
            [-30, -20, -10, 0, 0, -10, -20, -30],
            [-30, -10, 20, 30, 30, 20, -10, -30],
            [-30, -10, 30, 40, 40, 30, -10, -30],
            [-30, -10, 30, 40, 40, 30, -10, -30],
            [-30, -10, 20, 30, 30, 20, -10, -30],
            [-30, -30, 0, 0, 0, 0, -30, -30],
            [-50, -30, -30, -30, -30, -30, -30, -50],
        ],
    };

    private pst_b = {
        p: this.pst_w.p.slice().reverse(),
        n: this.pst_w.n.slice().reverse(),
        b: this.pst_w.b.slice().reverse(),
        r: this.pst_w.r.slice().reverse(),
        q: this.pst_w.q.slice().reverse(),
        k: this.pst_w.k.slice().reverse(),
        k_e: this.pst_w.k_e.slice().reverse(),
    };

    private pstOpponent = { w: this.pst_b, b: this.pst_w };

    private pstSelf = { w: this.pst_w, b: this.pst_b };

    /**
     * Creates an instance of GrandMaster.
     */
    constructor(game: ChessInstance) {
        // this.positionCount = 0;
        this.game = ModifiedChess(game.fen());
        this.weights = { p: 100, n: 280, b: 320, r: 479, q: 929, k: 60000, k_e: 60000 };
    }

    /**
     * Calculates the best legal move for the given color.
     */
    getBestMove(color: 'w' | 'b', currSum: number): [Move | null, number] {
        // this.positionCount = 0;

        // This is how deep the AI will recursively search
        const depth = 2;

        // const d = new Date().getTime();
        const [bestMove, bestMoveValue] = this.minimax(
            this.game,
            depth,
            Number.NEGATIVE_INFINITY,
            Number.POSITIVE_INFINITY,
            true,
            currSum,
            color,
        );
        // const d2 = new Date().getTime();
        // const moveTime = d2 - d;
        // const positionsPerS = (this.positionCount * 1000) / moveTime;

        return [bestMove, bestMoveValue];
    }

    /**
     * Performs the minimax algorithm to choose the best move: https://en.wikipedia.org/wiki/Minimax (pseudocode provided)
     * Recursively explores all possible moves up to a given depth, and evaluates the game board
     * at the leaves.
     *
     * Basic idea: maximize the minimum value of the position resulting from the opponent's
     * possible following moves.
     * Optimization: alpha-beta pruning: https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning (pseudocode provided)
     *
     * @param game - The chess instance (from chess.js)
     * @param depth - The depth of the search tree (i.e. height limit)
     * @param isMaximizingPlayer - True if the current layer is maximizing, false otherwise
     * @param sum - The sum (evaluation) so far at the current layer
     * @param color - The color of the current player
     *
     * @returns The best move at the root of the current subtree.
     */
    minimax(
        game: ModifiedChessInstance,
        depth: number,
        alpha: number,
        beta: number,
        isMaximizingPlayer: boolean,
        sum: number,
        color: 'b' | 'w',
    ): [Move | null, number] {
        // this.positionCount++;
        const children = game.ugly_moves({
            verbose: true,
        });

        // Sort moves randomly, so the same move isn't always picked on ties
        children.sort(() => 0.5 - Math.random());

        let currMove;
        // Maximum depth exceeded or node is a terminal node (no children)
        if (depth === 0 || children.length === 0) {
            return [null, sum];
        }

        // Find maximum/minimum from list of 'children' (possible moves)
        let maxValue = Number.NEGATIVE_INFINITY;
        let minValue = Number.POSITIVE_INFINITY;
        let bestMove;
        for (let i = 0; i < children.length; i++) {
            currMove = children[i];

            // Note: in our case, the 'children' are simply modified game states
            const currPrettyMove = game.ugly_move(currMove);
            const newSum = this.evaluateBoard(game, currPrettyMove, sum, color);
            const childValue = this.minimax(
                game,
                depth - 1,
                alpha,
                beta,
                !isMaximizingPlayer,
                newSum,
                color,
            )[1];

            game.undo();

            if (isMaximizingPlayer) {
                if (childValue! > maxValue) {
                    maxValue = childValue as number;
                    bestMove = currPrettyMove;
                }
                if (childValue! > alpha) {
                    alpha = childValue as number;
                }
            } else {
                if (childValue! < minValue) {
                    minValue = childValue as number;
                    bestMove = currPrettyMove;
                }
                if (childValue! < beta) {
                    beta = childValue as number;
                }
            }

            // Alpha-beta pruning
            if (alpha >= beta) {
                break;
            }
        }

        if (isMaximizingPlayer) {
            return [bestMove ?? null, maxValue];
        }
        return [bestMove ?? null, minValue];
    }

    /**
     * Evaluates the board at this point in time,
     * using the material weights and piece square tables.
     */
    evaluateBoard(game: ModifiedChessInstance, move: Move, prevSum: number, color: 'b' | 'w') {
        if (game.in_checkmate()) {
            // Opponent is in checkmate (good for us)
            if (move.color === color) {
                return 10 ** 10;
            }
            // Our king's in checkmate (bad for us)

            return -(10 ** 10);
        }

        if (game.in_draw() || game.in_threefold_repetition() || game.in_stalemate()) {
            return 0;
        }

        if (game.in_check()) {
            // Opponent is in check (good for us)
            if (move.color === color) {
                prevSum += 50;
            }
            // Our king's in check (bad for us)
            else {
                prevSum -= 50;
            }
        }

        var from = [8 - parseInt(move.from[1]!), move.from.charCodeAt(0) - 'a'.charCodeAt(0)];
        var to = [8 - parseInt(move.to[1]!), move.to.charCodeAt(0) - 'a'.charCodeAt(0)];

        // Change endgame behavior for kings
        if (prevSum < -1500) {
            if (move.piece === 'k') {
                move.piece = 'k_e' as PieceType;
            }
            // Kings can never be captured
            // else if (move.captured === 'k') {
            //   move.captured = 'k_e';
            // }
        }

        if ('captured' in move) {
            // Opponent piece was captured (good for us)
            if (move.color === color) {
                prevSum +=
                    this.weights[move.captured!] +
                    this.pstOpponent[move.color][move.captured!][to[0]!]![to[1]!]!;
            }
            // Our piece was captured (bad for us)
            else {
                prevSum -=
                    this.weights[move.captured!] +
                    this.pstSelf[move.color][move.captured!][to[0]!]![to[1]!]!;
            }
        }

        if (move.flags.includes('p')) {
            // NOTE: promote to queen for simplicity
            move.promotion = 'q';

            // Our piece was promoted (good for us)
            if (move.color === color) {
                prevSum -=
                    this.weights[move.piece] +
                    this.pstSelf[move.color][move.piece][from[0]!]![from[1]!]!;
                prevSum +=
                    this.weights[move.promotion] +
                    this.pstSelf[move.color][move.promotion][to[0]!]![to[1]!]!;
            }
            // Opponent piece was promoted (bad for us)
            else {
                prevSum +=
                    this.weights[move.piece] +
                    this.pstSelf[move.color][move.piece][from[0]!]![from[1]!]!;
                prevSum -=
                    this.weights[move.promotion] +
                    this.pstSelf[move.color][move.promotion][to[0]!]![to[1]!]!;
            }
        } else {
            // The moved piece still exists on the updated board,
            // so we only need to update the position value
            if (move.color !== color) {
                prevSum += this.pstSelf[move.color][move.piece][from[0]!]![from[1]!]!;
                prevSum -= this.pstSelf[move.color][move.piece][to[0]!]![to[1]!]!;
            } else {
                prevSum -= this.pstSelf[move.color][move.piece][from[0]!]![from[1]!]!;
                prevSum += this.pstSelf[move.color][move.piece][to[0]!]![to[1]!]!;
            }
        }

        return prevSum;
    }
}

export default GrandMaster;
