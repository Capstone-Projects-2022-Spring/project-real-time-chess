import { ObjectId, Document } from 'mongodb';
import InvalidCredentialsError from '../errors/InvalidCredentialsError';
import BaseDAO from './BaseDAO';

/**
 * The required information for the signup form.
 */
interface UserRegistrationFormData {
    name: {
        first: string;
        last: string;
    };
    username: string;
    password: string;
    email: string;
    win_loss: number;
    pieces_captured: number;
    total_games: number;
    rank: number;
}

/**
 * The required information to login to an account.
 */
interface UserLoginFormData {
    user: string;
    password: string;
}

/**
 * The data belonging to a User in the database
 */
interface IUser extends Document {
    _id?: ObjectId;
    name: {
        first: string;
        last: string;
    };
    email: string;
    username: string;
    password: string;
    win_loss: number;
    pieces_captured: number;
    total_games: number;
    rank: number;
    auths: string[];
}

/**
 * Data Access Object for the User collection.
 */
class UserDAO extends BaseDAO<IUser> {
    /**
     * Returns the collection name for the UserDAO. This is used by BaseDAO to correctly
     * access the `"users"` collection.
     */
    override get collectionName(): string {
        return 'users';
    }

    /**
     * Creates a user using the registration form data
     *
     * @param formData - The user-entered data for their account.
     * @returns Resolves upon successful insertion of user in the database.
     * Rejects upon any error.
     */
    async createUser(formData: UserRegistrationFormData): Promise<void> {
        return new Promise((resolve, reject) => {
            const doc = { ...formData, auths: [] };
            this.insertOne(doc)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    /**
     * Authenticates a user using login form data.
     *
     * @param formData - The user-provided username/email and password combination.
     * @returns Resolves with an AuthInfo object containing the user's id and auth
     * key. Rejects upon any error or invalid credentials.
     */
    async authenticateLogin(formData: UserLoginFormData): Promise<AuthInfo> {
        return new Promise((resolve, reject) => {
            this.findOne({ email: formData.user }).then(async userFromEmail => {
                let user = userFromEmail;
                if (!user) {
                    user = await this.findOne({ username: formData.user });
                }

                if (!user) {
                    reject(new InvalidCredentialsError());
                } else if (user.password === formData.password) {
                    const key = this.generateAuthKey();

                    this.updateOne({ _id: user._id }, { $push: { auths: key } });

                    resolve({
                        uid: user._id,
                        key,
                    });
                } else {
                    reject(new InvalidCredentialsError('Incoreect username, email, or password'));
                }
            });
        });
    }

    /**
     * Authenticates an auth key. This should be used when a user is already logged in.
     * Two cookies are saved on the client (`uid` and `auth`), which should be passed
     * such that these two values can be used to authenticate the user.
     *
     * @param uid - The user's id.
     * @param key - The user's auth key (from the clients cookies).
     * @returns Resolves with true if the user is authenticated.
     * Will resolve with false if the user is not authenticated, and reject if there
     * is any error.
     */
    async authenticateKey(uid: ObjectId, key: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.findOne({ _id: uid })
                .then(user => {
                    if (user && user.auths.includes(key)) {
                        resolve(true);
                    } else {
                        reject(new InvalidCredentialsError());
                    }
                })
                .catch(err => reject(err));
        });
    }

    /**
     * Generates a random auth key.
     *
     * @returns The generated auth key.
     */
    private generateAuthKey(): string {
        return (
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        );
    }

    /**
     * Sanitizes a user object such that all sensitive data is removed. Objects should only be
     * shared with clients once they have been sanitized. Anything which a user should not be
     * able to access will be removed by this function.
     *
     * @param user - A raw user object from the database. This is the unsanitized object with
     * private data such as authentication keys, passwords, etc.
     * @returns The sanitized user object.
     */
    static sanitize(user: IUser): ISanitizedUser {
        return {
            username: user.username,
            name: user.name,
        };
    }
}

export default UserDAO;
export { IUser, UserRegistrationFormData, UserLoginFormData };
