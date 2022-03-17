import * as React from 'react';
import GameAccess from '../access/GameAccess';
import ChatComponent from '../components/ChatComponent';
import ChessboardComponent from '../components/ChessboardComponent';

interface MultiplayerMatchProps {
    orientation: 'b' | 'w';
}

interface MultiplayerMatchState {
    messages: IGameMessage[];
}

class MultiplayerMatch extends React.Component<MultiplayerMatchProps, MultiplayerMatchState> {
    constructor(props: MultiplayerMatchProps) {
        super(props);
        this.state = {
            messages: [],
        };
    }

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
                        <ChatComponent messages={this.state.messages} />
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }

    syncGameState() {
        GameAccess.getGameState().then(gameState => {
            this.setState({
                messages: gameState.messages,
            });
        });
    }
}

export default MultiplayerMatch;
