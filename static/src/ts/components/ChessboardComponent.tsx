import { Chess, Square } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import { NoState } from '../models/types';

/**
 * A wrapper for the ChessboardJS component.
 */
class ChessboardComponent extends React.Component<
    {
        orientation: 'b' | 'w';
        fen?: string;
        onPieceDrop?: (source: Square, target: Square) => void;
    },
    NoState
> {
    /**
     * @returns The chessboard component with the specified orientation and FEN state.
     */
    render() {
        return (
            <div>
                <Chessboard
                    position={this.props.fen}
                    boardOrientation={this.props.orientation === 'b' ? 'black' : 'white'}
                    onPieceDrop={(source, target) => {
                        const isValid = this.tryMove(source, target);

                        if (isValid) {
                            return true;
                        }
                        return false;
                    }}
                />
            </div>
        );
    }

    /**
     * Attempts to move a piece from a specified source to a target.
     *
     * @param source - The original square to which the piece is on.
     * @param target - The square to which the piece is being moved.
     * @returns True if the move was valid, false otherwise.
     */
    private tryMove(source: Square, target: Square): boolean {
        const game = Chess(this.props.fen);

        // Checks if piece at game is valid for the orientation
        const piece = game.get(source);
        if (piece !== null && piece.color === this.props.orientation) {
            const move = game.move(`${source}-${target}`, { sloppy: true });
            return move !== null;
        }
        return false;
    }
}

export default ChessboardComponent;
