const winston = require('winston');
const fs = require('fs');

const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = winston.createLogger({
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint()
  ),
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: `${logDir}/results.log`,
      'timestamp': tsFormat,
      level: 'info'
    })
  ]
});

module.exports = logger;