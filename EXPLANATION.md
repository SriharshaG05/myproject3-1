# Food Management System — Explanation

This document summarizes the app structure, routes, frontend and backend responsibilities, data models, and the full lifecycle: how the app starts, how requests flow, and how it stops. Keep this file in the project root for quick developer onboarding.

## High-level architecture
- Platform: Node.js + Express server
- Database: MongoDB via Mongoose
- Sessions: express-session (server-side sessions)
- Views: static HTML in `views/` with client-side JS in `public/js/`
- Static assets: `public/css/`, `public/js/`, images referenced from views

## Main folders & files
- `server.js` — application entrypoint, configures Express, session, static serving, and route imports.
- `views/` — HTML pages served to clients (index, about, login, signup, admin, donor, receiver, pending, etc.).
- `public/` — static assets (CSS, JS)
- `routes/` — Express route handlers for `auth`, `donor`, `receiver`, `contact`, `admin`, etc.
- `models/` — Mongoose models: `user`, `food`, `request`, `contact`, `activity`.
- `package.json` — project dependencies and npm scripts.

## Important data models (summary)
- User (`models/user.js`)
  - Fields: name, email, passwordHash, role (admin/donor/receiver), contact info, timestamps.
  - Responsible for authentication and role-based access.

- Food (`models/food.js`)
  - Fields: title, description, donorId, status (available/requested/reserved/delivered), images, location, timestamps.
  - Donors create food items; admin and donors can view/manage status.

- Request (`models/request.js`)
  - Fields: foodId, receiverId, status (pending/accepted/rejected/delivered), timestamps.
  - Receivers request food; donors accept/mark delivered.

- Contact (`models/contact.js`)
  - Fields: name, email, subject, message, status (new/read/replied), ipAddress, userAgent.
  - Created by public contact form submissions; admin can read/mark/reply/delete.

- Activity (`models/activity.js`)
  - Fields: userId, userName, userRole, activityType, description, metadata, ipAddress, userAgent, timestamps.
  - Used to log events (login, post-food, request-food, accept-request, mark-delivered) for admin monitoring.

## Routes (brief, path -> purpose)
Note: routes use session-based auth: `req.session.userId`, `req.session.role`, `req.session.name`.

- `/` (GET)
  - Serves `views/index.html` — public homepage and contact form.

- `/about` (GET)
  - Serves `views/about.html` — about page.

- `/auth` (routes in `routes/auth.js`)
  - `POST /auth/signup` — create account (donor or receiver); sets session on success.
  - `POST /auth/login` — authenticate, set session values `userId`, `role`, `name`.
  - `GET /auth/logout` — destroy session.

- `/donor` (routes in `routes/donor.js`)
  - `POST /donor/post-food` — donor posts a food item.
  - `PUT /donor/accept-request/:requestId` — donor accepts request (logs activity).
  - `PUT /donor/mark-delivered/:requestId` — mark as delivered (logs activity).
  - Additional donor endpoints: edit/delete food, view own food.

- `/receiver` (routes in `routes/receiver.js`)
  - `POST /receiver/request-food` — receiver requests a food item (logs activity).
  - Other routes: view available food, cancel requests.

- `/contact` (routes in `routes/contact.js`)
  - `POST /contact` — public contact form submission; validates with regex and saves to `contacts` collection.
  - `GET /contact/messages` — admin-only list of contact messages (paginated).
  - `PUT /contact/messages/:id/read` — admin mark-as-read.
  - `PUT /contact/messages/:id/replied` — admin mark-as-replied.
  - `DELETE /contact/messages/:id` — admin delete.

- `/admin` (routes in `routes/admin.js`)
  - `GET /admin/activities` — admin-only: return recent activity logs, supports filters and pagination.
  - `GET /admin/statistics` — summary numbers (counts of meals shared, donors, receivers, pending requests, etc.).
  - `GET /admin/dashboard-data` — aggregated data for admin UI.
  - `GET /admin/all-food` — list all food items (admin view).
  - `GET /admin/all-requests` — list all requests (admin view).

- Static assets
  - Files under `public/` are served via `express.static` (CSS, JS). Views are HTML files served with `res.sendFile()`.

## Frontend responsibilities
- Pages in `views/` are the UX surfaces. They contain client-side JS in `public/js/` to:
  - Submit forms via fetch (contact, login, signup, donor post, request post).
  - Update the UI dynamically (admin dashboard fetches activities, stats, food, requests asynchronously).
  - Provide responsive interactions (mobile menu toggle, smooth scroll, form validation feedback).
