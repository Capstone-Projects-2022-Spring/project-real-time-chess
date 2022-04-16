import RTCServer from './RTCServer';

const server = new RTCServer();
server.listen();

const kill = { server };

export default server;
export { kill };
