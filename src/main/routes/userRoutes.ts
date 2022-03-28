import { ObjectId } from 'mongodb';
import { ErrorAPIResponse } from '../APIResponse';
import UserDAO from '../dao/UserDAO';
import LoginAPIResponse from '../LoginAPIResponse';

/**
 * A static class which holds all the routes for the user API.
 */
class UserRoutes {
    /**
     * The handler for the user registration route.
     *
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    static createUserRoute(req: CreateUserRequest, res: CreateUserResponse) {
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
    static loginUserRoute(req: LoginUserRequest, res: LoginUserResponse) {
        const dao = new UserDAO();
        dao.authenticateLogin(req.body)
            .then(auth => {
                res.cookie('uid', auth.uid.toString());
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
    static authenticateUserRoute(req: AuthenticateUserRequest, res: AuthenticateUserResponse) {
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
