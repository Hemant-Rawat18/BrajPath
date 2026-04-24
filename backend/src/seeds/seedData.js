const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('../models/Place');
const Hotel = require('../models/Hotel');
const TransportPrice = require('../models/TransportPrice');

dotenv.config();

/**
 * Seed Data for BrajPath
 * Realistic data for Mathura and Vrindavan temples, hotels, and transport
 */

// Famous Places in Vrindavan
const vrindavanPlaces = [
  {
    name: 'Banke Bihari Temple',
    description: 'One of the most revered temples of Lord Krishna in Vrindavan. Known for the deity that changes postures. No aarti is performed here as the Lord is believed to be in eternal raas with Radha Rani.',
    type: 'temple',
    location: {
      coordinates: [77.7035, 27.5802],
      address: 'Shri Bankey Bihari Rd, Gaushala, Vrindavan',
      city: 'Vrindavan'
    },
    avgVisitTime: 90,
    bestTime: 'morning',
    crowdLevel: 'high',
    entryFee: { amount: 0, currency: 'INR' },
    priorityScore: 10,
    religiousSignificance: 'The deity of Banke Bihari was established by Swami Haridas. The idol shows Lord Krishna in his Tribhanga pose.',
    openingHours: {
      opens: '07:45',
      closes: '12:00',
      closedDays: []
    },
    rating: 4.8,
    reviewCount: 15000,
    tags: ['banke-bihari', 'krishna', 'must-visit', 'darshan'],
    category: 'spiritual',
    accessibility: {
      wheelchairFriendly: false,
      elderlyFriendly: true,
      parking: true
    },
    facilities: ['prasadam', 'drinking-water', 'washroom']
  },
  {
    name: 'ISKCON Vrindavan (Krishna Balaram Mandir)',
    description: 'Beautiful ISKCON temple dedicated to Krishna and Balaram. Known for elaborate aartis, kirtans, and spiritual atmosphere. The temple complex includes Srila Prabhupada\'s samadhi.',
    type: 'temple',
    location: {
      coordinates: [77.6947, 27.5774],
      address: 'Bhaktivedanta Swami Marg, Raman Reti, Vrindavan',
      city: 'Vrindavan'
    },
    avgVisitTime: 120,
    bestTime: 'evening',
    crowdLevel: 'medium',
    entryFee: { amount: 0, currency: 'INR' },
    priorityScore: 9,
    religiousSignificance: 'Founded by Srila Prabhupada, this is the main ISKCON temple in Vrindavan. The evening aarti is particularly divine.',
    openingHours: {
      opens: '04:30',
      closes: '21:00',
      closedDays: []
    },
    rating: 4.9,
    reviewCount: 12000,
    tags: ['iskcon', 'krishna-balaram', 'aarti', 'kirtan', 'prasadam'],
    category: 'spiritual',
    accessibility: {
      wheelchairFriendly: true,
      elderlyFriendly: true,
      parking: true
    },
    facilities: ['prasadam', 'locker', 'washroom', 'drinking-water', 'book-store']
  },
  {
    name: 'Prem Mandir',
    description: 'Magnificent modern temple with stunning architecture. The temple illuminates beautifully in the evening. Shows the pastimes of Radha Krishna and Ram Sita.',
    type: 'temple',
    location: {
      coordinates: [77.6906, 27.5735],
      address: 'Prem Mandir Marg, Vrindavan',
      city: 'Vrindavan'
    },
    avgVisitTime: 90,
    bestTime: 'evening',
    crowdLevel: 'high',
    entryFee: { amount: 0, currency: 'INR' },
    priorityScore: 10,
    religiousSignificance: 'Built by Jagadguru Kripalu Ji Maharaj, Prem Mandir spreads the message of divine love. The evening light show is mesmerizing.',
    openingHours: {
      opens: '05:30',
      closes: '21:30',
      closedDays: []
    },
    rating: 4.9,
    reviewCount: 18000,
    tags: ['prem-mandir', 'radha-krishna', 'light-show', 'architecture'],
    category: 'spiritual',
    accessibility: {
      wheelchairFriendly: true,
      elderlyFriendly: true,
      parking: true
    },
    facilities: ['prasadam', 'washroom', 'drinking-water', 'wheelchair']
  },
  {
    name: 'Radha Vallabh Temple',
    description: 'Ancient temple dedicated to Radha Rani. The main deity is of Radha with the crown of Krishna beside her, symbolizing their eternal union.',
    type: 'temple',
    location: {
      coordinates: [77.7015, 27.5788],
      address: 'Radha Vallabh Temple Road, Vrindavan',
      city: 'Vrindavan'
    },
    avgVisitTime: 60,
    bestTime: 'morning',
    crowdLevel: 'low',
    entryFee: { amount: 0, currency: 'INR' },
    priorityScore: 7,
    religiousSignificance: 'Only temple where Radha Rani is the main deity with Krishna\'s crown placed beside her. Founded by Sri Hit Harivansh Goswami.',
    openingHours: {
      opens: '06:00',
      closes: '20:00',
      closedDays: []
    },
    rating: 4.6,
    reviewCount: 3500,
    tags: ['radha-rani', 'radha-vallabh', 'peaceful'],
    category: 'spiritual',
    accessibility: {
      wheelchairFriendly: false,
      elderlyFriendly: true,
      parking: false
    },
    facilities: ['prasadam', 'drinking-water']
  },
  {
    name: 'Nidhivan',
    description: 'Mysterious forest where Radha Krishna are believed to perform Raas Leela every night. No one is allowed to stay after sunset. The trees here have unique twin-trunk formation.',
    type: 'temple',
    location: {
      coordinates: [77.7088, 27.5841],
      address: 'Nidhivan, Seva Kunj, Vrindavan',
      city: 'Vrindavan'
    },
    avgVisitTime: 75,
    bestTime: 'afternoon',
    crowdLevel: 'medium',
    entryFee: { amount: 0, currency: 'INR' },
    priorityScore: 9,
    religiousSignificance: 'Sacred grove where Lord Krishna performed Raas Leela. The divine couple is believed to still appear here every night.',
    openingHours: {
      opens: '08:00',
      closes: '18:00',
      closedDays: []
    },
    rating: 4.7,
    reviewCount: 8000,
    tags: ['nidhivan', 'raas-leela', 'mysterious', 'sacred-grove'],
    category: 'spiritual',
    accessibility: {
      wheelchairFriendly: false,
      elderlyFriendly: true,
      parking: true
    },
    facilities: ['washroom', 'drinking-water']
  },
  {
    name: 'Radha Raman Temple',
    description: 'Temple housing the self-manifested deity of Krishna worshipped by Gopal Bhatta Goswami. The deity is considered one of the most beautiful forms of Krishna.',
    type: 'temple',
    location: {
      coordinates: [77.7045, 27.5815],
      address: 'Radha Raman Temple, Vrindavan',
      city: 'Vrindavan'
    },
    avgVisitTime: 60,
    bestTime: 'morning',
    crowdLevel: 'low',
    entryFee: { amount: 0, currency: 'INR' },
    priorityScore: 8,
    religiousSignificance: 'The deity of Radha Raman self-manifested from a Shaligram Shila. It is one of the original deities installed by the Goswamis.',
    openingHours: {
      opens: '07:00',
      closes: '12:00',
      closedDays: []
    },
    rating: 4.7,
    reviewCount: 4200,
    tags: ['radha-raman', 'self-manifested', 'goswami'],
    category: 'spiritual',
    accessibility: {
      wheelchairFriendly: false,
      elderlyFriendly: true,
      parking: false
    },
    facilities: ['prasadam', 'drinking-water']
  }
];

