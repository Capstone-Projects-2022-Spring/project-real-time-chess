import { ObjectId } from 'mongodb';
import ChessGame from './ChessGame';
import UserDAO, { IUser } from './dao/UserDAO';

class GameManager {
    private static games: ChessGame[] = [];

    public static findGameByUser(uid: ObjectId): ChessGame | null {
        return (
            GameManager.games.find(g => g.black?._id?.equals(uid) || g.white?._id?.equals(uid)) ??
            null
        );
    }

    public static findGameByKey(gameKey: string[]): ChessGame | null {
        return GameManager.games.find(g => g.gameKey === gameKey) ?? null;
    }

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

    public static createGame(user: IUser): ChessGame | null {
        const game = new ChessGame();
        game.black = user;
        GameManager.games.push(game);
        game.addMessage({
            message: `${user.name.first} created the game.`,
        });
        return game;
    }

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
}

export default GameManager;
