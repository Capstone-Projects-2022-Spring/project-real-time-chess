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
                element: <SignUpTabComponent />,
            },
            {
                label: 'Login',
                element: <LoginTabComponent />,
            },
        ];
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 style={{ textAlign: 'center' }}>Real Time Chess</h1>
                    </div>
                    <div
                        className="col-12"
                        style={{ fontSize: '1.5rem', color: 'gray', textAlign: 'center' }}
                    >
                        Hello World Application
                    </div>
                </div>
                <div className="row" style={{ marginTop: '4rem' }}>
                    <div className="col"></div>
                    <div
                        className="col-12 col-md-6 col-lg-4 col-xl-3 p-4"
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
