import { Chess, ChessInstance } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import Swal from 'sweetalert2';
import GameAccess from '../access/GameAccess';

class ChessboardComponent extends React.Component<
    { orientation: 'b' | 'w' },
    {
        game: ChessInstance;
        messages: IGameMessage[];
    }
> {
    private syncInterval?: number;

    constructor(props: { orientation: 'b' | 'w' }) {
        super(props);
        this.state = {
            game: Chess(),
            messages: [],
        };
    }

    syncBoard() {
        GameAccess.getFEN()
            .then(fen => {
                this.setState({
                    game: Chess(fen),
                });
                this.stopAutoSync();
            })
            .catch(() => {
                Swal.fire({
                    icon: 'warning',
                    title: 'Game Error',
                    text: 'It seems like the server is not sending the chess board. The issue should resolve itself.',
                });
            });
    }

    beginAutoSync() {
        this.syncInterval = setInterval(() => this.syncBoard(), 1000);
    }

    stopAutoSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = undefined;
        }
    }

    render() {
        return (
            <div>
                <Chessboard
                    position={this.state.game.fen()}
                    boardOrientation={this.props.orientation === 'b' ? 'black' : 'white'}
                    onPieceDrop={(source, target) => {
                        const isValid = this.tryMove(source, target);
                        if (isValid) {
                            GameAccess.move(source, target)
                                .then(response => {
                                    if (!response.success) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: 'Invalid move',
                                        });
                                    } else {
                                        this.beginAutoSync();
                                        this.forceUpdate();
                                    }
                                })
                                .catch(err => {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Move Error',
                                        text: err.message,
                                    });
                                });
                            return true;
                        }
                        Swal.fire({
                            icon: 'warning',
                            title: 'Invalid move',
                            text: 'Please try again',
                        });
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
