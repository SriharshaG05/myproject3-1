# Food Management System - SRS Part 4: System Features

---

# 4. System Features

This section describes the major features and functional requirements of the Food Management System in detail.

---

## 4.1 User Registration and Authentication

### Description:
The system provides secure user registration and authentication mechanisms, allowing users to create accounts, log in, and manage their sessions. All new users must be verified by an administrator before gaining full access to the platform.

### Priority: **High**

### Functional Requirements:

**FR-1.1: User Signup**
- **Description**: Users can register with the system by providing required information.
- **Input**:
  - Username (unique, 3-20 characters, alphanumeric and underscores)
  - Email (unique, valid email format)
  - Password (minimum 8 characters, containing letters and numbers)
  - Full Name
  - Phone Number
  - Address
  - Role Selection (Donor or Receiver)
- **Processing**:
  - Validate all input fields for format and uniqueness
  - Hash password using bcrypt (10 salt rounds)
  - Create new user record in database with status "pending"
  - Log registration activity
- **Output**:
  - Success: "Registration successful. Awaiting admin verification."
  - Error: Specific error message (e.g., "Email already exists")
- **Post-Condition**: User is created with "pending" status; redirect to pending page

**FR-1.2: User Login**
- **Description**: Registered users can authenticate and access their role-specific dashboards.
- **Input**:
  - Email or Username
  - Password
- **Processing**:
  - Verify credentials against database
  - Check password hash using bcrypt.compare()
  - Verify user status is "active" (not "pending" or "blocked")
  - Create session and set session cookie
  - Log login activity
- **Output**:
  - Success: Redirect to role-specific dashboard (donor, receiver, or admin)
  - Error: "Invalid credentials" or "Account pending verification"
- **Post-Condition**: User session is created; user is redirected to appropriate dashboard

**FR-1.3: Admin Verification**
- **Description**: Administrators can approve or reject pending user registrations.
- **Input**:
  - User ID
  - Action (Approve or Reject)
  - Rejection reason (optional, for rejected users)
- **Processing**:
  - Verify admin privileges
  - Update user status to "active" (approved) or "rejected"
  - Log verification activity
  - (Optional) Send notification email to user
- **Output**:
  - Success: "User verified successfully" or "User rejected"
- **Post-Condition**: User status updated; user can log in if approved

**FR-1.4: Session Management**
- **Description**: System maintains user sessions across requests.
- **Session Data**:
  - User ID
  - Username
  - Role (donor, receiver, admin)
  - Login timestamp
- **Session Expiry**: 24 hours
- **Session Storage**: In-memory (development) or MongoDB (production)
- **Cookie Configuration**: HttpOnly, SameSite=Lax, Secure (HTTPS only)

  Implementation notes:
  - In production the system uses a MongoDB-backed session store (connect-mongo) so session data is persisted in the database (default collection: `sessions`). This allows sessions to survive server restarts and supports horizontal scaling across multiple Node processes or hosts.
  - The session store uses `touchAfter` (or equivalent) to reduce write frequency; session documents include cookie metadata and the `req.session` object (for example: `userId`, `role`, `name`).
  - If `MONGODB_URI` is not provided the server falls back to the in-memory store intended for development only. Ensure `SESSION_SECRET` is set in production to sign session cookies.

**FR-1.5: Logout**
- **Description**: Users can log out, destroying their session.
- **Processing**:
  - Destroy session data
  - Clear session cookie
  - Log logout activity
- **Output**: Redirect to login page

**FR-1.6: Password Security**
- **Description**: Passwords are securely hashed before storage.
- **Hashing Algorithm**: bcrypt
- **Salt Rounds**: 10
- **Storage**: Only hashed passwords stored in database (never plain-text)

---

## 4.2 Food Donation Management

### Description:
Donors can post, manage, and track food donations. This feature enables donors to list surplus food with detailed information, making it visible to receivers.

### Priority: **High**

### Functional Requirements:

**FR-2.1: Post Food Donation**
- **Description**: Donors can create new food donation listings.
- **Input**:
  - Food Name (e.g., "Rice", "Cooked Meals", "Fresh Vegetables")
  - Food Category (Cooked, Raw, Packaged, Perishable)
  - Quantity (numeric value)
  - Unit (kg, liters, servings, pieces)
  - Description (optional, e.g., "Freshly cooked biryani")
  - Pickup Address
  - Contact Number
  - Image (optional, future enhancement)
  - Availability Date/Time (optional)
