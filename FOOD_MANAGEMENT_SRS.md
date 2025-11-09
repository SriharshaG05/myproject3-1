# Software Requirements Specification (SRS)
## Food Management System

---

## 1. Introduction

### 1.1 Purpose

The purpose of the **Food Management System** is to streamline and optimize how organizations and individuals manage food resources, inventory, and distribution. This comprehensive system addresses the critical challenges of food waste, inefficient resource allocation, and poor inventory tracking that plague restaurants, cafeterias, food banks, catering services, and institutional dining facilities.

Traditional methods of managing food inventory, tracking perishable items, and coordinating food distribution are often manual, error-prone, and time-consuming. The Food Management System tackles these challenges by providing an integrated, intelligent platform for inventory management, demand forecasting, waste reduction, and nutritional tracking.

This system is designed to:
- Minimize food waste through intelligent inventory tracking and expiration management.
- Enable real-time visibility into food stock across multiple locations.
- Automate demand forecasting and procurement processes.
- Reduce operational costs through optimized resource allocation.
- Maintain food safety and regulatory compliance standards.
- Enhance nutritional planning and dietary management.
- Facilitate efficient distribution and logistics coordination.
- Provide actionable insights through comprehensive analytics and reporting.

### 1.2 Document Conventions

This Software Requirements Specification (SRS) document follows a consistent structure and formatting style to ensure clarity, readability, and ease of interpretation. The following conventions are applied throughout the document:

**Font Sizes:**
- Title: 16 px
- Headings (e.g., 1.1, 2.3): 14 px
- Body Text: 12 px

**Text Styles:**
- Bold text is used for module names, components, and key terms.
- Monospaced font is applied to file types, code snippets, or system inputs (e.g., PDF, POST /api/inventory).
- The document uses Times New Roman font throughout.

**Acronyms and Abbreviations:**
- FIFO – First In, First Out
- SKU – Stock Keeping Unit
- QR – Quick Response Code
- RFID – Radio Frequency Identification
- API – Application Programming Interface
- UI – User Interface
- HACCP – Hazard Analysis and Critical Control Points
- POS – Point of Sale

**Numbering Scheme:**
- Section numbering follows IEEE 830 SRS standards for easy navigation and reference (e.g., 1.2, 3.4.2).

### 1.3 Intended Audience and Reading Suggestions

**Intended Audience:**
This document is intended for the following stakeholders:
- **Developers & Designers:** To understand the functional and non-functional requirements, system architecture, and design constraints necessary for implementation.
- **Testers & QA Engineers:** To refer to the defined system behavior, performance expectations, and edge cases for validation and verification activities.
- **Business Analysts:** To understand the business processes, workflows, and requirements that drive system functionality.
- **System Administrators:** To understand deployment, configuration, and maintenance procedures.
- **End Users** (e.g., Restaurant Managers, Inventory Coordinators, Nutritionists): To understand how the system fulfills their operational needs.

**Reading Suggestions:**
To effectively navigate this SRS document:
- Start with Section 1 for an overview of the system's background and purpose.
- Section 2 provides a high-level description of system functionality, operating environment, and user interactions.
- Sections 3 and 4 are essential for developers and testers as they detail requirements and design aspects.
- Section 5 covers non-functional requirements such as performance, reliability, and security.
- Appendices include glossary terms, data models, and architectural diagrams.

### 1.4 Product Scope

The **Food Management System** is a comprehensive, integrated platform designed to help organizations efficiently manage food inventory, track perishable items, forecast demand, coordinate distribution, and maintain food safety compliance.

The system processes inventory data in real-time by capturing stock levels, item details, expiration dates, and storage conditions. It leverages advanced analytics and machine learning algorithms to predict demand patterns, optimize procurement strategies, and reduce food waste. The system stores all data in a cloud-based database and provides secure access through web and mobile interfaces.

**Key Capabilities:**
- Real-time inventory tracking across multiple locations and storage units.
- Automated expiration date monitoring and waste alerts.
- Demand forecasting using historical data and seasonality patterns.
- Multi-location inventory synchronization and management.
- Nutritional information tracking and dietary compliance.
- QR code and barcode scanning for efficient stock management.
- Role-based access control for different user levels.
- Comprehensive reporting and analytics dashboards.
- Integration with procurement and vendor management systems.
- Food safety compliance and HACCP adherence.
- Wastage analytics and reduction recommendations.

The scope of the Food Management System encompasses inventory ingestion and tracking, expiration management, demand forecasting, vendor coordination, nutritional planning, waste reduction analytics, multi-location synchronization, user access management, and compliance monitoring. It is intended for restaurants, cafeterias, food banks, catering services, institutional dining facilities, and retail food establishments.

---

## 2. Overall Description

### 2.1 Product Perspective

The Food Management System is a standalone, integrated platform designed to revolutionize how organizations manage food resources and inventory. Unlike traditional manual tracking systems or basic inventory spreadsheets, the Food Management System employs advanced technologies such as real-time data analytics, machine learning-driven demand forecasting, barcode/QR code scanning, and cloud-based data synchronization to provide comprehensive, intelligent food management.

The system functions as a centralized hub for all food-related operations, including inventory tracking, procurement coordination, waste management, and nutritional planning. It serves as an intelligent operational layer over an organization's food distribution network, enabling data-driven decision-making and optimized resource allocation.

By emphasizing automation, real-time visibility, and predictive analytics, the Food Management System greatly enhances both operational efficiency and cost management. This makes it particularly valuable in domains where food waste is significant and operational accuracy is critical — such as large-scale catering, institutional dining, food banks, restaurants, and healthcare facilities.

Developed from the ground up, the Food Management System represents a next-generation utility purpose-built for food service operations where intelligent, data-centric inventory and resource management is critical.

### 2.2 Product Functions

The Food Management System provides an integrated set of functionalities to enable intelligent, efficient food resource management:

1. **Inventory Management & Tracking**
   - Real-time stock level monitoring across multiple storage units and locations.
   - Support for barcode and QR code scanning for rapid stock updates.
   - FIFO (First In, First Out) tracking for perishable items.
   - Detailed item information including SKU, category, cost, and supplier details.

2. **Expiration Date Management**
   - Automatic tracking of expiration dates and shelf life for all items.
   - Alerts and notifications for items approaching expiration.
   - Automated movement to waste queue for expired items.
   - Historical tracking of expired and discarded items.

