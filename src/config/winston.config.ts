import { createLogger, transports, format } from 'winston';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

const winstonFormat = format.combine(
  format.colorize({ colors }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
  format.printf((info) => `[${info.timestamp}] ${info.level} : ${info.message}`),
);
const logger = createLogger({
  level: 'debug',
  format: winstonFormat,
  transports: [
    new transports.Console(),
  ],
  silent: process.env.NODE_ENV === 'test', // disabled on testing
});

export const winstonStream = {
  write: (text: string) => {
    logger.http(text.split('\n')[0]);
  },
};
export default logger;
