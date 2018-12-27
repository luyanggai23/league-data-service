const { createLogger, format, transports } = require('winston');
const { timestamp, label, printf, combine } = format;

const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  });

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs.log' })
    ]
  });

  const writeLog = function(logLevel, message) {
      return logger.log({
          level: logLevel,
          message: message
      });
  };

  module.exports.logger = logger;
  module.exports.writeLog = writeLog;