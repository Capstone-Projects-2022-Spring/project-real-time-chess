import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.ts';
import ButtonComponent from './ButtonComponent';
const chess = new Chess()

interface YouvAIProps {
    background: string;
    position: string;
    mode: string;
}

interface YouvAIState {
    background: string;
    position: string;
    mode: string;
}

export default class YouvAI extends React.Component<
    YouvAIProps,
    YouvAIState
> {
    constructor(props: YouvAIProps) {
        super(props);
        this.state = {
            background: props.background,
            position: props.position,
            mode: props.mode
        };
    }

    YouvAIplay(){
        while(!chess.gameOver()){

            //let the player make a move
            //determine when the piece is dropped
            //update the fen string
            //call AIResponse
        }
    }

    userMove(sourceSquare, targetSquare){
        
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
                    //figure out how to make oNLY the players pieces draggable
                    //consider assigning hte player a random color
                    //^if you do that, change board orientation
                    //could highlight all possible move positions onPieceClick
                    //onPieceClick{()=>//callsomemethod}
                    onPieceDrop={this.YouvAIplay}
                    arePiecesDraggable={true}
                    animationDuration={200}
                    position={this.state.position}
                /> }
                <ButtonComponent label='Start Game' onClick={()=>{
                    this.YouvAIplay()
                }}/>
            </div>
          );
   }
}
