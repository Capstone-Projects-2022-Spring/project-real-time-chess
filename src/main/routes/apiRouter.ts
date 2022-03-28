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

gameApiRouter.post('/create', GameRoutes.createGame);
gameApiRouter.post('/join', GameRoutes.joinGame);

export default apiRouter;
