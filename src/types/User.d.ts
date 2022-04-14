/**
 * The data belonging to a User in the database
 */
declare interface IUser {
    _id: import('mongodb').ObjectId;
    name: {
        first: string;
        last: string;
    };
    email: string;
    username: string;
    password: string;
    auths: string[];
    wins: number;
    losses: number;
}

declare type IUserDocument = IUser & import('mongodb').Document;

declare interface ISanitizedUser {
    name: {
        first: string;
        last: string;
    };
    username: string;
    email: string;
    wins: number;
    losses: number;
}
