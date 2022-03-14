import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.ts';
import ButtonComponent from './ButtonComponent';
const chess = new Chess()

interface AIvAIBoardProps {
    background: string;
    position: string;
    mode: string;
}

interface AIvAIBoardState {
    background: string;
    position: string;
    mode: string;
}

export default class AIvAIBoard extends React.Component<
    AIvAIBoardProps,
    AIvAIBoardState
> {
    constructor(props: AIvAIBoardProps) {
        super(props);
        this.state = {
            background: props.background,
            position: props.position,
            mode: props.mode
        };
    }

    AIplay() {
        if (!chess.gameOver()) {
            const moves = chess.moves()
            const move: string = moves[Math.floor(Math.random() * moves.length)]!
            console.log(chess.move(move))
            console.log(chess.fen())
            this.setState({
                position: chess.fen()
            })
        }
    }

    render() {
        return (
            <div>
                {<Chessboard
                    arePiecesDraggable={false}
                    animationDuration={200}
                    position={this.state.position}
                /> }
                <ButtonComponent label='Make A Move' onClick={()=>{
                    if (this.state.mode === 'AIvAI')
                        this.AIplay()
                }}/>
            </div>
          );
   }
}
