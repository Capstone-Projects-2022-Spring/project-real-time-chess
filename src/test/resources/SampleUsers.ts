import { ObjectId } from 'mongodb';

const TU1: IUser = {
    _id: new ObjectId(),
    name: {
        first: 'Viraj',
        last: 'Shah',
    },
    email: 'tuj51318@temple.edu',
    username: 'VirajShah',
    password: 'VirajShahsPassword',
    auths: [],
    wins: 0,
    losses: 0,
};

const TU2: IUser = {
    _id: new ObjectId(),
    name: {
        first: 'John',
        last: 'Doe',
    },
    email: 'john.doe@example.com',
    username: 'johndoe',
    password: 'johndoe',
    auths: [],
    wins: 0,
    losses: 0,
};

const TU3: IUser = {
    _id: new ObjectId(),
    name: {
        first: 'Jane',
        last: 'Doe',
    },
    email: 'jane.doe@example.com',
    username: 'janedoe',
    password: 'jane',
    auths: [],
    wins: 0,
    losses: 0,
};

export { TU1, TU2, TU3 };