3. **Demand Forecasting & Procurement**
   - Machine learning-based demand prediction based on historical consumption patterns.
   - Seasonality and trend analysis for inventory optimization.
   - Automated procurement recommendations.
   - Vendor management and price comparison tools.
   - Purchase order generation and tracking.

4. **Multi-Location Management**
   - Central dashboard for managing inventory across multiple locations.
   - Real-time synchronization of stock levels and transfers between locations.
   - Location-specific reporting and analytics.
   - Inter-location transfer requests and approvals.

5. **Nutritional Information & Dietary Compliance**
   - Comprehensive nutritional database with macro and micronutrient information.
   - Allergen tracking and dietary restriction management.
   - Menu planning with nutritional balance suggestions.
   - Dietary compliance reporting for healthcare institutions.

6. **Waste Management & Analytics**
   - Detailed tracking of food waste by category and cause.
   - Waste trend analysis and reduction recommendations.
   - Root cause analysis for waste incidents.
   - Cost impact analysis of wastage.

7. **Quality Control & Food Safety**
   - Temperature monitoring for cold chain items.
   - Compliance tracking for food safety regulations (HACCP, health codes).
   - Inspection checklists and documentation.
   - Incident reporting and management.

8. **User Interface & Dashboard**
   - Responsive, intuitive web interface for desktop access.
   - Mobile application for on-the-go inventory updates and queries.
   - Customizable dashboards with key performance indicators (KPIs).
   - Role-specific views and data access.

9. **Reporting & Analytics**
   - Comprehensive inventory reports with cost analysis.
   - Consumption trend analysis and forecasting reports.
   - Waste and sustainability reports.
   - Performance metrics and KPI dashboards.
   - Export functionality in multiple formats (PDF, Excel, CSV).

10. **Integration Capabilities**
    - API integration with POS (Point of Sale) systems.
    - Integration with vendor management and procurement platforms.
    - Recipe management system integration for meal planning.
    - Accounting system integration for financial reporting.

### 2.3 User Classes and Characteristics

The primary users of the Food Management System fall into the following categories:

- **Inventory Coordinators/Stock Managers**
  - Responsible for day-to-day inventory updates and stock level management.
  - Require quick and efficient tools for scanning, updating, and tracking items.
  - Need real-time visibility into stock levels and alerts for critical items.

- **Restaurant/Kitchen Managers**
  - Oversee food procurement, menu planning, and operational efficiency.
  - Require reports on consumption patterns, waste metrics, and cost analysis.
  - Need decision-support tools for menu optimization and vendor negotiation.

- **Nutritionists & Dietary Specialists**
  - Plan menus considering nutritional balance and dietary requirements.
  - Require access to detailed nutritional information and dietary compliance tracking.
  - Need reports on nutritional adequacy and allergen management.

- **Administrators & System Managers**
  - Manage user access, system configuration, and security settings.
  - Oversee system performance and user activity.
  - Handle user management, roles, and permissions.

- **Procurement & Vendor Coordinators**
  - Manage supplier relationships and purchase orders.
  - Track vendor performance and pricing.
  - Process procurement recommendations from the system.

**User Assumptions:**
- Users are expected to have basic digital literacy and familiarity with business applications.
- No prior technical knowledge of machine learning or advanced analytics is required.
- The interface is designed to accommodate both technical and non-technical users through intuitive interaction and comprehensive training materials.
- Users have varying levels of system access based on their roles and responsibilities.

### 2.4 Operating Environment

The Food Management System operates within a client-server architecture and consists of the following components:

- **Frontend**
  - A web-based user interface built with ReactJS, accessible through modern web browsers (Chrome, Firefox, Edge, Safari).
  - A native mobile application for iOS and Android for field inventory updates.
  - Real-time dashboard with live data updates.
  - Responsive design supporting various screen sizes and devices.
  - Integration with barcode/QR code scanning libraries.

- **Backend**
  - A server-side application developed using Node.js with Express.js framework.
  - Responsible for:
    - Inventory data management and real-time updates
    - Demand forecasting algorithms and machine learning model execution
    - API endpoints for data retrieval and manipulation
    - Integration with external systems (POS, vendor platforms)
    - Notification and alerting system
    - Report generation and data export

- **Database**
  - Primary relational database (PostgreSQL or MySQL) for structured inventory data.
  - NoSQL database (MongoDB) for flexible document storage and historical analytics.
  - Vector/Time-series database for analytics and forecasting data.
  - Cloud-based data warehouse for large-scale analytics.

- **Machine Learning & Analytics Engine**
  - Python-based analytics and forecasting engine using libraries like scikit-learn, TensorFlow, and Pandas.
  - Real-time data processing and model inference.
  - Historical data aggregation and trend analysis.

- **Hosting and Execution**
  - The system runs on cloud infrastructure (AWS, GCP, Azure, or private cloud).
  - End users access the system through a web browser or mobile application.
  - No software installation required on client machines.
  - Scalable architecture supporting growth in users and data volume.

### 2.5 Design and Implementation Constraints

The design and implementation of the Food Management System are subject to the following technical constraints:

- The system must support real-time data updates and high-frequency API requests from multiple locations.
- Integration with barcode/QR code scanning systems requires standardized data formats.
- The backend uses Node.js with Express.js framework for API development.
- The frontend is built using ReactJS with TypeScript for type safety.
- Machine learning models must operate within acceptable latency constraints (<2 seconds for predictions).
- The system must comply with food safety regulations and data privacy standards (GDPR, HIPAA where applicable).
- Mobile applications must support both iOS and Android platforms with native or cross-platform frameworks.
- Data synchronization across multiple locations must maintain consistency and minimize conflicts.

### 2.6 User Documentation

The Food Management System will include comprehensive user documentation to assist users in effectively utilizing the platform. The documentation will cover:

- **Getting Started:** Initial system setup, user account creation, and first-time configuration.
- **Inventory Management:** Detailed guides on adding items, updating stock levels, and using barcode scanning.
- **Demand Forecasting:** Explanation of forecasting algorithms and interpretation of predictions.
- **Multi-Location Operations:** Managing inventory across multiple facilities and performing inter-location transfers.
- **Nutritional Planning:** Creating menus with nutritional constraints and dietary requirements.
- **Reporting & Analytics:** Generating reports, exporting data, and interpreting key metrics.
- **Mobile App Usage:** Step-by-step guide for mobile inventory updates and query functions.
- **Video Tutorials:** Walkthrough videos demonstrating common tasks and workflows.
- **API Documentation:** Technical documentation for integrations and custom implementations.
- **Troubleshooting & Support:** Common issues and resolution steps with contact information for technical support.

