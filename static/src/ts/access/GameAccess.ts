import axios from 'axios';

export default class GameAccess {
    static async createGame(): Promise<IGameCreatedResponse> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/game/create')
                .then(response => resolve(response.data))
                .catch(err => reject(err));
        });
    }

    static async joinGame(gameKey: string[]): Promise<APIResponse> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/game/join', { gameKey })
                .then(response => resolve(response.data))
                .catch(err => reject(err));
        });
    }
}
