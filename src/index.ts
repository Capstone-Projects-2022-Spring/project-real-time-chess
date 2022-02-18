import * as express from 'express';
import * as path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(express.static(path.resolve('./static/public')));
app.use(bodyParser({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (_, res) => {
    res.render('index');
});

app.post('/api/users/create', (_, res) => {
    res.send();
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
