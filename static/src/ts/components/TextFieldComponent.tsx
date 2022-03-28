import InputField from './InputField';

/**
 * An InputField which allows for any value to be entered.
 */
class TextFieldComponent extends InputField {
    /**
     * A validator which treats all input as valid input.
     *
     * @returns Always returns true.
     */
    validate(): boolean {
        return true;
    }
}

export default TextFieldComponent;
