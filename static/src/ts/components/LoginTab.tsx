import * as React from 'react';
import Swal from 'sweetalert2';
import Users from '../access/Users';
import UINavigator from '../models/UINavigator';
import ButtonComponent from './ButtonComponent';
import GameplayOptions from './GameplayOptions';
import { PasswordFieldComponent, TextFieldComponent } from './InputField';

export interface LoginTabProps {
    user?: string;
    password?: string;
}

export interface LoginTabState {
    user: string;
    password: string;
}

export default class LoginTabComponent extends React.Component<LoginTabProps, LoginTabState> {
    constructor(props: LoginTabProps) {
        super(props);
        this.state = {
            user: this.props.user ?? '',
            password: this.props.password ?? '',
        };
    }

    render() {
        return (
            <div>
                <div className="row p-2">
                    <div className="col-12">
                        <h2>Login</h2>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <TextFieldComponent
                            label="Username or Email"
                            onChange={e => this.setState({ user: e.target.value })}
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <PasswordFieldComponent
                            label="Password"
                            type="password"
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <ButtonComponent
                            label="Login"
                            className="w-100"
                            onClick={() => {
                                Users.login({
                                    user: this.state.user,
                                    password: this.state.password,
                                })
                                    .then(success => {
                                        console.log(success);
                                        if (success) UINavigator.render(<GameplayOptions />);
                                        else
                                            Swal.fire({
                                                title: 'Login Failed',
                                                text: 'Incorrect username or password',
                                            });
                                    })
                                    .catch(error => {
                                        Swal.fire({
                                            title: 'Login Failed',
                                            text: error.message,
                                        });
                                    });
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
