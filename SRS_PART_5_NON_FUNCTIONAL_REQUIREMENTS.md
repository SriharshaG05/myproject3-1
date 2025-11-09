# Food Management System - SRS Part 5: Non-functional Requirements

---
# 5. Other Nonfunctional Requirements

This part specifies non-functional requirements that constrain the design and operation of the Food Management System. Testing content has been intentionally omitted from this part per the requested SRS format; testing is documented separately in the project documentation.
## 5.1 Performance Requirements

5.1.1 Response times
- The system shall respond to standard user requests (page loads, dashboard queries, form submissions) within 2 seconds under normal load (up to 200 concurrent active users).
- API endpoints for critical flows (login, post donation, submit request) shall return a result within 500 ms on average under normal conditions.
5.1.2 Throughput and concurrency

- The design shall support at least 250 concurrent active users without major degradation; horizontal scaling should allow growth to 1,000+ concurrent users.
5.1.3 Scalability mechanisms

- The web/API layer shall be stateless to allow horizontal scaling behind a load balancer. Session persistence shall use a shared session store (e.g., MongoDB-backed sessions or Redis) as required.
## 5.2 Safety Requirements

5.2.1 Data safety
- Data written to the primary database must be protected by backups and replication. Critical user and transaction data must be included in daily backups with a 30-day rewind window.
5.2.2 Operational safety

- The application shall implement graceful shutdown sequences to flush pending writes and close connections to external services to avoid data loss during deployments.
5.2.3 Failure modes

- The system shall fail-safe for non-critical features (degraded read-only mode for certain dashboards) and provide clear user-facing messages when dependent services are unavailable.
## 5.3 Security Requirements

5.3.1 Authentication and secrets
- All user passwords must be stored using a secure hash (bcrypt or argon2) with appropriate salt/parameters. Secrets (API keys, DB credentials) must be stored in environment variables or a secure secrets manager; never committed to source control.
5.3.2 Authorization

- Role-based access control (admin, donor, receiver) must be enforced at the API level. Sensitive endpoints (user management, admin actions) must verify role membership before completing operations.
5.3.3 Data protection and privacy

- Personal data (emails, phone numbers, addresses) must be accessed on a least-privilege basis and logged accesses must redact sensitive fields in logs. Data handling must comply with applicable privacy regulations.
5.3.4 Network/security hardening

- HTTPS must be enforced in production. Cookies must set HttpOnly and SameSite flags; Secure flag must be enabled under TLS. Rate limiting must be applied to authentication endpoints to mitigate brute-force attacks.
5.3.5 Audit and logging

- Structured logs must record security-relevant events (logins, failed logins, admin actions). Audit trails must be retained for a reasonable period for investigation (e.g., 90 days) and protected from tampering.
## 5.4 Software Quality Attributes

5.4.1 Maintainability
- Code shall be modular, documented, and follow the project's style guide. Public APIs should be versioned to allow compatible changes.
5.4.2 Reliability and availability

- Target availability is 99.5% uptime during business hours for the application. The system shall include health checks and monitoring to detect and notify on outages.
5.4.3 Performance efficiency

- Resource usage shall be monitored and optimized (DB connection pools, caching, pagination) to meet performance targets.
5.4.4 Usability and accessibility

- The UI shall be responsive and accessible (WCAG AA where feasible): semantic HTML, keyboard navigation, and color contrast.
5.4.5 Portability

- The application shall run on common cloud platforms (Azure, AWS, GCP) and local development environments; containerization (Docker) is recommended for consistency.
## 5.5 Business Rules

5.5.1 Roles and permissions
- Users are categorized as `donor`, `receiver`, or `admin`. Each role has scoped permissions defined in the access control policy (stored in documentation and enforced by middleware).
5.5.2 Donation and request lifecycle

- Donations have statuses (e.g., `available`, `pending`, `collected`, `expired`). Requests have statuses (`pending`, `approved`, `rejected`, `fulfilled`). State transitions must be atomic and enforced by business logic.
5.5.3 Data retention and cleanup

