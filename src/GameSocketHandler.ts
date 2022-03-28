import { Square } from 'chess.js';
import { Socket } from 'socket.io';
import { ErrorAPIResponse } from './main/APIResponse';
import ChessGame from './main/ChessGame';
import GameStateAPIResponse from './main/GameStateAPIResponse';
import Logger from './main/Logger';

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
        socket.emit(
            'game state',
            new GameStateAPIResponse(game.fen, game.gameKey, game.getMessages(), {
                black: game.black,
                white: game.white,
            }),
        );
        Logger.info(
            `Game State Request Successful\nUID: ${uid}\nFEN: ${game.fen}\n${
                game.getMessages().length
            } messages`,
        );
    }

    /**
     * The method to invoke when the client requests to move a piece.
     *
     * @param socket - The requesting socket.
     * @param game - The game to make the move on.
     * @param uid - The user requesting to make the move.
     * @param source - The source square of the move.
     * @param target - The target square of the move.
     */
    static onMovePieceRequest(
        socket: Socket,
        game: ChessGame,
        uid: string,
        source: Square,
        target: Square,
    ) {
        const move = game.move(source, target);
        if (move) {
            Logger.info(
                `User successfully made a move\nUID: ${uid}\nMove: ${JSON.stringify(move)}\nFEN: ${
                    game.fen
                }`,
            );

            game.addMessage({
                message: `${game.turn === 'b' ? 'White' : 'Black'} moved from ${move.from} to ${
                    move.to
                }`,
            });

            game.blackSocket!.emit('move piece', {
                success: true,
                gameKey: game.gameKey,
                fen: game.fen,
                messages: game.getMessages(),
                players: {
                    black: game.black,
                    white: game.white,
                },
                move,
            });

            game.whiteSocket!.emit('move piece', {
                success: true,
                gameKey: game.gameKey,
                fen: game.fen,
                messages: game.getMessages(),
                players: {
                    black: game.black,
                    white: game.white,
                },
                move,
            });
        } else {
            socket.broadcast.emit('move piece', new ErrorAPIResponse('Invalid move'));
            Logger.info(
                `User submitted an invalid move\nUID: ${uid}\nFrom: ${source}\nTo: ${target}\nFEN: ${game.fen}`,
            );
        }
    }
}

export default GameSocketHandler;