// Famous Places in Mathura
const mathuraPlaces = [
  {
    name: 'Krishna Janmabhoomi Temple',
    description: 'The birthplace of Lord Krishna. The temple marks the exact spot where Krishna was born in a prison cell over 5000 years ago.',
    type: 'temple',
    location: {
      coordinates: [77.6733, 27.5046],
      address: 'Krishna Janmabhoomi, Mathura',
      city: 'Mathura'
    },
    avgVisitTime: 90,
    bestTime: 'morning',
    crowdLevel: 'high',
    entryFee: { amount: 0, currency: 'INR' },
    priorityScore: 10,
    religiousSignificance: 'The most sacred place in Mathura where Lord Krishna was born to Devaki and Vasudeva.',
    openingHours: {
      opens: '05:00',
      closes: '21:00',
      closedDays: []
    },
    rating: 4.8,
    reviewCount: 25000,
    tags: ['janmabhoomi', 'birthplace', 'krishna', 'must-visit'],
    category: 'spiritual',
    accessibility: {
      wheelchairFriendly: false,
      elderlyFriendly: true,
      parking: true
    },
    facilities: ['prasadam', 'locker', 'washroom', 'drinking-water']
  },
  {
    name: 'Dwarkadhish Temple',
    description: 'Principal temple of Mathura dedicated to Dwarkadhish (Lord of Dwarka). Known for elaborate decoration and daily aartis.',
    type: 'temple',
    location: {
      coordinates: [77.6729, 27.5050],
      address: 'Dwarkadhish Temple, Mathura',
      city: 'Mathura'
    },
    avgVisitTime: 75,
    bestTime: 'evening',
    crowdLevel: 'medium',
    entryFee: { amount: 0, currency: 'INR' },
    priorityScore: 9,
    religiousSignificance: 'One of the largest and most important Krishna temples in Mathura. The evening aarti is spectacular.',
    openingHours: {
      opens: '06:00',
      closes: '21:00',
      closedDays: []
    },
    rating: 4.7,
    reviewCount: 15000,
    tags: ['dwarkadhish', 'aarti', 'krishna'],
    category: 'spiritual',
    accessibility: {
      wheelchairFriendly: false,
      elderlyFriendly: true,
      parking: true
    },
    facilities: ['prasadam', 'washroom', 'drinking-water']
  },
  {
    name: 'Vishram Ghat',
    description: 'Most important ghat in Mathura where Krishna rested after killing Kansa. Pilgrims take holy dip in Yamuna here. Evening aarti is magnificent.',
    type: 'ghat',
    location: {
      coordinates: [77.6748, 27.5035],
      address: 'Vishram Ghat, Mathura',
      city: 'Mathura'
    },
    avgVisitTime: 60,
    bestTime: 'evening',
    crowdLevel: 'high',
    entryFee: { amount: 0, currency: 'INR' },
    priorityScore: 9,
    religiousSignificance: 'The ghat where Lord Krishna rested after defeating Kansa. The evening Yamuna aarti is divine.',
    openingHours: {
      opens: '05:00',
      closes: '22:00',
      closedDays: []
    },
    rating: 4.6,
    reviewCount: 10000,
    tags: ['ghat', 'yamuna', 'aarti', 'holy-bath'],
    category: 'spiritual',
    accessibility: {
      wheelchairFriendly: false,
      elderlyFriendly: false,
      parking: true
    },
    facilities: ['washroom', 'drinking-water']
  }
];

