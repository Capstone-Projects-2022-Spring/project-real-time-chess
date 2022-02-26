import express = require('express');
import userApiRouter from './userApiRouter';

const apiRouter = express.Router();

apiRouter.use('/user', userApiRouter);

export default apiRouter;
