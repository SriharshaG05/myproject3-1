const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  food_name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  prepared_time: {
    type: Date,
    required: true
  },
  available_until: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'requested', 'reserved', 'delivered'],
    default: 'available'
  },
  donor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Food', foodSchema);
