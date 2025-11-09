# Food Management System - SRS Part 2: Overall Description

---

# 2. Overall Description

## 2.1 Product Perspective

The **Food Management System** is a standalone web-based application designed to revolutionize how surplus food is redistributed to those in need. Unlike traditional manual coordination methods (phone calls, social media posts, or word-of-mouth), this system provides a centralized, digital platform for efficient food donation management.

### System Context:

The Food Management System operates independently without reliance on third-party food distribution platforms or donation aggregators. It serves as a complete solution encompassing:

- **User Management**: Registration, authentication, and role-based access control
- **Donation Lifecycle**: From posting to request to fulfillment
- **Administrative Oversight**: Verification, monitoring, and audit capabilities
- **Communication Layer**: Contact forms and activity notifications

### Key Differentiators:

1. **Three-Tier User Hierarchy**: Distinct roles for Donors, Receivers, and Administrators with tailored interfaces
2. **Admin Verification System**: All new users must be verified by admins before gaining full access
3. **Activity Tracking**: Comprehensive logging system for transparency and accountability
4. **Food-Specific Features**: Custom fields for food type, quantity, perishability, and pickup details

The system is built from the ground up using the **MERN-adjacent stack** (MongoDB, Express.js, Node.js) with vanilla JavaScript for the frontend, ensuring lightweight performance and ease of deployment.

**Target Deployment Environments:**
- Community centers and NGOs
- Educational institutions managing food drives
- Urban areas with active food donation programs
- Organizations focused on sustainability and social impact

---

## 2.2 Product Functions

The Food Management System provides an integrated set of functionalities to enable efficient food donation management:

### 1. User Registration & Authentication
- **Signup**: Users can register as either Donors or Receivers with required information:
  - Username, email, password
  - Full name, phone number
  - Address details
  - Role selection (Donor/Receiver)
- **Login**: Secure authentication with session management
- **Admin Verification**: New users enter a "pending" state until approved by admin
- **Session Management**: Persistent sessions with 24-hour timeout
- **Password Security**: bcrypt hashing with salt rounds

### 2. Donor Dashboard
- **Post Food Donations**: Create new food donation listings with:
  - Food name and description
  - Quantity and unit (kg, liters, servings)
  - Food category (cooked, raw, packaged, perishable)
  - Pickup address and contact details
  - Optional food image upload
  - Availability timeframe
- **Manage Donations**: View, edit, and delete posted donations
- **Track Requests**: See who has requested their donated food
- **Donation History**: View past donations and their outcomes

### 3. Receiver Dashboard
- **Browse Available Food**: View all active food donations in the system
- **Filter & Search**: Find food by type, category, or location
- **Request Food**: Submit requests for specific food items
- **Track Requests**: Monitor request status:
  - Pending (awaiting admin approval)
  - Approved (ready for pickup)
  - Rejected (with reason)
  - Completed (successfully received)
- **Request History**: View past food requests

### 4. Admin Control Panel
- **User Verification**: Approve or reject pending user registrations
- **User Management**: View all users, update roles, deactivate accounts
- **Donation Oversight**: Monitor all food donations across the platform
- **Request Management**: Approve or reject food requests
- **Activity Monitoring**: View comprehensive system activity logs:
  - User registrations and login attempts
  - Food donations posted
  - Requests submitted
  - Admin actions taken
  - Timestamps for all activities
- **Contact Form Management**: View and respond to user inquiries
- **System Statistics**: Dashboard with key metrics:
  - Total users (donors, receivers, pending)
  - Active donations
  - Pending requests
  - Completed transactions

### 5. Contact & Communication
- **General Contact Form**: Public-facing form for inquiries
- **Admin Contact Form**: Dedicated contact option for escalated issues
- **Message Storage**: All contact submissions stored in database
- **Admin Notifications**: Alert admins to new contact messages

### 6. Activity Logging
- **Comprehensive Tracking**: Log all significant system events:
  - User registrations, logins, and logouts
  - Food donations created, updated, deleted
  - Requests submitted, approved, rejected, completed
  - Admin verification actions
  - Contact form submissions
- **Audit Trail**: Maintain chronological record for accountability
- **Searchable Logs**: Admin can filter and review activities

### 7. Security Features
- **Authentication Guards**: Protected routes requiring login
- **Role-Based Access Control (RBAC)**: Enforce permissions based on user role
- **Input Validation**: Server-side validation for all form submissions
- **XSS Protection**: Sanitize inputs to prevent cross-site scripting
- **Session Security**: Secure cookie configuration with httpOnly flag
- **Password Requirements**: Enforce strong password policies

