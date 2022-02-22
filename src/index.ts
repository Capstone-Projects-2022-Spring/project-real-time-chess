import cookieParser = require('cookie-parser');
import * as express from 'express';
import { ObjectId } from 'mongodb';
import * as path from 'path';
import DatabaseConnector from './dao/DatabaseConnector';
import UserDAO from './dao/UserDAO';

const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

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
        .catch(error =>
            res.send({
                success: false,
                error,
            })
        );
});

app.post('/api/user/login', (req, res) => {
    const dao = new UserDAO();
    dao.authenticateLogin(req.body)
        .then(auth => {
            res.cookie('uid', auth.uid);
            res.cookie('auth', auth.key);
            res.send({ success: true, auth });
        })
        .catch(error => {
            res.send({ success: false, error });
        });
});

app.get('/api/user/authenticate', (req, res) => {
    const dao = new UserDAO();
    dao.authenticateKey(new ObjectId(req.cookies.uid), req.cookies.auth)
        .then(passed => {
            console.log(passed);
            if (passed) {
                res.send({ success: true });
            } else {
                res.send({ success: false, error: new Error('Invalid certificate') });
            }
        })
        .catch(error => res.send({ success: false, error }));
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
