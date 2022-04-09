import axios from 'axios';
import CookieManager from '../CookieManager';
import LoginModel from '../models/LoginModel';
import SignUpModel from '../models/SignUpModel';

/**
 * A utility class which allows the client to interact
 * with the Users API.
 */
class Users {
    /**
     * Submits a signup request to the server.
     *
     * @param form - The user data from the sign up form.
     * @returns A promise which resolves upon
     * successful signup. If the signup fails, the promise will
     * be rejected with an error.
     */
    static async signup(form: SignUpModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/user/create', form)
                .then(response => resolve(response.data.success))
                .catch(err => reject(err));
        });
    }

    /**
     * Logins in a user by providing their email and password.
     *
     * @param form - The login form data.
     * @returns A promise which resolves upon
     * successful login. If the login fails, the promise will reject
     * with an error.
     */
    static async login(form: LoginModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/user/login', form)
                .then(response => {
                    resolve(response.data.success);
                })
                .catch(err => reject(err));
        });
    }

    /**
     * Checks if the client has an authentication certificate.
     *
     * @returns True if the client has an authentication,
     * false otherwise.
     */
    static hasCert(): boolean {
        return CookieManager.uid.trim().length !== 0 && CookieManager.auth.trim().length !== 0;
    }

    /**
     * Authenticates a user certificate with the server.
     * This requires no data to be sent to the server as
     * the cookies should be sent with the request.
     *
     * @returns True if the user is authenticated, false otherwise.
     */
    static authenticateCertificate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (Users.hasCert()) {
                axios.get('/api/user/authenticate').then(response => {
                    if (response.data.success) {
                        resolve(true);
                    } else {
                        reject(response.data.error);
                    }
                });
            } else {
                reject(new Error('Invalid authentication certificate'));
            }
        });
    }

    /**
     * Gets the publicly available information for the user that
     * is currently logged in.
     *
     * @returns The sanitized user data (if they are logged in).
     */
    static getInfo(): Promise<ISanitizedUser> {
        return new Promise((resolve, reject) => {
            axios.get('/api/user/info').then(response => {
                if (response.data.success) resolve(response.data.user);
                else reject(response.data.error);
            });
        });
    }
}

export default Users;
