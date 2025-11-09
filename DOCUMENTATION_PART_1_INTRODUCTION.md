# Food Management System — Complete Project Documentation

## PART 1: INTRODUCTION & OVERVIEW

---

## TABLE OF CONTENTS

### CHAPTER-1: INTRODUCTION
1. Introduction
2. Purpose of the Project
3. Problem with Existing Systems
4. Proposed System
5. Scope of the Project
6. Technology Stack

---

# CHAPTER-1 

## 1. INTRODUCTION

The Food Management System is a comprehensive web-based platform designed to streamline food donation management, connecting donors with surplus food to receivers in need. The system leverages modern web technologies, scalable cloud infrastructure, and secure session management to ensure efficient food redistribution while maintaining data integrity and user privacy.

This documentation provides a complete technical specification, implementation details, system architecture, and operational guidelines for the Food Management System, including recent enhancements such as MongoDB-backed session persistence via `connect-mongo` and administrator visibility of user login IP addresses and login history for security monitoring.

The document is structured in six parts:
- **Part 1**: Introduction, purpose, problem analysis, proposed solution, and technology stack
- **Part 2**: Literature survey and context on food donation systems and web technologies
- **Part 3**: Software Requirements Specification (SRS) including functional and non-functional requirements
- **Part 4**: System design, UML diagrams, architecture diagrams, and technology decisions
- **Part 5**: Implementation details, database setup, backend configuration, and deployment instructions
- **Part 6**: Testing strategies, test cases, conclusions, and future enhancements

---

## 2. PURPOSE OF THE PROJECT

### 2.1 Primary Objective

The primary purpose of this project is to develop a web-based Food Management System that eliminates barriers to efficient food donation by providing a centralized, user-friendly platform where:

- **Donors** (individuals, restaurants, organizations) can post surplus food donations with detailed information and track recipients
- **Receivers** (NGOs, community centers, individuals in need) can discover available food, submit requests, and track fulfillment
- **Administrators** can manage user verification, oversee all transactions, monitor system activity, and implement quality controls

### 2.2 Secondary Objectives

- **Reduce Food Waste**: Enable rapid redistribution of surplus food, reducing landfill waste and environmental impact
- **Enhance Accessibility**: Provide a user-friendly interface accessible to users with basic digital literacy
- **Ensure Accountability**: Maintain comprehensive audit logs of all system activities for transparency and trust
- **Support Scalability**: Design infrastructure to support growth from pilot programs to city-wide or national deployment
- **Protect Privacy & Security**: Implement robust session management with MongoDB persistence, secure password hashing, and sensitive data detection

### 2.3 Business Goals

- Support NGOs and community organizations in managing food distribution more efficiently
- Reduce administrative overhead through automated verification workflows and activity logging
- Build a replicable model for food donation platforms in resource-constrained environments
- Demonstrate the feasibility of technology-enabled social impact solutions

---

## 3. PROBLEM WITH EXISTING SYSTEMS

Current food donation management practices suffer from significant inefficiencies and limitations:

### 3.1 Lack of Centralized Platform

**Issue**: Food donors and receivers rely on informal networks, phone calls, social media posts, or physical bulletin boards to connect.
- No standardized way to post food donations or search for available food
- Donors cannot easily reach potential receivers
- Receivers miss available donations due to lack of visibility

**Impact**: Significant food wastage; receivers unable to access available food; high coordination overhead

### 3.2 Poor Verification and Trust Management

**Issue**: No systematic way to verify users or validate donation claims.
- Anyone can post misleading information about food quality or availability
- Receivers cannot assess trustworthiness of donors
- No accountability for failed pickups or misrepresented donations

**Impact**: Reduced participation due to safety and trust concerns; disputes over donations

### 3.3 Inefficient Request Management

**Issue**: No workflow to manage food requests or approvals.
- Multiple receivers may claim the same food donation
- No mechanism to ensure fairness or prevent conflicts
- Donors have no visibility into request status

**Impact**: Disputes, waste due to conflicting claims, donor frustration

