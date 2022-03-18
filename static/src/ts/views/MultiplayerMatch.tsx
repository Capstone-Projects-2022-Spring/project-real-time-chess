import * as React from 'react';
import { io, Socket } from 'socket.io-client';
import Swal from 'sweetalert2';
import ChatComponent from '../components/ChatComponent';
import ChessboardComponent from '../components/ChessboardComponent';
import CookieManager from '../CookieManager';
import SupportedEmojis from '../SupportedEmojis';

interface MultiplayerMatchProps {
    orientation: 'b' | 'w';
}

interface MultiplayerMatchState {
    messages: IGameMessage[];
    fen?: string;
    gameKey: string;
}

class MultiplayerMatch extends React.Component<MultiplayerMatchProps, MultiplayerMatchState> {
    socket?: Socket;

    constructor(props: MultiplayerMatchProps) {
        super(props);
        this.state = {
            messages: [],
            fen: undefined,
            gameKey: '',
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Multiplayer Match</h1>
                    </div>
                    <div className="col" style={{ fontSize: '2rem' }}>
                        Game Key: {this.state.gameKey}
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <ChessboardComponent
                            orientation={this.props.orientation}
                            fen={this.state.fen}
                            onPieceDrop={(source, target) => {
                                this.socket?.emit('move piece', source, target);
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <ChatComponent messages={this.state.messages} />
                    </div>
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
        this.socket.emit(
            'authorize',
            CookieManager.uid,
            CookieManager.auth,
            (gameState: IGameStateAPIResponse) => {
                this.setState({
                    gameKey: gameState.gameKey
                        .map(eName => SupportedEmojis.find(e => e.name === eName)!.emoji)
                        .join(''),
                    fen: gameState.fen,
                    messages: gameState.messages,
                });
            },
        );

        this.socket.on('game state', (gameState: IGameStateAPIResponse) => {
            this.setState({
                fen: gameState.fen,
                messages: gameState.messages,
            });
        });

        this.socket.on('move piece', (response: IGameStateAPIResponse) => {
            if (!response.success) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid move',
                });
            } else {
                this.setState({
                    fen: response.fen,
                    messages: response.messages,
                    gameKey: response.gameKey
                        .map(eName => SupportedEmojis.find(e => e.name === eName)?.emoji)
                        .join(''),
                });
            }
        });
    }
}

export default MultiplayerMatch;
