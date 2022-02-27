import InputField from './InputField';

export default class TextFieldComponent extends InputField {
    validate(): boolean {
        return true;
    }
}
