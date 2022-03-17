import { BaseAPIResponse } from './APIResponse';

class GameStateAPIResponse extends BaseAPIResponse implements IGameStateAPIResponse {
    public fen: string;

    public gameKey: string[];

    public messages: IGameMessage[];

    public players: { black?: ISanitizedUser; white?: ISanitizedUser };

    constructor(
        fen: string,
        gameKey: string[],
        messages: IGameMessage[],
        players: { black?: ISanitizedUser; white?: ISanitizedUser },
    ) {
        super(true);
        this.fen = fen;
        this.gameKey = gameKey;
        this.messages = messages;
        this.players = {
            black: players.black,
            white: players.white,
        };
    }
}

export default GameStateAPIResponse;
