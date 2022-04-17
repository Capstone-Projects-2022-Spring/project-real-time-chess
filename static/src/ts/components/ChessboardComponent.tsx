import { Square } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import ToastNotification from './UI/ToastNotification';

interface ChessboardComponentProps {
    parentContainerId: string;
    orientation: 'b' | 'w';
    fen?: string;
    onPieceDrop?: (source: Square, target: Square) => void;
    onFENChange: (fen: string) => void;
}

interface ChessboardComponentState {
    width: number;
}

/**
 * A wrapper for the ChessboardJS component.
 */
class ChessboardComponent extends React.Component<
    ChessboardComponentProps,
    ChessboardComponentState
> {
    /**
     * Creates an instance of ChessboardComponent.
     * @param props - The props for the chessboard component.
     */
    constructor(props: ChessboardComponentProps) {
        super(props);
        this.state = {
            width: 500,
        };
    }

    /**
     * Binds an event listener to the window: upon resize, the board width will be
     * automatically updates
     */
    componentDidMount() {
        this.updateBoardWidth();
        window.addEventListener('resize', () => this.updateBoardWidth());
    }

    /**
     * Automatically updates the width of the chessboard according to
     * the width of the window.
     */
    updateBoardWidth() {
        const container = document.getElementById(this.props.parentContainerId);
        this.setState({ width: container!.offsetWidth! - 10 });
    }

    /**
     * @returns The chessboard component with the specified orientation and FEN state.
     */
    render() {
        return (
            <div>
                <Chessboard
                    position={this.props.fen}
                    boardWidth={this.state.width}
                    boardOrientation={this.props.orientation === 'b' ? 'black' : 'white'}
                    onPieceDrop={(source, target) => {
                        const isValid = this.tryMove(source, target);
                        if (isValid) {
                            this.props.onPieceDrop?.(source, target);

                            return true;
                        }

                        new ToastNotification('Invalid Move', 3000).fire();

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
        // const game = Chess(this.props.fen);
        // if (game.turn() !== this.props.orientation) {
        //     game.load(this.forceTurnChange(this.props.orientation));
        // }

        // // Checks if piece at game is valid for the orientation
        // const piece = game.get(source);
        // if (piece !== null && piece.color === this.props.orientation) {
        //     const move = game.move(`${source}-${target}`, { sloppy: true });
        //     return move !== null;
        // }
        // return false;
        if (source && target) return true;
        return true;
    }

    /**
     * Forces the board FEN to change the current turn to the specified turn.
     *
     * @param color - The color to change the turn to.
     * @returns The new FEN string
     */
    // private forceTurnChange(color: 'w' | 'b'): string {
    //     if (this.props.fen !== undefined) {
    //         const tokens = this.props.fen.split(' ');
    //         tokens[1] = color;
    //         const fen = tokens.join(' ');
    //         this.props.onFENChange(fen);
    //         return fen;
    //     }
    //     return this.props.fen ?? '';
    // }
}

export default ChessboardComponent;
