// scripts/seed-database.js
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
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
  },
  {
    firstName: "Alice",
    lastName: "Williams",
    email: "alice.williams@example.com",
    favoriteColor: "Purple",
    birthday: new Date("1988-03-10")
  },
  {
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    favoriteColor: "Yellow",
    birthday: new Date("1995-07-20")
  }
];

const seedDatabase = async () => {
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
    
    // Display all contacts
    const contacts = await Contact.find().sort({ lastName: 1, firstName: 1 });
    console.log('\nAll contacts:');
    contacts.forEach(contact => {
      console.log(`${contact.firstName} ${contact.lastName} - ${contact.email}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();