### 2.7 Assumptions and Dependencies

**Assumptions:**
- Organizations using the system have reliable internet connectivity.
- Users have access to barcode/QR code scanning devices or smartphone cameras for inventory updates.
- Data will be maintained with accuracy by users at point of input.
- Organizations have defined food storage and handling protocols that the system will monitor.

**Dependencies:**
- The system relies on accurate machine learning model training with high-quality historical data.
- Integration with third-party POS systems requires APIs or standardized data formats from those vendors.
- Mobile application functionality depends on device capabilities (camera, storage, network).
- Real-time inventory updates depend on consistent user input and scanning practices.
- Forecasting accuracy depends on consistent historical data and stable consumption patterns.
- Cloud infrastructure availability for hosting and data storage.

**Tech Stack**

**Programming Languages:**
- Node.js (JavaScript/TypeScript) – Backend development, API implementation.
- Python – Machine learning, demand forecasting, analytics.
- JavaScript (ES6+) – Frontend development with ReactJS.
- Java – Optional for high-performance processing components.

**Backend Frameworks and Libraries:**
- Express.js – RESTful API development and request handling.
- Flask/Django – Machine learning model serving (Python backend).
- Node-cron – Scheduled tasks and automated alerts.
- Winston/Morgan – Logging and monitoring.
- Passport.js – Authentication and authorization.
- Multer – File upload handling.
- Nodemailer – Email notifications.

**Machine Learning & Data Science Libraries:**
- Scikit-learn – Machine learning algorithms for demand forecasting.
- TensorFlow/PyTorch – Deep learning models for advanced predictions.
- Pandas – Data manipulation and analysis.
- NumPy – Numerical computing.
- Statsmodels – Statistical modeling and forecasting (ARIMA, etc.).
- Matplotlib/Seaborn – Data visualization.

**Frontend Frameworks and Libraries:**
- ReactJS – UI component development.
- React Router – Navigation and routing.
- Redux or Context API – State management.
- Material-UI or Ant Design – UI component libraries.
- Chart.js / D3.js – Data visualization and dashboards.
- Axios – HTTP client for API communication.
- Formik/React Hook Form – Form management and validation.

**Mobile Development:**
- React Native or Flutter – Cross-platform mobile application development.
- Native Swift/Kotlin – Platform-specific optimization.

**Database:**
- PostgreSQL – Primary relational database for structured data.
- MongoDB – NoSQL database for flexible document storage.
- Redis – Caching and session management.
- InfluxDB or TimescaleDB – Time-series data for analytics.

**Authentication & Security:**
- JSON Web Tokens (JWT) – Secure authentication and session management.
- OAuth 2.0 – Third-party integrations.
- SSL/TLS Certificates – Encrypted communication.
- bcrypt – Password hashing and security.

**DevOps & Deployment:**
- Docker – Containerization.
- Kubernetes – Orchestration and scaling.
- CI/CD Pipelines – GitHub Actions, Jenkins, GitLab CI.
- Monitoring Tools – Prometheus, ELK Stack, Datadog.

**Integration & APIs:**
- RESTful APIs – System interfaces.
- GraphQL – Alternative query language for flexible data fetching.
- Webhooks – Real-time event notifications.
- Third-party APIs for barcode/QR code services.

---

## 3. External Interface Requirements

### 3.1 User Interfaces

The Food Management System UI provides the following key functionalities:

- **Login & Authentication**
  - Secure user authentication using email and password.
  - Multi-factor authentication (MFA) option for enhanced security.
  - Password reset and recovery functionality.

- **Dashboard & Home Screen**
  - Customizable dashboard displaying KPIs and real-time metrics.
  - Quick access to frequently used functions.
  - Alerts and notifications for critical items (low stock, expiring items, waste alerts).
  - Personal workspace reflecting user's role and location.

- **Inventory Management Interface**
  - Search and filter functionality for items in inventory.
  - Quick stock update interface with barcode/QR code scanning.
  - Item details display (name, SKU, quantity, expiration date, storage location, cost).
  - Bulk import functionality for spreadsheet uploads.
  - Real-time stock level visualization with color coding for stock status.

- **Item Management**
  - Add new items to inventory with detailed information.
  - Edit item details (cost, supplier, storage conditions).
  - Manage nutritional information and allergen data.
  - Upload item images and documentation.
  - Category and subcategory management.

- **Demand Forecasting & Analytics**
  - Forecasting dashboard showing predicted demand for next periods.
  - Consumption trend charts and historical analysis.
  - Comparison between actual vs. predicted demand.
  - Forecasting parameters customization.

- **Procurement Interface**
  - Purchase order creation with automatic population from forecasts.
  - Vendor selection and price comparison.
  - Order tracking and status updates.
  - Invoice management and payment tracking.

- **Multi-Location Management**
  - Location selector with inventory overview for each location.
  - Inter-location transfer requests and approvals.
  - Centralized reporting across all locations.
  - Location-specific analytics.

- **Waste Management Dashboard**
  - Waste recording interface for quick waste item logging.
  - Waste analytics showing trends and patterns.
  - Root cause analysis tools for waste incidents.
  - Recommendations for waste reduction.

- **Nutritional Planning**
  - Menu creation with nutritional balance checking.
  - Dietary restriction and allergen compliance verification.
  - Nutritional content visualization and reporting.

- **Reporting & Export**
  - Pre-built report templates (inventory, consumption, waste, compliance).
  - Custom report builder for specific analysis needs.
  - Export to PDF, Excel, CSV formats.
  - Scheduling automated report generation and delivery.

- **User Management (Admin)**
  - User account creation and role assignment.
  - Permission and access control management.
  - User activity logs and audit trails.
  - Bulk user import.

- **Responsive Design:**
  - Adapts to desktop (1920×1080 and higher), tablet, and mobile screens.
  - Touch-friendly controls for mobile and tablet interfaces.
  - Responsive navigation menus and collapsible panels.

### 3.2 Hardware Interfaces

**Client Side:**
- **Processor:** Minimum dual-core 2.0 GHz or higher.
- **Memory (RAM):** Minimum 4 GB (8 GB recommended).
- **Storage:** At least 100 MB free space for browser cache and temporary files.
- **Display:** Minimum resolution 1024×768; responsive design supports higher resolutions.
- **Input Devices:** Standard keyboard and mouse/touchscreen.
- **Barcode/QR Code Scanner:** Compatible USB or Bluetooth barcode scanner or smartphone camera.
- **Network Interface:** Stable internet connection (minimum 5 Mbps recommended).
- **Browser:** Latest versions of Chrome, Firefox, Edge, Safari with JavaScript enabled.