// Hotels in Vrindavan
const vrindavanHotels = [
  {
    name: 'ISKCON Guest House',
    description: 'Clean and spiritual accommodation within ISKCON temple premises. Includes prasadam and spiritual programs.',
    location: {
      coordinates: [77.6947, 27.5774],
      address: 'ISKCON Temple, Raman Reti, Vrindavan',
      city: 'Vrindavan'
    },
    priceRange: { min: 800, max: 1500, currency: 'INR' },
    category: 'budget',
    verified: true,
    rating: 4.5,
    reviewCount: 850,
    distanceFromCenter: 1.2,
    amenities: ['wifi', 'prasadam', 'hot-water', 'pooja-room'],
    contactInfo: {
      phone: '+91-565-2540021',
      email: 'iskconvrindavan@gmail.com'
    },
    localPriceBadge: true,
    tags: ['spiritual', 'clean', 'prasadam', 'budget-friendly']
  },
  {
    name: 'MVT Guesthouse',
    description: 'Popular among spiritual seekers. Located in peaceful Raman Reti area with all basic facilities.',
    location: {
      coordinates: [77.6955, 27.5780],
      address: 'Raman Reti, Vrindavan',
      city: 'Vrindavan'
    },
    priceRange: { min: 600, max: 1200, currency: 'INR' },
    category: 'budget',
    verified: true,
    rating: 4.3,
    reviewCount: 620,
    distanceFromCenter: 1.5,
    amenities: ['wifi', 'hot-water', 'parking'],
    contactInfo: {
      phone: '+91-565-2540125'
    },
    localPriceBadge: true,
    tags: ['budget', 'clean', 'peaceful']
  },
  {
    name: 'Prem Mandir Dharamshala',
    description: 'Affordable dharamshala near Prem Mandir. Basic but clean facilities for pilgrims.',
    location: {
      coordinates: [77.6900, 27.5735],
      address: 'Near Prem Mandir, Vrindavan',
      city: 'Vrindavan'
    },
    priceRange: { min: 300, max: 600, currency: 'INR' },
    category: 'dharamshala',
    verified: true,
    rating: 4.0,
    reviewCount: 450,
    distanceFromCenter: 0.8,
    amenities: ['hot-water', 'washroom'],
    localPriceBadge: true,
    tags: ['dharamshala', 'budget', 'near-temple']
  },
  {
    name: 'Hotel Basera Brij Bhoomi',
    description: 'Comfortable mid-range hotel with AC rooms. Good location near major temples.',
    location: {
      coordinates: [77.6980, 27.5790],
      address: 'Chhatikara Road, Vrindavan',
      city: 'Vrindavan'
    },
    priceRange: { min: 1500, max: 3000, currency: 'INR' },
    category: 'mid',
    verified: true,
    rating: 4.4,
    reviewCount: 720,
    distanceFromCenter: 1.0,
    amenities: ['wifi', 'ac', 'parking', 'hot-water', 'meals'],
    contactInfo: {
      phone: '+91-565-2540300',
      website: 'www.hotelbasera.com'
    },
    localPriceBadge: true,
    tags: ['mid-range', 'ac', 'comfortable']
  },
  {
    name: 'Ananda Krishna Van',
    description: 'Premium resort with beautiful gardens and temple view. Includes ayurvedic spa and vegetarian restaurant.',
    location: {
      coordinates: [77.6920, 27.5750],
      address: 'Parikrama Marg, Vrindavan',
      city: 'Vrindavan'
    },
    priceRange: { min: 4000, max: 8000, currency: 'INR' },
    category: 'premium',
    verified: true,
    rating: 4.8,
    reviewCount: 350,
    distanceFromCenter: 1.8,
    amenities: ['wifi', 'ac', 'parking', 'temple-view', 'meals', 'hot-water'],
    contactInfo: {
      phone: '+91-565-2541500',
      email: 'reservations@anandakrishna.com',
      website: 'www.anandakrishnavan.com'
    },
    localPriceBadge: false,
    tags: ['premium', 'resort', 'luxury', 'spa']
  }
];

