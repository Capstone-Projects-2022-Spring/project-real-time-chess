import express = require('express');
import { ObjectId } from 'mongodb';
import { ErrorAPIResponse } from '../APIResponse';
import UserDAO from '../dao/UserDAO';

const userApiRouter = express.Router();

userApiRouter.post('/api/user/create', (req, res) => {
    const dao = new UserDAO();
    dao.createUser(req.body)
        .then(() =>
            res.send({
                success: true,
            })
        )
        .catch(err => res.send(new ErrorAPIResponse(err)));
});

userApiRouter.post('/api/user/login', (req, res) => {
    const dao = new UserDAO();
    dao.authenticateLogin(req.body)
        .then(auth => {
            res.cookie('uid', auth.uid);
            res.cookie('auth', auth.key);
            res.send({ success: true, auth });
        })
        .catch(err => res.send(new ErrorAPIResponse(err)));
});

userApiRouter.get('/api/user/authenticate', (req, res) => {
    const dao = new UserDAO();
    dao.authenticateKey(new ObjectId(req.cookies.uid), req.cookies.auth)
        .then(passed => {
            console.log(passed);
            if (passed) res.send({ success: true });
            else res.send(new ErrorAPIResponse(new Error('Invalid certificate')));
        })
        .catch(error => res.send(new ErrorAPIResponse(error)));
});

export default userApiRouter;
