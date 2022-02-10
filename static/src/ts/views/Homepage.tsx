import * as React from 'react';

export default class Homepage extends React.Component<{}, {}> {
    constructor(props: {} = {}) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h1>Homepage</h1>
                    </div>

                    <div className="col-12 col-md-6">
                        <button>Login</button>
                        <button>Sign Up</button>
                    </div>
                </div>
            </div>
        );
    }
}
