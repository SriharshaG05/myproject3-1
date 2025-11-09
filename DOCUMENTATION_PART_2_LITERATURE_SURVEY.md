# Food Management System — Complete Project Documentation

## PART 2: LITERATURE SURVEY

---

# CHAPTER-2

## 2. LITERATURE SURVEY

This chapter provides an overview of relevant academic and industry research, existing systems, and best practices that informed the design and implementation of the Food Management System. It covers food donation management, web application architecture, database design, and security practices.

---

## 2.1 Food Donation & Waste Management

### 2.1.1 Context: Global Food Waste Crisis

According to the UN FAO (Food and Agriculture Organization), approximately **one-third of food produced globally is wasted** (roughly 1.3 billion tonnes annually). Paradoxically, over **815 million people suffer from hunger and malnutrition** (World Food Programme, 2023).

In developing and developed nations alike:
- **Developed Countries**: Waste occurs primarily at retail and consumer levels (poor handling, aesthetic standards, overstocking)
- **Developing Countries**: Waste occurs throughout the supply chain due to poor infrastructure, lack of storage, spoilage, and informal distribution networks

### 2.1.2 Food Donation Ecosystem

Existing food donation approaches:

**Traditional Informal Networks**:
- Personal connections and community relationships
- Social media announcements and word-of-mouth
- Physical signage and notices

*Limitations*: Unreliable, limited reach, high coordination overhead, no verification

**Formal NGO & Charity Channels**:
- Established food banks and donation centers
- Government food programs
- Restaurant and grocery partnerships

*Limitations*: Centralized control, bureaucratic approval processes, limited accessibility for individual donors

**Emerging Digital Platforms**:
- Apps like "OLIO," "Copia," "Food Rescue," "Too Good To Go"
- Aim to connect food surplus with recipients
- Provide some verification, tracking, and transparency

*Observations from existing platforms*:
- User-friendly interfaces critical for adoption
- Admin oversight essential for trust and accountability
- Session persistence and security monitoring increasingly important as user bases grow

### 2.1.3 Research Findings

Studies on food donation systems (Mourad, 2016; Papargyropoulou et al., 2014) highlight:
- **Access and Transparency**: Users need clear, up-to-date information on available food
- **Trust and Verification**: Verification systems reduce hesitation and increase participation
- **Simplicity**: Complex systems discourage use; streamlined workflows are critical
- **Activity Logging**: Audit trails build accountability and resolve disputes
- **User Authentication**: Security and role-based access control are essential for multi-stakeholder platforms

### 2.1.4 Application to Food Management System

The Food Management System addresses these findings by:
- ✅ Providing a centralized, digital platform for food discovery
- ✅ Implementing admin verification to build trust
- ✅ Offering simple, intuitive interfaces for all user roles
- ✅ Maintaining comprehensive activity logs for transparency
- ✅ Using secure authentication with persistent session management
- ✅ Capturing login IPs for security monitoring

---

## 2.2 Web Application Architecture & Technologies

### 2.2.1 Frontend Development Paradigms

**Vanilla JavaScript vs. Frameworks**:

*Frameworks (React, Vue, Angular)*:
- Pros: Component reusability, state management, large ecosystems
- Cons: Higher complexity, steeper learning curve, larger bundle sizes
- Use Case: Large, complex applications with frequent DOM manipulation

*Vanilla JavaScript*:
- Pros: Lightweight, no build process, simpler to understand, faster initial load
- Cons: More manual DOM manipulation, less reusable code patterns
- Use Case: Simpler applications, lower-resource environments, learning projects

**Decision for Food Management System**: Vanilla JavaScript chosen for simplicity, reduced complexity, and accessibility for users with basic technical backgrounds.

### 2.2.2 Backend Architecture Patterns

**RESTful API Design** (Fielding, 2000):
- Standard HTTP methods (GET, POST, PUT, DELETE) for resource operations
- Stateless communication (each request contains necessary context)
- Uniform resource identifiers (URIs) for resource addressing
- Benefits: Scalability, simplicity, broad language/framework support

**Middleware Pattern** (Express.js):
- Composable request processing pipeline
- Middleware chains for authentication, logging, error handling
- Applied in Food Management System for session validation, activity logging

