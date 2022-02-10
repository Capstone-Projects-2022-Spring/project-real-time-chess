import * as React from 'react';

export default class InputField extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="input-field-component">
                <input />
            </div>
        );
    }
}
