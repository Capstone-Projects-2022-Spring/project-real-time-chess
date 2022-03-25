/**
 * The error to be thrown when an InputField component contains invalid data.
 */
class InputFieldValidationError extends Error {
    /**
     * Creates an instance of InputFieldValidationError.
     * @param message - The reason the error was thrown.
     */
    constructor(message = 'Validation error') {
        super(message);
    }
}

export default InputFieldValidationError;
