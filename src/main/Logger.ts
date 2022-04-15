import * as winston from 'winston';

const Logger = winston.createLogger({
    level: 'silly',
    transports: [new winston.transports.File({ filename: 'server.log' })],
});

export default Logger;
