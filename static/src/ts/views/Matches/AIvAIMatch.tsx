import * as React from 'react';
import CookieManager from '../../access/CookieManager';
import ChessboardComponent from '../../components/ChessboardComponent';
import SubTitlebar from '../../components/SubTitlebar';
import Titlebar from '../../components/Titlebar';
import BaseMatchView, {
    BaseMatchProps,
    BaseMatchState,
    SocketAuthorizationCallback,
} from './BaseMatchView';

/**
 * The multiplayer match component. This displays the chessboard and chat components.
 */
class AIvAIMatch extends BaseMatchView<BaseMatchProps, BaseMatchState> {
    /**
     * Creates an instance of MultiplayerMatch.
     * @param props - The props for the multiplayer match component.
     * This only includes the board orientation ('b' for black, 'w' for white).
     */
    constructor(props: BaseMatchProps) {
        super(props, {
            fen: undefined,
            gameKey: '',
        });
    }

    /**
     * @returns The multiplayer match component.
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title="Artificial Intelligence Game" />
                <SubTitlebar>
                    <div className="col-12 p-2">Game Key: {this.state.gameKey}</div>
                </SubTitlebar>

                <div className="row">
                    <div className="col"></div>
                    <div id="boardContainer" className="col-12 col-md-4 text-center">
                        <ChessboardComponent
                            parentContainerId="boardContainer"
                            orientation={this.props.orientation}
                            fen={this.state.fen}
                            onFENChange={fen =>
                                this.setState({
                                    fen,
                                })
                            }
                        />
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }

    /**
     * Emits an authorize event to the connected socket with the uid and auth key.
     *
     * @param onAuthorized - The callback to call when the user is authorized.
     */
    emitSocketAuthorization(onAuthorized: SocketAuthorizationCallback): void {
        this.socket!.emit('authorize-ai-v-ai', CookieManager.uid, CookieManager.auth, onAuthorized);
    }
}

export default AIvAIMatch;
