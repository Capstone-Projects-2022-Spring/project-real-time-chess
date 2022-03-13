import express = require('express');
import gameApiRouter from './gameApiRouter';
import userApiRouter from './userApiRouter';

const apiRouter = express.Router();

apiRouter.use('/user', userApiRouter);
apiRouter.use('/game', gameApiRouter);

export default apiRouter;
