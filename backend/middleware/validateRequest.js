import { sendError } from '../utils/apiResponse.js';

/**
 * Higher-order middleware to validate that specified fields are present in the request body.
 * @param {string[]} requiredFields
 */
export const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const missing = [];
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missing.push(field);
      }
    }
    if (missing.length > 0) {
      return sendError(req, res, 400, `Please provide all required fields: ${missing.join(', ')}`);
    }
    next();
  };
};