### 3.4 Lack of Activity Tracking and Transparency

**Issue**: No audit trail or activity logs.
- Administrators cannot monitor system usage or detect misuse
- Disputes cannot be resolved with historical data
- No data for impact assessment or reporting

**Impact**: Reduced accountability; inability to improve based on data; compliance issues

### 3.5 Session Management Vulnerabilities

**Issue**: In previous versions, sessions were stored in-memory only, leading to:
- Loss of user sessions on server restarts
- Inability to support multiple server instances (load balancing)
- Poor scalability for growing user base
- Sessions could not be centrally revoked or monitored

**Impact**: Poor user experience, limited scalability, security gaps in session management

### 3.6 Lack of Security Monitoring

**Issue**: No visibility into login patterns or IP addresses.
- Administrators cannot detect suspicious activity
- No mechanism to revoke compromised sessions
- User accounts vulnerable to unauthorized access without detection

**Impact**: Security risks, compromised user data, regulatory non-compliance

### 3.7 Absence of Data Privacy Controls

**Issue**: No mechanism to detect or protect sensitive user information before storing.
- User profiles may contain email addresses, phone numbers
- No consent workflow for processing sensitive data
- Privacy compliance issues

**Impact**: Data breach risks, regulatory violations (GDPR, local privacy laws)

### 3.8 Limited Administrative Oversight

**Issue**: Administrators lack tools to monitor system health and user activity.
- No comprehensive activity logs
- Cannot view login IP addresses or suspicious activity
- No visibility into request/donation patterns

**Impact**: Reduced ability to manage platform, detect abuse, or improve user experience

---

## 4. PROPOSED SYSTEM

### 4.1 System Overview

The Food Management System is a full-stack web application designed to solve the above problems through a comprehensive, user-centric platform featuring:

**Core Architecture**:
- **Frontend**: Responsive HTML/CSS/Vanilla JavaScript interface for user-friendly donation posting and browsing
- **Backend**: Node.js (Express.js) for RESTful API and business logic
- **Database**: MongoDB (via MongoDB Atlas) for data persistence and MongoDB-backed session storage
- **Session Management**: Express-session with `connect-mongo` for persistent, scalable session storage
- **Security**: bcrypt password hashing, secure cookies, JWT-style session management, IP tracking

### 4.2 Key Features

**For Donors**:
- Register and create verified accounts
- Post food donations with details (name, quantity, location, pickup time)
- Track requests for their donations
- View donation history and impact

**For Receivers**:
- Register and create verified accounts
- Browse all available food donations
- Submit requests for specific items
- Track request status (pending, approved, rejected, completed)
- View request history

**For Administrators**:
- Verify new user registrations
- Manage user accounts (activate, deactivate, delete)
- Oversee all donations and requests
- Approve or reject food requests
- **View user login history and IP addresses** (new feature)
- **Monitor login patterns and revoke sessions if needed** (new feature)
- Respond to contact form submissions
- Access comprehensive activity logs
- View system statistics and metrics

### 4.3 Technology Highlights

**Session Management (Latest Enhancement)**:
- **MongoDB-Backed Session Store**: Uses `connect-mongo` library to persist sessions in MongoDB (collection: `sessions`)
- **Persistence**: Sessions survive server restarts and can be shared across multiple Node instances
- **Scalability**: Supports horizontal scaling with load balancing
- **Touchafter Optimization**: Reduces write frequency while maintaining data freshness
- **Security**: Session data encrypted with `SESSION_SECRET`

**User IP & Login History (Latest Enhancement)**:
- **Automatic Capture**: Client IP and User-Agent captured on every login
- **Storage**: Persisted on user document as `lastLoginIP`, `lastLoginDate`, and `loginHistory` array
- **Admin Visibility**: Administrators can view login history modal in admin dashboard
- **Security Monitoring**: Enables detection of suspicious activity patterns

**Database Architecture**:
- MongoDB Atlas for cloud-based, scalable storage
- Mongoose ORM for schema validation and data integrity
- Collections: `users`, `foods`, `requests`, `contacts`, `activities`, `sessions`

