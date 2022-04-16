import * as React from 'react';
import Swal from 'sweetalert2';
import GameAccess from '../access/GameAccess';
import { NoProps } from '../models/types';
import UINavigator from '../models/UINavigator';
import SupportedEmojis from '../SupportedEmojis';
import GameplayOptions from './GameplayOptions';
import MultiplayerMatch from './MultiplayerMatch';
import ButtonComponent from '../components/ButtonComponent';
import CooldownSelectorComponent from '../components/CooldownSelectorComponent';
import EmojiKeyboard from '../components/EmojiKeyboard';

/**
 * The page for setting up a multiplayer game with a friend. This gives the user
 * the option to either create a new game or join an existing game. If the user
 * creates a new game, they will be given a unique emoji code to give to their friend.
 * Their friend will then be able to join the game by entering the emoji code on this same
 * View.
 */
class FriendGameSetupComponent extends React.Component<NoProps, { gameKey: string[] }> {
    /**
     * Creates an instance of FriendGameSetupComponent.
     * @param props - No props are accepted.
     */
    constructor(props: NoProps) {
        super(props);
        this.state = {
            gameKey: [],
        };
    }

    /**
     * @returns The react component for the setup screen once a user chooses to
     * play against a fiend.
     */
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2>Create Game</h2>
                        <div className="col" style={{ paddingBottom: '10px' }}>
                            <ButtonComponent
                                label="Home"
                                width="200px"
                                onClick={() => {
                                    UINavigator.render(<GameplayOptions />);
                                }}
                            />
                        </div>
                        <p>
                            Create a game. Then you will be given a game code. Send the game code to
                            your friend so they can join the game.
                        </p>
                        <CooldownSelectorComponent />
                        <ButtonComponent
                            label="Create Game"
                            onClick={() => FriendGameSetupComponent.createGame()}
                        />
                    </div>

                    <div className="col-12 col-md-6">
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
    static createGame() {
        GameAccess.createGame()
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
