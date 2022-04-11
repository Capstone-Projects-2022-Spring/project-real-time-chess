import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import ButtonComponent from '../components/ButtonComponent';
import UINavigator from '../models/UINavigator';
import GameplayOptions from './GameplayOptions';

interface BoardScreenProps {
    position: string;
}

interface BoardScreenState {
    position: string;
}

/**
 * The board screen component.
 */
class BoardScreen extends React.Component<BoardScreenProps, BoardScreenState> {
    /**
     * Creates an instance of BoardScreen.
     * @param props - No props.
     */
    constructor(props: BoardScreenProps) {
        super(props);
        this.state = {
            position: 'start',
        };
    }

    /** Method to play two easy AI against each other. Makes dummy moves. */
    AIplay() {
        const chess = new Chess();
        if (!chess.game_over()) {
            const moves = chess.moves();
            const move: string = moves[Math.floor(Math.random() * moves.length)]!;
            chess.move(move);
            this.setState({
                position: chess.fen(),
            });
        }
    }

    /**
     * @returns The react element for the BoardScreen view.
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Chessboard</h1>
                        <ButtonComponent
                            label="Home"
                            onClick={() => {
                                UINavigator.render(<GameplayOptions />);
                            }}
                        />
                        <Chessboard arePiecesDraggable={false} animationDuration={200} />
                        <ButtonComponent
                            label="Make A Move"
                            onClick={() => {
                                this.AIplay();
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default BoardScreen;
export { BoardScreenProps, BoardScreenState };
