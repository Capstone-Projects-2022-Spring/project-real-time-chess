import axios from 'axios';
import { Square } from 'chess.js';

class GameAccess {
    static async createGame(): Promise<IGameCreatedAPIResponse> {
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

    static async move(source: Square, target: Square): Promise<APIResponse> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/game/move', { source, target })
                .then(response => {
                    if (response.data.success) {
                        resolve(response.data);
                    } else {
                        reject(response.data.error);
                    }
                })
                .catch(err => reject(err));
        });
    }

    static async getMessages(): Promise<IGameMessage[]> {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/game/messages')
                .then(response => {
                    if (response.data.success) {
                        resolve(response.data.messages);
                    } else {
                        reject(response.data.error);
                    }
                })
                .catch(err => reject(err));
        });
    }

    static async getFEN(): Promise<string> {
        return new Promise((resolve, reject) => {
            axios
                .get('/api/game/fen')
                .then(response => {
                    if (response.data.success) {
                        resolve(response.data.fen);
                    } else {
                        reject(response.data.error);
                    }
                })
                .catch(err => reject(err));
        });
    }
}

export default GameAccess;
