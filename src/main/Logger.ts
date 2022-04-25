import * as winston from 'winston';

const RTCLogFormat = winston.format.printf(
    ({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`,
);

const transports: winston.transport[] = [
    new winston.transports.File({
        filename: process.env.NODE_ENV === 'test' ? 'server.test.log' : 'server.log',
        format: winston.format.combine(
            winston.format.label({ label: 'RTC-Server' }),
            winston.format.timestamp(),
            winston.format.prettyPrint(),
            winston.format.colorize(),
            RTCLogFormat,
        ),
    }),
];

if (process.env.NODE_ENV !== 'test') {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.label({ label: 'RTC-Server' }),
                winston.format.timestamp(),
                RTCLogFormat,
            ),
        }),
    );
}

const Logger = winston.createLogger({
    level: 'silly',
    transports,
});

export default Logger;
