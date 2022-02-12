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
                        <h1>Homepage</h1>
                    </div>
                </div>
                <div className="row">
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
