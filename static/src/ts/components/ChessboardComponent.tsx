import { Chess, Square } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';

interface ChessboardComponentProps {
    orientation: 'b' | 'w';
    fen?: string;
    onPieceDrop?: (source: Square, target: Square) => void;
    end_status: boolean;
    winner: string | null;
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

    /**
     * Checks if the game is over via checkmate, stalemate, draw,
     * threefold repetition, or insufficient material.
     * @returns True if the game is over, false otherwise.
     */
    private isGameOver(): boolean {
        const game = Chess(this.props.fen);
        return game.game_over();
    }

    /**
     * Checks if the game is in checkmate.
     * @returns True if the game is checkmate, false otherwise.
     */
    private isCheckmate(): boolean {
        const game = Chess(this.props.fen);
        return game.in_checkmate();
    }

    /**
     * Checks who's turn it currently is in the game
     *
     * @returns 'w' if white's turn, 'b' if black's turn
     */
    private whosTurn(): string {
        const game = Chess(this.props.fen);
        return game.turn();
    }
}

export default ChessboardComponent;
