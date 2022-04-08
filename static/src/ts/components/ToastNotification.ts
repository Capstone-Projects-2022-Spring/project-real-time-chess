import Swal from 'sweetalert2';

/**
 * A class for displaying toast notifications.
 */
class ToastNotification {
    private title?: string;

    private text?: string;

    private icon?: 'success' | 'info' | 'warning' | 'error' | 'question';

    private timer?: number;

    /**
     * Creates an instance of ToastNotification.
     * @param title - The title to display on the toast notification.
     * @param text - The text to display on the toast notification. (This is
     * displayed underneath the title if it is provided.)
     * @param icon - The icon
     * to display on the toast notification. If no icon is provided, then no icon is
     * displayed.
     * @param timer - The amount of time to display the toast notification for.
     * The default value is 5000 milliseconds (5 seconds).
     */
    constructor(
        title?: string,
        text?: string,
        icon?: 'success' | 'info' | 'warning' | 'error' | 'question',
        timer?: number,
    ) {
        this.title = title;
        this.text = text;
        this.icon = icon;
        this.timer = timer;
    }

    /**
     * Fires the toast notification.
     */
    fire() {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: this.timer ?? 5000,
            timerProgressBar: true,
            title: this.title,
            text: this.text,
            icon: this.icon,
            didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        }).catch(err => document.write(`Error: ${err.message}`));
    }
}

export default ToastNotification;
