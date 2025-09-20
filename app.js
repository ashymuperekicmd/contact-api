// app.js - UPDATED VERSION
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { swaggerUi, specs } = require('./swagger');

// Load environment variables FIRST THING
dotenv.config();

// Debug: Check if environment variables are loaded
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded successfully' : 'NOT LOADED');
console.log('PORT:', process.env.PORT);

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/contacts', require('./routes/contacts'));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contacts API is running!',
    endpoints: {
      getAllContacts: 'GET /contacts',
      getContactById: 'GET /contacts/:id',
      createContact: 'POST /contacts',
      updateContact: 'PUT /contacts/:id',
      deleteContact: 'DELETE /contacts/:id',
      apiDocs: 'GET /api-docs'
    }
  });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('=========================================');
  console.log('🚀 Contacts API Server is running!');
  console.log('=========================================');
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
  console.log('=========================================');
});