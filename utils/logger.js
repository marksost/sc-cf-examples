const { createLogger, format, transports } = require('winston');

const config = require('../config/config');
const CustomTransport = require('./custom-transport');

const {
  colorize, combine, timestamp, printf,
} = format;

const currentFormat = printf(options => {
  return `[${config.application.name}][${options.timestamp}][${options.level}]: ${options.message}`;
});

const logger = createLogger({
  level: config.log.level,
  format: combine(
    timestamp(), // customize the date format here
    colorize(), // customize the color of the log levels here
    currentFormat // eslint-disable-line comma-dangle, this format is the custom one from above
  ),
  transports: [
    new (transports.Console)(),
    new CustomTransport(), // NOTE: Logs to console, for Stackdiver logs
  ],
});

module.exports = logger;
