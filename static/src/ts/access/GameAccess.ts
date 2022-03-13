import axios from 'axios';

export default class GameAccess {
    static async createGame(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/game/create')
                .then(response => resolve(response.data.success))
                .catch(err => reject(err));
        });
    }
}
