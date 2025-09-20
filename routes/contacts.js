// routes/contacts.js - UPDATED SWAGGER DOCS
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact management API
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Returns the list of all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: The list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactArray'
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: The contact data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the contact
 *               lastName:
 *                 type: string
 *                 description: The last name of the contact
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the contact
 *               favoriteColor:
 *                 type: string
 *                 description: The favorite color of the contact
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The birthday of the contact
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               email: john.doe@example.com
 *               favoriteColor: Blue
 *               birthday: 1990-01-01
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact created successfully
 *                 id:
 *                   type: string
 *                   description: The ID of the created contact
 *                 contact:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Validation error or email already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  try {
    console.log('Attempting to create a new contact:', req.body);
    
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ 
        message: 'First name, last name, and email are required' 
      });
    }
    
    // Check if email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({ 
        message: 'A contact with this email already exists' 
      });
    }
    
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday: birthday ? new Date(birthday) : undefined
    });
    
    const savedContact = await newContact.save();
    console.log('Contact created successfully:', savedContact);
    
    res.status(201).json({ 
      message: 'Contact created successfully',
      id: savedContact._id,
      contact: savedContact
    });
  } catch (error) {
    console.error('Error creating contact:', error.message);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error', 
        error: error.message 
      });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the contact
 *               lastName:
 *                 type: string
 *                 description: The last name of the contact
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the contact
 *               favoriteColor:
 *                 type: string
 *                 description: The favorite color of the contact
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: The birthday of the contact
 *             example:
 *               firstName: John
 *               lastName: Smith
 *               email: john.smith@example.com
 *               favoriteColor: Green
 *               birthday: 1990-01-01
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact updated successfully
 *                 contact:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Validation error or email already exists
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
  try {
    console.log(`Attempting to update contact with ID: ${req.params.id}`);
    console.log('Update data:', req.body);
    
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
    // Check if contact exists
    const existingContact = await Contact.findById(req.params.id);
    if (!existingContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // Check if email is being changed to one that already exists
    if (email && email !== existingContact.email) {
      const contactWithEmail = await Contact.findOne({ email });
      if (contactWithEmail) {
        return res.status(400).json({ 
          message: 'A contact with this email already exists' 
        });
      }
    }
    
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (favoriteColor !== undefined) updateData.favoriteColor = favoriteColor;
    if (birthday !== undefined) updateData.birthday = birthday ? new Date(birthday) : null;
    
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    console.log('Contact updated successfully:', updatedContact);
    res.json({ 
      message: 'Contact updated successfully',
      contact: updatedContact
    });
  } catch (error) {
    console.error('Error updating contact:', error.message);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation Error', 
        error: error.message 
      });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact ID
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Attempting to delete contact with ID: ${req.params.id}`);
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      console.log('Contact not found');
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    await Contact.findByIdAndDelete(req.params.id);
    console.log('Contact deleted successfully');
    
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting contact:', error.message);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;