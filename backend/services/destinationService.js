import pool from '../config/supabase.js';

/**
 * Generates a high-fidelity destination profile on-the-fly for any Indian city (fallback)
 */
export const generateDynamicDestination = (id) => {
  const name = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  let state = 'India';
  let category = 'Cultural Heritage';
  let image = 'https://images.unsplash.com/photo-1477584322902-471a53b474b7?auto=format&fit=crop&w=800&q=80';
  
  const lowercaseName = name.toLowerCase();
  let attractions = [];
  let adventures = [];
  
  if (lowercaseName.includes('nagpur')) {
    state = 'Maharashtra';
    category = 'Heritage & Orange City';
    image = 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=800&q=80';
    attractions = [
      { name: 'Deekshabhoomi Stupa', entryFee: 0, duration: 2, description: 'Sacred Buddhist monument where Dr. Ambedkar embraced Buddhism, featuring a massive dome.' },
      { name: 'Dragon Palace Temple (Kamptee)', entryFee: 0, duration: 1.5, description: 'Beautiful Buddhist temple and meditation center situated in Kamptee, famous for its peace.' },
      { name: 'Futala Lake & Fountain', entryFee: 0, duration: 2, description: 'Scenic lake in Nagpur famous for evening walks and musical fountain shows.' }
    ];
    adventures = [
      { name: 'Orange Orchard Tour', cost: 600, type: 'Eco Tour', thrillLevel: 'Low' },
      { name: 'Pench Tiger Safari connection', cost: 3500, type: 'Wildlife Safari', thrillLevel: 'High' }
    ];
  } else if (lowercaseName.includes('kamptee')) {
    state = 'Maharashtra';
    category = 'Spiritual & Cantonment';
    image = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';
    attractions = [
      { name: 'Dragon Palace Temple', entryFee: 0, duration: 2, description: 'A magnificent Buddhist temple and meditation hall, a symbol of Indo-Japanese friendship.' },
      { name: 'Kamptee Cantonment Heritage Walk', entryFee: 0, duration: 2, description: 'Historical military garrison area with British-era churches and green avenues.' },
      { name: 'Kanhan River Viewpoint', entryFee: 0, duration: 1.5, description: 'Scenic river banks perfect for evening photography and relaxing.' }
    ];
    adventures = [
      { name: 'Meditation Session at Dragon Palace', cost: 100, type: 'Spiritual', thrillLevel: 'Low' },
      { name: 'Local Sweet Rabri Tasting Tour', cost: 300, type: 'Food Walk', thrillLevel: 'Low' }
    ];
  } else {
    attractions = [
      { name: `${name} Historic Temple`, entryFee: 50, duration: 2, description: `Ancient historical temple in ${name} showcasing gorgeous local stone architecture.` },
      { name: `${name} Public Lake & Garden`, entryFee: 20, duration: 1.5, description: `A popular local scenic spot in ${name} perfect for evening walks and recreation.` },
      { name: `${name} Heritage Market Walk`, entryFee: 0, duration: 3, description: `Stroll through the colorful local markets of ${name} and buy traditional handicrafts.` }
    ];
    adventures = [
      { name: 'Local Heritage Guided Tour', cost: 500, type: 'Cultural Tour', thrillLevel: 'Low' },
      { name: 'Traditional Cooking Class', cost: 1200, type: 'Culinary', thrillLevel: 'Medium' }
    ];
  }

  const dining = [
    { name: `Street Food Junction (${name})`, specialty: 'Local Savoury Chaat & Sweets', type: 'Street Food', cost: 150 },
    { name: `${name} Heritage Diner`, specialty: 'Traditional Regional Thali', type: 'Mid-Range', cost: 600 },
    { name: `The Grand Royal Restaurant`, specialty: 'Premium Indian & Mughal Fusion', type: 'Fine Dining', cost: 1500 }
  ];

  const routes = {
    delhi: {
      flight: { price: 4500, duration: '2h 15m', details: 'Connecting flights daily to nearest airport' },
      train: { price: 800, duration: '18h 00m', details: 'Direct / Express trains from New Delhi Station' },
      bus: { price: 1200, duration: '22h 00m', details: 'Overnight AC Sleeper coaches' },
      cab: { price: 15000, duration: '14h 00m', details: 'Private taxi via national highway network' }
    },
    mumbai: {
      flight: { price: 4200, duration: '1h 30m', details: 'Frequent direct/connecting flights' },
      train: { price: 700, duration: '16h 00m', details: 'Express trains from CST/Dadar' },
      bus: { price: 1100, duration: '15h 00m', details: 'Direct AC Sleeper overnight' },
      cab: { price: 12000, duration: '11h 00m', details: 'Private sedan via highway' }
    },
    bengaluru: {
      flight: { price: 4800, duration: '1h 45m', details: 'Direct / Connecting flights' },
      train: { price: 650, duration: '18h 00m', details: 'Daily express trains' },
      bus: { price: 1000, duration: '16h 00m', details: 'AC Sleeper coaches' },
      cab: { price: 13000, duration: '12h 00m', details: 'Private sedan via national highway' }
    },
    kolkata: {
      flight: { price: 5800, duration: '2h 10m', details: 'Direct / Connecting flights' },
      train: { price: 900, duration: '20h 00m', details: 'Express trains daily' },
      bus: { price: 1800, duration: '24h 00m', details: 'Requires regional bus connections' },
      cab: { price: 18000, duration: '16h 00m', details: 'Private highway taxi' }
    }
  };

  const hotels = {
    budget: { name: `${name} Backpackers Lodge`, price: 600, highlights: ['Clean dorm beds', 'Friendly local guide host', 'Free high-speed WiFi'] },
    midRange: { name: `Hotel ${name} Residency`, price: 2800, highlights: ['Spacious AC rooms', 'Complimentary buffet breakfast', 'Near transit terminals'] },
    luxury: { name: `The Royal Palace ${name}`, price: 8500, highlights: ['Sprawling heritage garden estate', 'In-house luxury spa & pool', 'Fine-dining multi-cuisine restaurant'] }
  };

  return {
    id,
    name,
    state,
    tagline: `Explore the hidden beauty of ${name}`,
    category,
    image,
    description: `A stunning travel destination in ${state}, India, offering a blend of cultural landmarks, scenic points, and historical wonders.`,
    climate: 'Tropical (20°C - 35°C)',
    bestTime: 'October to March',
    routes,
    hotels,
    dining,
    attractions,
    adventures,
    searchAliases: [id.replace('-', ' ')],
    popularityScore: 40
  };
};

