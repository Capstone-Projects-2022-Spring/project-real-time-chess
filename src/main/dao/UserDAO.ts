import { ObjectId, Document } from 'mongodb';
import BaseDAO from './BaseDAO';

/**
 * The required information for the signup form.
 */
export interface UserRegistrationFormData {
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
export interface UserLoginFormData {
    user: string;
    password: string;
}

/**
 * The data belonging to a User in the database
 */
export interface IUser extends Document {
    _id?: ObjectId;
    name: {
        first: string;
        last: string;
    };
    email: string;
    username: string;
    password: string;
    auths: string[];
}

/**
 * Authorization information stored in a cookie on the client side.
 * This is used to verify if a user is logged in.
 *
 * `uid` is saved as `cookies.uid`
 *
 * `key` is saved as `cookies.auth`
 */
export interface AuthInfo {
    uid: ObjectId;
    key: string;
}

/**
 * Data Access Object for the User collection.
 */
export default class UserDAO extends BaseDAO<IUser> {
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

                if (user.password === formData.password) {
                    const key = this.generateAuthKey();

                    this.updateOne({ _id: user._id }, { $push: { auths: key } });

                    resolve({
                        uid: user._id,
                        key,
                    });
                } else {
                    reject(new Error('Invalid username or password'));
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
                        reject(new Error('Invalid key'));
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
}
