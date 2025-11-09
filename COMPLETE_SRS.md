# Food Management System — Complete SRS & Project Documentation

This document consolidates the Software Requirements Specification (SRS), deployment and operational instructions, data model summaries, and developer notes for the Food Management System. It incorporates the latest runtime changes: MongoDB-backed session storage via `connect-mongo`, admin-visible login IP/history, and Atlas deployment guidance.

---

## Table of Contents

1. Introduction
2. System Overview
3. Functional Requirements (condensed)
4. Non-functional Requirements
5. Data Models (summary)
6. Session Management (connect-mongo)
7. Admin: IP & Login History
8. Deployment & Environment
9. MongoDB Atlas: Setup & Verification
10. Dev & Run Instructions
11. Testing and Verification
12. Security Considerations
13. Appendix: Useful Commands & Queries

---

## 1. Introduction

Purpose: This consolidated SRS documents the Food Management System implementation and operational guidance for development, testing, and production use. It is intended to be submitted alongside the project and to act as an authoritative reference for developers and administrators.

Scope: Covers authentication, donation lifecycle, admin features, session storage and persistence, deployment to MongoDB Atlas, and testing guidance.

Audience: Developers, system administrators, QA engineers, and project reviewers.

---

## 2. System Overview

The Food Management System is a web application that enables donors to post surplus food and receivers to request food. Administrators manage verification and monitor activity. The stack is Node.js (Express) + MongoDB (Mongoose) with vanilla JS front-end.

Key runtime components:
- Express server (`server.js`)
- Mongoose models in `models/`
- Routes in `routes/`
- Static UI in `views/` and `public/`
- Session management via `express-session` and optional `connect-mongo`

---

## 3. Functional Requirements (condensed)

This is a concise list of functional features, adapted from the detailed SRS parts in the repo.

- User registration and login (donor/receiver/admin)
- Admin verification workflow for new users
- Donor: create and manage food donations
- Receiver: browse and request food
- Admin: view users, donations, requests, activity logs
- Contact form handling
- Activity logging for auditing
- Session-based authentication with role-based access

Refer to `SRS_PART_1_INTRODUCTION.md` through `SRS_PART_4_SYSTEM_FEATURES.md` for full feature descriptions and acceptance criteria.

---

## 4. Non-functional Requirements

- Scalability: support target concurrent users (configured for ~250 concurrent connections with DB pool tuning)
- Performance: API responses under 500ms for typical operations; page load times under 3s on standard broadband
- Security: secure password hashing (bcrypt), secure cookies (httpOnly, secure in production), input validation and XSS protections
- Reliability: sessions persisted in MongoDB in production; graceful shutdown and DB reconnection handling
- Maintainability: modular routes and models, environment-driven configuration

---

## 5. Data Models (summary)

Key models (see `models/`):
- User: name, email, password (hashed), role, location, verified, points, createdAt, lastLoginIP, lastLoginDate, loginHistory
- Food: food_name, quantity, prepared_time, available_until, location, status, donor_id, createdAt
- Request: food_id, receiver_id, status, timestamps
- Activity: userId, userName, userRole, activityType, description, ipAddress, userAgent, metadata, timestamp

---

## 6. Session Management (connect-mongo)

Overview:
- Development (default): in-memory sessions (not for production)
- Production: use MongoDB-backed session store via `connect-mongo`

Why use `connect-mongo`:
- Persistence across server restarts
- Shared session store for multiple Node instances (load-balanced environments)
- Centralized session management and ability to revoke sessions

How it is configured (project):
- In `server.js` the app checks `process.env.MONGODB_URI`.
- If present, session store is created:

```js
const MongoStore = require('connect-mongo');
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }
};
if (process.env.MONGODB_URI) {
  sessionConfig.store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600, // reduces frequent writes
    crypto: { secret: process.env.SESSION_SECRET }
  });
}
app.use(session(sessionConfig));
```

Session document shape (representative):
```json
{
  "_id": "<session-id>",
  "session": {
    "cookie": { "originalMaxAge": 86400000, "expires": "..." },
    "userId": "<ObjectId or string>",
    "role": "donor",
    "name": "Alice"
  },
  "expires": "..."
}
```

Notes:
- Default collection name: `sessions` (configurable via `collectionName` option)
- `touchAfter` reduces write frequency; new sessions and explicit changes are written immediately

---

## 7. Admin: IP & Login History

Feature summary:
- On successful login the server captures client IP and User-Agent and stores them:
  - on the `User` document: `lastLoginIP`, `lastLoginDate`, and `loginHistory[]`
  - in the `activities` collection as a `login` activity
- `loginHistory` items: `{ ipAddress, userAgent, loginTime }` (default keeps the last 20 entries)

