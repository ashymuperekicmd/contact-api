// add-sample-data.js
const mongoose = require('mongoose');
const Contact = require('./models/Contact');
require('dotenv').config();

const sampleContacts = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    favoriteColor: "Blue",
    birthday: new Date("1990-01-01")
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    favoriteColor: "Green",
    birthday: new Date("1985-05-15")
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    favoriteColor: "Red",
    birthday: new Date("1992-11-23")
  }
];

const addSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Contact.deleteMany({});
    console.log('Cleared existing contacts');
    
    // Add sample data
    await Contact.insertMany(sampleContacts);
    console.log('Added sample contacts');
    
    // Verify the data was added
    const count = await Contact.countDocuments();
    console.log(`Total contacts in database: ${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample data:', error);
    process.exit(1);
  }
};

addSampleData();