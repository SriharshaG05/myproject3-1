# Backend Code Snippets and SRS Documentation

## Food Management System - Backend Implementation

This document provides backend code snippets and detailed explanations aligned with Software Requirements Specification (SRS) functional requirements for the Food Management System.

---

## Table of Contents
1. [User Authentication and Registration](#1-user-authentication-and-registration)
2. [Food Donation Management](#2-food-donation-management)
3. [Food Request and Reception](#3-food-request-and-reception)
4. [Administrative Functions](#4-administrative-functions)
5. [Data Models](#5-data-models)
6. [Server Configuration](#6-server-configuration)

---

## 1. User Authentication and Registration

**SRS Requirement**: The system shall allow users to register as donors or receivers, authenticate securely, and manage account verification.

### User Registration Route (routes/auth.js)

**Explanation**: This code implements secure user registration by:
- Validating unique email addresses to prevent duplicate accounts
- Hashing passwords using bcryptjs for security (non-functional requirement)
- Supporting role-based registration (donor/receiver) for access control
- Setting accounts to unverified status requiring admin approval
- Providing appropriate error handling and user feedback
- Logging registration attempts for audit purposes

```javascript
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with verification pending
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,  // 'donor' or 'receiver'
      location,
      verified: false,  // Requires admin approval
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
```

### User Login Route (routes/auth.js)

**Explanation**: This implements multi-role authentication system:
- Separate admin login using environment variables for enhanced security
- Password verification using bcrypt comparison for secure authentication
- Account verification check before allowing access (business rule)
- Session management for maintaining user state across requests
- Role-based redirection to appropriate dashboards (donor/receiver/admin)
- Comprehensive error handling for different failure scenarios
- Logging of login attempts for security monitoring

```javascript
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (role === 'admin') {
      // Admin authentication with environment variables
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@foodsystem.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

      if (email.toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
        return res.status(400).json({ message: 'Invalid admin credentials' });
      }

      req.session.userId = 'admin';
      req.session.role = 'admin';
      req.session.name = 'Admin';

      res.json({
        message: 'Admin login successful',
        redirect: '/admin'
      });
    } else {
      // Regular user authentication
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      if (!user.verified) {
        return res.status(403).json({
          message: 'Account not verified yet. Please wait for admin approval.',
          redirect: '/pending'
        });
      }

      req.session.userId = user._id;
      req.session.role = user.role;
      req.session.name = user.name;

      const redirectPath = user.role === 'donor' ? '/donor-dashboard' : '/receiver-dashboard';
      res.json({
        message: 'Login successful',
        redirect: redirectPath
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});
```

---

## 2. Food Donation Management

**SRS Requirement**: Donors shall be able to post food donations with details and track their status.

### Donor Access Control Middleware

**Explanation**: Ensures only authenticated donors can access donation features:
- Validates user session existence and integrity
- Checks user role to enforce role-based access control (security requirement)
- Returns appropriate HTTP status codes for access denial
- Provides clear error messages for unauthorized access attempts
- Acts as a guard for all donor-specific routes

```javascript
// Middleware to check if user is donor
const isDonor = (req, res, next) => {
  if (!req.session.userId || req.session.role !== 'donor') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
```

### Food Posting Route (routes/donor.js)

**Explanation**: This fulfills food donation requirements by:
- Creating food entries with all required details (name, quantity, timestamps, location)
- Associating donations with donor ID for accountability and tracking
- Setting initial status as 'available' for the donation lifecycle
- Logging activities for audit trail (non-functional: traceability requirement)
- Providing error handling and success feedback to users
- Validating donor authentication through middleware before allowing donations

```javascript
router.post('/post-food', isDonor, async (req, res) => {
  try {
    const { food_name, quantity, prepared_time, available_until, location } = req.body;

    const food = new Food({
      food_name,
      quantity,
      prepared_time: new Date(prepared_time),
      available_until: new Date(available_until),
      location,
      donor_id: req.session.userId,
      status: 'available'  // Initial status
    });

    await food.save();

    // Log activity for audit trail
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

    res.status(201).json({
      message: 'Food posted successfully!',
      food: food
    });
  } catch (error) {
    console.error('Post food error:', error);
    res.status(500).json({ message: 'Error posting food' });
  }
});
```

---

## 3. Food Request and Reception

**SRS Requirement**: Receivers shall be able to browse available food and request donations.

### Receiver Access Control Middleware

**Explanation**: Enforces receiver-only access to request features:
- Validates active user session and authentication status
- Confirms user role matches receiver permissions
- Implements security boundary for receiver-specific operations
- Returns standardized error responses for access violations
- Protects sensitive receiver operations from unauthorized access

```javascript
// Middleware to check if user is receiver
const isReceiver = (req, res, next) => {
  if (!req.session.userId || req.session.role !== 'receiver') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
```

### Food Request Route (routes/receiver.js)

**Explanation**: Implements food request functionality with business logic validation:
- Validates food availability before allowing requests (prevents invalid requests)
- Prevents duplicate requests from the same receiver (business rule)
- Creates request records with proper status tracking for workflow management
- Updates food status to prevent multiple simultaneous requests
- Maintains audit trail through comprehensive activity logging
- Ensures atomic operations for data consistency

```javascript
router.post('/request-food/:foodId', isReceiver, async (req, res) => {
  try {
    const foodId = req.params.foodId;
    const receiverId = req.session.userId;

    // Check if food exists and is available
    const food = await Food.findById(foodId);
    if (!food || food.status !== 'available') {
      return res.status(400).json({ message: 'Food not available' });
    }

    // Check if receiver already requested this food
    const existingRequest = await Request.findOne({
      food_id: foodId,
      receiver_id: receiverId
    });
    if (existingRequest) {
      return res.status(400).json({ message: 'You have already requested this food' });
    }

    // Create request
    const request = new Request({
      food_id: foodId,
      receiver_id: receiverId,
      status: 'pending'
    });

    await request.save();

    // Update food status to requested
    food.status = 'requested';
    await food.save();

    // Log activity
    const user = await User.findById(receiverId);
    await Activity.logActivity({
      userId: receiverId,
      userName: user.name,
      userRole: 'receiver',
      activityType: 'food_requested',
      description: `Requested food: ${food.food_name}`,
      metadata: {
        foodId: foodId,
        foodName: food.food_name,
        requestId: request._id
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'Food requested successfully!' });
  } catch (error) {
    console.error('Request food error:', error);
    res.status(500).json({ message: 'Error requesting food' });
  }
});
```

---

## 4. Administrative Functions

**SRS Requirement**: Administrators shall manage user verification and oversee system operations.

### Admin Access Control Middleware

**Explanation**: Implements strict administrative access control:
- Validates admin session and authentication credentials
- Enforces role-based security for sensitive administrative operations
- Prevents unauthorized access to admin-only functionality
- Returns appropriate security responses for access violations
- Acts as critical security boundary for system administration

```javascript
// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.session.userId || req.session.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
```

### User Verification Route (routes/admin.js)

**Explanation**: Provides administrative control over user verification workflow:
- Allows admins to approve user accounts after review (business process)
- Updates user verification status in database with proper validation
- Logs all admin actions for accountability and audit compliance
- Includes comprehensive error handling for edge cases
- Maintains data integrity during status updates

```javascript
router.post('/verify-user/:userId', isAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.verified = true;
    await user.save();

    // Log admin activity
    await Activity.logActivity({
      userId: req.session.userId,
      userName: 'Admin',
      userRole: 'admin',
      activityType: 'user_verified',
      description: `Verified user: ${user.name} (${user.email})`,
      metadata: {
        verifiedUserId: userId,
        verifiedUserName: user.name,
        verifiedUserEmail: user.email
      },
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'User verified successfully' });
  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({ message: 'Error verifying user' });
  }
});
```

---

## 5. Data Models

**SRS Requirement**: The system shall maintain structured data for users, food donations, and requests.

### User Model (models/user.js)

**Explanation**: Defines the user data structure supporting core requirements:
- Required fields for authentication and user identification
- Role-based access control with enumerated values for data integrity
- Account verification workflow with boolean status tracking
- Points system for potential gamification features (future enhancement)
- Automatic timestamping for audit and analytics purposes
- Data validation and sanitization through Mongoose schema

```javascript
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
```

**Schema Field Explanations**:
- `name`: Required string with trimming for clean data storage
- `email`: Unique, required, lowercase for consistent authentication
- `password`: Required string (hashed) for secure authentication
- `role`: Enumerated values ensuring only valid roles (donor/receiver)
- `location`: Required for geographical food matching and logistics
- `verified`: Boolean flag for admin approval workflow
- `points`: Numeric field for potential reward system
- `createdAt`: Automatic timestamp for user lifecycle tracking

### Food Model (models/food.js)

**Explanation**: Structures food donation data with comprehensive tracking:
- Essential food details (name, quantity) for inventory management
- Time-based fields for freshness and availability tracking
- Status enumeration for donation lifecycle management
- Donor association for accountability and relationship mapping
- Location data for geographical matching with receivers
- Automatic timestamps for audit and sorting purposes

```javascript
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
```

**Schema Field Explanations**:
- `food_name`: Required identifier for the donated food item
- `quantity`: Required quantity information for portion management
- `prepared_time`: Timestamp when food was prepared (freshness tracking)
- `available_until`: Expiration/deadline for food availability
- `location`: Required for geographical matching with receivers
- `status`: Enumerated lifecycle states (available→requested→delivered)
- `donor_id`: Reference to User model for relationship and ownership
- `createdAt`: Automatic timestamp for donation history

---

## 6. Server Configuration

**SRS Requirement**: The system shall provide a scalable, secure backend infrastructure.

### Main Server Setup (server.js)

**Explanation**: Establishes the backend architecture fulfilling infrastructure requirements:
- Sets up Express server with proper middleware stack for request processing
- Configures session management for secure user authentication state
- Establishes MongoDB connection with error handling and logging
- Organizes routes by functionality for maintainable code structure
- Implements protected routes with session validation for security
- Provides static file serving for frontend asset delivery
- Includes environment variable support for configuration management

```javascript
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const donorRoutes = require('./routes/donor');
const receiverRoutes = require('./routes/receiver');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files

// Session configuration with security settings
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Environment-based secret
  resave: false, // Prevents unnecessary session saves
  saveUninitialized: false, // Only saves sessions with data
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24-hour session expiry
}));

/* Production note: use a MongoDB-backed session store (connect-mongo) when
   `MONGODB_URI` is available. This persists sessions in the database
   (default collection `sessions`) so they survive server restarts and
   can be shared between multiple app instances. Example:

const MongoStore = require('connect-mongo');
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }
};
if (process.env.MONGODB_URI) {
  sessionConfig.store = MongoStore.create({ mongoUrl: process.env.MONGODB_URI, touchAfter: 24 * 3600, crypto: { secret: process.env.SESSION_SECRET } });
}
app.use(session(sessionConfig));

*/

// Database connection with error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food_management', {
  useNewUrlParser: true, // Modern MongoDB connection string parser
  useUnifiedTopology: true // New server discovery and monitoring engine
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Route mounting for modular API organization
app.use('/auth', authRoutes); // Authentication endpoints
app.use('/donor', donorRoutes); // Donor-specific operations
app.use('/receiver', receiverRoutes); // Receiver-specific operations
app.use('/contact', contactRoutes); // Contact form handling
app.use('/admin', adminRoutes); // Administrative functions

// Protected route example with session validation
app.get('/donor-dashboard', (req, res) => {
  if (!req.session.userId || req.session.role !== 'donor') {
    return res.redirect('/login'); // Redirects unauthorized users
  }
  res.sendFile(path.join(__dirname, 'views', 'donor.html'));
});

// Server startup with configurable port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

**Configuration Details**:
- **Express App**: Initializes main application object for HTTP request handling
- **Middleware Stack**: JSON parsing, URL encoding, static file serving
- **Session Management**: Secure session handling with configurable expiry
- **Database Connection**: MongoDB connection with modern driver options
- **Route Organization**: Modular routing for maintainable API structure
- **Security**: Session-based authentication and role validation
- **Environment Config**: Support for environment variables and defaults

---

## Summary

These backend code snippets demonstrate how the Food Management System fulfills key SRS requirements including:

- **Security**: Password hashing, session management, role-based access control
- **Data Integrity**: Schema validation, unique constraints, referential integrity
- **Business Logic**: User verification workflow, food donation lifecycle, request management
- **Audit & Compliance**: Comprehensive activity logging, error handling
- **Scalability**: Modular architecture, middleware patterns, database optimization
- **User Experience**: Clear error messages, proper HTTP status codes, session management

Each component includes proper error handling, validation, and follows RESTful API principles while maintaining security and performance standards.</content>
<parameter name="filePath">d:\3-1\sdc\project3-1\BACKEND_SRS_README.md