**Server Side:**
- **Processor:** Multi-core 2.4 GHz or higher (Intel Xeon or AMD EPYC recommended).
- **Memory (RAM):** Minimum 32 GB (64 GB recommended for large deployments).
- **Storage:** Minimum 1 TB SSD (expandable based on data volume and retention requirements).
- **Network Interface:** Minimum 1 Gbps Ethernet; 10 Gbps recommended for large-scale operations.
- **Operating System:** Linux (Ubuntu 22.04 LTS) or equivalent server-grade OS.
- **Backup System:** Redundant storage with automated backup and disaster recovery capabilities.

**Mobile Devices:**
- **iOS:** iPhone 11 or later; iOS 13 or higher; minimum 2 GB RAM.
- **Android:** Android 8 or higher; minimum 2 GB RAM.
- **Camera:** For QR code and barcode scanning capability.

### 3.3 Software Interfaces

- **Point of Sale (POS) System Integration:**
  - API connection to popular POS systems (Square, Toast, Clover) for real-time sales data consumption.
  - Automatic inventory adjustment based on sales transactions.
  - Sales data feeds for demand forecasting.

- **Vendor Management System Integration:**
  - API integration with vendor platforms for order placement and tracking.
  - Automated pricing updates and availability checks.
  - Invoice and payment reconciliation.

- **Email & Notification Services:**
  - SMTP for transactional emails (alerts, reports, notifications).
  - SMS gateway for critical alerts (optional).
  - Push notifications for mobile applications.

- **Barcode & QR Code Services:**
  - Integration with barcode generation libraries (ZXing, barcode4j).
  - QR code scanning and generation capabilities.

- **Cloud Storage Integration:**
  - AWS S3, Google Cloud Storage, or Azure Blob Storage for document and image storage.
  - Automatic backup and archival of historical data.

- **Map & Geolocation Services:**
  - Google Maps API for location tracking and logistics optimization (optional).
  - GPS data from mobile devices for field operations.

- **Analytics & Business Intelligence Tools:**
  - Integration with BI platforms (Tableau, Power BI) for advanced analytics and visualization.
  - Data export to analytics platforms for deeper insights.

- **Authentication Services:**
  - OAuth 2.0 integration with third-party identity providers (Google, Microsoft, etc.).
  - LDAP/Active Directory integration for enterprise environments.

### 3.4 Communications Interfaces

- **Client-Server Communication:**
  - RESTful APIs over HTTPS for all client-server communication.
  - WebSockets for real-time updates and live notifications.
  - Request/response format: JSON.

- **External API Communication:**
  - Secure HTTPS connections to all external services.
  - API keys and OAuth tokens for authentication.
  - Rate limiting and retry mechanisms for reliability.

- **Database Communication:**
  - Direct database connections from backend with connection pooling.
  - Encrypted connections for sensitive data.
  - Query optimization for performance.

- **Inter-Service Communication:**
  - Message queues (RabbitMQ, Redis) for asynchronous processing.
  - Service-to-service authentication using API keys or mTLS.
  - Service discovery for microservices architecture (optional).

---

## 4. System Features

### 4.1 Core Inventory Management

**Description:** Comprehensive inventory tracking system with real-time updates and barcode/QR code support.

- **Features:**
  - Add, edit, delete inventory items with detailed metadata.
  - Stock level tracking with real-time updates from multiple sources.
  - Barcode/QR code scanning for quick stock updates.
  - Batch upload via spreadsheet import.
  - Stock location tracking with bin/shelf management.
  - Item categorization and tagging.
  - Cost tracking and valuation methods (FIFO, LIFO, Average).
  
- **Priority:** High
- **Dependencies:** None

### 4.2 Expiration Date Management

**Description:** Automated tracking and management of item expiration dates with alerts and waste prevention.

- **Features:**
  - Automatic expiration date tracking for all perishable items.
  - Alerts when items approach expiration (configurable thresholds).
  - Color-coded expiration status (Green: Fresh, Yellow: Approaching, Red: Expired).
  - Automated movement to waste queue for expired items.
  - Manual override capability for experienced staff.
  - Historical tracking of expired items for waste analysis.
  - Shelf-life recommendations based on storage conditions.
  
- **Priority:** High
- **Dependencies:** 4.1 Core Inventory Management

### 4.3 Demand Forecasting

**Description:** Machine learning-powered demand prediction for optimized procurement.

- **Features:**
  - Historical consumption analysis with trend identification.
  - Seasonality detection and adjustment.
  - Forecasting models (ARIMA, Prophet, Neural Networks).
  - Configurable forecast horizons (weekly, monthly, quarterly).
  - Accuracy metrics and model performance visualization.
  - Manual adjustment of forecasts for special events.
  - Forecast confidence intervals and uncertainty quantification.
  - Integration with consumption data sources (POS, kitchen systems).
  
- **Priority:** High
- **Dependencies:** 4.1 Core Inventory Management

### 4.4 Procurement Management

**Description:** Automated purchase order generation and vendor management.

- **Features:**
  - Auto-generation of POs based on demand forecasts and current inventory.
  - Vendor selection and price comparison.
  - Manual PO creation and editing.
  - Order tracking and delivery confirmation.
  - Supplier performance metrics (on-time delivery, quality, pricing).
  - Contract management and pricing negotiation tools.
  - Invoice matching and payment processing.
  - Bulk order consolidation across locations.
  
- **Priority:** High
- **Dependencies:** 4.3 Demand Forecasting

### 4.5 Multi-Location Inventory Synchronization

**Description:** Centralized management of inventory across multiple physical locations.

- **Features:**
  - Unified dashboard showing inventory across all locations.
  - Real-time stock level synchronization.
  - Inter-location transfer requests and approvals.
  - Transfer tracking with estimated delivery times.
  - Location-specific reporting and analytics.
  - Permission management for inter-location access.
  - Automatic rebalancing recommendations.
  
- **Priority:** Medium
- **Dependencies:** 4.1 Core Inventory Management

### 4.6 Waste Management & Analytics

**Description:** Tracking and analysis of food waste with reduction recommendations.

