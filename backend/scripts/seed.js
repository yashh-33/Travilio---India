import pool from '../config/supabase.js';
import dotenv from 'dotenv';

dotenv.config();

// 1. Hand-crafted high-fidelity premium destinations (12 total)
const premiumDestinations = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'The Land of Sun, Sand, and Sea',
    category: 'Beach & Nightlife',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'A pocket-sized paradise on the west coast of India, Goa is a kaleidoscopic blend of Portuguese-Indian heritage, delicious seafood, and scenic beaches.',
    climate: 'Tropical (24°C - 32°C)',
    bestTime: 'November to February',
    popularity: 98,
    aliases: ['panjim', 'calangute', 'baga', 'south goa', 'north goa'],
    routes: {
      delhi: {
        flight: { price: 4200, duration: '2h 30m', details: 'Daily direct flights from IGI Airport' },
        train: { price: 950, duration: '26h 00m', details: 'Rajdhani / Mangala Express' },
        bus: { price: 1800, duration: '32h 00m', details: 'Multi-stop luxury sleeper buses' },
        cab: { price: 28000, duration: '28h 00m', details: 'National Highway taxi route' }
      },
      mumbai: {
        flight: { price: 2100, duration: '1h 05m', details: 'Frequent direct shuttle flights' },
        train: { price: 450, duration: '9h 30m', details: 'Tejas Express / Mandovi Express' },
        bus: { price: 850, duration: '12h 00m', details: 'Direct AC Sleeper overnight' },
        cab: { price: 9500, duration: '10h 00m', details: 'Private cab via scenic NH 66' }
      },
      bengaluru: {
        flight: { price: 2300, duration: '1h 10m', details: 'Multiple direct daily flights' },
        train: { price: 500, duration: '14h 00m', details: 'KSR Bengaluru - Vasco Da Gama Express' },
        bus: { price: 750, duration: '10h 30m', details: 'Overnight luxury sleeper multi-operator' },
        cab: { price: 8500, duration: '9h 30m', details: 'Private sedan via NH 48' }
      },
      kolkata: {
        flight: { price: 5500, duration: '2h 45m', details: 'Direct / Connecting daily flights' },
        train: { price: 1100, duration: '34h 00m', details: 'Howrah - Vasco Da Gama Express' },
        bus: { price: 2400, duration: '38h 00m', details: 'Requires regional bus layovers' },
        cab: { price: 32000, duration: '32h 00m', details: 'Long distance national highway taxi' }
      }
    },
    hotels: {
      budget: { name: 'Zostel Goa (Morjim)', price: 650, highlights: ['Vibrant backpacker community', 'Steps away from Morjim Beach', 'Free high-speed WiFi'] },
      midRange: { name: 'Resort De Alturas (Calangute)', price: 3400, highlights: ['Swimming pool & spa', 'Complimentary buffet breakfast', 'Near Calangute shopping strip'] },
      luxury: { name: 'The Taj Exotica Resort (Benaulim)', price: 16500, highlights: ['Private villa beach access', 'World-class signature golf course', 'In-house luxury spa & fine dining'] }
    },
    dining: [
      { name: 'Brittos Beach Shack', specialty: 'Goan Fish Curry & Butter Garlic Prawns', type: 'Beachfront Diner', cost: 700 },
      { name: 'Gunpowder (Assagao)', specialty: 'Kerala Mutton Curry & Appams', type: 'Mid-Range Heritage', cost: 900 },
      { name: 'Mum’s Kitchen (Panaji)', specialty: 'Traditional Goan Pork Vindaloo', type: 'Fine Dining Regional', cost: 1400 }
    ],
    attractions: [
      { name: 'Basilica of Bom Jesus', entryFee: 0, duration: 1.5, description: 'UNESCO World Heritage site holding the sacred mortal remains of St. Francis Xavier.' },
      { name: 'Dudsagar Waterfalls', entryFee: 400, duration: 5, description: 'A majestic four-tiered waterfall on the Mandovi River, surrounded by tropical forests.' },
      { name: 'Fort Aguada', entryFee: 0, duration: 2, description: 'Well-preserved 17th-century Portuguese fort and lighthouse overlooking the Arabian Sea.' }
    ],
    adventures: [
      { name: 'Scuba Diving at Grande Island', cost: 2800, type: 'Water Sports', thrillLevel: 'High' },
      { name: 'Dolphin Sighting Boat Safari', cost: 450, type: 'Wildlife Boat Tour', thrillLevel: 'Low' }
    ]
  },
  {
    id: 'rajasthan-jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Magnificence of the Pink City',
    category: 'Cultural Heritage',
    image: 'https://images.unsplash.com/photo-1477584322902-471a53b474b7?auto=format&fit=crop&w=800&q=80',
    description: 'Jaipur, the capital of Rajasthan, is a vibrant destination famous for its grand pink-tinted forts, intricate royal palaces, and bustling traditional bazaars.',
    climate: 'Semi-arid (18°C - 34°C)',
    bestTime: 'October to March',
    popularity: 96,
    aliases: ['pink city', 'amer fort', 'hawa mahal'],
    routes: {
      delhi: {
        flight: { price: 2100, duration: '1h 00m', details: 'Frequent direct daily shuttles' },
        train: { price: 350, duration: '4h 30m', details: 'Ajmer Shatabdi / Double Decker Express' },
        bus: { price: 450, duration: '5h 30m', details: 'Hourly AC Volvo sleeper coaches' },
        cab: { price: 3800, duration: '5h 00m', details: 'Private sedan via Delhi-Jaipur highway' }
      },
      mumbai: {
        flight: { price: 3800, duration: '1h 45m', details: 'Direct daily flights' },
        train: { price: 750, duration: '16h 00m', details: 'Jaipur Superfast Express' },
        bus: { price: 1400, duration: '20h 00m', details: 'Overnight AC luxury sleeper' },
        cab: { price: 16000, duration: '18h 00m', details: 'Private highway taxi' }
      },
      bengaluru: {
        flight: { price: 4500, duration: '2h 20m', details: 'Direct daily flights' },
        train: { price: 950, duration: '32h 00m', details: 'Yesvantpur - Jaipur Express' },
        bus: { price: 2600, duration: '36h 00m', details: 'Requires multi-layover coaches' },
        cab: { price: 28000, duration: '30h 00m', details: 'Long distance national highway taxi' }
      },
      kolkata: {
        flight: { price: 4800, duration: '2h 15m', details: 'Direct daily flights' },
        train: { price: 850, duration: '22h 00m', details: 'Howrah - Jaipur Express' },
        bus: { price: 2400, duration: '28h 00m', details: 'Multi-state highway coaches' },
        cab: { price: 22000, duration: '24h 00m', details: 'Private highway sedan' }
      }
    },
    hotels: {
      budget: { name: 'Moustache Hostel (Jaipur)', price: 500, highlights: ['Charming rooftop cafe', 'Traditional Rajasthani wall murals', 'Centrally located'] },
      midRange: { name: 'Umaid Bhawan Hotel', price: 3200, highlights: ['Heritage styling & courtyards', 'Swimming pool & folk shows', 'Complimentary breakfast'] },
      luxury: { name: 'Rambagh Palace', price: 24000, highlights: ['Former residence of the Maharaja', 'Sprawling 47-acre ornamental gardens', 'Royal horse-drawn carriage ride'] }
    },
    dining: [
      { name: 'Laxmi Mishthan Bhandar (LMB)', specialty: 'Traditional Rajasthani Pyaaz Kachori & Ghewar', type: 'Historic Sweetshop', cost: 300 },
      { name: 'Chokhi Dhani Resort', specialty: 'Authentic Rajasthani Dal Baati Churma Feast', type: 'Cultural Dining Experience', cost: 1100 },
      { name: '1135 AD (Amer Fort)', specialty: 'Royal Lal Maas & Mughlai Biryani', type: 'Fine Dining Heritage Palace', cost: 2200 }
    ],
    attractions: [
      { name: 'Amber Palace (Amer Fort)', entryFee: 100, duration: 3, description: 'Magnificent hilltop fort featuring Rajput architecture, sheesh mahal, and elephant rides.' },
      { name: 'Hawa Mahal', entryFee: 50, duration: 1, description: 'The Palace of Winds, featuring a unique five-story exterior resembling a honeycomb.' },
      { name: 'City Palace', entryFee: 200, duration: 2.5, description: 'A grand royal residence housing museum exhibits of weaponry, textiles, and art.' }
    ],
    adventures: [
      { name: 'Hot Air Balloon Ride over Amer', cost: 9500, type: 'Aviation Adventure', thrillLevel: 'Medium' },
      { name: 'Bazaar Walking & Handicraft Shopping Tour', cost: 400, type: 'Cultural Guided Walk', thrillLevel: 'Low' }
    ]
  },
  {
    id: 'himachal-manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    tagline: 'Valley of the Gods and Adventure',
    category: 'Hill Station',
    image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80',
    description: 'Manali is a high-altitude Himalayan resort town famous for paragliding, rafting, snow sports, and serene pine valleys.',
    climate: 'Alpine (2°C - 20°C)',
    bestTime: 'October to June',
    popularity: 95,
    aliases: ['solang valley', 'hadimba temple', 'rohtang pass'],
    routes: {
      delhi: {
        flight: { price: 6500, duration: '1h 20m', details: 'Flights to Kullu-Manali Airport (Bhuntar)' },
        train: { price: 650, duration: '10h 30m', details: 'Train to Chandigarh, then local Volvo' },
        bus: { price: 1100, duration: '14h 00m', details: 'Direct AC Volvo Sleeper coaches daily' },
        cab: { price: 11000, duration: '12h 00m', details: 'Scenic highway cab route' }
      },
      mumbai: {
        flight: { price: 8500, duration: '4h 30m', details: 'Flight to Chandigarh, then private cab' },
        train: { price: 1250, duration: '32h 00m', details: 'Train to Delhi, then Volvo to Manali' },
        bus: { price: 2600, duration: '34h 00m', details: 'Requires multi-city Volvo connections' },
        cab: { price: 26000, duration: '30h 00m', details: 'Long distance national highway taxi' }
      },
      bengaluru: {
        flight: { price: 9500, duration: '5h 00m', details: 'Flight to Chandigarh, then private cab' },
        train: { price: 1500, duration: '42h 00m', details: 'Train to Delhi, then Volvo to Manali' },
        bus: { price: 3200, duration: '48h 00m', details: 'Multi-state bus routes' },
        cab: { price: 38000, duration: '40h 00m', details: 'Long distance national highway taxi' }
      },
      kolkata: {
        flight: { price: 8800, duration: '4h 50m', details: 'Flight to Chandigarh, then private cab' },
        train: { price: 1300, duration: '36h 00m', details: 'Train to Delhi, then Volvo to Manali' },
        bus: { price: 2800, duration: '40h 00m', details: 'Multi-city Volvo routes' },
        cab: { price: 30000, duration: '34h 00m', details: 'Private highway taxi' }
      }
    },
    hotels: {
      budget: { name: 'Alt Life Hostel (Dharamkot / Old Manali)', price: 550, highlights: ['Rooftop cafe with valley views', 'Co-working spaces', 'Bonfire nights'] },
      midRange: { name: 'The Orchard Greens', price: 2900, highlights: ['Surrounded by apple orchards', 'Spacious AC rooms', 'In-house restaurant'] },
      luxury: { name: 'Span Resort & Spa', price: 15500, highlights: ['On the banks of the Beas River', 'Luxury wooden cottages', 'Private spa & heated pool'] }
    },
    dining: [
      { name: 'The Lazy Dog (Old Manali)', specialty: 'Trout Fish & Wood-fired Pizzas', type: 'Riverside Cafe', cost: 600 },
      { name: 'Chopsticks (Mall Road)', specialty: 'Thukpa & Steamed Momos', type: 'Tibetan Diner', cost: 400 },
      { name: 'Johnson Cafe', specialty: 'Baked Trout in Butter Garlic Sauce', type: 'Fine Dining Garden Cafe', cost: 950 }
    ],
    attractions: [
      { name: 'Hadimba Temple', entryFee: 0, duration: 1, description: 'Ancient wooden pagoda-style temple constructed in 1553, dedicated to Hidimba Devi.' },
      { name: 'Solang Valley', entryFee: 0, duration: 4, description: 'Famed side valley offering paragliding, zorbing, quad biking, and skiing in winters.' },
      { name: 'Atal Tunnel & Sissu', entryFee: 0, duration: 5, description: 'Engineering marvel tunnel leading to Sissu village in Lahaul Valley, featuring waterfalls.' }
    ],
    adventures: [
      { name: 'Tandem Paragliding in Solang', cost: 3200, type: 'Aviation Sports', thrillLevel: 'High' },
      { name: 'White Water Rafting in Beas River', cost: 1200, type: 'Water Sports', thrillLevel: 'High' }
    ]
  },
  {
    id: 'kerala-munnar',
    name: 'Munnar',
    state: 'Kerala',
    tagline: 'The Tea Garden Paradise of India',
    category: 'Hill Station',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    description: 'Munnar is a majestic hill station in the Western Ghats of Kerala, famous for sprawling tea estates, winding mist paths, and rare wildlife.',
    climate: 'Cool (14°C - 25°C)',
    bestTime: 'September to May',
    popularity: 94,
    aliases: ['tea gardens', 'eravikulam', 'mattupetty'],
    routes: {
      delhi: {
        flight: { price: 5500, duration: '3h 10m', details: 'Flight to Kochi (COK), then 3h drive to Munnar' },
        train: { price: 900, duration: '38h 00m', details: 'Train to Ernakulam Junction' },
        bus: { price: 2200, duration: '44h 00m', details: 'Requires multi-layover coaches' },
        cab: { price: 32000, duration: '38h 00m', details: 'Long distance national highway transfer' }
      },
      mumbai: {
        flight: { price: 3800, duration: '1h 50m', details: 'Flight to Kochi, then private cab' },
        train: { price: 650, duration: '24h 00m', details: 'Train to Ernakulam, then local cab' },
        bus: { price: 1500, duration: '28h 00m', details: 'Requires Volvo connections' },
        cab: { price: 18000, duration: '22h 00m', details: 'Scenic Western Ghats cab ride' }
      },
      bengaluru: {
        flight: { price: 2200, duration: '1h 00m', details: 'Daily direct flights to Kochi / Coimbatore' },
        train: { price: 450, duration: '9h 30m', details: 'Train to Aluva / Ernakulam' },
        bus: { price: 950, duration: '9h 00m', details: 'Direct overnight AC Sleeper coaches' },
        cab: { price: 8000, duration: '8h 30m', details: 'Private sedan via Salem-Udumalpet highway' }
      },
      kolkata: {
        flight: { price: 5800, duration: '2h 50m', details: 'Flight to Kochi, then private cab' },
        train: { price: 1000, duration: '34h 00m', details: 'Train to Ernakulam' },
        bus: { price: 2600, duration: '42h 00m', details: 'Requires regional bus connections' },
        cab: { price: 34000, duration: '36h 00m', details: 'Private long distance highway taxi' }
      }
    },
    hotels: {
      budget: { name: 'Zostel Munnar', price: 600, highlights: ['Surrounded by tea hills', 'Bonfire & terrace stargazing', 'Free high-speed WiFi'] },
      midRange: { name: 'Tea Valley Resort', price: 3200, highlights: ['Cottages set in a 6.5-acre estate', 'Traditional Kerala cuisine', 'Tea garden walking tours'] },
      luxury: { name: 'The Windermere Estate', price: 14500, highlights: ['Charming heritage plantation bungalow', 'Panoramas of spectacular valleys', 'Private bird watching tours'] }
    },
    dining: [
      { name: 'Rapsy Restaurant', specialty: 'Kerala Beef Fry & Malabar Parotta', type: 'Local Classic Diner', cost: 350 },
      { name: 'Saravana Bhavan', specialty: 'Traditional South Indian Thali & Dosa', type: 'Vegetarian Classic', cost: 200 },
      { name: 'The Silver Spoon', specialty: 'Authentic Malabar Fish Curry & Appams', type: 'Mid-Range Regional', cost: 650 }
    ],
    attractions: [
      { name: 'Eravikulam National Park', entryFee: 125, duration: 3, description: 'Sanctuary of the endangered Nilgiri Tahr, offering panoramic views of misty hills.' },
      { name: 'Mattupetty Dam & Lake', entryFee: 30, duration: 2, description: 'Storage concrete gravity dam famous for speedboating and elephant sighting walks.' },
      { name: 'Tata Tea Museum', entryFee: 75, duration: 1.5, description: 'India’s first tea museum, showcasing the evolution of Munnar tea plantations.' }
    ],
    adventures: [
      { name: 'Anamudi Peak Trekking', cost: 1800, type: 'Trekking', thrillLevel: 'Medium' },
      { name: 'Spice Plantation Guided Tour', cost: 300, type: 'Eco Tour', thrillLevel: 'Low' }
    ]
  },
  {
    id: 'ladakh-leh',
    name: 'Leh Ladakh',
    state: 'Ladakh',
    tagline: 'The Land of High Mountain Passes',
    category: 'Adventure & Trekking',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a523?auto=format&fit=crop&w=800&q=80',
    description: 'Leh Ladakh is a high-altitude cold desert valley famous for ancient Tibetan monasteries, dramatic moonscapes, and high-altitude lakes.',
    climate: 'Cold Desert (-10°C - 15°C)',
    bestTime: 'June to September',
    popularity: 94,
    aliases: ['leh', 'ladakh', 'pangong lake', 'nubra valley'],
    routes: {
      delhi: {
        flight: { price: 5500, duration: '1h 15m', details: 'Breathtaking direct Himalayan flights daily' },
        train: { price: 950, duration: '24h 00m', details: 'Train to Jammu, then private cab via Srinagar' },
        bus: { price: 2200, duration: '32h 00m', details: 'Manali-Leh HRTC bus (seasonal)' },
        cab: { price: 32000, duration: '24h 00m', details: 'Private 4x4 via Manali-Leh Highway' }
      },
      mumbai: {
        flight: { price: 8500, duration: '3h 30m', details: 'Direct / Connecting daily flights' },
        train: { price: 1500, duration: '40h 00m', details: 'Train to Delhi, then flight to Leh' },
        bus: { price: 3400, duration: '48h 00m', details: 'Requires multi-city bus layovers' },
        cab: { price: 48000, duration: '42h 00m', details: 'Long distance private highway 4x4' }
      },
      bengaluru: {
        flight: { price: 9800, duration: '4h 00m', details: 'Direct / Connecting daily flights' },
        train: { price: 1800, duration: '48h 00m', details: 'Train to Delhi, then flight to Leh' },
        bus: { price: 4200, duration: '56h 00m', details: 'Long distance multi-layover coaches' },
        cab: { price: 55000, duration: '50h 00m', details: 'Long distance highway 4x4 cab' }
      },
      kolkata: {
        flight: { price: 8800, duration: '3h 45m', details: 'Direct / Connecting daily flights' },
        train: { price: 1400, duration: '42h 00m', details: 'Train to Delhi, then flight to Leh' },
        bus: { price: 3600, duration: '50h 00m', details: 'Multi-city bus connections' },
        cab: { price: 46000, duration: '44h 00m', details: 'Private long distance 4x4 cab' }
      }
    },
    hotels: {
      budget: { name: 'Zostel Leh', price: 700, highlights: ['Rooftop cafe with Stok Kangri views', 'Warm blankets & heaters', 'Centrally located'] },
      midRange: { name: 'Hotel Singge Palace', price: 4200, highlights: ['Centrally heated rooms', 'Excellent buffet dining', 'Traditional Ladakhi hospitality'] },
      luxury: { name: 'The Grand Dragon Ladakh', price: 14500, highlights: ['Luxury solar-heated facility', 'Stunning views of Cold Desert mountains', 'Premium in-house fine dining'] }
    },
    dining: [
      { name: 'Gesmo Restaurant', specialty: 'Yak Cheese Pizza & Yak Butter Tea', type: 'Local Classic Cafe', cost: 450 },
      { name: 'The Tibetan Kitchen', specialty: 'Mutton Momos, Thukpa & Shabakley', type: 'Authentic Tibetan Regional', cost: 650 },
      { name: 'Chopsticks Noodle Bar', specialty: 'Crispy Honey Chili Potatoes & Soups', type: 'Pan-Asian Diner', cost: 500 }
    ],
    attractions: [
      { name: 'Leh Palace', entryFee: 50, duration: 2, description: '9-story royal palace built in 1600, offering panoramic views of Leh town and Stok range.' },
      { name: 'Shanti Stupa', entryFee: 0, duration: 1.5, description: 'White-domed Buddhist stupa on a hilltop, famous for sunset views and peace.' },
      { name: 'Magnetic Hill', entryFee: 0, duration: 1, description: 'A gravity hill phenomenon where vehicles seem to defy gravity and roll uphill.' }
    ],
    adventures: [
      { name: 'Rafting in Zanskar River', cost: 2200, type: 'Water Sports', thrillLevel: 'High' },
      { name: 'Nubra Valley Camel Safari', cost: 800, type: 'Wildlife Safari', thrillLevel: 'Low' }
    ]
  },
  {
    id: 'uttar-pradesh-varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The Soul of Mystical India',
    category: 'Religious & Spiritual',
    image: 'https://images.unsplash.com/photo-1561361531-99e224e97a31?auto=format&fit=crop&w=800&q=80',
    description: 'Varanasi, also known as Kashi or Banaras, is one of the oldest continuously inhabited cities in the world, sacred to Hindus for its ghats along the Ganges.',
    climate: 'Sub-tropical (16°C - 35°C)',
    bestTime: 'October to March',
    popularity: 97,
    aliases: ['kashi', 'banaras', 'ganges', 'ghats'],
    routes: {
      delhi: {
        flight: { price: 2300, duration: '1h 15m', details: 'Frequent direct daily flights' },
        train: { price: 450, duration: '8h 00m', details: 'Vande Bharat / Shiv Ganga Express' },
        bus: { price: 750, duration: '12h 00m', details: 'AC Sleeper coaches daily' },
        cab: { price: 9500, duration: '11h 00m', details: 'Private sedan via Yamuna Expressway' }
      },
      mumbai: {
        flight: { price: 4100, duration: '2h 05m', details: 'Direct daily flights' },
        train: { price: 700, duration: '24h 00m', details: 'Mahanagari Express' },
        bus: { price: 1800, duration: '28h 00m', details: 'Requires multi-layover Volvo' },
        cab: { price: 18000, duration: '24h 00m', details: 'Private long distance cab' }
      },
      bengaluru: {
        flight: { price: 4600, duration: '2h 15m', details: 'Direct daily flights' },
        train: { price: 850, duration: '32h 00m', details: 'Sanghamitra Express' },
        bus: { price: 2600, duration: '38h 00m', details: 'Multi-state long coaches' },
        cab: { price: 26000, duration: '30h 00m', details: 'Long distance highway taxi' }
      },
      kolkata: {
        flight: { price: 3400, duration: '1h 10m', details: 'Direct daily flights' },
        train: { price: 400, duration: '9h 00m', details: 'Vibhuti Express / Poorva Express' },
        bus: { price: 850, duration: '14h 00m', details: 'AC Sleeper daily buses' },
        cab: { price: 9000, duration: '12h 00m', details: 'Private highway sedan' }
      }
    },
    hotels: {
      budget: { name: 'Moustache Hostel Varanasi', price: 450, highlights: ['Rooftop cafe overlooking Assi Ghat', 'Vibrant spiritual walks', 'Free high-speed WiFi'] },
      midRange: { name: 'Alka Hotel (Dashashwamedh Ghat)', price: 2800, highlights: ['Direct views of the holy Ganges', 'In-house vegetarian restaurant', 'Steps from Ganga Aarti'] },
      luxury: { name: 'BrijRama Palace Heritage Hotel', price: 18500, highlights: ['Historical 1812 palace on the ghats', 'Access via private royal boat', 'Live classical sitar morning recitals'] }
    },
    dining: [
      { name: 'Kashi Chat Bhandar', specialty: 'Tamatar Chat, Golgappe & Rabri', type: 'Famous Street Food', cost: 150 },
      { name: 'Blue Lassi Shop', specialty: 'Mango Pomegranate Rabri Lassi', type: 'Legendary Lassi Stall', cost: 100 },
      { name: 'Canton Royale Restaurant', specialty: 'Premium Banarasi Satvik Thali', type: 'Fine Dining Vegetarian', cost: 850 }
    ],
    attractions: [
      { name: 'Kashi Vishwanath Temple', entryFee: 0, duration: 2, description: 'Sacred golden-spired temple dedicated to Lord Shiva (Vishweshwara Jyotirlinga).' },
      { name: 'Dashashwamedh Ghat (Ganga Aarti)', entryFee: 0, duration: 2, description: 'The spectacular evening ritual of worship with massive brass lamps and classical chants.' },
      { name: 'Sarnath Buddhist Ruins', entryFee: 20, duration: 3, description: 'Sacred park where Lord Buddha preached his first sermon, featuring the Dhamek Stupa.' }
    ],
    adventures: [
      { name: 'Subah-e-Banaras Dawn Boat Ride', cost: 600, type: 'Boat Cruise', thrillLevel: 'Low' },
      { name: 'Ghats & Historical Lanes Walking Tour', cost: 350, type: 'Cultural Guided Walk', thrillLevel: 'Low' }
    ]
  },
  {
    id: 'uttar-pradesh-agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'The Pinnacle of Mughal Grandeur',
    category: 'Cultural Heritage',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    description: 'Agra is home to the world-famous Taj Mahal, along with Agra Fort and Fatehpur Sikri, showcasing the zenith of Mughal art and architecture.',
    climate: 'Semi-arid (18°C - 35°C)',
    bestTime: 'October to March',
    popularity: 97,
    aliases: ['taj mahal', 'taj', 'agra fort'],
    routes: {
      delhi: {
        flight: { price: 2800, duration: '1h 00m', details: 'Connecting flights daily' },
        train: { price: 280, duration: '2h 00m', details: 'Gatimaan Express / Taj Express' },
        bus: { price: 380, duration: '3h 30m', details: 'Hourly AC coaches via Yamuna Expressway' },
        cab: { price: 3200, duration: '3h 00m', details: 'Private sedan via Yamuna Expressway' }
      },
      mumbai: {
        flight: { price: 4200, duration: '2h 00m', details: 'Direct daily flights' },
        train: { price: 750, duration: '18h 00m', details: 'LTT - Haridwar Express' },
        bus: { price: 1600, duration: '24h 00m', details: 'Requires Volvo connections' },
        cab: { price: 18000, duration: '20h 00m', details: 'Private highway taxi' }
      },
      bengaluru: {
        flight: { price: 4800, duration: '2h 30m', details: 'Direct daily flights' },
        train: { price: 900, duration: '28h 00m', details: 'Karnataka Express' },
        bus: { price: 2600, duration: '34h 00m', details: 'Requires multi-city layovers' },
        cab: { price: 28000, duration: '30h 00m', details: 'Long distance highway taxi' }
      },
      kolkata: {
        flight: { price: 4600, duration: '2h 15m', details: 'Direct daily flights' },
        train: { price: 650, duration: '16h 00m', details: 'Howrah - Jodhpur Express' },
        bus: { price: 1800, duration: '22h 00m', details: 'Multi-state coaches' },
        cab: { price: 18000, duration: '18h 00m', details: 'Private highway sedan' }
      }
    },
    hotels: {
      budget: { name: 'Friends Home Stay', price: 600, highlights: ['Taj Mahal rooftop views', 'Home-cooked Indian meals', 'Quiet garden neighborhood'] },
      midRange: { name: 'Howard Plaza The Fern', price: 3200, highlights: ['Rooftop swimming pool', 'In-house spa & bar', 'Walking distance from Taj Mahal'] },
      luxury: { name: 'The Oberoi Amarvilas', price: 32000, highlights: ['Every room has direct views of Taj Mahal', 'Royal Mughal-style lawns & pools', 'Private golf buggy butler service'] }
    },
    dining: [
      { name: 'Panchi Petha Store', specialty: 'Famous Agra Angoori Petha & Dalmoth', type: 'Historic Sweetshop', cost: 150 },
      { name: 'Mama Chicken Mama Franky', specialty: 'Mughlai Chicken Shawarma & Kebabs', type: 'Famous Street Joint', cost: 250 },
      { name: 'Peshawri (ITC Mughal)', specialty: 'Authentic Dal Bukhara & Tandoori Kebabs', type: 'Fine Dining Mughlai', cost: 2400 }
    ],
    attractions: [
      { name: 'Taj Mahal', entryFee: 50, duration: 3, description: 'UNESCO masterpiece white marble mausoleum constructed by Shah Jahan for Mumtaz Mahal.' },
      { name: 'Agra Fort', entryFee: 50, duration: 2, description: 'Massive red sandstone walled city fort, the former primary seat of the Mughal Emperors.' },
      { name: 'Fatehpur Sikri', entryFee: 50, duration: 3, description: 'Intact imperial ghost city built by Emperor Akbar, featuring the massive Buland Darwaza.' }
    ],
    adventures: [
      { name: 'Taj Heritage Cycle Tour at Dawn', cost: 900, type: 'Eco Cycle Tour', thrillLevel: 'Low' },
      { name: 'Mughal Bazaar Leather & Textile Walk', cost: 300, type: 'Cultural Guided Walk', thrillLevel: 'Low' }
    ]
  },
  {
    id: 'tamil-nadu-ooty',
    name: 'Ooty',
    state: 'Tamil Nadu',
    tagline: 'The Queen of Blue Nilgiri Hills',
    category: 'Hill Station',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    description: 'Ooty, also known as Udhagamandalam, is a premier hill station in the Nilgiri Hills of Tamil Nadu, famous for tea gardens, lakes, and the historic toy train.',
    climate: 'Cool (10°C - 22°C)',
    bestTime: 'October to May',
    popularity: 92,
    aliases: ['udhagamandalam', 'nilgiris', 'ooty lake', 'toy train'],
    routes: {
      delhi: {
        flight: { price: 5800, duration: '2h 45m', details: 'Flight to Coimbatore (CJB), then 3h taxi to Ooty' },
        train: { price: 900, duration: '36h 00m', details: 'Train to Coimbatore Junction' },
        bus: { price: 2200, duration: '42h 00m', details: 'Requires multi-city layovers' },
        cab: { price: 28000, duration: '34h 00m', details: 'Private highway taxi transfer' }
      },
      mumbai: {
        flight: { price: 4200, duration: '1h 55m', details: 'Flight to Coimbatore, then private taxi' },
        train: { price: 650, duration: '24h 00m', details: 'Train to Coimbatore Junction' },
        bus: { price: 1600, duration: '28h 00m', details: 'Requires Volvo connections' },
        cab: { price: 18000, duration: '22h 00m', details: 'Private highway sedan' }
      },
      bengaluru: {
        flight: { price: 3200, duration: '1h 00m', details: 'Flights to Coimbatore / Mysore' },
        train: { price: 350, duration: '7h 00m', details: 'Train to Mysore, then local taxi' },
        bus: { price: 650, duration: '7h 30m', details: 'AC Volvo Sleeper overnight coaches daily' },
        cab: { price: 5800, duration: '6h 30m', details: 'Private sedan via Bandipur Tiger Reserve' }
      },
      kolkata: {
        flight: { price: 6200, duration: '2h 50m', details: 'Flight to Coimbatore, then private taxi' },
        train: { price: 1000, duration: '32h 00m', details: 'Train to Coimbatore' },
        bus: { price: 2400, duration: '40h 00m', details: 'Requires regional bus connections' },
        cab: { price: 32000, duration: '34h 00m', details: 'Private long distance highway taxi' }
      }
    },
    hotels: {
      budget: { name: 'Zostel Ooty', price: 550, highlights: ['Set in a sprawling heritage bungalow', 'Cozy bonfire nights', 'Free high-speed WiFi'] },
      midRange: { name: 'Sinclairs Retreat Ooty', price: 3500, highlights: ['Highest hotel in Southern India', 'Stunning valley panoramas', 'Playgrounds & gym'] },
      luxury: { name: 'Savoy - IHCL SeleQtions', price: 12500, highlights: ['Victorian-era heritage cottage styling', 'Sprawling ornamental flower lawns', 'Traditional English high-tea service'] }
    },
    dining: [
      { name: 'Sidewalk Cafe', specialty: 'Wood-fired Gourmet Pizzas & Pastas', type: 'Famous Italian Cafe', cost: 550 },
      { name: 'Shinkow’s Chinese Restaurant', specialty: 'Traditional Hakka Noodles & Chili Pork', type: 'Legacy Indo-Chinese', cost: 450 },
      { name: 'Savoy Dining Room', specialty: 'Royal Anglo-Indian Badagara Curry & Rice', type: 'Fine Dining Heritage', cost: 1100 }
    ],
    attractions: [
      { name: 'Nilgiri Mountain Railway (Toy Train)', entryFee: 150, duration: 4.5, description: 'UNESCO World Heritage steam toy train chugging through deep valleys and tunnels.' },
      { name: 'Ooty Botanical Gardens', entryFee: 40, duration: 2, description: 'Sprawling 55-acre terraced lawns founded in 1848, featuring a fossilized tree trunk.' },
      { name: 'Doddabetta Peak', entryFee: 10, duration: 1.5, description: 'Highest mountain in the Nilgiri Hills, offering panoramic telescope observatory views.' }
    ],
    adventures: [
      { name: 'Tea Factory & Chocolate Making Tour', cost: 150, type: 'Eco Culinary Tour', thrillLevel: 'Low' },
      { name: 'Pykara Lake Boating & Speedboat Ride', cost: 450, type: 'Water Activity', thrillLevel: 'Low' }
    ]
  },
  {
    id: 'maharashtra-mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'The City of Dreams and Endless Energy',
    category: 'Cultural Heritage',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80',
    description: 'Mumbai (formerly Bombay) is a sprawling metropolis, the financial capital of India, famous for colonial architecture, beaches, and Bollywood.',
    climate: 'Tropical (22°C - 33°C)',
    bestTime: 'October to March',
    popularity: 96,
    aliases: ['bombay', 'gateway of india', 'marinelines', 'marine drive'],
    routes: {
      delhi: {
        flight: { price: 2300, duration: '2h 00m', details: 'Highly frequent direct daily shuttles' },
        train: { price: 650, duration: '16h 00m', details: 'Mumbai Rajdhani Express' },
        bus: { price: 1400, duration: '24h 00m', details: 'AC Sleeper coaches daily' },
        cab: { price: 18000, duration: '22h 00m', details: 'Private sedan via national highway' }
      },
      mumbai: {
        flight: { price: 0, duration: '0h', details: 'Starting Hub Node' },
        train: { price: 0, duration: '0h', details: 'Starting Hub Node' },
        bus: { price: 0, duration: '0h', details: 'Starting Hub Node' },
        cab: { price: 0, duration: '0h', details: 'Starting Hub Node' }
      },
      bengaluru: {
        flight: { price: 2100, duration: '1h 30m', details: 'Direct daily flights' },
        train: { price: 500, duration: '18h 00m', details: 'Udyan Express' },
        bus: { price: 850, duration: '16h 00m', details: 'Volvo AC Sleeper overnight' },
        cab: { price: 12000, duration: '13h 00m', details: 'Private highway cab' }
      },
      kolkata: {
        flight: { price: 4200, duration: '2h 45m', details: 'Direct daily flights' },
        train: { price: 800, duration: '28h 00m', details: 'Gitanjali Express' },
        bus: { price: 2400, duration: '36h 00m', details: 'Requires regional connections' },
        cab: { price: 28000, duration: '30h 00m', details: 'Private long distance cab' }
      }
    },
    hotels: {
      budget: { name: 'Zostel Mumbai (Andheri)', price: 750, highlights: ['Centrally located in Metro hub', 'Cozy dorms & cafe', 'Free high-speed WiFi'] },
      midRange: { name: 'Fariyas Hotel (Colaba)', price: 4500, highlights: ['Walking distance from Gateway', 'Swimming pool & business lounge', 'Buffet dining'] },
      luxury: { name: 'The Taj Mahal Palace (Colaba)', price: 24000, highlights: ['Iconic 1903 architectural landmark', 'Overlooks the Gateway of India & sea', 'Butler service & Michelin-style dining'] }
    },
    dining: [
      { name: 'Bademiya (Colaba)', specialty: 'Mutton Seekh Kebabs & Chicken Baida Roti', type: 'Famous Late-Night Street Joint', cost: 450 },
      { name: 'Britannia & Co. Restaurant', specialty: 'Legendary Parsi Berry Pulav & Caramel Custard', type: 'Historic Parsi Cafe', cost: 600 },
      { name: 'Wasabi by Morimoto (Taj Palace)', specialty: 'Exquisite Japanese Sushi & Sashimi', type: 'Premium Fine Dining', cost: 4500 }
    ],
    attractions: [
      { name: 'Gateway of India', entryFee: 0, duration: 1, description: 'An iconic 1924 arch-monument built to commemorate the landing of King George V.' },
      { name: 'Marine Drive (Queen’s Necklace)', entryFee: 0, duration: 2, description: 'C-shaped concrete seaside promenade, sparkling with streetlights at night.' },
      { name: 'Elephanta Caves', entryFee: 300, duration: 4, description: 'UNESCO rock-cut cave temples dedicated to Shiva, accessed via a Colaba ferry.' }
    ],
    adventures: [
      { name: 'Dharavi Slum Guided Walking Tour', cost: 800, type: 'Social & Cultural Tour', thrillLevel: 'Low' },
      { name: 'Sanjay Gandhi National Park Cycle Trail', cost: 350, type: 'Eco Adventure', thrillLevel: 'Medium' }
    ]
  },
  {
    id: 'jammu-kashmir-srinagar',
    name: 'Srinagar',
    state: 'Jammu & Kashmir',
    tagline: 'The Heaven on Earth',
    category: 'Hill Station',
    image: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=800&q=80',
    description: 'Srinagar is the summer capital of Jammu & Kashmir, famous for houseboats on Dal Lake, Mughal gardens, and shikara rides.',
    climate: 'Cold (4°C - 22°C)',
    bestTime: 'April to October',
    popularity: 95,
    aliases: ['srinagar', 'dal lake', 'shikara', 'houseboat'],
    routes: {
      delhi: {
        flight: { price: 3800, duration: '1h 20m', details: 'Direct daily flights' },
        train: { price: 650, duration: '14h 00m', details: 'Train to Jammu Tawi, then shared cab' },
        bus: { price: 1400, duration: '20h 00m', details: 'AC Sleeper coaches via Jammu' },
        cab: { price: 14000, duration: '16h 00m', details: 'Private sedan highway' }
      },
      mumbai: {
        flight: { price: 6500, duration: '2h 45m', details: 'Direct / Connecting daily flights' },
        train: { price: 1100, duration: '32h 00m', details: 'Train to Delhi, then flight to Srinagar' },
        bus: { price: 2800, duration: '38h 00m', details: 'Requires Volvo connections' },
        cab: { price: 32000, duration: '34h 00m', details: 'Long distance private highway cab' }
      },
      bengaluru: {
        flight: { price: 7800, duration: '3h 15m', details: 'Direct / Connecting daily flights' },
        train: { price: 1400, duration: '44h 00m', details: 'Train to Delhi, then flight to Srinagar' },
        bus: { price: 3400, duration: '48h 00m', details: 'Multi-state bus routes' },
        cab: { price: 42000, duration: '42h 00m', details: 'Long distance highway taxi' }
      },
      kolkata: {
        flight: { price: 6900, duration: '3h 00m', details: 'Direct / Connecting daily flights' },
        train: { price: 1200, duration: '38h 00m', details: 'Train to Delhi, then flight to Srinagar' },
        bus: { price: 3000, duration: '44h 00m', details: 'Requires multi-city layovers' },
        cab: { price: 38000, duration: '38h 00m', details: 'Private long distance cab' }
      }
    },
    hotels: {
      budget: { name: 'Young Khuddoo Houseboat (Dal Lake)', price: 1200, highlights: ['Unique floating room experience', 'Views of the lake & lotus gardens', 'Free WiFi'] },
      midRange: { name: 'Hotel Grand Mumtaz', price: 4500, highlights: ['Central heating & carpeted rooms', 'Excellent Kashmiri buffet dining', 'Near Mughal Gardens'] },
      luxury: { name: 'The Lalit Grand Palace Srinagar', price: 22000, highlights: ['Former royal palace of Maharajas', 'Overlooks the spectacular Dal Lake', 'Heritage gardens & indoor heated pool'] }
    },
    dining: [
      { name: 'Mughal Darbar', specialty: 'Authentic Kashmiri Wazwan Feast (Rogan Josh, Rista)', type: 'Famous Local Diner', cost: 700 },
      { name: 'Ahdoo’s (Residency Road)', specialty: 'Kashmiri Mutton Seekh & Gustaba', type: 'Legacy Regional Restaurant', cost: 800 },
      { name: 'Chai Jaai Tea Room', specialty: 'Kashmiri Kahwa & Noon Chai with Bakarkhani', type: 'Artistic Riverside Tea Room', cost: 350 }
    ],
    attractions: [
      { name: 'Dal Lake & Floating Markets', entryFee: 0, duration: 3, description: 'Iconic lake famous for houseboats, shikara rides, and early morning floating vegetable markets.' },
      { name: 'Shalimar Bagh (Mughal Gardens)', entryFee: 20, duration: 2, description: 'Stunning terraced royal garden built by Mughal Emperor Jahangir for Noor Jahan in 1619.' },
      { name: 'Shankaracharya Temple', entryFee: 0, duration: 1.5, description: 'Ancient Shiva temple on a hilltop, offering panoramic views of Srinagar city and Dal Lake.' }
    ],
    adventures: [
      { name: 'Shikara Ride at Sunset', cost: 500, type: 'Boat Cruise', thrillLevel: 'Low' },
      { name: 'Indira Gandhi Tulip Garden Walk (Seasonal)', cost: 60, type: 'Flora Walk', thrillLevel: 'Low' }
    ]
  },
  {
    id: 'karnataka-hampi',
    name: 'Hampi',
    state: 'Karnataka',
    tagline: 'The Golden Ruins of the Vijayanagara Empire',
    category: 'Cultural Heritage',
    image: 'https://images.unsplash.com/photo-1600100397990-a4729bd084c8?auto=format&fit=crop&w=800&q=80',
    description: 'Hampi is a UNESCO World Heritage site featuring the spectacular ruins of the medieval Vijayanagara Empire set in a surreal boulder-strewn landscape.',
    climate: 'Dry (22°C - 35°C)',
    bestTime: 'October to March',
    popularity: 93,
    aliases: ['vijayanagara', 'ruins of hampi', 'stone chariot', 'virupaksha'],
    routes: {
      delhi: {
        flight: { price: 5800, duration: '2h 30m', details: 'Flight to Hubli (HBX) / Bengaluru, then private taxi' },
        train: { price: 850, duration: '32h 00m', details: 'Train to Hospet Junction (HPT)' },
        bus: { price: 2400, duration: '38h 00m', details: 'Requires multi-layover coaches' },
        cab: { price: 34000, duration: '36h 00m', details: 'Long distance private highway transfer' }
      },
      mumbai: {
        flight: { price: 4200, duration: '1h 30m', details: 'Flight to Hubli, then 3h drive to Hampi' },
        train: { price: 550, duration: '18h 00m', details: 'Train to Hospet Junction' },
        bus: { price: 1100, duration: '14h 00m', details: 'Direct AC Sleeper overnight' },
        cab: { price: 14000, duration: '12h 00m', details: 'Private highway cab' }
      },
      bengaluru: {
        flight: { price: 3200, duration: '1h 00m', details: 'Direct flights to Jindal Vijaynagar Airport (VDY)' },
        train: { price: 350, duration: '8h 00m', details: 'Hampi Express / Siddaganga Express' },
        bus: { price: 650, duration: '7h 30m', details: 'Direct AC Sleeper overnight coaches' },
        cab: { price: 6500, duration: '6h 30m', details: 'Private sedan via NH 50' }
      },
      kolkata: {
        flight: { price: 6500, duration: '2h 45m', details: 'Flight to Bengaluru, then private taxi' },
        train: { price: 1100, duration: '36h 00m', details: 'Train to Hospet Junction' },
        bus: { price: 2800, duration: '44h 00m', details: 'Requires regional connections' },
        cab: { price: 38000, duration: '38h 00m', details: 'Private long distance cab' }
      }
    },
    hotels: {
      budget: { name: 'Zostel Hampi', price: 550, highlights: ['Set on the peaceful Hippie Island side', 'Rooftop cafe with boulder views', 'Free WiFi'] },
      midRange: { name: 'Heritage Resort Hampi', price: 3800, highlights: ['Swimming pool & spa', 'Organic farm-to-table dining', 'Cottages in lush orchards'] },
      luxury: { name: 'Evolve Back Kamalapura Palace', price: 26000, highlights: ['Designed like a Vijayanagara Palace', 'Sprawling private pools & fort arches', 'Exclusive royal dining & spa'] }
    },
    dining: [
      { name: 'Mango Tree Restaurant', specialty: 'Traditional South Indian Veg Thali & Juices', type: 'Famous Garden Cafe', cost: 300 },
      { name: 'Laughing Buddha Cafe', specialty: 'Israeli Shakshuka & Wood-fired Pizzas', type: 'Rooftop Hippie Cafe', cost: 400 },
      { name: 'Tuluva Restaurant (Kamalapura)', specialty: 'Royal Vijayanagara Kingdom Thali', type: 'Fine Dining Palace', cost: 1200 }
    ],
    attractions: [
      { name: 'Virupaksha Temple', entryFee: 0, duration: 1.5, description: 'Active 7th-century Hindu temple dedicated to Shiva, featuring a massive 9-story gopuram.' },
      { name: 'Vittala Temple (Stone Chariot)', entryFee: 40, duration: 3, description: 'Incredible 16th-century temple ruins famous for its iconic Stone Chariot and musical pillars.' },
      { name: 'Lotus Mahal & Elephant Stables', entryFee: 40, duration: 2, description: 'Well-preserved royal structures reflecting a unique Indo-Islamic architectural style.' }
    ],
    adventures: [
      { name: 'Coracle Boat Ride in Tungabhadra River', cost: 400, type: 'Water Activity', thrillLevel: 'Medium' },
      { name: 'Sunrise Climb up Anjanadri Hill (Monkey Temple)', cost: 0, type: 'Trekking', thrillLevel: 'Medium' }
    ]
  },
  {
    id: 'sikkim-gangtok',
    name: 'Gangtok',
    state: 'Sikkim',
    tagline: 'The Serene Himalayan Ridge',
    category: 'Hill Station',
    image: 'https://images.unsplash.com/photo-1570737197414-aa4a2f8d39ff?auto=format&fit=crop&w=800&q=80',
    description: 'Gangtok is the capital of Sikkim, a clean and beautiful hilltop city offering panoramic views of Mount Kanchenjunga, monasteries, and cable cars.',
    climate: 'Alpine (10°C - 22°C)',
    bestTime: 'October to May',
    popularity: 91,
    aliases: ['gangtok', 'sikkim', 'mg road', 'rumtek'],
    routes: {
      delhi: {
        flight: { price: 5800, duration: '2h 10m', details: 'Flight to Bagdogra (IXB), then 4h taxi to Gangtok' },
        train: { price: 800, duration: '24h 00m', details: 'Train to New Jalpaiguri (NJP)' },
        bus: { price: 1600, duration: '30h 00m', details: 'Requires multi-layover coaches' },
        cab: { price: 22000, duration: '28h 00m', details: 'Private highway taxi' }
      },
      mumbai: {
        flight: { price: 7200, duration: '2h 45m', details: 'Flight to Bagdogra, then private taxi' },
        train: { price: 1100, duration: '34h 00m', details: 'Train to New Jalpaiguri' },
        bus: { price: 2800, duration: '40h 00m', details: 'Requires Volvo connections' },
        cab: { price: 32000, duration: '34h 00m', details: 'Private long distance taxi' }
      },
      bengaluru: {
        flight: { price: 7800, duration: '3h 00m', details: 'Flight to Bagdogra, then private taxi' },
        train: { price: 1300, duration: '40h 00m', details: 'Train to New Jalpaiguri' },
        bus: { price: 3200, duration: '48h 00m', details: 'Requires multi-city coaches' },
        cab: { price: 38000, duration: '42h 00m', details: 'Long distance highway taxi' }
      },
      kolkata: {
        flight: { price: 3400, duration: '1h 05m', details: 'Direct shuttle flights to Bagdogra' },
        train: { price: 350, duration: '9h 00m', details: 'Shatabdi Express to New Jalpaiguri' },
        bus: { price: 650, duration: '11h 00m', details: 'AC Sleeper daily overnight buses' },
        cab: { price: 8500, duration: '10h 00m', details: 'Private highway taxi via NH 10' }
      }
    },
    hotels: {
      budget: { name: 'Zostel Gangtok', price: 550, highlights: ['Backpacker vibe on a quiet ridge', 'Rooftop cafe with views', 'Free high-speed WiFi'] },
      midRange: { name: 'Hotel Summit Golden Crescent', price: 3200, highlights: ['Spacious AC rooms', 'Complimentary buffet breakfast', 'Near MG Road shopping'] },
      luxury: { name: 'Mayfair Spa Resort & Casino', price: 16500, highlights: ['Sprawling 15-acre forest estate', 'Sikkimese monastic palace design', 'Five-star casino, spa & pool'] }
    },
    dining: [
      { name: 'The Square (MG Road)', specialty: 'Steamed Pork Momos & Thukpa', type: 'Tibetan Diner', cost: 350 },
      { name: 'Cafe Live & Loud', specialty: 'Crispy Honey Chili Chicken & Cocktails', type: 'Music Live Pub', cost: 600 },
      { name: 'Rumtek Monastic Eatery', specialty: 'Traditional Sikkimese Gyathuk & Sha Phaley', type: 'Monasterial Diner', cost: 250 }
    ],
    attractions: [
      { name: 'Rumtek Monastery', entryFee: 10, duration: 2, description: 'Magnificent 16th-century Buddhist monastery, the seat of the Kagyu sect.' },
      { name: 'Tsomgo Lake & Nathula Pass', entryFee: 200, duration: 6, description: 'Glacial high-altitude lake at 12,400 ft, near the Indo-China border (Nathula Pass).' },
      { name: 'Gangtok Ropeway', entryFee: 110, duration: 1, description: 'Double-cable zig-zag ropeway cable car offering birds-eye views of Gangtok city.' }
    ],
    adventures: [
      { name: 'Yak Ride at Tsomgo Lake', cost: 450, type: 'Wildlife Activity', thrillLevel: 'Low' },
      { name: 'Teesta River White Water Rafting', cost: 1500, type: 'Water Sports', thrillLevel: 'High' }
    ]
  }
];

