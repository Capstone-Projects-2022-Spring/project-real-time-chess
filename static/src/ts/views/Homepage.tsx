import * as React from 'react';
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
                element: <div />,
            },
        ];
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h1>Homepage</h1>
                    </div>

                    <div className="col-12 col-md-6">
                        <TabbedComponent tabs={this.tabs} />
                    </div>
                </div>
            </div>
        );
    }
}
