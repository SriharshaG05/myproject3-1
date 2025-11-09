const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
    match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [5, 'Subject must be at least 5 characters long'],
    maxlength: [100, 'Subject cannot exceed 100 characters'],
    match: [/^[a-zA-Z0-9\s\-\.\,\!\?]+$/, 'Subject contains invalid characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long'],
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
    match: [/^[a-zA-Z0-9\s\-\.\,\!\?\(\)\'\"]+$/, 'Message contains invalid characters']
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread'
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ email: 1 });

// Virtual for formatted date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Method to mark as read
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

// Method to mark as replied
contactSchema.methods.markAsReplied = function() {
  this.status = 'replied';
  return this.save();
};

// Static method to get unread count
contactSchema.statics.getUnreadCount = function() {
  return this.countDocuments({ status: 'unread' });
};

// Static method to validate contact data
contactSchema.statics.validateContactData = function(data) {
  const errors = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (!/^[a-zA-Z\s]+$/.test(data.name.trim())) {
    errors.push('Name can only contain letters and spaces');
  }

  // Email validation
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.push('Please enter a valid email address');
  }

  // Subject validation
  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long');
  } else if (!/^[a-zA-Z0-9\s\-\.\,\!\?]+$/.test(data.subject.trim())) {
    errors.push('Subject contains invalid characters');
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (!/^[a-zA-Z0-9\s\-\.\,\!\?\(\)\'\"]+$/.test(data.message.trim())) {
    errors.push('Message contains invalid characters');
  }

  return errors;
};

module.exports = mongoose.model('Contact', contactSchema);
