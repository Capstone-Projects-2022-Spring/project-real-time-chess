import * as React from 'react';
import ChatComponent from '../components/ChatComponent';
import ChessboardComponent from '../components/ChessboardComponent';

export default class MultiplayerMatch extends React.Component<{ orientation: 'b' | 'w' }> {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Multiplayer Match</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col"></div>
                    <div className="col-6">
                        <ChessboardComponent orientation={this.props.orientation} />
                    </div>
                    <div className="col-2">
                        <ChatComponent />
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}
