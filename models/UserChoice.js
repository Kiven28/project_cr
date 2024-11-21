// models/UserChoice.js
const mongoose = require('mongoose');

const UserChoiceSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  formType: { type: String, required: true },
  selectedCategory: { type: String, required: true },
  selectedKeywords: { type: [String], required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserChoice', UserChoiceSchema);