### 8. Responsive Design
- **Mobile-First Approach**: Optimized for smartphones and tablets
- **Adaptive Layouts**: CSS media queries for different screen sizes
- **Touch-Friendly**: Buttons and inputs sized for touch interaction
- **Cross-Browser Compatibility**: Works on Chrome, Firefox, Safari, Edge

---

## 2.3 User Classes and Characteristics

The Food Management System serves three distinct user classes, each with unique needs and characteristics:

### 1. Donors

**Description**: Individuals, restaurants, hotels, event organizers, or organizations with surplus food to donate.

**Characteristics**:
- Motivated by social responsibility and reducing food waste
- Need quick, easy way to post donations
- Want visibility into who receives their donations
- May have time-sensitive food requiring rapid distribution
- Range from tech-savvy to basic digital literacy

**Primary Use Cases**:
- Post food donations with detailed information
- Upload food images for better visibility
- Track requests for their donated food
- Manage and update donation listings
- View donation history and impact

**Frequency of Use**: Variable (some daily, others occasional)

**Technical Proficiency**: Basic to intermediate

---

### 2. Receivers

**Description**: NGOs, orphanages, community centers, individuals/families in need, or organizations serving underprivileged communities.

**Characteristics**:
- Motivated by addressing food insecurity
- Need to quickly find available food in their area
- Want transparency in request approval process
- May have specific dietary or quantity requirements
- Range from tech-savvy to basic digital literacy

**Primary Use Cases**:
- Browse available food donations
- Filter food by type, category, or location
- Submit requests for needed food items
- Track request status and approval
- View request history

**Frequency of Use**: Regular (daily to weekly)

**Technical Proficiency**: Basic to intermediate

---

### 3. Administrators

**Description**: System managers responsible for oversight, verification, and ensuring platform integrity.

**Characteristics**:
- Trusted individuals with authority to verify users
- Need comprehensive view of all system activities
- Responsible for approving/rejecting users and requests
- Monitor platform for misuse or policy violations
- Higher technical proficiency expected

**Primary Use Cases**:
- Verify new user registrations
- Approve or reject food requests
- Monitor donation and request activities
- Manage user accounts (activate, deactivate, update roles)
- Review contact form submissions
- Access system-wide activity logs
- Generate reports and statistics

**Frequency of Use**: Daily

**Technical Proficiency**: Intermediate to advanced

---

### User Assumptions:

- All users have **basic digital literacy** and can navigate web interfaces
- Users have access to a **device with internet connectivity** (smartphone, tablet, or computer)
- Users can **read and understand content** in the system's language (currently English)
- Donors can provide **accurate food information** and pickup details
- Receivers will **honor approved requests** and coordinate pickup
- Admins will **actively monitor** and maintain the platform

---

## 2.4 Operating Environment

The Food Management System operates within a **client-server architecture** consisting of the following components:

### Client Side (Frontend):

**Browser Requirements**:
- Modern web browsers with JavaScript enabled:
  - Google Chrome (v90+)
  - Mozilla Firefox (v88+)
  - Microsoft Edge (v90+)
  - Safari (v14+)
- HTML5 and CSS3 support
- Cookies and session storage enabled

**Device Compatibility**:
- **Desktop/Laptop**: Windows, macOS, Linux
- **Tablets**: iPad, Android tablets
- **Smartphones**: iOS (iPhone), Android devices

**Minimum Client Specifications**:
- **Processor**: Dual-core 1.5 GHz or higher
- **RAM**: 2 GB minimum (4 GB recommended)
- **Display**: Minimum resolution 360×640 (mobile), 1024×768 (desktop)
- **Network**: Stable internet connection (minimum 2 Mbps)
- **Storage**: 50 MB browser cache space

---

### Server Side (Backend):

**Hosting Environment**:
- **Operating System**: Linux (Ubuntu 20.04+ recommended), Windows Server, or macOS
- **Node.js Runtime**: Version 14.x or higher (LTS recommended)
- **Package Manager**: npm (v6+) or yarn (v1.22+)

**Server Specifications**:
- **Processor**: Quad-core 2.4 GHz or higher
- **RAM**: Minimum 4 GB (8 GB recommended for production)
- **Storage**: Minimum 20 GB SSD
- **Network**: 1 Gbps Ethernet (for production deployment)

**Required Software**:
- **Node.js & npm**: JavaScript runtime and package manager
- **MongoDB**: Database server (v4.4+ or MongoDB Atlas cloud service)
- **Express.js**: Web application framework (installed via npm)

**Network Configuration**:
- **HTTP Port**: 3000 (default, configurable via environment variables)
- **Database Port**: 27017 (MongoDB default)
- **Firewall**: Allow incoming connections on application port
- **HTTPS**: SSL/TLS certificate for production (recommended)

