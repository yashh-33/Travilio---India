// Hub departure nodes coordinates
const HUB_COORDINATES = {
  "delhi": [28.6139, 77.2090],
  "mumbai": [19.0760, 72.8777],
  "bengaluru": [12.9716, 77.5946],
  "kolkata": [22.5726, 88.3639]
};

// State capitals or centroids coordinates as fallback
const STATE_COORDINATES = {
  "andhra pradesh": [16.5062, 80.6480],
  "arunachal pradesh": [27.0844, 93.6053],
  "assam": [26.1445, 91.7362],
  "bihar": [25.5941, 85.1376],
  "chhattisgarh": [21.2514, 81.6296],
  "goa": [15.2993, 74.1240],
  "gujarat": [23.0225, 72.5714],
  "haryana": [30.7333, 76.7794],
  "himachal pradesh": [31.1048, 77.1734],
  "jammu & kashmir": [34.0837, 74.7973],
  "jammu and kashmir": [34.0837, 74.7973],
  "jharkhand": [23.3441, 85.3096],
  "karnataka": [12.9716, 77.5946],
  "kerala": [8.5241, 76.9366],
  "madhya pradesh": [23.2599, 77.4126],
  "maharashtra": [19.0760, 72.8777],
  "manipur": [24.8170, 93.9368],
  "meghalaya": [25.5788, 91.8931],
  "mizoram": [23.7271, 92.7176],
  "nagaland": [25.6751, 94.1086],
  "odisha": [20.2961, 85.8245],
  "punjab": [30.7333, 76.7794],
  "rajasthan": [26.9124, 75.7873],
  "sikkim": [27.3314, 88.6138],
  "tamil nadu": [13.0827, 80.2707],
  "telangana": [17.3850, 78.4867],
  "tripura": [23.8315, 91.2868],
  "uttarakhand": [30.3165, 78.0322],
  "uttar pradesh": [26.8467, 80.9462],
  "west bengal": [22.5726, 88.3639],
  "andaman & nicobar islands": [11.7401, 92.6586],
  "andaman and nicobar islands": [11.7401, 92.6586],
  "chandigarh": [30.7333, 76.7794],
  "dadra & nagar haveli and daman & diu": [20.3974, 72.8328],
  "dadra and nagar haveli and daman and diu": [20.3974, 72.8328],
  "delhi": [28.6139, 77.2090],
  "ladakh": [34.1526, 77.5771],
  "lakshadweep": [10.5667, 72.6417],
  "puducherry": [11.9416, 79.8083],
  "pondicherry": [11.9416, 79.8083]
};

// Specific major tourist cities coordinates
const CITY_COORDINATES = {
  "delhi": [28.6139, 77.2090],
  "new delhi": [28.6139, 77.2090],
  "mumbai": [19.0760, 72.8777],
  "bengaluru": [12.9716, 77.5946],
  "bangalore": [12.9716, 77.5946],
  "kolkata": [22.5726, 88.3639],
  "calcutta": [22.5726, 88.3639],
  "goa": [15.2993, 74.1240],
  "jaipur": [26.9124, 75.7873],
  "srinagar": [34.0837, 74.7973],
  "munnar": [10.0889, 77.0595],
  "udaipur": [24.5854, 73.7125],
  "darjeeling": [27.0410, 88.2627],
  "hampi": [15.3350, 76.4600],
  "leh": [34.1526, 77.5771],
  "leh ladakh": [34.1526, 77.5771],
  "varanasi": [25.3176, 82.9739],
  "manali": [32.2396, 77.1887],
  "alleppey": [9.4981, 76.3388],
  "alappuzha": [9.4981, 76.3388],
  "jaisalmer": [26.9157, 70.9083],
  "nagpur": [21.1458, 79.0882],
  "kamptee": [21.2230, 79.2016],
  "pune": [18.5204, 73.8567],
  "visakhapatnam": [17.6868, 83.2185],
  "vizag": [17.6868, 83.2185],
  "tirupati": [13.6288, 79.4192],
  "kochi": [9.9312, 76.2673],
  "cochin": [9.9312, 76.2673],
  "ooty": [11.4102, 76.6950],
  "kanyakumari": [8.0883, 77.5385]
};

// In-memory route computation cache
const routeCache = new Map();
const CACHE_EXPIRY = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

/**
 * Clean cache of expired entries
 */
const cleanExpiredCache = () => {
  const now = Date.now();
  for (const [key, value] of routeCache.entries()) {
    if (now - value.timestamp > CACHE_EXPIRY) {
      routeCache.delete(key);
    }
  }
};

/**
 * Resolves coordinates for any Indian city or state
 */
