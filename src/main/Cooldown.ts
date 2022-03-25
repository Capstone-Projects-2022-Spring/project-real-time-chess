export default class Cooldown implements CooldownInterface {
    public time: number;

    constructor(time: number) {
        this.time = time;
        this.countdown();
    }

    private countdown(): void {
        const interval = setInterval(() => {
            this.time -= 1;
            if (this.time === 0) {
                clearInterval(interval);
            }
        }, 1000);
    }

    public ready(): boolean {
        return this.time === 0;
    }
}
