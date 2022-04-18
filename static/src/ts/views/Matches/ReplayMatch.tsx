import {
    play,
    playBack,
    playBackOutline,
    playForward,
    playForwardOutline,
    playOutline,
    playSkipBack,
    playSkipBackOutline,
    playSkipForward,
    playSkipForwardOutline,
    reload,
    reloadOutline,
} from 'ionicons/icons';
import React from 'react';
import ChessboardComponent from '../../components/ChessboardComponent';
import Titlebar from '../../components/Titlebar';
import IconButton from '../../components/UI/IconButton';

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
                    <div className="col text-center">
                        <IconButton
                            icon={playBackOutline}
                            hoverIcon={playBack}
                            onClick={() => undefined}
                        />
                        <IconButton
                            icon={playSkipBackOutline}
                            hoverIcon={playSkipBack}
                            onClick={() => undefined}
                        />
                        <IconButton icon={playOutline} hoverIcon={play} onClick={() => undefined} />
                        <IconButton
                            icon={playSkipForwardOutline}
                            hoverIcon={playSkipForward}
                            onClick={() => undefined}
                        />
                        <IconButton
                            icon={playForwardOutline}
                            hoverIcon={playForward}
                            onClick={() => undefined}
                        />
                        <IconButton
                            icon={reloadOutline}
                            hoverIcon={reload}
                            onClick={() => undefined}
                        />
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
