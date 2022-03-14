import * as React from 'react';
import Swal from 'sweetalert2';
import SupportedEmojis from '../../../../types/SupportedEmojis';
import GameAccess from '../access/GameAccess';
import ButtonComponent from './ButtonComponent';
import EmojiKeyboard from './EmojiKeyboard';

export default class FriendGameSetupComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2>Create Game</h2>
                        <p>
                            Create a game. Then you will be given a game code. Send the game code to
                            your friend so they can join the game.
                        </p>
                        <ButtonComponent
                            label="Create Game"
                            onClick={() => FriendGameSetupComponent.createGame()}
                        />
                    </div>

                    <div className="col-12 col-md-6">
                        <h2>Join Game</h2>
                        <p>Get the game code from whoever created the game.</p>
                        <EmojiKeyboard />
                        <ButtonComponent label="Join Game" onClick={() => undefined} />
                    </div>
                </div>
            </div>
        );
    }

    static createGame() {
        GameAccess.createGame()
            .then(response => {
                if (response.success)
                    Swal.fire({
                        title: 'Game Created',
                        html: `Share this game code with your friend:
                        <div style="font-size: 2.5rem">
                            ${FriendGameSetupComponent.emojiNameListToEmoji(response.gameKey)}
                        </div>`,
                    });
                else
                    Swal.fire({
                        title: 'Error',
                        text: response.error!.message,
                    });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                });
            });
    }

    static emojiNameToEmoji(name: string): string {
        return SupportedEmojis.find(emojiRecord => emojiRecord.name === name)!.emoji as string;
    }

    static emojiNameListToEmoji(nameList: string[]): string {
        return nameList.map(FriendGameSetupComponent.emojiNameToEmoji).join('');
    }
}
