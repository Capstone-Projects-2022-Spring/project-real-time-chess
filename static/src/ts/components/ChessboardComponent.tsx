import { Chess, ChessInstance } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import Swal from 'sweetalert2';
import GameAccess from '../access/GameAccess';

export default class ChessboardComponent extends React.Component<
    {},
    {
        game: ChessInstance;
        messages: IGameMessage[];
    }
> {
    constructor(props: {}) {
        super(props);
        try {
            this.state = {
                game: Chess(),
                messages: [],
            };
        } catch (e) {
            console.error(e);
        }
    }

    componentDidMount() {
        this.syncBoard();
        setInterval(() => {
            this.syncBoard();
        }, 1000);
    }

    syncBoard() {
        GameAccess.getFEN()
            .then(fen => {
                this.setState({
                    game: Chess(fen),
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Chessboard
                    position={this.state.game.fen()}
                    onPieceDrop={(source, target) => {
                        const isValid = this.tryMove(source, target);
                        if (isValid) {
                            GameAccess.move(source, target).catch(err => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Move Error',
                                    text: err.message,
                                });
                            });
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