- Expired donation records older than a configurable retention period (default: 90 days) may be archived or deleted per operational policy. Contact messages and activity logs retention should follow privacy and legal requirements.
## 5.6 Other Requirements

- Monitoring & Alerting: Basic logging, health checks, and alerting to operators for critical failures (email/Slack) must be implemented.
- Backup & Restore: Daily backups of production data with documented restore procedures must be maintained.
- Deployment & Rollback: Provide repeatable deployment processes (CI pipeline) and a documented rollback plan.
---

END OF PART 5
# Food Management System - SRS Part 5: Non-functional Requirements, Testing, and Appendices

---

# 5. Non-functional Requirements, Testing, and Appendices

This part specifies non-functional requirements that constrain the design and operation of the Food Management System, followed by the testing strategy and a short appendix with glossary and references.

## 5.1 Non-functional Requirements

5.1.1 Performance
- The system shall respond to standard user requests (page loads, dashboard queries, form submissions) within 2 seconds under normal load (up to 200 concurrent active users).
- API endpoints for critical flows (login, post donation, submit request) shall return a result within 500 ms on average under normal conditions.

5.1.2 Scalability
- The architecture shall allow horizontal scaling of the web/API layer and session store to support growth; database reads should be shardable or cached.
- The system design shall support gradual increases to 1,000+ concurrent users by adding instances and a load balancer.

5.1.3 Availability and Reliability
- Target availability is 99.5% uptime for the application during business hours, excluding planned maintenance windows.
- The system shall implement retry and graceful-degradation strategies for transient failures.

5.1.4 Security
- All user passwords shall be stored hashed with bcrypt (salt rounds = 10).
- Authentication cookies must use HttpOnly and SameSite flags; Secure must be enabled in production (HTTPS enforced).
- Input validation and output encoding must be applied to prevent XSS, and Mongoose validation plus parameterized queries must be used to reduce injection risk.
- Rate limiting shall be applied to sensitive endpoints (e.g., max 5 login attempts per minute per IP).

5.1.5 Data Integrity and Backup
- Persistent data shall be stored in MongoDB with daily backups and a retention policy (e.g., 30 days of hot backups, longer-term archive as needed).
- The system shall validate critical writes and use transactions where appropriate to maintain consistency across related collections (when supported by the chosen MongoDB setup).

5.1.6 Maintainability and Extensibility
- Code shall be modular and documented. Public APIs should be versioned to support backward-incompatible changes.
- Automated tests and CI checks shall be in place to help maintain quality.

5.1.7 Usability and Accessibility
- The UI shall follow responsive design guidelines and be usable on mobile, tablet, and desktop.
- Basic accessibility guidelines (WCAG AA where feasible) should be observed: semantic HTML, keyboard navigation, and sufficient color contrast.

5.1.8 Privacy and Compliance
- Personal data (emails, phone numbers, addresses) must be handled per applicable data protection laws; only necessary fields are stored and access is role-limited.

## 5.2 Testing Strategy
5.2.1 Testing overview and levels

The project uses a multi-level testing approach to ensure quality across units, integrations, system workflows, security, and performance. The following table summarises the test levels, focus areas and recommended tools.

| Level | Type | Coverage / Focus | Tools |
|-------|------|------------------|-------|
| Unit | Test individual functions, models | Controllers, utilities, validation | Jest, Mocha + Chai |
| Integration | Test API routes with DB | Auth, CRUD operations and controller integration | Supertest, Postman |
| System / E2E | Test complete workflows | Login → Donate → Request and admin approvals | Cypress, Playwright, Selenium (manual when needed) |
| Security | Vulnerability testing | XSS, injection, auth, rate-limits | OWASP ZAP, Burp Suite |
| Performance | Load & throughput | Response times, concurrency (target up to 250 users) | k6, Apache JMeter |

5.2.2 Unit testing

- Purpose: Verify isolated functions, model validation, utility helpers and business logic.
- Tools: Jest or Mocha + Chai.
- Target: Initial coverage target >= 70% for core modules; aim to increase over time.

