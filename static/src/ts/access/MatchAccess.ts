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
}

export default MatchAccess;