- **Features:**
  - Waste recording interface for logging discarded items.
  - Waste categorization (expired, spoiled, unsold, preparation waste, etc.).
  - Root cause analysis for waste incidents.
  - Waste trend analysis with visualizations.
  - Cost impact calculation of wastage.
  - Waste reduction recommendations based on patterns.
  - Compliance reporting for sustainability initiatives.
  - Historical waste data for benchmarking.
  
- **Priority:** Medium
- **Dependencies:** 4.1 Core Inventory Management, 4.2 Expiration Date Management

### 4.7 Nutritional Information & Menu Planning

**Description:** Comprehensive nutritional tracking and dietary compliance management.

- **Features:**
  - Detailed nutritional database (calories, macros, micros, fiber, etc.).
  - Allergen tracking and management.
  - Menu creation with automatic nutritional calculation.
  - Dietary restriction compliance checking (vegan, gluten-free, keto, etc.).
  - Nutritional balance optimization suggestions.
  - Recipe management with ingredient tracking.
  - Nutritional reports for healthcare compliance.
  - Daily nutritional intake tracking.
  
- **Priority:** Medium
- **Dependencies:** 4.1 Core Inventory Management

### 4.8 Quality Control & Food Safety Compliance

**Description:** Temperature monitoring and food safety regulation compliance.

- **Features:**
  - Temperature tracking for cold chain items (refrigerated, frozen).
  - Automated alerts for temperature excursions.
  - HACCP compliance documentation and tracking.
  - Food safety inspection checklists.
  - Incident reporting and management.
  - Regulatory compliance reporting (health codes, certifications).
  - Corrective action tracking.
  - Audit trail for all critical operations.
  
- **Priority:** High
- **Dependencies:** None

### 4.9 User Management & Access Control

**Description:** Role-based access control and user management.

- **Features:**
  - User account creation and profile management.
  - Role-based access control (Admin, Manager, Staff, Viewer).
  - Permission granularity at module and location levels.
  - Activity logging and audit trails.
  - User session management and auto-logout.
  - Two-factor authentication (2FA) support.
  - Password policies and rotation.
  - Bulk user import and management.
  
- **Priority:** High
- **Dependencies:** None

### 4.10 Reporting & Analytics

**Description:** Comprehensive reporting and business intelligence capabilities.

- **Features:**
  - Pre-built reports (inventory status, consumption trends, waste analysis, procurement summary).
  - Custom report builder with drag-and-drop interface.
  - Advanced filtering and sorting options.
  - Data visualization (charts, graphs, heatmaps, dashboards).
  - Export to multiple formats (PDF, Excel, CSV, JSON).
  - Scheduled report generation and automated delivery.
  - KPI dashboards with real-time metrics.
  - Comparative analysis (period-over-period, location-to-location).
  - Drill-down capability for detailed analysis.
  
- **Priority:** Medium
- **Dependencies:** 4.1-4.8 Core Features

### 4.11 Mobile Application

**Description:** Native mobile app for on-the-go inventory management.

- **Features:**
  - Barcode/QR code scanning using device camera.
  - Quick stock updates from the field.
  - Offline mode with automatic sync when online.
  - Push notifications for critical alerts.
  - Location-based features (if applicable).
  - Simplified dashboard optimized for mobile.
  - Basic reporting and export on mobile.
  
- **Priority:** Medium
- **Dependencies:** 4.1 Core Inventory Management

### 4.12 System Notifications & Alerting

**Description:** Intelligent notification system for critical events and alerts.

- **Features:**
  - Configurable alert thresholds (low stock, expiring items, temperature, etc.).
  - Multiple notification channels (email, SMS, in-app, push notifications).
  - Alert priority levels (critical, warning, info).
  - Do-not-disturb scheduling.
  - Alert history and acknowledgment tracking.
  - Escalation rules for unaddressed critical alerts.
  - Custom alert templates.
  
- **Priority:** Medium
- **Dependencies:** 4.1-4.8 Core Features

---

## 5. Other Nonfunctional Requirements

### 5.1 Performance Requirements

- System responses must complete within 2-3 seconds for typical operations under normal load.
- Barcode/QR code scanning processing should complete within 1 second.
- Demand forecasting calculations should complete within 5-10 seconds for standard datasets.
- Dashboard loading should complete within 3 seconds.
- Support concurrent users: minimum 100 simultaneous users; scalable to 1000+.
- Database query response times should be under 500ms for typical queries.
- Mobile app should have sub-200ms response times for UI interactions.
- System should handle 10,000+ inventory items without significant performance degradation.
- Real-time updates should propagate within 2-5 seconds across all connected clients.

### 5.2 Reliability Requirements

- System uptime target: 99.5% (4 hours maximum downtime per month).
- Automatic failover for database and server failures.
- Data backup: Automated daily backups with 30-day retention.
- Disaster recovery plan with RPO (Recovery Point Objective) ≤ 4 hours and RTO (Recovery Time Objective) ≤ 2 hours.
- Error handling and graceful degradation for partial system failures.
- Monitoring and alerting for system health and anomalies.
- Regular load testing and capacity planning.

### 5.3 Safety Requirements

- Prevention of accidental data loss through confirmation dialogs for critical operations.
- Rollback capability for mistaken inventory adjustments within defined time limits.
- Data validation to prevent corrupted or incorrect data entry.
- Regular system integrity checks and data consistency verification.
- Comprehensive audit trails for all operational changes.
- Recovery procedures for common user errors.

### 5.4 Security Requirements

- **Authentication & Authorization:**
  - Multi-factor authentication (MFA) for user accounts.
  - Role-based access control (RBAC) with granular permissions.
  - Secure session management with automatic timeout (default 30 minutes).
  - Secure password hashing (bcrypt, Argon2).

- **Data Protection:**
  - All data in transit encrypted using TLS 1.2 or higher.
  - All sensitive data at rest encrypted using AES-256.
  - Database-level encryption for sensitive fields.
  - Regular encryption key rotation.

- **API Security:**
  - API authentication using OAuth 2.0 or API keys.
  - Rate limiting to prevent abuse (100 requests/minute default).
  - Request signing and verification for external integrations.
  - CORS policies for web security.

- **Input Validation & Injection Prevention:**
  - Server-side validation of all user inputs.
  - Protection against XSS (Cross-Site Scripting) attacks.
  - Protection against SQL Injection attacks.
  - Parameterized queries for all database operations.
  - Input sanitization and encoding.

- **Infrastructure Security:**
  - Secure network architecture (VPCs, firewalls, network segmentation).
  - Regular security patching and updates.
  - Intrusion detection and prevention systems.
  - DDoS mitigation measures.

