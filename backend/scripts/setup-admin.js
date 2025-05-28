require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/e-commerce')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    college: String,
    profilePicture: String,
    faculty: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

// Create admin user
async function createAdmin() {
    try {
        // Check if admin exists
        const existingAdmin = await User.findOne({ email: 'hozaifa@ieee.org' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create admin
        const admin = new User({
            email: 'hozaifa@ieee.org',
            password: 'admin1234',
            faculty: 'Engineering',
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

createAdmin(); 