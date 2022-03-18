import { Move } from 'chess.js';
import * as React from 'react';
import { io, Socket } from 'socket.io-client';
import Swal from 'sweetalert2';
import ChatComponent from '../components/ChatComponent';
import ChessboardComponent from '../components/ChessboardComponent';
import CookieManager from '../CookieManager';

interface MultiplayerMatchProps {
    orientation: 'b' | 'w';
}

interface MultiplayerMatchState {
    messages: IGameMessage[];
    fen?: string;
}

class MultiplayerMatch extends React.Component<MultiplayerMatchProps, MultiplayerMatchState> {
    socket?: Socket;

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
                        <ChessboardComponent
                            orientation={this.props.orientation}
                            fen={this.state.fen}
                            onPieceDrop={(source, target) => {
                                this.socket?.emit('move piece', source, target);
                            }}
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
        this.socket = io();
        this.socket.connect();
        this.socket.emit('authorize', CookieManager.uid, CookieManager.auth);

        this.socket.on('game state', (gameState: IGameStateAPIResponse) => {
            this.setState({
                fen: gameState.fen,
                messages: gameState.messages,
            });
        });

        this.socket.on('move piece', (move: APIResponse & { move: Move }) => {
            if (!move.success) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid move',
                });
            }
        });
    }
}

export default MultiplayerMatch;