---

### Database Environment:

**MongoDB Database**:
- **Version**: MongoDB 4.4 or higher
- **Deployment Options**:
  - **Local Installation**: For development and testing
  - **MongoDB Atlas**: Cloud-hosted (recommended for production)
- **Storage Engine**: WiredTiger (default)
- **Minimum Storage**: 5 GB (scales with data volume)

**Collections**:
- `users`: User account information
- `foods`: Food donation listings
- `requests`: Food request records
- `contacts`: Contact form submissions
- `activities`: System activity logs

---

### Development Environment:

**Recommended Tools**:
- **Code Editor**: Visual Studio Code, Sublime Text, or Atom
- **Version Control**: Git & GitHub
- **API Testing**: Postman or Insomnia
- **Browser DevTools**: Chrome DevTools or Firefox Developer Tools

**Environment Variables** (`.env` file):
```
MONGODB_URI=mongodb://localhost:27017/food_management
SESSION_SECRET=your_secure_random_string_here
PORT=3000
NODE_ENV=development
```

---

### Deployment Environment:

**Supported Platforms**:
- **Cloud Hosting**: AWS EC2, Google Cloud Platform, Microsoft Azure, DigitalOcean
- **Platform-as-a-Service**: Heroku, Render, Railway
- **On-Premises**: Private servers or data centers

**Production Requirements**:
- **HTTPS**: SSL/TLS encryption for secure communication
- **Process Manager**: PM2 or similar for Node.js application management
- **Reverse Proxy**: Nginx or Apache for load balancing and security
- **Backup System**: Regular database backups (daily recommended)
- **Monitoring**: Application and server monitoring tools (e.g., New Relic, Datadog)

---

## 2.5 Design and Implementation Constraints

The Food Management System is subject to the following technical and design constraints:

### Technical Constraints:

1. **Technology Stack**:
   - Backend must be implemented using **Node.js** with **Express.js** framework
   - Database must use **MongoDB** (NoSQL document database)
   - Frontend must use **vanilla HTML, CSS, and JavaScript** (no frameworks like React/Vue/Angular)
   - Session management using **express-session** middleware

2. **Database Design**:
   - Must use **Mongoose ODM** for MongoDB schema definition and validation
   - Schema designs defined in `models/` directory
   - Relationships managed through reference fields (ObjectId)

3. **Authentication**:
   - Password hashing using **bcryptjs** (minimum 10 salt rounds)
   - Session-based authentication (not JWT tokens in current version)
   - Role-based access control (RBAC) for Donor, Receiver, Admin

4. **File Organization**:
   - MVC-inspired architecture: Models, Routes, Views, Public assets
   - Server entry point: `server.js`
   - Environment configuration: `.env` file

### Design Constraints:

1. **User Interface**:
   - Must be **responsive** and mobile-friendly
   - Clean, intuitive design for users with basic technical skills
   - Consistent styling across all pages using `public/css/style.css`

2. **Security Requirements**:
   - Input validation and sanitization on both client and server side
   - Protection against XSS (Cross-Site Scripting) attacks
   - Secure session cookie configuration
   - HTTPS recommended for production deployment

3. **Scalability Considerations**:
   - Must support at least **100 concurrent users** initially
   - Database queries must be optimized with proper indexing
   - Session storage should use MongoDB-backed store for production

### Implementation Constraints:

1. **Browser Compatibility**:
   - Must work on modern browsers (Chrome, Firefox, Edge, Safari)
   - Graceful degradation for older browser versions

2. **Performance**:
   - Page load time should not exceed 3 seconds on standard broadband
   - API response time should be under 500ms for typical operations

3. **Accessibility**:
   - Basic WCAG 2.1 Level A compliance
   - Keyboard navigation support
   - Alt text for images

4. **Data Validation**:
   - All user inputs must be validated server-side
   - Required fields enforced at database schema level

---

## 2.6 User Documentation

The Food Management System includes comprehensive user documentation to assist all user types:

### 1. In-App Guidance:

- **Tooltips and Labels**: Clear labels and helpful tooltips throughout the interface
- **Placeholder Text**: Descriptive placeholders in form fields
- **Error Messages**: Informative error messages for validation failures
- **Success Notifications**: Confirmation messages for successful actions

### 2. User Guides (Planned):

- **Donor Guide**:
  - How to register and get verified
  - Step-by-step instructions for posting food donations
  - Managing and editing donations
  - Understanding request notifications

- **Receiver Guide**:
  - Registration and verification process
  - Browsing and searching for food
  - Submitting food requests
  - Tracking request status

