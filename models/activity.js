const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    enum: ['donor', 'receiver'],
    required: true
  },
  activityType: {
    type: String,
    enum: [
      'food_posted',
      'food_updated',
      'food_deleted',
      'request_made',
      'request_accepted',
      'request_rejected',
      'request_completed',
      'request_cancelled',
      'login',
      'profile_updated'
    ],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  metadata: {
    foodId: mongoose.Schema.Types.ObjectId,
    requestId: mongoose.Schema.Types.ObjectId,
    foodName: String,
    quantity: String,
    location: String,
    additionalInfo: mongoose.Schema.Types.Mixed
  },
  ipAddress: String,
  userAgent: String,
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'success'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
activitySchema.index({ createdAt: -1 });
activitySchema.index({ userId: 1, createdAt: -1 });
activitySchema.index({ userRole: 1, createdAt: -1 });
activitySchema.index({ activityType: 1, createdAt: -1 });

// Virtual for formatted date
activitySchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Static method to log activity
activitySchema.statics.logActivity = async function(data) {
  try {
    const activity = new this(data);
    await activity.save();
    return activity;
  } catch (error) {
    console.error('Error logging activity:', error);
    return null;
  }
};

// Static method to get recent activities
activitySchema.statics.getRecentActivities = function(limit = 50, role = null) {
  const query = role ? { userRole: role } : {};
  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('userId', 'name email location')
    .select('-__v');
};

// Static method to get user activities
activitySchema.statics.getUserActivities = function(userId, limit = 20) {
  return this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-__v');
};

// Static method to get activity statistics
activitySchema.statics.getStatistics = async function(days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const stats = await this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          role: '$userRole',
          type: '$activityType'
        },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: '$_id.role',
        activities: {
          $push: {
            type: '$_id.type',
            count: '$count'
          }
        },
        total: { $sum: '$count' }
      }
    }
  ]);

  return stats;
};

module.exports = mongoose.model('Activity', activitySchema);