- **Processing**:
  - Validate all input fields
  - Create food record in database with:
    - Donor ID (from session)
    - Donation timestamp
    - Status: "available"
  - Log food donation activity
- **Output**:
  - Success: "Food donation posted successfully"
  - Redirect to donor dashboard with updated donation list
- **Post-Condition**: Food is visible to receivers

**FR-2.2: View My Donations**
- **Description**: Donors can view all their posted donations.
- **Processing**:
  - Query database for all food items where donor_id matches logged-in user
  - Sort by posting date (newest first)
- **Output**: List of donations with:
  - Food name, quantity, category
  - Posted date
  - Status (Available, Requested, Completed)
  - Number of requests
  - Edit and Delete buttons

**FR-2.3: Edit Food Donation**
- **Description**: Donors can update details of their posted donations.
- **Input**:
  - Food ID
  - Updated fields (name, quantity, description, etc.)
- **Processing**:
  - Verify ownership (food.donor_id === session.userId)
  - Update food record in database
  - Log edit activity
- **Output**: "Donation updated successfully"
- **Constraints**: Cannot edit if status is "completed"

**FR-2.4: Delete Food Donation**
- **Description**: Donors can remove their posted donations.
- **Input**: Food ID
- **Processing**:
  - Verify ownership
  - Check if any approved/pending requests exist (warn donor)
  - Delete food record from database
  - Delete associated requests (if any)
  - Log deletion activity
- **Output**: Confirmation: "Are you sure?" → "Donation deleted"
- **Constraints**: Cannot delete if actively being picked up

**FR-2.5: Track Requests for Donations**
- **Description**: Donors can see who has requested their donations.
- **Processing**:
  - Query requests where food_id matches donor's food items
  - Populate with receiver details
- **Output**: List of requests with:
  - Receiver name and contact
  - Request date
  - Status (Pending, Approved, Rejected, Completed)
  - Admin decision notes

---

## 4.3 Food Request Management

### Description:
Receivers can browse available food donations, submit requests, and track the status of their requests. Admin approval is required before pickup.

### Priority: **High**

### Functional Requirements:

**FR-3.1: Browse Available Food**
- **Description**: Receivers can view all active food donations.
- **Processing**:
  - Query database for all food items with status "available"
  - Sort by posting date or other criteria
- **Output**: Grid/list of food donations with:
  - Food image (if available)
  - Food name, category, quantity
  - Description (truncated)
  - Pickup location (partial address)
  - Posted date
  - "Request Food" button
- **Filters**: By category, location, date

**FR-3.2: Search Food**
- **Description**: Receivers can search for specific food items.
- **Input**: Search query (keyword)
- **Processing**: Text search on food name and description
- **Output**: Filtered list of matching food items

**FR-3.3: Submit Food Request**
- **Description**: Receivers can request available food donations.
- **Input**:
  - Food ID
  - Reason for request (optional)
  - Contact information (auto-filled from profile)
- **Processing**:
  - Verify user is receiver
  - Create request record with:
    - Receiver ID
    - Food ID
    - Donor ID (from food record)
    - Request timestamp
    - Status: "pending"
  - Update food status to "requested" (if first request)
  - Log request activity
- **Output**: "Request submitted successfully. Awaiting admin approval."
- **Post-Condition**: Request visible to admin and donor

**FR-3.4: View My Requests**
- **Description**: Receivers can track all their food requests.
- **Processing**:
  - Query requests where receiver_id matches logged-in user
  - Sort by request date (newest first)
- **Output**: List of requests with:
  - Food name, quantity, donor
  - Request date
  - Status badge (Pending, Approved, Rejected, Completed)
  - View details button

**FR-3.5: View Request Details**
- **Description**: Receivers can see full details of a request.
- **Output**:
  - Food information (name, category, quantity, description)
  - Donor contact details (if approved)
  - Pickup address (if approved)
  - Admin notes or rejection reason
  - Status and timestamps

**FR-3.6: Cancel Pending Request**
- **Description**: Receivers can cancel requests that are still pending.
- **Input**: Request ID
- **Processing**:
  - Verify ownership and status is "pending"
  - Update request status to "cancelled"
  - Revert food status to "available" (if no other requests)
  - Log cancellation activity
