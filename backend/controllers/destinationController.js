import * as destinationService from '../services/destinationService.js';
import { sendResponse } from '../utils/apiResponse.js';

/**
 * Get all destinations with optional search autocomplete
 */
export const getAllDestinations = async (req, res, next) => {
  const { search, state, category } = req.query;

  try {
    const list = await destinationService.getDestinations(search, state, category);
    return sendResponse(req, res, 200, list, 'Destinations loaded successfully.');
  } catch (err) {
    next(err);
  }
};

/**
 * Get single destination profile (including routes, hotels, dining, attractions)
 */
export const getDestinationById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dest = await destinationService.getDestinationById(id);
    return sendResponse(req, res, 200, dest, 'Destination details loaded.');
  } catch (err) {
    next(err);
  }
};
