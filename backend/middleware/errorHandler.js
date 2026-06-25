import { sendError } from '../utils/apiResponse.js';

const errorHandler = (err, req, res, next) => {
  console.error(`[Error Handler] ${err.message}`, err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(req, res, statusCode, message, {
    code: err.code || 'INTERNAL_ERROR',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler;
