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
            const move: string = moves[Math.floor(Math.random() * moves.length)]!
            console.log(chess.move(move))
            console.log(chess.fen())
            this.setState({
                position: chess.fen()
            })
        }
    }

    YouvAIplay(){
        while(!chess.gameOver()){
            //let the player make a move
            //determine when the piece is dropped
            //update the fen string
            //call AIResponse
        }
    }

    AIResponse(): void {
        const moves = chess.moves()
        const move: string = moves[Math.floor(Math.random() * moves.length)]!
        console.log(chess.move(move))
        console.log(chess.fen())
        chess.move(move)
        //update the fen string
        this.setState({
            position: chess.fen()
        })
    }

    render() {
        return (
            <div>
                {<Chessboard
                    //arePiecesDraggable={true}
                    //figure out how to make oNLY the players pieces draggable
                    //consider assigning hte player a random color
                    //^if you do that, change board orientation
                    //could highlight all possible move positions onPieceClick
                    //onPieceClick{()=>//callsomemethod}
                    //onPieceDrop => update fen string
                    arePiecesDraggable={false}
                    animationDuration={200}
                    position={this.state.position}
                /> }
                <ButtonComponent label='Make A Move' onClick={()=>{
                    if (this.state.mode === 'AIvAI')
                        this.AIplay()
                    //if(this.state.mode === 'YouvAI')
                    //  this.YouvAIplay()
                }}/>
            </div>
          );
   }
}
