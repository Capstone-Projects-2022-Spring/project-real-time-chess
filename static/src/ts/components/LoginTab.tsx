import * as React from 'react';
import ButtonComponent from './ButtonComponent';
import InputField from './InputField';

export interface SignUpTabProps {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

export default class LoginTabComponent extends React.Component<{}, {}> {
    constructor(props: SignUpTabProps = { fname: '', lname: '', email: '', password: '' }) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row mb-4">
                    <div className="col-12">
                        <InputField label="Username or Email" />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <InputField label="Password" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <ButtonComponent label="Login" className="w-100" />
                    </div>
                </div>
            </div>
        );
    }
}
