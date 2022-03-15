import InputFieldValidationError from '../errors/InputFieldValidationError';
import TextFieldComponent from './TextFieldComponent';

class NameFieldComponent extends TextFieldComponent {
    override validate() {
        if (this.state.value.indexOf(' ') >= 0) {
            throw new InputFieldValidationError('A name should not have any spaces in it');
        }

        return !(this.state.value.length === 0);
    }
}

export default NameFieldComponent;
