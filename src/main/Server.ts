import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import express = require('express');
import DatabaseConnector from './dao/DatabaseConnector';
import apiRouter from './routes/apiRouter';
import * as path from 'path';

export default class Server {
    private app: express.Express;
    private PORT: number;

    constructor() {
        this.app = express();
        this.PORT = parseInt(process.env.PORT ?? '3000');

        DatabaseConnector.open();

        this.app.set('view engine', 'pug');

        this.app.use(express.static(path.resolve('./static/public')));
        this.app.use(bodyParser({ extended: true }));
        this.app.use(cookieParser());
        this.app.use('/api', apiRouter);

        this.app.get('/', (_, res) => {
            res.render('index');
        });
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`
    ▢----------------------▢--------------------------▢
    | Field                | Value                    |
    ▢----------------------▢--------------------------▢
      Listening on PORT      ${this.PORT}
      Website                http://localhost:${this.PORT}
    ▢----------------------▢--------------------------▢`);
        });
    }
}
