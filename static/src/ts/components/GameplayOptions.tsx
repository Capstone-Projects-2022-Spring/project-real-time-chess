import * as React from 'react';
import Swal from 'sweetalert2';
import ButtonComponent from './ButtonComponent';

/**
 * Gameplay options page which allows a user to choose which game mode they want to play.
 *
 * @export
 * @class GameplayOptions
 * @extends {React.Component<{}, {}>}
 */
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

    /**
     * Displays a sweet alert modal with an index of how to play the game.
     *
     * @static
     *
     * @memberOf GameplayOptions
     */
    static displayHowToPlay(): void {
        /**
         * Generates a bootstrap list group item.
         *
         * @param {string} text The text to include in the list item.
         * @param {() => void} action The action to invoke when clicked.
         * @returns {HTMLLIElement} The generated list item.
         */
        function makeListItem(text: string, action: () => void) {
            const li = document.createElement('li');
            li.innerHTML = text;
            li.onclick = () => {
                action();
            };
            li.classList.add('list-group-item');
            return li;
        }

        /**
         * Generates a bootstrap list group.
         *
         * @param {...HTMLLIElement[]} items The list items to include in the list group.
         * @returns {HTMLLIElement} The generated list group.
         */
        function makeList(...items: HTMLLIElement[]) {
            const list = document.createElement('ul');
            list.classList.add('list-group');
            list.append(...items);
            return list;
        }

        /**
         * Display game modes modal.
         *
         */
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
