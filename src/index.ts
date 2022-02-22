import * as express from 'express';
import * as path from 'path';
import DatabaseConnector from './dao/DatabaseConnector';
import UserDAO from './dao/UserDAO';

// import required to integrate socket.io
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// init server using socket.io
// server is created here instead of using app.listen(...)
const io = new Server(app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
}));

DatabaseConnector.open();

app.use(express.static(path.resolve('./static/public')));
app.use(bodyParser({ extended: true }));

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

io.on("connection", (socket) => {
    console.log(socket.id);
});
