/**
 * The error to be thrown if a user attempts to login with an invalid username/password,
 * or if they provide an invalid authentication key via cookies.
 */
class InvalidCredentialsError extends Error {
    /**
     * Creates an instance of InvalidCredentialsError.
     * @param message - The invalid credentials provided to generate this error.
     */
    constructor(message?: string) {
        super(message ?? 'Invalid Credentials: Try logging in again.');
        this.name = 'InvalidCredentialsError';
    }
}

export default InvalidCredentialsError;
