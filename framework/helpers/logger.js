const { format, createLogger, transports } = require('winston');

const {
  combine, timestamp, colorize, errors, json, prettyPrint,
} = format;

const options = {
  debugFile: {
    filename: 'logs/debug.log',
    level: 'debug',
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      json(),
    ),
    handleExceptions: true,
  },
  errorFile: {
    filename: 'logs/error.log',
    level: 'error',
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      json(),
    ),
    handleExceptions: true,
  },
  console: {
    level: 'info',
    format: combine(
      colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      prettyPrint(),
    ),
    handleExceptions: true,
  },
};

const logger = createLogger({
  transports: [
    new transports.File(options.debugFile),
    new transports.File(options.errorFile),
    new transports.Console(options.console),
  ],
  exitOnError: false,
});

module.exports = logger;
