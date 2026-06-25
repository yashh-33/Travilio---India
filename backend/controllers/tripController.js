import pool from '../config/supabase.js';
import { sendResponse, sendError } from '../utils/apiResponse.js';

// Helper to load and map saved trips for a user
const loadUserSavedTrips = async (userId) => {
  const query = 'SELECT * FROM saved_trips WHERE user_id = $1 ORDER BY created_at DESC';
  const { rows } = await pool.query(query, [userId]);
  
  return rows.map(t => ({
    _id: t.id,
    destinationId: t.destination_id,
    destinationName: t.destination_name,
    duration: t.duration,
    budgetTier: t.budget_tier,
    transportMode: t.transport_mode,
    totalCost: t.total_cost,
    customActivities: t.custom_activities || [],
    favorites: t.favorites || [],
    createdAt: t.created_at
  }));
};

/**
 * Save a planned trip itinerary
 */
export const saveTrip = async (req, res, next) => {
  const {
    destinationId,
    destinationName,
    duration,
    budgetTier,
    transportMode,
    totalCost,
    customActivities,
    favorites
  } = req.body;

  const userId = req.user.id;
  const tripId = Date.now().toString(); // Consistent with the client-expected string ID

  try {
    // 1. Insert new itinerary row
    const insertQuery = `
      INSERT INTO saved_trips (
        id, 
        user_id, 
        destination_id, 
        destination_name, 
        duration, 
        budget_tier, 
        transport_mode, 
        total_cost, 
        custom_activities, 
        favorites
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    await pool.query(insertQuery, [
      tripId,
      userId,
      destinationId,
      destinationName,
      duration,
      budgetTier,
      transportMode,
      totalCost,
      JSON.stringify(customActivities || []),
      JSON.stringify(favorites || [])
    ]);

    // 2. Load updated list and return to client
    const updatedTrips = await loadUserSavedTrips(userId);
    return sendResponse(req, res, 201, {
      msg: 'Trip saved successfully.',
      savedTrips: updatedTrips
    }, 'Trip saved successfully.');

  } catch (err) {
    next(err);
  }
};

/**
 * Get all saved trips of the authenticated user
 */
export const getSavedTrips = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const list = await loadUserSavedTrips(userId);
    return sendResponse(req, res, 200, list, 'Saved trips loaded successfully.');
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a saved trip itinerary
 */
export const deleteTrip = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // 1. Delete matching row
    const deleteQuery = 'DELETE FROM saved_trips WHERE id = $1 AND user_id = $2 RETURNING id';
    const { rows } = await pool.query(deleteQuery, [id, userId]);

    if (rows.length === 0) {
      return sendError(req, res, 404, 'Trip not found or unauthorized.');
    }

    // 2. Load updated list and return to client
    const updatedTrips = await loadUserSavedTrips(userId);
    return sendResponse(req, res, 200, {
      msg: 'Trip removed successfully.',
      savedTrips: updatedTrips
    }, 'Trip deleted successfully.');

  } catch (err) {
    next(err);
  }
};
