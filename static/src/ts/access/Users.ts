import axios from 'axios';
import LoginModel from '../models/LoginModel';
import SignUpModel from '../models/SignUpModel';

export default class Users {
    static async signup(form: SignUpModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/user/create', form)
                .then(response => resolve(response.data.success))
                .catch(err => reject(err));
        });
    }

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

    static hasCert(): boolean {
        return localStorage.getItem('cert') !== null;
    }

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
