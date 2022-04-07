import * as React from 'react';
import ButtonComponent from '../components/ButtonComponent';
import Replays from './Replays';
import UINavigator from '../models/UINavigator';
import GameplayOptions from './GameplayOptions';
import { IonIcon } from '@ionic/react';

interface ProfileProps {
    username: string;
}

interface ProfileState {
    username: string;
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
            username: props.username,
            info: '',
        };
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
                                this.setState({
                                    info: 'name, email, rank',
                                });
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="User Stats"
                            width="100%"
                            onClick={() => {
                                this.setState({
                                    info: 'wins, loses, draws',
                                });
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="View Past Games"
                            width="100%"
                            onClick={() => {
                                UINavigator.render(<Replays username="dummy" />);
                               /* this.setState({

                                    info: 'past game info',
                                }); */
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="Log Out"
                            width="100%"
                            onClick={() => {
                                this.setState({
                                    info: 'log out',
                                });
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
