import { IonIcon } from '@ionic/react';
import {
    playBackOutline,
    playForwardOutline,
    playOutline,
    playSkipBackOutline,
    playSkipForwardOutline,
    reloadOutline,
} from 'ionicons/icons';
import React from 'react';
import ChessboardComponent from '../../components/ChessboardComponent';
import Titlebar from '../../components/Titlebar';

interface ReplayMatchProps {
    label: string;
    gameKey: string;
    timestamp: number;
    moves: MoveRecord[];
}

interface ReplayMatchState {
    move: number;
}

/**
 * The view which allows a user to replay a game.
 */
class ReplayMatch extends React.Component<ReplayMatchProps, ReplayMatchState> {
    /**
     * Creates an instance of ReplayMatch.
     *
     * @param props - Accepts properties from the game history document.
     */
    constructor(props: ReplayMatchProps) {
        super(props);
        this.state = {
            move: 0,
        };
    }

    /**
     * @returns A react element for the ReplayMatch view.
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title={`Replay Match: ${this.props.label}`} />

                <div className="row" style={{ backgroundColor: 'rgb(230, 230, 230)' }}>
                    <div className="col">
                        <IonIcon icon={playBackOutline} />
                        <IonIcon icon={playSkipBackOutline} />
                        <IonIcon icon={playOutline} />
                        <IonIcon icon={playSkipForwardOutline} />
                        <IonIcon icon={playForwardOutline} />
                        <IonIcon icon={reloadOutline} />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col"></div>
                    <div id="replay-chessboard-container" className="col-12 col-md-6 col-lg-3">
                        <ChessboardComponent
                            parentContainerId={'replay-chessboard-container'}
                            orientation="w"
                            onFENChange={() => undefined}
                            fen={this.props.moves[this.state.move]!.fen}
                        />
                    </div>

                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default ReplayMatch;
