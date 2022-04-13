import * as React from 'react';
import { IonIcon } from '@ionic/react';
import ButtonComponent from '../components/ButtonComponent';
import Replays from './Replays';
import UINavigator from '../models/UINavigator';
import Users from '../access/Users';
import GameplayOptions from './GameplayOptions';

interface ProfileProps {
    email: string;
}

interface ProfileState {
    userFirst: string;
    userLast: string;
    email: string;
    wins: number;
    losses: number;
    info: string;
}

/**
 * The profile screen component.
 */
class Profile extends React.Component<ProfileProps, ProfileState, { info: string }> {
    /**
     * Creates an instance of Profile.
     * @param props - No props.
     */
    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            userFirst: '',
            userLast: '',
            email: '',
            info: '',
            wins: 0,
            losses: 0,
        };
    }

    /**
     * Gets the user information from the users collection database.
     */
    componentDidMount() {
        Users.getInfo()
            .then(user => {
                if (user) {
                    this.setState({
                        userFirst: user.name.first,
                        userLast: user.name.last,
                        email: user.email,
                        wins: user.wins,
                        losses: user.losses,
                    });
                } else {
                    this.setState({
                        userFirst: 'else',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    userFirst: 'promise did not resolve',
                });
            });
    }

    /**
     * @returns The react element for the Profile view.
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Profile</h1>
                        <ButtonComponent
                            onClick={() => {
                                UINavigator.render(<GameplayOptions />);
                            }}
                        >
                            <IonIcon style={{ textAlign: 'center' }} />
                            <span>Home</span>
                        </ButtonComponent>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ButtonComponent
                            label="User Info"
                            width="100%"
                            onClick={() => {
                                this.userStatsToggle('none');
                                this.userInfoToggle('block');
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="User Stats"
                            width="100%"
                            onClick={() => {
                                this.userInfoToggle('none');
                                this.userStatsToggle('block');
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="View Past Games"
                            width="100%"
                            onClick={() => {
                                UINavigator.render(<Replays />);
                            }}
                        />
                    </div>
                    <div id="firstName" style={{ display: 'block' }}>
                        First Name: {this.state.userFirst}
                    </div>
                    <div id="lastName" style={{ display: 'block' }}>
                        Last Name: {this.state.userLast}
                    </div>
                    <div id="email" style={{ display: 'block' }}>
                        Email: {this.state.email}
                    </div>
                    <div className="wins" style={{ display: 'block' }}>
                        Wins: {this.state.wins}
                    </div>
                    <div className="losses" style={{ display: 'block' }}>
                        Losses: {this.state.losses}
                    </div>
                </div>
            </div>
        );
    }

    /** Method to display or hide userInfo, updates values according to stored parameters. */
    userInfoToggle(displayStatus: string) {
        const firstName = document.getElementById('firstName');
        firstName!.style.display = displayStatus;
        const lastName = document.getElementById('lastName');
        lastName!.style.display = displayStatus;
        const email = document.getElementById('email');
        email!.style.display = displayStatus;
    }

    /** Method to display or hide user wins/losses,
     * updates values according to stored parameters. */
    userStatsToggle(displayStatus: string) {
        const wins = document.getElementById('wins');
        wins!.style.display = displayStatus;
        const losses = document.getElementById('losses');
        losses!.style.display = displayStatus;
    }
}

export default Profile;
export { ProfileProps, ProfileState };
