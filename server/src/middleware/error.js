import log from '../util/log.js';

/**
 * Error handler middleware.
 * @param {Object} err - The error object (must include `message` and optionally `statusCode`).
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
const handleError = (err, req, res, next) => {
  
  const statusCode = err.status && Number.isInteger(err.status) ? err.status : 500;
  const message = err.message || 'An unexpected error occurred';
  
  log.error(err);
  
  res.statusCode = statusCode;
  res.json({
    status: "error",
    statusCode,
    message,
  });
};

const throwError = (status, message) => {
  throw {status, message};
}

export {
  handleError,
  throwError
};