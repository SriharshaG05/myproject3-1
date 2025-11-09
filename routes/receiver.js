const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const Request = require('../models/request');
const User = require('../models/user');
const Activity = require('../models/activity');

// Middleware to check if user is receiver
const isReceiver = (req, res, next) => {
  if (!req.session.userId || req.session.role !== 'receiver') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Get all available food
router.get('/available-food', isReceiver, async (req, res) => {
  try {
    const { location, search } = req.query;
    let query = { status: 'available' };

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (search) {
      query.food_name = { $regex: search, $options: 'i' };
    }

    const foods = await Food.find(query)
      .populate('donor_id', 'name location')
      .sort({ createdAt: -1 });

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Request food
router.post('/request-food/:foodId', isReceiver, async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId).populate('donor_id');
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    if (food.status !== 'available') {
      return res.status(400).json({ message: 'Food is no longer available' });
    }

    // Check if already requested
    const existingRequest = await Request.findOne({
      food_id: req.params.foodId,
      receiver_id: req.session.userId
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You have already requested this food' });
    }

    const request = new Request({
      food_id: req.params.foodId,
      receiver_id: req.session.userId,
      donor_id: food.donor_id,
      status: 'pending'
    });

    await request.save();

    // Update food status to requested
    food.status = 'requested';
    await food.save();

    // Log activity
    const user = await User.findById(req.session.userId);
    await Activity.logActivity({
      userId: req.session.userId,
      userName: user.name,
      userRole: 'receiver',
      activityType: 'request_made',
      description: `Requested ${food.food_name} from ${food.donor_id.name}`,
      metadata: {
        requestId: request._id,
        foodId: food._id,
        foodName: food.food_name,
        quantity: food.quantity,
        location: food.location
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json({ message: 'Request sent successfully', request });
  } catch (error) {
    console.error('Request food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get receiver's requests
router.get('/my-requests', isReceiver, async (req, res) => {
  try {
    const requests = await Request.find({ receiver_id: req.session.userId })
      .populate('food_id')
      .populate('donor_id', 'name email location')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get receiver info
router.get('/info', isReceiver, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
