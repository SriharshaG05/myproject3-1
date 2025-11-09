const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Activity = require('../models/activity');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      location,
      verified: false,
      points: 0
    });

    await user.save();
    res.status(201).json({ 
      message: 'Registration successful! Awaiting verification.',
      redirect: '/pending'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    let { email, password, role } = req.body;
    email = email.trim();
    password = password.trim();
    role = role.trim();

    console.log('Login attempt:', { email, role });

    if (role === 'admin') {
      // Check admin credentials
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@foodsystem.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

      console.log('Expected admin email:', adminEmail);
      console.log('Expected admin password:', adminPassword);
      console.log('Received email:', email);
      console.log('Email match:', email.toLowerCase() === adminEmail.toLowerCase());
      console.log('Password match:', password === adminPassword);

      if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
        return res.status(400).json({ message: 'Invalid admin credentials' });
      }

      // Set session for admin
      req.session.userId = 'admin';
      req.session.role = 'admin';
      req.session.name = 'Admin';

      res.json({
        message: 'Admin login successful',
        redirect: '/admin'
      });
    } else {
      // User login
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if verified
      if (!user.verified) {
        return res.status(403).json({ 
          message: 'Account not verified yet. Please wait for admin approval.',
          redirect: '/pending'
        });
      }

      // Set session
      req.session.userId = user._id;
      req.session.role = user.role;
      req.session.name = user.name;

      // Get IP address
      const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || 
                        req.ip || 
                        req.connection.remoteAddress || 
                        req.socket.remoteAddress || 
                        'Unknown';
      const userAgent = req.get('User-Agent') || 'Unknown';

      // Update user's last login info and add to login history
      user.lastLoginIP = ipAddress;
      user.lastLoginDate = new Date();
      user.loginHistory.push({
        ipAddress: ipAddress,
        userAgent: userAgent,
        loginTime: new Date()
      });
      
      // Keep only last 20 login records
      if (user.loginHistory.length > 20) {
        user.loginHistory = user.loginHistory.slice(-20);
      }
      
      await user.save();

      // Log activity
      await Activity.logActivity({
        userId: user._id,
        userName: user.name,
        userRole: user.role,
        activityType: 'login',
        description: `User logged in from IP: ${ipAddress}`,
        ipAddress: ipAddress,
        userAgent: userAgent
      });

      // Redirect based on role
      const redirectUrl = user.role === 'donor' ? '/donor-dashboard' : '/receiver-dashboard';
      res.json({ 
        message: 'Login successful',
        redirect: redirectUrl,
        role: user.role
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully', redirect: '/login' });
  });
});

// Get current user info
router.get('/me', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await User.findById(req.session.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all unverified users
router.get('/admin/pending-users', async (req, res) => {
  try {
    const pendingUsers = await User.find({ verified: false }).select('-password');
    res.json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Verify user
router.post('/admin/verify/:userId', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, { verified: true });
    res.json({ message: 'User verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Reject user
router.delete('/admin/reject/:userId', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User rejected and deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
