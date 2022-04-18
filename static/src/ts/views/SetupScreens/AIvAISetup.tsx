import * as React from 'react';
import GameAccess from '../../access/GameAccess';
import AIDifficultySelector from '../../components/AIDifficultySelector';
import ButtonComponent from '../../components/UI/ButtonComponent';
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
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2>Bot #1 (White)</h2>
                        <AIDifficultySelector
                            onChange={val =>
                                this.setState({
                                    bot1Difficulty: val,
                                })
                            }
                            selected={this.bot1Difficulty}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <h2>Bot #2 (Black)</h2>
                        <AIDifficultySelector
                            onChange={val => this.setState({ bot2Difficulty: val })}
                            selected={this.bot2Difficulty}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ButtonComponent
                            onClick={() =>
                                AIvAISetup.createGame(
                                    this.state.bot1Difficulty,
                                    this.state.bot2Difficulty,
                                )
                            }
                        >
                            Start
                        </ButtonComponent>
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
