const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@pua.edu',
    password: 'admin123',
    role: 'admin',
    faculty: 'Computer Science'
  },
  {
    name: 'John Doe',
    email: 'john@pua.edu',
    password: 'password123',
    faculty: 'Engineering'
  },
  {
    name: 'Jane Smith',
    email: 'jane@pua.edu',
    password: 'password123',
    faculty: 'Pharmacy'
  }
];

const sampleProducts = [
  {
    name: 'Data Structures Textbook',
    description: 'Comprehensive guide to data structures and algorithms',
    price: 49.99,
    faculty: 'Computer Science',
    type: 'Book',
    stock: 10,
    image: 'ds-textbook.jpg'
  },
  {
    name: 'Organic Chemistry Lab Manual',
    description: 'Complete lab manual for organic chemistry experiments',
    price: 29.99,
    faculty: 'Pharmacy',
    type: 'Book',
    stock: 15,
    image: 'chem-lab.jpg'
  },
  {
    name: 'Engineering Calculator',
    description: 'Professional calculator for engineering students',
    price: 89.99,
    faculty: 'Engineering',
    type: 'Tool',
    stock: 5,
    image: 'calc.jpg'
  },
  {
    name: 'Programming Assignment Sheet',
    description: 'Collection of programming problems and solutions',
    price: 9.99,
    faculty: 'Computer Science',
    type: 'Sheet',
    stock: 20,
    image: 'prog-sheet.jpg'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pua-ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const users = await User.create(sampleUsers);
    console.log('Created users');

    // Create products with seller references
    const products = await Product.create(
      sampleProducts.map(product => ({
        ...product,
        seller: users[0]._id // Admin user is the seller
      }))
    );
    console.log('Created products');

    // Add some products to user carts
    users[1].cart.push({ product: products[0]._id, quantity: 2 });
    users[2].cart.push({ product: products[1]._id, quantity: 1 });
    await Promise.all(users.map(user => user.save()));
    console.log('Updated user carts');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 