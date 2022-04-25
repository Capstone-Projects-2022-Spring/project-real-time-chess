import Toastify from 'toastify-js';

type ToastGravity = 'top' | 'bottom';

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
     * @param onClick - Behavior to execute when the toast notification is clicked.
     */
    constructor(text: string, duration: number, gravity?: ToastGravity, onClick?: () => void) {
        this.toastifyOptions = {
            text,
            duration,
            gravity: gravity ?? 'top',
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

    /**
     * Creates and displays a toast notification.
     *
     * @param text - The text to display in the toast notification.
     * @param duration - The length of time (in milliseconds) to display the toast notification.
     * @param gravity - Whether the toast should be displayed starting from the top or the bottom.
     * @param onClick - Behavior to execute when the toast notification is clicked.
     * @returns The toast notification object that was used to notify the user.
     */
    static notify(
        text: string,
        duration: number,
        gravity?: ToastGravity,
        onClick?: () => void,
    ): ToastNotification {
        const obj = new ToastNotification(text, duration, gravity, onClick);
        obj.fire();
        return obj;
    }
}

export default ToastNotification;
