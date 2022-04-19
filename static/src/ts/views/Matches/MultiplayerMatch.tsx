import { airplane, airplaneOutline, helpBuoy, helpBuoyOutline } from 'ionicons/icons';
import React from 'react';
import CookieManager from '../../access/CookieManager';
import ChessboardComponent from '../../components/ChessboardComponent';
import SubTitlebar from '../../components/SubTitlebar';
import Titlebar from '../../components/Titlebar';
import IconButton from '../../components/UI/IconButton';
import SupportedEmojis from '../../models/SupportedEmojis';
import BaseMatchView, {
    BaseMatchProps,
    BaseMatchState,
    SocketAuthorizationCallback,
} from './BaseMatchView';

interface MultiplayerMatchState extends BaseMatchState {
    autopilotEnabled: boolean;
}

/**
 * The multiplayer match component. This displays the chessboard and chat components.
 */
class MultiplayerMatch extends BaseMatchView<BaseMatchProps, MultiplayerMatchState> {
    /**
     * Creates an instance of MultiplayerMatch.
     * @param props - The props for the multiplayer match component.
     * This only includes the board orientation ('b' for black, 'w' for white).
     */
    constructor(props: BaseMatchProps) {
        super(props, {
            fen: undefined,
            gameKey: '',
            autopilotEnabled: false,
        });
    }

    /**
     * @returns The multiplayer match component.
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title="Multiplayer Game" />
                <SubTitlebar>
                    <div className="col" style={{ fontSize: '1.5rem' }}>
                        {this.state.gameKey}
                    </div>
                    <div className="col-12 col-md-6 text-center">
                        <IconButton
                            size="0.75rem"
                            icon={helpBuoyOutline}
                            hoverIcon={helpBuoy}
                            onClick={() => undefined}
                        />
                        <IconButton
                            size="0.75rem"
                            icon={airplaneOutline}
                            hoverIcon={airplane}
                            onClick={() => undefined}
                        />
                    </div>
                    <div className="col"></div>
                </SubTitlebar>

                <div className="row">
                    <div className="col"></div>
                    <div id="boardContainer" className="col-12 col-md-6 text-center">
                        <ChessboardComponent
                            parentContainerId="boardContainer"
                            orientation={this.props.orientation}
                            fen={this.state.fen}
                            onPieceDrop={(source, target) => {
                                this.socket?.emit('move piece', source, target);
                            }}
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
     * Emits an authorize event to the server with the uid and auth key.
     *
     * @param onAuthorized - The callback to call when the user is authorized.
     */
    emitSocketAuthorization(onAuthorized: SocketAuthorizationCallback): void {
        this.socket!.emit('authorize', CookieManager.uid, CookieManager.auth, onAuthorized);
    }

    /**
     * Opens a new socket with the server and binds the socket to this component.
     */
    bindSocket() {
        super.bindSocket();

        this.socket!.on('move piece', (response: IGameStateAPIResponse) => {
            if (response.success) {
                this.setState({
                    fen: response.fen,
                    gameKey: response.gameKey
                        .map(eName => SupportedEmojis.find(e => e.name === eName)?.emoji)
                        .join(''),
                });
            }
        });
    }
}

export default MultiplayerMatch;
