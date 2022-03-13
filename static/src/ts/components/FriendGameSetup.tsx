import * as React from 'react';
import Swal from 'sweetalert2';
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
                            onClick={() => {
                                GameAccess.createGame().then(() => {
                                    Swal.fire({
                                        title: 'Game Created',
                                        text: 'Share this game code with your friend: ',
                                    });
                                });
                            }}
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
}
