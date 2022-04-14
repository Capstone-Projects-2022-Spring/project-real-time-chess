import * as React from 'react';
import ButtonComponent from '../components/ButtonComponent';
import UINavigator from '../models/UINavigator';
import GameplayOptions from './GameplayOptions';
import Profile from './Profile';

type ReplaysProps = Record<string, never>;

interface ReplaysState {
    // username: string;
    info: string;
}

/**
 * The replays screen
 */
class Replays extends React.Component<ReplaysProps, ReplaysState, { info: string }> {
    /**
     * Creates an instance of Replays.
     * @param props - No props.
     */
    constructor(props: ReplaysProps) {
        super(props);
        this.state = {
            // username: props.username,
            info: '',
        };
    }

    /**
     * @returns The react element for the Replays view.
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1 style={{ textAlign: 'center' }}>Replays</h1>
                    <div className="col">
                        <ButtonComponent
                            label="Home"
                            width="100%"
                            onClick={() => {
                                UINavigator.render(<GameplayOptions />);
                            }}
                        />
                    </div>
                    <div className="col" style={{ paddingBottom: '10px' }}>
                        <ButtonComponent
                            label="Back"
                            width="100%"
                            onClick={() => {
                                UINavigator.render(<Profile email="" />);
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ButtonComponent
                            label="View Latest Game"
                            width="100%"
                            onClick={() => {
                                this.setState({
                                    info: 'latest game here',
                                });
                            }}
                        />
                    </div>
                    <div className="col">
                        <ButtonComponent
                            label="View All Past Games"
                            width="100%"
                            onClick={() => {
                                this.setState({
                                    info: 'List of past games',
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

export default Replays;
export { ReplaysProps, ReplaysState };