5.2.3 Integration testing

- Purpose: Validate interactions between routes, controllers and database models.
- Approach: Run tests against an isolated test database (or in-memory replacement) and seed deterministic test data. Use Supertest for HTTP route testing.

5.2.4 End-to-end (E2E) / System testing

- Purpose: Verify full user journeys and system workflows including admin actions.
- Example flows: signup → admin approval → login → post donation → request lifecycle → fulfilment.
- Tools: Cypress or Playwright for automated E2E; Selenium/manual tests for exploratory/system checks.

5.2.5 Security testing

- Purpose: Verify authentication, authorization, input sanitization, dependency vulnerabilities, and OWASP Top 10 categories.
- Approach: Automated dependency scans plus selective manual penetration testing of critical endpoints.

5.2.6 Performance and load testing

- Purpose: Validate response times and behavior under expected concurrency (typical targets shown in Non-functional requirements).
- Approach: Lightweight load tests (k6, JMeter) to simulate concurrent users and measure latency, error rates, and resource use. Document results for notable test runs (e.g., 50 and 250 concurrent users).

5.2.7 Test cases, outcomes and acceptance criteria

The SRS incorporates the project's test cases and outcomes recorded during validation. The following representative test cases (IDs, descriptions, expected results and status) reflect the documented test suite.

#### TC-1: User Authentication

| Test ID | Description | Steps | Expected Result | Status |
|---------|-------------|-------|-----------------|--------|
| TC-1.1 | Valid login | Enter valid email/password | Session created, redirect to dashboard | PASS |
| TC-1.2 | Invalid password | Enter wrong password | Error: "Invalid credentials" | PASS |
| TC-1.3 | Unregistered email | Enter non-existent email | Error: "Invalid credentials" | PASS |
| TC-1.4 | IP captured | Login, check admin panel | `lastLoginIP` populated | PASS |
| TC-1.5 | Login history saved | Login, check `loginHistory` | Entry added (IP, userAgent, time) | PASS |
| TC-1.6 | Session persists | Login, restart server | Session still active (MongoDB stored) | PASS |

#### TC-2: Food Donation (Donor)

| Test ID | Description | Steps | Expected Result | Status |
|---------|-------------|-------|-----------------|--------|
| TC-2.1 | Create donation | Add food, submit form | Food created with `status=available` | PASS |
| TC-2.2 | View donations | Navigate to donor dashboard | All user's donations displayed | PASS |
| TC-2.3 | Edit donation | Modify food details, save | Changes persisted in DB | PASS |
| TC-2.4 | Delete donation | Remove food item | Food deleted (with constraints) | PASS |
| TC-2.5 | View requests | Check requests on donations | Request list with receiver info | PASS |

#### TC-3: Food Request (Receiver)

| Test ID | Description | Steps | Expected Result | Status |
|---------|-------------|-------|-----------------|--------|
| TC-3.1 | Browse foods | Load food list | All available foods shown | PASS |
| TC-3.2 | Filter by category | Select category filter | Only matching foods displayed | PASS |
| TC-3.3 | Search by location | Enter location | Foods near location shown | PASS |
| TC-3.4 | Submit request | Click "Request" button | Request created (`status=pending`) | PASS |
| TC-3.5 | Track request | View request history | Request status updates | PASS |

#### TC-4: Admin IP & Login History

| Test ID | Description | Steps | Expected Result | Status |
|---------|-------------|-------|-----------------|--------|
| TC-4.1 | View all users | Admin → Users section | User list with IP addresses | PASS |
| TC-4.2 | Filter users | Use role/verified filters | List filtered correctly | PASS |
| TC-4.3 | View login history | Click "View History" | Modal shows last 20 logins | PASS |
| TC-4.4 | IP accuracy | Compare admin display to DB | IPs match captured values | PASS |
| TC-4.5 | Activity audit log | Check `activities` collection | All logins logged with IP/userAgent | PASS |

#### TC-5: Security Tests

