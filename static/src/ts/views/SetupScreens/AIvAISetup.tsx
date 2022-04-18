import * as React from 'react';
import GameAccess from '../../access/GameAccess';
import ButtonComponent from '../../components/UI/ButtonComponent';
import SelectButton from '../../components/UI/SelectButton';
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
                        <h5>Extemely Easy</h5>
                        <SelectButton
                            value="1"
                            onClick={e => {
                                this.bot1Difficulty = +e;
                            }}
                            selected={this.state.bot1Difficulty === 1}
                        >
                            AI Level 1
                        </SelectButton>
                        <h5>Easy</h5>
                        <div className="row">
                            <div className="col-6">
                                <SelectButton
                                    value="2"
                                    onClick={e => {
                                        this.bot1Difficulty = +e;
                                    }}
                                    selected={this.state.bot1Difficulty === 2}
                                >
                                    AI Level 2
                                </SelectButton>
                            </div>
                            <div className="col-6">
                                <SelectButton
                                    value="3"
                                    onClick={e => {
                                        this.bot1Difficulty = +e;
                                    }}
                                    selected={this.state.bot1Difficulty === 3}
                                >
                                    AI Level 3
                                </SelectButton>
                            </div>
                        </div>

                        <h5>Medium</h5>
                        <div className="row">
                            <div className="col-6">
                                <SelectButton
                                    value="4"
                                    onClick={e => {
                                        this.bot1Difficulty = +e;
                                    }}
                                    selected={this.state.bot1Difficulty === 4}
                                >
                                    AI Level 4
                                </SelectButton>
                            </div>

                            <div className="col-6">
                                <SelectButton
                                    value="5"
                                    onClick={e => {
                                        this.bot1Difficulty = +e;
                                    }}
                                    selected={this.state.bot1Difficulty === 5}
                                >
                                    AI Level 5
                                </SelectButton>
                            </div>
                        </div>

                        <h5>Hard</h5>
                        <div className="row">
                            <div className="col-6">
                                <SelectButton
                                    value="6"
                                    onClick={e => {
                                        this.bot1Difficulty = +e;
                                    }}
                                    selected={this.state.bot1Difficulty === 6}
                                >
                                    AI Level 6
                                </SelectButton>
                            </div>
                            <div className="col-6">
                                <SelectButton
                                    value="7"
                                    onClick={e => {
                                        this.bot1Difficulty = +e;
                                    }}
                                    selected={this.state.bot1Difficulty === 7}
                                >
                                    AI Level 7
                                </SelectButton>
                            </div>
                        </div>

                        <h5>Extremely Hard</h5>
                        <div className="row">
                            <div className="col-4">
                                <SelectButton
                                    value="8"
                                    onClick={e => {
                                        this.bot1Difficulty = +e;
                                    }}
                                    selected={this.state.bot1Difficulty === 8}
                                >
                                    AI Level 8
                                </SelectButton>
                            </div>
                            <div className="col-4">
                                <SelectButton
                                    value="9"
                                    onClick={e => {
                                        this.bot1Difficulty = +e;
                                    }}
                                    selected={this.state.bot1Difficulty === 9}
                                >
                                    AI Level 9
                                </SelectButton>
                            </div>
                            <div className="col-4">
                                <SelectButton
                                    value="10"
                                    onClick={e => {
                                        this.bot1Difficulty = +e;
                                    }}
                                    selected={this.state.bot1Difficulty === 10}
                                >
                                    AI Level 10
                                </SelectButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <h2>Bot #2 (Black)</h2>
                        <SelectButton
                            value="1"
                            onClick={e => {
                                this.bot2Difficulty = +e;
                            }}
                            selected={this.state.bot2Difficulty === 1}
                        >
                            1
                        </SelectButton>
                        <SelectButton
                            value="2"
                            onClick={e => {
                                this.bot2Difficulty = +e;
                            }}
                            selected={this.state.bot2Difficulty === 2}
                        >
                            2
                        </SelectButton>
                        <SelectButton
                            value="3"
                            onClick={e => {
                                this.bot2Difficulty = +e;
                            }}
                            selected={this.state.bot2Difficulty === 3}
                        >
                            3
                        </SelectButton>
                        <SelectButton
                            value="4"
                            onClick={e => {
                                this.bot2Difficulty = +e;
                            }}
                            selected={this.state.bot2Difficulty === 4}
                        >
                            4
                        </SelectButton>
                        <SelectButton
                            value="5"
                            onClick={e => {
                                this.bot2Difficulty = +e;
                            }}
                            selected={this.state.bot2Difficulty === 5}
                        >
                            5
                        </SelectButton>
                        <SelectButton
                            value="6"
                            onClick={e => {
                                this.bot2Difficulty = +e;
                            }}
                            selected={this.state.bot2Difficulty === 6}
                        >
                            6
                        </SelectButton>
                        <SelectButton
                            value="7"
                            onClick={e => {
                                this.bot2Difficulty = +e;
                            }}
                            selected={this.state.bot2Difficulty === 7}
                        >
                            7
                        </SelectButton>
                        <SelectButton
                            value="8"
                            onClick={e => {
                                this.bot2Difficulty = +e;
                            }}
                            selected={this.state.bot2Difficulty === 8}
                        >
                            8
                        </SelectButton>
                        <SelectButton
                            value="9"
                            onClick={e => {
                                this.bot2Difficulty = +e;
                            }}
                            selected={this.state.bot2Difficulty === 9}
                        >
                            9
                        </SelectButton>
                        <SelectButton
                            value="10"
                            onClick={e => {
                                this.bot2Difficulty = +e;
                            }}
                            selected={this.state.bot2Difficulty === 10}
                        >
                            10
                        </SelectButton>
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