// 2. Compact database matrix representing 190+ popular destinations (Array of Arrays format)
// Format: [id, name, state, category, climate, bestTime, tagline, description, popularity, search_aliases]
const compactDestinations = [
  // Andhra Pradesh
  ['visakhapatnam', 'Visakhapatnam', 'Andhra Pradesh', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'October to March', 'The Jewel of the East Coast', 'A beautiful port city famous for its beaches, submarine museum, and scenic Kailasagiri hills.', 85, ['vizag', 'waltair']],
  ['tirupati', 'Tirupati', 'Andhra Pradesh', 'Religious & Spiritual', 'Warm (22°C - 35°C)', 'September to March', 'The Spiritual Capital of Andhra', 'Home to the world-famous Lord Venkateswara Temple atop the sacred Tirumala hills.', 98, ['tirumala', 'balaji', 'venkateswara']],
  ['araku-valley', 'Araku Valley', 'Andhra Pradesh', 'Hill Station', 'Cool (15°C - 25°C)', 'September to May', 'Ooty of Andhra', 'A gorgeous valley in the Eastern Ghats famous for coffee plantations, waterfalls, and caves.', 75, ['araku']],
  ['vijayawada', 'Vijayawada', 'Andhra Pradesh', 'Cultural Heritage', 'Humid (24°C - 35°C)', 'October to March', 'The Place of Victory', 'A bustling city on the Krishna River, famous for Kanaka Durga Temple and Undavalli caves.', 70, ['bezawada']],
  ['kurnool', 'Kurnool', 'Andhra Pradesh', 'Cultural Heritage', 'Warm (22°C - 35°C)', 'October to March', 'The Gateway to Rayalaseema', 'Famous for Konda Reddy Fort, Orvakal Rock Garden, and ancient temples.', 72, ['kurnool fort', 'orvakal']],
  ['lepakshi', 'Lepakshi', 'Andhra Pradesh', 'Cultural Heritage', 'Warm (20°C - 34°C)', 'October to March', 'The Historic Temple Village', 'Famous for the Veerabhadra Temple, hanging pillar, and the colossal monolithic Nandi.', 78, ['lepakshi temple', 'nandi']],
  
  // Arunachal Pradesh
  ['tawang', 'Tawang', 'Arunachal Pradesh', 'Hill Station', 'Cold (-2°C - 15°C)', 'March to June', 'The Land of Dawn-lit Mountains', 'Famous for the massive Tawang Monastery, alpine lakes, and the spectacular Sela Pass.', 82, ['tawang monastery']],
  ['ziro', 'Ziro', 'Arunachal Pradesh', 'Wildlife & Nature', 'Cool (10°C - 22°C)', 'March to October', 'A Valley of Music and Mist', 'A beautiful flat valley home to the Apatani tribe, famous for the Ziro Music Festival.', 78, ['ziro valley']],
  ['itanagar', 'Itanagar', 'Arunachal Pradesh', 'Cultural Heritage', 'Humid (18°C - 30°C)', 'October to April', 'The Capital in the Hills', 'The capital of Arunachal Pradesh, famous for the historical Ita Fort and Ganga Lake.', 65, []],
  ['bomdila', 'Bomdila', 'Arunachal Pradesh', 'Hill Station', 'Cold (5°C - 18°C)', 'April to October', 'Scenic Mountain Vistas', 'A charming town famous for its apple orchards, Buddhist monasteries, and views of Gorichen peak.', 62, []],
  ['pasighat', 'Pasighat', 'Arunachal Pradesh', 'Wildlife & Nature', 'Humid (18°C - 28°C)', 'October to April', 'The Gateway to Arunachal', 'The oldest town of the state, situated on the Siang River, famous for scenic hills.', 64, []],
  ['bhalukpong', 'Bhalukpong', 'Arunachal Pradesh', 'Adventure & Trekking', 'Cool (12°C - 24°C)', 'October to March', 'The Angling & Rafting Haven', 'Situated on the Kameng River, famous for white water rafting, angling, and orchid sanctuary.', 68, []],

  // Assam
  ['kaziranga', 'Kaziranga', 'Assam', 'Wildlife & Nature', 'Humid (18°C - 32°C)', 'November to April', 'Home of the One-Horned Rhino', 'A world-famous national park and UNESCO World Heritage site housing two-thirds of the world’s one-horned rhinos.', 90, ['kaziranga national park']],
  ['guwahati', 'Guwahati', 'Assam', 'Religious & Spiritual', 'Humid (20°C - 32°C)', 'October to April', 'Gateway to the Northeast', 'A major city on the Brahmaputra River, famous for the sacred Kamakhya Temple.', 80, ['gowhati']],
  ['majuli', 'Majuli Island', 'Assam', 'Wildlife & Nature', 'Humid (18°C - 30°C)', 'October to March', 'The Largest River Island in the World', 'A unique cultural and natural river island in the Brahmaputra River, famous for Neo-Vaishnavite satras.', 76, ['majuli']],
  ['tezpur', 'Tezpur', 'Assam', 'Cultural Heritage', 'Humid (20°C - 33°C)', 'October to April', 'The City of Eternal Romance', 'A beautiful city on the banks of Brahmaputra, rich in mythology and parks.', 68, []],
  ['jorhat', 'Jorhat', 'Assam', 'Cultural Heritage', 'Humid (18°C - 30°C)', 'October to March', 'The Tea Capital of Assam', 'Famous for tea research centers, historical monuments, and the Gymkhana Club.', 70, ['tea gardens']],
  ['sivasagar', 'Sivasagar', 'Assam', 'Cultural Heritage', 'Humid (18°C - 32°C)', 'October to March', 'The Land of Ahom Kings', 'Famous for grand monuments, temples, and massive tanks built by the historic Ahom dynasty.', 74, ['sibsagar', 'ahom']],

  // Bihar
  ['bodh-gaya', 'Bodh Gaya', 'Bihar', 'Religious & Spiritual', 'Warm (18°C - 32°C)', 'October to March', 'The Land of Buddha’s Enlightenment', 'The holiest Buddhist pilgrimage site where Lord Buddha attained enlightenment under the Bodhi Tree.', 88, ['bodhgaya', 'gaya']],
  ['nalanda', 'Nalanda', 'Bihar', 'Cultural Heritage', 'Warm (18°C - 35°C)', 'October to March', 'The Seat of Ancient Knowledge', 'Famous for the ruins of the ancient Nalanda University, a major learning center of antiquity.', 74, ['nalanda university']],
  ['patna', 'Patna', 'Bihar', 'Cultural Heritage', 'Humid (20°C - 35°C)', 'October to March', 'The Ancient City of Pataliputra', 'The capital of Bihar, boasting a rich history from Pataliputra and Emperor Ashoka’s reign.', 68, ['pataliputra']],
  ['rajgir', 'Rajgir', 'Bihar', 'Religious & Spiritual', 'Warm (15°C - 32°C)', 'October to March', 'The Valley of Hot Springs', 'A historic town famous for gridhrakuta hill, Japanese peace stupa, and natural hot water springs.', 70, []],
  ['vaishali', 'Vaishali', 'Bihar', 'Religious & Spiritual', 'Warm (18°C - 34°C)', 'October to March', 'The Ancient Republic', 'A sacred place for Buddhists and Jains, famous for Ashokan Pillar and Lord Buddha\'s last sermon site.', 70, ['ashokan pillar']],
  ['rajgir-ropeway', 'Rajgir Hill', 'Bihar', 'Adventure & Trekking', 'Warm (15°C - 32°C)', 'October to March', 'Scenic Peace Pagoda Ride', 'Famous for Vishwa Shanti Stupa, ropeway, and Cyclopean walls.', 72, ['shanti stupa']],

  // Chhattisgarh
  ['jagdalpur', 'Jagdalpur', 'Chhattisgarh', 'Wildlife & Nature', 'Warm (20°C - 32°C)', 'October to March', 'The Gateway to Bastar’s Wonders', 'Famous for the spectacular Chitrakote Falls (Niagara of India) and vibrant Bastar tribal culture.', 72, ['bastar', 'chitrakote']],
  ['raipur', 'Raipur', 'Chhattisgarh', 'Cultural Heritage', 'Warm (22°C - 36°C)', 'October to March', 'The Steel City Capital', 'The capital of Chhattisgarh, famous for historical temples, lakes, and terracotta museums.', 60, []],
  ['bilaspur', 'Bilaspur', 'Chhattisgarh', 'Cultural Heritage', 'Warm (20°C - 35°C)', 'October to March', 'The Rice Bowl Town', 'Famous for its high-quality aromatic Doobraj rice and ancient ruins of Ratanpur fort.', 58, []],
  ['mainpat', 'Mainpat', 'Chhattisgarh', 'Hill Station', 'Cool (14°C - 25°C)', 'September to May', 'The Shimla of Chhattisgarh', 'A beautiful hill station famous for its green pastures, deep valleys, and Tibetan settlement.', 68, ['tibetan settlement']],
  ['sirpur', 'Sirpur', 'Chhattisgarh', 'Cultural Heritage', 'Warm (20°C - 34°C)', 'October to March', 'The Ancient Temple Site', 'Famous for the 7th-century Laxman Temple, ancient Buddhist monasteries, and archeological ruins.', 70, ['laxman temple']],

  // Goa
  ['panaji', 'Panaji', 'Goa', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to February', 'The Charming Portuguese Capital', 'The capital of Goa, famous for the Latin Quarter (Fontainhas), churches, and river cruises.', 88, ['panjim', 'fontainhas']],
  ['calangute', 'Calangute', 'Goa', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to February', 'The Queen of Beaches', 'Goa’s most famous beach town, bustling with nightlife, water sports, and beach shacks.', 94, ['baga', 'calangute beach']],
  ['palolem', 'Palolem', 'Goa', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to February', 'The Scenic Paradise of South Goa', 'A beautiful crescent-shaped beach in South Goa, famous for its calm waters and silent discos.', 86, ['palolem beach']],
  ['margao', 'Margao', 'Goa', 'Cultural Heritage', 'Tropical (24°C - 32°C)', 'November to February', 'The Cultural Capital of Goa', 'A historic commercial center famous for Portuguese mansions, old municipal buildings, and markets.', 70, ['madgaon']],
  ['arambol', 'Arambol', 'Goa', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to February', 'The Hippie Beach Haven', 'A serene beach in North Goa famous for its bohemian vibe, drum circles, and sweet water lake.', 85, ['arambol beach']],
  ['vagator', 'Vagator', 'Goa', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to February', 'Dramatic Cliffs & Sunsets', 'Famous for red cliffs, Chapora Fort (Dil Chahta Hai fort), and vibrant beach clubs.', 90, ['vagator beach', 'chapora']],

  // Gujarat
  ['gir-national-park', 'Gir National Park', 'Gujarat', 'Wildlife & Nature', 'Warm (20°C - 35°C)', 'November to March', 'The Sanctuary of Asiatic Lions', 'The sole sanctuary in the world housing Asiatic lions, boasting rich forests and dry grasslands.', 88, ['sasan gir', 'gir']],
  ['rann-of-kutch', 'Rann of Kutch', 'Gujarat', 'Wildlife & Nature', 'Extreme (12°C - 35°C)', 'November to February', 'The Salt Desert of Gujarat', 'A breathtaking salt marsh desert in the Thar desert, famous for the Rann Utsav cultural festival.', 92, ['kutch', 'white desert']],
  ['dwarka', 'Dwarka', 'Gujarat', 'Religious & Spiritual', 'Warm (22°C - 32°C)', 'October to March', 'The Kingdom of Lord Krishna', 'One of the Char Dham pilgrimage sites, famous for the ancient Dwarkadhish Temple.', 89, ['dwarkadhish']],
  ['somnath', 'Somnath', 'Gujarat', 'Religious & Spiritual', 'Warm (22°C - 32°C)', 'October to March', 'The Eternal Somnath Temple', 'Famous for the magnificent shore temple, the first of the twelve sacred Jyotirlinga shrines of Lord Shiva.', 87, ['somnath temple']],
  ['ahmedabad', 'Ahmedabad', 'Gujarat', 'Cultural Heritage', 'Warm (22°C - 36°C)', 'October to March', 'The Heritage City', 'India’s first UNESCO World Heritage City, famous for Sabarmati Ashram and Adalaj stepwell.', 82, ['amdavad']],
  ['saputara', 'Saputara', 'Gujarat', 'Hill Station', 'Cool (16°C - 28°C)', 'March to November', 'The Abode of Serpents', 'A picturesque hill station in the Sahyadri range, famous for ropeways, lakes, and tribal culture.', 74, []],
  ['vadodara', 'Vadodara', 'Gujarat', 'Cultural Heritage', 'Warm (22°C - 35°C)', 'October to March', 'The Cultural Capital of Gujarat', 'Famous for the magnificent Laxmi Vilas Palace and rich heritage museums.', 80, ['baroda', 'laxmi vilas palace']],
  ['bhuj', 'Bhuj', 'Gujarat', 'Cultural Heritage', 'Extreme (15°C - 35°C)', 'October to March', 'Gateway to Kutch Heritage', 'Famous for Prag Mahal, Aina Mahal, and traditional Kutch handicraft villages.', 76, ['prag mahal']],

  // Haryana
  ['gurgaon', 'Gurgaon', 'Haryana', 'Cultural Heritage', 'Extreme (18°C - 36°C)', 'October to March', 'The Millennial Cyber City', 'A major corporate and urban hub famous for sky-scrapers, entertainment parks, and cyber hub dining.', 78, ['gurugram']],
  ['kurukshetra', 'Kurukshetra', 'Haryana', 'Religious & Spiritual', 'Warm (15°C - 32°C)', 'September to March', 'The Land of Mahabharata', 'The historical battlefield of Mahabharata and where Bhagavad Gita was delivered, famous for holy lakes.', 76, ['dharma kshetra']],
  ['panchkula', 'Panchkula', 'Haryana', 'Hill Station', 'Cool (12°C - 28°C)', 'September to March', 'Gateway to Pinjore Gardens', 'A planned satellite city famous for the Pinjore Gardens, cactus gardens, and proximity to Morni Hills.', 66, []],
  ['morni-hills', 'Morni Hills', 'Haryana', 'Hill Station', 'Cool (12°C - 26°C)', 'September to May', 'The Only Hill Station of Haryana', 'A peaceful hill station featuring lush green pine hills and scenic Tikkar Taal lakes.', 70, ['tikkar taal']],
  ['pinjore-gardens', 'Pinjore', 'Haryana', 'Cultural Heritage', 'Warm (15°C - 32°C)', 'October to March', 'The Mughal Gardens of Haryana', 'Famous for the historic Pinjore Gardens (Yadavindra Gardens) featuring terraced lawns.', 72, ['yadavindra gardens']],

  // Himachal Pradesh (Manali is seeded)
  ['shimla', 'Shimla', 'Himachal Pradesh', 'Hill Station', 'Cold (5°C - 20°C)', 'March to June', 'The Queen of Hills', 'Shimla is the capital of Himachal Pradesh, famous for its colonial architecture, Mall Road, and toy train.', 94, ['simla']],
  ['dharamshala', 'Dharamshala', 'Himachal Pradesh', 'Religious & Spiritual', 'Cool (8°C - 24°C)', 'March to July', 'The Little Lhasa', 'The home of Dalai Lama and Tibetan government in exile, surrounded by gorgeous deodar forests.', 88, ['mcleodganj', 'mcleod ganj']],
  ['kasol', 'Kasol', 'Himachal Pradesh', 'Adventure & Trekking', 'Cool (10°C - 22°C)', 'April to October', 'The Amsterdam of India', 'A scenic hamlet on the Parvati River, famous as a hub for backpackers and trek trailheads.', 86, ['parvati valley']],
  ['dalhousie', 'Dalhousie', 'Himachal Pradesh', 'Hill Station', 'Cold (4°C - 18°C)', 'March to June', 'Charming Colonial Retreat', 'Spans five hills, featuring old British mansions, churches, and spectacular views of Dhauladhar range.', 80, ['khajjiar']],
  ['spiti-valley', 'Spiti Valley', 'Himachal Pradesh', 'Adventure & Trekking', 'Cold (-5°C - 15°C)', 'June to September', 'The Middle Land', 'A high-altitude cold desert valley famous for ancient monasteries like Key and Tabo, and dramatic landscapes.', 84, ['spiti', 'kaza']],
  ['kasauli', 'Kasauli', 'Himachal Pradesh', 'Hill Station', 'Cool (8°C - 22°C)', 'March to November', 'The Cozy Colonial Cantonment', 'A serene hill town famous for pine paths, Gilbert Trail, and colonial-era churches.', 84, ['gilbert trail']],
  ['bir-billing', 'Bir Billing', 'Himachal Pradesh', 'Adventure & Trekking', 'Cool (10°C - 24°C)', 'March to June', 'The Paragliding Capital of India', 'World-famous paragliding takeoff and landing site, offering scenic Himalayan views.', 89, ['paragliding', 'bir']],

  // Jammu & Kashmir (Srinagar is seeded)
  ['gulmarg', 'Gulmarg', 'Jammu & Kashmir', 'Hill Station', 'Cold (-4°C - 15°C)', 'December to June', 'The Meadow of Flowers', 'Famed ski resort town boasting the highest golf course in the world and the spectacular Gulmarg Gondola.', 92, ['meadow of flowers']],
  ['pahalgam', 'Pahalgam', 'Jammu & Kashmir', 'Hill Station', 'Cold (2°C - 18°C)', 'March to November', 'The Valley of Shepherds', 'A scenic valley town on the Lidder River, famous for trout fishing, trekking, and Betaab Valley.', 89, ['valley of shepherds']],
  ['patnitop', 'Patnitop', 'Jammu & Kashmir', 'Hill Station', 'Cold (5°C - 20°C)', 'March to October', 'Serene Pine Forest Resort', 'A beautiful hilltop tourist location famous for walks, pine forests, and winter paragliding.', 72, []],
  ['katra', 'Katra', 'Jammu & Kashmir', 'Religious & Spiritual', 'Cool (10°C - 28°C)', 'March to October', 'The Gateway to Vaishno Devi', 'Bustling base town for the holy pilgrimage to Vaishno Devi temple on Trikuta hills.', 96, ['vaishno devi', 'trikuta']],
  ['sonamarg', 'Sonamarg', 'Jammu & Kashmir', 'Hill Station', 'Cold (2°C - 18°C)', 'April to October', 'The Meadow of Gold', 'A stunning alpine valley famous for Thajiwas Glacier and gateway to Amarnath Yatra.', 90, ['meadow of gold', 'thajiwas']],

  // Jharkhand
  ['ranchi', 'Ranchi', 'Jharkhand', 'Wildlife & Nature', 'Warm (18°C - 32°C)', 'September to March', 'The City of Waterfalls', 'Capital of Jharkhand, famous for lush forests, waterfalls like Dassam and Jonha, and hills.', 70, []],
  ['netarhat', 'Netarhat', 'Jharkhand', 'Hill Station', 'Cool (14°C - 24°C)', 'October to March', 'The Queen of Chotanagpur', 'A beautiful hill station famous for pine forests, cool climate, and gorgeous sunset points.', 66, []],
  ['deoghar', 'Deoghar', 'Jharkhand', 'Religious & Spiritual', 'Warm (18°C - 34°C)', 'October to March', 'Abode of the Gods', 'A major Hindu pilgrimage center housing the Baidyanath Jyotirlinga temple.', 82, ['baidyanath dham']],
  ['jamshedpur', 'Jamshedpur', 'Jharkhand', 'Cultural Heritage', 'Warm (22°C - 36°C)', 'October to March', 'The Steel City', 'India’s first planned industrial city, famous for Jubilee Park and Dimna Lake.', 68, ['tatanagar']],
  ['hazaribagh', 'Hazaribagh', 'Jharkhand', 'Wildlife & Nature', 'Warm (18°C - 32°C)', 'October to March', 'The City of a Thousand Gardens', 'Famous for its national park, lakes, and scenic Canary Hills.', 68, ['canary hills']],
  ['dhanbad', 'Dhanbad', 'Jharkhand', 'Cultural Heritage', 'Warm (20°C - 35°C)', 'October to March', 'The Coal Capital of India', 'Famous for coal mining heritage, Maithon Dam, and Kalyaneswari Temple.', 62, ['maithon']],

  // Karnataka (Hampi is seeded)
  ['mysore', 'Mysore', 'Karnataka', 'Cultural Heritage', 'Warm (20°C - 32°C)', 'October to March', 'The Palace City of India', 'The cultural capital of Karnataka, famous for the glittering Mysore Palace and Dussehra celebrations.', 92, ['mysuru']],
  ['coorg', 'Coorg', 'Karnataka', 'Hill Station', 'Cool (15°C - 25°C)', 'October to May', 'The Scotland of India', 'A scenic coffee-producing hill station famous for spice plantations, waterfalls, and Kodava culture.', 90, ['kodagu', 'madikeri']],
  ['chikmagalur', 'Chikmagalur', 'Karnataka', 'Hill Station', 'Cool (16°C - 26°C)', 'September to May', 'The Coffee Land of Karnataka', 'Nestled in the Mullayanagiri range, famous as the birthplace of coffee in India.', 84, ['chikkamagaluru']],
  ['gokarna', 'Gokarna', 'Karnataka', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to February', 'Sadhus, Sand, and Sun', 'A holy temple town that is also famous for pristine, untouched beaches like Om Beach.', 88, ['om beach']],
  ['bengaluru', 'Bengaluru', 'Karnataka', 'Cultural Heritage', 'Warm (18°C - 30°C)', 'October to March', 'The Garden Cyber City', 'The Silicon Valley of India, famous for lakes, parks like Lalbagh, and historic palaces.', 85, ['bangalore']],
  ['mangalore', 'Mangalore', 'Karnataka', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'October to March', 'The Coastal Cuisine Haven', 'Famous for pristine beaches, Mangaladevi temple, and delicious coastal ghee roast.', 80, ['mangaluru', 'panambur']],
  ['udupi', 'Udupi', 'Karnataka', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'October to March', 'The Temple & Cuisine Capital', 'Famous for the Krishna Temple, Malpe Beach, St. Mary\'s Island, and traditional Udupi cuisine.', 86, ['malpe', 'st marys island']],

  // Kerala (Munnar is seeded)
  ['alleppey', 'Alleppey', 'Kerala', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'November to February', 'Venice of the East', 'Famed for houseboat cruises along the tranquil backwaters, canals, and coconut lagoons.', 94, ['alappuzha', 'backwaters']],
  ['wayanad', 'Wayanad', 'Kerala', 'Hill Station', 'Cool (15°C - 26°C)', 'October to May', 'The Spice Garden Hill', 'A scenic highland district famous for spice plantations, waterfalls, and Edakkal Caves.', 88, ['kalpetta']],
  ['kochi', 'Kochi', 'Kerala', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'October to March', 'Queen of the Arabian Sea', 'A historic port town famous for Chinese fishing nets, Jewish Synagogue, and Fort Kochi.', 86, ['cochin', 'fort kochi']],
  ['thekkady', 'Thekkady', 'Kerala', 'Wildlife & Nature', 'Cool (18°C - 28°C)', 'October to March', 'The Spice & Elephant Country', 'Home to the Periyar National Park, famous for boat safaris, elephants, and tiger sightings.', 82, ['periyar']],
  ['kovalam', 'Kovalam', 'Kerala', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'November to February', 'The Paradise of South Kerala Beaches', 'A popular beach town famous for its crescent-shaped beaches and iconic red-and-white lighthouse.', 80, ['kovalam beach']],
  ['kumarakom', 'Kumarakom', 'Kerala', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'October to March', 'The Serene Vembanad Lake Resort', 'Famous for luxury backwater resorts, bird sanctuary, and houseboats on Vembanad Lake.', 88, ['vembanad']],
  ['varkala', 'Varkala', 'Kerala', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'October to March', 'The Red Cliffs by the Arabian Sea', 'Famous for its stunning cliff-side beach, mineral springs, and Janardhana Swamy Temple.', 88, ['varkala cliff', 'papanasam beach']],

  // Madhya Pradesh
  ['khajuraho', 'Khajuraho', 'Madhya Pradesh', 'Cultural Heritage', 'Warm (18°C - 34°C)', 'October to March', 'Symphony in Stone', 'A UNESCO World Heritage site famous for its medieval Hindu and Jain temples with erotic sculptures.', 88, ['khajuraho temples']],
  ['pachmarhi', 'Pachmarhi', 'Madhya Pradesh', 'Hill Station', 'Cool (14°C - 25°C)', 'October to June', 'Queen of Satpura', 'A beautiful hill station famous for waterfalls, colonial bungalows, and ancient Pandava Caves.', 82, ['satpura']],
  ['kanha', 'Kanha National Park', 'Madhya Pradesh', 'Wildlife & Nature', 'Warm (16°C - 32°C)', 'November to April', 'Mowgli’s Home in the Sal Forest', 'A premier tiger reserve, the inspiration behind Rudyard Kipling’s The Jungle Book.', 85, ['kanha']],
  ['bandhavgarh', 'Bandhavgarh', 'Madhya Pradesh', 'Wildlife & Nature', 'Warm (16°C - 32°C)', 'November to April', 'The Land of the Royal Bengal Tiger', 'A national park featuring the highest density of Royal Bengal Tigers in India.', 83, ['bandhavgarh national park']],
  ['gwalior', 'Gwalior', 'Madhya Pradesh', 'Cultural Heritage', 'Warm (18°C - 35°C)', 'October to March', 'The Pearl in the Forts of Hind', 'Famous for the magnificent hilltop Gwalior Fort, ancient temples, and rich musical heritage.', 78, ['gwalior fort']],
  ['indore', 'Indore', 'Madhya Pradesh', 'Cultural Heritage', 'Warm (18°C - 33°C)', 'October to March', 'The Street Food Capital of MP', 'India\'s cleanest city, famous for Rajwada Palace, Sarafa Bazar, and Chappan Dukan food street.', 84, ['rajwada', 'sarafa']],
  ['bhopal', 'Bhopal', 'Madhya Pradesh', 'Cultural Heritage', 'Warm (18°C - 34°C)', 'October to March', 'The City of Lakes', 'The capital of MP, famous for Upper Lake, Lower Lake, and proximity to Bhimbetka caves.', 80, ['bhimbetka', 'upper lake']],
  ['orchha', 'Orchha', 'Madhya Pradesh', 'Cultural Heritage', 'Warm (18°C - 34°C)', 'October to March', 'The Grand Medieval Capital', 'Famous for its grand forts, cenotaphs, and Raja Ram Temple along the Betwa River.', 82, ['orchha fort']],
  ['ujjain', 'Ujjain', 'Madhya Pradesh', 'Religious & Spiritual', 'Warm (18°C - 34°C)', 'October to March', 'The Holy City of Mahakal', 'A highly sacred city on the Shipra River, famous for the Mahakaleshwar Jyotirlinga temple.', 94, ['mahakal', 'shipra']],

  // Maharashtra (Mumbai is seeded)
  ['pune', 'Pune', 'Maharashtra', 'Cultural Heritage', 'Warm (18°C - 32°C)', 'October to March', 'Oxford of the East', 'A major IT and educational hub famous for Aga Khan Palace, Sinhagad Fort, and Maratha history.', 85, ['poona']],
  ['mahabaleshwar', 'Mahabaleshwar', 'Maharashtra', 'Hill Station', 'Cool (15°C - 25°C)', 'October to May', 'The Strawberry Capital', 'A picturesque hill station in the Western Ghats famous for strawberry farms and viewpoints.', 88, ['panchgani']],
  ['lonavala', 'Lonavala', 'Maharashtra', 'Hill Station', 'Cool (16°C - 26°C)', 'June to March', 'The Jewel of the Sahyadri', 'A popular weekend getaway famous for lush green valleys, waterfalls, and delicious chikki sweets.', 90, ['khandala']],
  ['alibaug', 'Alibaug', 'Maharashtra', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to February', 'The Beach Getaway of Mumbai', 'A coastal town famous for black sand beaches, Kolaba Fort, and coastal seafood joints.', 82, ['alibag']],
  ['matheran', 'Matheran', 'Maharashtra', 'Hill Station', 'Cool (16°C - 25°C)', 'October to May', 'Automobile-Free Eco Haven', 'Asia’s only automobile-free hill station, famous for its toy train, red clay paths, and viewpoints.', 84, ['matheran toy train']],
  ['aurangabad', 'Aurangabad', 'Maharashtra', 'Cultural Heritage', 'Warm (18°C - 34°C)', 'October to March', 'The City of Gates', 'Famous as the gateway to Ajanta and Ellora Caves, and home to Bibi Ka Maqbara (Mini Taj).', 80, ['sambhajinagar', 'bibi ka maqbara']],
  ['ajanta-ellora', 'Ajanta & Ellora', 'Maharashtra', 'Cultural Heritage', 'Warm (18°C - 34°C)', 'October to March', 'Masterpiece of Rock-Cut Architecture', 'UNESCO sites famous for Ellora’s monolithic Kailash Temple and Ajanta’s ancient Buddhist cave paintings.', 92, ['ellora', 'ajanta', 'kailash temple']],
  ['nashik', 'Nashik', 'Maharashtra', 'Religious & Spiritual', 'Warm (18°C - 32°C)', 'October to March', 'The Wine Capital of India', 'A holy city on the Godavari River, famous for the Kumbh Mela and sprawling vineyards.', 82, ['nasik', 'sula vineyards']],
  ['shirdi', 'Shirdi', 'Maharashtra', 'Religious & Spiritual', 'Warm (18°C - 34°C)', 'October to March', 'The Abode of Sai Baba', 'A highly revered pilgrimage town dedicated to the saint Sai Baba, attracting millions.', 95, ['sai baba']],
  ['panchgani', 'Panchgani', 'Maharashtra', 'Hill Station', 'Cool (15°C - 25°C)', 'October to May', 'The Five Hills Retreat', 'Famous for its tableland (second longest volcanic plateau in Asia), boarding schools, and strawberry gardens.', 85, ['table land']],

  // Manipur
  ['imphal', 'Imphal', 'Manipur', 'Cultural Heritage', 'Humid (16°C - 28°C)', 'October to April', 'The Valley of Scenic Splendor', 'Capital of Manipur, famous for Kangla Fort and the unique all-women Ima Keithel market.', 70, []],
  ['loktak-lake', 'Loktak Lake', 'Manipur', 'Wildlife & Nature', 'Humid (16°C - 28°C)', 'October to April', 'The Only Floating Lake in the World', 'Famous for its phumdis (floating islands) and the Keibul Lamjao National Park (home to Sangai deer).', 76, ['moirang', 'loktak']],
  ['ukhrul', 'Ukhrul', 'Manipur', 'Hill Station', 'Cool (14°C - 24°C)', 'October to May', 'The Land of Shirui Lily', 'A beautiful hill town famous for Shirui Lily (found only on Shirui Kashung peak) and limestone caves.', 65, ['shirui']],

  // Meghalaya
  ['shillong', 'Shillong', 'Meghalaya', 'Hill Station', 'Cool (12°C - 22°C)', 'March to November', 'The Scotland of the East', 'Capital of Meghalaya, famous for pine trees, waterfalls, music culture, and golf courses.', 88, ['scotland of the east']],
  ['cherrapunji', 'Cherrapunji', 'Meghalaya', 'Wildlife & Nature', 'Cool (12°C - 20°C)', 'October to May', 'The Wettest Place on Earth', 'Famous for its spectacular double-decker living root bridges and massive waterfalls.', 90, ['sohra', 'living root bridge']],
  ['dawki', 'Dawki', 'Meghalaya', 'Wildlife & Nature', 'Cool (14°C - 24°C)', 'November to February', 'The Crystal Clear River Haven', 'Famous for the Umngot River, boasting waters so crystal clear that boats seem to float in the air.', 84, ['umngot', 'dawki river']],
  ['mawlynnong', 'Mawlynnong', 'Meghalaya', 'Wildlife & Nature', 'Cool (14°C - 24°C)', 'October to April', 'The Cleanest Village in Asia', 'A picturesque village famous for its absolute cleanliness, living root bridge, and sky view point.', 86, ['cleanest village']],

  // Mizoram
  ['aizawl', 'Aizawl', 'Mizoram', 'Hill Station', 'Cool (14°C - 24°C)', 'October to April', 'The City on the Ridge', 'The hilltop capital of Mizoram, offering panoramic views of valleys, rich Mizo heritage, and crafts.', 68, []],
  ['champhai', 'Champhai', 'Mizoram', 'Hill Station', 'Cool (12°C - 24°C)', 'October to April', 'The Rice Bowl of Mizoram', 'A scenic border town offering views of Myanmar hills, vineyards, and lush valleys.', 62, []],

  // Nagaland
  ['kohima', 'Kohima', 'Nagaland', 'Cultural Heritage', 'Cool (12°C - 22°C)', 'October to May', 'The Home of the Hornbill Festival', 'Famous for the Hornbill Festival, World War II Cemetery, and rich Naga tribal culture.', 80, ['hornbill festival']],
  ['dimapur', 'Dimapur', 'Nagaland', 'Cultural Heritage', 'Humid (18°C - 30°C)', 'October to April', 'The Commercial Hub Gateway', 'The gateway of Nagaland, famous for ancient Kachari ruins and markets.', 64, []],
  ['mokokchung', 'Mokokchung', 'Nagaland', 'Cultural Heritage', 'Cool (12°C - 22°C)', 'October to April', 'The Cultural Center of Ao Nagas', 'A beautiful town famous for Ao Naga heritage, festivals, and scenic hills.', 68, []],

  // Odisha
  ['puri', 'Puri', 'Odisha', 'Religious & Spiritual', 'Humid (24°C - 32°C)', 'October to March', 'The Abode of Lord Jagannath', 'One of the Char Dham sites, famous for the Jagannath Temple, Rath Yatra, and golden beaches.', 90, ['jagannath puri']],
  ['konark', 'Konark', 'Odisha', 'Cultural Heritage', 'Humid (24°C - 32°C)', 'October to March', 'The Black Pagoda Sun Temple', 'Famous for the 13th-century Konark Sun Temple, built in the shape of a massive stone chariot.', 89, ['sun temple', 'black pagoda']],
  ['bhubaneswar', 'Bhubaneswar', 'Odisha', 'Cultural Heritage', 'Humid (22°C - 34°C)', 'October to March', 'The Temple City of India', 'Capital of Odisha, famous for the Lingaraj Temple, Udayagiri & Khandagiri Caves.', 80, ['temple city']],
  ['chilika-lake', 'Chilika Lake', 'Odisha', 'Wildlife & Nature', 'Humid (24°C - 32°C)', 'October to March', 'The Largest Coastal Lagoon', 'A massive brackish water lagoon, famous for Irrawaddy dolphins and migratory bird watching.', 78, ['chilka', 'dolphins']],
  ['cuttack', 'Cuttack', 'Odisha', 'Cultural Heritage', 'Humid (22°C - 34°C)', 'October to March', 'The Silver City', 'The former capital of Odisha, famous for silver filigree work, Barabati Fort, and Netaji birth museum.', 72, ['silver city', 'barabati']],

  // Punjab
  ['amritsar', 'Amritsar', 'Punjab', 'Religious & Spiritual', 'Extreme (15°C - 34°C)', 'October to March', 'The Golden City of Amritsar', 'Home to the spectacular Harmandir Sahib (Golden Temple), Jallianwala Bagh, and Wagah Border.', 96, ['golden temple', 'wagah border']],
  ['chandigarh', 'Chandigarh', 'Punjab', 'Cultural Heritage', 'Warm (16°C - 32°C)', 'October to March', 'The Beautiful Planned City', 'Designed by Le Corbusier, famous for Rock Garden, Sukhna Lake, and rose gardens.', 84, ['rock garden']],
  ['patiala', 'Patiala', 'Punjab', 'Cultural Heritage', 'Extreme (15°C - 34°C)', 'October to March', 'The Royal City of Gardens', 'Famous for royal palaces, Qila Mubarak, traditional turbans, and Punjabi juttis.', 70, ['qila mubarak']],
  ['ludhiana', 'Ludhiana', 'Punjab', 'Cultural Heritage', 'Extreme (15°C - 34°C)', 'October to March', 'The Manchester of India', 'A bustling industrial hub famous for hosiery, Maharaja Ranjit Singh War Museum, and parks.', 68, []],

  // Rajasthan (Jaipur is seeded)
  ['udaipur', 'Udaipur', 'Rajasthan', 'Cultural Heritage', 'Warm (18°C - 33°C)', 'October to March', 'The City of Lakes & Palaces', 'Famed for its romantic white palaces and serene lakes like Lake Pichola, known as the Venice of the East.', 94, ['lake pichola', 'city of lakes']],
  ['jaisalmer', 'Jaisalmer', 'Rajasthan', 'Cultural Heritage', 'Extreme (15°C - 36°C)', 'November to February', 'The Golden City in the Thar', 'Famous for the massive living Jaisalmer Fort, sandstone havelis, and camel sand dune safaris.', 90, ['golden city', 'sam sand dunes']],
  ['jodhpur', 'Jodhpur', 'Rajasthan', 'Cultural Heritage', 'Extreme (18°C - 35°C)', 'October to March', 'The Sun City in Blue', 'Famous for the massive Mehrangarh Fort and the blue-painted houses of the old city.', 89, ['blue city', 'mehrangarh']],
  ['mount-abu', 'Mount Abu', 'Rajasthan', 'Hill Station', 'Cool (14°C - 26°C)', 'October to May', 'The Oasis in the Desert', 'Rajasthan’s only hill station, famous for the stunning Dilwara Jain carving temples and Nakki Lake.', 82, ['dilwara']],
  ['pushkar', 'Pushkar', 'Rajasthan', 'Religious & Spiritual', 'Warm (18°C - 34°C)', 'October to March', 'The Sacred Lake Town', 'A holy lake town famous for the world’s rare Brahma Temple and the annual Pushkar Camel Fair.', 80, ['brahma temple']],
  ['ranthambore', 'Ranthambore', 'Rajasthan', 'Wildlife & Nature', 'Extreme (15°C - 35°C)', 'November to April', 'The Royal Tiger Reserve', 'Famed tiger reserve featuring historic fort ruins blending with lush forests.', 84, ['ranthambhor']],
  ['bikaner', 'Bikaner', 'Rajasthan', 'Cultural Heritage', 'Extreme (15°C - 36°C)', 'October to March', 'The Camel Country & Bhujia Hub', 'Famous for the magnificent Junagarh Fort, Karni Mata temple (rat temple), and bikaneri bhujia.', 84, ['junagarh', 'rat temple']],
  ['ajmer', 'Ajmer', 'Rajasthan', 'Religious & Spiritual', 'Warm (18°C - 34°C)', 'October to March', 'The Dargah Sharif Haven', 'Famous for the Ajmer Sharif Dargah of Sufi saint Moinuddin Chishti and Ana Sagar Lake.', 86, ['dargah sharif', 'ana sagar']],
  ['alwar', 'Alwar', 'Rajasthan', 'Cultural Heritage', 'Extreme (16°C - 35°C)', 'October to March', 'Gateway to Rajasthani Heritage', 'Famous for Bhangarh Fort (haunted fort), Bala Quila, and Sariska Tiger Reserve.', 78, ['bhangarh', 'sariska']],

  // Sikkim (Gangtok is seeded)
  ['pelling', 'Pelling', 'Sikkim', 'Hill Station', 'Cold (8°C - 20°C)', 'March to June', 'Panoramic Kanchenjunga Views', 'A beautiful town famous for the Pemayangtse Monastery and spectacular views of Mount Kanchenjunga.', 78, ['kanchenjunga']],
  ['lachung', 'Lachung', 'Sikkim', 'Hill Station', 'Cold (2°C - 16°C)', 'October to May', 'The Alpine Snow Haven', 'A scenic mountain village famous for apple orchards, hot springs, and Yumthang Valley.', 76, ['yumthang']],
  ['ravangla', 'Ravangla', 'Sikkim', 'Hill Station', 'Cold (5°C - 18°C)', 'September to May', 'The Buddha Park Vista', 'A beautiful town famous for the Buddha Park featuring a 130ft statue of Buddha.', 80, ['buddha park']],

  // Tamil Nadu (Ooty is seeded)
  ['kodaikanal', 'Kodaikanal', 'Tamil Nadu', 'Hill Station', 'Cool (12°C - 22°C)', 'September to May', 'The Princess of Hill Stations', 'Famous for its star-shaped Kodaikanal Lake, mist-covered valleys, and pine forests.', 88, ['princess of hills']],
  ['chennai', 'Chennai', 'Tamil Nadu', 'Beach & Coastal', 'Humid (24°C - 33°C)', 'November to February', 'Gateway to the South', 'The capital of Tamil Nadu, famous for Marina Beach, Dravidian temples, and Carnatic music.', 82, ['madras']],
  ['madurai', 'Madurai', 'Tamil Nadu', 'Religious & Spiritual', 'Warm (22°C - 35°C)', 'October to March', 'The Lotus City of South', 'One of India’s oldest continuously inhabited cities, famous for the Meenakshi Amman Temple.', 88, ['meenakshi temple']],
  ['rameswaram', 'Rameswaram', 'Tamil Nadu', 'Religious & Spiritual', 'Warm (22°C - 33°C)', 'October to March', 'The Bridge of Lord Rama', 'One of the Char Dham sites, famous for Ramanathaswamy Temple and Pamban Bridge.', 87, ['rameshwaram', 'pamban bridge']],
  ['kanyakumari', 'Kanyakumari', 'Tamil Nadu', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'October to March', 'The Meeting point of Three Oceans', 'The southernmost tip of India, famous for Vivekananda Rock Memorial and sunrises.', 86, ['cape comorin']],
  ['mahabalipuram', 'Mahabalipuram', 'Tamil Nadu', 'Cultural Heritage', 'Humid (24°C - 32°C)', 'November to February', 'The Shore Temple Carvings', 'A historic coastal town famous for UNESCO Shore Temples and monolithic rock carvings.', 80, ['mamallapuram']],
  ['coimbatore', 'Coimbatore', 'Tamil Nadu', 'Cultural Heritage', 'Warm (20°C - 32°C)', 'October to March', 'The Manchester of South India', 'Famous for textile industries, temples, and the colossal Adiyogi Shiva bust.', 82, ['kovai', 'adiyogi']],
  ['thanjavur', 'Thanjavur', 'Tamil Nadu', 'Cultural Heritage', 'Warm (22°C - 34°C)', 'October to March', 'The Temple of Chola Kings', 'Famous for the Brihadeeswarar Temple (UNESCO Big Temple) and traditional Tanjore paintings.', 88, ['tanjore', 'brihadeeswarar']],
  ['yercaud', 'Yercaud', 'Tamil Nadu', 'Hill Station', 'Cool (14°C - 25°C)', 'October to June', 'The Jewel of the South Hills', 'A beautiful hill station in the Shevaroy Hills, famous for coffee plantations and lakes.', 78, ['shevaroy']],
  ['kanchipuram', 'Kanchipuram', 'Tamil Nadu', 'Religious & Spiritual', 'Warm (22°C - 34°C)', 'October to March', 'The City of Thousand Temples', 'Famous for its magnificent Dravidian temples and world-renowned Kanchipuram silk sarees.', 84, ['conjeevaram', 'silk sarees']],

  // Telangana
  ['hyderabad', 'Hyderabad', 'Telangana', 'Cultural Heritage', 'Warm (20°C - 34°C)', 'October to March', 'The City of Pearls & Biryani', 'Famous for Charminar, Golconda Fort, and authentic Hyderabadi Biryani.', 92, ['charminar', 'bhagyanagar']],
  ['warangal', 'Warangal', 'Telangana', 'Cultural Heritage', 'Warm (20°C - 35°C)', 'October to March', 'The Seat of Kakatiya Kings', 'Famous for the Thousand Pillar Temple, Warangal Fort, and Ramappa Temple (UNESCO).', 74, ['ramappa']],
  ['nagarjuna-sagar', 'Nagarjuna Sagar', 'Telangana', 'Cultural Heritage', 'Warm (20°C - 35°C)', 'October to March', 'The Massive Masonry Dam', 'Famous for the massive dam on Krishna River and Buddhist excavations at Nagarjunakonda island.', 68, ['nagarjunakonda']],
  ['karimnagar', 'Karimnagar', 'Telangana', 'Cultural Heritage', 'Warm (20°C - 35°C)', 'October to March', 'The City of Silver Filigree', 'Famous for silver filigree art, Elgandal Fort, and temples.', 64, ['elgandal']],
  ['nizamabad', 'Nizamabad', 'Telangana', 'Cultural Heritage', 'Warm (20°C - 35°C)', 'October to March', 'The Fort City of Telangana', 'Famous for Nizamabad Fort, Alisagar gardens, and historical temples.', 60, []],

  // Tripura
  ['agartala', 'Agartala', 'Tripura', 'Cultural Heritage', 'Humid (18°C - 32°C)', 'October to March', 'The City of Ujjayanta Palace', 'Capital of Tripura, famous for the white Ujjayanta Palace and Neermahal water palace.', 66, ['ujjayanta']],
  ['unakoti', 'Unakoti', 'Tripura', 'Religious & Spiritual', 'Humid (18°C - 32°C)', 'October to March', 'The Lost Hill of Stone Carvings', 'Famous for massive rock-cut stone carvings of Shiva dating back to the 7th-9th centuries.', 72, ['unakoti carvings']],
  ['neermahal', 'Neermahal', 'Tripura', 'Cultural Heritage', 'Humid (18°C - 32°C)', 'October to March', 'The Lake Palace of Northeast', 'A spectacular royal water palace situated in the middle of Rudrasagar Lake.', 68, ['water palace']],
  ['udaipur-tripura', 'Udaipur', 'Tripura', 'Religious & Spiritual', 'Humid (18°C - 32°C)', 'October to March', 'The Lake City of Tripura', 'Famous for the sacred Tripura Sundari Temple (one of the 51 Shakti Peethas) and lakes.', 70, ['tripursundari', 'shakti peeth']],

  // Uttar Pradesh (Agra & Varanasi are seeded)
  ['ayodhya', 'Ayodhya', 'Uttar Pradesh', 'Religious & Spiritual', 'Warm (16°C - 32°C)', 'October to March', 'Birthplace of Lord Rama', 'A holy city on the Sarayu River, famous for the magnificent Ram Janmabhoomi Mandir.', 97, ['ram janmabhoomi', 'saket']],
  ['prayagraj', 'Prayagraj', 'Uttar Pradesh', 'Religious & Spiritual', 'Warm (16°C - 32°C)', 'October to March', 'The King of Pilgrimage Sites', 'Famous as the holy Triveni Sangam (meeting of Ganga, Yamuna, Saraswati) and Kumbh Mela.', 88, ['allahabad', 'sangam']],
  ['mathura', 'Mathura', 'Uttar Pradesh', 'Religious & Spiritual', 'Warm (16°C - 33°C)', 'October to March', 'The Birthplace of Lord Krishna', 'Home to the Krishna Janmasthan Temple and many ghats along the Yamuna River.', 86, ['mathura vrindavan']],
  ['vrindavan', 'Vrindavan', 'Uttar Pradesh', 'Religious & Spiritual', 'Warm (16°C - 33°C)', 'October to March', 'The Town of Thousand Temples', 'Famous for Krishna temples like Prem Mandir, Bankey Bihari, and holy forest groves.', 85, ['prem mandir']],
  ['lucknow', 'Lucknow', 'Uttar Pradesh', 'Cultural Heritage', 'Warm (18°C - 34°C)', 'October to March', 'The City of Nawabs', 'The capital of UP, famous for Awadhi cuisine, Bara Imambara, and chikan embroidery.', 80, ['nawabs', 'imambara']],
  ['noida', 'Noida', 'Uttar Pradesh', 'Cultural Heritage', 'Extreme (16°C - 36°C)', 'October to March', 'The Modern Cyber Hub of UP', 'Famous for clean parks, malls, and the Buddh International F1 Circuit.', 74, ['greater noida']],
  ['sarnath', 'Sarnath', 'Uttar Pradesh', 'Religious & Spiritual', 'Warm (16°C - 32°C)', 'October to March', 'The Sacred Buddhist Site', 'A peaceful town near Varanasi where Buddha gave his first sermon, featuring Dhamek Stupa.', 88, ['dhamek stupa']],

  // Uttarakhand
  ['rishikesh', 'Rishikesh', 'Uttarakhand', 'Adventure & Trekking', 'Cool (12°C - 28°C)', 'September to May', 'Yoga Capital of the World', 'Famed for Ganges white water rafting, yoga retreats, and Lakshman Jhula suspension bridge.', 93, ['yoga capital', 'laxman jhula']],
  ['haridwar', 'Haridwar', 'Uttarakhand', 'Religious & Spiritual', 'Cool (12°C - 28°C)', 'September to April', 'The Gateway to Gods', 'A holy city where the Ganges exits the Himalayas, famous for the Har Ki Pauri Ganga Aarti.', 92, ['har ki pauri']],
  ['nainital', 'Nainital', 'Uttarakhand', 'Hill Station', 'Cold (5°C - 22°C)', 'March to June', 'The Lake District of India', 'Set in a pear-shaped valley around Naini Lake, famous for boating, peaks, and weather.', 88, ['naini lake']],
  ['mussoorie', 'Mussoorie', 'Uttarakhand', 'Hill Station', 'Cold (4°C - 20°C)', 'March to June', 'The Queen of Hills', 'Overlooks the Doon Valley, famous for Kempty Falls, Mall Road, and viewpoints.', 87, ['kempty falls']],
  ['auli', 'Auli', 'Uttarakhand', 'Adventure & Trekking', 'Cold (-2°C - 15°C)', 'December to March', 'The Skiing Paradise of India', 'Famous for skiing slopes, oak forests, and spectacular panoramic views of Nanda Devi.', 84, ['skiing', 'nanda devi']],
  ['kedarnath', 'Kedarnath', 'Uttarakhand', 'Religious & Spiritual', 'Cold (-5°C - 12°C)', 'May to October', 'The Sacred Shrine of Shiva', 'One of the Char Dham temples, situated at 11,755 ft in the Garhwal Himalayas.', 96, ['kedarnath temple', 'char dham']],
  ['badrinath', 'Badrinath', 'Uttarakhand', 'Religious & Spiritual', 'Cold (-4°C - 15°C)', 'May to October', 'The Abode of Lord Vishnu', 'Sacred colorful temple on the Alaknanda River, part of the Char Dham pilgrimage.', 95, ['badrinath temple']],
  ['jim-corbett', 'Jim Corbett', 'Uttarakhand', 'Wildlife & Nature', 'Cool (14°C - 30°C)', 'November to May', 'The Realm of the Bengal Tiger', 'India’s oldest national park, famous for Royal Bengal Tigers and wild elephants.', 86, ['corbett', 'national park']],
  ['dehradun', 'Dehradun', 'Uttarakhand', 'Hill Station', 'Cool (10°C - 26°C)', 'March to June', 'The Doon Valley Capital', 'Capital of Uttarakhand, famous for Robber\'s Cave, Sahastradhara, and prestigious schools.', 84, ['robbers cave', 'sahastradhara']],
  ['ranikhet', 'Ranikhet', 'Uttarakhand', 'Hill Station', 'Cold (4°C - 20°C)', 'March to June', 'The Queen\'s Meadow', 'A serene cantonment hill station famous for pine paths and golf courses.', 80, ['chaubatia']],
  ['lansdowne', 'Lansdowne', 'Uttarakhand', 'Hill Station', 'Cold (4°C - 20°C)', 'March to November', 'The Quiet Pine Cantonment', 'A pristine and quiet hill station famous for pine forests, Bhulla Lake, and Tip-in-Top viewpoints.', 78, ['bhulla lake']],

  // West Bengal
  ['darjeeling', 'Darjeeling', 'West Bengal', 'Hill Station', 'Cold (4°C - 18°C)', 'March to June', 'Champagne of Teas', 'Famous for rolling tea gardens, the Toy Train (UNESCO), and sunrises over Kanchenjunga.', 92, ['darjeeling tea']],
  ['kolkata', 'Kolkata', 'West Bengal', 'Cultural Heritage', 'Humid (22°C - 33°C)', 'October to March', 'The City of Joy', 'Famous for colonial architecture like Victoria Memorial, rich literature, art, and Durga Puja.', 88, ['calcutta', 'victoria memorial']],
  ['sundarbans', 'Sundarbans', 'West Bengal', 'Wildlife & Nature', 'Humid (20°C - 32°C)', 'November to February', 'The Largest Mangrove Forest', 'A massive mangrove forest and UNESCO site housing the swimming Royal Bengal Tigers.', 84, ['sunderbans']],
  ['kalimpong', 'Kalimpong', 'West Bengal', 'Hill Station', 'Cool (12°C - 24°C)', 'March to June', 'Scenic Hill Orchards', 'Famous for orchid nurseries, old colonial buildings, and panoramic views of Teesta valley.', 76, []],
  ['digha', 'Digha', 'West Bengal', 'Beach & Coastal', 'Humid (22°C - 33°C)', 'October to March', 'The Weekend Beach Escape', 'A popular flat sea beach town famous for shallow waters, casuarina trees, and seafood.', 74, []],
  ['shantiniketan', 'Shantiniketan', 'West Bengal', 'Cultural Heritage', 'Humid (22°C - 33°C)', 'October to March', 'The Abode of Peace', 'Famous for Visva-Bharati University founded by Rabindranath Tagore, and local baul music.', 82, ['tagore', 'bolpur']],
  ['siliguri', 'Siliguri', 'West Bengal', 'Cultural Heritage', 'Humid (18°C - 32°C)', 'October to March', 'Gateway to the Eastern Himalayas', 'A bustling city acting as the transit hub for Darjeeling, Sikkim, and Bhutan.', 72, []],
  ['murshidabad', 'Murshidabad', 'West Bengal', 'Cultural Heritage', 'Humid (22°C - 33°C)', 'October to March', 'The Historic Nawab Capital', 'Famous for the grand Hazarduari Palace, Katra Mosque, and rich history of Bengal Nawabs.', 76, ['hazarduari']],

  // UTs (Andaman, Lakshadweep, Puducherry, Delhi)
  ['havelock-island', 'Havelock Island', 'Andaman & Nicobar Islands', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to April', 'Pristine White Sands & Corals', 'Famous for Radhanagar Beach (one of Asia’s best beaches), scuba diving, and clear waters.', 90, ['swaraj dweep', 'radhanagar beach']],
  ['port-blair', 'Port Blair', 'Andaman & Nicobar Islands', 'Cultural Heritage', 'Tropical (24°C - 32°C)', 'October to May', 'The Cellular Jail Memorial', 'Capital of Andaman, famous for the historic Cellular Jail, naval museums, and Corbyn’s Cove.', 82, ['cellular jail']],
  ['neil-island', 'Neil Island', 'Andaman & Nicobar Islands', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to April', 'The Vegetable Bowl island', 'Famous for Bharatpur beach, natural rock bridges, and relaxing organic farms.', 78, ['shaheed dweep']],
  ['kavaratti', 'Kavaratti', 'Lakshadweep', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to March', 'The Coral Lagoon Paradise', 'Capital of Lakshadweep, famous for white sand beaches, lagoons, and snorkeling.', 80, ['lakshadweep islands']],
  ['bangaram-island', 'Bangaram Island', 'Lakshadweep', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to March', 'The Uninhabited Beach Paradise', 'A breathtaking teardrop-shaped uninhabited island famous for coral reefs and blue lagoons.', 84, ['bangaram']],
  ['minicoy', 'Minicoy Island', 'Lakshadweep', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to March', 'The Southernmost Atoll', 'Famous for Maldivian culture, tuna canning, and an iconic British-built lighthouse.', 76, ['maliku']],
  ['pondicherry', 'Pondicherry', 'Puducherry', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'November to February', 'The French Riviera of the East', 'A charming seaside town famous for the French Quarter, Auroville, and rocky beaches.', 88, ['puducherry', 'auroville']],
  ['new-delhi', 'New Delhi', 'Delhi', 'Cultural Heritage', 'Extreme (16°C - 36°C)', 'October to March', 'The Capital Hub of India', 'The capital of India, famous for historic icons like India Gate, Qutub Minar, and Red Fort.', 90, ['delhi', 'india gate']],
  ['old-delhi', 'Old Delhi', 'Delhi', 'Cultural Heritage', 'Extreme (16°C - 36°C)', 'October to March', 'The Culinary Heritage Streets', 'Famous for Red Fort, Jama Masjid, and historic street-food alleys of Chandni Chowk.', 88, ['chandini chowk', 'jama masjid']],
  ['daman', 'Daman', 'Dadra & Nagar Haveli and Daman & Diu', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to February', 'Forts and Shorelines', 'Famous for Portuguese forts, Devka Beach, and cheap tax-free shopping.', 70, []],
  ['diu', 'Diu', 'Dadra & Nagar Haveli and Daman & Diu', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to February', 'The Quiet Island Retreat', 'A peaceful island famous for Diu Fort, Naida Caves, and clean sandy beaches.', 78, ['naida caves']],
  ['silvassa', 'Silvassa', 'Dadra & Nagar Haveli and Daman & Diu', 'Wildlife & Nature', 'Warm (20°C - 32°C)', 'November to March', 'The Portuguese Woodland Haven', 'Capital of Dadra & Nagar Haveli, famous for deer parks, lakes, and tribal heritage museums.', 66, []],
  ['kargil', 'Kargil', 'Ladakh', 'Adventure & Trekking', 'Cold (-15°C - 12°C)', 'June to September', 'The Land of War Memorials', 'A historic town famous for the Kargil War Memorial, Suru Valley trekking, and apricot orchards.', 78, ['kargil war memorial']],
  ['nubra-valley', 'Nubra Valley', 'Ladakh', 'Adventure & Trekking', 'Cold Desert (-10°C - 15°C)', 'June to September', 'The Valley of Double-Humped Camels', 'A high-altitude desert valley famous for Diskit Monastery and double-humped Bactrian camels.', 88, ['nubra', 'diskit']],
  ['pangong-lake', 'Pangong Lake', 'Ladakh', 'Wildlife & Nature', 'Cold Desert (-15°C - 10°C)', 'June to September', 'The Deep Blue Trans-Himalayan Lake', 'A breathtaking high-altitude endorheic lake stretching from India to China, famous for its changing colors.', 92, ['pangong', 'pangong tso']],
  ['dras', 'Dras', 'Ladakh', 'Adventure & Trekking', 'Extreme Cold (-25°C - 10°C)', 'June to September', 'The Gateway to Ladakh & Coldest Place', 'Famed as the second coldest inhabited place in the world and gateway to Ladakh.', 70, ['dras valley']],
  ['karaikal', 'Karaikal', 'Puducherry', 'Beach & Coastal', 'Humid (24°C - 32°C)', 'November to February', 'The Coastal Temple Town', 'An enclave of Puducherry UT, famous for sandy beaches and the Sanipeyarchi Temple.', 68, []],
  ['diu-beach', 'Ghoghla Beach', 'Dadra & Nagar Haveli and Daman & Diu', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to February', 'Pristine Blue Flag Waters', 'A clean Blue Flag certified beach in Diu, famous for water sports and golden sand.', 76, ['ghoghla']],
  ['silvassa-deer', 'Khanvel', 'Dadra & Nagar Haveli and Daman & Diu', 'Wildlife & Nature', 'Warm (20°C - 32°C)', 'November to March', 'The Quiet Forest Retreat', 'A scenic spot near Silvassa famous for deer parks, butterflies, and green hills.', 65, []],
  ['agatti-island', 'Agatti Island', 'Lakshadweep', 'Beach & Coastal', 'Tropical (24°C - 32°C)', 'November to March', 'The Coral runway gateway', 'Famous for its spectacular airport runway on a narrow strip of land and gorgeous lagoons.', 86, ['agatti']]
];

// Helper mapping for regional state dishes to keep dining extremely realistic
const STATE_FOODS = {
  'Goa': { street: 'Fish Cutlet & Pao', thali: 'Traditional Seafood Thali', premium: 'Kingfish Recheado & Feni' },
  'Rajasthan': { street: 'Pyaaz Kachori & Mirchi Bada', thali: 'Dal Baati Churma Royal Feast', premium: 'Mutton Laal Maas' },
  'Himachal Pradesh': { street: 'Siddu with Ghee', thali: 'Traditional Himachali Dham', premium: 'Chha Gosht (Mutton)' },
  'Uttarakhand': { street: 'Aloo Ke Gutke', thali: 'Kumaoni Thali (Bhatt ki Churkani)', premium: 'Chainsoo & Phaanu' },
  'Uttar Pradesh': { street: 'Kachori Sabzi & Jalebi', thali: 'Braj Satvik Thali', premium: 'Awadhi Dum Biryani' },
  'Punjab': { street: 'Amritsari Kulcha & Lassi', thali: 'Makki di Roti & Sarson da Saag', premium: 'Butter Chicken & Naan' },
  'West Bengal': { street: 'Puchka & Mughlai Kathi Roll', thali: 'Authentic Bengali Fish Thali', premium: 'Kosha Manglo & Luchi' },
  'Jammu & Kashmir': { street: 'Kashmiri Tujji (Barbeque)', thali: 'Traditional Kashmiri Wazwan Feast', premium: 'Rogan Josh & Gustaba' },
  'Karnataka': { street: 'Mysore Masala Dosa & Idli', thali: 'South Karnataka Ragi Mudde Oota', premium: 'Coorg Pandi Curry' },
  'Kerala': { street: 'Banana Chips & Parippu Vada', thali: 'Kerala Sadya on Banana Leaf', premium: 'Malabar Prawn Curry & Appam' },
  'Tamil Nadu': { street: 'Kothu Parotta & Filter Coffee', thali: 'Detailed Chettinad Meals', premium: 'Chettinad Pepper Chicken' },
  'Andhra Pradesh': { street: 'Punugulu & Mirchi Bajji', thali: 'Spicy Andhra Bhojanam', premium: 'Gongura Mutton Curry' },
  'Telangana': { street: 'Irani Chai & Osmania Biscuits', thali: 'Telangana Spiced Meals', premium: 'Hyderabadi Mutton Biryani' },
  'Gujarat': { street: 'Khaman Dhokla & Fafda Jalebi', thali: 'Unlimited Sweet Gujarati Thali', premium: 'Gujarati Kadhi & Undhiyu' },
  'Assam': { street: 'Pitha & Khar', thali: 'Traditional Assamese Thali', premium: 'Duck Meat Curry with Ash Gourd' },
  'Meghalaya': { street: 'Doh Khlieh & Jadoh', thali: 'Khasi Traditional Meal', premium: 'Pork Jadoh & Tungrymbai' },
  'Sikkim': { street: 'Steamed Momos & Thukpa', thali: 'Sikkimese Traditional Meal', premium: 'Gyathuk & Sha Phaley' },
  'Odisha': { street: 'Dahi Bara Aloo Dum', thali: 'Odisha Veg/Seafood Thali', premium: 'Dalma & Chhena Poda' },
  'Bihar': { street: 'Litti Chokha & Sattu Paratha', thali: 'Bihari Vegetarian Thali', premium: 'Bihari Fish Curry' }
};

// 3. Programmatic Profile Generator Engine
const buildDestinationProfile = (row) => {
  const d = {
    id: row[0],
    name: row[1],
    state: row[2],
    category: row[3],
    climate: row[4],
    bestTime: row[5],
    tagline: row[6],
    description: row[7],
    popularity: row[8],
    aliases: row[9]
  };

  // Region-based transport calculations (high-fidelity distance scaling)
  const reg = d.state.toLowerCase();
  const isNorth = ['himachal pradesh', 'uttarakhand', 'jammu & kashmir', 'ladakh', 'punjab', 'haryana', 'delhi'].some(s => reg.includes(s));
  const isSouth = ['kerala', 'tamil nadu', 'karnataka', 'andhra pradesh', 'telangana', 'puducherry', 'lakshadweep'].some(s => reg.includes(s));
  const isEast = ['west bengal', 'sikkim', 'assam', 'meghalaya', 'arunachal pradesh', 'manipur', 'mizoram', 'nagaland', 'tripura', 'odisha', 'bihar', 'jharkhand', 'andaman & nicobar islands'].some(s => reg.includes(s));

  // Base flight/train pricing based on geography
  const routes = {
    delhi: {
      flight: { price: isNorth ? 3200 : isSouth ? 5200 : 4500, duration: isNorth ? '1h 15m' : isSouth ? '2h 45m' : '2h 15m', details: 'Direct / Connecting daily flights' },
      train: { price: isNorth ? 400 : isSouth ? 950 : 700, duration: isNorth ? '8h 00m' : isSouth ? '28h 00m' : '18h 00m', details: 'Superfast Express connectivity' },
      bus: { price: isNorth ? 850 : isSouth ? 2200 : 1400, duration: isNorth ? '9h 30m' : isSouth ? '30h 00m' : '20h 00m', details: 'Volvo AC Sleeper services' },
      cab: { price: isNorth ? 6500 : isSouth ? 28000 : 16000, duration: isNorth ? '8h 30m' : isSouth ? '28h 00m' : '16h 00m', details: 'Private sedan highway transfer' }
    },
    mumbai: {
      flight: { price: isSouth ? 3800 : isNorth ? 5500 : 4200, duration: isSouth ? '1h 45m' : isNorth ? '2h 30m' : '2h 00m', details: 'Direct daily shuttle flights' },
      train: { price: isSouth ? 650 : isNorth ? 950 : 700, duration: isSouth ? '16h 00m' : isNorth ? '26h 00m' : '18h 00m', details: 'Direct Superfast Express' },
      bus: { price: isSouth ? 1100 : isNorth ? 2200 : 1200, duration: isSouth ? '14h 00m' : isNorth ? '28h 00m' : '18h 00m', details: 'AC Sleeper overnight coaches' },
      cab: { price: isSouth ? 12000 : isNorth ? 25000 : 14000, duration: isSouth ? '12h 00m' : isNorth ? '26h 00m' : '15h 00m', details: 'Private highway cab' }
    },
    bengaluru: {
      flight: { price: isSouth ? 2500 : isNorth ? 6200 : 4600, duration: isSouth ? '1h 10m' : isNorth ? '3h 00m' : '2h 15m', details: 'Direct daily flights' },
      train: { price: isSouth ? 450 : isNorth ? 1100 : 850, duration: isSouth ? '10h 00m' : isNorth ? '34h 00m' : '22h 00m', details: 'Daily express trains' },
      bus: { price: isSouth ? 750 : isNorth ? 2400 : 1500, duration: isSouth ? '10h 00m' : isNorth ? '36h 00m' : '22h 00m', details: 'Volvo luxury sleeper coaches' },
      cab: { price: isSouth ? 7500 : isNorth ? 30000 : 18000, duration: isSouth ? '9h 00m' : isNorth ? '32h 00m' : '20h 00m', details: 'Private sedan highway' }
    },
    kolkata: {
      flight: { price: isEast ? 3100 : isNorth ? 5800 : 4900, duration: isEast ? '1h 15m' : isNorth ? '2h 45m' : '2h 30m', details: 'Daily flights' },
      train: { price: isEast ? 420 : isNorth ? 1000 : 800, duration: isEast ? '10h 00m' : isNorth ? '30h 00m' : '24h 00m', details: 'Daily superfast trains' },
      bus: { price: isEast ? 800 : isNorth ? 2400 : 1600, duration: isEast ? '10h 00m' : isNorth ? '32h 00m' : '24h 00m', details: 'Regional sleeper coaches' },
      cab: { price: isEast ? 7000 : isNorth ? 28000 : 18000, duration: isEast ? '9h 00m' : isNorth ? '30h 00m' : '22h 00m', details: 'Private highway taxi' }
    }
  };

  // Image assets based on category
  const categoryImages = {
    'Beach & Coastal': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'Hill Station': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    'Religious & Spiritual': 'https://images.unsplash.com/photo-1600100397990-a4729bd084c8?auto=format&fit=crop&w=800&q=80',
    'Cultural Heritage': 'https://images.unsplash.com/photo-1590050244151-eefc28c10de5?auto=format&fit=crop&w=800&q=80',
    'Wildlife & Nature': 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80',
    'Adventure & Trekking': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  };
  const image = categoryImages[d.category] || 'https://images.unsplash.com/photo-1477584322902-471a53b474b7?auto=format&fit=crop&w=800&q=80';

  // Accommodations packages mapping
  const hotels = {
    budget: { name: `${d.name} Backpackers Lodge`, price: 600, highlights: ['Clean dorm beds', 'Friendly local guide host', 'Free high-speed WiFi'] },
    midRange: { name: `Hotel ${d.name} Residency`, price: 2800, highlights: ['Spacious AC rooms', 'Complimentary buffet breakfast', 'Near transit terminals'] },
    luxury: { name: `The Royal Palace ${d.name}`, price: 8500, highlights: ['Sprawling heritage garden estate', 'In-house luxury spa & pool', 'Fine-dining multi-cuisine restaurant'] }
  };

  // State-specific traditional dining options
  const foods = STATE_FOODS[d.state] || { street: 'Street Food Junction', thali: 'Traditional Regional Thali', premium: 'The Grand Royal Restaurant' };
  const dining = [
    { name: `Street Food Junction (${d.name})`, specialty: foods.street, type: 'Street Food', cost: 150 },
    { name: `${d.name} Heritage Diner`, specialty: foods.thali, type: 'Mid-Range', cost: 600 },
    { name: `The Grand Royal Restaurant`, specialty: foods.premium, type: 'Fine Dining', cost: 1500 }
  ];

  // Category-specific activities
  let attractions = [];
  let adventures = [];

  if (d.category === 'Religious & Spiritual') {
    attractions = [
      { name: `${d.name} Holy Shrine`, entryFee: 0, duration: 2, description: `Ancient, highly revered historical temple in ${d.name} showcasing gorgeous architecture.` },
      { name: `${d.name} River Ghats`, entryFee: 0, duration: 1.5, description: `Serene bathing ghats perfect for peaceful evening walks and experiencing the Ganga Aarti.` },
      { name: `Local Heritage Market`, entryFee: 0, duration: 3, description: `Stroll through colorful local markets of ${d.name} and buy traditional puja items and crafts.` }
    ];
    adventures = [
      { name: 'Spiritual Guided Walk & Aarti', cost: 200, type: 'Spiritual Walk', thrillLevel: 'Low' },
      { name: 'Traditional Yoga Session', cost: 500, type: 'Yoga & Wellness', thrillLevel: 'Low' }
    ];
  } else if (d.category === 'Hill Station' || d.category === 'Adventure & Trekking') {
    attractions = [
      { name: `${d.name} Panoramic Viewpoint`, entryFee: 20, duration: 1.5, description: `Offers stunning 360-degree views of the surrounding snow-capped mountain ranges.` },
      { name: `${d.name} Forest Reserves & Waterfalls`, entryFee: 50, duration: 3, description: `Scenic nature trails through pine and deodar forests leading to a dramatic waterfall.` },
      { name: `Local Craft & Shopping Mall`, entryFee: 0, duration: 2, description: `Bustling ridge walking street with local wooden craft stalls and cozy cafes.` }
    ];
    adventures = [
      { name: 'Guided Mountain Trekking', cost: 1200, type: 'Trekking', thrillLevel: 'Medium' },
      { name: 'Tandem Paragliding Experience', cost: 3200, type: 'Aviation Sport', thrillLevel: 'High' }
    ];
  } else if (d.category === 'Beach & Coastal') {
    attractions = [
      { name: `${d.name} Golden Beach`, entryFee: 0, duration: 3, description: `Stunning sandy beach with clean waters, perfect for sunbathing and evening sunsets.` },
      { name: `${d.name} Marine Sunset Viewpoint`, entryFee: 0, duration: 1.5, description: `Spectacular rocky cliff overlooking the ocean, famous for photography.` },
      { name: `Portuguese Lighthouse Ruins`, entryFee: 20, duration: 2, description: `Historic lighthouse ruins offering beautiful views of the coastal line.` }
    ];
    adventures = [
      { name: 'Scuba Diving & Coral Safari', cost: 2800, type: 'Water Sports', thrillLevel: 'High' },
      { name: 'Jet Ski & Banana Boat Ride', cost: 800, type: 'Water Sports', thrillLevel: 'Medium' }
    ];
  } else if (d.category === 'Wildlife & Nature') {
    attractions = [
      { name: `${d.name} National Park Safari`, entryFee: 350, duration: 4, description: `Famed national park housing rare species of animals and birds in their native habitat.` },
      { name: `${d.name} Nature Interpretation Center`, entryFee: 20, duration: 1.5, description: `Modern museum educating visitors on local biodiversity and ecology.` },
      { name: `Scenic River Lake Watch`, entryFee: 50, duration: 2, description: `Quiet lake banks ideal for migratory bird watching and evening photography.` }
    ];
    adventures = [
      { name: 'Jeep Tiger Safari', cost: 2500, type: 'Wildlife Safari', thrillLevel: 'High' },
      { name: 'Nature Forest Guided Walk', cost: 600, type: 'Eco Tour', thrillLevel: 'Low' }
    ];
  } else {
    attractions = [
      { name: `${d.name} Heritage Fort`, entryFee: 100, duration: 2.5, description: `Historic fortress reflecting traditional Indian architecture, weapons, and paintings.` },
      { name: `${d.name} Royal Gardens`, entryFee: 30, duration: 1.5, description: `Well-maintained Mughal or regional royal gardens with fountains and pavilions.` },
      { name: `Traditional Craft Bazaars`, entryFee: 0, duration: 3, description: `Vibrant handicraft market famous for traditional textiles, jewelry, and pottery.` }
    ];
    adventures = [
      { name: 'Local Heritage Guided Tour', cost: 500, type: 'Cultural Tour', thrillLevel: 'Low' },
      { name: 'Traditional Cooking Class', cost: 1200, type: 'Culinary Class', thrillLevel: 'Medium' }
    ];
  }

  // Set default aliases if not provided
  const aliases = d.aliases && d.aliases.length > 0 ? d.aliases : [d.name.toLowerCase()];

  return {
    id: d.id,
    name: d.name,
    state: d.state,
    tagline: d.tagline || `Explore the hidden beauty of ${d.name}`,
    category: d.category,
    image,
    description: d.description || `A stunning travel destination in ${d.state}, India, offering a blend of cultural landmarks, scenic points, and historical wonders.`,
    climate: d.climate,
    bestTime: d.bestTime,
    routes,
    hotels,
    dining,
    attractions,
    adventures,
    search_aliases: aliases,
    popularity_score: d.popularity || 50
  };
};

const seedDB = async () => {
  try {
    console.log('PostgreSQL Seeder Audit Starting (200+ Destinations Upgrade)...');
    
    // 1. Clear existing records in child-to-parent order
    console.log('Clearing old database records...');
    await pool.query('DELETE FROM saved_trips');
    await pool.query('DELETE FROM destinations');
    console.log('Database cleared.');

    // 2. Map generated profiles for the compact list
    console.log(`Generating travel profiles for ${compactDestinations.length} compact destinations...`);
    const generatedDestinations = compactDestinations.map(buildDestinationProfile);

    // 3. Merge BOTH arrays into the final consolidated seeding array
    const allDestinations = [
      ...premiumDestinations,
      ...generatedDestinations
    ];

    // Audit Logging
    console.log('--- DATABASE SEED AUDIT REPORT ---');
    console.log(`* premiumDestinations count   : ${premiumDestinations.length}`);
    console.log(`* compactDestinations count   : ${compactDestinations.length}`);
    console.log(`* generatedDestinations count : ${generatedDestinations.length}`);
    console.log(`* final allDestinations count : ${allDestinations.length}`);
    console.log('----------------------------------');

    console.log(`Ready to seed ${allDestinations.length} total destinations into PostgreSQL...`);

    let insertedCount = 0;

    // 4. Loop and insert all consolidated destinations directly
    for (const destination of allDestinations) {
      const destQuery = `
        INSERT INTO destinations (
          id, 
          name, 
          state, 
          tagline, 
          category, 
          image, 
          description, 
          climate, 
          best_time, 
          routes, 
          hotels, 
          dining, 
          attractions, 
          adventures,
          search_aliases,
          popularity_score
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      `;

      const aliases = destination.search_aliases || destination.aliases || [destination.name.toLowerCase()];
      const popularity = destination.popularity_score || destination.popularity || 90;

      await pool.query(destQuery, [
        destination.id,
        destination.name,
        destination.state,
        destination.tagline || '',
        destination.category,
        destination.image,
        destination.description,
        destination.climate,
        destination.bestTime,
        JSON.stringify(destination.routes || {}),
        JSON.stringify(destination.hotels || {}),
        JSON.stringify(destination.dining || []),
        JSON.stringify(destination.attractions || []),
        JSON.stringify(destination.adventures || []),
        aliases, // mapped directly as TEXT[]
        popularity
      ]);
      insertedCount++;
    }

    console.log(`✅ Seeding completed successfully! Total inserted records count: ${insertedCount}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding database error:', err);
    process.exit(1);
  }
};

seedDB();
