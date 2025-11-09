const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST /contact - Handle contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Use model validation
    const validationErrors = Contact.validateContactData({
      name,
      email,
      subject,
      message
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';

    // Create new contact message
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      ipAddress,
      userAgent
    });

    // Save to database
    await contact.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form submission error:', error);

    // Handle duplicate key error (if we add unique constraints later)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A message with this information already exists'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    });
  }
});

// GET /contact/messages - Get all contact messages (admin only)
router.get('/messages', async (req, res) => {
  try {
    // Check if user is admin
    if (!req.session.role || req.session.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status; // 'unread', 'read', 'replied', or undefined for all

    const query = status ? { status } : {};

    const messages = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Contact.countDocuments(query);
    const unreadCount = await Contact.getUnreadCount();

    res.json({
      success: true,
      messages,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalMessages: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      },
      unreadCount
    });

  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages'
    });
  }
});

// PUT /contact/messages/:id/read - Mark message as read (admin only)
router.put('/messages/:id/read', async (req, res) => {
  try {
    if (!req.session.role || req.session.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await message.markAsRead();

    res.json({
      success: true,
      message: 'Message marked as read'
    });

  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating message status'
    });
  }
});

// PUT /contact/messages/:id/replied - Mark message as replied (admin only)
router.put('/messages/:id/replied', async (req, res) => {
  try {
    if (!req.session.role || req.session.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await message.markAsReplied();

    res.json({
      success: true,
      message: 'Message marked as replied'
    });

  } catch (error) {
    console.error('Error marking message as replied:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating message status'
    });
  }
});

// DELETE /contact/messages/:id - Delete a contact message (admin only)
router.delete('/messages/:id', async (req, res) => {
  try {
    if (!req.session.role || req.session.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting message'
    });
  }
});

module.exports = router;
