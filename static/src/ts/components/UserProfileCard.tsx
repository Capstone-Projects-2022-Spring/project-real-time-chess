import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import React from 'react';
import Users from '../access/Users';

interface UserProfileCardState {
    name?: {
        first: string;
        last: string;
    };
    wins?: number;
    losses?: number;
    email?: string;
    username?: string;
}

/**
 * Displays the profile of the currently logged in user
 */
class UserProfileCard extends React.Component<NoProps, UserProfileCardState> {
    /**
     * Creates an instance of UserProfileCard.
     *
     * @param props - Accepts no properties.
     */
    constructor(props: NoProps) {
        super(props);
        this.state = {};
    }

    /**
     * Submits a request to recieve user information from the server.
     * Then once the component is mounted, the user profile information in filled in.
     */
    async componentDidMount() {
        const user = await Users.getInfo();
        if (user) {
            this.setState({
                name: user.name,
                wins: user.wins,
                losses: user.losses,
                email: user.email,
                username: user.username,
            });
        }
    }

    /**
     * @returns The profile card for the logged in user.
     */
    render() {
        return (
            <div className="user-profile-card">
                <div className="row">
                    <div className="col text-center profile-card-icon">
                        <IonIcon icon={personCircleOutline} />
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        {this.state.name
                            ? `${this.state.name.first} ${this.state.name.last}`
                            : 'Loading...'}
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <div className="col">{this.state.username}</div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {this.state.email ? this.state.email : 'Loading...'}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <strong style={{ color: 'rgb(0, 255, 0)' }}>
                                    {this.state.wins}
                                </strong>{' '}
                                wins
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <strong style={{ color: 'rgb(255, 0, 0)' }}>
                                    {this.state.losses}
                                </strong>{' '}
                                losses
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfileCard;