// Hotels in Mathura
const mathuraHotels = [
  {
    name: 'Hotel Madhuvan',
    description: 'Well-located budget hotel near Krishna Janmabhoomi with basic amenities.',
    location: {
      coordinates: [77.6740, 27.5055],
      address: 'Near Krishna Janmabhoomi, Mathura',
      city: 'Mathura'
    },
    priceRange: { min: 800, max: 1500, currency: 'INR' },
    category: 'budget',
    verified: true,
    rating: 4.2,
    reviewCount: 580,
    distanceFromCenter: 0.3,
    amenities: ['wifi', 'parking', 'hot-water'],
    contactInfo: {
      phone: '+91-565-2503400'
    },
    localPriceBadge: true,
    tags: ['budget', 'near-temple', 'clean']
  },
  {
    name: 'Hotel Brijwasi Royal',
    description: 'Comfortable mid-range hotel with good facilities and restaurant.',
    location: {
      coordinates: [77.6850, 27.5100],
      address: 'Masani Bypass Road, Mathura',
      city: 'Mathura'
    },
    priceRange: { min: 2000, max: 4000, currency: 'INR' },
    category: 'mid',
    verified: true,
    rating: 4.5,
    reviewCount: 920,
    distanceFromCenter: 2.5,
    amenities: ['wifi', 'ac', 'parking', 'meals', 'hot-water'],
    contactInfo: {
      phone: '+91-565-2420000',
      email: 'info@brijwasiroyal.com'
    },
    localPriceBadge: true,
    tags: ['mid-range', 'restaurant', 'comfortable']
  }
];

