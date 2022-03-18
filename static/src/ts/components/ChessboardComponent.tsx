import { Chess, ChessInstance, Square } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';

class ChessboardComponent extends React.Component<
    {
        orientation: 'b' | 'w';
        fen?: string;
        onPieceDrop?: (source: Square, target: Square) => void;
    },
    {
        game: ChessInstance;
    }
> {
    constructor(props: {
        orientation: 'b' | 'w';
        fen: string;
        onPieceDrop?: (source: Square, target: Square) => void;
    }) {
        super(props);
        this.state = {
            game: Chess(this.props.fen),
        };
    }

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
        const move = this.state.game.move(`${source}-${target}`, { sloppy: true });
        return move !== null;
    }
}

export default ChessboardComponent;
