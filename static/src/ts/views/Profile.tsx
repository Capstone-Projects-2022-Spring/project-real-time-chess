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
                                <div className="row">
                                    <div className="col">
                                        <h2 style={{ textAlign: 'left' }}>
                                            First Name: {this.state.userFirst}
                                        </h2>
                                        <h2 style={{ textAlign: 'left' }}>
                                            Last Name: {this.state.userLast}
                                        </h2>
                                        <h2 style={{ textAlign: 'left' }}>
                                            Email: {this.state.email}
                                        </h2>
                                    </div>
                                </div>;
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent label="User Stats" width="100%" onClick={() => {}} />
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
                </div>

                <div className="row">
                    <div className="col"></div>
                    <div className="col-12 col-md-6 col-lg-4 mt-2 text-center game-mode-hover-img-container light-shadow">
                        {this.state.info}
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default Profile;
export { ProfileProps, ProfileState };
