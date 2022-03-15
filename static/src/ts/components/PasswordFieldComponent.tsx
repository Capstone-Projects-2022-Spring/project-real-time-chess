import InputFieldValidationError from '../errors/InputFieldValidationError';
import InputField from './InputField';

class PasswordFieldComponent extends InputField {
    private static readonly allowedChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()<>?;:'[]{}-=_+|";

    componentDidMount() {
        this.setState({ type: 'password' });
    }

    override validate() {
        if (this.state.value.length < 8) return false;
        if (this.state.value.length > 60) {
            throw new InputFieldValidationError(
                `The provided password length is too long (${this.state.value.length})`,
            );
        }

        let uppercase = 0;
        let lowercase = 0;
        let symbols = 0;

        const aIndex = PasswordFieldComponent.allowedChars.indexOf('a');
        const AIndex = PasswordFieldComponent.allowedChars.indexOf('A');
        const zIndex = PasswordFieldComponent.allowedChars.indexOf('z');
        const ZIndex = PasswordFieldComponent.allowedChars.indexOf('Z');

        this.state.value.split('').forEach(c => {
            const cIndex = PasswordFieldComponent.allowedChars.indexOf(c);
            if (cIndex < 0) {
                throw new InputFieldValidationError(
                    `Password cannot contain invalid character (${c}).`,
                );
            } else if (cIndex >= aIndex && cIndex <= zIndex) {
                lowercase++;
            } else if (cIndex >= AIndex && cIndex <= ZIndex) {
                uppercase++;
            } else {
                symbols++;
            }
        });

        if (lowercase < 1) return false;
        if (uppercase < 1) return false;
        if (symbols < 1) return false;
        return true;
    }
}

export default PasswordFieldComponent;
