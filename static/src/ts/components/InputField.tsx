import * as React from 'react';

export interface InputFieldProps {
    label?: string;
    placeholder?: string;
    value?: string;
}
export default class InputField extends React.Component<InputFieldProps, {}> {
    constructor(props: InputFieldProps) {
        super(props);
    }

    render() {
        return (
            <div className="input-field-component">
                <input value={this.props.value} placeholder={this.props.placeholder} />
                <div>{this.props.label ?? ''}</div>
            </div>
        );
    }
}
