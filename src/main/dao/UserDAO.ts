import { ObjectId } from 'mongodb';
import InvalidCredentialsError from '../errors/InvalidCredentialsError';
import Logger from '../Logger';
import PromiseUtils from '../utils/PromiseUtils';
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
}

/**
 * The required information to login to an account.
 */
interface UserLoginFormData {
    user: string;
    password: string;
}

/**
 * Data Access Object for the User collection.
 */
class UserDAO extends BaseDAO<IUserDocument> {
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
            const doc = { ...formData, auths: [] as string[] };
            this.insertOne({ _id: new ObjectId(), ...doc, wins: 0, losses: 0 })
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    /**
     * @returns a promise for an IUser object with the given id
     * @param userId - id of user in database to retrieve
     */
    async retrieveUser(userId: string): Promise<IUser> {
        return new Promise((resolve, reject) => {
            this.findOne({ _id: new ObjectId(userId) })
                .then(user => {
                    resolve(user);
                })
                .catch(() => {
                    reject();
                });
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
            this.findOne({ email: formData.user })
                .then(async userFromEmail => {
                    let user = userFromEmail;
                    if (!user) {
                        user = await this.findOne({ username: formData.user });
                    }

                    if (!user) {
                        reject(new InvalidCredentialsError());
                    } else if (user.password === formData.password) {
                        const key = this.generateAuthKey();

                        this.updateOne({ _id: user._id }, { $push: { auths: key } })
                            .then(() =>
                                resolve({
                                    uid: user._id,
                                    key,
                                }),
                            )
                            .catch(err => {
                                Logger.error(err);
                                reject(err);
                            });
                    } else {
                        reject(
                            new InvalidCredentialsError('Incoreect username, email, or password'),
                        );
                    }
                })
                .catch(err => {
                    Logger.error(err);
                    reject(err);
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
     * Records a win for a user.
     *
     * @param uid - The user's id.
     * @returns A promise which resolves when the win is recorded in the database.
     */
    recordWin(uid: ObjectId): Promise<void> {
        return new Promise((resolve, reject) => {
            this.findOne({ _id: uid })
                .then(user => {
                    Logger.debug(
                        `Trying to find user with id: ${uid} (${typeof uid})\nUser: ${user}`,
                    );
                    let wins: number;
                    if (user.wins === undefined) wins = 1;
                    else wins = user.wins + 1;
                    PromiseUtils.handleDefault(
                        this.updateOne({ _id: uid }, { $set: { wins } }),
                        resolve,
                        reject,
                    );
                })
                .catch(err => {
                    Logger.error(err);
                    reject(err);
                });
        });
    }

    /**
     * Records a loss for a user.
     *
     * @param uid - The user's id.
     * @returns A promise which resolves when the loss is recorded in the database.
     */
    recordLoss(uid: ObjectId): Promise<void> {
        return new Promise((resolve, reject) => {
            this.findOne({ _id: uid })
                .then(user => {
                    let losses: number;
                    if (user.losses === undefined) losses = 1;
                    else losses = user.losses + 1;
                    PromiseUtils.handleDefault(
                        this.updateOne({ _id: uid }, { $set: { losses } }),
                        resolve,
                        reject,
                    );
                })
                .catch(err => {
                    Logger.error(err);
                    reject(err);
                });
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
            email: user.email,
            wins: user.wins ?? 0,
            losses: user.losses ?? 0,
        };
    }
}

export default UserDAO;
export { UserRegistrationFormData, UserLoginFormData };
