import { PaymentMethod, Currency } from './types';

// Destinations
export const DESTINATIONS = [
  {
    id: 1,
    name: "International Space Station",
    location: "Low Earth Orbit · 400 km",
    description: "Experience life aboard humanity's outpost in low Earth orbit. Enjoy stunning views of our planet and participate in scientific experiments.",
    distanceKm: 400,
    travelDuration: "3 days",
    rating: 4.8,
    basePrice: 12500,
    imageUrl: ""
  },
  {
    id: 2,
    name: "Lunar Hotels",
    location: "Sea of Tranquility · Moon",
    description: "Stay in luxury accommodations on the lunar surface with Earth views. Experience low gravity activities and explore the historic Apollo landing sites.",
    distanceKm: 384400,
    travelDuration: "5 days",
    rating: 4.9,
    basePrice: 45000,
    imageUrl: ""
  },
  {
    id: 3,
    name: "Mars Colony Alpha",
    location: "Arcadia Planitia · Mars",
    description: "Visit the first human settlement on the Red Planet. Explore Martian landscapes, drive rovers, and experience life on another world.",
    distanceKm: 78340000,
    travelDuration: "14 days",
    rating: 4.1,
    basePrice: 120000,
    imageUrl: ""
  },
  {
    id: 4,
    name: "Orbit Resorts",
    location: "Geostationary Orbit · Earth",
    description: "Relax in our premium orbital hotel with 360° views of Earth. Enjoy zero-gravity spa treatments and gourmet dining among the stars.",
    distanceKm: 35786,
    travelDuration: "7 days",
    rating: 5.0,
    basePrice: 78000,
    imageUrl: ""
  }
];

// Seat Classes
export const SEAT_CLASSES = [
  {
    id: 1,
    name: "Luxury Cabin",
    description: "Premium experience with personal AI assistant",
    priceMultiplier: 1.5,
    icon: "star"
  },
  {
    id: 2,
    name: "Economy Shuttle",
    description: "Standard comfortable space travel",
    priceMultiplier: 1.0,
    icon: "rocket"
  },
  {
    id: 3,
    name: "VIP Zero-Gravity Experience",
    description: "Premium suite with exclusive zero-G lounge",
    priceMultiplier: 2.0,
    icon: "crown"
  }
];

// Experience Packages
export const EXPERIENCE_PACKAGES = [
  {
    id: 1,
    name: "Moonlight Honeymoon",
    description: "Perfect for couples celebrating love",
    basePrice: 95000,
    features: [
      "Private lunar suite with Earth view",
      "Champagne dinner in zero gravity",
      "Couples spacewalk experience",
      "Personalized NFT marriage certificate"
    ],
    icon: "heart",
    accentColor: "from-neon-cyan to-neon-magenta"
  },
  {
    id: 2,
    name: "Mars Explorer Pro",
    description: "Ultimate adventure for thrill-seekers",
    basePrice: 185000,
    features: [
      "7-day Mars surface expedition",
      "Martian rover driving experience",
      "Olympus Mons base camp visit",
      "Advanced life support training"
    ],
    icon: "mountain",
    accentColor: "from-neon-blue to-neon-cyan"
  },
  {
    id: 3,
    name: "Zero-G Luxury Retreat",
    description: "Relaxation beyond Earth's gravity",
    basePrice: 110000,
    features: [
      "Orbital spa and wellness center",
      "Michelin-star space cuisine",
      "Celestial yoga and meditation",
      "Earth observation panoramic suite"
    ],
    icon: "spa",
    accentColor: "from-neon-cyan to-neon-cyan"
  }
];

// Accommodations
export const ACCOMMODATIONS = [
  {
    id: 1,
    destinationId: 2, // Lunar Hotels
    name: "Tranquility Suite",
    description: "Our premium suite with panoramic Earth views",
    pricePerNight: 15000,
    amenities: ["Earth View Windows", "AI Butler", "Private Dining", "Zero-G Sleeping Chamber"],
    rating: 4.9,
    gravitySimulation: true,
    windowViews: true,
    aiAssistant: true,
    stargazingDeck: true
  },
  {
    id: 2,
    destinationId: 3, // Mars Colony
    name: "Olympus Habitat",
    description: "Martian living quarters with all amenities",
    pricePerNight: 18000,
    amenities: ["Martian View", "Artificial Gravity", "Research Access", "VR Entertainment"],
    rating: 4.5,
    gravitySimulation: true,
    windowViews: true,
    aiAssistant: true,
    stargazingDeck: false
  },
  {
    id: 3,
    destinationId: 4, // Orbit Resorts
    name: "Orbital Observatory",
    description: "Luxury zero-G suite with Earth observation deck",
    pricePerNight: 22000,
    amenities: ["360° Earth Views", "Zero-G Spa", "Gourmet Dining", "Space Walk Access"],
    rating: 5.0,
    gravitySimulation: false,
    windowViews: true,
    aiAssistant: true,
    stargazingDeck: true
  }
];

// Payment Methods
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    value: "credit_card",
    label: "Credit Card",
    icon: "fas fa-credit-card"
  },
  {
    value: "crypto",
    label: "Crypto",
    icon: "fas fa-coins"
  },
  {
    value: "apple_pay",
    label: "Apple Pay",
    icon: "fab fa-apple-pay"
  }
];

// Currencies
export const CURRENCIES: Currency[] = [
  {
    value: "AED",
    label: "AED",
    symbol: "AED"
  },
  {
    value: "USD",
    label: "USD",
    icon: "fas fa-dollar-sign"
  },
  {
    value: "ETH",
    label: "ETH",
    icon: "fab fa-ethereum"
  },
  {
    value: "BTC",
    label: "BTC",
    icon: "fab fa-bitcoin"
  }
];

// Promo Codes
export const VALID_PROMO_CODES = ["SPACE2050", "DUBAI2050", "FIRSTFLIGHT"];

// AI concierge default responses
export const AI_CONCIERGE_RESPONSES = [
  "I'd be happy to help you plan your space journey! What destination interests you the most?",
  "The Lunar Hotels are particularly beautiful during Earth-rise, which occurs every 29.5 Earth days.",
  "For Mars Colony Alpha, I recommend scheduling your trip during the Martian Summer (July-September 2050), when temperatures are milder and dust storms are less frequent.",
  "All of our spaceships are equipped with artificial gravity in the living quarters, but you'll also experience zero-G in designated areas.",
  "The VIP Zero-Gravity Experience includes exclusive access to our panoramic observation deck and private spacewalk opportunities.",
  "Yes, we offer family-friendly accommodations and activities for children aged 12 and above, with special safety protocols.",
  "The Mars Explorer Pro package includes a 7-day Mars surface expedition, Martian rover driving, and a visit to Olympus Mons base camp.",
  "Space insurance is included in all our packages, covering medical emergencies and evacuation if necessary.",
  "For first-time space travelers, I'd recommend starting with our Orbit Resorts, which offers a comfortable introduction to space travel with minimal health requirements."
];
