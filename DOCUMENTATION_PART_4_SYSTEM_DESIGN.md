# Food Management System — Complete Project Documentation

## PART 4: SYSTEM DESIGN

---

# CHAPTER-4

## 4. SYSTEM DESIGN

### 4.1 Architecture Overview

The Food Management System employs a **3-tier client-server architecture** with MongoDB as the persistence layer:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│         (HTML/CSS/JavaScript - Vanilla Frontend)            │
│    ┌──────────────┬──────────────┬──────────────────┐       │
│    │  Login View  │  Donor View  │  Receiver View   │       │
│    │ Admin Panel  │  Contact Form│  Activity Log    │       │
│    └──────────────┴──────────────┴──────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                          │
│            (Express.js - Node.js Backend)                   │
│    ┌──────────────────────────────────────────────┐         │
│    │   Routes: /auth, /donor, /receiver, /admin  │         │
│    │   Middleware: Authentication, Logging       │         │
│    │   Session Store: connect-mongo (MongoDB)    │         │
│    │   Password: bcryptjs (10 rounds)            │         │
│    └──────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                            ↓ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                   PERSISTENCE LAYER                         │
│         (MongoDB Database - Atlas or Local)                 │
│    ┌──────────────┬──────────────┬──────────────────┐       │
│    │  Users (w/   │  Food Items  │  Requests        │       │
│    │  login hist) │              │                  │       │
│    │ Activities   │  Sessions    │  Contacts        │       │
│    └──────────────┴──────────────┴──────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Component Diagram

```
┌─────────────────────────────────┐
│    Frontend Components          │
├─────────────────────────────────┤
│ • Auth Pages (login/signup)     │
│ • Donor Dashboard               │
│ • Receiver Dashboard            │
│ • Admin Panel (users/IP/logs)   │
│ • Activity Logger (UI display)  │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   Backend Components (Express)  │
├─────────────────────────────────┤
│ • Auth Router (login/signup)    │
│ • Donor Router (CRUD foods)     │
│ • Receiver Router (requests)    │
│ • Admin Router (users/IP hist)  │
│ • Contact Router (forms)        │
├─────────────────────────────────┤
│ Middleware:                     │
│ • Session Mgmt (connect-mongo)  │
│ • Auth Check                    │
│ • Role Validation               │
│ • Error Handler                 │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   Data Models (Mongoose)        │
├─────────────────────────────────┤
│ • User Schema                   │
│ • Food Schema                   │
│ • Request Schema                │
│ • Activity Schema               │
│ • Contact Schema                │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   MongoDB Collections           │
├─────────────────────────────────┤
│ • users (with IP history)       │
│ • foods                         │
│ • requests                      │
│ • activities (with IP/agent)    │
│ • contacts                      │
│ • sessions (connect-mongo)      │
└─────────────────────────────────┘
```

### 4.3 Data Flow Diagram - Login Flow

```
User Input (Email/Password)
           ↓
    POST /auth/login
           ↓
   Hash Password Check (bcrypt)
           ↓
   Capture IP Address
   (x-forwarded-for → fallback)
           ↓
   Create Express Session
   (stored in MongoDB via connect-mongo)
           ↓
   Save loginHistory to User Document
   {ipAddress, userAgent, loginTime}
           ↓
   Log Activity with IP/UserAgent
   to Activities Collection
           ↓
   Redirect to Dashboard
   (with session cookie set)
```

### 4.4 Database Schema

#### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypt hash),
  role: String (Donor/Receiver/Admin),
  address: String,
  phone: String,
  verified: Boolean,
  lastLoginIP: String,           // NEW: IP address of last login
  lastLoginDate: Date,            // NEW: timestamp of last login
  loginHistory: [                 // NEW: array of last 20 logins
    {
      ipAddress: String,
      userAgent: String,
      loginTime: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

#### Food Collection

```javascript
{
  _id: ObjectId,
  donorId: ObjectId (ref: User),
  name: String,
  category: String,
  quantity: Number,
  unit: String,
  location: String,
  availability: Date,
  image: String (filename),
  status: String (available/requested/completed),
  description: String,
  createdAt: Date
}
```

#### Request Collection

```javascript
{
  _id: ObjectId,
  foodId: ObjectId (ref: Food),
  receiverId: ObjectId (ref: User),
  status: String (pending/approved/rejected/completed),
  requestDate: Date,
  updatedAt: Date
}
```

#### Activity Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  actionType: String,
  details: String,
  ipAddress: String,            // IP of action
  userAgent: String,            // Browser info
  timestamp: Date
}
```

#### Sessions Collection (connect-mongo)

```javascript
{
  _id: String (session ID),
  expires: Date (TTL index),
  session: Object {
    cookie: {...},
    userId: String,
    email: String,
    role: String
  }
}
```

### 4.5 Design Patterns Used

| Pattern | Usage | Benefit |
|---------|-------|---------|
| **MVC** | Model (Mongoose), View (HTML), Controller (Routes) | Clear separation, maintainability |
| **Middleware** | Auth, error handling, logging | Reusable logic, clean code |
| **Repository** | User/Food/Request models as single truth source | Data consistency |
| **Factory** | Mongoose schema creation | Simplified model definition |
| **Decorator** | Session store as middleware | Non-invasive, reusable |

### 4.6 Security Architecture

```
┌──────────────────────────────────┐
│     Input Validation             │
│  (Mongoose schema + custom)      │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Authentication (bcrypt + JWT)   │
│  Password: 10 salt rounds        │
│  Session: Express-session +      │
│            connect-mongo         │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Authorization (Role-based)      │
│  Donor / Receiver / Admin        │
│  Route guards & middleware       │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  IP Tracking & Audit Logging     │
│  Capture on every login/action   │
│  Searchable in admin panel       │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  Session Persistence (MongoDB)   │
│  TTL auto-cleanup, 24h expiry    │
│  Survives server restarts        │
└──────────────────────────────────┘
```

### 4.7 Deployment Architecture

```
┌──────────────────────────────────────────┐
│           Internet / Users               │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│      Web Server (Node.js/Express)        │
│  • Running on port 3000 (dev) or 80/443  │
│  • Handles HTTP/HTTPS requests           │
│  • Session management via connect-mongo  │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│   MongoDB Connection Pool                │
│  • maxPoolSize: 50 (for 250 users)      │
│  • minPoolSize: 10                       │
│  • Timeouts: 120s main, 65s keepAlive    │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│    MongoDB Database (Atlas/Local)        │
│  • collections: users, foods,            │
│    requests, activities, sessions        │
│  • Indexes on _id, email, userId         │
│  • TTL index on sessions.expires         │
└──────────────────────────────────────────┘
```

### 4.8 Scalability Considerations

1. **Horizontal Scaling**: New server instances connect to same MongoDB (sessions shared via connect-mongo)
2. **Database Scaling**: Sharding collections by `userId` or partition key for very high volume
3. **Caching**: Redis layer for session lookups (optional enhancement)
4. **Load Balancing**: Nginx/HAProxy distributes traffic to multiple Node.js instances
5. **Connection Pooling**: Tuned for 250 concurrent users (can increase `maxPoolSize` further)

---

**End of CHAPTER-4: System Design**

*Next: CHAPTER-5 (Implementation) — Code examples and deployment.*