**Security Features**:
- bcryptjs password hashing (10 salt rounds)
- Secure, HttpOnly cookies
- Role-based access control (Donor, Receiver, Admin)
- Input validation and XSS protection
- Session-based authentication with 24-hour expiry

### 4.4 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│            Frontend (Static HTML/JS)            │
│    (Served from public/ and views/ directories) │
└──────────────────┬──────────────────────────────┘
                   │ HTTP/HTTPS
┌──────────────────▼──────────────────────────────┐
│          Node.js Express Backend                │
│         (Port 3000 or configurable)             │
│  ┌─────────────────────────────────────────┐  │
│  │ Routes:                                 │  │
│  │ - /auth (login, signup, logout)         │  │
│  │ - /donor (post food, manage donations)  │  │
│  │ - /receiver (browse, request food)      │  │
│  │ - /admin (management, IP/login history) │  │
│  │ - /contact (contact form)               │  │
│  └─────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────┐  │
│  │ Middleware:                             │  │
│  │ - Session management (connect-mongo)    │  │
│  │ - Authentication & role validation      │  │
│  │ - Activity logging                      │  │
│  │ - IP tracking & User-Agent capture      │  │
│  └─────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌───────────────┐      ┌──────────────────┐
│ MongoDB Atlas │      │  Session Store   │
│   (Data DB)   │      │  (connect-mongo) │
│               │      │                  │
│ Collections:  │      │ Collection:      │
│ - users       │      │ - sessions       │
│ - foods       │      │ (persistent)     │
│ - requests    │      │                  │
│ - activities  │      │ TTL enabled      │
│ - contacts    │      │ for auto-cleanup │
└───────────────┘      └──────────────────┘
```

---

## 5. SCOPE OF THE PROJECT

### 5.1 In Scope

**Functional Scope**:
- User registration and authentication (Donor, Receiver, Admin roles)
- Admin verification workflow for new users
- Food donation posting and management
- Food request submission and tracking
- Admin dashboard with user management
- Activity logging and audit trails
- **Session persistence via MongoDB (connect-mongo)**
- **Admin visibility of user login IPs and login history**
- Contact form handling
- Responsive, mobile-friendly UI

**Non-Functional Scope**:
- Support for 100-250 concurrent users (via DB pool tuning)
- Secure password storage (bcrypt hashing)
- Secure session management with persistent storage
- Data validation and XSS protection
- Graceful error handling and recovery
- Modular, maintainable code architecture

**Deployment Scope**:
- Local development environment
- MongoDB Atlas cloud deployment
- Deployment to Node.js hosting (Heroku, Render, AWS, GCP, etc.)
- Environment-driven configuration via `.env`

### 5.2 Out of Scope

- Mobile app (native iOS/Android)
- SMS notifications
- Payment processing or financial transactions
- Real-time chat (beyond HTTP-based sessions)
- Machine learning or advanced recommendation algorithms
- Multi-language support (currently English)
- Email notifications (can be added as enhancement)
- Video calling or real-time video features
- Integration with third-party food delivery services

### 5.3 Technical Constraints

- **Frontend**: Vanilla HTML/CSS/JavaScript (no frameworks like React/Vue)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (NoSQL, document-based)
- **Session Store**: MongoDB-backed via `connect-mongo` (production); memory (development)
- **Browser Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Authentication**: Session-based (not JWT in current version)
- **File Uploads**: Not included in current scope (future enhancement)

### 5.4 Success Criteria

- [ ] User registration and login functional and secure
- [ ] Donors can post and manage food donations
- [ ] Receivers can browse and request food
- [ ] Admin can verify users and manage system
- [ ] Sessions persist across server restarts (via connect-mongo)
- [ ] Admin can view user login IPs and history
- [ ] Activity logs maintain comprehensive audit trail
- [ ] System supports 100+ concurrent users
- [ ] No data loss on server restart
- [ ] All tests pass (manual and automated)

---

## 6. TECHNOLOGY STACK

The Food Management System employs a modern, production-ready technology stack optimized for scalability, security, and maintainability.

### 6.1 Programming Languages

| Language | Purpose | Version |
|----------|---------|---------|
| JavaScript (ES6+) | Frontend development | Latest |
| Node.js | Backend runtime | 14.x LTS or higher |
| JavaScript (Node) | Backend/API development | ES2020+ |

### 6.2 Frontend Technologies

| Technology | Purpose | Notes |
|------------|---------|-------|
| HTML5 | Markup and page structure | Semantic HTML |
| CSS3 | Styling and responsive design | Media queries, flexbox, grid |
| Vanilla JavaScript | Frontend logic & interactivity | No frameworks (vanilla approach) |
| Responsive Design | Mobile-first approach | Works on phones, tablets, desktops |

**Frontend Architecture**:
- Static files served from `public/` directory (CSS, images)
- View templates served from `views/` directory (HTML)
- Vanilla JS in `public/js/` for interactivity
- No build tools or bundlers required
- Direct HTTP requests to backend API

### 6.3 Backend Frameworks & Libraries

| Library | Purpose | Version |
|---------|---------|---------|
| Express.js | Web framework for REST API | 4.x |
| Mongoose | MongoDB ODM (Object-Document Mapper) | 7.x or 8.x |
| express-session | Session management middleware | 1.17.x |
| connect-mongo | MongoDB-backed session store | 5.x |
| bcryptjs | Password hashing for security | 2.4.x |
| dotenv | Environment variable management | 16.x |
| cors | Cross-Origin Resource Sharing | Latest |

**Backend Features**:
- RESTful API architecture
- Modular routing (`routes/` directory)
- Mongoose models with validation (`models/` directory)
- Middleware stack for authentication, logging, and error handling
- Graceful shutdown and database connection management

### 6.4 Database Technologies

| Component | Technology | Purpose | Notes |
|-----------|-----------|---------|-------|
| Primary Database | MongoDB (Atlas) | User data, donations, requests, activity logs | Cloud-hosted, scalable |
| Session Store | MongoDB (via connect-mongo) | Persistent session storage | Same MongoDB instance |
| ODM | Mongoose | Schema validation, queries, middleware | Simplifies MongoDB interactions |

**Database Collections**:
- `users` — User accounts, roles, verified status, **lastLoginIP, loginHistory**
- `foods` — Food donation listings with status and donor info
- `requests` — Food request records with status tracking
- `activities` — Audit trail of system events
- `contacts` — Contact form submissions
- `sessions` — Express-session documents (created by connect-mongo)

### 6.5 Security & Authentication

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Password Hashing | bcryptjs | Secure password storage (10 salt rounds) |
| Session Management | express-session + connect-mongo | Persistent, secure sessions |
| Authentication | Session-based | User verification per request |
| Access Control | Role-based (RBAC) | Donor, Receiver, Admin roles |
| Cookie Security | HttpOnly, Secure, SameSite | Protection against XSS and CSRF |
| Session Expiry | 24 hours (configurable) | Automatic session timeout |

**Session Storage Flow**:
```
User Login → Credential validation → Create req.session → 
express-session → MongoStore → MongoDB (sessions collection) → 
Browser cookie (connect.sid) → Persistent across restarts
```

### 6.6 Environment & Configuration

| Tool/Variable | Purpose | Example |
|---------------|---------|---------|
| `.env` file | Environment-specific configuration | MONGODB_URI, SESSION_SECRET, PORT |
| Node.js | JavaScript runtime | node server.js |
| npm | Package manager | npm install, npm start |

**Key Environment Variables**:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
SESSION_SECRET=random_secret_string_min_32_chars
PORT=3000
NODE_ENV=production
ADMIN_EMAIL=admin@foodsystem.com
ADMIN_PASSWORD=admin123
```

