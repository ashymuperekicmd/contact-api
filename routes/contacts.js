// routes/contacts.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   GET /contacts
// @desc    Get all contacts
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch contacts from database...');
    const contacts = await Contact.find().sort({ lastName: 1, firstName: 1 });
    console.log(`Found ${contacts.length} contacts`);
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /contacts/:id
// @desc    Get single contact by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    console.log(`Attempting to fetch contact with ID: ${req.params.id}`);
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      console.log('Contact not found');
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    console.log('Contact found:', contact);
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error.message);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;