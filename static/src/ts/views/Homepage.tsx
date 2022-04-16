import * as React from 'react';
import LoginTabComponent from '../components/LoginTab';
import SignUpTabComponent from '../components/SignUpTab';
import TabbedComponent from '../components/UI/TabbedComponent';

/**
 * The homepage component which displays the login/signup forms.
 */
class Homepage extends React.Component<NoProps, NoState> {
    /**
     * The tabs belonging to the homepage (signup/login).
     */
    private tabs: { label: string; element: JSX.Element }[];

    /**
     * Creates an instance of Homepage.
     * @param props - NoProps.
     */
    constructor(props: NoProps) {
        super(props);
        this.tabs = [
            {
                label: 'Sign Up',
                element: <SignUpTabComponent fname="" lname="" email="" password="" />,
            },
            {
                label: 'Login',
                element: <LoginTabComponent user="" password="" />,
            },
        ];
    }

    /**
     * @returns The react element for the homepage component.
     */
    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col"></div>
                    <div className="col-4 col-md-3 col-lg-1">
                        <img
                            src="/img/RTC-Logo.png"
                            className="w-100 rtc-brand-logo"
                            alt="RTC Logo"
                        />
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row p-2">
                    <div className="col-12">
                        <h1 style={{ fontSize: '1.5rem', color: 'gray', textAlign: 'center' }}>
                            Real Time Chess
                        </h1>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col"></div>
                    <div
                        className="col-12 col-md-6 col-lg-4 col-xl-3 p-4 light-shadow"
                        style={{ background: 'white', borderRadius: '1em' }}
                    >
                        <TabbedComponent tabs={this.tabs} />
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}

export default Homepage;
