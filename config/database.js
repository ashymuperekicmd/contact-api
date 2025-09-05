// config/database.js - UPDATED VERSION
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Debug: Check if MONGODB_URI is available
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('Attempting to connect to MongoDB with URI:', process.env.MONGODB_URI);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;