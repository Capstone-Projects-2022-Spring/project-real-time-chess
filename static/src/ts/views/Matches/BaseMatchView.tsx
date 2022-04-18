import { Square } from 'chess.js';
import React from 'react';
import { io, Socket } from 'socket.io-client';
import Swal from 'sweetalert2';
import ToastNotification from '../../components/UI/ToastNotification';
import SupportedEmojis from '../../models/SupportedEmojis';
import UINavigator from '../../models/UINavigator';
import GameplayOptions from '../GameplayOptions';

interface BaseMatchProps {
    orientation: 'b' | 'w';
}

interface BaseMatchState {
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
            });
        });

        this.socket.on('game state', (gameState: IGameStateAPIResponse) => {
            this.setState({
                fen: gameState.fen,
            });
            this.displayCooldowns(gameState.cooldowns);
        });

        this.socket.on('blackWin', name => {
            Swal.fire({
                title: 'Winner',
                text: `${name} won the game!`,
                didClose: () => {
                    UINavigator.render(<GameplayOptions />);
                },
            }).catch(() => {
                UINavigator.render(<GameplayOptions />);
            });
        });

        this.socket.on('whiteWin', name => {
            Swal.fire({
                title: 'Winner',
                text: `${name} won the game!`,
                didClose: () => {
                    UINavigator.render(<GameplayOptions />);
                },
            }).catch(() => {
                UINavigator.render(<GameplayOptions />);
            });
        });

        this.socket.on('move-notification', message => {
            new ToastNotification(message, 3000).fire();
        });
    }

    /**
     * Renders the cooldowns for all the chess pieces
     * (This directly accesses the DOM without using React).
     *
     * @param cooldowns - The cooldown map for the chess pieces.
     */
    private displayCooldowns(cooldowns: Record<Square, ICooldown>) {
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
    private updateCooldownColors(cooldowns: Record<Square, ICooldown>) {
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
