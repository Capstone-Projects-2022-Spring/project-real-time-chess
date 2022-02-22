import * as React from 'react';
import Users from '../access/Users';
import ButtonComponent from './ButtonComponent';
import InputField from './InputField';

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
                <div className="row mb-4">
                    <div className="col-12">
                        <InputField label="Username or Email" onChange={() => void 0} />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <InputField label="Password" onChange={() => void 0} />
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
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
