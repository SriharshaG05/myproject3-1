const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
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
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['donor', 'receiver'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0
  },
  lastLoginIP: {
    type: String,
    default: null
  },
  lastLoginDate: {
    type: Date,
    default: null
  },
  loginHistory: [{
    ipAddress: String,
    userAgent: String,
    loginTime: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
