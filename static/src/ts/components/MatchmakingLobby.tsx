import * as React from 'react';
import { Socket, io } from 'socket.io-client';
import { NoProps } from '../models/types';
import CookieManager from '../CookieManager';
import ButtonComponent from './ButtonComponent';
import UINavigator from '../models/UINavigator';
import MultiplayerMatch from '../views/MultiplayerMatch';

interface MatchmakingLobbyState {
    status: string;
    count: number;
}

/**
 * This page renders when the user selects 'Play against Random'
 * and displays their status in the matchmaking queue
 */
class MatchmakingLobbyComponent extends React.Component<NoProps, MatchmakingLobbyState> {
    socket?: Socket;

    timeout?: NodeJS.Timeout;

    searchTimeout?: NodeJS.Timeout;

    team?: 'b' | 'w';

    /**
     * Creates and instance of the MatchmakingLobbyComponent
     * @param props - contains a button for ready up
     */
    constructor(props: NoProps) {
        super(props);
        this.state = { status: '', count: 0 };
    }

    /**
     * @returns the MatchmakingLobbyComponent
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1 style={{ textAlign: 'center' }}>Matchmaking Lobby</h1>
                </div>

                <div className="row">
                    <h3 style={{ textAlign: 'center' }}>{this.state.status}</h3>
                </div>

                <div className="row" id="empty-button-row"></div>

                <div className="row">
                    <div
                        className="col-xs-1 text-center"
                        id="hiddenButton"
                        style={{ visibility: 'hidden' }}
                    >
                        <ButtonComponent
                            label="Ready"
                            onClick={() => {
                                this.socket?.emit('ready');
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Fires when the component is displayed in the browser
     * Requests entrance into the matchmaking queue
     */
    componentDidMount() {
        this.bindSocket();
    }

    /**
     * Socket for communication with the server
     */
    bindSocket() {
        this.socket = io();
        this.socket.connect();
        this.socket.emit('queue', CookieManager.uid);
        this.socket.on('queue success', (position: number) => {
            let timer = 0;
            this.setState({
                status: `Searching for game... 0:00
                Position in queue... ${position}`,
            });
            this.timeout = setInterval(() => {
                timer += 1;
                this.setState({
                    status: `Searching for game... ${Math.floor(timer / 60)}:${String(
                        timer % 60,
                    ).padStart(2, '0')}
                    Position in queue... ${position}`,
                });
            }, 1000);
        });
        this.socket.on('queue failed', () => {
            this.setState({
                status: 'Failed to join queue :(',
            });
        });

        this.socket.on('ready clicked', (serverCount: number) => {
            this.setState({
                status: `Match found! Ready Count: ${this.state.count}/2`,
                count: serverCount,
            });
        });

        this.socket.on('match found', (orientation: 'b' | 'w') => {
            clearInterval(this.timeout!);
            const hiddenButton = document.getElementById('hiddenButton');
            hiddenButton!.style.visibility = 'visible';
            this.setState({
                status: `Match found! Ready Count: ${this.state.count}/2`,
            });
            this.team = orientation;
        });
        this.socket.on('start', () => {
            UINavigator.render(<MultiplayerMatch orientation={this.team!} />);
        });
    }
}

export default MatchmakingLobbyComponent;
