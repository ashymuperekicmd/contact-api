// models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  favoriteColor: {
    type: String,
    trim: true
  },
  birthday: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);