Admin UI:
- The Admin dashboard includes "All Users & IP Tracking" showing `Last Login IP`, `Last Login`, and a button to view `Login History` (modal with the recent entries).
- Admins can monitor suspicious activity and (optionally) revoke sessions by session id.

Data privacy note:
- IP addresses are personal data in certain jurisdictions; only authorized admins should access them and keep retention policies in mind.

---

## 8. Deployment & Environment

Environment variables (example `.env`):
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/food_management?retryWrites=true&w=majority
SESSION_SECRET=some_long_random_secret
PORT=3000
NODE_ENV=production
ADMIN_EMAIL=admin@foodsystem.com
ADMIN_PASSWORD=admin123
```

Install dependencies and start:
```powershell
cd 'd:\3-1\sdc\project3-1'
npm install
npm start
```

Production recommendations:
- Use HTTPS and set `cookie.secure = true` when `NODE_ENV === 'production'`
- Use a process manager (PM2) and reverse proxy (Nginx) for security and uptime
- Configure MongoDB Atlas with a replica set for HA

---

## 9. MongoDB Atlas: Setup & Verification

Steps:
1. Create a cluster in Atlas and a database user
2. Allow network access (whitelist your IP or use 0.0.0.0/0 for testing only)
3. Copy the connection string and set `MONGODB_URI`
4. Start the server with the env vars set

Verify sessions stored in Atlas:
```powershell
mongosh "<your-mongodb-uri>" --eval "db.getCollectionNames()"
mongosh "<your-mongodb-uri>" --eval "db.sessions.find().limit(5).pretty()"
```

Find sessions for a user (example):
```powershell
# find user _id
mongosh "<your-mongodb-uri>" --eval "db.users.findOne({ email: 'user@example.com' })"
# then
mongosh "<your-mongodb-uri>" --eval "db.sessions.find({ 'session.userId': ObjectId('PUT_USER_ID') }).pretty()"
```

Atlas UI: Use the Collections tab to inspect `users`, `activities`, and `sessions` collections.

---

## 10. Dev & Run Instructions

1. Clone or open the project in the workspace
2. Install dependencies: `npm install`
3. Create `.env` following the example above (do not commit it)
4. Start server: `npm start` or `npm run dev` (if using nodemon)
5. Open `http://localhost:3000` and use the UI

Admin login:
- If admin is configured via env vars: login using `ADMIN_EMAIL` & `ADMIN_PASSWORD`

Useful checks after start:
- Console: look for `MongoDB connected successfully` and `Session storage: MongoDB (Production)` log messages
- Browser: after login check cookie `connect.sid` in Application → Cookies

---

## 11. Testing and Verification

Manual tests:
- Registration and admin verification
- Login as donor/receiver and check redirection
- Check `users` collection for `lastLoginIP` and `loginHistory` entries after login
- Admin dashboard → All Users → open Login History modal
- Start server without `MONGODB_URI` and ensure sessions behave as ephemeral (memory store)

Automated tests (recommended):
- Add unit tests for auth flows and activity logging (Mocha/Jest)
- Integration test: simulate login and verify DB writes to `users` and `sessions`

---

## 12. Security Considerations

- Do not commit `.env` or credentials
- Use strong `SESSION_SECRET` and rotate after incidents
- Prefer HTTPS; set `cookie.secure` in production
- Limit admin access to IPs and use MFA for admin accounts in production
- Implement retention policy for `loginHistory` and `activities` depending on local privacy rules

---

## 13. Appendix: Useful Commands & Queries

Install dependencies and start:
```powershell
npm install
npm start
```

Check `connect-mongo` is installed:
```powershell
npm ls connect-mongo --depth=0
```

List collections in Mongo/Atlas:
```powershell
mongosh "<your-mongodb-uri>" --eval "db.getCollectionNames()"
```

Show sessions (first 5):
```powershell
mongosh "<your-mongodb-uri>" --eval "db.sessions.find().limit(5).pretty()"
```

Find sessions for a user:
```powershell
mongosh "<your-mongodb-uri>" --eval "db.sessions.find({ 'session.userId': ObjectId('PUT_USER_ID') }).pretty()"
```

Revoke a session by id (remove document from `sessions` collection):
```powershell
mongosh "<your-mongodb-uri>" --eval "db.sessions.deleteOne({ _id: 'SESSIONID' })"
```

---

If you want, I can:
- Add a `.env.example` file and a short `CHANGELOG.md` entry summarizing the runtime changes
- Add an admin API to list and revoke sessions (server code + admin UI)
- Create a small Node script `tools/list-sessions.js` for easy local session inspection

Tell me which of these you'd like next and I'll implement it.
