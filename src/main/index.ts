import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import DatabaseConnector from './dao/DatabaseConnector';
import apiRouter from './routes/apiRouter';

const app = express();
const PORT = process.env.PORT || 3000;

DatabaseConnector.open();

app.set('view engine', 'pug');

app.use(express.static(path.resolve('./static/public')));
app.use(bodyParser({ extended: true }));
app.use(cookieParser());
app.use('/api', apiRouter);

app.get('/', (_, res) => {
    res.render('index');
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