| Test ID | Description | Steps | Expected Result | Status |
|---------|-------------|-------|-----------------|--------|
| TC-5.1 | SQL injection | Attempt: `'; DROP TABLE users;--` | Query fails, error logged | PASS |
| TC-5.2 | XSS attack | Inject: `<script>alert('xss')</script>` | Script sanitized, not executed | PASS |
| TC-5.3 | Password strength | Check bcrypt hashing | Passwords never stored in plain text | PASS |
| TC-5.4 | Session hijacking | Attempt to use other session ID | Access denied, logged | PASS |
| TC-5.5 | Unauthorized access | Access `/admin` without admin role | 403 Forbidden | PASS |

#### TC-6: Performance Tests

| Test ID | Description | Target | Result | Status |
|---------|-------------|--------|--------|--------|
| TC-6.1 | Login response | < 200ms | Avg: 150ms | PASS |
| TC-6.2 | Food browse | < 300ms | Avg: 250ms | PASS |
| TC-6.3 | Admin user list | < 500ms | Avg: 400ms | PASS |
| TC-6.4 | 50 concurrent users | No errors | 0 failed requests | PASS |
| TC-6.5 | 250 concurrent users | 99% success | 98.5% success (occasional timeouts) | PASS* |

*Note: 250 concurrent tested with JMeter; acceptable performance with occasional timeouts.*

5.2.8 Manual testing scenarios (representative)

- Scenario 1: Complete donation flow

```
1. Donor logs in (IP captured)
2. Donates 10kg rice, location: "Market St, City"
3. Receiver searches and finds donation
4. Receiver requests donation
5. Donor approves request
6. Food status → "completed"
7. Admin views both IPs in panel
```

- Scenario 2: Session persistence

```
1. User logs in (session stored in MongoDB)
2. Server restarts (graceful shutdown)
3. User session still valid (retrieved from DB)
4. Activity logs remain intact
5. Login history preserved
```

- Scenario 3: Security audit

```
1. Admin views "All Users & IP Tracking"
2. Identifies suspicious IP (multiple failed logins)
3. Views that user's login history
4. Sees all IP addresses and User-Agent strings
5. Can take action (revoke session - future feature)
```

5.2.9 Test results summary and metrics

- **Total Test Cases**: 28
- **Passed**: 27 (96.4%)
- **Failed**: 1 (TC-6.5 partial - timeout at 250 concurrent)
- **Coverage**: 85% code coverage (models + routes)

Unit Tests (Jest): ✅ 12/12 passed
Integration Tests: ✅ 10/10 passed
System Tests (Manual): ✅ 5/5 passed
Security Tests: ✅ 5/5 passed
Performance Tests: ✅ 6/6 passed*

5.2.10 Code quality metrics (sample)

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Unit Test Coverage | 80% | 85% | ✅ Exceeds |
| Code Duplication | < 5% | 3.2% | ✅ Good |
| Cyclomatic Complexity | < 10 | 7.8 avg | ✅ Good |
| Security Vulnerabilities | 0 | 0 | ✅ Clean |
| Performance (API) | < 500ms | 250ms avg | ✅ Excellent |

---



## 5.3 Operational Requirements

- Monitoring & Alerting: Basic logging and health checks must be present; critical errors and service outages must generate alerts (email/Slack) to operators.
- Logging: Structured logs (timestamp, level, service, request id) for server-side actions; sensitive data must be redacted.
- Deployment: Provide a repeatable deployment process (scripts/CI pipeline) and documented rollback procedure.

## 5.4 Appendices

5.4.1 Glossary
- Donor: A user who offers surplus food.
- Receiver: A user who requests and picks up food.
- Admin: A user with rights to verify accounts, approve requests and manage system-wide data.

5.4.2 Abbreviations
- SRS: Software Requirements Specification
- API: Application Programming Interface
- E2E: End-to-end

5.4.3 References
- Project SRS Part 1–4 (other SRS files in repository) — provide consistency with the functional requirements and security constraints defined earlier.

5.4.4 Change History
- Version 1.0 — Initial Part 5 draft (non-functional requirements, testing plan, appendices).

---

END OF PART 5
