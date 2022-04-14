import ChessGame from 'src/main/ChessGame';
import { expect } from 'chai';
import GameManager from 'src/main/GameManager';

let game: ChessGame;

beforeEach(() => {
    game = new ChessGame(GameManager.generateGameKey(), 5);
});

describe('ChessGame', () => {
    describe('#constructor()', () => {
        it('should Generate New Game', () => {
            expect(game.fen).to.equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
        });

        it('should Generate a 5-emoji game key', () => {
            expect(game.gameKey).to.have.lengthOf(5);
        });

        it('should generate an empty messages list', () => {
            expect(game.getMessages()).to.have.lengthOf(0);
        });
    });

    describe('#addMessage()', () => {
        it('should add a message to the messages list', () => {
            game.addMessage({
                message: 'Bob joined the game',
            });

            expect(game.getMessages()).to.have.lengthOf(1);
            expect(game.getMessages()[0]!.message).to.equal('Bob joined the game');
        });
    });

    describe('#move()', () => {
        it('should accept a valid move', () => {
            const move = game.move('e2', 'e4');
            expect(move).to.not.be.null;
        });

        it('should reject an invalid move', () => {
            const move = game.move('e2', 'b3');
            expect(move).to.be.null;
        });
    });
});
