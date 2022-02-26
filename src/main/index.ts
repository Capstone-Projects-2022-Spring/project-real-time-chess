import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { ObjectId } from 'mongodb';
import * as path from 'path';
import DatabaseConnector from './dao/DatabaseConnector';
import UserDAO from './dao/UserDAO';

const app = express();
const PORT = process.env.PORT || 3000;

DatabaseConnector.open();

app.use(express.static(path.resolve('./static/public')));
app.use(bodyParser({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'pug');

app.get('/', (_, res) => {
    res.render('index');
});

app.post('/api/user/create', (req, res) => {
    const dao = new UserDAO();
    dao.createUser(req.body)
        .then(() =>
            res.send({
                success: true,
            })
        )
        .catch(err => res.send(new ErrorAPIResponse(err)));
});

app.post('/api/user/login', (req, res) => {
    const dao = new UserDAO();
    dao.authenticateLogin(req.body)
        .then(auth => {
            res.cookie('uid', auth.uid);
            res.cookie('auth', auth.key);
            res.send({ success: true, auth });
        })
        .catch(err => res.send(new ErrorAPIResponse(err)));
});

app.get('/api/user/authenticate', (req, res) => {
    const dao = new UserDAO();
    dao.authenticateKey(new ObjectId(req.cookies.uid), req.cookies.auth)
        .then(passed => {
            console.log(passed);
            if (passed) res.send({ success: true });
            else res.send(new ErrorAPIResponse(new Error('Invalid certificate')));
        })
        .catch(error => res.send(new ErrorAPIResponse(error)));
});

app.listen(PORT, () => {
    console.log(`
    ▢----------------------▢--------------------------▢
    | Field                | Value                    |
    ▢----------------------▢--------------------------▢
      Listening on PORT      ${PORT}
      Website                http://localhost:${PORT}
    ▢----------------------▢--------------------------▢`);
});

interface APIResponse {
    success: boolean;
    error?: Error;
}

abstract class BaseAPIResponse implements APIResponse {
    success: boolean;
    error?: Error;

    constructor(success: boolean, error?: Error | string) {
        this.success = success;
        this.error = typeof error === 'string' ? new Error(error) : error;
    }
}

class ErrorAPIResponse extends BaseAPIResponse {
    constructor(error: Error) {
        super(false, error);
    }
}
