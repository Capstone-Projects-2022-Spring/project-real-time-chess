import * as React from 'react';
import ButtonComponent from '../../components/ButtonComponent';
import ChessboardComponent from '../../components/ChessboardComponent';
// import { ObjectId } from 'mongodb';

interface ReplayGameProps {
    username: string;
    orientation: 'b' | 'w';
}

interface ReplayGameState {
    username: string;
    info: string;
    fen?: string;
    gamekey: string;
}

/**
 * THe replay game screen
 */
class ReplayGame extends React.Component<ReplayGameProps, ReplayGameState, { info: string }> {
    /**
     * Creates an instance of Replays.
     * @param props - No props.
     */
    constructor(props: ReplayGameProps) {
        super(props);
        this.state = {
            username: props.username,
            info: '',
            fen: undefined,
            gamekey: '',
            /* black
         white:
         history:
         */
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
                        <h1 style={{ textAlign: 'center' }}>Your latest game</h1>
                    </div>
                    <div className="row">
                        <div id="boardContainer" className="col-12 col-md-6 text-center">
                            <ChessboardComponent
                                parentContainerId="boardContainer"
                                orientation={this.props.orientation}
                                fen={this.state.fen}
                                /* onPieceDrop={(source, target) => {
                                this.socket?.emit('move piece', source, target);
                            }}
                            */
                                onFENChange={fen =>
                                    this.setState({
                                        fen,
                                    })
                                }
                            />
                        </div>
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

export default ReplayGame;
export { ReplayGameProps, ReplayGameState };
