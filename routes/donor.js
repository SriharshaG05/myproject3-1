const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const Request = require('../models/request');
const User = require('../models/user');
const Activity = require('../models/activity');

// Middleware to check if user is donor
const isDonor = (req, res, next) => {
  if (!req.session.userId || req.session.role !== 'donor') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Post new food
router.post('/post-food', isDonor, async (req, res) => {
  try {
    const { food_name, quantity, prepared_time, available_until, location } = req.body;

    const food = new Food({
      food_name,
      quantity,
      prepared_time,
      available_until,
      location,
      donor_id: req.session.userId,
      status: 'available'
    });

    await food.save();

    // Log activity
    const user = await User.findById(req.session.userId);
    await Activity.logActivity({
      userId: req.session.userId,
      userName: user.name,
      userRole: 'donor',
      activityType: 'food_posted',
      description: `Posted food: ${food_name}`,
      metadata: {
        foodId: food._id,
        foodName: food_name,
        quantity,
        location
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json({ message: 'Food posted successfully', food });
  } catch (error) {
    console.error('Post food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get donor's food posts
router.get('/my-posts', isDonor, async (req, res) => {
  try {
    const foods = await Food.find({ donor_id: req.session.userId })
      .sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get requests for donor's food
router.get('/requests', isDonor, async (req, res) => {
  try {
    const requests = await Request.find({ donor_id: req.session.userId })
      .populate('food_id')
      .populate('receiver_id', 'name email location')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept a request
router.post('/accept-request/:requestId', isDonor, async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId)
      .populate('food_id')
      .populate('receiver_id');
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = 'accepted';
    await request.save();

    // Update food status to reserved
    await Food.findByIdAndUpdate(request.food_id, { status: 'reserved' });

    // Log activity
    const user = await User.findById(req.session.userId);
    await Activity.logActivity({
      userId: req.session.userId,
      userName: user.name,
      userRole: 'donor',
      activityType: 'request_accepted',
      description: `Accepted request from ${request.receiver_id.name} for ${request.food_id.food_name}`,
      metadata: {
        requestId: request._id,
        foodId: request.food_id._id,
        foodName: request.food_id.food_name,
        receiverName: request.receiver_id.name
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'Request accepted', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject a request
router.post('/reject-request/:requestId', isDonor, async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestId)
      .populate('food_id')
      .populate('receiver_id');
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = 'rejected';
    await request.save();

    // Log activity
    const user = await User.findById(req.session.userId);
    await Activity.logActivity({
      userId: req.session.userId,
      userName: user.name,
      userRole: 'donor',
      activityType: 'request_rejected',
      description: `Rejected request from ${request.receiver_id.name} for ${request.food_id.food_name}`,
      metadata: {
        requestId: request._id,
        foodId: request.food_id._id,
        foodName: request.food_id.food_name,
        receiverName: request.receiver_id.name
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'Request rejected', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark as delivered
router.post('/mark-delivered/:foodId', isDonor, async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    if (food.donor_id.toString() !== req.session.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    food.status = 'delivered';
    await food.save();

    // Add points to donor
    await User.findByIdAndUpdate(req.session.userId, { $inc: { points: 10 } });

    // Log activity
    const user = await User.findById(req.session.userId);
    await Activity.logActivity({
      userId: req.session.userId,
      userName: user.name,
      userRole: 'donor',
      activityType: 'request_completed',
      description: `Completed delivery of ${food.food_name}`,
      metadata: {
        foodId: food._id,
        foodName: food.food_name,
        additionalInfo: { pointsEarned: 10 }
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'Marked as delivered! +10 points', food });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get donor stats
router.get('/stats', isDonor, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const totalPosts = await Food.countDocuments({ donor_id: req.session.userId });
    const deliveredCount = await Food.countDocuments({ 
      donor_id: req.session.userId, 
      status: 'delivered' 
    });

    res.json({
      name: user.name,
      points: user.points,
      totalPosts,
      deliveredCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
