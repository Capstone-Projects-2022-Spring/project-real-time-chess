import * as express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.get('/', (_, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});
