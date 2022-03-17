/**
 * The data belonging to a User in the database
 */
interface IUser extends Document {
    _id: import('mongodb').ObjectId;
    name: {
        first: string;
        last: string;
    };
    email: string;
    username: string;
    password: string;
    auths: string[];
}

declare interface ISanitizedUser {
    name: {
        first: string;
        last: string;
    };
    username: string;
}
