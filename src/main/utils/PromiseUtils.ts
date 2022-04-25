/**
 * A simple utility class to handle promise stuff.
 */
class PromiseUtils {
    /**
     * Handles a promise with default behavior. This method
     * will resolve a parent promise once the child promise
     * (the first parameter) has resolved. If the child promise
     * is rejected, the parent promise will be rejected with the
     * specified rejection callback.
     *
     * @param promise - The child promise.
     * @param resolve - The resolve callback.
     * @param reject - The reject callback.
     */
    static handleDefault<T>(
        promise: Promise<T>,
        resolve: (value?: T | PromiseLike<T>) => void,
        reject: (reason?: unknown) => void,
    ): void {
        promise.then(resolve).catch(reject);
    }
}

export default PromiseUtils;
