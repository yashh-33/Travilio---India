import { getDestinationById } from './destinationService.js';
import { calculateBudgetBreakdown } from './budgetCalculatorService.js';
import { recommendHotel } from './hotelRecommendationService.js';
import { calculateTravelDetails } from '../utils/travelEngine.js';

export const createTripPlan = async (sourceCity, destinationId, budgetTier, duration, transportMode) => {
  // 1. Resolve destination profile (seeded or dynamically generated)
  const destination = await getDestinationById(destinationId);
  
  // 2. Compute budget details
  const budgetBreakdown = calculateBudgetBreakdown(destination, sourceCity, budgetTier, duration, transportMode);
  
  // 3. Select hotel package
  const hotelRec = recommendHotel(destination, budgetTier);

  // 4. Transport details
  const transport = (transportMode || 'train').toLowerCase().trim();
  
  // Get dynamic travel details from Travel Engine
  let travelDetails;
  try {
    travelDetails = calculateTravelDetails(sourceCity, '', destination.name, destination.state);
  } catch (err) {
    travelDetails = {
      distance: 1000,
      train: { duration: '14h 20m', availability: 'Daily', confidenceScore: 'High', details: 'Accurate live pricing is currently unavailable. Showing estimated fares based on recent Indian travel trends.' },
      flight: { duration: '2h 15m', availability: 'Daily', confidenceScore: 'High', details: 'Accurate live pricing is currently unavailable. Showing estimated fares based on recent Indian travel trends.' },
      bus: { duration: '20h 00m', availability: 'Daily', confidenceScore: 'High', details: 'Accurate live pricing is currently unavailable. Showing estimated fares based on recent Indian travel trends.' },
      cab: { duration: '16h 00m', availability: 'Daily', confidenceScore: 'High', details: 'Accurate live pricing is currently unavailable. Showing estimated fares based on recent Indian travel trends.' },
      recommendation: { mode: 'train', reason: 'Comfortable rail transit recommended.' }
    };
  }
  
  const baseRoute = travelDetails[transport] || travelDetails['train'];
  
  const transportRecommendation = {
    mode: transportMode,
    price: budgetBreakdown.transportCost,
    duration: baseRoute.duration,
    distance: travelDetails.distance,
    availability: baseRoute.availability,
    confidenceScore: baseRoute.confidenceScore,
    details: baseRoute.details,
    pros: baseRoute.pros || [],
    cons: baseRoute.cons || [],
    recommendation: travelDetails.recommendation
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
      dailyActivities.push({
        time: 'Morning / Afternoon',
        activity: `Arrive at ${destination.name} via ${transport.toUpperCase()}. Check-in at ${hotelRec.name}.`,
        cost: 0
      });
      if (attractionsList.length > 0) {
        dailyActivities.push({
          time: '4:00 PM',
          activity: `Visit ${attractionsList[0].name}. ${attractionsList[0].description}`,
          cost: attractionsList[0].entryFee || 0
        });
      }
      const dinnerPlace = diningList[0] || { name: 'Local street food joints', cost: 150 };
      dailyActivities.push({
        time: '7:30 PM',
        activity: `Dinner at ${dinnerPlace.name} (Specialty: ${dinnerPlace.specialty || 'Local Cuisine'}).`,
        cost: dinnerPlace.cost
      });

    } else if (day === duration) {
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
