import { Chess, ChessInstance } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import Swal from 'sweetalert2';

export default class ChessboardComponent extends React.Component<
    {},
    {
        game: ChessInstance;
    }
> {
    constructor(props: {}) {
        super(props);
        try {
            this.state = {
                game: Chess(),
            };
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div>
                <Chessboard
                    position={this.state.game.fen()}
                    onPieceDrop={(source, target) => {
                        const isValid = this.tryMove(source, target);
                        if (isValid) {
                            this.forceUpdate();
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Invalid move',
                                text: 'Please try again',
                            });
                        }
                        return false;
                    }}
                />
            </div>
        );
    }

    private tryMove(source: string, target: string): boolean {
        const move = this.state.game.move(`${source}-${target}`, { sloppy: true });
        return move === null ? false : true;
    }
}
