import * as React from 'react';
import ButtonComponent from '../components/ButtonComponent';
import FriendGameSetupComponent from '../components/FriendGameSetup';
import HowToPlaySwal from '../components/HowToPlaySwal';
import CookieManager from '../CookieManager';
import { NoProps } from '../models/types';
import UINavigator from '../models/UINavigator';
import BoardScreen from './BoardScreen';
import Homepage from './Homepage';
import MultiplayerMatch from './MultiplayerMatch';

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
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Gameplay Options</h1>
                    </div>
                </div>

                <div className="row mb-2">
                    <div
                        className="col"
                        onMouseOver={() => {
                            this.setState({
                                hoverImage: '/img/YouVAI.png',
                                hoverImageCaption:
                                    "You v AI: Play against artificial intelligence. If you're scared, lower the difficulty.",
                            });
                        }}
                    >
                        <ButtonComponent
                            label="You v AI"
                            width="100%"
                            onClick={() => {
                                UINavigator.render(<BoardScreen mode={'AI'} username={''} />);
                            }}
                        />
                    </div>
                    <div
                        className="col"
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
                        className="col"
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
                            onClick={() => undefined}
                        />
                    </div>
                    <div
                        className="col"
                        onMouseOver={() => {
                            this.setState({
                                hoverImage: '/img/AIVAI.png',
                                hoverImageCaption:
                                    'AI v AI: Love watching chess, but not playing it? Make two bots play each other.',
                            });
                        }}
                    >
                        <ButtonComponent label="AI v AI" width="100%" onClick={() => undefined} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ButtonComponent
                            label="Join Previous Game"
                            onClick={() => {
                                UINavigator.render(<MultiplayerMatch orientation={'b'} />);
                            }}
                        />
                    </div>

                    <div className="row">
                        <div className="col">
                            <ButtonComponent
                                label="Logout"
                                onClick={() => {
                                    CookieManager.uid = '';
                                    CookieManager.auth = '';
                                    UINavigator.render(<Homepage />);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="alert alert-primary" role="alert">
                            <div>
                                Click{' '}
                                <a
                                    href="#"
                                    onClick={() => HowToPlaySwal.displayHowToPlay()}
                                    className="alert-link"
                                >
                                    here
                                </a>{' '}
                                to learn how to play.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col"></div>
                    <div className="col-12 col-md-6 col-lg-4 mt-2 text-center game-mode-hover-img-container light-shadow">
                        <img src={this.state.hoverImage} className="w-100" />
                        {this.state.hoverImageCaption}
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default GameplayOptions;
