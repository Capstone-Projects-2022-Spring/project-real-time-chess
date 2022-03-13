import { IUser } from './dao/UserDAO';

export default class ChessGame {
    private game: ChessGame;
    private _black?: IUser;
    private _white?: IUser;
    private turn: 'b' | 'w';

    constructor() {
        this.game = new ChessGame();
        this.turn = 'w';
    }

    public set black(user: IUser | undefined) {
        this.black = user;
    }

    public set white(user: IUser | undefined) {
        this.white = user;
    }

    public get black(): IUser | undefined {
        return this._black;
    }

    public get white(): IUser | undefined {
        return this._white;
    }

    move(from: [number, number], to: [number, number]) {
        this.game.move(from, to);
        this.turn = this.turn === 'w' ? 'b' : 'w';
    }
}
