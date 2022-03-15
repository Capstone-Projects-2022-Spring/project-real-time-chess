/**
 * The RealTimeChess Utility Class for Array manipulation.
 */
export default class ArrayUtils {
    /**
     * Strictly compares each elements in two arrays.
     * This uses the `===` operator to compare each element, so
     * the data type and value must be the same. If any element
     * in the arrays are non-string objects, and you are checking
     * **similarity** of the objects, use `ArrayUtils.deepCompare`.
     *
     * @param a - The first array.
     * @param b - The second array.
     * @returns True if both arrays are the same, false otherwise.
     */
    static strictCompare<T>(a: T[], b: T[]) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
}
