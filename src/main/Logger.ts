import * as winston from 'winston';

const RTCLogFormat = winston.format.printf(
    ({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`,
);

const transports = [];

if (process.env.NODE_ENV === 'test') {
    transports.push(
        new winston.transports.File({
            filename: 'server.test.log',
            format: winston.format.combine(
                winston.format.label({ label: 'RTC-Server' }),
                winston.format.timestamp(),
                winston.format.prettyPrint(),
                winston.format.colorize(),
                RTCLogFormat,
            ),
        }),
    );
} else {
    transports.push(
        new winston.transports.File({
            filename: 'server.log',
            format: winston.format.combine(
                winston.format.label({ label: 'RTC-Server' }),
                winston.format.timestamp(),
                winston.format.prettyPrint(),
                winston.format.colorize(),
                RTCLogFormat,
            ),
        }),
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
