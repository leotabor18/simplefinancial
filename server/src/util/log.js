import moment from 'moment';
import { SEVERITY } from './constants.js';

const LOG_CONFIG = {
  ERROR: true,
  DEBUG: true,
  INFO: true,
};

/**
 * Formats the log message with a timestamp and severity.
 * @param {string|Error} message - The message or error to log.
 * @param {string} severity - The severity level of the log.
 * @returns {string} - Formatted log message.
 */
const formatLogMessage = (message, severity) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  const baseMessage = `[${timestamp}] ${severity}: `;

  return message instanceof Error
    ? baseMessage + message.stack
    : baseMessage + message;
};

/**
 * Writes a log to the console based on severity.
 * @param {string|Error} message - The message to log.
 * @param {string} severity - The severity level of the log.
 */
const writeLog = (message, severity) => {
  if (!LOG_CONFIG[severity]) return; // Skip logging if disabled

  const outputMessage = formatLogMessage(message, severity);

  switch (severity) {
    case SEVERITY.ERROR:
      console.error(outputMessage);
      break;
    case SEVERITY.DEBUG:
      console.debug(outputMessage);
      break;
    case SEVERITY.INFO:
      console.info(outputMessage);
      break;
    default:
      console.log(outputMessage);
      break;
  }
};

/**
 * Logs an error message.
 * @param {string|Error} message - The error message or error object.
 */
const error = (message) => writeLog(message, SEVERITY.ERROR);

/**
 * Logs a debug message.
 * @param {string} message - The debug message.
 */
const debug = (message) => writeLog(message, SEVERITY.DEBUG);

/**
 * Logs an info message.
 * @param {string} message - The info message.
 */
const info = (message) => writeLog(message, SEVERITY.INFO);

export default { error, debug, info };
