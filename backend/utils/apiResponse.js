/**
 * Formats and sends a JSON response.
 * Returns the raw payload directly for 100% backward compatibility with the frontend.
 */
export const sendResponse = (req, res, statusCode, payload) => {
  return res.status(statusCode).json(payload);
};

/**
 * Formats and sends a JSON error response with the 'msg' field.
 */
export const sendError = (req, res, statusCode, message, errorDetails = {}) => {
  return res.status(statusCode).json({
    msg: message,
    ...errorDetails
  });
};
