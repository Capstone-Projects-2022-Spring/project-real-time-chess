import * as express from 'express';
import * as path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve('./static/public')));
app.set('view engine', 'pug');

app.get('/', (_, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
