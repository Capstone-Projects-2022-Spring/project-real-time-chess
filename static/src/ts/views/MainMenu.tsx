import { IonIcon } from '@ionic/react';
import {
    cloudOfflineOutline,
    helpCircleOutline,
    logOutOutline,
    personOutline,
} from 'ionicons/icons';
import * as React from 'react';
import CookieManager from '../access/CookieManager';
import ButtonComponent from '../components/UI/ButtonComponent';
import UINavigator from '../models/UINavigator';
import Homepage from './Homepage';
import HowToPlay from './HowToPlay';
import MultiplayerMatch from './Matches/MultiplayerMatch';
import Profile from './Profile/Profile';
import AIvAISetup from './SetupScreens/AIvAISetup';
import FriendGameSetupComponent from './SetupScreens/FriendGameSetup';
import MatchmakingLobbyComponent from './SetupScreens/MatchmakingLobby';

/**
 * Gameplay options page which allows a user to choose which game mode they want to play.
 */
class GameplayOptions extends React.Component<
    NoProps,
    { hoverImage: string; hoverImageCaption: string }
> {
    /**
     * Creates an instance of GameplayOptions.
     * @param props - No Props.
     */
    constructor(props: NoProps) {
        super(props);
        this.state = {
            hoverImage: '',
            hoverImageCaption: '',
        };
    }

    /**
     * @returns The react element for the GameplayOptions view.
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-12 col-md-6 col-lg-3 mt-2 mb-4 text-center d-none d-md-block">
                        <div className="game-mode-hover-img-container light-shadow mb-4">
                            <img src={this.state.hoverImage} className="w-100" />
                        </div>
                        {this.state.hoverImageCaption}
                    </div>
                    <div className="col"></div>
                </div>

                <div className="row">
                    <div
                        className="col-12 col-md-6 col-lg-3 mb-2"
                        onMouseOver={() => {
                            this.setState({
                                hoverImage: '/img/YouVAI.png',
                                hoverImageCaption:
                                    "You v AI: Play against artificial intelligence. If you're scared, lower the difficulty.",
                            });
                        }}
                    >
                        <ButtonComponent label="You v AI" width="100%" onClick={() => undefined} />
                    </div>
                    <div
                        className="col-12 col-md-6 col-lg-3 mb-2"
                        onMouseOver={() => {
                            this.setState({
                                hoverImage: '/img/YouVFriend.png',
                                hoverImageCaption:
                                    'You v Friend: Play against someone you already know via a game code.',
                            });
                        }}
                    >
                        <ButtonComponent
                            label="You v Friend"
                            width="100%"
                            onClick={() => UINavigator.render(<FriendGameSetupComponent />)}
                        />
                    </div>
                    <div
                        className="col-12 col-md-6 col-lg-3 mb-2"
                        onMouseOver={() => {
                            this.setState({
                                hoverImage: '/img/YouVRandom.png',
                                hoverImageCaption:
                                    'You v Random: Play against a random opponent similar to your skill level.',
                            });
                        }}
                    >
                        <ButtonComponent
                            label="You v Random"
                            width="100%"
                            onClick={() => UINavigator.render(<MatchmakingLobbyComponent />)}
                        />
                    </div>
                    <div
                        className="col-12 col-md-6 col-lg-3 mb-2"
                        onMouseOver={() => {
                            this.setState({
                                hoverImage: '/img/AIVAI.png',
                                hoverImageCaption:
                                    'AI v AI: Love watching chess, but not playing it? Make two bots play each other.',
                            });
                        }}
                    >
                        <ButtonComponent
                            label="AI v AI"
                            width="100%"
                            onClick={() => UINavigator.render(<AIvAISetup />)}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6 col-lg-3 mb-2">
                        <ButtonComponent
                            onClick={() => {
                                UINavigator.render(<MultiplayerMatch orientation={'b'} />);
                            }}
                            width="100%"
                        >
                            <IonIcon
                                style={{ fontSize: '4rem', marginBottom: '0.5rem' }}
                                icon={cloudOfflineOutline}
                            />
                            <span>Rejoin Game</span>
                        </ButtonComponent>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3 mb-2">
                        <ButtonComponent
                            onClick={() => {
                                CookieManager.uid = '';
                                CookieManager.auth = '';
                                UINavigator.render(<Homepage />);
                            }}
                            width="100%"
                        >
                            <IonIcon
                                style={{ fontSize: '4rem', marginBottom: '0.5rem' }}
                                icon={logOutOutline}
                            />
                            <span>Logout</span>
                        </ButtonComponent>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3 mb-2">
                        <ButtonComponent
                            onClick={() => {
                                UINavigator.render(<Profile />);
                            }}
                            width="100%"
                        >
                            <IonIcon
                                style={{ fontSize: '4rem', marginBottom: '0.5rem' }}
                                icon={personOutline}
                            />
                            <span>Profile</span>
                        </ButtonComponent>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3 mb-2">
                        <ButtonComponent
                            onClick={() => UINavigator.render(<HowToPlay />)}
                            width="100%"
                        >
                            <IonIcon
                                style={{ fontSize: '4rem', marginBottom: '0.5rem' }}
                                icon={helpCircleOutline}
                            />
                            <span>How to Play</span>
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameplayOptions;
