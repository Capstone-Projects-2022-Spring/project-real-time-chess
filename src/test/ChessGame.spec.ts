import ChessGame from 'src/main/gameplay/ChessGame';
import { expect } from 'chai';
import GameManager from 'src/main/gameplay/GameManager';
import { TU1 } from './resources/SampleUsers';

let game: ChessGame;

beforeEach(() => {
    game = new ChessGame(TU1, GameManager.generateGameKey());
});

describe('ChessGame', () => {
    describe('#constructor()', () => {
        it('Should Generate New Game', () => {
            expect(game.fen).to.equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
        });

        it('Should Generate a 5-emoji game key', () => {
            expect(game.gameKey).to.have.lengthOf(5);
        });
    });

    describe('#forceTurnChange()', () => {
        it('Should force the turn to change from white to black and back to white', () => {
            game.forceTurnChange('b');
            expect(game.turn).to.equal('b');
            game.forceTurnChange('w');
            expect(game.turn).to.equal('w');
        });
    });

    describe('#blackName', () => {
        it("Should return the user's first name", () => {
            game.black = TU1;
            expect(game.blackName).to.equal(TU1.name.first);
        });

        it('Should return "Extremely Easy AI (1)"', () => {
            game.black = 'AI-1';
            expect(game.blackName).to.equal('Extremely Easy AI (1)');
        });

        it('Should return "Easy AI (#)", where # is the difficulty level', () => {
            game.black = 'AI-2';
            expect(game.blackName).to.equal('Easy AI (2)');
            game.black = 'AI-3';
            expect(game.blackName).to.equal('Easy AI (3)');
        });

        it('Should return "Normal AI (#)", where # is the difficulty level', () => {
            game.black = 'AI-4';
            expect(game.blackName).to.equal('Normal AI (4)');
            game.black = 'AI-5';
            expect(game.blackName).to.equal('Normal AI (5)');
        });

        it('Should return "Hard AI (#)", where # is the difficulty level', () => {
            game.black = 'AI-6';
            expect(game.blackName).to.equal('Hard AI (6)');
            game.black = 'AI-7';
            expect(game.blackName).to.equal('Hard AI (7)');
        });

        it('Should return "Extremely Hard AI (#)", where # is the difficulty level', () => {
            game.black = 'AI-8';
            expect(game.blackName).to.equal('Extremely Hard AI (8)');
            game.black = 'AI-9';
            expect(game.blackName).to.equal('Extremely Hard AI (9)');
            game.black = 'AI-10';
            expect(game.blackName).to.equal('Extremely Hard AI (10)');
        });
    });

    describe('#whiteName', () => {
        it("Should return the user's first name", () => {
            game.white = TU1;
            expect(game.whiteName).to.equal(TU1.name.first);
        });

        it('Should return "Extremely Easy AI (1)"', () => {
            game.white = 'AI-1';
            expect(game.whiteName).to.equal('Extremely Easy AI (1)');
        });

        it('Should return "Easy AI (#)", where # is the difficulty level', () => {
            game.white = 'AI-2';
            expect(game.whiteName).to.equal('Easy AI (2)');
            game.white = 'AI-3';
            expect(game.whiteName).to.equal('Easy AI (3)');
        });

        it('Should return "Normal AI (#)", where # is the difficulty level', () => {
            game.white = 'AI-4';
            expect(game.whiteName).to.equal('Normal AI (4)');
            game.white = 'AI-5';
            expect(game.whiteName).to.equal('Normal AI (5)');
        });

        it('Should return "Hard AI (#)", where # is the difficulty level', () => {
            game.white = 'AI-6';
            expect(game.whiteName).to.equal('Hard AI (6)');
            game.white = 'AI-7';
            expect(game.whiteName).to.equal('Hard AI (7)');
        });

        it('Should return "Extremely Hard AI (#)", where # is the difficulty level', () => {
            game.white = 'AI-8';
            expect(game.whiteName).to.equal('Extremely Hard AI (8)');
            game.white = 'AI-9';
            expect(game.whiteName).to.equal('Extremely Hard AI (9)');
            game.white = 'AI-10';
            expect(game.whiteName).to.equal('Extremely Hard AI (10)');
        });
    });

    describe('#move', () => {
        it('Should move the white pawn from e2 to e4 within 500ms', done => {
            game.move('e2', 'e4', 'w');
            setTimeout(() => {
                expect(game.fen).to.equal(
                    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
                );
                done();
            }, 500);
        });
    });
});