- **Admin Manual**:
  - User verification workflow
  - Managing donations and requests
  - Interpreting activity logs
  - Handling contact form submissions

### 3. README Documentation:

- Installation and setup instructions
- Configuration guide (environment variables)
- Database setup and connection
- Running the application locally
- Deployment guidelines

### 4. Code Documentation:

- Inline comments explaining complex logic
- Function and route documentation
- Database schema descriptions
- API endpoint documentation

---

## 2.7 Assumptions and Dependencies

### Assumptions:

1. **User Behavior**:
   - Users will provide accurate and truthful information during registration
   - Donors will post genuine food donations with correct details
   - Receivers will honor approved food requests and coordinate pickup
   - Admins will actively verify users and monitor platform activities

2. **Technical Environment**:
   - Users have access to devices with internet connectivity
   - Modern web browsers with JavaScript enabled are being used
   - MongoDB database service is available and operational

3. **Operational**:
   - System administrators will perform regular backups
   - Server infrastructure will have adequate capacity for expected user load
   - Internet connectivity is stable and reliable

### Dependencies:

**1. External Services**:
- **MongoDB Database**: Application relies on MongoDB availability
  - Risk: Database downtime affects entire system
  - Mitigation: Use MongoDB Atlas with built-in redundancy, or implement local backup

**2. Node.js Runtime Environment**:
- **Node.js Platform**: Application requires Node.js runtime
  - Risk: Node.js version compatibility issues
  - Mitigation: Specify exact Node.js version in documentation

**3. npm Packages**:

Critical dependencies (from `package.json`):

```json
{
  "express": "^4.18.x",
  "mongoose": "^6.x.x",
  "bcryptjs": "^2.4.x",
  "express-session": "^1.17.x",
  "dotenv": "^16.x.x"
}
```

- **express**: Web framework for routing and middleware
- **mongoose**: MongoDB ODM for schema and database operations
- **bcryptjs**: Password hashing and verification
- **express-session**: Session management middleware
- **dotenv**: Environment variable management

**4. Frontend Assets**:
- **CSS Framework**: Custom CSS (no external dependencies)
- **JavaScript**: Vanilla ES6 JavaScript (no libraries like jQuery)
- **Icons/Images**: Stored locally in `public/images/`

**5. Network Dependencies**:
- Stable internet connection for users
- Reliable server hosting infrastructure
- Domain name and DNS configuration (for production)

**6. Security Dependencies**:
- SSL/TLS certificates for HTTPS (production)
- Secure session secret key configuration

### Dependency Risks and Mitigation:

| Dependency | Risk | Mitigation Strategy |
|------------|------|---------------------|
| MongoDB | Database unavailability | Use MongoDB Atlas with auto-failover; maintain backups |
| npm packages | Security vulnerabilities | Regular `npm audit` checks; keep packages updated |
| Node.js | Runtime compatibility | Pin Node.js version; use nvm for version management |
| Internet | Network outage | Deploy on reliable hosting; consider CDN for assets |

---

## Tech Stack

### Backend Technologies:

**1. Node.js (v14.x or higher)**
- **Purpose**: Server-side JavaScript runtime environment
- **Role**: Executes backend logic, handles HTTP requests, manages database operations
- **Key Features**:
  - Event-driven, non-blocking I/O model
  - Fast execution with V8 JavaScript engine
  - Large ecosystem of npm packages

**2. Express.js (v4.18.x)**
- **Purpose**: Web application framework for Node.js
- **Role**: Simplifies routing, middleware management, and HTTP request/response handling
- **Key Features**:
  - Minimalist and flexible framework
  - Robust routing system
  - Middleware support for session, parsing, and static files
  - Easy integration with template engines

**3. MongoDB (v4.4+)**
- **Purpose**: NoSQL document database
- **Role**: Stores all application data (users, food donations, requests, contacts, activities)
- **Key Features**:
  - Schema-less document storage (JSON-like BSON format)
  - High performance and scalability
  - Flexible data modeling
  - Indexing and querying capabilities

**4. Mongoose (v6.x.x)**
- **Purpose**: MongoDB Object Data Modeling (ODM) library
- **Role**: Defines schemas, validates data, manages relationships, provides query builders
- **Key Features**:
  - Schema definition and validation
  - Middleware (pre/post hooks)
  - Built-in type casting
  - Query building and population

---

### Backend Libraries & Middleware:

**1. bcryptjs (v2.4.x)**
- **Purpose**: Password hashing and encryption
- **Role**: Securely hash user passwords before storing in database; verify passwords during login
- **Key Features**:
  - Salt generation and hashing
  - Synchronous and asynchronous methods
  - Configurable salt rounds for security