- **Compliance & Auditing:**
  - GDPR compliance for data privacy.
  - Food safety regulation compliance (varies by jurisdiction).
  - SOC 2 Type II compliance (if applicable).
  - Regular security audits and penetration testing.
  - Audit logs for all administrative and sensitive operations.

### 5.5 Usability Requirements

- Intuitive interface requiring minimal training for basic operations.
- Consistency in UI/UX across web and mobile applications.
- Accessibility compliance (WCAG 2.1 Level AA).
- Context-sensitive help and tooltips throughout the application.
- Error messages clear and actionable with resolution suggestions.
- Keyboard navigation and shortcuts for power users.
- Progress indicators for long-running operations.
- Undo/redo functionality for reversible operations.

### 5.6 Maintainability Requirements

- Modular, well-documented codebase following SOLID principles.
- Automated unit and integration testing (minimum 80% code coverage).
- Comprehensive technical documentation and API documentation.
- Version control with branching and release management strategies.
- Automated deployment pipelines (CI/CD).
- Monitoring and logging for troubleshooting and debugging.
- Regular code reviews and quality assurance.

### 5.7 Scalability Requirements

- Horizontal scalability for web and API servers using load balancers.
- Database scalability through read replicas and sharding strategies.
- Caching layers (Redis) for high-frequency queries.
- Asynchronous processing (message queues) for heavy computations.
- Auto-scaling based on load metrics.
- Support for growth from 100 to 10,000+ inventory items.

### 5.8 Compatibility Requirements

- **Browser Compatibility:**
  - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.
  - Mobile browsers on iOS Safari and Chrome Android.

- **Mobile Platform Compatibility:**
  - iOS 13+, Android 8+.

- **Operating System Compatibility:**
  - Windows, macOS, Linux for web access.

### 5.9 Localization & Internationalization

- Multi-language support (English as primary, with expansion capability).
- Locale-specific number and date formatting.
- Currency conversion where applicable.
- RTL language support (future consideration).

---

## 6. Other Requirements

### 6.1 Compliance & Regulatory Requirements

- **Data Protection:** GDPR compliance for user data privacy and processing.
- **Food Safety:** Compliance with local food safety regulations and HACCP standards.
- **Financial:** Accurate financial reporting and audit trails for cost tracking and accounting integration.
- **Accessibility:** WCAG 2.1 Level AA compliance for accessibility.

### 6.2 Business Rules

- Inventory items cannot be deleted if they have transaction history (soft delete only).
- Expiration date cannot be set to a past date.
- Inventory transfers between locations must be approved by a manager.
- Forecasting models must use minimum 6 months of historical data for accuracy.
- All waste incidents must be documented with root cause analysis.
- Procurement orders must not exceed defined budget thresholds without approval.

### 6.3 Support & Maintenance

- 24/7 technical support availability for critical issues.
- Regular system maintenance windows (scheduled off-peak hours).
- Monthly security updates and patches.
- Quarterly feature releases and enhancements.
- Annual system infrastructure review and optimization.

### 6.4 Training & Documentation

- Initial user training program for staff.
- Comprehensive user manuals and quick-start guides.
- Video tutorials for common tasks.
- Administrator training for system configuration and maintenance.
- API documentation for custom integrations.

---

## 7. Stakeholders

### 7.1 List of Stakeholders

1. **Restaurant/Food Service Managers** – Primary end-users who use the system to manage daily inventory, track stock levels, and make operational decisions to minimize waste and optimize procurement.

2. **Kitchen & Inventory Staff** – Daily users who perform stock updates, scan items, and manage physical inventory. They depend on the system for real-time visibility and guidance.

3. **Procurement & Vendor Coordinators** – Users responsible for purchase orders, vendor management, and ensuring timely and cost-effective procurement based on system recommendations.

4. **Nutritionists & Dietary Specialists** – Users who utilize the system for menu planning, nutritional tracking, and dietary compliance for healthcare and wellness programs.

5. **Restaurant Owners/Finance Managers** – Strategic stakeholders interested in cost reduction, waste minimization, profitability analysis, and financial reporting.

6. **System Administrators** – Personnel responsible for system setup, user management, security, backups, and overall system health.

7. **IT/Technical Support Team** – Support staff handling troubleshooting, incident management, and technical issues.

8. **Regulatory & Compliance Officers** – Stakeholders ensuring the system meets food safety regulations and compliance requirements.

9. **Customers/Patients** – Indirect stakeholders in healthcare/institutional settings who benefit from optimized menus and safe food handling practices.

10. **Vendors/Suppliers** – External stakeholders who receive purchase orders and integrate with the system for order fulfillment.

---

## Appendix A: Glossary

- **FIFO (First In, First Out)** – Inventory management method where items are consumed in the order they were received.
- **SKU (Stock Keeping Unit)** – Unique identifier assigned to each product for tracking purposes.
- **QR Code (Quick Response Code)** – Two-dimensional barcode that can be scanned using smartphone cameras.
- **RFID (Radio Frequency Identification)** – Wireless technology for automatic item identification and tracking.
- **Demand Forecasting** – Predictive analysis of future consumption patterns based on historical data.
- **Expiration Date/Shelf Life** – The date after which a food item is no longer safe or suitable for consumption.
- **HACCP (Hazard Analysis and Critical Control Points)** – A systematic approach to food safety management.
- **POS (Point of Sale)** – System used to process customer transactions in retail or food service environments.
- **Perishable Items** – Food products with limited shelf life that must be stored under specific conditions.
- **Cold Chain** – Series of steps to maintain temperature control from production to consumption.
- **Waste Analytics** – Analysis of food waste patterns to identify reduction opportunities.
- **API (Application Programming Interface)** – Interface for software-to-software communication.
- **Barcode** – One-dimensional code representing product information scannable by automated readers.
- **Menu Planning** – Process of determining what dishes and items will be offered at a food service establishment.
- **Batch Processing** – Processing multiple similar items together in a single operation.
- **Inventory Turnover** – Rate at which inventory items are sold and replaced.
- **Procurement** – Process of acquiring goods and services from vendors and suppliers.
- **Dashboard** – Visual summary interface displaying key metrics and information.
- **Real-time Updates** – Immediate data updates visible to all users without delay.
- **Audit Trail** – Chronological record of all system activities and changes for compliance and security.

---

## Appendix B: Data Models

### B.1 Entity-Relationship Diagram

