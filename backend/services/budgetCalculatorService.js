/**
 * Service to calculate estimated costs for transit, hotel, food, and activities.
 * Can incorporate layover and connection fees for non-hub starting cities.
 */

// Hub departure nodes
const HUBS = ['delhi', 'mumbai', 'bengaluru', 'kolkata'];

// Connection/Layover fees from non-hub starting cities
const CONNECTION_FEES = {
  flight: 2500,
  train: 350,
  bus: 250,
  cab: 4500
};

/**
 * Calculates the total cost breakdown for a planned trip
 * @param {object} destination - The destination profile object
 * @param {string} originCity - E.g., 'nagpur', 'delhi', 'pune'
 * @param {string} budgetTier - 'budget', 'midRange', or 'luxury'
 * @param {number} duration - Number of days
 * @param {string} transportMode - 'flight', 'train', 'bus', or 'cab'
 */
export const calculateBudgetBreakdown = (destination, originCity, budgetTier, duration, transportMode) => {
  const origin = (originCity || 'delhi').toLowerCase().trim();
  const tier = budgetTier === 'midRange' ? 'midRange' : budgetTier === 'luxury' ? 'luxury' : 'budget';
  const transport = (transportMode || 'train').toLowerCase().trim();

  // 1. Determine starting hub for routes lookup
  let startingHub = 'delhi';
  let layoverFee = 0;

  if (HUBS.includes(origin)) {
    startingHub = origin;
  } else {
    // Non-hub origin: default to nearest hub (e.g. Mumbai for Pune, Delhi for Jaipur/Nagpur) and apply connection fee
    layoverFee = CONNECTION_FEES[transport] || 0;
    if (['pune', 'nagpur', 'goa', 'ahmedabad'].includes(origin)) {
      startingHub = 'mumbai';
    } else if (['patna', 'guwahati', 'bhubaneswar'].includes(origin)) {
      startingHub = 'kolkata';
    } else if (['chennai', 'hyderabad', 'kochi'].includes(origin)) {
      startingHub = 'bengaluru';
    }
  }

  // 2. Transport cost
  const routeData = destination.routes?.[startingHub]?.[transport];
  const baseTransportCost = routeData?.price || 1000;
  const transportCost = baseTransportCost + layoverFee;

  // 3. Hotel cost
  const hotelPrice = destination.hotels?.[tier]?.price || (tier === 'luxury' ? 8000 : tier === 'midRange' ? 2500 : 600);
  const lodgingCost = hotelPrice * Math.max(1, duration - 1); // hotel nights = days - 1

  // 4. Food cost
  // Find typical cost in dining array or default
  const diningTierType = tier === 'luxury' ? 'Fine Dining' : tier === 'midRange' ? 'Mid-Range' : 'Street Food';
  const diningItem = destination.dining?.find(d => d.type === diningTierType) || { cost: tier === 'luxury' ? 1200 : tier === 'midRange' ? 500 : 150 };
  const foodCostPerDay = diningItem.cost;
  const foodCost = foodCostPerDay * duration;

  // 5. Activities & Sightseeing cost
  let activitiesCost = 0;
  if (destination.attractions && destination.attractions.length > 0) {
    // Sum entry fees of first 3 attractions
    activitiesCost += destination.attractions.slice(0, 3).reduce((sum, item) => sum + (item.entryFee || 0), 0);
  }
  if (destination.adventures && destination.adventures.length > 0) {
    // Add cost of the cheapest adventure for budget, mid-range for midRange, or premium for luxury
    const sortedAdventures = [...destination.adventures].sort((a, b) => a.cost - b.cost);
    if (tier === 'luxury' && sortedAdventures.length > 0) {
      activitiesCost += sortedAdventures[sortedAdventures.length - 1].cost;
    } else if (tier === 'midRange' && sortedAdventures.length > 1) {
      activitiesCost += sortedAdventures[Math.floor(sortedAdventures.length / 2)].cost;
    } else if (sortedAdventures.length > 0) {
      activitiesCost += sortedAdventures[0].cost;
    }
  }

  const totalCost = transportCost + lodgingCost + foodCost + activitiesCost;

  return {
    transportCost,
    lodgingCost,
    foodCost,
    activitiesCost,
    layoverFee,
    startingHub,
    totalCost
  };
};
