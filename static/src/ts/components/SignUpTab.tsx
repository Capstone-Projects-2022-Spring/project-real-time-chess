import * as React from 'react';
import Users from '../access/Users';
import SignUpModel from '../models/SignUpModel';
import ButtonComponent from './ButtonComponent';
import { EmailFieldComponent, NameFieldComponent, PasswordFieldComponent } from './InputField';

export interface SignUpTabProps {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

export interface SignUpTabState {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

export default class SignUpTabComponent extends React.Component<SignUpTabProps, SignUpTabState> {
    constructor(props: SignUpTabProps) {
        super(props);
        this.state = {
            fname: props.fname,
            lname: props.lname,
            email: props.email,
            password: props.password,
        };
    }

    getFormData(): SignUpModel {
        return {
            name: {
                first: this.state.fname,
                last: this.state.lname,
            },
            email: this.state.email,
            password: this.state.password,
        };
    }

    render() {
        return (
            <div>
                <div className="row mb-4">
                    <div className="col-6">
                        <NameFieldComponent
                            label="First Name"
                            onChange={e => this.setState({ fname: e.target.value })}
                        />
                    </div>
                    <div className="col-6">
                        <NameFieldComponent
                            label="Last Name"
                            onChange={e => this.setState({ lname: e.target.value })}
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <EmailFieldComponent
                            label="Email"
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <PasswordFieldComponent
                            label="Password"
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <ButtonComponent
                            label="Sign Up"
                            className="w-100"
                            onClick={() => {
                                Users.signup(this.getFormData());
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
