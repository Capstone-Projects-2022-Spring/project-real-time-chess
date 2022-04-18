import * as React from 'react';
import GameAccess from '../../access/GameAccess';
import GameHistoryItem from '../../components/GameHistoryItem';
import Titlebar from '../../components/Titlebar';
import ToastNotification from '../../components/UI/ToastNotification';
import UserProfileCard from '../../components/UserProfileCard';
import SupportedEmojis from '../../models/SupportedEmojis';
import UINavigator from '../../models/UINavigator';
import GameHistoryView from './GameHistoryView';

interface ProfileState {
    gameHistory: GameHistory[];
}

/**
 * The profile screen component.
 */
class Profile extends React.Component<NoProps, ProfileState> {
    /**
     * Creates an instance of Profile.
     * @param props - No props.
     */
    constructor(props: NoProps) {
        super(props);
        this.state = {
            gameHistory: [],
        };
    }

    /**
     * Pulls information about the user and updates the state
     * with the correct information.
     */
    async componentDidMount() {
        GameAccess.getHistory()
            .then(gameHistory => {
                let last5 = gameHistory.sort((a, b) => b.timestamp - a.timestamp);
                if (last5.length > 5) last5 = last5.slice(0, 5);
                this.setState({ gameHistory });
            })
            .catch(() => {
                ToastNotification.notify('There was error fetching your game history', 15000);
            });
    }

    /**
     * @returns The react element for the Profile view.
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title="Profile" />

                <div className="row p-4">
                    <div className="col-12 col-md-6 col-lg-4 p-4">
                        <UserProfileCard />
                    </div>
                    <div className="col-12 col-md-6 col-lg-8 p-4">
                        {this.state.gameHistory.map((gameHistory, index) => (
                            <GameHistoryItem
                                label={gameHistory.label}
                                gameKey={gameHistory.game_key
                                    .map(e => SupportedEmojis.find(obj => obj.name === e)!.emoji)
                                    .join('')}
                                timestamp={gameHistory.timestamp}
                                moves={gameHistory.history}
                                key={index}
                            />
                        ))}
                        {this.state.gameHistory.length > 0 ? (
                            <div
                                className="game-history-item"
                                onClick={() => UINavigator.render(<GameHistoryView />)}
                            >
                                View entire game history
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }

    /** Method to display or hide userInfo, updates values according to stored parameters. */
    userInfoToggle(displayStatus: string) {
        const firstName = document.getElementById('firstName');
        firstName!.style.visibility = displayStatus;
        const lastName = document.getElementById('lastName');
        lastName!.style.visibility = displayStatus;
        const email = document.getElementById('email');
        email!.style.visibility = displayStatus;
    }

    /** Method to display or hide user wins/losses,
     * updates values according to stored parameters. */
    userStatsToggle(displayStatus: string) {
        const wins = document.getElementById('wins');
        wins!.style.visibility = displayStatus;
        const losses = document.getElementById('losses');
        losses!.style.visibility = displayStatus;
        const total = document.getElementById('total');
        total!.style.visibility = displayStatus;
    }
}

export default Profile;
