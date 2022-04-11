import * as React from 'react';
import ButtonComponent from '../components/ButtonComponent';
import Replays from './Replays';
import UINavigator from '../models/UINavigator';
import Users from '../access/Users';

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
                        info: 'not found',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    info: 'promise did not resolve',
                });
            });
    }

    /** Method to display or hide userInfo, updates values according to stored parameters. */
    userInfoToggle(userFirst: string, userLast: string, userEmail: string, displayStatus: string) {
        const firstName = document.getElementById('firstName');
        firstName!.innerHTML = userFirst;
        firstName!.style.display = displayStatus;
        const lastName = document.getElementById('lastName');
        lastName!.innerHTML = userLast;
        lastName!.style.display = displayStatus;
        const email = document.getElementById('email');
        email!.innerHTML = userEmail;
        email!.style.display = displayStatus;
    }

    /** Method to display or hide user wins/losses,
     * updates values according to stored parameters. */
    userStatsToggle(userWins: number, userLosses: number, displayStatus: string) {
        const wins = document.getElementById('wins');
        wins!.innerHTML = userWins.toString();
        wins!.style.display = displayStatus;
        const losses = document.getElementById('losses');
        losses!.innerHTML = userLosses.toString();
        losses!.style.display = displayStatus;
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
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ButtonComponent
                            label="User Info"
                            width="100%"
                            onClick={() => {
                                this.userInfoToggle(
                                    this.state.userFirst,
                                    this.state.userLast,
                                    this.state.email,
                                    'show',
                                );
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="User Stats"
                            width="100%"
                            onClick={() => {
                                this.userStatsToggle(this.state.wins, this.state.losses, 'show');
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="View Past Games"
                            width="100%"
                            onClick={() => {
                                UINavigator.render(<Replays username="dummy" />);
                            }}
                        />
                    </div>
                    <body>
                        <div id="userInfo" style={{ display: 'show' }}>
                            First Name: <span id="firstName"></span>
                        </div>
                        <div id="userInfo" style={{ display: 'show' }}>
                            Last Name: <span id="lastName"></span>
                        </div>
                        <div id="userInfo" style={{ display: 'show' }}>
                            Email: <span id="email"></span>
                        </div>
                        <div className="userStats" style={{ display: 'show' }}>
                            Wins: <span id="wins"></span>
                        </div>
                        <div className="userStats" style={{ display: 'show' }}>
                            Losses: <span id="losses"></span>
                        </div>
                    </body>
                </div>
            </div>
        );
    }
}

export default Profile;
export { ProfileProps, ProfileState };
