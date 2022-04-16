/**
 * A helper object for tracking the cooldown for a chess piece.
 */
export default class Cooldown implements ICooldown {
    /**
     * The amount of time left on the cooldown timer.
     */
    public time: number;

    /**
     * Creates an instance of Cooldown.
     * @param time - The amount of time (in seconds) that the cooldown will last.
     */
    constructor(time: number) {
        this.time = time;
        this.countdown();
    }

    /**
     * Begins the countdown timer for the cooldown. This method should only be
     * called once, otherwise multiple cooldown timers will be running and may
     * cause the cooldown timer to run faster.
     */
    private countdown(): void {
        const interval = setInterval(() => {
            this.time -= 1;
            if (this.time === 0) {
                clearInterval(interval);
            }
        }, 1000);
    }

    /**
     * Checks if the cooldown time is over.
     *
     * @returns True if the cooldown time is over, false otherwise.
     */
    public ready(): boolean {
        return this.time === 0;
    }
}
