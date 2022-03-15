import InputFieldValidationError from '../errors/InputFieldValidationError';
import TextFieldComponent from './TextFieldComponent';

class EmailFieldComponent extends TextFieldComponent {
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
