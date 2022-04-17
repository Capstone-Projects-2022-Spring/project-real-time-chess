import axios from 'axios';
import { expect } from 'chai';
import server from 'src/main';

describe('index', () => {
    describe('Upon server launch', () => {
        it('Should start the server and listen on port 3000', async () => {
            const response = await axios.get('http://localhost:3000');
            expect(response.status === 200);
        });

        it('Should start the server on the specified env port', async () => {
            server.kill();
            process.env.PORT = '1234';
            server.listen();
            const response = await axios.get('http://localhost:1234');
            expect(response.status === 200);
        });
    });
});
