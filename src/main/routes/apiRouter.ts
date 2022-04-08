import express = require('express');
import GameRoutes from './gameRoutes';
import UserRoutes from './userRoutes';
import MatchRoutes from './matchRoutes';

const apiRouter = express.Router();
const userApiRouter = express.Router();
const gameApiRouter = express.Router();
const matchApiRouter = express.Router();

apiRouter.use('/user', userApiRouter);
apiRouter.use('/game', gameApiRouter);
apiRouter.use('/match', matchApiRouter);

userApiRouter.post('/create', UserRoutes.createUserRoute);
userApiRouter.post('/login', UserRoutes.loginUserRoute);
userApiRouter.get('/authenticate', UserRoutes.authenticateUserRoute);

gameApiRouter.post('/create', GameRoutes.createGame);
gameApiRouter.post('/join', GameRoutes.joinGame);

matchApiRouter.post('/queue', MatchRoutes.queue);

export default apiRouter;
