// import { Chess } from 'chess.js';
import * as React from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.ts';
import ButtonComponent from './ButtonComponent';
// import { useRef, useState } from 'react';
const chess = new Chess()

// export default function SimplePlay({boardWidth}) {
// const chessboardRef = useRef();
// const [game, setGame] = useState(new Chess());

interface ChessboardComponentProps {
    background: string;
}

interface ChessboardComponentState {
    background: string;
}

export default class ChessboardComponent extends React.Component<
    ChessboardComponentProps,
    ChessboardComponentState
> {
    constructor(props: ChessboardComponentProps) {
        super(props);
        this.state = {
            background: props.background,
        };
    }

    play() {
        while (!chess.gameOver()) {
            const moves = chess.moves()
            const move:string = moves[Math.floor(Math.random() * moves.length)]!
            console.log(chess.move(move))
        }
        console.log(chess.pgn())
        // return <Chessboard position={game.fen}/>
    }

    render() {
        return (
            <div>
                <Chessboard
                    arePiecesDraggable={false}
                    animationDuration={200}
                    position={chess.fen()}
                />
                <ButtonComponent label='Start Game' onClick={()=>{this.play()}}/>
            </div>
            // <div>
            //   <Chessboard
            //     id="TwoPlayer"
            //     animationDuration={200}
            //     boardWidth={boardWidth}
            //     position={game.fen()}
            //     onPieceDrop={onDrop}
            //     customBoardStyle={{
            //       borderRadius: '4px',
            //       boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
            //     }}
            //     ref={chessboardRef}
            //   />
            //   <button
            //     className="rc-button"
            //     onClick={() => {
            //       safeGameMutate((game: { reset: () => void; }) => {
            //         game.reset();
            //       });
            //       chessboardRef.current.clearPremoves();
            //     }}
            //   >
            //     reset
            //   </button>
            //   <button
            //     className="rc-button"
            //     onClick={() => {
            //       safeGameMutate((game) => {
            //         game.undo();
            //       });
            //       chessboardRef.current.clearPremoves();
            //     }}
            //   >
            //     undo
            //   </button>
            // </div>
          );
   }

    // function safeGameMutate(modify){
    //   setGame((g) => {
    //     const update = { ...g };
    //     modify(update);
    //     return update;
    //   });
    // }
  
    // function onDrop(sourceSquare: Square, targetSquare: Square) {
    //   const gameCopy = { ...game };
    //   const move = gameCopy.move({
    //     from: sourceSquare,
    //     to: targetSquare,
    //     promotion: 'q' // always promote to a queen for example simplicity
    //   });
    //   setGame(gameCopy);
    //   return move;
    // }
}
