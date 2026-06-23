export const stateCities = {
  "Delhi NCR": [
    "Delhi (DEL)", "New Delhi", "Noida", "Gurugram", "Ghaziabad", "Faridabad"
  ],
  "Maharashtra": [
    "Mumbai (BOM)", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", 
    "Amravati", "Kolhapur", "Navi Mumbai", "Sangli", "Jalgaon", "Akola", "Latur", 
    "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", 
    "Bhusawal", "Panvel", "Satara", "Beed", "Yavatmal", "Gondia", "Ambernath"
  ],
  "Karnataka": [
    "Bengaluru (BLR)", "Mysore", "Hubli", "Dharwad", "Mangalore", "Belgaum", 
    "Gulbarga", "Davangere", "Bellary", "Bijapur", "Shimoga", "Tumkur", "Udupi"
  ],
  "West Bengal": [
    "Kolkata (CCU)", "Howrah", "Darjeeling", "Siliguri", "Asansol", "Durgapur", 
    "Kharagpur", "Haldia", "Jalpaiguri", "Bardhaman", "Malda", "Baharampur"
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", 
    "Tiruppur", "Vellore", "Erode", "Thoothukudi", "Nagercoil", "Thanjavur"
  ],
  "Goa": [
    "Panaji", "Vasco Da Gama", "Margao", "Mapusa", "Ponda", "Calangute", "Morjim"
  ],
  "Rajasthan": [
    "Jaipur", "Udaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Bhilwara", 
    "Alwar", "Sikar", "Bharatpur", "Pali", "Sri Ganganagar", "Mount Abu"
  ],
  "Kerala": [
    "Kochi", "Trivandrum", "Kozhikode", "Thrissur", "Kollam", "Alappuzha", 
    "Palakkad", "Kottayam", "Manjeri", "Thalassery", "Ponnani", "Munnar"
  ]
};

export const originHubs = [
  { id: 'delhi', name: 'Delhi (DEL)' },
  { id: 'mumbai', name: 'Mumbai (BOM)' },
  { id: 'bengaluru', name: 'Bengaluru (BLR)' },
  { id: 'kolkata', name: 'Kolkata (CCU)' }
];

