import { Chess, ChessInstance, Move, Square } from 'chess.js';
import { IUser } from './dao/UserDAO';
import SupportedEmojis from './SupportedEmojis';

export default class ChessGame {
    gameKey: string[];

    private game: ChessInstance;

    private _black?: IUser;

    private _white?: IUser;

    private messages: IGameMessage[];

    constructor() {
        this.game = new Chess();
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

    public get black(): IUser | undefined {
        return this._black;
    }

    public set white(user: IUser | undefined) {
        this._white = user;
    }

    public get white(): IUser | undefined {
        return this._white;
    }

    public get fen(): string {
        return this.game.fen();
    }

    move(source: Square, target: Square): Move | null {
        return this.game.move(`${source}-${target}`, { sloppy: true });
    }

    static generateGameKey(): string[] {
        const emojis: string[] = [];
        for (let i = 0; i < 5; i++) {
            emojis.push(SupportedEmojis[Math.floor(Math.random() * SupportedEmojis.length)]!.name);
        }
        return emojis;
    }
}
