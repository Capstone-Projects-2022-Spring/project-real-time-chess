import { Square } from 'chess.js';
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

interface AIvAIMatchProps {
    orientation: 'b' | 'w';
}

interface AIvAIMatchState {
    messages: IGameMessage[];
    fen?: string;
    gameKey: string;
}

/**
 * The multiplayer match component. This displays the chessboard and chat components.
 */
class AIvAIMatch extends React.Component<AIvAIMatchProps, AIvAIMatchState> {
    socket?: Socket;

    localCooldownUpdateInterval?: number;

    /**
     * Creates an instance of MultiplayerMatch.
     * @param props - The props for the multiplayer match component.
     * This only includes the board orientation ('b' for black, 'w' for white).
     */
    constructor(props: AIvAIMatchProps) {
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
                    <div id="boardContainer" className="col-12 col-md-6 text-center">
                        <ChessboardComponent
                            parentContainerId="boardContainer"
                            orientation={this.props.orientation}
                            fen={this.state.fen}
                            onFENChange={fen =>
                                this.setState({
                                    fen,
                                })
                            }
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <ChatComponent messages={this.state.messages} />
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
    }

    /**
     * Opens a new socket with the server and binds the socket to this component.
     */
    bindSocket() {
        this.socket = io();
        this.socket.connect();
        this.socket.emit(
            'authorize-ai-v-ai',
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
            this.displayCooldowns(gameState.cooldowns);
        });

        this.socket.on('blackWin', name => {
            new ToastNotification('Winner!', `${name} is the winner!`, 'success').fire();
        });

        this.socket.on('whiteWin', name => {
            new ToastNotification('Winner!', `${name} is the winner!`, 'success').fire();
        });
    }

    /**
     * Renders the cooldowns for all the chess pieces
     * (This directly accesses the DOM without using React).
     *
     * @param cooldowns - The cooldown map for the chess pieces.
     */
    private displayCooldowns(cooldowns: Record<Square, CooldownInterface>) {
        if (this.localCooldownUpdateInterval) {
            window.clearInterval(this.localCooldownUpdateInterval);
            this.localCooldownUpdateInterval = undefined;
        }

        const localCooldowns = cooldowns;

        this.updateCooldownColors(localCooldowns);

        this.localCooldownUpdateInterval = window.setInterval(() => {
            const keys = Object.keys(localCooldowns) as Square[];
            keys.forEach(key => localCooldowns[key].time--);
            this.updateCooldownColors(localCooldowns);
        }, 1000);
    }

    /**
     * Updates the cooldown colors for the chess squaes.
     *
     * @param cooldowns - The cooldown map for the chess pieces.
     */
    private updateCooldownColors(cooldowns: Record<Square, CooldownInterface>) {
        const cooldownKeys = Object.keys(cooldowns) as Square[];

        if (cooldownKeys.length > 0) {
            cooldownKeys.forEach(square => {
                const tile = document
                    .querySelector(`[data-square=${square}]`)!
                    .querySelector('div')!;
                const { time } = cooldowns[square];

                if (time <= 1) tile.style.background = 'none';
                else if (time <= 2) tile.style.backgroundColor = 'yellow';
                else if (time <= 4) tile.style.backgroundColor = 'orange';
                else tile.style.backgroundColor = 'red';
            });
        }
    }
}

export default AIvAIMatch;
