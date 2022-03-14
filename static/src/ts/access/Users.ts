import axios from 'axios';
import LoginModel from '../models/LoginModel';
import SignUpModel from '../models/SignUpModel';

/**
 * A utility class which allows the client to interact
 * with the Users API.
 *
 * @class Users
 */
export default class Users {
    /**
     * Submits a signup request to the server.
     *
     * @static
     * @param {SignUpModel} form The user data from the sign up
     * form.
     * @returns {Promise<boolean>} A promise which resolves upon
     * successful signup. If the signup fails, the promise will
     * be rejected with an error.
     *
     * @memberOf Users
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
     * @static
     * @param {LoginModel} form The login form data.
     * @returns {Promise<boolean>} A promise which resolves upon
     * successful login. If the login fails, the promise will reject
     * with an error.
     *
     * @memberOf Users
     */
    static async login(form: LoginModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/user/login', form)
                .then(response => {
                    if (response.data.success) {
                        localStorage.setItem('cert', JSON.stringify(response.data.auth));
                    }
                    resolve(response.data.success);
                })
                .catch(err => reject(err));
        });
    }

    /**
     * Checks if the client has an authentication certificate.
     *
     * @static
     * @returns {boolean} True if the client has an authentication,
     * false otherwise.
     *
     * @memberOf Users
     */
    static hasCert(): boolean {
        return localStorage.getItem('cert') !== null;
    }

    /**
     * Authenticates a user certificate with the server.
     * This requires no data to be sent to the server as
     * the cookies should be sent with the request.
     *
     * @static
     * @returns {Promise<boolean>} True if the user is
     * authenticated, false otherwise.
     *
     * @memberOf Users
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
}
