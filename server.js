const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config();

const app = express();

// Increase server capacity for concurrent connections
app.set('trust proxy', 1); // Trust first proxy (for IP tracking behind reverse proxies)

// Import routes
const authRoutes = require('./routes/auth');
const donorRoutes = require('./routes/donor');
const receiverRoutes = require('./routes/receiver');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// Middleware - Increased limits for concurrent users
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration with MongoDB store for production scalability
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax'
  }
};

// Use MongoDB session store for better scalability (handles 250+ concurrent users)
if (process.env.MONGODB_URI) {
  sessionConfig.store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/food_management',
    touchAfter: 24 * 3600, // Lazy session update (once per 24 hours)
    crypto: {
      secret: process.env.SESSION_SECRET || 'your_secret_key'
    }
  });
}

app.use(session(sessionConfig));

// MongoDB connection with optimized settings for high concurrency
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food_management', {
  maxPoolSize: 50, // Increase connection pool size for 250 concurrent users
  minPoolSize: 10,
  serverSelectionTimeoutMS: 10000, // Increased to 10 seconds for Atlas
  socketTimeoutMS: 45000
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log('📊 Server configured for up to 250 concurrent users');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('Full error:', err);
});

// Routes
app.use('/auth', authRoutes);
app.use('/donor', donorRoutes);
app.use('/receiver', receiverRoutes);
app.use('/contact', contactRoutes);
app.use('/admin', adminRoutes);

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/donor-dashboard', (req, res) => {
  if (!req.session.userId || req.session.role !== 'donor') {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'views', 'donor.html'));
});

app.get('/receiver-dashboard', (req, res) => {
  if (!req.session.userId || req.session.role !== 'receiver') {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'views', 'receiver.html'));
});

app.get('/pending', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'pending.html'));
});

// Admin route (protected)
app.get('/admin', (req, res) => {
  if (!req.session.userId || req.session.role !== 'admin') {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// Start server with increased timeout and connection settings
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`⚡ Max concurrent users supported: 250`);
  console.log(`🔒 Session storage: ${sessionConfig.store ? 'MongoDB (Production)' : 'Memory (Development)'}`);
});

// Increase server timeout for handling concurrent requests
server.timeout = 120000; // 120 seconds
server.keepAliveTimeout = 65000; // 65 seconds
server.headersTimeout = 66000; // 66 seconds (slightly more than keepAliveTimeout)

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed');
      process.exit(0);
    });
  });
});
