import axios from 'axios';
import LoginModel from '../models/LoginModel';
import SignUpModel from '../models/SignUpModel';

export default class Users {
    static signup(form: SignUpModel): void {
        axios.post('/api/user/create', form).then(response => {
            console.log(response);
        });
    }

    static login(form: LoginModel): void {
        axios.post('/api/user/login', form).then(response => {
            if (response.data.success) {
                localStorage.setItem('cert', JSON.stringify(response.data.auth));
            } else {
                alert('Login failed');
            }
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
                        reject(false);
                    }
                });
            } else {
                reject(new Error('Invalid authentication certificate'));
            }
        });
    }
}
