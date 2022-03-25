import InputFieldValidationError from '../errors/InputFieldValidationError';
import TextFieldComponent from './TextFieldComponent';

/**
 * The InputField component which validates for only email addresses as input.
 */
class EmailFieldComponent extends TextFieldComponent {
    /**
     * Validates an email for correctness.
     *
     * Should not have any spaces, length of at least 1 character, and should contain
     * an \@ symbol.
     */
    override validate() {
        if (this.state.value.indexOf(' ') >= 0) {
            throw new InputFieldValidationError('An email should not have any spaces in it');
        }

        if (this.state.value.length === 0) return false;
        if (this.state.value.indexOf('@') < 0) return false;

        return true;
    }
}

export default EmailFieldComponent;