- The admin UI (`views/admin.html` + `public/js/admin.js`) polls or fetches endpoints like `/admin/activities` and `/contact/messages` to display live data.

## Backend responsibilities
- `server.js` sets up middleware: body parsers, session, static middleware, and registers routes.
- Routes implement validation, permission checks (admin-only middleware checks `req.session.role === 'admin'`), database operations via Mongoose, and activity logging.
- Activity logging: server-side calls to `Activity.logActivity(...)` are sprinkled in auth, donor, and receiver routes.
- Error handling: routes return structured JSON for AJAX endpoints (e.g., { success: true, message: '', data: {} }) or redirect/serve pages for standard requests.

## Startup sequence (how the app starts)
1. Developer runs `npm start` (or `node server.js`) from project root.
2. `server.js` loads environment config (PORT, MONGODB_URI if used), connects to MongoDB via Mongoose.
3. Express middleware initialized: `express.json()`, `express.urlencoded()`, `express.static('public')`, `express-session`.
4. Route modules are imported and registered (e.g., `app.use('/auth', authRoutes)`).
5. Server begins listening on configured PORT (e.g., 3000). Console logs: "MongoDB connected successfully" and "Server running on http://localhost:3000".
6. App is reachable; users hit `/` to see the homepage.

## Request lifecycle (example: contact form)
1. User fills contact form on `index.html` and submits.
2. Client JS intercepts submit and sends a fetch POST to `/contact` with JSON payload.
3. `/contact` route validates payload using regex and/or model methods.
4. If valid, the route stores a new `Contact` document in MongoDB and returns { success: true }.
5. Admin can later GET `/contact/messages` to retrieve messages, or use the admin UI which fetches them.

## Authentication & sessions
- Login sets `req.session.userId`, `req.session.role` and `req.session.name`.
- Protected routes check session values to allow actions (donor-only, receiver-only, admin-only).
- Admin middleware returns 401/403 when role not present or not 'admin'.

## Shutdown sequence
- Stop the Node process (Ctrl+C or kill). Express stops listening.
- Mongoose connection closes when process exits. If graceful shutdown handling is added, server listens for signals and closes DB connection before exit.

## How to run locally (short)
1. Install dependencies:

```powershell
cd d:\3-1\sdc\project3-1
npm install
```

2. Ensure MongoDB is running and update `MONGODB_URI` if necessary (or use a local default in `server.js`).
3. Start the app:

```powershell
npm start
# or
node server.js
```

4. Open http://localhost:3000 in your browser.

## How to test key flows
- Contact form: open homepage, submit contact, then login as admin and open admin page to verify message shows up under Contact Messages.
- Donor flow: signup/login as donor → Post food → check food appears in donor dashboard and admin "All Food".
- Receiver flow: signup/login as receiver → Request food → donor accepts → donor marks delivered → activity logs reflect each step.
- Admin flows: login as admin → open `/admin` UI to see activities, statistics, contact messages, food and requests.

## Notes and recommendations
- Session shape: the codebase uses `req.session.userId`, `req.session.role`, and `req.session.name`. Keep this consistent across all route handlers.
- If you want stronger auth, replace sessions with JWT or add CSRF protection for forms.
- Consider centralizing permission middleware (e.g., `isAuthenticated`, `isAdmin`, `isDonor`, `isReceiver`) to reduce duplication.
- Add server logging (winston or pino) and request tracing for easier debugging of admin fetch errors.

## Where to look in code
- `server.js` — entrypoint and route registration
- `routes/auth.js` — sign up, login, logout
- `routes/donor.js` — donor actions
- `routes/receiver.js` — receiver actions
- `routes/contact.js` — contact form endpoints and admin contact message CRUD
- `routes/admin.js` — admin activities and dashboard data
- `models/` — schema definitions for persistent data
- `views/` & `public/js/` — frontend pages and client scripts

---
If you want, I can also:
- Add this content into the main `README.md` or convert into a shorter `README-EXPLAINER.md`.
- Auto-generate a `routes.md` that lists every route with method, path, expected request body, and sample response (useful for API clients).
- Implement small improvements (mobile menu JS, responsive image srcsets, or central auth middleware). Tell me which next.
