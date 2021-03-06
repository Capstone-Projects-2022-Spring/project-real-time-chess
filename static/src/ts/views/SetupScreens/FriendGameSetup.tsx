import * as React from 'react';
import Swal from 'sweetalert2';
import GameAccess from '../../access/GameAccess';
import CooldownSelectorComponent from '../../components/CooldownSelectorComponent';
import Titlebar from '../../components/Titlebar';
import ButtonComponent from '../../components/UI/ButtonComponent';
import EmojiKeyboard from '../../components/UI/EmojiKeyboard';
import SupportedEmojis from '../../models/SupportedEmojis';
import UINavigator from '../../models/UINavigator';
import MultiplayerMatch from '../Matches/MultiplayerMatch';

/**
 * The page for setting up a multiplayer game with a friend. This gives the user
 * the option to either create a new game or join an existing game. If the user
 * creates a new game, they will be given a unique emoji code to give to their friend.
 * Their friend will then be able to join the game by entering the emoji code on this same
 * View.
 */
class FriendGameSetupComponent extends React.Component<
    NoProps,
    { gameKey: string[]; cooldown: number }
> {
    /**
     * Creates an instance of FriendGameSetupComponent.
     * @param props - No props are accepted.
     */
    constructor(props: NoProps) {
        super(props);
        this.state = {
            gameKey: [],
            cooldown: 5,
        };
    }

    /**
     * @returns The react component for the setup screen once a user chooses to
     * play against a fiend.
     */
    render() {
        return (
            <div className="container-fluid">
                <Titlebar title="Friend Game Setup" />
                <div className="row">
                    <div className="col-12 col-md-6 p-4">
                        <h2>Create Game</h2>
                        <p>
                            Create a game. Then you will be given a game code. Send the game code to
                            your friend so they can join the game.
                        </p>
                        <CooldownSelectorComponent
                            value={this.state.cooldown}
                            onChange={cooldown => this.setState({ cooldown })}
                        />
                        <ButtonComponent label="Create Game" onClick={() => this.createGame()} />
                    </div>

                    <div className="col-12 col-md-6 p-4">
                        <h2>Join Game</h2>
                        <p>Get the game code from whoever created the game.</p>
                        <EmojiKeyboard
                            onChange={value => {
                                this.setState({
                                    gameKey: value.map(({ name }) => name),
                                });
                            }}
                        />
                        <ButtonComponent
                            label="Join Game"
                            onClick={() => {
                                GameAccess.joinGame(this.state.gameKey)
                                    .then(response => {
                                        if (response.success) {
                                            UINavigator.render(
                                                <MultiplayerMatch orientation="w" />,
                                            );
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Error',
                                                text: response.error!.message,
                                            }).catch(err => {
                                                document.write(`Error: ${err.message}`);
                                            });
                                        }
                                    })
                                    .catch(() => {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: "Couldn't find game with that game code.",
                                        }).catch(swalError => {
                                            document.write(`Error: ${swalError.message}`);
                                        });
                                    });
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Submits a request to create a new game.
     */
    private createGame() {
        GameAccess.createGame(this.state.cooldown)
            .then(async response => {
                if (response.success) {
                    await Swal.fire({
                        title: 'Game Created',
                        html: `Share this game code with your friend:
                        <div style="font-size: 2.5rem">
                            ${FriendGameSetupComponent.emojiNameListToEmoji(response.gameKey)}
                        </div>`,
                        didClose: () => {
                            UINavigator.render(<MultiplayerMatch orientation="b" />);
                        },
                    });
                } else {
                    await Swal.fire({
                        title: 'Error',
                        text: response.error!.message,
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                }).catch(err => document.write(`Error: ${err.message}`));
            });
    }

    /**
     * Converts a single emoji name to its corresponding emoji.
     *
     * @param name - The name of the emoji.
     * @returns The emoji character (as rendered).
     */
    static emojiNameToEmoji(name: string): string {
        return SupportedEmojis.find(emojiRecord => emojiRecord.name === name)!.emoji as string;
    }

    /**
     * Converts a list of emoji names to a string of the actual emojis.
     *
     * @param nameList - The list of emoji names.
     * @returns A string of emojis without any spaces in between.
     */
    static emojiNameListToEmoji(nameList: string[]): string {
        return nameList.map(FriendGameSetupComponent.emojiNameToEmoji).join('');
    }
}

export default FriendGameSetupComponent;
