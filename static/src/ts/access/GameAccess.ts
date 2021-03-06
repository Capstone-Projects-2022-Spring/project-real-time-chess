import axios from 'axios';

/**
 * Provides access to the game API methods.
 */
class GameAccess {
    /**
     * Creates a new game and responsds with a GameCreatedAPIResponse object.
     */
    static async createGame(cooldown: number): Promise<IGameCreatedAPIResponse> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/game/create', { cooldown })
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

    /**
     * Retrieves a list of all games that the user has played in the past.
     *
     * @returns A promise which resolves with a list
     */
    static async getHistory(): Promise<GameHistory[]> {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/game/history')
                .then(response => resolve(response.data))
                .catch(err => reject(err));
        });
    }

    /**
     * Retrieves an object containing the uids of both players from a recent game
     * @returns The uids of both players
     */
    static async getRecent(): Promise<IGameFoundResponse> {
        return new Promise((resolve, reject) => {
            axios
                .get('api/game/recent')
                .then(response => resolve(response.data))
                .catch(err => reject(err));
        });
    }

    /**
     * Creates a new AI v AI game.
     *
     * @param bot1 - The difficulty for bot 1.
     * @param bot2 - The difficulty for bot 2.
     *
     * @returns A promise which resolves when the game is created with the game key.
     */
    static async createAIvAIGame(bot1: number, bot2: number): Promise<string[]> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/game/AIvAI/create', { bot1, bot2 })
                .then(response => resolve(response.data.gameKey))
                .catch(err => reject(err));
        });
    }

    /**
     * Creates a new single player game.
     *
     * @param bot - The difficulty for the bot.
     * @returns A promise which resolves when the game is created with the game key.
     */
    static async createSinglePlayerGame(bot: number): Promise<string[]> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/game/single-player/create', { bot })
                .then(response => resolve(response.data.gameKey))
                .catch(err => reject(err));
        });
    }
}

export default GameAccess;
