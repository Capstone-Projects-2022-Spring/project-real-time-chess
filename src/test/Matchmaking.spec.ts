import { expect } from 'chai';
import { io as Client, Socket as ClientSocket } from 'socket.io-client';
import { Socket as ServerSocket } from 'socket.io';
import MatchmakingManager from 'src/main/gameplay/MatchmakingManager';
import { TU1 } from './resources/SampleUsers';
import server from 'src/main';

const matchmakingManager = MatchmakingManager.instance();
let clientSocket: ClientSocket, serverSocket: ServerSocket;

describe('Matchmaking', () => {
    describe('#enqueue', () => {
        before(() => {
            const serverIO = server.getIO();
            serverIO.on('connection', (socket: ServerSocket) => (serverSocket = socket));
            clientSocket = Client();
            clientSocket.connect();
        });
        it('Should put the user on the matchmaking queue', () => {
            const queueOrder = matchmakingManager.enqueue(String(TU1._id), serverSocket);
            queueOrder
                .then(num => {
                    expect(num).to.equal(1);
                })
                .catch(() => null);
        });
    });
});
