import express = require('express');
import { ObjectId } from 'mongodb';
import { BaseAPIResponse, ErrorAPIResponse } from '../APIResponse';
import UserDAO from '../dao/UserDAO';
import LoginAPIResponse from '../LoginAPIResponse';

/**
 * The interface for all user registration forms.
 */
interface CreateUserRequestBody {
    name: { first: string; last: string };
    email: string;
    username: string;
    password: string;
}

class UserRoutes {
    /**
     * The handler for the user registration route.
     *
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    static createUserRoute(
        req: express.Request<Record<string, never>, BaseAPIResponse, CreateUserRequestBody>,
        res: express.Response<BaseAPIResponse>,
    ) {
        const dao = new UserDAO();
        dao.createUser(req.body)
            .then(() =>
                res.send({
                    success: true,
                }),
            )
            .catch(err => res.send(new ErrorAPIResponse(err)));
    }

    /**
     * The handler for handling a login form request.
     *
     * @param req - The Express request object
     * @param res - The Express response object
     */
    static loginUserRoute(
        req: express.Request<
            Record<string, never>,
            LoginAPIResponse,
            { user: string; password: string }
        >,
        res: express.Response<LoginAPIResponse | ErrorAPIResponse>,
    ) {
        const dao = new UserDAO();
        dao.authenticateLogin(req.body)
            .then(auth => {
                res.cookie('uid', auth.uid);
                res.cookie('auth', auth.key);
                res.send(new LoginAPIResponse(auth));
            })
            .catch(err => res.send(new ErrorAPIResponse(err)));
    }

    /**
     * The handler for handling a certificate authentication request.
     *
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    static authenticateUserRoute(req: express.Request, res: express.Response<BaseAPIResponse>) {
        const dao = new UserDAO();
        dao.authenticateKey(new ObjectId(req.cookies.uid), req.cookies.auth)
            .then(passed => {
                if (passed) res.send({ success: true });
                else res.send(new ErrorAPIResponse(new Error('Invalid certificate')));
            })
            .catch(error => res.send(new ErrorAPIResponse(error)));
    }
}

export default UserRoutes;