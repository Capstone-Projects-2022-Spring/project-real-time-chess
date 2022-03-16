import express = require('express');
import { createGame, getFEN, getMessages, joinGame, movePiece } from './gameRoutes';
import { createUserRoute, loginUserRoute, authenticateUserRoute } from './userRoutes';

const apiRouter = express.Router();
const userApiRouter = express.Router();
const gameApiRouter = express.Router();

apiRouter.use('/user', userApiRouter);
apiRouter.use('/game', gameApiRouter);

userApiRouter.post('/create', createUserRoute);
userApiRouter.post('/login', loginUserRoute);
userApiRouter.get('/authenticate', authenticateUserRoute);

gameApiRouter.post('/create', createGame);
gameApiRouter.post('/join', joinGame);
gameApiRouter.post('/move', movePiece);

gameApiRouter.get('/fen', getFEN);
gameApiRouter.get('/messages', getMessages);

export default apiRouter;
