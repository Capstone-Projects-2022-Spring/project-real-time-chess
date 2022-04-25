import { arrowForward } from 'ionicons/icons';
import * as React from 'react';
import GameAccess from '../../access/GameAccess';
import AIDifficultySelector from '../../components/AIDifficultySelector';
import SubTitlebar from '../../components/SubTitlebar';
import Titlebar from '../../components/Titlebar';
import IconButton from '../../components/UI/IconButton';
import UINavigator from '../../models/UINavigator';
import AIvAIMatch from '../Matches/AIvAIMatch';

/**
 * This page allows users to customize two different AI bots to play
 * against each other.
 */
class AIvAISetup extends React.Component<
    NoProps,
    { bot1Difficulty: number; bot2Difficulty: number }
> {
    /**
     * Creates an instance of AIvAISetup.
     * @param props - No props
     */
    constructor(props: NoProps) {
        super(props);
        this.state = {
            bot1Difficulty: 1,
            bot2Difficulty: 1,
        };
    }

    /**
     * @returns The react component for the setup screen once a user chooses to
     * pit two artificial intelligence bots against each other.
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title="AIvAI Setup" />

                <SubTitlebar>
                    <div className="col" style={{ textAlign: 'right' }}>
                        <IconButton
                            size="0.75rem"
                            icon={arrowForward}
                            prepend="Start"
                            onClick={() =>
                                AIvAISetup.createGame(
                                    this.state.bot1Difficulty,
                                    this.state.bot2Difficulty,
                                )
                            }
                        />
                    </div>
                </SubTitlebar>

                <div className="row">
                    <div
                        className="col-12 col-md-6 bg-light text-dark p-4"
                        style={{ borderBottom: '2px solid gray' }}
                    >
                        <h2>Bot #1 (White)</h2>
                        <AIDifficultySelector
                            onChange={val => {
                                this.bot1Difficulty = val;
                            }}
                            selected={this.state.bot1Difficulty}
                        />
                    </div>
                    <div className="col-12 col-md-6 bg-dark text-light p-4">
                        <h2>Bot #2 (Black)</h2>
                        <AIDifficultySelector
                            onChange={val => {
                                this.bot2Difficulty = val;
                            }}
                            selected={this.state.bot2Difficulty}
                        />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Submits a request to create a new game.
     */
    static createGame(bot1: number, bot2: number) {
        GameAccess.createAIvAIGame(bot1, bot2)
            .then(gameKey => {
                if (gameKey) {
                    UINavigator.render(<AIvAIMatch orientation={'w'} />);
                }
            })
            .catch(err => {
                document.write(err);
            });
    }

    /**
     * Sets the difficulty of the first AI bot.
     */
    set bot1Difficulty(value: number) {
        this.setState({ bot1Difficulty: value });
    }

    /**
     * Sets the difficulty of the second AI bot.
     */
    set bot2Difficulty(value: number) {
        this.setState({ bot2Difficulty: value });
    }
}

export default AIvAISetup;
