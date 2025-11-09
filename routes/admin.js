const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const User = require('../models/user');
const Food = require('../models/food');
const Request = require('../models/request');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.session.role || req.session.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

// GET /admin/users - Get all users with IP information
router.get('/users', isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const role = req.query.role; // 'donor', 'receiver'
    const verified = req.query.verified; // 'true', 'false'

    let query = {};
    if (role) query.role = role;
    if (verified !== undefined) query.verified = verified === 'true';

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-password')
      .lean();

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
});

// GET /admin/all-food - Get all food items with status
router.get('/all-food', isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status; // 'available', 'reserved', 'delivered', 'completed'

    let query = {};
    if (status) query.status = status;

    const foods = await Food.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('donor_id', 'name email location phone')
      .select('-__v');

    const total = await Food.countDocuments(query);

    res.json({
      success: true,
      foods,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalFoods: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching food items'
    });
  }
});

// GET /admin/all-requests - Get all requests with status
router.get('/all-requests', isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status; // 'pending', 'accepted', 'rejected', 'completed'

    let query = {};
    if (status) query.status = status;

    const requests = await Request.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('food_id', 'food_name quantity location')
      .populate('donor_id', 'name email')
      .populate('receiver_id', 'name email location')
      .select('-__v');

    const total = await Request.countDocuments(query);

    res.json({
      success: true,
      requests,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRequests: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching requests'
    });
  }
});

// GET /admin/activities - Get all activities with filters
router.get('/activities', isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const role = req.query.role; // 'donor' or 'receiver'
    const type = req.query.type; // activity type
    const userId = req.query.userId;

    let query = {};
    if (role) query.userRole = role;
    if (type) query.activityType = type;
    if (userId) query.userId = userId;

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('userId', 'name email location phone role')
      .select('-__v');

    const total = await Activity.countDocuments(query);

    res.json({
      success: true,
      activities,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalActivities: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activities'
    });
  }
});

// GET /admin/statistics - Get activity statistics
router.get('/statistics', isAdmin, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    
    const stats = await Activity.getStatistics(days);
    
    // Get user counts
    const donorCount = await User.countDocuments({ role: 'donor', verified: true });
    const receiverCount = await User.countDocuments({ role: 'receiver', verified: true });
    const pendingCount = await User.countDocuments({ verified: false });

    // Get food statistics
    const totalFoodPosts = await Food.countDocuments();
    const availableFood = await Food.countDocuments({ status: 'available' });
    const reservedFood = await Food.countDocuments({ status: 'reserved' });
    const completedFood = await Food.countDocuments({ status: 'completed' });

    // Get request statistics
    const totalRequests = await Request.countDocuments();
    const pendingRequests = await Request.countDocuments({ status: 'pending' });
    const acceptedRequests = await Request.countDocuments({ status: 'accepted' });
    const rejectedRequests = await Request.countDocuments({ status: 'rejected' });
    const completedRequests = await Request.countDocuments({ status: 'completed' });

    // Get recent activity count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayActivities = await Activity.countDocuments({ createdAt: { $gte: today } });

    res.json({
      success: true,
      statistics: {
        users: {
          donors: donorCount,
          receivers: receiverCount,
          pending: pendingCount,
          total: donorCount + receiverCount
        },
        food: {
          total: totalFoodPosts,
          available: availableFood,
          reserved: reservedFood,
          completed: completedFood
        },
        requests: {
          total: totalRequests,
          pending: pendingRequests,
          accepted: acceptedRequests,
          rejected: rejectedRequests,
          completed: completedRequests
        },
        activities: {
          today: todayActivities,
          byRole: stats
        }
      }
    });

  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

// GET /admin/user/:userId/activities - Get specific user's activities
router.get('/user/:userId/activities', isAdmin, async (req, res) => {
  try {
    const activities = await Activity.getUserActivities(req.params.userId, 50);
    
    res.json({
      success: true,
      activities
    });

  } catch (error) {
    console.error('Error fetching user activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user activities'
    });
  }
});

// GET /admin/dashboard-data - Get all data for admin dashboard
router.get('/dashboard-data', isAdmin, async (req, res) => {
  try {
    // Get recent activities
    const recentActivities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'name email location role')
      .select('-__v');

    // Get pending users
    const pendingUsers = await User.find({ verified: false })
      .sort({ createdAt: -1 })
      .select('-password');

    // Get statistics
    const donorCount = await User.countDocuments({ role: 'donor', verified: true });
    const receiverCount = await User.countDocuments({ role: 'receiver', verified: true });
    const totalFoodPosts = await Food.countDocuments();
    const availableFood = await Food.countDocuments({ status: 'available' });
    const totalRequests = await Request.countDocuments();
    const pendingRequests = await Request.countDocuments({ status: 'pending' });

    res.json({
      success: true,
      data: {
        recentActivities,
        pendingUsers,
        statistics: {
          donors: donorCount,
          receivers: receiverCount,
          foodPosts: totalFoodPosts,
          availableFood,
          requests: totalRequests,
          pendingRequests
        }
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
});

module.exports = router;
