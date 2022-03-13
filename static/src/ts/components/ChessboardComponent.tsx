import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.ts';
import ButtonComponent from './ButtonComponent';
const chess = new Chess()

interface ChessboardComponentProps {
    background: string;
    position: string;
    mode: string;
}

interface ChessboardComponentState {
    background: string;
    position: string;
    mode: string;
}

export default class ChessboardComponent extends React.Component<
    ChessboardComponentProps,
    ChessboardComponentState
> {
    constructor(props: ChessboardComponentProps) {
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
            const move:string = moves[Math.floor(Math.random() * moves.length)]!
            console.log(chess.move(move))
            console.log(chess.fen())
            this.setState({
                position: chess.fen()
            })
        }
    }

    YouvsAIplay(){
        
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
