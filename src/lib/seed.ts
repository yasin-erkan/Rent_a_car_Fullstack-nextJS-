import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectMongo from './mongodb';
import User from './models/User';
import Car from './models/Car';
import {Order} from './models/Order';
import Review from './models/Review';

// Test data
const testUsers = [
  {
    email: 'yasin@gmail.com',
    password: 'admin123',
    firstName: 'Yasin',
    lastName: 'Yasin',
    phone: '+1234567890',
    profilePhoto: '/profile.jpg',
    isAdmin: true,
    isEmailVerified: true,
  },
  {
    email: 'john.doe@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567891',
    isAdmin: false,
    isEmailVerified: true,
  },
  {
    email: 'jane.smith@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1234567892',
    isAdmin: false,
    isEmailVerified: true,
  },
  {
    email: 'mike.johnson@example.com',
    password: 'password123',
    firstName: 'Mike',
    lastName: 'Johnson',
    phone: '+1234567893',
    isAdmin: false,
    isEmailVerified: true,
  },
  {
    email: 'sarah.wilson@example.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Wilson',
    phone: '+1234567894',
    isAdmin: false,
    isEmailVerified: false,
  },
];

const testCars = [
  {
    make: 'Toyota',
    modelName: 'Camry',
    year: 2023,
    type: 'sedan',
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 4,
    pricePerDay: 65,
    description:
      'A reliable and fuel-efficient sedan perfect for city driving and long trips.',
    features: [
      'Bluetooth',
      'GPS Navigation',
      'Backup Camera',
      'Cruise Control',
      'Heated Seats',
    ],
    location: 'New York, NY',
    isAvailable: true,
    mileage: 15000,
    color: 'White',
    licensePlate: 'NYC-001',
  },
  {
    make: 'Ford',
    modelName: 'Explorer',
    year: 2022,
    type: 'suv',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 7,
    doors: 5,
    pricePerDay: 85,
    description:
      'Spacious SUV ideal for families and group trips with plenty of cargo space.',
    features: [
      '4WD',
      'Third Row Seating',
      'Roof Rack',
      'Tow Package',
      'Apple CarPlay',
    ],
    location: 'Los Angeles, CA',
    isAvailable: true,
    mileage: 22000,
    color: 'Blue',
    licensePlate: 'CA-002',
  },
  {
    make: 'Honda',
    modelName: 'Civic',
    year: 2024,
    type: 'sedan',
    transmission: 'manual',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    pricePerDay: 45,
    description:
      'Compact and efficient car perfect for urban driving with excellent fuel economy.',
    features: [
      'Manual Transmission',
      'Sunroof',
      'Sport Mode',
      'Honda Sensing',
      'Wireless Charging',
    ],
    location: 'Chicago, IL',
    isAvailable: true,
    mileage: 8000,
    color: 'Red',
    licensePlate: 'IL-003',
  },
  {
    make: 'BMW',
    modelName: 'X5',
    year: 2023,
    type: 'luxury',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 5,
    pricePerDay: 150,
    description:
      'Premium luxury SUV with exceptional comfort and performance features.',
    features: [
      'Leather Seats',
      'Panoramic Sunroof',
      'Premium Audio',
      'Adaptive Cruise',
      'Wireless Charging',
    ],
    location: 'Miami, FL',
    isAvailable: true,
    mileage: 12000,
    color: 'Black',
    licensePlate: 'FL-004',
  },
  {
    make: 'Tesla',
    modelName: 'Model 3',
    year: 2023,
    type: 'sedan',
    transmission: 'automatic',
    fuelType: 'electric',
    seats: 5,
    doors: 4,
    pricePerDay: 95,
    description:
      'Revolutionary electric sedan with autopilot and cutting-edge technology.',
    features: [
      'Autopilot',
      'Supercharging',
      'Premium Connectivity',
      'Glass Roof',
      'Over-the-Air Updates',
    ],
    location: 'San Francisco, CA',
    isAvailable: true,
    mileage: 18000,
    color: 'Silver',
    licensePlate: 'CA-005',
  },
  {
    make: 'Jeep',
    modelName: 'Wrangler',
    year: 2022,
    type: 'suv',
    transmission: 'manual',
    fuelType: 'gasoline',
    seats: 4,
    doors: 4,
    pricePerDay: 75,
    description:
      'Rugged off-road vehicle perfect for adventure seekers and outdoor enthusiasts.',
    features: [
      '4WD',
      'Removable Doors',
      'Fold-Down Windshield',
      'Rock Rails',
      'Skid Plates',
    ],
    location: 'Denver, CO',
    isAvailable: true,
    mileage: 25000,
    color: 'Green',
    licensePlate: 'CO-006',
  },
  {
    make: 'Porsche',
    modelName: '911',
    year: 2023,
    type: 'sports',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 2,
    doors: 2,
    pricePerDay: 300,
    description:
      'Iconic sports car delivering unmatched performance and driving experience.',
    features: [
      'Sport Chrono',
      'PASM',
      'Sport Exhaust',
      'Ceramic Brakes',
      'Launch Control',
    ],
    location: 'Las Vegas, NV',
    isAvailable: true,
    mileage: 5000,
    color: 'Yellow',
    licensePlate: 'NV-007',
  },
  {
    make: 'Volkswagen',
    modelName: 'Golf',
    year: 2022,
    type: 'hatchback',
    transmission: 'manual',
    fuelType: 'gasoline',
    seats: 5,
    doors: 5,
    pricePerDay: 55,
    description:
      'Versatile hatchback with excellent handling and practical cargo space.',
    features: [
      'Manual Transmission',
      'Hatchback Design',
      'Digital Cockpit',
      'Adaptive Headlights',
      'Parking Sensors',
    ],
    location: 'Seattle, WA',
    isAvailable: false,
    mileage: 28000,
    color: 'Gray',
    licensePlate: 'WA-008',
  },
  {
    make: 'Mercedes-Benz',
    modelName: 'C-Class',
    year: 2023,
    type: 'luxury',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    pricePerDay: 135,
    description:
      'Elegant luxury sedan with cutting-edge technology and premium comfort.',
    features: [
      'MBUX Infotainment',
      'Burmester Sound',
      'Active Park Assist',
      'LED Headlights',
      'Memory Seats',
    ],
    location: 'Boston, MA',
    isAvailable: true,
    mileage: 9000,
    color: 'Silver',
    licensePlate: 'MA-009',
  },
  {
    make: 'Audi',
    modelName: 'Q7',
    year: 2023,
    type: 'luxury',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 7,
    doors: 5,
    pricePerDay: 145,
    description:
      'Spacious luxury SUV with advanced quattro all-wheel drive technology.',
    features: [
      'Virtual Cockpit',
      'MMI Navigation',
      'Bang & Olufsen Audio',
      'Adaptive Air Suspension',
      'Matrix LED Headlights',
    ],
    location: 'Dallas, TX',
    isAvailable: true,
    mileage: 14000,
    color: 'Black',
    licensePlate: 'TX-010',
  },
  {
    make: 'Mazda',
    modelName: 'CX-5',
    year: 2023,
    type: 'suv',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 5,
    pricePerDay: 70,
    description:
      'Stylish compact SUV with excellent fuel economy and sporty handling.',
    features: [
      'i-ACTIVSENSE Safety',
      'Bose Audio',
      'Apple CarPlay',
      'Power Liftgate',
      'Blind Spot Monitoring',
    ],
    location: 'Phoenix, AZ',
    isAvailable: true,
    mileage: 16000,
    color: 'Red',
    licensePlate: 'AZ-011',
  },
  {
    make: 'Hyundai',
    modelName: 'Sonata',
    year: 2024,
    type: 'sedan',
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 4,
    pricePerDay: 60,
    description:
      'Modern hybrid sedan with impressive fuel efficiency and tech features.',
    features: [
      'Smart Cruise Control',
      'Wireless Charging',
      'Lane Keep Assist',
      'Digital Key',
      'Heated & Cooled Seats',
    ],
    location: 'Atlanta, GA',
    isAvailable: true,
    mileage: 7000,
    color: 'Blue',
    licensePlate: 'GA-012',
  },
  {
    make: 'Kia',
    modelName: 'Sportage',
    year: 2023,
    type: 'suv',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 5,
    pricePerDay: 68,
    description:
      'Reliable compact SUV with modern design and advanced safety features.',
    features: [
      'Smart Key',
      'Rear Camera',
      'Android Auto',
      'Forward Collision Warning',
      'LED Daytime Running Lights',
    ],
    location: 'Portland, OR',
    isAvailable: true,
    mileage: 19000,
    color: 'White',
    licensePlate: 'OR-013',
  },
  {
    make: 'Chevrolet',
    modelName: 'Tahoe',
    year: 2022,
    type: 'suv',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 8,
    doors: 5,
    pricePerDay: 95,
    description:
      'Full-size SUV perfect for large families and long road trips.',
    features: [
      'Third Row Seating',
      'Towing Package',
      'Rear Entertainment',
      'Power Liftgate',
      'Heated Steering Wheel',
    ],
    location: 'Houston, TX',
    isAvailable: true,
    mileage: 24000,
    color: 'Black',
    licensePlate: 'TX-014',
  },
  {
    make: 'Toyota',
    modelName: 'RAV4',
    year: 2023,
    type: 'suv',
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 5,
    pricePerDay: 72,
    description:
      'Popular hybrid SUV combining efficiency with capability and reliability.',
    features: [
      'Toyota Safety Sense',
      'All-Wheel Drive',
      'Smart Entry',
      'Dual Zone Climate',
      'Power Moonroof',
    ],
    location: 'San Diego, CA',
    isAvailable: true,
    mileage: 11000,
    color: 'Blue',
    licensePlate: 'CA-015',
  },
  {
    make: 'Nissan',
    modelName: 'Altima',
    year: 2023,
    type: 'sedan',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    pricePerDay: 58,
    description:
      'Comfortable midsize sedan with spacious interior and smooth ride.',
    features: [
      'ProPILOT Assist',
      'Intelligent Cruise Control',
      'Bose Audio',
      'Remote Start',
      'Push Button Start',
    ],
    location: 'Orlando, FL',
    isAvailable: true,
    mileage: 13000,
    color: 'Gray',
    licensePlate: 'FL-016',
  },
  {
    make: 'Mercedes-Benz',
    modelName: 'E-Class',
    year: 2023,
    type: 'luxury',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    pricePerDay: 175,
    description:
      'Executive luxury sedan with unparalleled comfort and advanced technology.',
    features: [
      'AIRMATIC Suspension',
      'Burmester 3D Sound',
      'Multibeam LED Headlights',
      'Nappa Leather',
      'Head-Up Display',
    ],
    location: 'Washington, DC',
    isAvailable: true,
    mileage: 8000,
    color: 'Black',
    licensePlate: 'DC-017',
  },
  {
    make: 'Audi',
    modelName: 'A4',
    year: 2023,
    type: 'sedan',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 4,
    pricePerDay: 115,
    description:
      'Premium sports sedan with quattro all-wheel drive and refined performance.',
    features: [
      'Virtual Cockpit Plus',
      'MMI Touch',
      'Bang & Olufsen Sound',
      'Sport Seats',
      'Adaptive Cruise Control',
    ],
    location: 'Philadelphia, PA',
    isAvailable: true,
    mileage: 10000,
    color: 'White',
    licensePlate: 'PA-018',
  },
  {
    make: 'Range Rover',
    modelName: 'Sport',
    year: 2023,
    type: 'luxury',
    transmission: 'automatic',
    fuelType: 'gasoline',
    seats: 5,
    doors: 5,
    pricePerDay: 200,
    description:
      'Luxury performance SUV with exceptional off-road capability and refinement.',
    features: [
      'Terrain Response',
      'Meridian Audio',
      'Air Suspension',
      'Panoramic Roof',
      'Adaptive Dynamics',
    ],
    location: 'Nashville, TN',
    isAvailable: true,
    mileage: 6000,
    color: 'Gray',
    licensePlate: 'TN-019',
  },
  {
    make: 'Lexus',
    modelName: 'RX',
    year: 2023,
    type: 'luxury',
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    doors: 5,
    pricePerDay: 125,
    description:
      'Luxury hybrid SUV known for reliability, comfort, and smooth ride quality.',
    features: [
      'Lexus Safety System',
      'Mark Levinson Audio',
      'Heated & Ventilated Seats',
      'Power Tailgate',
      'Premium Navigation',
    ],
    location: 'Minneapolis, MN',
    isAvailable: true,
    mileage: 12000,
    color: 'Silver',
    licensePlate: 'MN-020',
  },
];

