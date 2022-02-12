import * as React from 'react';

export interface InputFieldProps {
    label?: string;
    placeholder?: string;
    value?: string;
    isValid?: boolean;
    type?: string;
}

export interface InputFieldState {
    label: string;
    placeholder?: string;
    value: string;
    isValid: string;
    type: string;
}

export class InputFieldValidationError extends Error {
    constructor(message = 'Validation error') {
        super(message);
    }
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
                    onInput={e => this.whenUpdated(e as React.ChangeEvent<HTMLInputElement>)}
                />
                <div>{this.state.label ?? ''}</div>
            </div>
        );
    }

    whenUpdated(event: React.ChangeEvent<HTMLInputElement>) {
        let isValid: boolean;
        let value = event.currentTarget.value;
        this.setState({ value });
        try {
            isValid = this.validate(value);
            this.setState({ isValid: isValid ? 'v' : 'ic' });
        } catch (e) {
            console.error(e);
            this.setState({ isValid: 'iv' });
        }
    }

    /**
     * Validates the value of the input field. If the value is invalid, an
     * InputFieldValidationError is thrown. If the value is valid, then this method will return
     * true. If the value is invalid but could be valid if the user appends more characters, then
     * false is returned.
     *
     * @abstract
     * @param {string} value The value in the input field
     * @returns {boolean | never} True if the valud is valid, false if it could potentially be valid.
     * If neither applies, the value is invalid and throws an error instead.
     * @throws {InputFieldValidationError} If the value is invalid.
     *
     * @memberOf InputField
     */
    abstract validate(value: string): boolean | never;
}

export class TextFieldComponent extends InputField {
    validate(_: string): boolean {
        return true;
    }
}

export class NameFieldComponent extends TextFieldComponent {
    override validate(value: string) {
        if (value.indexOf(' ') >= 0)
            throw new InputFieldValidationError('A name should not have any spaces in it');

        return value.length == 0 ? false : true;
    }
}

export class EmailFieldComponent extends TextFieldComponent {
    override validate(value: string) {
        if (value.indexOf(' ') >= 0)
            throw new InputFieldValidationError('An email should not have any spaces in it');
        if (value.length == 0) return false;
        if (value.indexOf('@') < 0) return false;
        return true;
    }
}

export class PasswordFieldComponent extends InputField {
    private static readonly allowedChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()<>?;:'[]{}-=_+|";

    constructor(props: InputFieldProps) {
        super(props);
    }

    componentDidMount() {
        this.setState({ type: 'password' });
    }

    override validate(value: string) {
        if (value.length < 8) return false;
        if (value.length > 60)
            throw new InputFieldValidationError(
                `The provided password length is too long (${value.length})`
            );
        let uppercase = 0;
        let lowercase = 0;
        let symbols = 0;

        const aIndex = PasswordFieldComponent.allowedChars.indexOf('a');
        const AIndex = PasswordFieldComponent.allowedChars.indexOf('A');
        const zIndex = PasswordFieldComponent.allowedChars.indexOf('z');
        const ZIndex = PasswordFieldComponent.allowedChars.indexOf('Z');

        for (const c of value) {
            const cIndex = PasswordFieldComponent.allowedChars.indexOf(c);
            if (cIndex < 0) {
                throw new InputFieldValidationError(
                    `Password cannot contain invalid character (${c}).`
                );
            } else if (cIndex >= aIndex && cIndex <= zIndex) {
                lowercase++;
            } else if (cIndex >= AIndex && cIndex <= ZIndex) {
                uppercase++;
            } else {
                symbols++;
            }
        }

        if (lowercase < 1) return false;
        if (uppercase < 1) return false;
        if (symbols < 1) return false;
        return true;
    }
}
