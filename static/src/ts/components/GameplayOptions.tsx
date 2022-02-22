import * as React from 'react';
import ButtonComponent from './ButtonComponent';

export default class GameplayOptions extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 style={{ textAlign: 'center' }}>Gameplay Options</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <ButtonComponent label="You v AI" width="100%" onClick={() => void 0} />
                    </div>
                    <div className="col">
                        <ButtonComponent label="You v Friend" width="100%" onClick={() => void 0} />
                    </div>
                    <div className="col">
                        <ButtonComponent label="You v Random" width="100%" onClick={() => void 0} />
                    </div>
                    <div className="col">
                        <ButtonComponent label="AI v AI" width="100%" onClick={() => void 0} />
                    </div>
                </div>
            </div>
        );
    }
}
