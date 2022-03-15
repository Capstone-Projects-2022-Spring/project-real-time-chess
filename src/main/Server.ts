import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import express = require('express');
import * as http from 'http';
import * as path from 'path';
import DatabaseConnector from './dao/DatabaseConnector';
import Logger from './Logger';
import apiRouter from './routes/apiRouter';

/**
 * The RTCServer class is responsible for starting the server and handling
 * all incoming routes, along with distributing the workload of all incoming
 * API requests and WebSocket events.
 */
class RTCServer {
    private app: express.Express;

    private PORT: number;

    private httpServer: http.Server;

    /**
     * Creates an instance of RTCServer.
     */
    constructor() {
        this.app = express();
        this.PORT = parseInt(process.env.PORT ?? '3000', 10);
        this.httpServer = http.createServer(this.app);

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

    /**
     * Begins listening on the specified port. The port
     * is automatically specified based on the environment.
     * If an environment variable (`process.env.PORT`) is not
     * defined, then the default port (`3000`) is used.
     */
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

        this.httpServer.listen(this.PORT, () => {
            Logger.info(`Listening on PORT: ${this.PORT}`);
        });
    }
}

export default RTCServer;
