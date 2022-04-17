import * as React from 'react';
import ButtonComponent from '../../components/UI/ButtonComponent';
import ChessboardComponent from '../../components/ChessboardComponent';
import CookieManager from '../../access/CookieManager';
import UINavigator from '../../models/UINavigator';
import BaseMatchView, { BaseMatchProps, BaseMatchState } from './BaseMatchView';
import GameplayOptions from '../GameplayOptions';

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
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <h1 style={{ textAlign: 'center' }}>Multiplayer Match</h1>
                    <div className="col" style={{ paddingBottom: '10px' }}>
                        <ButtonComponent
                            label="Home"
                            width="100%"
                            onClick={() => {
                                UINavigator.render(<GameplayOptions />);
                            }}
                        />
                    </div>
                    <div className="col" style={{ fontSize: '2rem' }}>
                        Game Key: {this.state.gameKey}
                    </div>
                </div>

                <div className="row">
                    <div className="col"></div>
                    <div id="boardContainer" className="col-12 col-md-6 text-center">
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
    emitSocketAuthorization(onAuthorized: (gameState: IGameStateAPIResponse) => void): void {
        this.socket!.emit('authorize-ai-v-ai', CookieManager.uid, CookieManager.auth, onAuthorized);
    }
}

export default AIvAIMatch;
