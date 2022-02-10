import * as React from 'react';
import ButtonComponent from './ButtonComponent';
import InputField from './InputField';

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
                        <InputField label="First Name" />
                    </div>
                    <div className="col-6">
                        <InputField label="Last Name" />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-6">
                        <InputField label="Email" />
                    </div>
                    <div className="col-6">
                        <InputField label="Password" />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <ButtonComponent label="Sign Up" className="w-100" />
                    </div>
                </div>
            </div>
        );
    }
}
