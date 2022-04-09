import axios from 'axios';

/**
 * Provides access to the matchmaking api methods
 */
class MatchAccess {
    /**
     * Allows a user to queue for matchmaking
     */
    static async queue(uid: string): Promise<APIResponse> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/match/queue', { uid })
                .then(response => resolve(response.data))
                .catch(err => reject(err));
        });
    }

    /**
     * Allows a player to query whether matchmaking has created a game for them
     * @param uid - the user id of the client making the request
     */
    static async query(uid: string): Promise<APIResponse> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/match/query', { uid })
                .then(response => resolve(response.data))
                .catch(err => reject(err));
        });
    }
}

export default MatchAccess;
