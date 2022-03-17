import { ObjectId } from 'mongodb';
import ChessGame from './ChessGame';
import UserDAO, { IUser } from './dao/UserDAO';
import InvalidCredentialsError from './errors/InvalidCredentialsError';
import SupportedEmojis from './SupportedEmojis';

/**
 * The manager for all chess games which are currently in progress.
 * The API interacts directly with this class to start, end, and manage games.
 */
class GameManager {
    /**
     * An array of every single game which is currently in progress.
     */
    private static games: ChessGame[] = [];

    /**
     * Finds a game based on a user ID. This method can be used to quickly find
     * the current game in progress for a specified user.
     *
     * @param uid - The user ID of the client requesting access to the game.
     * @returns A ChessGame object if the user is in a game, if no
     * user exists, or no game exists with the specified user ID, then null is returned.
     */
    public static findGameByUser(uid: ObjectId): ChessGame | null {
        return (
            GameManager.games.find(g => g.black?._id?.equals(uid) || g.white?._id?.equals(uid)) ??
            null
        );
    }

    /**
     * Finds a game by its game key.
     *
     * @param gameKey - The list of emojis representing the game key.
     * @returns The game object if it exists, otherwise null.
     */
    public static findGameByKey(gameKey: string[]): ChessGame | null {
        return GameManager.games.find(g => g.gameKey === gameKey) ?? null;
    }

    /**
     * Verifies that a user has access to a game. This method authenticates
     * a user account and responds with a Promise which resolves to the
     * user's account object.
     *
     * @param uid - The UID of the user.
     * @param auth - The auth key for the specified account.
     * @returns Resolves upon successful authorization.
     */
    public static async verifyUserAccess(uid: string, auth: string): Promise<IUser> {
        const dao = new UserDAO();
        return new Promise((resolve, reject) => {
            dao.authenticateKey(new ObjectId(uid), auth).then(allowed => {
                if (allowed) {
                    dao.findOne({ _id: uid }).then(user => {
                        if (user) resolve(user);
                        else reject(new InvalidCredentialsError());
                    });
                } else {
                    reject(new InvalidCredentialsError());
                }
            });
        });
    }

    /**
     * Creates a new game and adds it to the list of games.
     *
     * @param user - The user who is creating the game.
     * @returns The game that is created
     */
    public static createGame(user: IUser): ChessGame | null {
        const game = new ChessGame(GameManager.generateGameKey());
        game.black = user;
        GameManager.games.push(game);
        game.addMessage({
            message: `${user.name.first} created the game.`,
        });
        return game;
    }

    /**
     * Allows a user to join a game which already exists via the game key.
     *
     * @param user - The user who is joining the game.
     * @param gameKey - The key of the game the user wishes to join.
     * @returns The chess game associated with the game key.
     */
    public static joinGame(user: IUser, gameKey: string[]): ChessGame | null {
        const game = GameManager.findGameByKey(gameKey);
        if (game) {
            game.white = user;
            game.addMessage({
                message: `${user.name.first} joined the game.`,
            });
            return game;
        }
        return null;
    }

    /**
     * Generates a random game key with emojis. This function will constantly generate
     * a new game key until a unique game key is generated.
     */
    static generateGameKey(): string[] {
        let emojis: string[];
        do {
            emojis = [];
            for (let i = 0; i < 5; i++) {
                emojis.push(
                    SupportedEmojis[Math.floor(Math.random() * SupportedEmojis.length)]!.name,
                );
            }
        } while (GameManager.findGameByKey(emojis) !== null);
        return emojis;
    }
}

export default GameManager;