- **Output**: "Request cancelled successfully"
- **Constraints**: Cannot cancel approved or completed requests

**FR-3.7: Mark Request as Completed**
- **Description**: Receivers can mark approved requests as completed after pickup.
- **Input**: Request ID
- **Processing**:
  - Verify ownership and status is "approved"
  - Update request status to "completed"
  - Update food status to "completed"
  - Log completion activity
- **Output**: "Thank you! Request marked as completed."

---

## 4.4 Admin Dashboard

### Description:
Administrators have comprehensive oversight of the entire system, including user verification, request approval, activity monitoring, and user management.

### Priority: **High**

### Functional Requirements:

**FR-4.1: Verify Pending Users**
- **Description**: Admins can approve or reject new user registrations.
- **Input**:
  - User ID
  - Action (Approve/Reject)
  - Rejection reason (optional)
- **Processing**:
  - Update user status to "active" or "rejected"
  - Log verification activity
- **Output**: "User verified" or "User rejected"

**FR-4.2: Manage All Users**
- **Description**: Admins can view, search, filter, and manage all users.
- **Features**:
  - View all users (Donors, Receivers, Admins)
  - Search by username or email
  - Filter by role and status
  - View user details (profile, activity history)
  - Update user role
  - Activate/deactivate accounts
  - Delete users (with confirmation)

**FR-4.3: Monitor All Donations**
- **Description**: Admins can view all food donations across the platform.
- **Features**:
  - View all donations (Available, Requested, Completed)
  - Filter by status, category, donor
  - Search by food name
  - View donation details (including donor info)
  - Option to mark as completed or remove (with reason)

**FR-4.4: Approve or Reject Food Requests**
- **Description**: Admins review and approve/reject food requests.
- **Input**:
  - Request ID
  - Action (Approve/Reject)
  - Notes or rejection reason
- **Processing**:
  - Update request status to "approved" or "rejected"
  - Log admin decision
  - (Optional) Notify receiver and donor
- **Output**: "Request approved" or "Request rejected"
- **Post-Condition**: If approved, receiver can see donor contact; if rejected, request is closed

**FR-4.5: View All Food Requests**
- **Description**: Admins can see all requests across the system.
- **Features**:
  - View pending, approved, rejected, and completed requests
  - Filter by status, receiver, donor, date
  - Search by food name or receiver name
  - View request details (full information)

**FR-4.6: System Statistics Dashboard**
- **Description**: Admins can view key platform metrics.
- **Metrics**:
  - Total users (breakdown by role: Donor, Receiver, Admin)
  - Pending user verifications count
  - Total food donations (breakdown by status)
  - Total requests (breakdown by status)
  - Completed transactions count
  - Recent activities count (last 24 hours)
- **Visualization**: Cards or charts for quick insights

**FR-4.7: User IP & Login History (Admin Visibility)**
- **Description**: Administrators can view login-related metadata for users to support security monitoring and incident response.
- **Input**:
  - User ID (from the admin user list)
- **Processing**:
  - The admin interface retrieves user metadata fields saved on the user record, including:
    - `lastLoginIP` (string)
    - `lastLoginDate` (timestamp)
    - `loginHistory` (array of { ipAddress, userAgent, loginTime })
  - Admins can open a per-user login-history view that displays the last N login events (configurable, default 20) with IP address, timestamp and User-Agent.
  - Optionally, admins may be given the ability to revoke sessions (destroy session by session id) or export recent login events for audit.
- **Output**:
  - Admins see a table or modal with last login IP, last login timestamp, and a paginated/expandable list of recent login records.
- **Post-Condition**: Admins can monitor suspicious login activity and, if necessary, revoke active sessions or force password resets.

---

## 4.5 Contact Form Management

### Description:
Users can submit inquiries or feedback via contact forms. Admins can view and manage these submissions.

### Priority: **Medium**

### Functional Requirements:

**FR-5.1: Public Contact Form**
- **Description**: Anyone can submit a general inquiry.
- **Input**:
  - Name
  - Email
  - Subject
  - Message
- **Processing**:
  - Validate input fields
  - Create contact record in database
  - Log contact submission
  - (Optional) Send auto-reply email
- **Output**: "Thank you! Your message has been sent."
- **Post-Condition**: Contact visible to admin