export const destinations = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'The Land of Sun, Sand, and Sea',
    category: 'Beach & Nightlife',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    description: 'Famed for its pristine beaches, active nightlife, centuries-old Portuguese churches, and delicious seafood curries.',
    climate: 'Tropical & Humid (28°C - 33°C)',
    bestTime: 'November to February',
    routes: {
      delhi: {
        flight: { price: 5500, duration: '2h 35m', details: 'Direct flights daily (IndiGo, Air India)' },
        train: { price: 1800, duration: '26h 10m', details: 'Goa Express / Rajdhani Express' },
        bus: { price: 2800, duration: '38h 00m', details: 'Multi-stop sleeper buses (Not recommended)' },
        cab: { price: 32000, duration: '32h 00m', details: 'Private taxi via NH 48 (High cost)' }
      },
      mumbai: {
        flight: { price: 3200, duration: '1h 10m', details: 'Frequent direct flights (IndiGo, Akasa)' },
        train: { price: 650, duration: '10h 30m', details: 'Tejas Express / Mandovi Express' },
        bus: { price: 1200, duration: '14h 00m', details: 'Direct overnight AC Sleeper (VRL, National)' },
        cab: { price: 12000, duration: '11h 00m', details: 'Private AC Sedan via NH 66' }
      },
      bengaluru: {
        flight: { price: 3500, duration: '1h 15m', details: 'Frequent direct flights (IndiGo, Star Air)' },
        train: { price: 700, duration: '15h 30m', details: 'Kurnool Express / Vasco Express' },
        bus: { price: 1000, duration: '11h 30m', details: 'Overnight AC Sleeper (SRS, Seabird)' },
        cab: { price: 11000, duration: '10h 00m', details: 'Private Cab via NH 48' }
      },
      kolkata: {
        flight: { price: 7500, duration: '2h 55m', details: 'Direct flights daily (IndiGo)' },
        train: { price: 2200, duration: '36h 45m', details: 'Amaravati Express (Bi-weekly)' },
        bus: { price: 4200, duration: '48h 00m', details: 'Not feasible directly (Requires transfers)' },
        cab: { price: 48000, duration: '42h 00m', details: 'Long distance private transport' }
      }
    },
    hotels: {
      budget: { name: 'Zostel Goa (Morjim)', price: 800, highlights: ['Vibrant backpacker social vibe', 'Walking distance to beach', 'Co-working spaces & dorms'] },
      midRange: { name: 'Amoravida Resort by Treehouse', price: 3500, highlights: ['Swimming pool & spa', 'Buffet breakfast included', 'Close to North Goa beaches'] },
      luxury: { name: 'Taj Exotica Resort & Spa', price: 18000, highlights: ['Private beach access in South Goa', 'World-class Mediterranean style villas', 'Fine-dining & golf course'] }
    },
    dining: [
      { name: 'Brittos Bar & Restaurant', specialty: 'Goan Fish Curry & Butter Garlic Prawns', type: 'Mid-Range', cost: 1000 },
      { name: 'Gunpowder', specialty: 'South Indian Crepes & Malabar Curry', type: 'Fine Dining', cost: 1800 },
      { name: 'Street Food Cart (Panaji)', specialty: 'Chorizo Pav & Gadbad Ice Cream', type: 'Street Food', cost: 150 }
    ],
    attractions: [
      { name: 'Baga Beach', entryFee: 0, duration: 3, description: 'Famous North Goa beach known for watersports, shacks, and sunset views.' },
      { name: 'Basilica of Bom Jesus', entryFee: 0, duration: 1.5, description: 'UNESCO World Heritage site containing the mortal remains of St. Francis Xavier.' },
      { name: 'Dudhsagar Waterfalls', entryFee: 400, duration: 5, description: 'A four-tiered majestic waterfall on the Mandovi River, accessible via jeep safaris.' }
    ],
    adventures: [
      { name: 'Scuba Diving at Grand Island', cost: 2500, type: 'Water Sport', thrillLevel: 'High' },
      { name: 'Parasailing at Calangute', cost: 1200, type: 'Aviation Sport', thrillLevel: 'Medium' },
      { name: 'Windsurfing at Dona Paula', cost: 1500, type: 'Water Sport', thrillLevel: 'High' }
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City of India',
    category: 'Heritage & Culture',
    image: 'https://images.unsplash.com/photo-1477584322902-471a53b474b7?auto=format&fit=crop&w=800&q=80',
    description: 'Immerse yourself in royalty with grand forts, pink sandstone palaces, colourful bazaars, and traditional Rajasthani block printing.',
    climate: 'Semi-arid (22°C - 38°C)',
    bestTime: 'October to March',
    routes: {
      delhi: {
        flight: { price: 2800, duration: '1h 00m', details: 'Direct flights daily (Alliance Air, IndiGo)' },
        train: { price: 400, duration: '4h 30m', details: 'Double Decker / Shatabdi Express' },
        bus: { price: 600, duration: '6h 00m', details: 'AC Sleeper daily (RSRTC, Goldline)' },
        cab: { price: 5000, duration: '5h 00m', details: 'Private taxi via Delhi-Jaipur Expressway' }
      },
      mumbai: {
        flight: { price: 4500, duration: '1h 50m', details: 'Direct flights daily (IndiGo, Air India)' },
        train: { price: 950, duration: '16h 00m', details: 'Jaipur Duronto / JP SF Express' },
        bus: { price: 1800, duration: '22h 00m', details: 'Overnight AC Sleeper' },
        cab: { price: 24000, duration: '20h 00m', details: 'Private long-distance taxi' }
      },
      bengaluru: {
        flight: { price: 5800, duration: '2h 30m', details: 'Direct flights daily (IndiGo)' },
        train: { price: 1300, duration: '34h 00m', details: 'Mysore-Jaipur Express' },
        bus: { price: 3500, duration: '42h 00m', details: 'Requires transfers (Not recommended)' },
        cab: { price: 38000, duration: '35h 00m', details: 'Private long-distance taxi' }
      },
      kolkata: {
        flight: { price: 6200, duration: '2h 15m', details: 'Direct flights daily (IndiGo)' },
        train: { price: 1100, duration: '23h 00m', details: 'Howrah-Jaipur Express' },
        bus: { price: 3000, duration: '30h 00m', details: 'Requires transfers' },
        cab: { price: 34000, duration: '28h 00m', details: 'Private long-distance taxi' }
      }
    },
    hotels: {
      budget: { name: 'Moustache Hostel Jaipur', price: 600, highlights: ['Beautiful ethnic decor', 'Rooftop cafe with fort views', 'Walking distance from Metro'] },
      midRange: { name: 'Umaid Bhawan - Heritage Style Hotel', price: 3200, highlights: ['Traditional Rajasthani architecture', 'Rooftop pool & puppet shows', 'Located in central Bani Park'] },
      luxury: { name: 'Rambagh Palace (Taj)', price: 28000, highlights: ['Living in a real palace of Maharaja', 'Peacocks in sprawling gardens', 'Exquisite fine dining & royal treatment'] }
    },
    dining: [
      { name: 'Laxmi Mishthan Bhandar (LMB)', specialty: 'Rajasthani Pyaaz Kachori & Special Ghewar', type: 'Mid-Range', cost: 600 },
      { name: 'Chokhi Dhani', specialty: 'Traditional Rajasthani Thali & Cultural Show', type: 'Fine Dining', cost: 1200 },
      { name: 'Rawat Mishthan Bhandar', specialty: 'Mawa Kachori & Mirchi Vada', type: 'Street Food', cost: 150 }
    ],
    attractions: [
      { name: 'Amber Palace', entryFee: 100, duration: 3, description: 'Magnificent fort built on a hill with artistic Hindu-style elements & Sheesh Mahal.' },
      { name: 'Hawa Mahal', entryFee: 50, duration: 1, description: 'Iconic five-story pink screen wall built for royal women to observe street festivals.' },
      { name: 'Jantar Mantar', entryFee: 50, duration: 2, description: 'UNESCO astronomical observatory containing the world\'s largest stone sundial.' }
    ],
    adventures: [
      { name: 'Hot Air Balloon Ride', cost: 9500, type: 'Aviation Sport', thrillLevel: 'High' },
      { name: 'Elephant Village (Hathi Gaon) Tour', cost: 1800, type: 'Cultural Tour', thrillLevel: 'Low' },
      { name: 'Nahargarh Fort Cycle Expedition', cost: 800, type: 'Cycling', thrillLevel: 'Medium' }
    ]
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    tagline: 'The Valley of the Gods',
    category: 'Hill Station & Snow',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    description: 'Nestled on the Beas River, Manali is a gateway for skiing, paragliding, trekking, and exploring the high-altitude Solang Valley.',
    climate: 'Cool / Alpine (-2°C - 22°C)',
    bestTime: 'October to June',
    routes: {
      delhi: {
        flight: { price: 5800, duration: '1h 20m', details: 'Flight to Bhuntar Airport (Kullu) + 2h drive to Manali' },
        train: { price: 600, duration: '8h 30m', details: 'Train to Chandigarh/Kalka + 7h bus drive' },
        bus: { price: 1200, duration: '14h 00m', details: 'Direct Volvo AC Sleeper from Kashmiri Gate' },
        cab: { price: 11000, duration: '12h 00m', details: 'Private Sedan via NH 44 & Kiratpur Expressway' }
      },
      mumbai: {
        flight: { price: 8200, duration: '4h 30m', details: 'Flight to Chandigarh + 7h taxi/Volvo bus ride' },
        train: { price: 1200, duration: '28h 00m', details: 'Train to Delhi/Chandigarh + Volvo bus ride' },
        bus: { price: 3200, duration: '36h 00m', details: 'Requires multi-leg bus (Not recommended)' },
        cab: { price: 35000, duration: '34h 00m', details: 'Long mountain private drive' }
      },
      bengaluru: {
        flight: { price: 9500, duration: '5h 15m', details: 'Flight to Chandigarh + 7h taxi/Volvo bus' },
        train: { price: 1600, duration: '44h 00m', details: 'Train to Delhi + Volvo bus transfer' },
        bus: { price: 4500, duration: '55h 00m', details: 'Requires multi-city transfers' },
        cab: { price: 49000, duration: '45h 00m', details: 'Extremely long private transfer' }
      },
      kolkata: {
        flight: { price: 9200, duration: '5h 00m', details: 'Flight to Chandigarh/Delhi + taxi/Volvo transfer' },
        train: { price: 1400, duration: '32h 00m', details: 'Train to Delhi + Volvo bus transfer' },
        bus: { price: 4000, duration: '46h 00m', details: 'Requires transfers' },
        cab: { price: 44000, duration: '40h 00m', details: 'Long-distance private cab' }
      }
    },
    hotels: {
      budget: { name: 'Alt Life Hostel (Old Manali)', price: 700, highlights: ['Surrounded by apple orchards', 'River-facing outdoor cafe', 'Co-working setup & bonfire nights'] },
      midRange: { name: 'The Orchard Greens Resort', price: 4000, highlights: ['Breathtaking valley views', 'Pine wood design rooms', 'Multi-cuisine in-house kitchen'] },
      luxury: { name: 'Span Resort & Spa', price: 16000, highlights: ['Luxury cottages on River Beas banks', 'Heated outdoor swimming pool', 'Private fishing & riverside dining'] }
    },
    dining: [
      { name: 'Johnson Cafe & Hotel', specialty: 'Wood-fired Trout Fish & Italian Pizza', type: 'Mid-Range', cost: 900 },
      { name: 'Il Forno', specialty: 'Authentic Wood-fired Pizzas & Pastas in Old Manali', type: 'Fine Dining', cost: 1500 },
      { name: 'Mall Road Local Stalls', specialty: 'Sidu (Himachali Bread) & Steamed Momos', type: 'Street Food', cost: 120 }
    ],
    attractions: [
      { name: 'Solang Valley', entryFee: 0, duration: 4, description: 'Adventure hub offering skiing in winter and paragliding/zorbing in summer.' },
      { name: 'Hadimba Temple', entryFee: 0, duration: 1, description: '16th-century wooden temple built around a cave, dedicated to Goddess Hadimba, surrounded by cedar forests.' },
      { name: 'Atal Tunnel & Sissu', entryFee: 0, duration: 6, description: 'Engineering marvel tunnel leading to the scenic, snowy Lahaul valley landscape.' }
    ],
    adventures: [
      { name: 'Paragliding at Solang Valley', cost: 3000, type: 'Aviation Sport', thrillLevel: 'High' },
      { name: 'River Rafting in Beas River', cost: 1000, type: 'Water Sport', thrillLevel: 'Medium' },
      { name: 'Zorbing & Quad Biking', cost: 800, type: 'Snow/Land Sport', thrillLevel: 'Medium' }
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala (Munnar & Alleppey)',
    state: 'Kerala',
    tagline: 'God\'s Own Country',
    category: 'Nature & Backwaters',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    description: 'Lush tea plantations in Munnar hills coupled with tranquil houseboat cruises down the backwaters of Alleppey.',
    climate: 'Tropical (24°C - 31°C)',
    bestTime: 'September to March',
    routes: {
      delhi: {
        flight: { price: 6800, duration: '3h 15m', details: 'Flight to Kochi (COK) + 3h scenic drive to Munnar' },
        train: { price: 1900, duration: '42h 00m', details: 'Kerala Express to Ernakulam Junction' },
        bus: { price: 4500, duration: '55h 00m', details: 'Not recommended due to extreme distance' },
        cab: { price: 52000, duration: '48h 00m', details: 'Long-distance private charter' }
      },
      mumbai: {
        flight: { price: 4200, duration: '1h 55m', details: 'Direct flights to Kochi (IndiGo, Air India)' },
        train: { price: 900, duration: '24h 00m', details: 'Mangaluru Express / Netravati Express' },
        bus: { price: 2500, duration: '30h 00m', details: 'Multi-stop sleeper buses to Kochi' },
        cab: { price: 34000, duration: '28h 00m', details: 'Private highway taxi via NH 66' }
      },
      bengaluru: {
        flight: { price: 2900, duration: '1h 00m', details: 'Direct flights to Kochi (IndiGo, Alliance Air)' },
        train: { price: 500, duration: '9h 30m', details: 'Kanyakumari Express / Ernakulam SF Express' },
        bus: { price: 1100, duration: '10h 00m', details: 'Direct AC Sleeper overnight (KSRTC, Orange)' },
        cab: { price: 13000, duration: '9h 00m', details: 'Private cab via Salem & Coimbatore' }
      },
      kolkata: {
        flight: { price: 7200, duration: '2h 45m', details: 'Direct flights to Kochi (IndiGo)' },
        train: { price: 1500, duration: '36h 00m', details: 'Gurudev Express / Shalimar Express' },
        bus: { price: 4800, duration: '50h 00m', details: 'Requires transfers' },
        cab: { price: 49000, duration: '42h 00m', details: 'Private long-distance charter' }
      }
    },
    hotels: {
      budget: { name: 'Zostel Alleppey', price: 750, highlights: ['Direct beach access', 'Hammocks & sea-facing dorms', 'Canoeing tours organized daily'] },
      midRange: { name: 'Munnar Tea Hills Resort', price: 3800, highlights: ['Individual cottage units', 'Stunning green balcony views', 'Guided spice garden walks'] },
      luxury: { name: 'Spice Coast Houseboats (CGH Earth)', price: 15000, highlights: ['Fully private heritage wooden houseboat', 'Personal chef on board serving Kerala meals', 'Cruising scenic backwaters'] }
    },
    dining: [
      { name: 'Kashi Art Cafe (Kochi / Munnar)', specialty: 'Freshly Brewed Coffee & Spinach Mushroom Omelette', type: 'Mid-Range', cost: 700 },
      { name: 'Toddy Shop (Alleppey)', specialty: 'Spicy Karimeen Pollichathu (Pearl Spot Fish) & Kappa', type: 'Street Food', cost: 400 },
      { name: 'Villa Maya (Kochi)', specialty: 'Traditional Malabar Prawn Curry & Rice', type: 'Fine Dining', cost: 1800 }
    ],
    attractions: [
      { name: 'Eravikulam National Park', entryFee: 200, duration: 3, description: 'Habitat of the endangered Nilgiri Tahr, offering panoramic views of rolling tea gardens.' },
      { name: 'Alleppey Backwaters', entryFee: 1000, duration: 4, description: 'Network of brackish canals, lakes, and rivers bordered by coconut palms.' },
      { name: 'Mattupetty Dam & Lake', entryFee: 50, duration: 1.5, description: 'Storage concrete gravity dam with boating options nestled in green hills.' }
    ],
    adventures: [
      { name: 'Bamboo Rafting in Periyar', cost: 2200, type: 'Eco Adventure', thrillLevel: 'Medium' },
      { name: 'Kalaripayattu Martial Art Show', cost: 400, type: 'Cultural Experience', thrillLevel: 'Low' },
      { name: 'Munnar Peak Trekking', cost: 1200, type: 'Trekking', thrillLevel: 'Medium' }
    ]
  },
  {
    id: 'ladakh',
    name: 'Leh Ladakh',
    state: 'Ladakh',
    tagline: 'The Land of High Passes',
    category: 'High-Altitude Adventure',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    description: 'Dramatic cold deserts, deep blue lakes like Pangong, ancient Tibetan monasteries, and the highest motorable mountain roads.',
    climate: 'Cold & Dry (-5°C - 15°C)',
    bestTime: 'June to September',
    routes: {
      delhi: {
        flight: { price: 6500, duration: '1h 25m', details: 'Scenic direct flight to Leh Kushok Bakula Rimpochee Airport' },
        train: { price: 1200, duration: '24h 00m', details: 'Train to Jammu Tawi + 2-day road trip via Srinagar' },
        bus: { price: 2200, duration: '30h 00m', details: 'Delhi to Leh HRTC Bus via Manali (Seasonal)' },
        cab: { price: 28000, duration: '28h 00m', details: 'Private 4x4 SUV road trip via Manali-Leh Highway' }
      },
      mumbai: {
        flight: { price: 9200, duration: '4h 00m', details: 'Flight to Leh (Usually via Delhi)' },
        train: { price: 2100, duration: '48h 00m', details: 'Train to Delhi + Flight to Leh' },
        bus: { price: 4800, duration: '60h 00m', details: 'Not recommended (Multiple transfers)' },
        cab: { price: 58000, duration: '52h 00m', details: 'Extremely long road trip' }
      },
      bengaluru: {
        flight: { price: 11000, duration: '4h 50m', details: 'Flight to Leh (Via Delhi)' },
        train: { price: 2500, duration: '56h 00m', details: 'Train to Delhi + Flight to Leh' },
        bus: { price: 5500, duration: '72h 00m', details: 'Not feasible by road directly' },
        cab: { price: 65000, duration: '65h 00m', details: 'Not recommended' }
      },
      kolkata: {
        flight: { price: 10500, duration: '4h 30m', details: 'Flight to Leh (Via Delhi)' },
        train: { price: 2300, duration: '52h 00m', details: 'Train to Delhi + Flight to Leh' },
        bus: { price: 5000, duration: '70h 00m', details: 'Not feasible by road' },
        cab: { price: 60000, duration: '60h 00m', details: 'Not recommended' }
      }
    },
    hotels: {
      budget: { name: 'Himalayan Hostel Leh', price: 800, highlights: ['Traditional Ladakhi home style', 'Walking distance to Leh Market', 'Rooftop looking at Leh Palace'] },
      midRange: { name: 'Hotel Singge Palace', price: 4500, highlights: ['Centrally heated rooms', 'Close to central market', 'Oxygen cylinder backup service'] },
      luxury: { name: 'The Grand Dragon Ladakh', price: 14000, highlights: ['Five-star luxury eco-resort', 'Splendid view of Cold Desert & Stok Kangri', 'Local Ladakhi cuisine & modern amenities'] }
    },
    dining: [
      { name: 'The Tibetan Kitchen', specialty: 'Mutton Thukpa & Steamed Cheese Momos', type: 'Mid-Range', cost: 700 },
      { name: 'Alchi Kitchen', specialty: 'Ladakhi Khambir (Bread) & Apricot Juice', type: 'Fine Dining', cost: 1200 },
      { name: 'Chopsticks Noodle Bar', specialty: 'Local Soups & Butter Tea', type: 'Street Food', cost: 300 }
    ],
    attractions: [
      { name: 'Pangong Tso Lake', entryFee: 200, duration: 24, description: 'Endorheic lake in the Himalayas situated at a height of 4,225m, changing colors from blue to green.' },
      { name: 'Khardung La Pass', entryFee: 100, duration: 2, description: 'One of the highest motorable roads in the world, gateway to Nubra Valley.' },
      { name: 'Diskit Monastery', entryFee: 50, duration: 1.5, description: 'Oldest and largest Buddhist monastery in Nubra Valley, featuring a 32m Maitreya Buddha statue.' }
    ],
    adventures: [
      { name: 'Double Humped Camel Ride (Nubra)', cost: 500, type: 'Eco Adventure', thrillLevel: 'Low' },
      { name: 'White Water Rafting in Zanskar', cost: 2000, type: 'Water Sport', thrillLevel: 'High' },
      { name: 'Motorbike Ride across Khardung La', cost: 1800, type: 'Motorcycling', thrillLevel: 'High' }
    ]
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'Home of the Taj Mahal',
    category: 'Heritage & Wonders',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    description: 'Step back in time to the Mughal Empire, witnessing the Taj Mahal, magnificent red sandstone Agra Fort, and historic Fatehpur Sikri.',
    climate: 'Subtropical (18°C - 42°C)',
    bestTime: 'October to March',
    routes: {
      delhi: {
        flight: { price: 4200, duration: '1h 00m', details: 'Rare commercial flights (Train/Cab highly preferred)' },
        train: { price: 350, duration: '1h 50m', details: 'Gatimaan Express (Fastest Train) / Shatabdi' },
        bus: { price: 400, duration: '3h 30m', details: 'Direct AC coaches via Yamuna Expressway' },
        cab: { price: 3000, duration: '3h 00m', details: 'Private cab via Yamuna Expressway' }
      },
      mumbai: {
        flight: { price: 5200, duration: '2h 10m', details: 'Direct flights to Agra (Kheria Airport)' },
        train: { price: 750, duration: '18h 00m', details: 'Garib Rath Express / Mangala Lakshadweep Express' },
        bus: { price: 2000, duration: '24h 00m', details: 'Not recommended' },
        cab: { price: 28000, duration: '22h 00m', details: 'Long-distance private cab' }
      },
      bengaluru: {
        flight: { price: 6800, duration: '2h 30m', details: 'Direct flights to Agra (IndiGo)' },
        train: { price: 1100, duration: '30h 00m', details: 'Karnataka Express' },
        bus: { price: 4200, duration: '40h 00m', details: 'Requires multiple layovers' },
        cab: { price: 39000, duration: '36h 00m', details: 'Not recommended' }
      },
      kolkata: {
        flight: { price: 6500, duration: '2h 20m', details: 'Direct flights to Lucknow/Delhi + Cab/Train ride' },
        train: { price: 900, duration: '18h 00m', details: 'Poorva Express / Kalka Mail' },
        bus: { price: 3800, duration: '28h 00m', details: 'Requires transfers' },
        cab: { price: 32000, duration: '24h 00m', details: 'Private highway taxi' }
      }
    },
    hotels: {
      budget: { name: 'Joey\'s Hostel Agra', price: 550, highlights: ['Rooftop terrace with stunning Taj Mahal view', 'Walking distance to Taj East Gate', 'Backpacker socializing events'] },
      midRange: { name: 'Howard Plaza The Fern', price: 2800, highlights: ['Close proximity to monument', 'Swimming pool & rooftop bar', 'Buffet breakfast included'] },
      luxury: { name: 'The Oberoi Amarvilas', price: 32000, highlights: ['Every room features an uninterrupted view of the Taj Mahal', 'Royal Mughal architectural arches', 'Unmatched ultra-luxury service & spas'] }
    },
    dining: [
      { name: 'Pinch of Spice', specialty: 'Mughlai Paneer Tikka & Mutton Rogan Josh', type: 'Fine Dining', cost: 1400 },
      { name: 'Sheroes Hangout', specialty: 'Local North Indian Meals & Snacks (Run by acid attack survivors)', type: 'Mid-Range', cost: 500 },
      { name: 'Petha Shops (Sadar Bazar)', specialty: 'Agra Famous Angoori Petha & Dalmoth', type: 'Street Food', cost: 100 }
    ],
    attractions: [
      { name: 'Taj Mahal', entryFee: 50, duration: 3, description: 'The famous white marble mausoleum built by Shah Jahan for his wife Mumtaz Mahal, one of the Seven Wonders of the World.' },
      { name: 'Agra Fort', entryFee: 50, duration: 2, description: 'Massive 16th-century red sandstone fortress overlooking the Yamuna River, containing royal residential palaces.' },
      { name: 'Fatehpur Sikri', entryFee: 50, duration: 3, description: 'Ghost city built in red sandstone by Emperor Akbar, featuring Buland Darwaza, the highest gateway.' }
    ],
    adventures: [
      { name: 'Taj Sunrise Photography Tour', cost: 1500, type: 'Photography', thrillLevel: 'Low' },
      { name: 'Yamuna River Boat Ride (Behind Taj)', cost: 600, type: 'Boat Cruise', thrillLevel: 'Medium' },
      { name: 'Agra Heritage Walk', cost: 500, type: 'Walking Tour', thrillLevel: 'Low' }
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The Spiritual Heart of India',
    category: 'Spiritual & Cultural',
    image: 'https://images.unsplash.com/photo-1561361531-99522c546452?auto=format&fit=crop&w=800&q=80',
    description: 'One of the oldest continuously inhabited cities in the world, renowned for its holy Ganges Ghats, spectacular evening Ganga Aarti, and ancient temples.',
    climate: 'Subtropical (20°C - 40°C)',
    bestTime: 'October to March',
    routes: {
      delhi: {
        flight: { price: 3200, duration: '1h 15m', details: 'Direct daily flights (IndiGo, Air India)' },
        train: { price: 450, duration: '8h 00m', details: 'Vande Bharat Express (Fastest) / Shiv Ganga Express' },
        bus: { price: 800, duration: '12h 00m', details: 'AC Sleeper daily via Purvanchal Expressway' },
        cab: { price: 14000, duration: '11h 00m', details: 'Private sedan hire' }
      },
      mumbai: {
        flight: { price: 5500, duration: '2h 05m', details: 'Direct flights daily (IndiGo, Akasa)' },
        train: { price: 700, duration: '24h 00m', details: 'Mahanagari Express / Kamayani Express' },
        bus: { price: 2800, duration: '32h 00m', details: 'Not recommended due to length' },
        cab: { price: 34000, duration: '28h 00m', details: 'Private highway taxi' }
      },
      bengaluru: {
        flight: { price: 6200, duration: '2h 15m', details: 'Direct flights daily (IndiGo)' },
        train: { price: 1000, duration: '32h 00m', details: 'Sanghamitra Express' },
        bus: { price: 4000, duration: '45h 00m', details: 'Not feasible' },
        cab: { price: 42000, duration: '38h 00m', details: 'Not recommended' }
      },
      kolkata: {
        flight: { price: 4800, duration: '1h 10m', details: 'Direct flights daily (IndiGo)' },
        train: { price: 500, duration: '8h 30m', details: 'Howrah-Varanasi Express / Poorva Express' },
        bus: { price: 900, duration: '14h 00m', details: 'Overnight AC sleeper bus' },
        cab: { price: 13000, duration: '12h 00m', details: 'Private taxi via NH 19' }
      }
    },
    hotels: {
      budget: { name: 'Gostops Varanasi', price: 500, highlights: ['Colorful youth hostel', 'Common area with board games & instruments', 'Walking distance from ghats'] },
      midRange: { name: 'Alka Hotel (Dashashwamedh Ghat)', price: 3000, highlights: ['Directly overlooking the main Ganga Ghat', 'Vegetarian rooftop cafe', 'Easy access to Ganga Aarti'] },
      luxury: { name: 'Brijrama Palace (Heritage)', price: 16000, highlights: ['18th-century royal palace on the Ganges banks', 'Reachable only by boat', 'Live classical musical mornings'] }
    },
    dining: [
      { name: 'Kashi Chat Bhandar', specialty: 'Tamatar Chaat & Dahi Bhalla', type: 'Street Food', cost: 150 },
      { name: 'Deena Chat Bhandar', specialty: 'Gol Gappe & Lassi in Kulhad', type: 'Street Food', cost: 120 },
      { name: 'Canton Royale Restaurant', specialty: 'North Indian Thali & Mediterranean Selection', type: 'Fine Dining', cost: 1200 }
    ],
    attractions: [
      { name: 'Dashashwamedh Ghat (Ganga Aarti)', entryFee: 0, duration: 2, description: 'Spectacular daily ritual performed by young priests worshipping River Ganges with fire brass lamps.' },
      { name: 'Kashi Vishwanath Temple', entryFee: 0, duration: 2.5, description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located in narrow historical lanes.' },
      { name: 'Sarnath', entryFee: 20, duration: 4, description: 'Historical park where Gautama Buddha first taught the Dharma, featuring Dhamek Stupa.' }
    ],
    adventures: [
      { name: 'Subah-e-Banaras Sunrise Boat Ride', cost: 800, type: 'Boat Cruise', thrillLevel: 'Low' },
      { name: 'Varanasi Weaver Colony Tour', cost: 600, type: 'Cultural Tour', thrillLevel: 'Low' },
      { name: 'Death & Rebirth Walking Tour', cost: 500, type: 'Walking Tour', thrillLevel: 'Low' }
    ]
  },
  {
    id: 'ooty',
    name: 'Ooty',
    state: 'Tamil Nadu',
    tagline: 'Queen of the Hill Stations',
    category: 'Hill Station & Nature',
    image: 'https://images.unsplash.com/photo-1595841696660-ad675cf377d4?auto=format&fit=crop&w=800&q=80',
    description: 'Adorned with rolling green tea gardens, beautiful blue lakes, eucalyptus trees, and the historic Nilgiri Mountain Toy Train.',
    climate: 'Cool / Subtropical (10°C - 22°C)',
    bestTime: 'October to May',
    routes: {
      delhi: {
        flight: { price: 6200, duration: '2h 55m', details: 'Flight to Coimbatore (CJB) + 3h winding taxi drive to Ooty' },
        train: { price: 1800, duration: '38h 00m', details: 'Train to Coimbatore + Toy Train' },
        bus: { price: 4000, duration: '50h 00m', details: 'Not recommended' },
        cab: { price: 48000, duration: '44h 00m', details: 'Private long-distance drive' }
      },
      mumbai: {
        flight: { price: 4900, duration: '1h 50m', details: 'Direct flights to Coimbatore (CJB) + 3h taxi' },
        train: { price: 1100, duration: '26h 00m', details: 'Train to Coimbatore + local taxi/bus transfer' },
        bus: { price: 2800, duration: '32h 00m', details: 'Requires layovers (Bangalore)' },
        cab: { price: 32000, duration: '26h 00m', details: 'Private highway taxi via NH 48' }
      },
      bengaluru: {
        flight: { price: 4200, duration: '1h 00m', details: 'Flight to Coimbatore + 3h taxi (Road trip is much preferred)' },
        train: { price: 450, duration: '8h 00m', details: 'Overnight train to Mysore/Coimbatore + local bus' },
        bus: { price: 800, duration: '7h 30m', details: 'Direct KSRTC Airavat / AC sleeper buses daily' },
        cab: { price: 7000, duration: '6h 00m', details: 'Private scenic drive via Bandipur Tiger Reserve' }
      },
      kolkata: {
        flight: { price: 7200, duration: '2h 45m', details: 'Flight to Coimbatore + 3h drive' },
        train: { price: 1600, duration: '36h 00m', details: 'Train to Coimbatore + Toy Train' },
        bus: { price: 4500, duration: '48h 00m', details: 'Requires multiple layovers' },
        cab: { price: 49000, duration: '40h 00m', details: 'Private highway charter' }
      }
    },
    hotels: {
      budget: { name: 'Zostel Ooty (Lovedale)', price: 700, highlights: ['Surrounded by deep woods', 'Heritage bungalow styling', 'Cozy campfire area'] },
      midRange: { name: 'Sherlock Hotel', price: 3400, highlights: ['Victorian style brick fireplaces', 'Stunning view of Valley', 'Lush green tea gardens around'] },
      luxury: { name: 'Savoy - IHCL SeleQtions', price: 12000, highlights: ['19th-century colonial estate luxury cottages', 'English afternoon high tea', 'Exquisite rose gardens & premium dining'] }
    },
    dining: [
      { name: 'Shinkows', specialty: 'Chinese Chilly Chicken & Fried Rice (Historic eatery)', type: 'Mid-Range', cost: 700 },
      { name: 'Willy\'s Coffee Pub', specialty: 'Irish Coffee & Freshly Baked Chocolate Brownie', type: 'Street Food', cost: 300 },
      { name: 'Curry and Rice (Savoy)', specialty: 'Anglo-Indian Stew & Nilgiri Mutton Korma', type: 'Fine Dining', cost: 1600 }
    ],
    attractions: [
      { name: 'Doddabetta Peak', entryFee: 20, duration: 2.5, description: 'Highest mountain in the Nilgiri Hills at 2,637m, containing a telescope house.' },
      { name: 'Ooty Botanical Gardens', entryFee: 30, duration: 2, description: 'Sprawling 55-hectare terraced garden containing fossil tree trunks estimated over 20M years old.' },
      { name: 'Nilgiri Mountain Railway (Toy Train)', entryFee: 290, duration: 4.5, description: 'UNESCO world heritage steam locomotive traversing tunnels, curves, and wooden bridges.' }
    ],
    adventures: [
      { name: 'Trekking in Avalanche Lake Forests', cost: 1500, type: 'Trekking', thrillLevel: 'Medium' },
      { name: 'Tea Estate Plucking Tour', cost: 500, type: 'Cultural Tour', thrillLevel: 'Low' },
      { name: 'Row Boating in Pykara Lake', cost: 600, type: 'Water Sport', thrillLevel: 'Medium' }
    ]
  }
];