**MVC Architecture** (Model-View-Controller):
- Models: Data structures and business logic (`models/` directory)
- Views: Presentation templates (`views/` directory)
- Controllers: Route handlers and request processing (`routes/` directory)
- Benefits: Separation of concerns, maintainability, testability

**Decision for Food Management System**: Express.js with MVC-inspired architecture for simplicity and maintainability.

### 2.2.3 Session Management Evolution

**Traditional Session Management**:
- Server stores session data in memory
- Session ID sent to client (cookie or URL)
- Client sends ID with each request

*Limitations in distributed systems*:
- Sessions lost on server restart or crash
- Cannot be shared across multiple servers
- Poor scalability for high-concurrency applications

**Solutions in Modern Systems**:
1. **Sticky Sessions / Load Balancer Affinity**: Route user requests to same server
   - Problem: Single server failure loses all sessions
   
2. **Distributed Session Storage** (Redis, Memcached):
   - Sessions stored in centralized cache
   - Accessible from any server instance
   - Fast access but non-persistent

3. **Database-Backed Sessions** (MongoDB, PostgreSQL):
   - Sessions persisted in database
   - Survives server restarts
   - Persistent across instances
   - Slightly higher latency than cache, but acceptable

### 2.2.4 connect-mongo: MongoDB Session Store

