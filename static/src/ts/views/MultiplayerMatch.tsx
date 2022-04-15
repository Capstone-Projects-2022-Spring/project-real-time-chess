import * as React from 'react';
import { io, Socket } from 'socket.io-client';
import ButtonComponent from '../components/ButtonComponent';
import ChatComponent from '../components/ChatComponent';
import ChessboardComponent from '../components/ChessboardComponent';
import ToastNotification from '../components/ToastNotification';
import CookieManager from '../CookieManager';
import UINavigator from '../models/UINavigator';
import SupportedEmojis from '../SupportedEmojis';
import GameplayOptions from './GameplayOptions';

interface MultiplayerMatchProps {
    orientation: 'b' | 'w';
}

interface MultiplayerMatchState {
    messages: IGameMessage[];
    fen?: string;
    gameKey: string;
}

/**
 * The multiplayer match component. This displays the chessboard and chat components.
 */
class MultiplayerMatch extends React.Component<MultiplayerMatchProps, MultiplayerMatchState> {
    /**
     * The open socket between the client and the server.
     */
    socket?: Socket;

    /**
     * Creates an instance of MultiplayerMatch.
     * @param props - The props for the multiplayer match component.
     * This only includes the board orientation ('b' for black, 'w' for white).
     */
    constructor(props: MultiplayerMatchProps) {
        super(props);
        this.state = {
            messages: [],
            fen: undefined,
            gameKey: '',
        };
    }

    /**
     * @returns The multiplayer match component.
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <h1 style={{ textAlign: 'center' }}>Multiplayer Match</h1>
                    <div className="col" style={{ paddingBottom: '10px' }}>
                        <ButtonComponent
                            label="Home"
                            width="100%"
                            onClick={() => {
                                UINavigator.render(<GameplayOptions />);
                            }}
                        />
                    </div>
                    <div className="col" style={{ fontSize: '2rem' }}>
                        Game Key: {this.state.gameKey}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6 text-center">
                        <div className="cooldownOverlay container" style={{ zIndex: 10 }}>
                            <div className="cooldownOverlay overlay" id="overlay"></div>
                        </div>
                        <div id="boardContainer" style={{ width: '100%', height: '100%' }}>
                            <ChessboardComponent
                                parentContainerId="boardContainer"
                                orientation={this.props.orientation}
                                fen={this.state.fen}
                                onPieceDrop={(source, target) => {
                                    this.socket?.emit('move piece', source, target);
                                }}
                                onFENChange={fen =>
                                    this.setState({
                                        fen,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <ChatComponent messages={this.state.messages} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ButtonComponent
                            onClick={() => {
                                this.socket?.emit('move ai');
                            }}
                        >
                            AI Move
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Binds the socket to this component when it mounts.
     */
    componentDidMount() {
        this.bindSocket();
        const squareArray: string[][] = [
            ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
            ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
            ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
            ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
            ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
            ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
            ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
            ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
        ];
        const overlayOrientation = this.props.orientation;
        const table = document.getElementById('overlay');
        if (overlayOrientation === 'w') {
            for (let i = 7; i >= 0; i--) {
                const row = document.createElement('div');
                row.className = 'cooldownOverlay row';
                table?.appendChild(row);
                for (let j = 0; j < 8; j++) {
                    const square = document.createElement('div');
                    square.id = squareArray?.at(i)?.at(j) ?? '?';
                    square.className = 'cooldownOverlay square';
                    row.appendChild(square);
                    // square.innerHTML = `<h1>${square.id}</h1>`;
                }
            }
        } else {
            for (let i = 0; i < 8; i++) {
                const row = document.createElement('div');
                row.className = 'cooldownOverlay row';
                table?.appendChild(row);
                for (let j = 7; j >= 0; j--) {
                    const square = document.createElement('div');
                    square.id = squareArray?.at(i)?.at(j) ?? '?';
                    square.className = 'cooldownOverlay square';
                    row.appendChild(square);
                    // square.innerHTML = `<h1>${square.id}</h1>`;
                }
            }
        }
    }

    /**
     * Opens a new socket with the server and binds the socket to this component.
     */
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

        this.socket.on('blackWin', name => {
            new ToastNotification('Winner!', `${name} is the winner!`, 'success').fire();
        });

        this.socket.on('whiteWin', name => {
            new ToastNotification('Winner!', `${name} is the winner!`, 'success').fire();
        });

        this.socket.on('move piece', (response: IGameStateAPIResponse) => {
            if (!response.success) {
                new ToastNotification('Invalid Move', 'You cannot make that move!', 'error').fire();
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
