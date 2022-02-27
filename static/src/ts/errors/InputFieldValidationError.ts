export default class InputFieldValidationError extends Error {
    constructor(message = 'Validation error') {
        super(message);
    }
}
