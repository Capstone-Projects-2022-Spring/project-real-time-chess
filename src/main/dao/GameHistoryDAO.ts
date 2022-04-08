import { ObjectId } from 'mongodb';
import BaseDAO from './BaseDAO';

/**
 * Provides database access to the game history.
 */
class GameHistoryDAO extends BaseDAO<GameHistory> {
    /**
     * Always 'game_history'
     * @readonly
     */
    get collectionName(): string {
        return 'game_history';
    }

    /**
     * @param uid - The user id of the user who owns the game history.
     * @returns A list of all the games that the user has played in the past.
     */
    getAllGames(uid: string): Promise<GameHistory[]> {
        return new Promise((resolve, reject) => {
            this.findMany({
                $or: [{ black: new ObjectId(uid) }, { white: new ObjectId(uid) }],
            })
                .then(games => resolve(games))
                .catch(err => reject(err));
        });
    }
}

export default GameHistoryDAO;
