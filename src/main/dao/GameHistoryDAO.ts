import { ObjectId } from 'mongodb';
import BaseDAO from './BaseDAO';

interface GameHistory {
    black: ObjectId;
    white: ObjectId;
    game_key: string[];
    history: MoveRecord[];
}

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
}

export default GameHistoryDAO;