// Map database columns to camelCase for the frontend
const mapDestinationRow = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    state: row.state,
    tagline: row.tagline,
    category: row.category,
    image: row.image,
    description: row.description,
    climate: row.climate,
    bestTime: row.best_time,
    routes: row.routes,
    hotels: row.hotels,
    dining: row.dining,
    attractions: row.attractions,
    adventures: row.adventures,
    searchAliases: row.search_aliases || [],
    popularityScore: row.popularity_score || 50
  };
};

/**
 * Service to retrieve a list of destinations with search, filters, and autocomplete ranking
 */
export const getDestinations = async (search, state, category) => {
  let query = 'SELECT * FROM destinations WHERE 1=1';
  const params = [];
  let paramCount = 1;

  if (search) {
    const searchTerm = `%${search.trim()}%`;
    // Scans name, state, category, or search_aliases array (case-insensitively)
    query += ` AND (
      name ILIKE $${paramCount} OR 
      state ILIKE $${paramCount} OR 
      category ILIKE $${paramCount} OR
      EXISTS (SELECT 1 FROM unnest(search_aliases) alias WHERE alias ILIKE $${paramCount})
    )`;
    params.push(searchTerm);
    paramCount++;
  }

  if (state) {
    query += ` AND state = $${paramCount}`;
    params.push(state);
    paramCount++;
  }

  if (category) {
    query += ` AND category = $${paramCount}`;
    params.push(category);
    paramCount++;
  }

  // Autocomplete Ranking: Higher popularity scores are ranked first, followed by alphabetical order
  query += ' ORDER BY popularity_score DESC, name ASC';

  const { rows } = await pool.query(query, params);
  const dests = rows.map(mapDestinationRow);

  // Dynamic Autocomplete Injector for "Every Single Place in India" (Fallback Suggestion)
  if (search && search.trim().length > 0) {
    const cleanSearch = search.trim();
    const customId = cleanSearch.toLowerCase().replace(/\s+/g, '-');
    
    const alreadyExists = dests.some(d => d.id === customId || d.searchAliases.some(alias => alias.toLowerCase() === cleanSearch.toLowerCase()));
    if (!alreadyExists) {
      const customName = cleanSearch.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      dests.push({
        id: customId,
        name: customName,
        state: 'India',
        tagline: `Explore the hidden beauty of ${customName}`,
        category: 'Custom Destination',
        image: 'https://images.unsplash.com/photo-1477584322902-471a53b474b7?auto=format&fit=crop&w=800&q=80',
        description: `Plan a custom day-by-day travel itinerary for ${customName}, India.`,
        searchAliases: [cleanSearch],
        popularityScore: 0
      });
    }
  }

  return dests;
};

/**
 * Service to retrieve a single destination's complete details by ID
 */
export const getDestinationById = async (id) => {
  // Try direct ID match
  let { rows } = await pool.query('SELECT * FROM destinations WHERE id = $1 LIMIT 1', [id]);
  
  if (rows.length === 0) {
    // Try matching by alias if ID lookup fails
    const aliasQuery = `
      SELECT * FROM destinations 
      WHERE EXISTS (SELECT 1 FROM unnest(search_aliases) alias WHERE alias = $1) 
      LIMIT 1
    `;
    const aliasResult = await pool.query(aliasQuery, [id.replace('-', ' ')]);
    rows = aliasResult.rows;
  }

  if (rows.length === 0) {
    return generateDynamicDestination(id);
  }

  return mapDestinationRow(rows[0]);
};
