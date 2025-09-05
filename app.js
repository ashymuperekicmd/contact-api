// app.js (simple formatted version)
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/contacts', require('./routes/contacts'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contacts API is running!',
    endpoints: {
      getAllContacts: 'GET /contacts',
      getContactById: 'GET /contacts/:id',
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
  console.log('╔═════════════════════════════════════╗');
  console.log('║            Contacts API             ║');
  console.log('╠═════════════════════════════════════╣');
  console.log('║ 🚀 Server is running!               ║');
  console.log(`║ 📍 http://localhost:${PORT}           ║`);
  console.log('╠═════════════════════════════════════╣');
  console.log('║             ENDPOINTS               ║');
  console.log('╠═════════════════════════════════════╣');
  console.log(`║ GET  /contacts                      ║`);
  console.log('║     - Get all contacts              ║');
  console.log('║ GET  /contacts/:id                  ║');
  console.log('║     - Get contact by ID            ║');
  console.log('║ GET  /                             ║');
  console.log('║     - API info                     ║');
  console.log('╚═════════════════════════════════════╝');
});