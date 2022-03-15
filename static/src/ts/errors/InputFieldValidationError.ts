class InputFieldValidationError extends Error {
    constructor(message = 'Validation error') {
        super(message);
    }
}

export default InputFieldValidationError;
