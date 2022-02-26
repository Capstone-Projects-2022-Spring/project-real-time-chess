import * as React from 'react';
import Swal from 'sweetalert2';
import ButtonComponent from './ButtonComponent';

export default class GameplayOptions extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Gameplay Options</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ButtonComponent label="You v AI" width="100%" onClick={() => void 0} />
                    </div>
                    <div className="col">
                        <ButtonComponent label="You v Friend" width="100%" onClick={() => void 0} />
                    </div>
                    <div className="col">
                        <ButtonComponent label="You v Random" width="100%" onClick={() => void 0} />
                    </div>
                    <div className="col">
                        <ButtonComponent label="AI v AI" width="100%" onClick={() => void 0} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="alert alert-primary" role="alert">
                            <div>
                                Click{' '}
                                <a
                                    href="#"
                                    onClick={() => GameplayOptions.displayHowToPlay()}
                                    className="alert-link"
                                >
                                    here
                                </a>{' '}
                                to learn how to play.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    static displayHowToPlay(): void {
        function makeListItem(text: string, action: () => void) {
            const li = document.createElement('li');
            li.innerHTML = text;
            li.onclick = () => {
                action();
            };
            li.classList.add('list-group-item');
            return li;
        }

        function makeList(...items: HTMLLIElement[]) {
            const list = document.createElement('ul');
            list.classList.add('list-group');
            list.append(...items);
            return list;
        }

        function displayGameModes(): void {
            Swal.fire({
                title: 'Game Modes',
                html: makeList(
                    makeListItem(
                        '<strong>You v AI</strong> - This is a singleplayer mode where you go up against artificial intelligence. You can adjust the difficulty of the AI to your liking.',
                        () => void 0
                    ),
                    makeListItem(
                        '<strong>You v Friend</strong> - This is a multiplayer game where you can play against a friend.',
                        () => void 0
                    ),
                    makeListItem(
                        '<strong>You v Random</strong> - This is a multiplayer game where you can play against a randomly matched opponent.',
                        () => void 0
                    ),
                    makeListItem(
                        '<strong>AI v AI</strong> - This is a zero-player game mode where two AI bots play each other. You can assign the difficulty of each bot.',
                        () => void 0
                    )
                ),
            });
        }

        Swal.fire({
            title: 'How to Play',
            html: makeList(makeListItem('Game Modes', displayGameModes)),
        });
    }
}
