import InputFieldValidationError from '../../errors/InputFieldValidationError';
import TextFieldComponent from './TextFieldComponent';

/**
 * An InputField component designed to only accept a name.
 */
class NameFieldComponent extends TextFieldComponent {
    /**
     * Validates the entered name. A name must not contain any spaces and must
     * have at least one character in length.
     */
    override validate() {
        if (this.state.value.indexOf(' ') >= 0) {
            throw new InputFieldValidationError('A name should not have any spaces in it');
        }

        return !(this.state.value.length === 0);
    }
}

export default NameFieldComponent;
