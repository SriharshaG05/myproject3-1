# Food Management System — Complete Project Documentation

## PART 5: IMPLEMENTATION

---

# CHAPTER-5

## 5. IMPLEMENTATION GUIDE

### 5.1 Project Setup & Installation

```bash
# Clone repository
git clone <repository-url>
cd project3-1

# Install dependencies
npm install

# Add connect-mongo for session persistence
npm install connect-mongo@5.1.0 --save

# Environment setup
# Create .env file with:
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority
SESSION_SECRET=your-strong-secret-key-here
PORT=3000
```

### 5.2 Database Configuration

#### MongoDB Atlas Setup

```javascript
// server.js - Connection Configuration

const mongoose = require('mongoose');

// Connection with pool tuning for 250 concurrent users
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 50,        // Max connections
  minPoolSize: 10,        // Min connections
  socketTimeoutMS: 45000, // Socket timeout
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000
});

// Connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});
```

#### Collections & Indexes

```javascript
// Mongoose automatically creates collections
// Critical indexes for performance:

// users collection
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ verified: 1 });

// foods collection
db.foods.createIndex({ donorId: 1 });
db.foods.createIndex({ status: 1 });
db.foods.createIndex({ location: 1 });

// requests collection
db.requests.createIndex({ foodId: 1 });
db.requests.createIndex({ receiverId: 1 });
db.requests.createIndex({ status: 1 });

// activities collection
db.activities.createIndex({ userId: 1 });
db.activities.createIndex({ timestamp: 1 });
db.activities.createIndex({ ipAddress: 1 });

// sessions collection (created by connect-mongo)
// TTL index auto-created: { expires: 1 } with expireAfterSeconds: 0
```

### 5.3 Session Store Implementation (connect-mongo)

```javascript
// server.js - Session Configuration

const session = require('express-session');
const MongoStore = require('connect-mongo');

// Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,          // Prevent client-side JS access
    sameSite: 'lax',         // CSRF protection
    maxAge: 24 * 60 * 60 * 1000  // 24 hours
  }
};

// MongoDB Session Store (Production)
if (process.env.MONGODB_URI) {
  sessionConfig.store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600,  // Reduce writes (only update every 24h)
    crypto: {
      secret: process.env.SESSION_SECRET
    }
  });
}

// Use session middleware
app.use(session(sessionConfig));
```

### 5.4 Authentication Implementation

```javascript
// routes/auth.js - Login with IP Capture

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Activity = require('../models/activity');

// POST /auth/login
async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email/password');
    
    // Verify password (bcrypt - 10 salt rounds)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email/password');
    
    // IP CAPTURE - NEW FEATURE
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
                      req.socket.remoteAddress ||
                      req.ip ||
                      'UNKNOWN';
    
    const userAgent = req.headers['user-agent'] || 'UNKNOWN';
    
    // Save to user document
    user.lastLoginIP = ipAddress;
    user.lastLoginDate = new Date();
    
    // Keep last 20 login entries
    if (!user.loginHistory) user.loginHistory = [];
    user.loginHistory.push({
      ipAddress,
      userAgent,
      loginTime: new Date()
    });
    if (user.loginHistory.length > 20) {
      user.loginHistory = user.loginHistory.slice(-20);
    }
    
    await user.save();
    
    // Create activity log with IP
    await Activity.create({
      userId: user._id,
      actionType: 'LOGIN',
      details: `User logged in from ${ipAddress}`,
      ipAddress,
      userAgent,
      timestamp: new Date()
    });
    
    // Set session (now persisted to MongoDB via connect-mongo)
    req.session.userId = user._id;
    req.session.email = user.email;
    req.session.role = user.role;
    
    res.status(200).json({
      message: 'Login successful',
      role: user.role,
      verified: user.verified
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
}
```

### 5.5 Admin IP & Login History Feature

