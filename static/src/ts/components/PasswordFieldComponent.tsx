import InputFieldValidationError from '../errors/InputFieldValidationError';
import InputField from './InputField';

/**
 * An InputField which is used to enter a password. The entered data is hidden.
 */
class PasswordFieldComponent extends InputField {
    /**
     * The characters allowed to be entered in the password input field.
     */
    private static readonly allowedChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()<>?;:'[]{}-=_+|";

    /**
     * Once the component is mounted, the input field is changed from regular text input
     * to a password input element.
     */
    componentDidMount() {
        this.setState({ type: 'password' });
    }

    /**
     * Validates entered password data. The parameters are as followed:
     *
     * Passwords must be between 8 to 60 characters, must contains at least one
     * uppercase letter, lowercase letter, and symbol.
     *
     * If the entered password is less than 8 characters, then the password is
     * potentially valid, but is strictly invalid if the password length exceeds
     * 60 characters.
     */
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
