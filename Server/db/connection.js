// db/connection.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Kiven2809:Asdfg_-_09@kiven28.uq1vb.mongodb.net/UserDetails?retryWrites=true&w=majority&appName=Kiven28');
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