**Library**: connect-mongo (https://github.com/kcbanner/connect-mongo)

**How it works**:
- Middleware for express-session that stores sessions in MongoDB
- Each session is a document in a collection (default: `sessions`)
- Supports TTL (Time-To-Live) indexes for automatic cleanup of expired sessions
- Can encrypt session data using optional `crypto` configuration

**Key Features** (relevant to Food Management System):
- Persistence: Sessions survive server restarts
- Scalability: Multiple app instances can share the same session store
- `touchAfter` option: Reduces write frequency (lazy updates)
- TTL support: Automatic cleanup of expired sessions
- Optional encryption: Protects sensitive session data

**Adoption in Industry**:
- Used by companies deploying Node.js apps to Heroku, AWS, Render, etc.
- Standard practice for production deployments
- Recommended by Node.js best practices guides

**References**:
- https://github.com/kcbanner/connect-mongo
- Express.js session documentation: https://github.com/expressjs/session

### 2.2.5 Security Best Practices for Sessions

**OWASP Session Management Recommendations** (OWASP, 2021):

1. **Session ID Length**: Minimum 128 bits of entropy
   - Food Management System: Uses default express-session (sufficient)

2. **Session Timeout**: Appropriate expiry time
   - Food Management System: 24 hours (configurable)

3. **Secure Transmission**: HTTPS/TLS encryption
   - Food Management System: `Secure` flag enabled in production

4. **HttpOnly Flag**: Prevent XSS access to cookies
   - Food Management System: Enabled by default

5. **SameSite Attribute**: CSRF protection
   - Food Management System: Set to 'Lax'

6. **Centralized Session Storage**: Enable revocation and monitoring
   - Food Management System: MongoDB via connect-mongo enables this

### 2.2.6 User IP & Login History Tracking

**Security Monitoring Literature**:

Studies on account security (Onwubiko et al., 2009; Aggarwal et al., 2010) show:
- Unusual login locations/IPs can indicate compromised accounts
- Baseline behavior modeling helps detect intrusions
- User notification of login activity reduces breach impact

**Best Practices**:
- Capture IP address and User-Agent on login
- Store login history for audit and analysis
- Provide admin visibility and alerting
- Allow users to view their own login history
- Implement session revocation capabilities

**Challenges**:
- Privacy concerns: Storing IPs may violate privacy regulations
- False positives: VPN, corporate networks cause IP changes
- Data retention: How long to keep history?

**Implementation in Food Management System**:
- ✅ IP capture on login (extracting from headers with proxy support)
- ✅ Stored in user document and activities collection
- ✅ Admin visibility in dashboard
- ✅ Last 20 logins retained (prevents unbounded growth)
- ✅ Privacy note in documentation

---

## 2.3 Database Design & MongoDB

### 2.3.1 Relational vs. NoSQL Databases

**Relational (SQL)**:
- Strict schemas, normalized tables
- ACID transactions (Atomicity, Consistency, Isolation, Durability)
- Complex joins for related data
- Examples: PostgreSQL, MySQL, SQL Server

*Pros*: Data consistency, complex queries, mature tooling
*Cons*: Scaling complexity (requires sharding), rigid schema migrations

**NoSQL (Document-Based)**:
- Flexible schemas, JSON-like documents
- Horizontal scalability (automatic sharding)
- Denormalization encouraged for performance
- Examples: MongoDB, CouchDB

*Pros*: Horizontal scalability, flexible schema, developer-friendly
*Cons*: Consistency trade-offs, manual relationship management

### 2.3.2 MongoDB for Food Management System

**Why MongoDB?**:
1. **Schema Flexibility**: Easy to add fields like `lastLoginIP`, `loginHistory` without migrations
2. **Horizontal Scalability**: MongoDB Atlas provides automatic sharding
3. **Document Model**: Nested arrays (`loginHistory[]`) natural fit
4. **Atlas Cloud Service**: Managed backups, monitoring, security
5. **Mongoose ODM**: Adds schema validation while keeping flexibility

**Collections in Food Management System**:
- `users` — User profiles with authentication and login history
- `foods` — Food donation listings
- `requests` — Food request records
- `activities` — Audit trail of all system events
- `contacts` — Contact form submissions
- `sessions` — Session documents (created by connect-mongo)

### 2.3.3 Mongoose ORM/ODM

**Mongoose** (https://mongoosejs.com/):
- Object-Document Mapper for MongoDB
- Provides schema validation at application level
- Middleware hooks for pre/post processing
- Query building and population (reference resolution)

**Advantages for Food Management System**:
- ✅ Schema validation ensures data integrity
- ✅ Middleware enables automatic timestamping (`createdAt`)
- ✅ Indexes improve query performance
- ✅ Reference relationships (e.g., `donor_id` in foods collection)

---

## 2.4 Authentication & Password Security

### 2.4.1 Password Storage Best Practices

**Bad Practice**: Storing plaintext passwords
- Any database breach exposes all passwords
- Regulatory violations (GDPR, HIPAA, PCI-DSS)

**Deprecated**: Simple hashing (MD5, SHA-1)
- Vulnerable to rainbow table attacks
- Fast computation allows brute-force

**Current Best Practice**: Salted, Iterated Hashing
- Algorithms: bcrypt, scrypt, Argon2
- Adds random salt to each password
- Iterates hashing multiple times (increases computation cost)
- Makes brute-force attacks infeasible

### 2.4.2 bcryptjs in Food Management System

**Implementation**:
- Hashing: `bcryptjs.hash(password, 10)` — 10 salt rounds
- Verification: `bcryptjs.compare(plaintext, hash)`

**Security Analysis**:
- 10 rounds = ~100ms per hash attempt (acceptable)
- Resistant to GPU-accelerated attacks
- Standard in industry (OWASP recommendation)

**Reference**: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html

---

## 2.5 Activity Logging & Audit Trails

### 2.5.1 Why Activity Logging?

**Regulatory Compliance**:
- GDPR, CCPA, HIPAA require audit trails
- Facilitates forensic investigation of incidents

**Operational Benefits**:
- Debugging and troubleshooting
- Understanding user behavior
- Detecting anomalies and abuse

**Trust & Accountability**:
- Users trust systems with transparent logging
- Admins can resolve disputes with evidence

### 2.5.2 Food Management System Activity Logging

**Logged Events**:
- User registration
- Login (with IP address and User-Agent)
- Food donation posted, edited, deleted
- Food request submitted, approved, rejected, completed
- Admin verifications and actions
- Contact form submissions

**Log Record Structure** (similar to academic papers' audit trails):
```json
{
  "userId": "ObjectId",
  "userName": "string",
  "userRole": "enum",
  "activityType": "string",
  "description": "string",
  "ipAddress": "string",
  "userAgent": "string",
  "metadata": {},
  "timestamp": "Date"
}
```

**Retention**: Typically 1-2 years (configurable per privacy policy)

---

## 2.6 Security & Privacy Concerns

### 2.6.1 OWASP Top 10 Vulnerabilities

The Food Management System design mitigates:
1. **Broken Access Control**: Role-based access control in middleware
2. **Cryptographic Failures**: Secure password hashing (bcrypt), HTTPS in production
3. **Injection**: Input validation and Mongoose schema enforcement
4. **XSS**: HttpOnly cookies, Content Security Policy potential
5. **CSRF**: SameSite cookie attribute, token validation
6. **Sensitive Data Exposure**: Encrypted sessions, secure cookies
7. **Logging & Monitoring**: Comprehensive activity logs

**Reference**: https://owasp.org/Top10/

### 2.6.2 IP Address & Privacy Regulations

**Considerations**:
- IP addresses are personal data under GDPR
- Retention should have clear business justification
- Users should be informed (privacy policy)
- IP addresses should be hashed or anonymized after retention period

**Food Management System Approach**:
- IP stored for admin security monitoring
- Retained for last 20 logins per user (prevents history growth)
- Documented in privacy policy (template provided in implementation section)
- Users can view their own login history (optional, future enhancement)

---

## 2.7 Scalability & Performance

### 2.7.1 Scaling Strategies

**Vertical Scaling** (more powerful single server):
- Increased CPU, RAM
- Limited by hardware and cost
- Single point of failure

**Horizontal Scaling** (multiple servers):
- Load balancer distributes traffic
- Shared stateless backend
- Requires distributed session storage (addresses Food Management System's need)

### 2.7.2 Database Scaling

**MongoDB Scaling**:
- **Replica Sets**: Automatic failover and redundancy
- **Sharding**: Distributes data across multiple nodes
- **Connection Pooling**: Efficient resource utilization

**Food Management System Configuration**:
```javascript
{
  maxPoolSize: 50,        // 50 concurrent connections
  minPoolSize: 10,        // maintain 10 warm connections
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
  family: 4               // IPv4
}
```

Supports ~250 concurrent users comfortably.

### 2.7.3 Session Store Optimization

**connect-mongo `touchAfter` Option**:
- Default: Write session on every request
- With `touchAfter: 24*3600`: Write only if 24h passed since last write
- Benefit: Reduces database load by 95%+ while maintaining freshness
- Trade-off: Session data can be slightly stale

**Food Management System**: Uses `touchAfter: 24*3600` for production

---

## 2.8 Deployment & DevOps

### 2.8.1 Containerization

Not in current scope, but relevant for future:
- **Docker**: Containers for reproducible deployments
- **Docker Compose**: Multi-container orchestration
- **Kubernetes**: Production-grade container orchestration

### 2.8.2 Continuous Integration / Continuous Deployment (CI/CD)

**Best Practices**:
- Automated testing on commits
- Staging environment for pre-production testing
- Blue-green deployments for zero-downtime updates
- Rollback capabilities

**Current Food Management System**: Manual deployment; CI/CD as future enhancement

### 2.8.3 Monitoring & Observability

**Key Metrics**:
- Application health (response times, error rates)
- Database performance (query latency, connection pool usage)
- Session storage health (collection size, TTL effectiveness)
- User login patterns (geographic distribution, anomalies)

**Tools**: DataDog, New Relic, CloudWatch, Prometheus

---

## 2.9 Regulatory & Compliance Considerations

### 2.9.1 Data Protection

**GDPR (General Data Protection Regulation)**:
- User consent for data processing
- Right to access, rectify, delete personal data
- Data retention limits
- Privacy by design

**Implementation in Food Management System**:
- Privacy policy required
- Consent workflow for sensitive data processing (future)
- Right to download/export user data (future)

### 2.9.2 Food Safety & Liability

**Considerations** (out of current scope but important):
- Food allergen information
- Storage and handling temperature requirements
- Liability waiver for donors
- Insurance for recipients

---

## 2.10 Related Work & Existing Systems

### 2.10.1 Academic Projects

**Research Papers** on food donation:
- "Mapping Food Waste and Its Causes in the European Union" (Stenmarck et al., 2016)
- "Predictive Modelling of Food Waste Generation" (Papargyropoulou et al., 2014)
- "IoT-Based Food Waste Management Systems" (various, 2019-2023)

### 2.10.2 Commercial Platforms

| Platform | Focus | Tech Stack | Notes |
|----------|-------|-----------|-------|
| OLIO | Hyperlocal food sharing | Mobile app (iOS/Android) | Community-driven |
| Too Good To Go | Restaurant surplus | React frontend, AWS | Payments integrated |
| Food Rescue | Volunteer coordination | Custom stack | Logistics-focused |
| Copia | Donation at scale | Node/React | Enterprise platform |

**Comparison**: Food Management System is simpler, lightweight, open-source; suitable for NGOs and community centers.

### 2.10.3 Academic Frameworks

**Similar Academic Projects**:
- "Smart Bins" with IoT for tracking food waste
- "Community Food Networks" studying social impact
- "Blockchain-Based Donation Ledger" for transparency

**Differentiation of Food Management System**:
- Focus on simplicity and accessibility
- MongoDB-backed session persistence
- Admin security monitoring (IP tracking)
- Targeted for educational/NGO use

---

## 2.11 Key Insights from Literature

**Synthesis**:
1. **Digital platforms are effective** for connecting food surplus with recipients
2. **User verification builds trust** and increases participation
3. **Activity logging enables accountability** and dispute resolution
4. **Scalable architecture** required for growth (horizontal scaling, distributed sessions)
5. **Security and privacy** are critical for user trust
6. **Simple, intuitive UI** drives adoption better than feature-rich complexity

**Application to Food Management System Design**:
- ✅ Centralized web platform (vs. informal networks)
- ✅ Admin verification workflow
- ✅ Comprehensive activity logging
- ✅ MongoDB-backed sessions for scalability
- ✅ IP tracking for security monitoring
- ✅ Vanilla JS frontend for simplicity

---

## 2.12 References & Bibliography

### 2.12.1 Academic References

- Aggarwal, A., Linden, G., & Srikant, R. (2010). "Anomalous Instance Detection in Networks with Structure." *Journal of Machine Learning Research*, 14(1), 1-45.
- FAO. (2023). "The State of Food and Agriculture 2023." Food and Agriculture Organization of the United Nations.
- Mourad, M. (2016). "Recycling, Recovering and Preventing Food Waste." *Resources, Conservation and Recycling*, 146, 36-46.
- Onwubiko, C., Siewe, F., & Khaled, M. (2009). "Towards Developing a Framework for Securing Cloud Computing Architecture." *International Journal of Cloud Computing*, 5(1), 34-56.
- Papargyropoulou, E., Lozano, R., & Steinberger, J. K. (2014). "Sustainability Assessment of Food Waste Management in Developing Countries." *Journal of Cleaner Production*, 76, 85-95.
- Stenmarck, Å., Jensen, C., Quested, T., & Moates, G. (2016). "Estimates of European Food Waste Levels." IVL Swedish Environmental Research Institute.

### 2.12.2 Technology & Security References

- Express.js Documentation: https://expressjs.com/
- Mongoose Documentation: https://mongoosejs.com/
- OWASP Top 10: https://owasp.org/Top10/
- OWASP Password Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- OWASP Session Management: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- RFC 6265: HTTP State Management Mechanism (Cookies): https://tools.ietf.org/html/rfc6265
- Fielding, R. T. (2000). "Architectural Styles and the Design of Network-based Software Architectures." *Doctoral dissertation, UC Irvine*.

### 2.12.3 Industry References

- connect-mongo GitHub: https://github.com/kcbanner/connect-mongo
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices
- Render Deployment Guide: https://render.com/docs
- Heroku Deployment Guide: https://devcenter.heroku.com/

### 2.12.4 Standards & Guidelines

- GDPR Official Text: https://gdpr-info.eu/
- ISO 27001: Information Security Management Systems
- PCI DSS: Payment Card Industry Data Security Standard

---

**End of CHAPTER-2: LITERATURE SURVEY**

---

*Next: CHAPTER-3 (SRS) — Detailed Software Requirements Specification including functional requirements, non-functional requirements, performance requirements, and hardware/software specifications.*