**FR-5.2: Admin-Specific Contact Form**
- **Description**: Users can escalate issues directly to admins.
- **Input**: Same as public form, but marked as "admin priority"
- **Processing**: Similar to public form, with priority flag
- **Output**: "Your message has been sent to the admin team."

**FR-5.3: View Contact Submissions (Admin)**
- **Description**: Admins can view all contact form submissions.
- **Features**:
  - List all contacts with:
    - Name, email, subject (preview)
    - Submission date
    - Status (New, Read, Responded)
  - Filter by status
  - Search by name or email
  - View full message
  - Mark as read
  - Delete contact (if resolved)

**FR-5.4: Respond to Contact (Optional)**
- **Description**: If email integration exists, admins can reply to contacts.
- **Input**: Reply message
- **Processing**: Send email to contact's email address
- **Output**: "Reply sent successfully"

---

## 4.6 Activity Monitoring

### Description:
The system logs all significant user actions for transparency, accountability, and auditing purposes.

### Priority: **Medium**

### Functional Requirements:

**FR-6.1: Log User Activities**
- **Description**: System automatically logs all major actions.
- **Logged Activities**:
  - User registrations
  - Login/logout events
  - Food donations posted/edited/deleted
  - Food requests submitted/cancelled/completed
  - Admin verifications and approvals
  - Contact form submissions
- **Activity Record Fields**:
  - User ID (actor)
  - Action type (registration, login, donation, etc.)
  - Action description (e.g., "Posted food: Rice - 10 kg")
  - Timestamp
  - IP address (optional, future enhancement)
  - Related entity ID (food ID, request ID, etc.)

