import { getDestinationById } from './destinationService.js';
import { calculateBudgetBreakdown } from './budgetCalculatorService.js';
import { recommendHotel } from './hotelRecommendationService.js';

/**
 * Orchestrates creating a complete, structured travel itinerary.
 * @param {string} sourceCity - E.g. 'Nagpur' or 'Delhi'
 * @param {string} destinationId - E.g. 'goa' or 'kamptee'
 * @param {string} budgetTier - 'budget', 'midRange', or 'luxury'
 * @param {number} duration - Number of days for the trip (e.g., 3, 5, 7)
 * @param {string} transportMode - 'flight', 'train', 'bus', or 'cab'
 */
export const createTripPlan = async (sourceCity, destinationId, budgetTier, duration, transportMode) => {
  // 1. Resolve destination profile (seeded or dynamically generated)
  const destination = await getDestinationById(destinationId);
  
  // 2. Compute budget details and connection layovers
  const budgetBreakdown = calculateBudgetBreakdown(destination, sourceCity, budgetTier, duration, transportMode);
  
  // 3. Select hotel package
  const hotelRec = recommendHotel(destination, budgetTier);

  // 4. Transport details
  const startHub = budgetBreakdown.startingHub;
  const transport = (transportMode || 'train').toLowerCase().trim();
  const baseRoute = destination.routes?.[startHub]?.[transport] || { duration: '12h', details: 'Express connectivity' };
  
  const transportRecommendation = {
    mode: transportMode,
    price: budgetBreakdown.transportCost,
    duration: baseRoute.duration,
    details: budgetBreakdown.layoverFee > 0 
      ? `Connecting ${transport} via ${startHub.toUpperCase()} Hub. Includes local connection fee of ₹${budgetBreakdown.layoverFee}.`
      : baseRoute.details
  };

  // 5. Structure Day-by-day itinerary
  const dayWiseItinerary = [];
  const attractionsList = destination.attractions || [];
  const adventuresList = destination.adventures || [];
  const diningList = destination.dining || [];

  // Construct daily schedules based on duration
  for (let day = 1; day <= duration; day++) {
    const dailyActivities = [];
    
    if (day === 1) {
      // Day 1: Arrival & check-in + easy evening walk
      dailyActivities.push({
        time: 'Morning / Afternoon',
        activity: `Arrive at ${destination.name}. Check-in at ${hotelRec.name}.`,
        cost: 0
      });
      if (attractionsList.length > 0) {
        dailyActivities.push({
          time: '4:00 PM',
          activity: `Visit ${attractionsList[0].name}. ${attractionsList[0].description}`,
          cost: attractionsList[0].entryFee || 0
        });
      }
      // Dinner recommendation
      const dinnerPlace = diningList[0] || { name: 'Local street food joints', cost: 150 };
      dailyActivities.push({
        time: '7:30 PM',
        activity: `Dinner at ${dinnerPlace.name} (Specialty: ${dinnerPlace.specialty || 'Local Cuisine'}).`,
        cost: dinnerPlace.cost
      });

    } else if (day === duration) {
      // Last Day: Local market shopping + checkout & departure
      const lastAttraction = attractionsList.length > 1 ? attractionsList[attractionsList.length - 1] : { name: 'Local craft market', entryFee: 0, description: 'Great for souvenirs' };
      dailyActivities.push({
        time: '9:30 AM',
        activity: `Explore ${lastAttraction.name}. ${lastAttraction.description}`,
        cost: lastAttraction.entryFee || 0
      });
      dailyActivities.push({
        time: '12:00 PM',
        activity: `Check out from ${hotelRec.name}. Bid farewell to ${destination.name} and begin departure journey.`,
        cost: 0
      });

    } else {
      // Mid-trip days: Heavy sightseeing and adventures
      const attractionIndex = (day - 2) % attractionsList.length;
      const adventureIndex = (day - 2) % adventuresList.length;
      
      const attraction = attractionsList[attractionIndex + 1] || attractionsList[0];
      const adventure = adventuresList[adventureIndex] || { name: 'Local Sightseeing', cost: 200, type: 'Tour' };
      
      dailyActivities.push({
        time: '9:00 AM',
        activity: `Adventure Time: Join the ${adventure.name} (${adventure.type || 'Eco Tour'}).`,
        cost: adventure.cost || 0
      });
      
      if (attraction) {
        dailyActivities.push({
          time: '2:30 PM',
          activity: `Sightseeing: Explore ${attraction.name}. ${attraction.description}`,
          cost: attraction.entryFee || 0
        });
      }

      const dinnerPlace = diningList[day % diningList.length] || diningList[0];
      dailyActivities.push({
        time: '8:00 PM',
        activity: `Enjoy regional dining at ${dinnerPlace.name}.`,
        cost: dinnerPlace.cost || 0
      });
    }

    dayWiseItinerary.push({
      day,
      title: day === 1 ? 'Arrival & Setup' : day === duration ? 'Souvenirs & Departure' : `Explore ${destination.name} Day ${day}`,
      activities: dailyActivities
    });
  }

  return {
    destinationId: destination.id,
    destinationName: destination.name,
    tagline: destination.tagline,
    state: destination.state,
    category: destination.category,
    image: destination.image,
    climate: destination.climate,
    bestTime: destination.bestTime,
    transportRecommendation,
    hotelRecommendation: hotelRec,
    attractions: attractionsList,
    adventures: adventuresList,
    dayWiseItinerary,
    estimatedTotalCost: budgetBreakdown
  };
};
