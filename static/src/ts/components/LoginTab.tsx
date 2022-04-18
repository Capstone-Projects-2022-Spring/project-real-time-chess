import * as React from 'react';
import Users from '../access/Users';
import UINavigator from '../models/UINavigator';
import ButtonComponent from './UI/ButtonComponent';
import GameplayOptions from '../views/MainMenu';
import PasswordFieldComponent from './UI/PasswordFieldComponent';
import TextFieldComponent from './UI/TextFieldComponent';
import ToastNotification from './UI/ToastNotification';

interface LoginTabProps {
    user?: string;
    password?: string;
}

interface LoginTabState {
    user: string;
    password: string;
}

/**
 * The login tab component which appears in the Signup/Login TabbedComponent.
 */
class LoginTabComponent extends React.Component<LoginTabProps, LoginTabState> {
    private static readonly failedLoginToast = new ToastNotification(
        'Login Failed!',
        60000,
        undefined,
        {
            background: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%);',
            color: 'white',
        },
    );

    /**
     * Creates an instance of LoginTabComponent.
     *
     * @param props - The user/password which should be prefilled
     * into the form fields.
     */
    constructor(props: LoginTabProps) {
        super(props);
        this.state = {
            user: this.props.user ?? '',
            password: this.props.password ?? '',
        };
    }

    /**
     * Renders the login tab component.
     *
     * @returns The react element for the login tab view.
     */
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
                                        if (success) UINavigator.render(<GameplayOptions />);
                                        else {
                                            LoginTabComponent.failedLoginToast.fire();
                                            ToastNotification.notify(
                                                'Incorrect username or password',
                                                60000,
                                            );
                                        }
                                    })
                                    .catch(() => {
                                        LoginTabComponent.failedLoginToast.fire();
                                    });
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginTabComponent;
export { LoginTabProps, LoginTabState };
