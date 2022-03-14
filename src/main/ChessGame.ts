import ChessBoard from './ChessBoard';
import { IUser } from './dao/UserDAO';
import SupportedEmojis from './SupportedEmojis';

export default class ChessGame {
    gameKey: string[];
    private game: ChessBoard;
    private _black?: IUser;
    private _white?: IUser;
    private turn: 'b' | 'w';
    private messages: IGameMessage[];

    constructor() {
        this.game = new ChessBoard();
        this.turn = 'w';
        this.gameKey = ChessGame.generateGameKey();
        this.messages = [];
    }

    public addMessage(message: IGameMessage) {
        this.messages.push(message);
    }

    public getMessages(): IGameMessage[] {
        return this.messages;
    }

    public set black(user: IUser | undefined) {
        this._black = user;
    }

    public set white(user: IUser | undefined) {
        this._white = user;
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

    static generateGameKey(): string[] {
        const emojis: string[] = [];
        for (let i = 0; i < 5; i++)
            emojis.push(SupportedEmojis[Math.floor(Math.random() * SupportedEmojis.length)]!.name);
        return emojis;
    }
}
