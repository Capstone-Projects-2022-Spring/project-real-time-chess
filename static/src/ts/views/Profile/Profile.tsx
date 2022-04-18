import * as React from 'react';
import Users from '../../access/Users';
import Titlebar from '../../components/Titlebar';
import ButtonComponent from '../../components/UI/ButtonComponent';
import UINavigator from '../../models/UINavigator';
import Replays from './Replays';

interface ProfileProps {
    email: string;
}

interface ProfileState {
    userFirst: string;
    userLast: string;
    email: string;
    wins: number;
    losses: number;
    totalGames: number;
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
            totalGames: 0,
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
                        totalGames: user.wins + user.losses,
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
                <Titlebar title="Profile" />

                <div className="row">
                    <div className="col">
                        <ButtonComponent
                            label="User Info"
                            width="100%"
                            onClick={() => {
                                this.userStatsToggle('collapse');
                                this.userInfoToggle('visible');
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="User Stats"
                            width="100%"
                            onClick={() => {
                                this.userInfoToggle('collapse');
                                this.userStatsToggle('visible');
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
                    <div className="row">
                        <table style={{ width: '50%' }}>
                            <tr id="firstName" style={{ visibility: 'collapse' }}>
                                <td style={{ fontSize: '28px' }}>First Name:</td>
                                <td style={{ fontSize: '20px' }}>{this.state.userFirst}</td>
                            </tr>
                            <tr id="lastName" style={{ visibility: 'collapse' }}>
                                <td style={{ fontSize: '28px' }}>Last Name:</td>
                                <td style={{ fontSize: '20px' }}>{this.state.userLast}</td>
                            </tr>
                            <tr id="email" style={{ visibility: 'collapse' }}>
                                <td style={{ fontSize: '28px' }}>Email:</td>
                                <td style={{ fontSize: '20px' }}>{this.state.email}</td>
                            </tr>
                            <tr id="wins" style={{ visibility: 'collapse' }}>
                                <td style={{ fontSize: '28px' }}>Wins:</td>
                                <td style={{ fontSize: '20px' }}>{this.state.wins}</td>
                            </tr>
                            <tr id="losses" style={{ visibility: 'collapse' }}>
                                <td style={{ fontSize: '28px' }}>Losses:</td>
                                <td style={{ fontSize: '20px' }}>{this.state.losses}</td>
                            </tr>
                            <tr id="total" style={{ visibility: 'collapse' }}>
                                <td style={{ fontSize: '28px' }}>Total Games:</td>
                                <td style={{ fontSize: '20px' }}>{this.state.totalGames}</td>
                            </tr>
                        </table>
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
export { ProfileProps, ProfileState };
