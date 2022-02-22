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
            console.log(response);
        });
    }
}
