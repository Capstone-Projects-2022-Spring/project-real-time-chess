import { ObjectId, Document } from 'mongodb';
import BaseDAO from './BaseDAO';

export interface UserRegistrationFormData {
    name: {
        first: string;
        last: string;
    };
    username: string;
    password: string;
    email: string;
}

export interface UserLoginFormData {
    user: string;
    password: string;
}

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

export interface AuthInfo {
    uid: ObjectId;
    key: string;
}

export default class UserDAO extends BaseDAO<IUser> {
    override get collectionName(): string {
        return 'users';
    }

    async createUser(formData: UserRegistrationFormData): Promise<void> {
        return new Promise((resolve, reject) => {
            const doc = { ...formData, auths: [] };
            this.insertOne(doc)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    async authenticateLogin(formData: UserLoginFormData): Promise<AuthInfo> {
        return new Promise(async (resolve, reject) => {
            let user = await this.findOne({ email: formData.user });
            if (!user) {
                user = await this.findOne({ username: formData.user });
            }

            if (user.password === formData.password) {
                const key = this.generateAuthKey();
                resolve({
                    uid: user._id,
                    key,
                });
            } else {
                reject(new Error('Invalid username or password'));
            }
        });
    }

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

    private generateAuthKey(): string {
        return (
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        );
    }
}
