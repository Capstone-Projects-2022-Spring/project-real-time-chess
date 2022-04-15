import { Square } from 'chess.js';
import { Socket } from 'socket.io';
import ChessGame from './ChessGame';
import GameStateAPIResponse from './GameStateAPIResponse';
import Logger from './Logger';

/**
 * Contains static handlers for the game sockets in RTCServer
 */
class GameSocketHandler {
    /**
     * The method to invoke when the client requests the game state
     *
     * @param socket - The socket which the request came from
     * @param game - The game belonging to the request
     * @param uid - The user who invoked the event
     */
    static onGameStateRequest(socket: Socket, game: ChessGame, uid: string) {
        socket.emit('game state', new GameStateAPIResponse(game));
        Logger.info(
            `Game State Request Successful\nUID: ${uid}\nFEN: ${game.fen}\n${
                game.getMessages().length
            } messages`,
        );
    }

    /**
     * The method to invoke when the client requests to move a piece.
     *
     * @param game - The game to make the move on.
     * @param uid - The user requesting to make the move.
     * @param source - The source square of the move.
     * @param target - The target square of the move.
     */
    static onMovePieceRequest(game: ChessGame, uid: string, source: Square, target: Square) {
        game.move(source, target, game.white?._id.equals(uid) ? 'w' : 'b');
    }

    /**
     * Requests an AI Move
     *
     * @param game - The game belonging to the request
     * @param uid - The user who invoked the event
     */
    static onAIMoveRequest(game: ChessGame, uid: string) {
        const color = game.white?._id.equals(uid) ? 'w' : 'b';
        game.requestAIMove(color).catch(err => {
            Logger.error(err);
        });
    }

    /**
     * Handles a request to enable autopilot for a player.
     *
     * @param game - The game to make the move on.
     * @param uid - The user enabling autopilot.
     */
    static enableAutopilot(game: ChessGame, uid: string) {
        const color = game.white?._id.equals(uid) ? 'w' : 'b';
        console.log('Enabling autopilot for: ' + color);
        game.enableAutopilot(color, 1000);
    }
}

export default GameSocketHandler;
