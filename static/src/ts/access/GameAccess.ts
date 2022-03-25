import axios from 'axios';

/**
 * Provides access to the game API methods.
 */
class GameAccess {
    /**
     * Creates a new game and responsds with a GameCreatedAPIResponse object.
     */
    static async createGame(): Promise<IGameCreatedAPIResponse> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/game/create')
                .then(response => resolve(response.data))
                .catch(err => reject(err));
        });
    }

    /**
     * Allows a user to join a game.
     *
     * @param gameKey - The game key returned by the CreateGame request.
     */
    static async joinGame(gameKey: string[]): Promise<APIResponse> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/game/join', { gameKey })
                .then(response => resolve(response.data))
                .catch(err => reject(err));
        });
    }
}

export default GameAccess;
