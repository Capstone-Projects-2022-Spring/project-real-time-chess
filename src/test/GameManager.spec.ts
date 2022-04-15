import { expect } from 'chai';
import GameManager from 'src/main/GameManager';
import { TU1, TU2, TU3 } from './resources/SampleUsers';

beforeEach(() => {
    GameManager.clearGames();
});

describe('ChessGame', () => {
    describe('#createGame()', () => {
        it('Should add a new game with the user to the game list', () => {
            GameManager.createGame(TU1);
            const game = GameManager.findGameByUser(TU1._id);
            expect(game).to.not.be.null;
        });

        it("End the user's previous game and create a new one", () => {
            GameManager.createGame(TU1);
            const game1 = GameManager.findGameByUser(TU1._id);
            GameManager.createGame(TU1);
            const game2 = GameManager.findGameByUser(TU1._id);
            expect(game1).to.not.be.null;
            expect(game2).to.not.be.null;
            expect(game1).to.not.equal(game2);
        });
    });

    describe('#joinGame()', () => {
        it('Allow a user to join a new game with a correct game key', () => {
            GameManager.createGame(TU1);
            const game = GameManager.findGameByUser(TU1._id);
            const gameKey = game!.gameKey;
            GameManager.joinGame(TU2, gameKey);
            expect(game).to.not.be.null;
            expect(gameKey).to.not.be.null;
            expect(GameManager.findGameByUser(TU2._id)).to.not.be.null;
            expect(game!.black).to.not.be.undefined;
            expect(game!.white).to.not.be.undefined;
        });

        it('Should not allow a user to join a game with a non-existing game key', () => {
            GameManager.createGame(TU1);
            const game = GameManager.findGameByUser(TU1._id);
            let gameKey = game!.gameKey;
            gameKey = ['incorrect', gameKey[1]!, gameKey[2]!, gameKey[3]!, gameKey[4]!];
            const joinedGame = GameManager.joinGame(TU2, gameKey);
            expect(game).to.not.be.null;
            expect(GameManager.findGameByUser(TU2._id)).to.be.null;
            expect(joinedGame).to.be.null;
        });

        it('Should end any previous game the user is in', () => {
            GameManager.createGame(TU1);
            const game1 = GameManager.findGameByUser(TU1._id);
            const gameKey1 = game1!.gameKey;
            GameManager.joinGame(TU2, gameKey1);
            const game2 = GameManager.createGame(TU3);
            const gameKey2 = game2!.gameKey;
            GameManager.joinGame(TU1, gameKey2);
            expect(GameManager.findGameByUser(TU1._id)).to.not.be.null;
            expect(GameManager.findGameByUser(TU2._id)).to.be.null;
            expect(GameManager.findGameByUser(TU3._id)).to.not.be.null;
        });
    });
});
