# Comprehensive Food Management System Documentation

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [Data Models In-Depth](#data-models-in-depth)
4. [Authentication System](#authentication-system)
5. [Route System Details](#route-system-details)
6. [Frontend Architecture](#frontend-architecture)
7. [Backend Architecture](#backend-architecture)
8. [Application Lifecycle](#application-lifecycle)
9. [Security Considerations](#security-considerations)
10. [Development Guide](#development-guide)

## Technology Stack

### Node.js + Express Server
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine
  - Handles asynchronous operations efficiently
  - Perfect for real-time applications
  - Large ecosystem of packages via npm

### Express Framework
- **Purpose**: Web application framework for Node.js
- **Key Features**:
  - Middleware support
  - Routing system
  - Static file serving
  - Template engine support
  - Error handling

### MongoDB with Mongoose
- **MongoDB**: NoSQL database
  - Document-oriented storage
  - Flexible schema
  - Scalable and high-performance
  - Perfect for JSON-like data structures

- **Mongoose**: MongoDB object modeling tool
  - Schema-based solution
  - Built-in type casting
  - Validation
  - Query building
  - Business logic hooks (middleware)

### Session Management
- **express-session**: Server-side session storage
  - Secure session handling
  - Configurable session duration
  - Custom session store support

## Project Structure

### Root Directory
\`\`\`
project-root/
├── server.js           # Application entry point
├── package.json        # Project dependencies and scripts
├── views/             # HTML templates
├── public/            # Static assets
├── routes/            # Express route handlers
├── models/            # Mongoose data models
└── test/              # Test files
\`\`\`

### Detailed Folder Structure

#### 1. Views Directory (`views/`)
- **Purpose**: Contains all HTML templates
- **Files**:
  - `index.html`: Homepage
  - `about.html`: About page
  - `login.html`: Login page
  - `signup.html`: Registration page
  - `admin.html`: Admin dashboard
  - `donor.html`: Donor dashboard
  - `receiver.html`: Receiver dashboard
  - `pending.html`: Pending requests page

#### 2. Public Directory (`public/`)
- **CSS** (`public/css/`)
  - `style.css`: Global styles
  - `home-style.css`: Homepage-specific styles

- **JavaScript** (`public/js/`)
  - `admin.js`: Admin dashboard functionality
  - `donor.js`: Donor interface logic
  - `login.js`: Authentication handling
  - `receiver.js`: Receiver interface logic
  - `signup.js`: Registration form handling

#### 3. Routes Directory (`routes/`)
- **Purpose**: API endpoints and route handlers
- **Files**:
  - `auth.js`: Authentication routes
  - `admin.js`: Admin-specific routes
  - `donor.js`: Donor operations
  - `receiver.js`: Receiver operations
  - `contact.js`: Contact form handling

#### 4. Models Directory (`models/`)
- **Purpose**: Database schemas and models
- **Files**:
  - `user.js`: User model
  - `food.js`: Food item model
  - `request.js`: Food request model
  - `contact.js`: Contact form model
  - `activity.js`: Activity logging model

## Data Models In-Depth

### 1. User Model
\`\`\`javascript
{
  name: String,
  email: String,
  passwordHash: String,
  role: Enum['admin', 'donor', 'receiver'],
  contactInfo: {
    phone: String,
    address: String
  },
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### 2. Food Model
\`\`\`javascript
{
  title: String,
  description: String,
  donorId: ObjectId,
  status: Enum['available', 'requested', 'reserved', 'delivered'],
  images: [String],
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### 3. Request Model
\`\`\`javascript
{
  foodId: ObjectId,
  receiverId: ObjectId,
  status: Enum['pending', 'accepted', 'rejected', 'delivered'],
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### 4. Contact Model
\`\`\`javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  status: Enum['new', 'read', 'replied'],
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### 5. Activity Model
\`\`\`javascript
{
  userId: ObjectId,
  userName: String,
  userRole: String,
  activityType: String,
  description: String,
  metadata: Object,
  ipAddress: String,
  userAgent: String,
  createdAt: Date
}
\`\`\`

## Authentication System

### Session-Based Authentication
1. **Login Process**:
   - User submits credentials
   - Server validates credentials
   - Creates session with user data
   - Returns session cookie

2. **Session Storage**:
   - Server-side storage
   - Session data structure:
     \`\`\`javascript
     {
       userId: ObjectId,
       role: String,
       name: String
     }
     \`\`\`

3. **Authentication Middleware**:
   \`\`\`javascript
   const isAuthenticated = (req, res, next) => {
     if (req.session.userId) {
       next();
     } else {
       res.status(401).json({ error: 'Unauthorized' });
     }
   };
   \`\`\`

4. **Role-Based Access**:
   - Admin access middleware
   - Donor access middleware
   - Receiver access middleware

## Route System Details

### Authentication Routes (`/auth`)

#### 1. Sign Up
- **Path**: POST `/auth/signup`
- **Purpose**: Create new user account
- **Process**:
  1. Validate input
  2. Check existing email
  3. Hash password
  4. Create user
  5. Set session

#### 2. Login
- **Path**: POST `/auth/login`
- **Process**:
  1. Validate credentials
  2. Set session data
  3. Return success response

### Donor Routes (`/donor`)

#### 1. Post Food
- **Path**: POST `/donor/post-food`
- **Process**:
  1. Validate food data
  2. Create food document
  3. Log activity
  4. Return success

#### 2. Accept Request
- **Path**: PUT `/donor/accept-request/:requestId`
- **Process**:
  1. Validate request exists
  2. Update request status
  3. Log activity

### Receiver Routes (`/receiver`)

#### 1. Request Food
- **Path**: POST `/receiver/request-food`
- **Process**:
  1. Check food availability
  2. Create request
  3. Log activity

#### 2. View Available Food
- **Path**: GET `/receiver/available-food`
- **Process**:
  1. Query available food
  2. Filter by location
  3. Return food list

### Admin Routes (`/admin`)

#### 1. Activity Monitoring
- **Path**: GET `/admin/activities`
- **Features**:
  - Pagination
  - Filtering
  - Sorting options

#### 2. Statistics
- **Path**: GET `/admin/statistics`
- **Returns**:
  - Total meals shared
  - Active donors
  - Active receivers
  - Pending requests

## Frontend Architecture

### 1. Component Structure
- **Header**: Navigation and user status
- **Main Content**: Dynamic content area
- **Footer**: Static information

### 2. JavaScript Modules
- **admin.js**:
  - Dashboard data fetching
  - Statistics updates
  - Activity monitoring

- **donor.js**:
  - Food posting interface
  - Request management
  - Status updates

- **receiver.js**:
  - Food browsing
  - Request submission
  - Status tracking

### 3. CSS Architecture
- **Global Styles**: `style.css`
  - Reset rules
  - Typography
  - Layout grids

- **Component Styles**: `home-style.css`
  - Module-specific styles
  - Responsive design rules

## Backend Architecture

### 1. Server Configuration
\`\`\`javascript
// Server setup
const express = require('express');
const app = express();
const session = require('express-session');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
\`\`\`

### 2. Database Connection
\`\`\`javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/foodbank', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
\`\`\`

### 3. Error Handling
- Global error handler
- Route-specific error handling
- Database error management

## Application Lifecycle

### 1. Startup Sequence
1. Load environment variables
2. Connect to MongoDB
3. Initialize Express
4. Setup middleware
5. Register routes
6. Start server

### 2. Request Lifecycle
1. Request received
2. Middleware processing
3. Route handling
4. Database operations
5. Response generation
6. Response sent

### 3. Shutdown Sequence
1. Catch termination signals
2. Close database connections
3. Stop HTTP server
4. Exit process

## Security Considerations

### 1. Input Validation
- Request body validation
- Query parameter sanitization
- File upload validation

### 2. Authentication Security
- Password hashing
- Session security
- CSRF protection

### 3. Data Protection
- Input sanitization
- XSS prevention
- SQL injection prevention

## Development Guide

### 1. Local Setup
1. Clone repository
2. Install dependencies
3. Configure environment
4. Start MongoDB
5. Run application

### 2. Testing
- Unit tests
- Integration tests
- End-to-end tests

### 3. Deployment
- Environment configuration
- Database setup
- Server deployment
- SSL configuration

### 4. Monitoring
- Error logging
- Performance monitoring
- Security auditing

## Maintenance and Updates

### 1. Code Updates
- Regular dependency updates
- Security patches
- Feature additions

### 2. Database Maintenance
- Regular backups
- Index optimization
- Data cleanup

### 3. Performance Optimization
- Code optimization
- Database query optimization
- Asset optimization

## Conclusion

This detailed documentation covers every aspect of the Food Management System, from its architecture to implementation details. It serves as a comprehensive guide for developers working on the system, ensuring consistency and maintainability across the project.
