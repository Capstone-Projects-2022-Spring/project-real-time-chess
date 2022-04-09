import * as React from 'react';
import { Socket, io } from 'socket.io-client';
import { NoProps } from '../models/types';
import MatchAccess from '../access/MatchAccess';
import CookieManager from '../CookieManager';
import ButtonComponent from './ButtonComponent';
import UINavigator from '../models/UINavigator';
import MultiplayerMatch from '../views/MultiplayerMatch';

interface MatchmakingLobbyState {
    status: string;
}

/**
 * This page renders when the user selects 'Play against Random'
 * and displays their status in the matchmaking queue
 */
class MatchmakingLobbyComponent extends React.Component<NoProps, MatchmakingLobbyState> {
    socket?: Socket;

    timeout?: NodeJS.Timeout;

    searchTimeout?: NodeJS.Timeout;

    readyCount = 0;

    team?: 'b' | 'w';

    /**
     * Creates and instance of the MatchmakingLobbyComponent
     * @param props - contains a button for ready up
     */
    constructor(props: NoProps) {
        super(props);
        this.state = { status: '' };
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
        MatchAccess.queue(CookieManager.uid);
        let timer = 0;
        this.setState({
            status: 'Searching for game... 0:00',
        });
        this.timeout = setInterval(() => {
            timer += 1;
            this.setState({
                status: `Searching for game... ${Math.floor(timer / 60)}:${String(
                    timer % 60,
                ).padStart(2, '0')}`,
            });
        }, 1000);
        this.searchTimeout = setInterval(() => {
            MatchAccess.query(CookieManager.uid).then(response => {
                if (response.success) {
                    clearInterval(this.timeout!);
                    clearInterval(this.searchTimeout!);
                    const hiddenButton = document.getElementById('hiddenButton');
                    hiddenButton!.style.visibility = 'visible';
                    this.setState({
                        status: `Match found!
                        Ready Count: ${this.readyCount}/2`,
                    });
                    this.bindSocket();
                }
            });
        }, 5000);
    }

    /**
     * Socket for communication with the server
     */
    bindSocket() {
        this.socket = io();
        this.socket.connect();
        this.socket.emit('authorize', CookieManager.uid, CookieManager.auth);
        this.socket.on('count', (count: number) => {
            this.readyCount++;
            this.setState({
                status: `Match found!
                Ready Count: ${count}/2`,
            });
        });
        this.socket.on('start', (color: 'b' | 'w') => {
            UINavigator.render(<MultiplayerMatch orientation={color} />);
        });
    }
}

export default MatchmakingLobbyComponent;