// Transport Prices
const transportPrices = [
  {
    from: {
      name: 'Vrindavan Bus Stand',
      location: { coordinates: [77.6990, 27.5800] }
    },
    to: {
      name: 'Banke Bihari Temple',
      location: { coordinates: [77.7035, 27.5802] }
    },
    mode: 'auto',
    distance: 0.8,
    duration: 5,
    minPrice: 20,
    maxPrice: 40,
    recommendedPrice: 30,
    verifiedCount: 150,
    overchargeReports: 10,
    tips: ['Ask for meter', 'Negotiate before ride']
  },
  {
    from: {
      name: 'ISKCON Temple',
      location: { coordinates: [77.6947, 27.5774] }
    },
    to: {
      name: 'Prem Mandir',
      location: { coordinates: [77.6906, 27.5735] }
    },
    mode: 'e-rickshaw',
    distance: 1.2,
    duration: 8,
    minPrice: 15,
    maxPrice: 30,
    recommendedPrice: 20,
    verifiedCount: 200,
    overchargeReports: 5,
    tips: ['Fixed rate available', 'Shared rides cheaper']
  },
  {
    from: {
      name: 'Vrindavan',
      location: { coordinates: [77.7000, 27.5800] }
    },
    to: {
      name: 'Mathura Junction',
      location: { coordinates: [77.6733, 27.5046] }
    },
    mode: 'cab',
    distance: 12,
    duration: 25,
    minPrice: 250,
    maxPrice: 400,
    recommendedPrice: 300,
    verifiedCount: 80,
    overchargeReports: 15,
    tips: ['Book via app for better rates', 'Negotiate for round trip']
  },
  {
    from: {
      name: 'Mathura Junction',
      location: { coordinates: [77.6733, 27.5046] }
    },
    to: {
      name: 'Krishna Janmabhoomi',
      location: { coordinates: [77.6733, 27.5046] }
    },
    mode: 'auto',
    distance: 1.5,
    duration: 8,
    minPrice: 30,
    maxPrice: 50,
    recommendedPrice: 40,
    verifiedCount: 120,
    overchargeReports: 8,
    tips: ['Walk if possible', 'Negotiate price']
  }
];

// Seed function
const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/brajpath');
    console.log('📡 Connected to MongoDB');

    // Clear existing data
    await Place.deleteMany({});
    await Hotel.deleteMany({});
    await TransportPrice.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Insert places
    const allPlaces = [...vrindavanPlaces, ...mathuraPlaces];
    await Place.insertMany(allPlaces);
    console.log(`✅ Inserted ${allPlaces.length} places`);

    // Insert hotels
    const allHotels = [...vrindavanHotels, ...mathuraHotels];
    await Hotel.insertMany(allHotels);
    console.log(`✅ Inserted ${allHotels.length} hotels`);

    // Insert transport prices
    await TransportPrice.insertMany(transportPrices);
    console.log(`✅ Inserted ${transportPrices.length} transport routes`);

    console.log('\n🎉 Seed data inserted successfully!');
    console.log('🙏 Radhe Radhe! Database is ready.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run seed
seedData();
