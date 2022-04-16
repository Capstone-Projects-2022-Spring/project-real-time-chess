import Toastify from 'toastify-js';

/**
 * A class for displaying toast notifications.
 */
class ToastNotification {
    private toastifyOptions: Toastify.Options;

    /**
     * Creates a new toast notification.
     *
     * @param text - The text to display in the toast notification.
     * @param duration - The length of time (in milliseconds) to display the toast notification.
     * @param gravity - Whether the toast should be displayed starting from the top or the bottom.
     * @param style - Additional styles to apply.
     * @param onClick - Behavior to execute when the toast notification is clicked.
     */
    constructor(
        text: string,
        duration: number,
        gravity?: 'top' | 'bottom',
        style?: { [rule: string]: string },
        onClick?: () => void,
    ) {
        this.toastifyOptions = {
            text,
            duration,
            gravity: gravity ?? 'top',
            style,
            onClick,
            position: 'right',
            close: true,
            stopOnFocus: true,
        };
    }

    /**
     * Fires the toast notification.
     */
    fire() {
        Toastify(this.toastifyOptions).showToast();
    }
}

export default ToastNotification;
