# Food Management System — Complete Project Documentation

## PART 3: SOFTWARE REQUIREMENTS SPECIFICATION

---

# CHAPTER-3

## 3. SOFTWARE REQUIREMENT SPECIFICATION (SRS)

### 3.1 Introduction to SRS

The Software Requirements Specification (SRS) defines what the Food Management System must do, including functional requirements (features), non-functional requirements (quality attributes), performance, and technical specifications. This SRS aligns with IEEE 830 standards for requirements documentation.

### 3.2 Role of SRS

- Establishes a contract between stakeholders and development team
- Defines acceptance criteria for testing and deployment
- Serves as reference for design and implementation
- Enables change management and scope control

### 3.3 Functional Requirements

#### FR-1: User Authentication & Authorization

| Requirement | Description |
|-------------|-------------|
| **FR-1.1** | User signup with name, email, password, role (Donor/Receiver), location |
| **FR-1.2** | Secure login with email/password verification |
| **FR-1.3** | Admin approval workflow for new users |
| **FR-1.4** | Session persistence via MongoDB (connect-mongo) with 24-hour expiry |
| **FR-1.5** | Secure logout with session destruction |
| **FR-1.6** | Password hashing using bcryptjs (10 salt rounds) |
| **FR-1.7** | Role-based access control (Donor, Receiver, Admin) |
| **FR-1.8** | IP address and User-Agent capture on login |
| **FR-1.9** | Login history storage (last 20 entries per user) |

#### FR-2: Food Donation Management

| Requirement | Description |
|-------------|-------------|
| **FR-2.1** | Donors post food donations with name, quantity, location, availability |
| **FR-2.2** | Donors view their own donations and request history |
| **FR-2.3** | Donors edit/delete their donations (with constraints) |
| **FR-2.4** | Food status lifecycle: available → requested → completed |
| **FR-2.5** | Comprehensive food metadata storage |

#### FR-3: Food Request Management

| Requirement | Description |
|-------------|-------------|
| **FR-3.1** | Receivers browse available food donations |
| **FR-3.2** | Receivers search/filter food by category, location |
| **FR-3.3** | Receivers submit requests for specific items |
| **FR-3.4** | Receivers track request status (pending → approved → completed) |
| **FR-3.5** | Request history and past transactions visible |
| **FR-3.6** | Cancel pending requests (with constraints) |

#### FR-4: Admin Dashboard

| Requirement | Description |
|-------------|-------------|
| **FR-4.1** | Verify pending users (approve/reject) |
| **FR-4.2** | View all users with filters (role, status) |
| **FR-4.3** | Monitor all donations and requests |
| **FR-4.4** | Approve/reject food requests |
| **FR-4.5** | View system statistics (users, donations, requests counts) |
| **FR-4.6** | **View user login history & IP addresses** (NEW) |
| **FR-4.7** | **Revoke sessions or force password resets** (FUTURE) |
| **FR-4.8** | View activity logs with search and filters |
| **FR-4.9** | Respond to contact form submissions |

#### FR-5: Activity Logging & Audit Trail

| Requirement | Description |
|-------------|-------------|
| **FR-5.1** | Log all user actions (registration, login, donations, requests) |
| **FR-5.2** | Include timestamp, user ID, IP address, User-Agent in logs |
| **FR-5.3** | Make logs searchable and filterable by admin |
| **FR-5.4** | Store metadata for each activity |

#### FR-6: Contact Form & Communication

| Requirement | Description |
|-------------|-------------|
| **FR-6.1** | Public contact form for inquiries |
| **FR-6.2** | Admin-specific contact option (priority flagging) |
| **FR-6.3** | Admins view, search, and mark contact submissions as read |

### 3.4 Non-Functional Requirements

#### Performance

- API response time: < 500ms for typical operations
- Page load time: < 3 seconds on standard broadband (2 Mbps)
- Database query optimization with proper indexing
- Session lookup time: < 100ms (critical path)

#### Scalability

- Support 100-250 concurrent users (via MongoDB pool tuning)
- Horizontal scaling via shared session store (connect-mongo)
- Connection pooling: `maxPoolSize: 50`, `minPoolSize: 10`

#### Security

- Passwords hashed with bcrypt (10 salt rounds)
- Sessions encrypted with `SESSION_SECRET`
- Secure cookies: HttpOnly, Secure (prod), SameSite=Lax
- XSS protection via input validation and HttpOnly flags
- CSRF protection via SameSite attributes
- SQL/NoSQL injection prevention via Mongoose schema

#### Reliability

- Sessions persist across server restarts (via MongoDB)
- Graceful shutdown and connection cleanup
- Database reconnection on failure
- TTL indexes for automatic session cleanup

#### Maintainability

- Modular code structure (models, routes, views)
- MVC-inspired architecture
- Clear separation of concerns
- Comprehensive error messages

#### Usability

- Simple, intuitive UI for users with basic digital literacy
- Mobile-responsive design
- Clear validation messages
- Accessible navigation

### 3.5 Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Login response | < 200ms | End-to-end including DB query + IP capture |
| Food browse | < 300ms | Database query + rendering |
| Activity log load | < 500ms | Filter and paginate |
| Session lookup | < 100ms | MongoDB session retrieval |
| Concurrent users | 250 | With 50-connection pool |
| Page load | < 3s | First contentful paint |

### 3.6 Software Requirements

| Component | Requirement |
|-----------|-------------|
| **Runtime** | Node.js 14.x LTS or higher |
| **Package Manager** | npm 6.x or higher |
| **Frontend** | Modern browser (Chrome, Firefox, Safari, Edge) with ES6+ support |
| **Database** | MongoDB 4.4+ (local or Atlas) |
| **Session Store** | MongoDB via connect-mongo |
| **Dependencies** | Express.js 4.x, Mongoose 7.x/8.x, bcryptjs, dotenv |
| **Dev Tools** | Git, VS Code, MongoDB Compass (optional) |

### 3.7 Hardware Requirements

#### Development Environment

- CPU: Dual-core 1.5 GHz or higher
- RAM: 4 GB minimum (8 GB recommended)
- Disk: 500 MB free space
- Network: Stable internet (2 Mbps minimum)

#### Production Server

- CPU: Quad-core 2.4 GHz or higher
- RAM: 8-16 GB (scales with concurrent users)
- Disk: 20 GB SSD minimum (scales with data)
- Network: 1 Gbps (for external API calls)

#### Database (MongoDB Atlas)

- Storage: 5 GB minimum (scales with usage)
- Connections: 50-100 concurrent
- Backups: Daily snapshots (Atlas handles)

### 3.8 Constraints & Assumptions

**Constraints**:
- Vanilla JavaScript frontend (no frameworks)
- In-memory sessions in development (production uses MongoDB)
- No file upload support (currently scoped out)
- Single admin account per deployment

**Assumptions**:
- Users have reliable internet connectivity
- MongoDB Atlas is accessible (or local MongoDB installed)
- Email infrastructure not available (notifications future enhancement)
- All users can read English

### 3.9 Acceptance Criteria

- All FR requirements implemented and tested
- Zero critical security vulnerabilities
- Performance benchmarks met (< 500ms API response)
- Session persistence verified across restarts
- Admin IP/login history visible and functional
- 95% unit test coverage (recommended)
- Documentation complete and deployment guide provided

---

**End of CHAPTER-3: SRS**

*Next: CHAPTER-4 (System Design) — UML diagrams, architecture, and design patterns.*