```javascript
// routes/admin.js - Get Users with IP History

app.get('/admin/users', async (req, res) => {
  try {
    // Authorization check
    if (req.session.role !== 'Admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    
    // Query with filters
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.verified !== undefined) {
      filter.verified = req.query.verified === 'true';
    }
    
    // Fetch users (exclude password)
    const users = await User
      .find(filter)
      .select('-password')
      .limit(limit)
      .skip(skip)
      .exec();
    
    const total = await User.countDocuments(filter);
    
    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin view login history for a specific user
app.get('/admin/user/:userId/login-history', async (req, res) => {
  try {
    if (req.session.role !== 'Admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({
      userId: user._id,
      email: user.email,
      name: user.name,
      lastLoginIP: user.lastLoginIP,
      lastLoginDate: user.lastLoginDate,
      loginHistory: user.loginHistory || []
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 5.6 Admin UI - User List & IP Tracking

```javascript
// public/js/admin.js - Load Users with IP History

async function loadAllUsers() {
  const role = document.getElementById('userRoleFilter')?.value;
  const verified = document.getElementById('userStatusFilter')?.value;
  
  let url = '/admin/users?page=1';
  if (role) url += `&role=${role}`;
  if (verified !== undefined) url += `&verified=${verified}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const container = document.getElementById('allUsers');
    if (!container) return;
    
    let html = `
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Last Login IP</th>
            <th>Last Login Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    data.users.forEach(user => {
      html += `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td><code>${user.lastLoginIP || 'N/A'}</code></td>
          <td>${user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleString() : 'N/A'}</td>
          <td>
            <button onclick="showLoginHistory('${user._id}')">View History</button>
          </td>
        </tr>
      `;
    });
    
    html += `</tbody></table>`;
    container.innerHTML = html;
    
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

async function showLoginHistory(userId) {
  try {
    const response = await fetch(`/admin/user/${userId}/login-history`);
    const data = await response.json();
    
    let html = `
      <h4>${data.name} (${data.email})</h4>
      <p><strong>Last Login IP:</strong> ${data.lastLoginIP || 'N/A'}</p>
      <p><strong>Last Login:</strong> ${new Date(data.lastLoginDate).toLocaleString() || 'N/A'}</p>
      <h5>Login History (Last 20):</h5>
      <table class="table">
        <thead>
          <tr>
            <th>IP Address</th>
            <th>User Agent</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    data.loginHistory.reverse().forEach(entry => {
      html += `
        <tr>
          <td><code>${entry.ipAddress}</code></td>
          <td>${entry.userAgent.substring(0, 50)}...</td>
          <td>${new Date(entry.loginTime).toLocaleString()}</td>
        </tr>
      `;
    });
    
    html += `</tbody></table>`;
    
    // Show in modal
    const modalBody = document.getElementById('loginHistoryModal');
    if (modalBody) {
      modalBody.innerHTML = html;
      document.getElementById('loginHistoryModal').style.display = 'block';
    }
    
  } catch (error) {
    console.error('Error fetching login history:', error);
  }
}
```

### 5.7 Graceful Shutdown & Cleanup

```javascript
// server.js - Server Startup & Shutdown

const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  
  // Stop accepting new requests
  server.close(() => {
    console.log('HTTP server closed');
  });
  
  // Close database connections
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  
  process.exit(0);
});
```

### 5.8 Environment Variables (.env)

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/fms-db?retryWrites=true&w=majority

# Session Management
SESSION_SECRET=super-secret-key-min-32-chars-long

# Server
PORT=3000
NODE_ENV=production

# (Optional) Email for contact form
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 5.9 Deployment Steps

#### 1. Local Development
```bash
npm install
npm start  # Runs on http://localhost:3000
```

#### 2. MongoDB Atlas Cloud
- Create account at `mongodb.com/cloud/atlas`
- Create a cluster (free tier: M0)
- Create database user and IP whitelist
- Copy connection string to `.env` as `MONGODB_URI`

#### 3. Production Deployment (Heroku Example)
```bash
# Create app
heroku create app-name

# Add Heroku MongoDB (Atlas)
heroku config:set MONGODB_URI=mongodb+srv://...

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### 4. Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t fms-app .
docker run -e MONGODB_URI=... -p 3000:3000 fms-app
```

---

**End of CHAPTER-5: Implementation**

*Next: CHAPTER-6 (Testing & Conclusion) — Test cases, results, and future work.*
