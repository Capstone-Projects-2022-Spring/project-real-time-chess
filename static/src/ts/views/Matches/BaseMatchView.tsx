import { Square } from 'chess.js';
import React from 'react';
import { io, Socket } from 'socket.io-client';
import ToastNotification from '../../components/ToastNotification';
import SupportedEmojis from '../../models/SupportedEmojis';

interface BaseMatchProps {
    orientation: 'b' | 'w';
}

interface BaseMatchState {
    messages: IGameMessage[];
    fen?: string;
    gameKey: string;
}

/**
 * The base class for all gameplay views.
 */
abstract class BaseMatchView<
    P extends BaseMatchProps,
    S extends BaseMatchState,
> extends React.Component<P, S> {
    socket?: Socket;

    localCooldownUpdateInterval?: number;

    /**
     * Creates an instance of MultiplayerMatch.
     * @param props - The props for the multiplayer match component.
     * This only includes the board orientation ('b' for black, 'w' for white).
     */
    constructor(props: P, initialState: S) {
        super(props);
        this.state = initialState;
    }

    /**
     * Binds the socket to this component when it mounts.
     */
    componentDidMount() {
        this.bindSocket();
    }

    abstract emitSocketAuthorization(
        onAuthorized: (gameState: IGameStateAPIResponse) => void,
    ): void;

    /**
     * Opens a new socket with the server and binds the socket to this component.
     */
    bindSocket() {
        this.socket = io();
        this.socket.connect();

        this.emitSocketAuthorization((gameState: IGameStateAPIResponse) => {
            this.setState({
                gameKey: gameState.gameKey
                    .map(eName => SupportedEmojis.find(e => e.name === eName)!.emoji)
                    .join(''),
                fen: gameState.fen,
                messages: gameState.messages,
            });
        });

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

export default BaseMatchView;
export { BaseMatchProps, BaseMatchState };
