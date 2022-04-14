import Swal from 'sweetalert2';

/**
 * The utility class to display sweetalert alerts to the user demonstrating how to
 * play realtime chess.
 */
class HowToPlaySwal {
    /**
     * Displays a sweet alert modal with an index of how to play the game.
     */
    static displayHowToPlay(): void {
        /**
         * Generates a bootstrap list group item.
         *
         * @param text - The text to include in the list item.
         * @param action - The action to invoke when clicked.
         * @returns The generated list item.
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
         * @param items - The list items to include in the list group.
         * @returns The generated list group.
         */
        function makeList(...items: HTMLLIElement[]) {
            const list = document.createElement('ul');
            list.classList.add('list-group');
            list.append(...items);
            return list;
        }

        /**
         * Display game modes modal.
         */
        function displayGameModes(): void {
            Swal.fire({
                title: 'Game Modes',
                html: makeList(
                    makeListItem(
                        '<strong>You v AI</strong> - This is a singleplayer mode where you go up against artificial intelligence. You can adjust the difficulty of the AI to your liking.',
                        () => undefined,
                    ),
                    makeListItem(
                        '<strong>You v Friend</strong> - This is a multiplayer game where you can play against a friend.',
                        () => undefined,
                    ),
                    makeListItem(
                        '<strong>You v Random</strong> - This is a multiplayer game where you can play against a randomly matched opponent.',
                        () => undefined,
                    ),
                    makeListItem(
                        '<strong>AI v AI</strong> - This is a zero-player game mode where two AI bots play each other. You can assign the difficulty of each bot.',
                        () => undefined,
                    ),
                ),
            }).catch(err => document.write(`Error: ${err.message}`));
        }

        Swal.fire({
            title: 'How to Play',
            html: makeList(makeListItem('Game Modes', displayGameModes)),
        }).catch(err => document.write(`Error: ${err.message}`));
    }
}

export default HowToPlaySwal;
