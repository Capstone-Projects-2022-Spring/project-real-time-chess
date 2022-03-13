import * as React from 'react';
import ChatComponent from '../components/ChatComponent';
import ChessboardComponent from '../components/ChessboardComponent';

export default class MultiplayerMtch extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Multiplayer Match</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="col-6">
                            <ChessboardComponent />
                        </div>
                        <div className="col-2 bg-dark">
                            <ChatComponent />
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        );
    }
}
