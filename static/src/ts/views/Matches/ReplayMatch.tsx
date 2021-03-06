import {
    play,
    playOutline,
    playSkipBack,
    playSkipBackOutline,
    playSkipForward,
    playSkipForwardOutline,
} from 'ionicons/icons';
import React from 'react';
import ChessboardComponent from '../../components/ChessboardComponent';
import SubTitlebar from '../../components/SubTitlebar';
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
    private replayTime: number;

    private timer?: number;

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
        this.replayTime = this.props.moves[0]!.timestamp;
    }

    /**
     * @returns A react element for the ReplayMatch view.
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title={`Replay Match: ${this.props.label}`} />

                <SubTitlebar>
                    <div className="col text-left"></div>
                    <div className="col text-center">
                        <IconButton
                            icon={playSkipBackOutline}
                            hoverIcon={playSkipBack}
                            size="1.5rem"
                            onClick={() => {
                                this.setState({ move: this.state.move - 1 });
                                this.play(0);
                            }}
                        />
                        <IconButton
                            icon={playOutline}
                            hoverIcon={play}
                            size="1.5rem"
                            onClick={() => this.play(1)}
                        />
                        <IconButton
                            icon={playSkipForwardOutline}
                            hoverIcon={playSkipForward}
                            size="1.5rem"
                            onClick={() => {
                                this.setState({ move: this.state.move + 1 });
                                this.play(0);
                            }}
                        />
                    </div>
                    <div className="col"></div>
                </SubTitlebar>

                <div className="row mt-4">
                    <div className="col"></div>
                    <div id="replay-chessboard-container" className="col-12 col-md-6 col-lg-3">
                        <ChessboardComponent
                            parentContainerId={'replay-chessboard-container'}
                            orientation="w"
                            onFENChange={() => undefined}
                            fen={
                                this.state.move >= 0 && this.state.move < this.props.moves.length
                                    ? this.props.moves[this.state.move]!.fen
                                    : undefined
                            }
                        />
                    </div>

                    <div className="col"></div>
                </div>
            </div>
        );
    }

    /**
     * Stop the playback timer
     */
    clearTimer(): void {
        window.clearInterval(this.timer);
        this.timer = undefined;
    }

    /**
     * Plays the game forward or backwards.
     *
     * @param speed - The speed to play the game. If speed is
     * negative, then the game will play backwards. If the speed is positive,
     * then the game will play forwards. Ex: 2 will play the game twice as fast,
     * -1 will play the game backwards at normal speed. The speed can never be 0.
     */
    play(speed: number) {
        if (speed === 0) {
            this.clearTimer();
            return;
        }

        if (this.timer) this.clearTimer();

        this.timer = window.setInterval(() => {
            if (speed > 0) {
                this.replayTime += speed * 1000;
                while (this.props.moves[this.state.move + 1]!.timestamp <= this.replayTime) {
                    this.setState({ move: this.state.move + 1 });
                }
            } else if (speed < 0) {
                this.replayTime -= speed * 1000;
                while (this.props.moves[this.state.move - 1]!.timestamp >= this.replayTime) {
                    this.setState({ move: this.state.move - 1 });
                }
            }

            if (this.state.move < 0 || this.state.move >= this.props.moves.length) {
                this.clearTimer();
            }
        }, speed * 1000);
    }
}

export default ReplayMatch;