```
┌─────────────────┐         ┌──────────────────┐
│     Users       │────────│  Locations       │
├─────────────────┤         ├──────────────────┤
│ user_id (PK)    │         │ location_id (PK) │
│ email           │         │ name             │
│ password_hash   │         │ address          │
│ role            │         │ phone            │
│ location_id (FK)│         │ manager_id (FK)  │
│ created_at      │         │ created_at       │
└─────────────────┘         └──────────────────┘
        │
        │
        │  1:N
        │
┌─────────────────────────────────────┐
│      InventoryItems                 │
├─────────────────────────────────────┤
│ item_id (PK)                        │
│ name                                │
│ sku                                 │
│ category                            │
│ unit_of_measure                     │
│ current_quantity                    │
│ reorder_level                       │
│ cost_per_unit                       │
│ supplier_id (FK)                    │
│ location_id (FK)                    │
│ created_at                          │
└─────────────────────────────────────┘
        │
        │  1:N
        │
┌─────────────────────────────────────┐
│      StockTransactions              │
├─────────────────────────────────────┤
│ transaction_id (PK)                 │
│ item_id (FK)                        │
│ location_id (FK)                    │
│ transaction_type (receipt/usage)   │
│ quantity                            │
│ expiration_date                     │
│ transaction_date                    │
│ user_id (FK)                        │
│ notes                               │
└─────────────────────────────────────┘
        │
        │  1:N
        │
┌─────────────────────────────────────┐
│      WasteTracking                  │
├─────────────────────────────────────┤
│ waste_id (PK)                       │
│ item_id (FK)                        │
│ quantity_wasted                     │
│ reason (expired/spoiled/unsold)    │
│ waste_date                          │
│ cost_impact                         │
│ location_id (FK)                    │
│ user_id (FK)                        │
│ notes                               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      PurchaseOrders                 │
├─────────────────────────────────────┤
│ po_id (PK)                          │
│ item_id (FK)                        │
│ supplier_id (FK)                    │
│ quantity_ordered                    │
│ quantity_received                   │
│ unit_price                          │
│ order_date                          │
│ delivery_date                       │
│ status                              │
│ location_id (FK)                    │
│ user_id (FK)                        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      Suppliers                      │
├─────────────────────────────────────┤
│ supplier_id (PK)                    │
│ name                                │
│ contact_person                      │
│ phone                               │
│ email                               │
│ address                             │
│ payment_terms                       │
│ rating                              │
│ created_at                          │
└─────────────────────────────────────┘
```

### B.2 Key Tables Description

**Users Table:**
- Stores user account information and role assignments.
- Linked to Locations for location-specific access.

**Locations Table:**
- Represents physical storage or operational locations.
- Multiple users can be assigned to a location.

**InventoryItems Table:**
- Master list of all food items in inventory.
- Includes categorization, cost, and reorder information.

**StockTransactions Table:**
- Audit trail of all inventory movements (in/out).
- Links items with quantities, dates, and users.

**WasteTracking Table:**
- Records all waste incidents with reasons and impact.
- Supports waste analysis and trend identification.

**PurchaseOrders Table:**
- Manages procurement requests and delivery tracking.
- Links suppliers with ordered items and quantities.

**Suppliers Table:**
- Master list of vendors with contact and performance information.

---

## Appendix C: System Architecture

### C.1 Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         User Layer                               │
├──────────────────────────────────────────────────────────────────┤
│  Web Browser    │  Mobile App (iOS/Android)  │  Admin Portal    │
└────────┬─────────────────┬──────────────────────────────┬────────┘
         │                 │                              │
         │    HTTPS/WSS    │                              │
         │                 │                              │
┌────────▼─────────────────▼──────────────────────────────▼────────┐
│                      API Gateway / Load Balancer                 │
│              (CORS, Rate Limiting, Authentication)              │
└────────┬─────────────────┬──────────────────────────────┬────────┘
         │                 │                              │
┌────────▼─────────────────▼──────────────────────────────▼────────┐
│                    Node.js Express Backend                       │
├──────────────────────────────────────────────────────────────────┤
│  ├─ Inventory Management API                                     │
│  ├─ Procurement API                                              │
│  ├─ Analytics & Reporting API                                    │
│  ├─ User Management API                                          │
│  ├─ Notification Service                                         │
│  └─ Integration Layer (POS, Email, etc.)                         │
└────────┬──────────────────────────────────┬──────────────────────┘
         │                                  │
    ┌────▼────────────────────────────┐   │
    │   Python ML Engine              │   │
    ├────────────────────────────────┤   │
    │ ├─ Demand Forecasting         │   │
    │ ├─ Anomaly Detection          │   │
    │ └─ Analytics Processing       │   │
    └────┬───────────────────────────┘   │
         │                                │
    ┌────▼────────────────┐   ┌──────────▼──────────────┐
    │   Cache Layer       │   │   Message Queue         │
    │   (Redis)           │   │   (RabbitMQ/Redis)      │
    └────┬────────────────┘   └──────────┬───────────────┘
         │                               │
    ┌────▼──────────────────────────────▼──────────────┐
    │              Database Layer                      │
    ├──────────────────────────────────────────────────┤
    │  ├─ PostgreSQL (Main DB)                         │
    │  ├─ MongoDB (Document Store)                     │
    │  ├─ Redis (Session & Cache)                      │
    │  └─ InfluxDB (Time-Series Analytics)             │
    └───────────────────────────────────────────────────┘
         │
    ┌────▼──────────────────────────────────────────────┐
    │         Backup & Archive Storage                 │
    │   (Cloud Storage - S3, GCS, Azure Blob)          │
    └───────────────────────────────────────────────────┘
```

### C.2 Component Interaction

1. **Client Layer** – Web browser, mobile app, and admin interface send requests to the API Gateway.
2. **API Gateway** – Routes requests, enforces rate limiting, handles authentication, and applies CORS policies.
3. **Backend Services** – Express.js services handle business logic, database operations, and external integrations.
4. **ML Engine** – Python-based microservice performs demand forecasting and advanced analytics asynchronously.
5. **Cache Layer** – Redis caches frequently accessed data and manages user sessions.
6. **Message Queue** – Asynchronous task processing for heavy computations and notifications.
7. **Database Layer** – Multiple databases for different data types and query patterns.
8. **Storage** – Cloud storage for backups, archives, and document uploads.

---

## Appendix D: Use Case Diagrams

### D.1 Inventory Manager Use Cases

```
                    ┌────────────────┐
                    │ Inventory      │
                    │ Manager        │
                    └────────┬───────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼──────┐    ┌────────▼────────┐   ┌──────▼──────┐
   │  Update   │    │  Generate       │   │  Track      │
   │  Stock    │    │  Purchase       │   │  Waste      │
   │  Levels   │    │  Orders         │   │             │
   └───────────┘    └─────────────────┘   └─────────────┘
        │                    │                    │
   ┌────▼──────┐    ┌────────▼────────┐   ┌──────▼──────┐
   │  View     │    │  Monitor        │   │  Analyze    │
   │  Expiry   │    │  Forecasts      │   │  Trends     │
   │  Items    │    │                 │   │             │
   └───────────┘    └─────────────────┘   └─────────────┘
