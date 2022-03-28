import { Chess, Square } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import ToastNotification from './ToastNotification';

interface ChessboardComponentProps {
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
        const windowWidth = window.innerWidth;

        if (windowWidth < 600) {
            this.setState({ width: windowWidth - 100 });
        } else if (windowWidth < 1000) {
            this.setState({ width: windowWidth / 2 - 100 });
        } else {
            this.setState({ width: windowWidth / 2 - 100 });
        }
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

                        new ToastNotification(
                            'Invalid Move',
                            `You cannot make that move! Current turn: ${this.props.fen}`,
                            'error',
                        ).fire();

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

        if (game.turn() !== this.props.orientation) {
            this.forceTurnChange(this.props.orientation);
        }

        // Checks if piece at game is valid for the orientation
        const piece = game.get(source);
        if (piece !== null && piece.color === this.props.orientation) {
            const move = game.move(`${source}-${target}`, { sloppy: true });
            return move !== null;
        }
        return false;
    }

    /**
     * Forces the board FEN to change the current turn to the specified turn.
     *
     * @param color - The color to change the turn to.
     */
    private forceTurnChange(color: 'w' | 'b') {
        if (this.props.fen !== undefined) {
            const tokens = this.props.fen.split(' ');
            tokens[1] = color;
            this.props.onFENChange(tokens.join(' '));
        }
    }
}

export default ChessboardComponent;
