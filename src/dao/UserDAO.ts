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

export default class UserDAO extends BaseDAO {
    override get collectionName(): string {
        return 'users';
    }

    createUser(formData: UserRegistrationFormData): Promise<void> {
        return new Promise((resolve, reject) => {
            const collection = this.collection;
            console.log(`Value of collection: ${collection}`);
            if (collection) {
                collection
                    .insertOne(formData)
                    .then(() => {
                        console.log('resolved');
                        resolve();
                    })
                    .catch(err => {
                        console.log('threw an error');
                        reject(err);
                    });
            } else reject(new Error('Collection is undefined'));
        });
    }
}
