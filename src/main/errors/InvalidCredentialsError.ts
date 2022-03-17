class InvalidCredentialsError extends Error {
    constructor(message?: string) {
        super(message ?? 'Invalid Credentials: Try logging in again.');
        this.name = 'InvalidCredentialsError';
    }
}

export default InvalidCredentialsError;
