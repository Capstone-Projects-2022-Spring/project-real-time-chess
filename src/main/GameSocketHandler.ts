import { Square } from 'chess.js';
import { Socket } from 'socket.io';
import { ErrorAPIResponse } from './APIResponse';
import ChessGame from './ChessGame';
import UserDAO from './dao/UserDAO';
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

            if (game.blackSocket) {
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
            }

            if (game.whiteSocket) {
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

                const { winner } = game;
                if (winner !== null) {
                    Logger.debug(`A winner was found: ${winner}`);
                    Logger.debug(
                        `White: ${JSON.stringify(game.white)}\nBlack: ${JSON.stringify(
                            game.black,
                        )}`,
                    );
                    const dao = new UserDAO();
                    if (winner === 'b') {
                        game.whiteSocket!.emit('blackWin', game.blackName);
                        game.blackSocket!.emit('blackWin', game.blackName);
                        dao.recordWin(game.black!._id!).catch(err => Logger.error(err));
                        dao.recordLoss(game.white!._id!).catch(err => Logger.error(err));
                    } else if (winner === 'w') {
                        game.whiteSocket!.emit('whiteWin', game.whiteName);
                        game.blackSocket!.emit('whiteWin', game.whiteName);
                        dao.recordWin(game.white!._id!).catch(err => Logger.error(err));
                        dao.recordLoss(game.black!._id!).catch(err => Logger.error(err));
                    }
                }
            } else {
                socket.emit('move piece', new ErrorAPIResponse('Invalid move'));
                Logger.info(
                    `User submitted an invalid move\nUID: ${uid}\nFrom: ${source}\nTo: ${target}\nFEN: ${game.fen}`,
                );
            }
        }
    }

    /**
     *
     * @param socket - The socket which the request came from
     * @param game - The game belonging to the request
     * @param uid - The user who invoked the event
     */
    static onAIMoveRequest(socket: Socket, game: ChessGame, uid: string) {
        game.doAIMove()
            .then(move => {
                if (move) {
                    socket.emit('move piece', {
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

                    Logger.info(
                        `AI Move Successful\nUID: ${uid}\nMove: ${JSON.stringify(move)}\nFEN: ${
                            game.fen
                        }`,
                    );

                    game.addMessage({ message: `AI moved from ${move.from} to ${move.to}` });

                    if (game.blackSocket) {
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
                    }

                    if (game.whiteSocket) {
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

                        const { winner } = game;
                        if (winner !== null) {
                            Logger.debug(`A winner was found: ${winner}`);
                            Logger.debug(
                                `White: ${JSON.stringify(game.white)}\nBlack: ${JSON.stringify(
                                    game.black,
                                )}`,
                            );
                            const dao = new UserDAO();
                            if (winner === 'b') {
                                game.whiteSocket!.emit('blackWin', game.blackName);
                                game.blackSocket!.emit('blackWin', game.blackName);
                                dao.recordWin(game.black!._id!).catch(err => Logger.error(err));
                                dao.recordLoss(game.white!._id!).catch(err => Logger.error(err));
                            } else if (winner === 'w') {
                                game.whiteSocket!.emit('whiteWin', game.whiteName);
                                game.blackSocket!.emit('whiteWin', game.whiteName);
                                dao.recordWin(game.white!._id!).catch(err => Logger.error(err));
                                dao.recordLoss(game.black!._id!).catch(err => Logger.error(err));
                            }
                        }
                    } else {
                        socket.emit('move piece', new ErrorAPIResponse('Invalid move'));
                        Logger.info(
                            `User submitted an invalid move\nUID: ${uid}\nFrom: ${move.from}\nTo: ${move.to}\nFEN: ${game.fen}`,
                        );
                    }
                }
            })
            .catch(err => {
                Logger.error(err);
            });
    }
}

export default GameSocketHandler;
