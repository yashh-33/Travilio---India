import { calculateTravelDetails } from '../utils/travelEngine.js';

/**
 * Calculates the total cost breakdown for a planned trip
 * @param {object} destination - The destination profile object
 * @param {string} originCity - E.g., 'nagpur', 'delhi', 'pune'
 * @param {string} budgetTier - 'budget', 'midRange', or 'luxury'
 * @param {number} duration - Number of days
 * @param {string} transportMode - 'flight', 'train', 'bus', or 'cab'
 */
export const calculateBudgetBreakdown = (destination, originCity, budgetTier, duration, transportMode) => {
  const origin = (originCity || 'delhi').trim();
  const tier = budgetTier === 'midRange' ? 'midRange' : budgetTier === 'luxury' ? 'luxury' : 'budget';
  const transport = (transportMode || 'train').toLowerCase().trim();

  // 1. Calculate dynamic travel details directly from origin city to destination city
  let transportCost = 1000;
  try {
    const travelDetails = calculateTravelDetails(origin, '', destination.name, destination.state);
    const modeData = travelDetails[transport] || travelDetails['train'];
    transportCost = modeData.price || 1000;
  } catch (err) {
    transportCost = transport === 'flight' ? 5000 : transport === 'train' ? 900 : transport === 'bus' ? 1200 : 15000;
  }

  // 2. Hotel cost (lodging)
  const hotelPrice = tier === 'luxury' ? 12000 : tier === 'midRange' ? 3000 : 800;
  const lodgingCost = hotelPrice * Math.max(1, duration - 1); // hotel nights = days - 1

  // 3. Food cost
  const foodCostPerDay = tier === 'luxury' ? 2000 : tier === 'midRange' ? 700 : 250;
  const foodCost = foodCostPerDay * duration;

  // 4. Activities & Sightseeing cost
  let activitiesCost = 0;
  if (destination.attractions && destination.attractions.length > 0) {
    // Sum entry fees of first 3 attractions
    activitiesCost += destination.attractions.slice(0, 3).reduce((sum, item) => sum + (item.entryFee || 0), 0);
  }
  if (destination.adventures && destination.adventures.length > 0) {
    const sortedAdventures = [...destination.adventures].sort((a, b) => a.cost - b.cost);
    if (tier === 'luxury' && sortedAdventures.length > 0) {
      activitiesCost += sortedAdventures[sortedAdventures.length - 1].cost;
    } else if (tier === 'midRange' && sortedAdventures.length > 1) {
      activitiesCost += sortedAdventures[Math.floor(sortedAdventures.length / 2)].cost;
    } else if (sortedAdventures.length > 0) {
      activitiesCost += sortedAdventures[0].cost;
    }
  }

  // 5. Shopping cost
  const shoppingCostPerDay = tier === 'luxury' ? 2000 : tier === 'midRange' ? 400 : 100;
  const shoppingCost = shoppingCostPerDay * duration;

  // 6. Local Transport cost
  const localTransportCostPerDay = tier === 'luxury' ? 1500 : tier === 'midRange' ? 500 : 150;
  const localTransportCost = localTransportCostPerDay * duration;

  // 7. Miscellaneous cost
  const miscCostPerDay = tier === 'luxury' ? 1000 : tier === 'midRange' ? 300 : 100;
  const miscCost = miscCostPerDay * duration;

  const totalCost = transportCost + lodgingCost + foodCost + activitiesCost + shoppingCost + localTransportCost + miscCost;

  return {
    transportCost,
    lodgingCost,
    foodCost,
    activitiesCost,
    shoppingCost,
    localTransportCost,
    miscCost,
    totalCost
  };
};
