import express = require('express');
import GameRoutes from './gameRoutes';
import UserRoutes from './userRoutes';

const apiRouter = express.Router();
const userApiRouter = express.Router();
const gameApiRouter = express.Router();

apiRouter.use('/user', userApiRouter);
apiRouter.use('/game', gameApiRouter);

userApiRouter.post('/create', UserRoutes.createUserRoute);
userApiRouter.post('/login', UserRoutes.loginUserRoute);
userApiRouter.get('/authenticate', UserRoutes.authenticateUserRoute);
userApiRouter.get('/info', UserRoutes.getUserRoute);

gameApiRouter.post('/create', GameRoutes.createGame);
gameApiRouter.post('/join', GameRoutes.joinGame);
gameApiRouter.post('/AIvAI/create', GameRoutes.createAIvAIGame);
gameApiRouter.get('/history', GameRoutes.getHistory);
gameApiRouter.get('/recent', GameRoutes.getRecent);

export default apiRouter;
