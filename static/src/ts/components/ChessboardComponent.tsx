import { Chess, Square } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import { NoState } from '../models/types';

class ChessboardComponent extends React.Component<
    {
        orientation: 'b' | 'w';
        fen?: string;
        onPieceDrop?: (source: Square, target: Square) => void;
    },
    NoState
> {
    render() {
        return (
            <div>
                <Chessboard
                    position={this.props.fen}
                    boardOrientation={this.props.orientation === 'b' ? 'black' : 'white'}
                    onPieceDrop={(source, target) => {
                        const isValid = this.tryMove(source, target);

                        if (isValid) {
                            this.props.onPieceDrop?.(source, target);
                            return true;
                        }
                        return false;
                    }}
                />
            </div>
        );
    }

    private tryMove(source: string, target: string): boolean {
        const game = Chess(this.props.fen);
        const move = game.move(`${source}-${target}`, { sloppy: true });
        return move !== null;
    }
}

export default ChessboardComponent;
