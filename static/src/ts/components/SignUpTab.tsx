import * as React from 'react';
import Swal from 'sweetalert2';
import Users from '../access/Users';
import SignUpModel from '../models/SignUpModel';
import ButtonComponent from './UI/ButtonComponent';
import EmailFieldComponent from './UI/EmailFieldComponent';
import NameFieldComponent from './UI/NameFieldComponent';
import PasswordFieldComponent from './UI/PasswordFieldComponent';

interface SignUpTabProps {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

interface SignUpTabState {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

/**
 * The signup tab component which appears in the Signup/Login TabbedComponent.
 */
class SignUpTabComponent extends React.Component<SignUpTabProps, SignUpTabState> {
    /**
     * Creates an instance of SignUpTabComponent.
     *
     * @param props - The properties for the signup form.
     * The parent component could pass optional values for the form fields.
     */
    constructor(props: SignUpTabProps) {
        super(props);
        this.state = {
            fname: props.fname,
            lname: props.lname,
            email: props.email,
            password: props.password,
        };
    }

    /**
     * Exports the form data from this signup component as a SignUpModel object.
     *
     * @returns The form data as a SignUpModel object.
     */
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

    /**
     * @returns The react element for the SignUpTab view.
     */
    render() {
        return (
            <div>
                <div className="row p-2">
                    <div className="col-12">
                        <h2>Sign Up</h2>
                    </div>
                </div>

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
                            onClick={() => this.displayPasswordRequirements()}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <ButtonComponent
                            label="Sign Up"
                            className="w-100"
                            onClick={() => {
                                Users.signup(this.getFormData())
                                    .then(created => {
                                        if (created) {
                                            Swal.fire({
                                                title: 'Signup Successful',
                                                text: `${this.state.fname}, good news. You're signed up!`,
                                            }).catch(err =>
                                                document.write(`Error: ${err.message}`),
                                            );
                                        } else {
                                            Swal.fire({
                                                title: 'Signup Failed',
                                                text: 'We do not know why',
                                            }).catch(err =>
                                                document.write(`Error: ${err.message}`),
                                            );
                                        }
                                    })
                                    .catch(err => {
                                        Swal.fire({
                                            title: 'Signup Failed',
                                            text: `Reason: ${err.message}`,
                                        }).catch(swalError =>
                                            document.write(`Error: ${swalError.message}`),
                                        );
                                    });
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Displays a toast notification with the password requirements.
     */
    private displayPasswordRequirements() {
        Swal.fire({
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
            icon: 'info',
            toast: true,
            html: `<strong>Password Requirements:</strong>
            <ul>
            <li>Must be 8 or more characters</li>
            <li>Must contain a symbol (ex: !@#$)</li>
            <li>At least one uppercase letter</li>
            </ul>`,
        }).catch(err => document.write(`Error: ${err.message}`));
    }
}

export default SignUpTabComponent;
export { SignUpTabProps, SignUpTabState };
