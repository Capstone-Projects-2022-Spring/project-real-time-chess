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

    /** Method to display userInfo, updates values according to stored parameters. */
    userInfo(userFirst: string, userLast: string, userEmail: string) {
        const firstName = document.getElementById('firstName');
        firstName!.innerHTML = userFirst;
        const lastName = document.getElementById('lastName');
        lastName!.innerHTML = userLast;
        const email = document.getElementById('email');
        email!.innerHTML = userEmail;
    }

    /** Method to display user wins/losses, updates values according to stored parameters. */
    userStats(userWins: number, userLosses: number) {
        const wins = document.getElementById('wins');
        wins!.innerHTML = userWins.toString();
        const losses = document.getElementById('losses');
        losses!.innerHTML = userLosses.toString();
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
                                UINavigator.render(<GameplayOptions/>);
                            }}
                        >
                            <IonIcon
                                style={{ textAlign: 'center' }}
                            />
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
                                this.userInfo(
                                    this.state.userFirst,
                                    this.state.userLast,
                                    this.state.email,
                                );
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="User Stats"
                            width="100%"
                            onClick={() => {
                                this.userStats(this.state.wins, this.state.losses);
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="View Past Games"
                            width="100%"
                            onClick={() => {
                                UINavigator.render(<Replays/>);
                               /* this.setState({

                                    info: 'past game info',
                                }); */
                            }}
                        />
                    </div>
                    <body>
                        <div className="userInfo" style={{ display: 'block' }}>
                            First Name: <span id="firstName"></span>
                        </div>
                        <div className="userInfo" style={{ display: 'block' }}>
                            Last Name: <span id="lastName"></span>
                        </div>
                        <div className="userInfo" style={{ display: 'block' }}>
                            Email: <span id="email"></span>
                        </div>
                        <div className="userStats" style={{ display: 'block' }}>
                            Wins: <span id="wins"></span>
                        </div>
                        <div className="userStats" style={{ display: 'block' }}>
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