**2. express-session (v1.17.x)**
- **Purpose**: Session management middleware
- **Role**: Manages user sessions, stores session data, handles cookies
- **Key Features**:
  - Session storage (memory, MongoDB, Redis)
  - Cookie configuration (httpOnly, secure, maxAge)
  - Session regeneration and destruction

**3. dotenv (v16.x.x)**
- **Purpose**: Environment variable management
- **Role**: Loads environment variables from `.env` file into `process.env`
- **Key Features**:
  - Separates configuration from code
  - Secures sensitive data (API keys, database URIs)
  - Supports multiple environments (dev, staging, production)

**4. body-parser** (included in Express v4.16+)
- **Purpose**: Parse incoming request bodies
- **Role**: Parses JSON and URL-encoded data from POST requests
- **Key Features**:
  - JSON parsing
  - URL-encoded form data parsing
  - Raw and text body parsing

**5. path** (Node.js built-in module)
- **Purpose**: File and directory path utilities
- **Role**: Construct absolute paths for serving static files and views
- **Key Features**:
  - Cross-platform path handling
  - Path joining and resolving
  - Filename and extension extraction

---

### Frontend Technologies:

**1. HTML5**
- **Purpose**: Structure and content of web pages
- **Role**: Defines page layout, forms, navigation, and semantic markup
- **Key Features**:
  - Semantic elements (`<header>`, `<nav>`, `<section>`, `<footer>`)
  - Form validation attributes
  - Accessibility features (ARIA labels)

**2. CSS3**
- **Purpose**: Styling and visual presentation
- **Role**: Controls layout, colors, fonts, responsiveness, and animations
- **Key Features**:
  - Flexbox and Grid layouts
  - Media queries for responsive design
  - Transitions and animations
  - Custom properties (CSS variables)

**3. JavaScript (ES6+)**
- **Purpose**: Client-side interactivity and logic
- **Role**: Handles form submissions, API calls (fetch), DOM manipulation, validation
- **Key Features**:
  - Async/await for asynchronous operations
  - Arrow functions and template literals
  - Event handling and DOM manipulation
  - Local storage for client-side data

---

### Development Tools:

**1. Git & GitHub**
- **Purpose**: Version control and collaboration
- **Role**: Track code changes, manage branches, collaborate with team members

**2. npm (Node Package Manager)**
- **Purpose**: Dependency management
- **Role**: Install, update, and manage project dependencies

**3. Postman / Insomnia**
- **Purpose**: API testing and development
- **Role**: Test API endpoints, inspect requests/responses, debug issues

**4. Visual Studio Code**
- **Purpose**: Code editor and IDE
- **Role**: Write, edit, and debug code with syntax highlighting and extensions

---

### Deployment & Production:

**1. Cloud Hosting Platforms** (Options):
- **Heroku**: Simple PaaS deployment with Git integration
- **Render**: Modern cloud platform with auto-deploy
- **DigitalOcean**: Virtual private servers (Droplets)
- **AWS EC2**: Scalable cloud compute instances

**2. MongoDB Atlas**
- **Purpose**: Cloud-hosted MongoDB database
- **Role**: Production database with automated backups, scaling, and monitoring

**3. PM2** (Process Manager)
- **Purpose**: Node.js application process management
- **Role**: Keep application running, auto-restart on crashes, load balancing

**4. Nginx** (Optional)
- **Purpose**: Reverse proxy and web server
- **Role**: Handle SSL termination, load balancing, serve static files

---

### Tech Stack Summary Diagram:

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT SIDE                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  HTML5   │  │   CSS3   │  │  JavaScript ES6+ │ │
│  └──────────┘  └──────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────┘
                      │
                      │ HTTP/HTTPS
                      ▼
┌─────────────────────────────────────────────────────┐
│                   SERVER SIDE                       │
│  ┌───────────────────────────────────────────────┐ │
│  │            Node.js + Express.js               │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │  Middleware: session, body-parser, etc. │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │  Routes: auth, donor, receiver, admin   │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │  Models: user, food, request, contact   │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                      │
                      │ Mongoose ODM
                      ▼
┌─────────────────────────────────────────────────────┐
│                   DATABASE                          │
│              MongoDB (Atlas / Local)                │
│  ┌──────┐  ┌──────┐  ┌──────────┐  ┌──────────┐   │
│  │users │  │foods │  │ requests │  │activities│   │
│  └──────┘  └──────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────┘
```

---

**END OF PART 2**

---

*Continue to Part 3 for External Interface Requirements*