### 6.7 Deployment Platforms

| Platform | Purpose | Use Case |
|----------|---------|----------|
| MongoDB Atlas | Cloud database hosting | Production data storage |
| Heroku / Render | Node.js app hosting | Backend deployment |
| Vercel (optional) | Static file hosting | Frontend (if separated) |
| GitHub | Version control | Code repository |

### 6.8 Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| VS Code | IDE | Recommended editor |
| Postman | API testing | Test REST endpoints |
| MongoDB Compass | MongoDB GUI | Visual database browsing |
| mongosh | MongoDB shell | Command-line queries |
| Git | Version control | Collaboration and history |
| Chrome DevTools | Browser debugging | Frontend inspection |

### 6.9 Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                    Tech Stack Diagram                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Frontend Layer                                         │
│  ├─ HTML5 / CSS3 / Vanilla JS                          │
│  └─ Responsive Design (Mobile-first)                   │
│                                                         │
│  Backend Layer                                          │
│  ├─ Node.js / Express.js (4.x)                         │
│  ├─ Mongoose ODM (7.x / 8.x)                           │
│  ├─ express-session + connect-mongo                    │
│  ├─ bcryptjs (password hashing)                        │
│  ├─ CORS & Security middleware                         │
│  └─ Activity logging                                   │
│                                                         │
│  Database Layer                                         │
│  ├─ MongoDB Atlas (primary data)                       │
│  ├─ Sessions collection (connect-mongo)                │
│  └─ TTL indexes for auto-cleanup                       │
│                                                         │
│  Security Layer                                         │
│  ├─ Session persistence (no loss on restart)           │
│  ├─ IP tracking & login history (admin visible)        │
│  ├─ Secure cookie configuration                        │
│  └─ Role-based access control (RBAC)                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 6.10 Dependencies Summary

