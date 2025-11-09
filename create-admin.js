// Script to create admin user in MongoDB Atlas
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import User model
const User = require('./models/user');

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 50,
      minPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'iadmin@gmail.com' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('super123', 10);

    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'iadmin@gmail.com',
      password: hashedPassword,
      role: 'admin',
      location: 'Admin Location',
      verified: true,
      phone: '0000000000',
      address: 'Admin Address'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email: iadmin@gmail.com');
    console.log('Password: super123');
    console.log('Role: admin');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
}

createAdmin();
