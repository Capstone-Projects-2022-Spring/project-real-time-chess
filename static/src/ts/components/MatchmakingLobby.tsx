import * as React from 'react';
import { Socket, io } from 'socket.io-client';
import { NoProps } from '../models/types';
import MatchAccess from '../access/MatchAccess';
import CookieManager from '../CookieManager';

// interface MatchmakingLobbyProps {}

// interface MatchmakingLobbyState {}

/**
 * This page renders when the user selects 'Play against Random'
 * and displays their status in the matchmaking queue
 */
class MatchmakingLobbyComponent extends React.Component<NoProps, { status: string }> {
    socket?: Socket;

    matchFound: boolean;

    /**
     * Creates and instance of the MatchmakingLobbyComponent
     * @param props - No props used
     */
    constructor(props: NoProps) {
        super(props);
        this.state = { status: '' };
        this.matchFound = false;
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

                <div className="row"></div>
            </div>
        );
    }

    /**
     * Fires when the component is displayed in the browser
     * Requests entrance into the matchmaking queue
     */
    componentDidMount() {
        this.bindSocket();
        MatchAccess.queue(CookieManager.uid);
        let timer = 0;
        this.setState({
            status: 'Searching for game... 0:00',
        });
        const timeout = setInterval(() => {
            timer += 1;
            if (this.matchFound) {
                clearInterval(timeout);
            }
            this.setState({
                status: `Searching for game... ${Math.floor(timer / 60)}:${String(
                    timer % 60,
                ).padStart(2, '0')}`,
            });
        }, 1000);
    }

    /**
     * Connect to server via socket.io
     */
    private bindSocket() {
        this.socket = io();
        this.socket.connect();
        this.socket.on('match found', () => {
            this.matchFound = true;
            this.setState({
                status: 'Game found!',
            });
        });
    }
}

export default MatchmakingLobbyComponent;
