import * as React from 'react';

type ThrowsInputFieldValidationError = never;

interface InputFieldProps {
    label?: string;
    placeholder?: string;
    value?: string;
    isValid?: boolean;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputFieldState {
    label: string;
    placeholder?: string;
    value: string;
    isValid: string;
    type: string;
}

/**
 * The base component for all input fields. This component is designed to be
 * overriden with a custom validator which validates input as it is entered
 * in realtime.
 */
abstract class InputField extends React.Component<InputFieldProps, InputFieldState> {
    /**
     * Creates an instance of InputField.
     *
     * @param props - The properties for the input field.
     * `label` can be provided to provide a small label underneath the input field.
     * `placeholder` is an optional property which can be used to have placeholder text within the
     * input field.
     * `value` is an optional field which prefills the input field with a value.
     * `isValid` is optional, but should be used whenever a default value is provided.
     * `type` is an optional field passed to the input element.
     * `onChange` is the function which is called when the input field is updated.
     */
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

    /**
     * @returns The input field base component.
     */
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

    /**
     * Runs when the data in the input field is updated. This method checks if the value
     * is valid for the component. After validation checks are complete, then the onChange
     * property passed to this component is called.
     *
     * @param event - The React Input element change event.
     */
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

export { ThrowsInputFieldValidationError, InputFieldProps, InputFieldState };
export default InputField;