const seedDatabase = async () => {
  try {
    await connectMongo();
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Car.deleteMany({}),
      Order.deleteMany({}),
      Review.deleteMany({}),
    ]);

    // Create users
    console.log('Creating users...');
    const users = [];
    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      users.push(user);
    }
    console.log(`Created ${users.length} users`);

    // Create cars
    console.log('Creating cars...');
    const cars = await Car.insertMany(testCars);
    console.log(`Created ${cars.length} cars`);

    // Create orders
    console.log('Creating orders...');
    const orders = [];
    const orderData = [
      {
        user: users[1]._id,
        product: cars[0]._id,
        price: 195,
        currency: 'USD',
        type: 'rental',
        rental: {
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-01-18'),
          days: 3,
          pickupLocation: 'New York, NY',
          dropoffLocation: 'New York, NY',
          notes: 'Great experience with the Toyota Camry!',
        },
        status: 'paid',
      },
      {
        user: users[2]._id,
        product: cars[1]._id,
        price: 425,
        currency: 'USD',
        type: 'rental',
        rental: {
          startDate: new Date('2024-01-20'),
          endDate: new Date('2024-01-25'),
          days: 5,
          pickupLocation: 'Los Angeles, CA',
          dropoffLocation: 'Los Angeles, CA',
          notes: 'Perfect for our family vacation.',
        },
        status: 'paid',
      },
      {
        user: users[3]._id,
        product: cars[2]._id,
        price: 90,
        currency: 'USD',
        type: 'rental',
        rental: {
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-02-03'),
          days: 2,
          pickupLocation: 'Chicago, IL',
          dropoffLocation: 'Chicago, IL',
        },
        status: 'paid',
      },
      {
        user: users[1]._id,
        product: cars[3]._id,
        price: 300,
        currency: 'USD',
        type: 'rental',
        rental: {
          startDate: new Date('2024-02-10'),
          endDate: new Date('2024-02-12'),
          days: 2,
          pickupLocation: 'Miami, FL',
          dropoffLocation: 'Miami, FL',
          notes: 'Looking forward to driving this luxury SUV.',
        },
        status: 'pending',
      },
      {
        user: users[4]._id,
        product: cars[4]._id,
        price: 475,
        currency: 'USD',
        type: 'rental',
        rental: {
          startDate: new Date('2024-02-15'),
          endDate: new Date('2024-02-20'),
          days: 5,
          pickupLocation: 'San Francisco, CA',
          dropoffLocation: 'San Francisco, CA',
          notes: 'First time renting an electric car!',
        },
        status: 'pending',
      },
      {
        user: users[2]._id,
        product: cars[5]._id,
        price: 300,
        currency: 'USD',
        type: 'rental',
        rental: {
          startDate: new Date('2024-03-01'),
          endDate: new Date('2024-03-05'),
          days: 4,
          pickupLocation: 'Denver, CO',
          dropoffLocation: 'Denver, CO',
          notes: 'Planning a mountain adventure!',
        },
        status: 'pending',
      },
    ];

    for (const order of orderData) {
      const newOrder = await Order.create(order);
      orders.push(newOrder);
    }
    console.log(`Created ${orders.length} orders`);

    // Create reviews (only for paid orders)
    console.log('Creating reviews...');
    const paidOrders = orders.filter(o => o.status === 'paid');
    const reviews = [];

    const reviewData = [
      {
        userId: users[1]._id,
        carId: cars[0]._id,
        orderId: paidOrders[0]._id,
        rating: 5,
        comment:
          'Excellent car! Very fuel efficient and comfortable for city driving. The hybrid system worked perfectly and the car was spotless when I picked it up.',
        isApproved: true,
        isHidden: false,
      },
      {
        userId: users[2]._id,
        carId: cars[1]._id,
        orderId: paidOrders[1]._id,
        rating: 4,
        comment:
          'Great family SUV with plenty of space for our luggage and kids. The third row seating was very useful. Only minor complaint was the fuel consumption in city traffic.',
        isApproved: true,
        isHidden: false,
      },
      {
        userId: users[3]._id,
        carId: cars[2]._id,
        orderId: paidOrders[2]._id,
        rating: 5,
        comment:
          'Perfect city car! The manual transmission was smooth and the car handled beautifully. Great value for money and excellent fuel economy.',
        isApproved: true,
        isHidden: false,
      },
    ];

    for (const review of reviewData) {
      const newReview = await Review.create(review);
      reviews.push(newReview);
    }
    console.log(`Created ${reviews.length} reviews`);

    // Update car ratings based on reviews
    console.log('Updating car ratings...');
    for (const car of cars) {
      const carReviews = reviews.filter(
        r => r.carId.toString() === car._id.toString(),
      );
      if (carReviews.length > 0) {
        const averageRating =
          carReviews.reduce((sum, review) => sum + review.rating, 0) /
          carReviews.length;
        await Car.findByIdAndUpdate(car._id, {
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: carReviews.length,
        });
      }
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nTest accounts created:');
    console.log('📧 Admin: admin@carrental.com / admin123');
    console.log('📧 User: john.doe@example.com / password123');
    console.log('📧 User: jane.smith@example.com / password123');
    console.log('📧 User: mike.johnson@example.com / password123');
    console.log('📧 User: sarah.wilson@example.com / password123');

    console.log('\nData summary:');
    console.log(`✅ ${users.length} users created`);
    console.log(`✅ ${cars.length} cars created`);
    console.log(`✅ ${orders.length} orders created`);
    console.log(`✅ ${reviews.length} reviews created`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Export the seed function
export default seedDatabase;

// Allow running this file directly
if (require.main === module) {
  seedDatabase();
}