**Core Dependencies** (package.json):
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.6.3 or ^8.0.0",
  "express-session": "^1.17.3",
  "connect-mongo": "^5.1.0",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5"
}
```

**Dev Dependencies**:
```json
{
  "nodemon": "^3.0.1"
}
```

---

## 7. KEY ENHANCEMENTS IN THIS VERSION

### 7.1 MongoDB-Backed Session Store (connect-mongo)

**What Changed**:
- Previous versions used in-memory session storage (default express-session)
- New versions use `connect-mongo` for persistent MongoDB-backed sessions
- Sessions now survive server restarts
- Enables load balancing across multiple Node instances

**Benefits**:
- ✅ Persistent sessions across restarts
- ✅ Shareable across multiple app instances
- ✅ Reduced user frustration from forced re-login
- ✅ Better scalability for growing user base

### 7.2 User IP & Login History (Admin Visibility)

**What's New**:
- On every login, system captures client IP address and User-Agent
- Data stored on user document: `lastLoginIP`, `lastLoginDate`, `loginHistory[]`
- Admin dashboard shows user login history in a modal
- Enables security monitoring and suspicious activity detection

**Benefits**:
- ✅ Security monitoring (detect unauthorized access attempts)
- ✅ Admin can view login patterns
- ✅ Audit trail for compliance
- ✅ User support (help users identify suspicious activity)

### 7.3 Improved Scalability

**What Changed**:
- MongoDB connection pool increased (`maxPoolSize: 50`)
- Server timeouts configured for high concurrency
- Session store optimized with `touchAfter` (lazy updates)

**Benefits**:
- ✅ Support for ~250 concurrent users
- ✅ Better resource utilization
- ✅ Reduced database load

---

## 8. DOCUMENT OUTLINE

The complete documentation is organized as follows:

- **Part 1** (this document): Introduction, purpose, problems, proposed solutions, scope, tech stack
- **Part 2**: Literature survey and related work
- **Part 3**: Detailed Software Requirements Specification (SRS)
- **Part 4**: System design, UML diagrams, architecture
- **Part 5**: Implementation details, setup, deployment, configuration
- **Part 6**: Testing strategies, test cases, conclusions, future enhancements

Each part builds on the previous, providing comprehensive coverage of design, implementation, and deployment.

---

**End of CHAPTER-1: INTRODUCTION**

---

*Next: CHAPTER-2 (Literature Survey) — Historical context of food donation systems, relevant technologies, and design patterns.*
