import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.ts';
import ButtonComponent from './ButtonComponent';
import ChessBoard from "../../../../src/main/ChessBoard";
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


    //when user.move(move).color, you can see .piece or .color
    //check if the piece matches

    YouvAIplay(){
        let count = 0
        while(!chess.gameOver()){
            if (count % 2 === 0){
                //determine where the piece the user wants to move is
                //determine what piece type the user wants to move
                //determine where the user wants to move the piece
                let sourceSquare = 'e4' //get the starting piece position, placeholder value for now
                let targetSquare = 'e5' //get the ending piece position, placeholder value for now
                while(!this.userMove(sourceSquare, targetSquare)){
                //only exits the while loop once a valid move was made
                //piece should snap back if the user move was invalid
                }
            } else {
                this.AIResponse();
            }
            count++
            //let the player make a move
            //determine when the piece is dropped
            //update the fen string
            //call AIResponse
        }
    }

    userMove(sourceSquare: Chessboard., targetSquare): boolean{
        //attempt to make the move, update the position FEN string if move is valid and return true

        return false
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
                    onPieceDrop={this.userMove}
                    onSquareClick={}
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
