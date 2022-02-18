import axios from 'axios';
import SignUpModel from '../models/SignUpModel';

export default class Users {
    static signup(form: SignUpModel): void {
        axios.post('/api/users/create', form).then(response => {
            console.log(response);
        });
    }
}
