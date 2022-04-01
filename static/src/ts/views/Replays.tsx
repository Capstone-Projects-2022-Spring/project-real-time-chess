import * as React from 'react';
import ButtonComponent from '../components/ButtonComponent';

interface ReplaysProps{
    username: string;
}

interface ReplaysState {
    username: string;
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
         username: props.username,
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
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Replays</h1>
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

export default Replays;
export { ReplaysProps, ReplaysState };
