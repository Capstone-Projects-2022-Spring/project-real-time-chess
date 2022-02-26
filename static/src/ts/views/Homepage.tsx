import * as React from 'react';
import LoginTabComponent from '../components/LoginTab';
import SignUpTabComponent from '../components/SignUpTab';
import TabbedComponent from '../components/TabbedComponent';

export default class Homepage extends React.Component<{}, {}> {
    private tabs: { label: string; element: JSX.Element }[];

    constructor(props: {} = {}) {
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

    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col"></div>
                    <div className="col-4 col-md-3 col-lg-1">
                        <img src="/img/RTC-Logo.png" className="w-100" alt="RTC Logo" />
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
