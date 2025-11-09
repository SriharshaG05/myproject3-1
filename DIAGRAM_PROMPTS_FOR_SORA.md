# Detailed Diagram Descriptions for Image Generation
## Food Management System - Visual Documentation Prompts

---

## 1. CLASS DIAGRAM PROMPT

**Title:** Food Management System - Complete Class Diagram

**Description for Image Generation:**

Create a professional UML class diagram for a Food Management System with the following specifications:

**Layout:** Vertical arrangement with four main classes in separate boxes connected by relationship lines.

**Class 1: User**
- Box color: Light blue (#E3F2FD)
- Header: "User" in bold, dark blue text
- Attributes section (preceded by minus sign):
  - _id: ObjectId (primary key, underlined)
  - name: String
  - email: String (unique)
  - password: String (hashed)
  - role: Enum ['donor', 'receiver']
  - location: String
  - verified: Boolean
  - points: Number
  - lastLoginIP: String
  - lastLoginDate: Date
  - loginHistory: Array<LoginRecord>
  - createdAt: Date
- Methods section (preceded by plus sign):
  + register(): void
  + login(): Session
  + updateProfile(): void
  + viewActivities(): Activity[]

**Class 2: Food**
- Box color: Light green (#E8F5E9)
- Header: "Food" in bold, dark green text
- Attributes:
  - _id: ObjectId (primary key, underlined)
  - food_name: String
  - quantity: String
  - prepared_time: Date
  - available_until: Date
  - location: String
  - status: Enum ['available', 'requested', 'reserved', 'delivered']
  - donor_id: ObjectId (foreign key, italic)
  - createdAt: Date
- Methods:
  + postFood(): void
  + updateFood(): void
  + deleteFood(): void
  + getAvailableFood(): Food[]

**Class 3: Request**
- Box color: Light orange (#FFF3E0)
- Header: "Request" in bold, dark orange text
- Attributes:
  - _id: ObjectId (primary key, underlined)
  - food_id: ObjectId (foreign key, italic)
  - donor_id: ObjectId (foreign key, italic)
  - receiver_id: ObjectId (foreign key, italic)
  - status: Enum ['pending', 'approved', 'rejected', 'completed']
  - requested_at: Date
  - approved_at: Date
  - completed_at: Date
  - notes: String
- Methods:
  + submitRequest(): void
  + approveRequest(): void
  + rejectRequest(): void
  + completeRequest(): void

**Class 4: Activity**
- Box color: Light purple (#F3E5F5)
- Header: "Activity" in bold, dark purple text
- Attributes:
  - _id: ObjectId (primary key, underlined)
  - userId: ObjectId (foreign key, italic)
  - userName: String
  - userRole: Enum ['donor', 'receiver']
  - activityType: Enum ['food_posted', 'request_made', 'login', etc.]
  - description: String
  - metadata: Object
  - ipAddress: String
  - userAgent: String
  - status: String
  - timestamp: Date
- Methods:
  + logActivity(): void
  + getActivities(): Activity[]
  + filterByType(): Activity[]

**Relationships (draw connecting lines with labels):**
1. User (1) → (0..*) Food: "donor_id" relationship line with "posts" label
2. User (1) → (0..*) Request: "receiver_id" relationship line with "makes" label
3. Food (1) → (0..*) Request: "food_id" relationship line with "has" label
4. User (1) → (0..*) Activity: "userId" relationship line with "logs" label

**Visual Style:**
- Clean, professional UML notation
- Use solid lines for associations
- Add multiplicity indicators (1, 0..*, etc.)
- Include foreign key indicators with dashed lines
- Use standard UML class diagram boxes with three sections (name, attributes, methods)
- Light pastel colors for each class box
- Black text for readability
- Relationship lines in dark gray with clear arrow directions

---

## 2. DATABASE SCHEMA / ER DIAGRAM PROMPT

**Title:** Food Management System - Entity Relationship Diagram (ERD)

**Description for Image Generation:**

Create a detailed Entity-Relationship Diagram (ERD) for a Food Management System database with the following specifications:

**Layout:** Central hub-and-spoke design with User entity in the center

**Entity 1: Users (Central Entity)**
- Shape: Rectangle with rounded corners
- Color: Blue gradient (#4A90E2 to #7BA9D1)
- Icon: User silhouette icon in top-left
- Title: "USERS" in bold white text
- Fields (each on separate line with data type):
  ├─ 🔑 _id: ObjectId [PK]
  ├─ name: VARCHAR(100)
  ├─ email: VARCHAR(255) [UNIQUE]
  ├─ password: VARCHAR(255) [HASHED]
  ├─ role: ENUM('donor', 'receiver')
  ├─ location: VARCHAR(255)
  ├─ verified: BOOLEAN [DEFAULT: false]
  ├─ points: INTEGER [DEFAULT: 0]
  ├─ lastLoginIP: VARCHAR(45)
  ├─ lastLoginDate: DATETIME
  ├─ loginHistory: JSON/ARRAY
  └─ createdAt: TIMESTAMP

**Entity 2: Foods**
- Shape: Rectangle with rounded corners
- Color: Green gradient (#52C41A to #73D13D)
- Icon: Food/apple icon in top-left
- Title: "FOODS" in bold white text
- Fields:
  ├─ 🔑 _id: ObjectId [PK]
  ├─ food_name: VARCHAR(200)
  ├─ quantity: VARCHAR(50)
  ├─ prepared_time: DATETIME
  ├─ available_until: DATETIME
  ├─ location: VARCHAR(255)
  ├─ status: ENUM('available', 'requested', 'reserved', 'delivered')
  ├─ 🔗 donor_id: ObjectId [FK → Users._id]
  └─ createdAt: TIMESTAMP

**Entity 3: Requests**
- Shape: Rectangle with rounded corners
- Color: Orange gradient (#FA8C16 to #FFA940)
- Icon: Hand/request icon in top-left
- Title: "REQUESTS" in bold white text
- Fields:
  ├─ 🔑 _id: ObjectId [PK]
  ├─ 🔗 food_id: ObjectId [FK → Foods._id]
  ├─ 🔗 donor_id: ObjectId [FK → Users._id]
  ├─ 🔗 receiver_id: ObjectId [FK → Users._id]
  ├─ status: ENUM('pending', 'approved', 'rejected', 'completed')
  ├─ requested_at: TIMESTAMP
  ├─ approved_at: TIMESTAMP
  ├─ completed_at: TIMESTAMP
  └─ notes: TEXT

**Entity 4: Contacts**
- Shape: Rectangle with rounded corners
- Color: Cyan gradient (#13C2C2 to #36CFC9)
- Icon: Envelope/message icon in top-left
- Title: "CONTACTS" in bold white text
- Fields:
  ├─ 🔑 _id: ObjectId [PK]
  ├─ name: VARCHAR(100)
  ├─ email: VARCHAR(255)
  ├─ subject: VARCHAR(255)
  ├─ message: TEXT
  ├─ status: ENUM('new', 'read', 'responded')
  └─ createdAt: TIMESTAMP

**Entity 5: Activities**
- Shape: Rectangle with rounded corners
- Color: Purple gradient (#722ED1 to #9254DE)
- Icon: Activity/chart icon in top-left
- Title: "ACTIVITIES" in bold white text
- Fields:
  ├─ 🔑 _id: ObjectId [PK]
  ├─ 🔗 userId: ObjectId [FK → Users._id]
  ├─ userName: VARCHAR(100)
  ├─ userRole: ENUM('donor', 'receiver')
  ├─ activityType: VARCHAR(50)
  ├─ description: TEXT
  ├─ metadata: JSON
  ├─ ipAddress: VARCHAR(45)
  ├─ userAgent: TEXT
  └─ timestamp: TIMESTAMP

**Relationships (draw with labeled connector lines):**

1. Users → Foods (One-to-Many)
   - Line type: Solid line with crow's foot notation
   - Label: "posts" or "donates"
   - Cardinality: 1 : N
   - Connection: Users._id → Foods.donor_id

2. Users → Requests (One-to-Many, as Receiver)
   - Line type: Solid line with crow's foot notation
   - Label: "submits"
   - Cardinality: 1 : N
   - Connection: Users._id → Requests.receiver_id

3. Foods → Requests (One-to-Many)
   - Line type: Solid line with crow's foot notation
   - Label: "generates"
   - Cardinality: 1 : N
   - Connection: Foods._id → Requests.food_id

4. Users → Activities (One-to-Many)
   - Line type: Solid line with crow's foot notation
   - Label: "creates"
   - Cardinality: 1 : N
   - Connection: Users._id → Activities.userId

**Visual Elements:**
- Use crow's foot notation for many sides of relationships
- Include cardinality labels (1, N, 0..N)
- Primary keys marked with 🔑 icon
- Foreign keys marked with 🔗 icon and dashed line connections
- Each field data type in gray text
- Constraints in square brackets [PK], [FK], [UNIQUE], etc.
- Use soft drop shadows on entity boxes for depth
- Include subtle connection lines with relationship names in italic text
- Background: White or very light gray (#F5F5F5)

---

## 3. USE CASE DIAGRAM PROMPT (Donor Perspective)

**Title:** Food Management System - Donor Use Case Diagram

**Description for Image Generation:**

Create a professional UML Use Case Diagram for the Donor role in a Food Management System:

**Layout:** Actor on left, system boundary box in center, use cases as ovals inside

**Actor:**
- Position: Far left of diagram
- Icon: Stick figure labeled "Donor" below
- Color: Blue (#1890FF)
- Style: Standard UML actor symbol

**System Boundary:**
- Shape: Large rectangle with rounded corners
- Title: "Food Management System" at top
- Border: Solid line, medium thickness
- Color: Light gray border (#D9D9D9), white fill
- Position: Center, containing all use cases

**Use Cases (inside system boundary, arranged as ovals):**

Row 1 (Top):
1. "Register Account"
   - Oval shape, light blue fill (#E6F7FF)
   - Connected to Actor with solid line

2. "Login to System"
   - Oval shape, light blue fill
   - Connected to Actor with solid line

Row 2 (Second tier):
3. "Post Food Donation"
   - Oval shape, green fill (#F6FFED)
   - Connected to Actor with solid line
   - Has <<include>> relationship (dashed arrow) to "Upload Food Photo" (small oval)

4. "View My Donations"
   - Oval shape, green fill
   - Connected to Actor with solid line

Row 3 (Third tier):
5. "Edit Food Details"
   - Oval shape, yellow fill (#FFFBE6)
   - Connected to Actor with solid line
   - Has <<extend>> relationship (dashed arrow) from "View My Donations"

6. "Delete Food Donation"
   - Oval shape, red fill (#FFF1F0)
   - Connected to Actor with solid line
   - Has <<extend>> relationship from "View My Donations"

Row 4 (Bottom):
7. "Track Food Requests"
   - Oval shape, purple fill (#F9F0FF)
   - Connected to Actor with solid line

8. "View Donation History"
   - Oval shape, orange fill (#FFF7E6)
   - Connected to Actor with solid line

9. "Contact Admin"
   - Oval shape, cyan fill (#E6FFFB)
   - Connected to Actor with solid line

**Secondary Actor (Admin):**
- Position: Far right of diagram
- Icon: Stick figure labeled "Admin" below
- Color: Red (#FF4D4F)
- Connected use cases:
  - "Verify Donor Account" (connected to "Register Account" with dashed line)
  - "Approve Requests" (connected to "Track Food Requests")

**Relationship Types:**
- Actor to Use Case: Solid lines
- <<include>> relationships: Dashed arrows with "<<include>>" label
- <<extend>> relationships: Dashed arrows with "<<extend>>" label
- Generalization: Not applicable here

**Visual Style:**
- Clean UML notation
- Consistent oval sizes for use cases
- Clear, readable labels in black text
- Color coding by functionality (green=donation, blue=account, yellow=edit, red=delete, purple=tracking)
- Relationship lines should not overlap
- Professional spacing between elements

---

## 4. USE CASE DIAGRAM PROMPT (Receiver Perspective)

**Title:** Food Management System - Receiver Use Case Diagram

**Description for Image Generation:**

Create a professional UML Use Case Diagram for the Receiver role in a Food Management System:

**Layout:** Actor on left, system boundary box in center, use cases as ovals inside

**Actor:**
- Position: Far left of diagram
- Icon: Stick figure labeled "Receiver" below
- Color: Green (#52C41A)
- Style: Standard UML actor symbol

**System Boundary:**
- Shape: Large rectangle with rounded corners
- Title: "Food Management System" at top
- Border: Solid line, medium thickness
- Color: Light gray border (#D9D9D9), white fill
- Position: Center, containing all use cases

**Use Cases (inside system boundary, arranged as ovals):**

Row 1 (Top):
1. "Register Account"
   - Oval shape, light blue fill (#E6F7FF)
   - Connected to Actor with solid line

2. "Login to System"
   - Oval shape, light blue fill
   - Connected to Actor with solid line

Row 2 (Second tier):
3. "Browse Available Food"
   - Oval shape, green fill (#F6FFED)
   - Connected to Actor with solid line
   - Has <<include>> relationship to "Search Food" (small oval)
   - Has <<include>> relationship to "Filter by Category" (small oval)

4. "View Food Details"
   - Oval shape, green fill
   - Has <<extend>> relationship from "Browse Available Food"

Row 3 (Third tier):
5. "Submit Food Request"
   - Oval shape, orange fill (#FFF7E6)
   - Connected to Actor with solid line
   - Has <<include>> relationship to "Provide Contact Info"

6. "Track My Requests"
   - Oval shape, purple fill (#F9F0FF)
   - Connected to Actor with solid line

Row 4 (Fourth tier):
7. "Cancel Pending Request"
   - Oval shape, yellow fill (#FFFBE6)
   - Has <<extend>> relationship from "Track My Requests"

8. "Mark Request as Completed"
   - Oval shape, cyan fill (#E6FFFB)
   - Has <<extend>> relationship from "Track My Requests"

## Database Design & MongoDB Prompts

```text
Prompt 1 — Full MongoDB database design for the project

"Project context: You are designing the MongoDB database for a Node.js/Express web app that manages users, contacts, food donations, requests, and activity logs. The repository contains models named `user`, `contact`, `food`, `request`, and `activity`. The app supports roles (admin, donor, receiver), user authentication, listing donations, submitting requests, admin review/approval, and contact messages.

Task: Produce a complete MongoDB design and deliverables with no extra commentary, only the artifacts asked for. Output must include:

1) A concise collection list (name + one-line purpose).
2) For each collection: a JSON Schema validator suitable for `db.createCollection({validator: ...})`, and a Mongoose schema (Node.js, `mongoose.Schema`) with types, required fields, refs and index declarations. Keep each schema copy-paste ready.
3) 1–2 realistic sample documents per collection (small objects) using ISODate/ObjectId where relevant.
4) Recommended indexes (exact `db.collection.createIndex(...)` commands), unique constraints, TTL indexes, and a recommended shard-key if scaling is needed. Give the exact index calls only.
5) Relationship strategy: for each relation explain in one short sentence whether to use embedding or referencing and why.
6) 5 ready-to-run example queries/aggregations for common app flows (paginated listing of available donations with donor info; pending requests with requester; donor dashboard stats; text+geo search; recent user activity). Provide the `db.collection.aggregate([...])` or `db.collection.find(...)` commands only.
7) A minimal seed script outline (pseudocode or short Node/Mongoose script) to create an admin user and sample rows.
8) A short migrations checklist (3–5 steps) listing exactly what to do when adding a new required field to an existing collection.

Constraints: Use ObjectId refs for non-trivial relations unless embedding is explicitly better. Use `2dsphere` for geolocation fields. Keep everything copy-paste ready with no surrounding explanation blocks — only the requested artifacts (collection list, validators, mongoose schemas, sample docs, index commands, queries, seed script, migration steps)."
```

```text
Prompt 2 — Generate MongoDB JSON Schema validators for each collection

"Given the project's collections `users`, `contacts`, `food`, `requests`, `activities`, produce a MongoDB `db.createCollection` command for each collection with a full `$jsonSchema` validator. For each field include type, `required` array where appropriate, string patterns for emails, enums for status/role, nested address + geo `Point` shape, and date fields. Provide only the six `db.createCollection(...)` commands (one per collection) and nothing else. Use realistic field names aligned to `user`, `contact`, `food`, `request`, `activity` models." 
```

```text
Prompt 3 — Generate Mongoose models (files)

"Task: Produce five Mongoose model files `User`, `Contact`, `Food`, `Request`, `Activity` as Node.js modules using `mongoose`. Each file must export `module.exports = mongoose.model('<Name>', <Schema>);`. Include `timestamps` where appropriate, indexes (using `Schema.index(...)` calls), `2dsphere` for geo fields, and `enum` validations for statuses/roles. Output only the five file contents labeled with filenames as comments (e.g., `// models/user.js`) and no extra commentary." 
```

```text
Prompt 4 — Seed script generator

"Write a minimal `scripts/seed.js` Node.js script that connects with Mongoose, creates or upserts an admin user (email, hashed password placeholder), a sample donor user, 2 sample food documents, 1 sample request, 2 contacts, and a few activity logs. Use `await`/`async` style and close the connection at the end. Provide only the script content (no explanation) and include quick comments for any placeholder values." 
```

```text
Prompt 5 — Index, shard key and scaling recommendations (concise outputs)

"Produce a set of exact Mongo shell commands for recommended indexes for `users`, `food`, `requests`, `activities`, and `contacts`. For each collection output a single `db.collection.createIndex(...)` command for the primary recommended index and, where applicable, an additional command for a text or TTL index. Then recommend one shard-key candidate per large collection and give a one-line rationale for each candidate. Output only the commands followed by the three one-line shard-key recommendations (each on its own line), no additional commentary." 
```

```text
Prompt 6 — ERD / Diagram generation prompt (Mermaid)

"Produce a Mermaid ER diagram definition that represents `users`, `food`, `requests`, `contacts`, and `activities` with PK/FK notation and relationship cardinalities. Output only the `graph TD` or `erDiagram` block (Mermaid syntax) ready to paste into a Mermaid renderer. Use `users` as central node and show donations, requests and activities relations." 
```


Row 5 (Bottom):
9. "View Request History"
   - Oval shape, light purple fill
   - Connected to Actor with solid line

10. "Contact Admin"
    - Oval shape, red fill (#FFF1F0)
    - Connected to Actor with solid line

**Secondary Actor (Admin):**
- Position: Far right of diagram
- Icon: Stick figure labeled "Admin" below
- Color: Red (#FF4D4F)
- Connected use cases:
  - "Verify Receiver Account" (connected to "Register Account")
  - "Approve Food Request" (connected to "Submit Food Request")
  - "Reject Food Request" (connected to "Submit Food Request")

**Relationship Types:**
- Actor to Use Case: Solid lines
- <<include>> relationships: Dashed arrows with "<<include>>" label
- <<extend>> relationships: Dashed arrows with "<<extend>>" label

**Visual Style:**
- Clean UML notation
- Consistent oval sizes for use cases
- Clear, readable labels in black text
- Color coding by functionality (green=browsing, blue=account, orange=requesting, purple=tracking)
- Relationship lines should not overlap
- Professional spacing between elements

---

## 5. USE CASE DIAGRAM PROMPT (Admin Perspective)

**Title:** Food Management System - Admin Use Case Diagram

**Description for Image Generation:**

Create a professional UML Use Case Diagram for the Admin role in a Food Management System:

**Layout:** Actor on left, system boundary box in center, use cases as ovals inside

**Actor:**
- Position: Far left of diagram
- Icon: Stick figure with crown/star symbol labeled "Admin" below
- Color: Red (#FF4D4F)
- Style: Standard UML actor symbol with special indicator

**System Boundary:**
- Shape: Large rectangle with rounded corners
- Title: "Food Management System - Admin Panel" at top
- Border: Solid line, thick, red accent (#FF4D4F)
- Color: Light red border, white fill
- Position: Center, containing all use cases

**Use Cases (inside system boundary, arranged in categories):**

**User Management Section (Top Left):**
1. "Verify Pending Users"
   - Oval shape, blue fill (#E6F7FF)
   - Connected to Actor

2. "Approve User Registration"
   - Has <<extend>> relationship from "Verify Pending Users"

3. "Reject User Registration"
   - Has <<extend>> relationship from "Verify Pending Users"

4. "View All Users"
   - Oval shape, blue fill
   - Connected to Actor
   - Has <<include>> relationship to "View User IP Addresses"
   - Has <<include>> relationship to "View Login History"

5. "Deactivate User Account"
   - Has <<extend>> relationship from "View All Users"

**Food Management Section (Top Right):**
6. "Monitor All Donations"
   - Oval shape, green fill (#F6FFED)
   - Connected to Actor

7. "View Donation Details"
   - Has <<extend>> relationship from "Monitor All Donations"

8. "Remove Inappropriate Food"
   - Oval shape, red fill (#FFF1F0)
   - Has <<extend>> relationship from "Monitor All Donations"

**Request Management Section (Middle):**
9. "View All Requests"
   - Oval shape, orange fill (#FFF7E6)
   - Connected to Actor

10. "Approve Food Request"
    - Oval shape, green fill
    - Has <<extend>> relationship from "View All Requests"

11. "Reject Food Request"
    - Oval shape, red fill
    - Has <<extend>> relationship from "View All Requests"

**Activity & Monitoring Section (Bottom Left):**
12. "View Activity Logs"
    - Oval shape, purple fill (#F9F0FF)
    - Connected to Actor
    - Has <<include>> relationship to "Filter by User/Type/Date"

13. "Export Activity Report"
    - Has <<extend>> relationship from "View Activity Logs"

**Communication Section (Bottom Right):**
14. "View Contact Messages"
    - Oval shape, cyan fill (#E6FFFB)
    - Connected to Actor

15. "Respond to Inquiries"
    - Has <<extend>> relationship from "View Contact Messages"

**Statistics Section (Center Bottom):**
16. "View System Statistics"
    - Oval shape, yellow fill (#FFFBE6)
    - Connected to Actor
    - Has <<include>> relationship to "Generate Reports"

**Relationship Types:**
- Actor to Use Case: Solid thick lines
- <<include>> relationships: Dashed arrows with "<<include>>" label in italic
- <<extend>> relationships: Dashed arrows with "<<extend>>" label in italic

**Visual Style:**
- Professional UML notation
- Grouped use cases by functional area
- Subtle background shading for each group section
- Clear, bold labels in dark text
- Color coding by category (blue=users, green=food, orange=requests, purple=monitoring, cyan=communication)
- Non-overlapping relationship lines
- Professional spacing and alignment

---

## 6. SYSTEM ARCHITECTURE DIAGRAM PROMPT

**Title:** Food Management System - Three-Tier Architecture Diagram

**Description for Image Generation:**

Create a detailed system architecture diagram showing a three-tier web application architecture for a Food Management System:

**Overall Layout:** Three horizontal tiers/layers stacked vertically with connecting arrows between them

**TIER 1: PRESENTATION LAYER (Top)**
- Background color: Light blue (#E3F2FD)
- Title bar: "Presentation Layer (Client-Side)" in bold
- Contains 3 boxes arranged horizontally:

Box 1: "Web Browsers"
- Icon: Browser window icons (Chrome, Firefox, Edge, Safari)
- Contents:
  • Desktop Browsers
  • Mobile Browsers
  • Tablet Browsers
- Color: White with blue border

Box 2: "Frontend Technologies"
- Icon: Code brackets <>
- Contents:
  • HTML5
  • CSS3
  • JavaScript (ES6+)
  • Responsive Design
- Color: White with blue border

Box 3: "User Interfaces"
- Icon: Window/screen icon
- Contents:
  • Donor Dashboard
  • Receiver Dashboard
  • Admin Panel
  • Public Pages
- Color: White with blue border

**TIER 2: APPLICATION LAYER (Middle)**
- Background color: Light green (#E8F5E9)
- Title bar: "Application Layer (Server-Side)" in bold
- Contains 4 boxes arranged in 2 rows:

Top Row:
Box 1: "Node.js Server"
- Icon: Node.js logo
- Contents:
  • Express.js Framework
  • Port: 3000
  • Max Concurrent Users: 250
  • Request Handling
- Color: White with green border

Box 2: "Middleware"
- Icon: Gear/settings icon
- Contents:
  • express-session
  • bcryptjs (Password Hashing)
  • body-parser
  • CORS
- Color: White with green border

Bottom Row:
Box 3: "API Routes"
- Icon: Route/path icon
- Contents:
  • /auth - Authentication
  • /donor - Donor Operations
  • /receiver - Receiver Operations
  • /admin - Admin Functions
  • /contact - Contact Forms
- Color: White with green border

Box 4: "Business Logic"
- Icon: Puzzle piece icon
- Contents:
  • User Management
  • Food Management
  • Request Processing
  • Activity Logging
- Color: White with green border

**TIER 3: DATA LAYER (Bottom)**
- Background color: Light orange (#FFF3E0)
- Title bar: "Data Layer (Persistence)" in bold
- Contains 2 boxes arranged horizontally:

Box 1: "MongoDB Database"
- Icon: MongoDB leaf logo
- Contents:
  • Collections:
    - users
    - foods
    - requests
    - contacts
    - activities
  • Connection Pool: 50
  • Port: 27017
- Color: White with orange border

Box 2: "Session Store"
- Icon: Storage/database icon
- Contents:
  • MongoDB Session Store
  • Session Management
  • User Authentication State
  • Cookie Storage
- Color: White with orange border

**Connecting Arrows:**
1. From Presentation Layer to Application Layer:
   - Bidirectional thick arrows
   - Label: "HTTP/HTTPS Requests & Responses"
   - Label: "JSON Data Exchange"

2. From Application Layer to Data Layer:
   - Bidirectional thick arrows
   - Label: "Mongoose ODM"
   - Label: "CRUD Operations"
   - Label: "Database Queries (BSON)"

**Side Panel (Right side of diagram):**
- Title: "Security & Performance Features"
- Background: Light purple (#F3E5F5)
- Contents in bullet points:
  ✓ IP Address Tracking
  ✓ Login History Logging
  ✓ Password Bcrypt Hashing
  ✓ Session Security (HttpOnly Cookies)
  ✓ Role-Based Access Control (RBAC)
  ✓ Input Validation & Sanitization
  ✓ XSS Protection
  ✓ 250 Concurrent Users Support
  ✓ Scalable Session Management

**Visual Style:**
- Clean, professional diagram
- Use soft gradient backgrounds for each tier
- Clear, bold labels and text
- Consistent box sizing and spacing
- Directional arrows with clear labels
- Professional color palette (blue, green, orange)
- Include small icons for visual interest
- Use drop shadows on boxes for depth

---

## 7. WORKFLOW DIAGRAM PROMPT (Food Donation Flow)

**Title:** Food Donation Workflow - End-to-End Process

**Description for Image Generation:**

Create a detailed workflow/flowchart diagram showing the complete food donation process from donor posting to receiver completion:

**Layout:** Top-to-bottom flowchart with swim lanes for different actors

**Swim Lanes (3 vertical columns):**
- Left column: "Donor" (light blue background #E3F2FD)
- Middle column: "System/Admin" (light green background #E8F5E9)
- Right column: "Receiver" (light orange background #FFF3E0)

**Flowchart Elements:**

**DONOR LANE (Left):**

1. Start (rounded rectangle, green): "Donor Logs In"
   ↓
2. Process (rectangle): "Navigate to Post Food Section"
   ↓
3. Input (parallelogram): "Enter Food Details:
   • Food Name
   • Quantity
   • Category
   • Location
   • Contact Info"
   ↓
4. Process: "Upload Photo (Optional)"
   ↓
5. Action (rectangle): "Submit Food Donation"
   ↓
6. Decision (diamond): "Validation Successful?"
   → If No: Return to "Enter Food Details" (arrow loops back)
   → If Yes: Continue ↓
   
7. Process: "Food Posted Successfully"
   ↓
8. Wait state (hexagon): "Wait for Requests"
   ↓
9. Notification (document shape): "Receive Request Notification"
   ↓
10. Process: "View Request Details"
    ↓
11. Wait state: "Wait for Admin Approval"
    ↓
12. Decision: "Request Approved?"
    → If No: End (oval, red): "Request Rejected"
    → If Yes: Continue ↓
    
13. Notification: "Receiver Contact Information Shared"
    ↓
14. Action: "Coordinate Pickup with Receiver"
    ↓
15. Wait state: "Receiver Picks Up Food"
    ↓
16. Notification: "Marked as Completed"
    ↓
17. End (oval, green): "Donation Completed Successfully"

**SYSTEM/ADMIN LANE (Middle):**

1. Process: "Receive Food Submission"
   ↓
2. Process: "Validate Input Data"
   ↓
3. Database action (cylinder): "Store in Foods Collection"
   ↓
4. Process: "Log Activity: 'Food Posted'"
   ↓
5. Process: "Make Food Visible to Receivers"
   ↓
6. Wait state: "Monitor for Requests"
   ↓
7. Process: "Receive Request from Receiver"
   ↓
8. Database action: "Create Request Record"
   ↓
9. Notification: "Alert Admin Dashboard"
   ↓
10. Manual action (trapezoid): "Admin Reviews Request"
    ↓
11. Decision: "Admin Decision?"
    → If Approve: "Update Request Status: 'Approved'"
    → If Reject: "Update Request Status: 'Rejected'"
    
12. Process: "Send Notifications to Donor & Receiver"
    ↓
13. Process: "If Approved: Share Contact Details"
    ↓
14. Wait state: "Monitor Completion"
    ↓
15. Process: "Receive Completion Confirmation"
    ↓
16. Database action: "Update Food Status: 'Completed'"
    ↓
17. Database action: "Update Request Status: 'Completed'"
    ↓
18. Process: "Log Activity: 'Request Completed'"
    ↓
19. Process: "Award Points to Donor"
    ↓
20. End: "Transaction Closed"

**RECEIVER LANE (Right):**

1. Start: "Receiver Logs In"
   ↓
2. Process: "Browse Available Food"
   ↓
3. Input: "Search/Filter Options:
   • By Category
   • By Location
   • By Quantity"
   ↓
4. Process: "View Food Details"
   ↓
5. Decision: "Food Suitable?"
   → If No: Return to "Browse Available Food"
   → If Yes: Continue ↓
   
6. Action: "Click 'Request Food' Button"
   ↓
7. Input: "Enter Reason (Optional)"
   ↓
8. Action: "Submit Request"
   ↓
9. Database action: "Request Saved"
   ↓
10. Notification: "Request Submitted Successfully"
    ↓
11. Wait state: "Wait for Admin Approval"
    ↓
12. Notification: "Receive Approval/Rejection"
    ↓
13. Decision: "Request Approved?"
    → If No: End: "Try Other Food Items"
    → If Yes: Continue ↓
    
14. Notification: "Receive Donor Contact Details"
    ↓
15. Process: "View Pickup Location & Instructions"
    ↓
16. Action: "Contact Donor to Confirm Pickup"
    ↓
17. Action: "Go to Pickup Location"
    ↓
18. Action: "Receive Food from Donor"
    ↓
19. Action: "Mark Request as Completed"
    ↓
20. Notification: "Thank You Message Displayed"
    ↓
21. End: "Food Received Successfully"

**Connecting Arrows:**
- Use solid arrows for process flow
- Use dashed arrows for data exchange between lanes
- Label cross-lane arrows with action names (e.g., "Submit Request", "Send Notification", "Share Contact")

**Visual Style:**
- Standard flowchart symbols (rectangles, diamonds, ovals, etc.)
- Color-coded shapes:
  - Green: Start/Success end points
  - Red: Failure end points
  - Blue: Process boxes
  - Yellow: Decision diamonds
  - Purple: Wait states
  - Cyan: Notifications
- Clear, readable labels
- Consistent arrow directions (mostly top-to-bottom)
- Professional spacing and alignment

---

## 8. SEQUENCE DIAGRAM PROMPT (User Login Process)

**Title:** User Authentication Sequence Diagram

**Description for Image Generation:**

Create a detailed UML Sequence Diagram showing the complete user login process in the Food Management System:

**Layout:** Horizontal lifelines for each participant, vertical time progression

**Participants (from left to right):**

1. "User" (Actor)
   - Stick figure icon
   - Lifeline: Dashed vertical line

2. "Browser" (Client)
   - Box with browser icon
   - Lifeline: Dashed vertical line

3. "Express Server" (Backend)
   - Box with server icon
   - Lifeline: Dashed vertical line

4. "Auth Route" (Controller)
   - Box with code icon
   - Lifeline: Dashed vertical line

5. "MongoDB" (Database)
   - Box with database icon
   - Lifeline: Dashed vertical line

6. "Session Store" (Storage)
   - Box with storage icon
   - Lifeline: Dashed vertical line

**Sequence of Messages (numbered, top to bottom):**

1. User → Browser: "Enter email & password, click Login"
   - Arrow type: Solid

2. Browser → Express Server: "POST /auth/login {email, password}"
   - Arrow type: Solid
   - Label: HTTP Request

3. Express Server → Auth Route: "Route to login handler"
   - Arrow type: Solid

4. Auth Route → MongoDB: "Find user by email"
   - Arrow type: Solid
   - Activation box on MongoDB lifeline

5. MongoDB → Auth Route: "Return user record (with hashed password)"
   - Arrow type: Dashed (return)
   - Deactivate MongoDB

6. Auth Route: "Compare password with bcrypt"
   - Self-call arrow (loop back to self)
   - Activation box

7. Auth Route: Decision box "Password Valid?"
   - Alt frame: 
     - [If valid] Continue to step 8
     - [If invalid] Skip to step 14

8. Auth Route → MongoDB: "Check user.verified status"
   - Arrow type: Solid
   - Activation box on MongoDB

9. MongoDB → Auth Route: "Return verified: true/false"
   - Arrow type: Dashed

10. Auth Route: Decision "User Verified?"
    - Alt frame:
      - [If verified] Continue to step 11
      - [If not verified] Skip to step 15

11. Auth Route → Session Store: "Create new session with userId, role"
    - Arrow type: Solid
    - Activation box on Session Store

12. Session Store → Auth Route: "Return session ID"
    - Arrow type: Dashed

13. Auth Route → MongoDB: "Update lastLoginIP, lastLoginDate, loginHistory"
    - Arrow type: Solid

14. MongoDB → Auth Route: "Update confirmation"
    - Arrow type: Dashed

15. Auth Route → Auth Route: "Log activity (IP, timestamp)"
    - Self-call

16. Auth Route → Express Server: "Response: {success, redirect, role}"
    - Arrow type: Dashed (return)

17. Express Server → Browser: "HTTP 200 + Set-Cookie: session_id"
    - Arrow type: Dashed
    - Label: JSON Response + Cookie

18. Browser → User: "Redirect to dashboard (donor/receiver/admin)"
    - Arrow type: Dashed
    - Success end

**Alternative Flow (Invalid Credentials - from step 7):**

14. Auth Route → Express Server: "Response: {error: 'Invalid credentials'}"
    - Arrow type: Dashed (return)
    - Color: Red

15. Express Server → Browser: "HTTP 400 {error message}"
    - Arrow type: Dashed
    - Color: Red

16. Browser → User: "Display error message"
    - Arrow type: Dashed
    - Color: Red
    - Error end

**Alternative Flow (Not Verified - from step 10):**

15. Auth Route → Express Server: "Response: {error: 'Account pending verification'}"
    - Arrow type: Dashed
    - Color: Orange

16. Express Server → Browser: "HTTP 403 {redirect: /pending}"
    - Arrow type: Dashed
    - Color: Orange

17. Browser → User: "Redirect to pending page"
    - Arrow type: Dashed
    - Color: Orange

**Visual Elements:**
- Use standard UML sequence diagram notation
- Activation boxes (thin rectangles) on lifelines when processing
- Alt/Opt frames for conditional logic
- Dashed return arrows for responses
- Solid arrows for requests/calls
- Number each message in sequence
- Clear, descriptive message labels
- Color coding: Green for success paths, Red for errors, Orange for warnings

---

## Usage Instructions for Sora:

1. Copy each diagram prompt separately
2. Paste into Sora with the title as the main subject
3. The detailed description provides all visual specifications
4. Request professional, clean, technical diagram style
5. Specify high resolution (at least 1920x1080 for architecture diagrams)
6. Request editable format if possible (SVG or high-quality PNG)

**Recommended Additional Prompt Suffix for All Diagrams:**
"Create this as a professional, clean, technical diagram suitable for software documentation. Use clear typography, consistent spacing, and a modern color palette. Ensure all text is readable and all connections are clear. Output in high resolution."

---

**END OF DIAGRAM PROMPTS**