export const getCityCoordinates = (cityName, stateName) => {
  if (!cityName) return [23.2599, 77.4126];
  
  const cleanCity = cityName.toLowerCase().trim().replace(/[-\s]+/g, ' ');
  const cleanState = stateName ? stateName.toLowerCase().trim() : '';
  
  // Try exact city match
  if (CITY_COORDINATES[cleanCity]) {
    return CITY_COORDINATES[cleanCity];
  }
  
  // Try partial city match
  for (const key of Object.keys(CITY_COORDINATES)) {
    if (cleanCity.includes(key) || key.includes(cleanCity)) {
      return CITY_COORDINATES[key];
    }
  }
  
  // Try exact hub match
  for (const hub of Object.keys(HUB_COORDINATES)) {
    if (cleanCity.includes(hub)) {
      return HUB_COORDINATES[hub];
    }
  }
  
  // Fall back to state centroid
  if (cleanState && STATE_COORDINATES[cleanState]) {
    return STATE_COORDINATES[cleanState];
  }
  
  // Universal fallback: Central India (Bhopal)
  return [23.2599, 77.4126];
};

/**
 * Calculates Great-Circle distance using Haversine formula
 */
const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in KM
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Formats decimal hours into standard "Xh Ym" string
 */
const formatDuration = (hoursDecimal) => {
  const totalMinutes = Math.round(hoursDecimal * 60);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

/**
 * Generates pros and cons for each mode based on distance
 */
export const getProsCons = (mode, distance) => {
  switch (mode) {
    case 'flight':
      return {
        pros: ["Fastest transit time", "Avoids long exhausting journeys", "High safety standard"],
        cons: ["Highest fare range", "Airport transfers and check-in times", "Luggage weight limits"]
      };
    case 'train':
      return {
        pros: ["Very cost-effective", "Comfortable sleeper berths", "Scenic railway views"],
        cons: ["Longer transit duration", "Advance reservation required", "Occasional train delays"]
      };
    case 'bus':
      return {
        pros: ["Good overnight sleeper options", "Last-minute seat availability", "Direct city-center drop"],
        cons: ["Subject to highway traffic", "Less legroom than trains", "Bumpy road conditions"]
      };
    case 'cab':
    case 'car':
      return {
        pros: ["Door-to-door convenience", "Complete schedule flexibility", "Ideal for groups & luggage"],
        cons: ["High fuel and toll cost", "Driver fatigue on long distances", "City traffic entry delays"]
      };
    default:
      return { pros: [], cons: [] };
  }
};

/**
 * Returns recommendation details based on distance
 */
export const getRecommendation = (distance) => {
  if (distance < 250) {
    return {
      mode: "cab",
      reason: "Nearby destination. Driving offers maximum flexibility and door-to-door convenience.",
      pros: ["Door-to-door convenience", "Flexible schedule"],
      cons: ["Traffic entry delays"]
    };
  } else if (distance >= 250 && distance < 700) {
    return {
      mode: "train",
      reason: "Mid-distance journey. Trains offer the perfect balance of cost, comfort, and safety.",
      pros: ["Highly economical", "Comfortable sleeper berths"],
      cons: ["Advance booking required"]
    };
  } else if (distance >= 700 && distance <= 1200) {
    return {
      mode: "flight",
      reason: "Long distance. Flying saves significant time, though trains remain a strong budget alternative.",
      pros: ["Quick transit (under 3h)", "Avoids long travel fatigue"],
      cons: ["Higher ticket cost"]
    };
  } else {
    return {
      mode: "flight",
      reason: "Extremely long distance. Flying is highly recommended to avoid exhaustive multi-day travel.",
      pros: ["Fastest transit time", "Saves 24+ hours of travel time"],
      cons: ["Highest pricing range"]
    };
  }
};

/**
 * Core Travel Engine: Calculates realistic transit parameters.
 * Highly abstract and future-ready to support external APIs.
 */
export const calculateTravelDetails = (originCity, originState, destCity, destState) => {
  cleanExpiredCache();
  const cacheKey = `${originCity || ''}_${originState || ''}_to_${destCity || ''}_${destState || ''}`.toLowerCase().replace(/\s+/g, '_');
  
  if (routeCache.has(cacheKey)) {
    const cached = routeCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_EXPIRY) {
      return cached.data;
    }
  }

  // 1. Get coordinates
  const originCoords = getCityCoordinates(originCity, originState);
  const destCoords = getCityCoordinates(destCity, destState);

  // 2. Calculate distances
  const greatCircleDistance = calculateHaversineDistance(
    originCoords[0], originCoords[1],
    destCoords[0], destCoords[1]
  );
  
  // Road/Rail distance is approximately 25% longer than direct line in India
  const roadDistance = Math.max(15, Math.round(greatCircleDistance * 1.25));

  // 3. Compute transit parameters
  
  // FLIGHT
  // Speed: ~800 km/h. Airport overhead: 2.0 hours.
  const flightHours = (roadDistance / 800) + 2.0;
  const flightDurationStr = formatDuration(flightHours);
  const flightBaseFare = 3000 + (roadDistance * 4.5);
  const flightMin = Math.round(flightBaseFare * 0.85);
  const flightMax = Math.round(flightBaseFare * 1.15);
  const flightAvail = roadDistance > 900 ? "Daily (Frequent)" : roadDistance > 500 ? "3-5 Flights Weekly" : "Limited / Connecting Only";
  const flightConfidence = roadDistance > 500 ? "High" : "Low";
  const flightProsCons = getProsCons('flight', roadDistance);

  // TRAIN
  // Speed: ~70 km/h.
  const trainHours = roadDistance / 70;
  const trainDurationStr = formatDuration(trainHours);
  const trainBaseFare = 150 + (roadDistance * 1.25);
  const trainMin = Math.round(trainBaseFare * 0.8);
  const trainMax = Math.round(trainBaseFare * 1.2);
  const trainAvail = "Daily (Express / Superfast)";
  const trainConfidence = "High";
  const trainProsCons = getProsCons('train', roadDistance);

  // BUS
  // Speed: ~50 km/h.
  const busHours = roadDistance / 50;
  const busDurationStr = formatDuration(busHours);
  const busBaseFare = 100 + (roadDistance * 1.8);
  const busMin = Math.round(busBaseFare * 0.85);
  const busMax = Math.round(busBaseFare * 1.15);
  const busAvail = roadDistance < 700 ? "Daily (AC Volvo Sleeper)" : "Limited / Regional Connect";
  const busConfidence = roadDistance < 800 ? "High" : "Medium";
  const busProsCons = getProsCons('bus', roadDistance);

  // CAR / CAB
  // Speed: ~60 km/h.
  // Fuel Cost: 12 km/l mileage, petrol ₹100/l.
  // Toll Cost: ₹1.5 per km.
  const carHours = roadDistance / 60;
  const carDurationStr = formatDuration(carHours);
  const fuelCost = Math.round((roadDistance / 12) * 100);
  const tollCost = Math.round(roadDistance * 1.5);
  const carTotalCost = fuelCost + tollCost;
  const carConfidence = "High";
  const carProsCons = getProsCons('cab', roadDistance);

  const routeData = {
    distance: roadDistance,
    flight: {
      estimatedMinFare: flightMin,
      estimatedMaxFare: flightMax,
      price: Math.round((flightMin + flightMax) / 2), // average for backward-compatibility
      duration: flightDurationStr,
      distance: roadDistance,
      availability: flightAvail,
      confidenceScore: flightConfidence,
      details: `Estimated Fare: ₹${flightMin.toLocaleString('en-IN')} – ₹${flightMax.toLocaleString('en-IN')} | Distance: ${roadDistance} KM | Availability: ${flightAvail}`,
      pros: flightProsCons.pros,
      cons: flightProsCons.cons
    },
    train: {
      estimatedMinFare: trainMin,
      estimatedMaxFare: trainMax,
      price: Math.round((trainMin + trainMax) / 2),
      duration: trainDurationStr,
      distance: roadDistance,
      availability: trainAvail,
      confidenceScore: trainConfidence,
      details: `Estimated Fare: ₹${trainMin.toLocaleString('en-IN')} – ₹${trainMax.toLocaleString('en-IN')} | Distance: ${roadDistance} KM | Availability: ${trainAvail}`,
      pros: trainProsCons.pros,
      cons: trainProsCons.cons
    },
    bus: {
      estimatedMinFare: busMin,
      estimatedMaxFare: busMax,
      price: Math.round((busMin + busMax) / 2),
      duration: busDurationStr,
      distance: roadDistance,
      availability: busAvail,
      confidenceScore: busConfidence,
      details: `Estimated Fare: ₹${busMin.toLocaleString('en-IN')} – ₹${busMax.toLocaleString('en-IN')} | Distance: ${roadDistance} KM | Availability: ${busAvail}`,
      pros: busProsCons.pros,
      cons: busProsCons.cons
    },
    cab: {
      fuel: fuelCost,
      toll: tollCost,
      total: carTotalCost,
      price: carTotalCost, // keep backward compatibility
      duration: carDurationStr,
      distance: roadDistance,
      availability: "On-Demand (Private / Self-drive)",
      confidenceScore: carConfidence,
      details: `Estimated Car Cost: Fuel ₹${fuelCost.toLocaleString('en-IN')} + Toll ₹${tollCost.toLocaleString('en-IN')} = ₹${carTotalCost.toLocaleString('en-IN')} | Distance: ${roadDistance} KM`,
      pros: carProsCons.pros,
      cons: carProsCons.cons
    },
    recommendation: getRecommendation(roadDistance)
  };

  // Save to cache
  routeCache.set(cacheKey, {
    data: routeData,
    timestamp: Date.now()
  });

  return routeData;
};
