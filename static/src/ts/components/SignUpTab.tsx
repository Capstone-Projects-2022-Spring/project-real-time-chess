import * as React from 'react';
import ButtonComponent from './ButtonComponent';
import { EmailFieldComponent, NameFieldComponent, PasswordFieldComponent } from './InputField';

export interface SignUpTabProps {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

export default class SignUpTabComponent extends React.Component<{}, {}> {
    constructor(props: SignUpTabProps = { fname: '', lname: '', email: '', password: '' }) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row mb-4">
                    <div className="col-6">
                        <NameFieldComponent label="First Name" />
                    </div>
                    <div className="col-6">
                        <NameFieldComponent label="Last Name" />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <EmailFieldComponent label="Email" />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <PasswordFieldComponent label="Password" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <ButtonComponent label="Sign Up" className="w-100" />
                    </div>
                </div>
            </div>
        );
    }
}
