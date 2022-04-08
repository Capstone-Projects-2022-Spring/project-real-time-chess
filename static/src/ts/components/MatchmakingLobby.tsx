import * as React from 'react';
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
    /**
     * Creates and instance of the MatchmakingLobbyComponent
     * @param props - No props used
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

                <div className="row"></div>
            </div>
        );
    }

    /**
     * Fires when the component is displayed in the browser
     * Requests entrance into the matchmaking queue
     */
    componentDidMount() {
        MatchAccess.queue(CookieManager.uid);
        this.setState({
            status: 'Searching for game...',
        });
    }
}

export default MatchmakingLobbyComponent;
