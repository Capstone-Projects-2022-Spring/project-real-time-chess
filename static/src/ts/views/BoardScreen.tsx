import * as React from 'react';
// import ButtonComponent from '../components/ButtonComponent';
import ChessboardComponent from '../components/ChessboardComponent';
// import { NoProps } from '../models/types';

/**
 * Gameplay options page which allows a user to choose which game mode they want to play.
 *
 * @export
 * @class BoardScreen
 * @extends {React.Component<BoardScreenProps, BoardScreenState>}
 */

 export interface BoardScreenProps {
    mode: string;
    username: string;
}

export interface BoardScreenState {
    mode: string;
    username: string;
}

 export default class BoardScreen extends React.Component<BoardScreenProps, BoardScreenState> {
    constructor(props: BoardScreenProps) {
        super(props);
        this.state = {
            mode: props.mode,
            username: props.username,
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Chessboard</h1>
                        <ChessboardComponent background='white' position={'start'} mode={this.state.mode}/>
                    </div>
                </div>
            </div>
        );
    }
}