import * as React from 'react';

export type ThrowsInputFieldValidationError = never;

export interface InputFieldProps {
    label?: string;
    placeholder?: string;
    value?: string;
    isValid?: boolean;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputFieldState {
    label: string;
    placeholder?: string;
    value: string;
    isValid: string;
    type: string;
}

export default abstract class InputField extends React.Component<InputFieldProps, InputFieldState> {
    constructor(props: InputFieldProps) {
        super(props);
        this.state = {
            label: props.label ?? '',
            placeholder: props.placeholder,
            value: props.value ?? '',
            isValid: 'ic',
            type: props.type ?? 'text',
        };
    }

    render() {
        return (
            <div className="input-field-component" data-valid={this.state.isValid}>
                <input
                    value={this.state.value}
                    type={this.state.type}
                    placeholder={this.state.placeholder}
                    onChange={e => this.whenUpdated(e as React.ChangeEvent<HTMLInputElement>)}
                />
                <div>{this.state.label ?? ''}</div>
            </div>
        );
    }

    whenUpdated(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.currentTarget;
        this.setState({ value });
        try {
            this.setState({ isValid: this.validate() ? 'v' : 'ic' });
        } catch (e) {
            this.setState({ isValid: 'iv' });
        }
        this.props.onChange(event);
    }

    /**
     * Validates the value of the input field. If the value is invalid, an
     * InputFieldValidationError is thrown. If the value is valid, then this method will return
     * true. If the value is invalid but could be valid if the user appends more characters, then
     * false is returned.
     *
     * @returns True if the valud is valid, false if it could potentially be
     * valid. If neither applies, the value is invalid and throws an error instead.
     */
    abstract validate(): boolean | ThrowsInputFieldValidationError;
}