**FR-6.2: View Activity Logs (Admin)**
- **Description**: Admins can review all system activities.
- **Features**:
  - Chronological list of all activities
  - Filter by:
    - Activity type (login, donation, request, admin action)
    - Date range (today, last week, last month, custom)
    - User (specific user's activities)
  - Search by keyword (e.g., food name, username)
  - Export to CSV (optional)
- **Output**: Detailed activity timeline with:
  - Activity icon/type
  - User/actor name
  - Action description
  - Timestamp

**FR-6.3: Activity Retention**
- **Description**: Activities are stored indefinitely for audit purposes.
- **Storage**: MongoDB `activities` collection
- **Cleanup** (optional): Archive activities older than 1 year

---

## 4.7 Session Management

### Description:
The system manages user sessions securely, ensuring authenticated access to protected routes.

### Priority: **High**

### Functional Requirements:

**FR-7.1: Create Session on Login**
- **Processing**:
  - Generate unique session ID
  - Store session data (user ID, role, login time)
  - Set session cookie in response
- **Session Storage**: In-memory (dev) or MongoDB (production)

**FR-7.2: Validate Session on Protected Routes**
- **Processing**:
  - Extract session ID from cookie
  - Retrieve session data from store
  - Verify session has not expired
  - Load user details
- **Output**: If valid, allow access; if invalid, redirect to login

**FR-7.3: Session Expiry**
- **Expiry Time**: 24 hours
- **Behavior**: After expiry, user must log in again
- **Sliding Expiry** (optional): Reset expiry on each request

**FR-7.4: Destroy Session on Logout**
- **Processing**:
  - Delete session from store
  - Clear session cookie
- **Output**: Redirect to login page

**FR-7.5: Session Security**
- **Cookie Flags**: HttpOnly, SameSite=Lax, Secure (HTTPS)
- **Session Hijacking Prevention**: Regenerate session ID on login
- **Session Fixation Prevention**: Destroy old session on role change

---

## 4.8 Security Features

### Description:
The system implements comprehensive security measures to protect user data and prevent common vulnerabilities.

### Priority: **High**

### Functional Requirements:

**FR-8.1: Input Validation and Sanitization**
- **Description**: All user inputs are validated and sanitized.
- **Validation**:
  - Email format validation (regex)
  - Password strength requirements
  - Required fields enforcement
  - Data type validation (numbers, strings, dates)
- **Sanitization**:
  - Remove/escape HTML tags to prevent XSS
  - Trim whitespace
  - Encode special characters

**FR-8.2: Password Security**
- **Hashing**: bcrypt with 10 salt rounds
- **Storage**: Only hashed passwords stored (never plain-text)
- **Transmission**: HTTPS encryption (production)
- **Requirements**:
  - Minimum 8 characters
  - Mix of letters and numbers (recommended)

**FR-8.3: Role-Based Access Control (RBAC)**
- **Description**: Routes are protected based on user roles.
- **Roles**:
  - **Donor**: Access to donor dashboard, post/manage donations
  - **Receiver**: Access to receiver dashboard, browse/request food
  - **Admin**: Full system access, user verification, approvals
- **Enforcement**: Middleware checks session role before allowing access

**FR-8.4: Authentication Guards**
- **Description**: Protected routes require active session.
- **Implementation**: Middleware checks session existence
- **Behavior**: Redirect unauthenticated users to login page

**FR-8.5: XSS Protection**
- **Description**: Prevent cross-site scripting attacks.
- **Methods**:
  - Sanitize user inputs (remove `<script>` tags)
  - Use secure headers (Content Security Policy)
  - Escape output in HTML templates

**FR-8.6: CSRF Protection (Recommended)**
- **Description**: Prevent cross-site request forgery.
- **Implementation**: CSRF tokens in forms (future enhancement)

**FR-8.7: SQL/NoSQL Injection Prevention**
- **Description**: Prevent malicious database queries.
- **Methods**:
  - Use Mongoose schema validation
  - Avoid direct string concatenation in queries
  - Parameterized queries via Mongoose

**FR-8.8: HTTPS Enforcement (Production)**
- **Description**: Encrypt all traffic.
- **Implementation**: SSL/TLS certificate, redirect HTTP to HTTPS

**FR-8.9: Rate Limiting (Recommended)**
- **Description**: Prevent brute-force attacks and abuse.
- **Limits**:
  - Login: 5 attempts per minute per IP
  - API requests: 100 per minute per user

---

## 4.9 Responsive Design

### Description:
The system's user interface adapts seamlessly to different screen sizes and devices.

### Priority: **Medium**

### Functional Requirements:

**FR-9.1: Mobile-Friendly Layout**
- **Description**: UI elements resize and reflow for mobile screens.
- **Breakpoints**:
  - Mobile: 360px - 600px
  - Tablet: 600px - 1024px
  - Desktop: 1024px+
- **Techniques**:
  - CSS media queries
  - Flexbox and Grid layouts
  - Relative units (%, em, rem)

**FR-9.2: Touch-Friendly Controls**
- **Description**: Buttons and inputs sized for touch interaction.
- **Specifications**:
  - Minimum button size: 44×44 px (Apple guideline)
  - Adequate spacing between clickable elements
  - Large, easy-to-tap buttons

**FR-9.3: Readable Typography**
- **Description**: Text remains legible across devices.
- **Font Sizes**:
  - Body: 14-16px
  - Headings: 18-24px
  - Small text: 12px (captions)
- **Line Height**: 1.5-1.6 for readability

**FR-9.4: Image Optimization**
- **Description**: Images scale appropriately.
- **Techniques**:
  - Responsive images (`max-width: 100%`)
  - Lazy loading (future enhancement)
  - Compressed formats (JPEG, WebP)

**FR-9.5: Navigation Adaptation**
- **Description**: Navigation menu adapts to screen size.
- **Mobile**: Hamburger menu or collapsible sidebar
- **Desktop**: Horizontal navigation bar

---

## 4.10 Real-time Updates (Future Enhancement)

### Description:
The system can notify users of important events in real-time (e.g., request approval, new donations).

### Priority: **Low** (Future)

### Functional Requirements:

**FR-10.1: Real-time Notifications**
- **Description**: Users receive instant notifications.
- **Events**:
  - Donor: "Your food has been requested"
  - Receiver: "Your request has been approved/rejected"
  - Admin: "New user registration pending"
- **Implementation**: WebSockets (Socket.io) or Server-Sent Events (SSE)

**FR-10.2: Email Notifications (Future)**
- **Description**: Send email alerts for key events.
- **Events**: User verification, request approval, password reset
- **Implementation**: Nodemailer with SMTP service

**FR-10.3: Push Notifications (Future)**
- **Description**: Browser push notifications.
- **Implementation**: Web Push API with service workers

---

**END OF PART 4**

---

*Continue to Part 5 for Non-functional Requirements, Testing, and Appendices*