```

### D.2 Admin Use Cases

```
                    ┌────────────────┐
                    │  System        │
                    │  Admin         │
                    └────────┬───────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼──────┐    ┌────────▼────────┐   ┌──────▼──────┐
   │  Manage   │    │  Monitor        │   │  Generate   │
   │  Users    │    │  System         │   │  Reports    │
   │  & Roles  │    │  Performance    │   │             │
   └───────────┘    └─────────────────┘   └─────────────┘
        │                    │                    │
   ┌────▼──────┐    ┌────────▼────────┐   ┌──────▼──────┐
   │  Configure│    │  Manage         │   │  Audit      │
   │  System   │    │  Integrations   │   │  Logs       │
   │  Settings │    │                 │   │             │
   └───────────┘    └─────────────────┘   └─────────────┘
```

### D.3 Nutritionist Use Cases

```
                    ┌────────────────┐
                    │  Nutritionist  │
                    └────────┬───────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼──────┐    ┌────────▼────────┐   ┌──────▼──────┐
   │  Create   │    │  Check          │   │  Track      │
   │  Menus    │    │  Nutritional    │   │  Dietary    │
   │           │    │  Balance        │   │  Compliance │
   └───────────┘    └─────────────────┘   └─────────────┘
        │                                        │
   ┌────▼──────┐                           ┌─────▼─────┐
   │  Plan     │                           │  Generate │
   │  Meals    │                           │  Reports  │
   │           │                           │           │
   └───────────┘                           └───────────┘
```

---

## Appendix E: Workflow Diagrams

### E.1 Inventory Stock Update Workflow

```
    START
      │
      ▼
  ┌──────────────┐
  │ Staff scans  │
  │ item via     │
  │ barcode/QR   │
  └──────┬───────┘
         │
         ▼
  ┌──────────────────┐
  │ System retrieves │
  │ item details     │
  └──────┬───────────┘
         │
         ▼
  ┌──────────────────┐
  │ Staff enters     │
  │ quantity & date  │
  └──────┬───────────┘
         │
         ▼
  ┌──────────────────┐
  │ System validates │
  │ input            │
  └──────┬───────────┘
         │
    ┌────┴────┐
    │          │
    ▼          ▼
  Valid?    Invalid
    │          │
    │          ▼
    │       ┌─────────────────┐
    │       │ Show error msg  │
    │       └────────┬────────┘
    │                │
    │                ▼
    │          ┌──────────────┐
    │          │ User corrects│
    │          └────────┬─────┘
    │                   │
    │                   ▼
    │          [Loop back to validation]
    │
    ▼
  ┌──────────────────────┐
  │ Update inventory DB  │
  │ & stock levels       │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Send notifications   │
  │ if thresholds        │
  │ crossed              │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Log transaction      │
  │ audit trail          │
  └──────┬───────────────┘
         │
         ▼
   END - Display
  confirmation
```

### E.2 Demand Forecasting & Procurement Workflow

```
    START
      │
      ▼
  ┌──────────────────────┐
  │ Extract historical   │
  │ consumption data     │
  │ for past 6+ months   │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Run forecasting      │
  │ models (ARIMA,       │
  │ Prophet, etc.)       │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Check current        │
  │ inventory levels     │
  │ & reorder points     │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────────┐
  │ Calculate suggested      │
  │ order quantities         │
  │ & adjust for lead time   │
  └──────┬───────────────────┘
         │
         ▼
  ┌──────────────────────────┐
  │ Query supplier prices    │
  │ & availability           │
  └──────┬───────────────────┘
         │
         ▼
  ┌──────────────────────────┐
  │ Generate PO with         │
  │ recommendations          │
  └──────┬───────────────────┘
         │
         ▼
  ┌──────────────────────────┐
  │ Manager reviews PO       │
  └──────┬───────────────────┘
         │
    ┌────┴──────┐
    │            │
  Approve?    Reject
    │            │
    ▼            ▼
  Send         Return for
  to Vendor    Modification
    │            │
    │            └────────┬────────┐
    │                     │        │
    │                     ▼        │
    │            [Loop back to query suppliers]
    │
    ▼
  END - Order
  confirmed
```

### E.3 Food Waste Management Workflow

```
    START
      │
      ▼
  ┌──────────────────────┐
  │ Staff identifies     │
  │ waste/expired item   │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Log waste incident   │
  │ in system            │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Select item & reason │
  │ (expired/spoiled/    │
  │ unsold/prep waste)   │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Record quantity      │
  │ & cost impact        │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ System flags for     │
  │ root cause analysis  │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Store waste data &   │
  │ update inventory     │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Analytics engine     │
  │ processes waste      │
  │ patterns             │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Generate alerts &    │
  │ recommendations      │
  │ if threshold crossed │
  └──────┬───────────────┘
         │
         ▼
   END - Waste
  tracked & analyzed
```

---

## Appendix F: Key Metrics & KPIs

- **Inventory Turnover Ratio** – How frequently inventory is sold and replaced.
- **Waste Percentage** – Percentage of purchased food that is wasted.
- **Stockout Frequency** – Number of times items are unavailable when needed.
- **Order Accuracy** – Percentage of orders received as ordered.
- **Forecast Accuracy** – MAPE (Mean Absolute Percentage Error) of demand predictions.
- **System Uptime** – Percentage of time system is available and operational.
- **Average Response Time** – Average time for system to respond to user requests.
- **User Adoption Rate** – Percentage of intended users actively using the system.
- **Cost Savings** – Reduction in food waste and procurement costs achieved through system use.
- **Nutritional Compliance Rate** – Percentage of menus meeting nutritional standards.

---

## End of Document

**Document Version:** 1.0  
**Last Updated:** November 9, 2025  
**Status:** Complete

