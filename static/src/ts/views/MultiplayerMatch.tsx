import * as React from 'react';
import { io, Socket } from 'socket.io-client';
import ChatComponent from '../components/ChatComponent';
import ChessboardComponent from '../components/ChessboardComponent';

interface MultiplayerMatchProps {
    orientation: 'b' | 'w';
}

interface MultiplayerMatchState {
    messages: IGameMessage[];
    fen?: string;
}

class MultiplayerMatch extends React.Component<MultiplayerMatchProps, MultiplayerMatchState> {
    socket: Socket;

    constructor(props: MultiplayerMatchProps) {
        super(props);
        this.socket = io();
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
                        <ChessboardComponent
                            orientation={this.props.orientation}
                            fen={this.state.fen}
                        />
                    </div>
                    <div className="col-2">
                        <ChatComponent messages={this.state.messages} />
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.bindSocket();
    }

    bindSocket() {
        this.socket.on('game state', (gameState: IGameStateAPIResponse) => {
            this.setState({
                fen: gameState.fen,
                messages: gameState.messages,
            });
        });
    }
}

export default MultiplayerMatch;
