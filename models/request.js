const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Request', requestSchema);
