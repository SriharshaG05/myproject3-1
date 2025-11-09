# 🍽️ Food Management System

A web-based food donation management system connecting food donors with receivers, helping to reduce food waste and fight hunger.

## 🧱 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express
- **Database**: MongoDB (via Mongoose)
- **Session Management**: express-session
- **Authentication**: bcryptjs for password hashing

## 📂 Project Structure

```
food-management/
│
├── server.js                 # Main server file
├── package.json              # Dependencies
├── .env                      # Environment variables
│
├── models/                   # Database models
│   ├── user.js              # User schema
│   ├── food.js              # Food item schema
│   └── request.js           # Request schema
│
├── routes/                   # API routes
│   ├── auth.js              # Authentication routes
│   ├── donor.js             # Donor-specific routes
│   └── receiver.js          # Receiver-specific routes
│
├── views/                    # HTML pages
│   ├── login.html           # Login page
│   ├── signup.html          # Signup page
│   ├── pending.html         # Pending verification page
│   ├── donor.html           # Donor dashboard
│   ├── receiver.html        # Receiver dashboard
│   └── admin.html           # Admin panel
│
└── public/                   # Static files
    ├── css/
    │   └── style.css        # Main stylesheet
    └── js/
        ├── login.js         # Login logic
        ├── signup.js        # Signup logic
        ├── donor.js         # Donor dashboard logic
        ├── receiver.js      # Receiver dashboard logic
        └── admin.js         # Admin panel logic
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up MongoDB:**
   - Install MongoDB locally OR use MongoDB Atlas (cloud)
   - Update the `.env` file with your MongoDB connection string

3. **Configure environment variables:**
   Edit `.env` file:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/food_management
   SESSION_SECRET=your_secret_key_here_change_in_production
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open your browser and go to `http://localhost:3000`

## 🔑 Features

### 1️⃣ User Authentication
- **Sign Up** with role selection (Donor/Receiver)
- **Login** with email and password
- **Account verification** - Admin approval required
- **Pending verification** page for unverified users

### 2️⃣ Donor Dashboard
- ✅ Post new food donations with details:
  - Food name, quantity, preparation time
  - Availability duration and location
- 📊 View donation statistics and reward points
- 📋 Manage food posts (available/requested/delivered)
- 🔔 View and manage requests from receivers
- ✔️ Accept/reject requests
- 🎉 Mark deliveries as complete and earn points (+10 per delivery)

### 3️⃣ Receiver Dashboard
- 🔍 Browse all available food donations
- 🔎 Filter by location or search by food name
- 📤 Request food items
- 📜 Track request status (pending/accepted/rejected)
- 📞 View donor contact information for accepted requests

### 4️⃣ Admin Panel
- 👥 View all pending user registrations
- ✅ Verify or reject user accounts
- 🛠️ Simple admin interface at `/admin`

### 5️⃣ Reward System
- Points awarded for completed deliveries
- Track total donations and points
- Gamification to encourage donations

## 💾 Database Collections

### Users Collection
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashedpassword",
  "role": "donor",
  "location": "Hyderabad",
  "verified": false,
  "points": 0
}
```

### Food Items Collection
```json
{
  "food_name": "Dal Rice",
  "quantity": "5 plates",
  "prepared_time": "2025-10-19T12:00",
  "available_until": "2025-10-19T16:00",
  "location": "Hyderabad",
  "status": "available",
  "donor_id": "ObjectId"
}
```

### Requests Collection
```json
{
  "food_id": "ObjectId",
  "receiver_id": "ObjectId",
  "donor_id": "ObjectId",
  "status": "pending"
}
```

## 🔄 Application Flow

1. **User Registration**
   - User signs up with role (Donor/Receiver)
   - Account awaits admin verification
   - Admin verifies through admin panel

2. **Donor Flow**
   - Donor posts available food
   - Receivers browse and request food
   - Donor accepts/rejects requests
   - On acceptance, food status changes to "reserved"
   - Donor marks as delivered → earns 10 points

3. **Receiver Flow**
   - Browse available food listings
   - Filter by location/food name
   - Request desired food items
   - Wait for donor acceptance
   - Contact donor once accepted

## 🎨 UI Features

- Clean and modern design with gradient backgrounds
- Responsive layout for mobile and desktop
- Card-based food listings
- Status badges (Available, Requested, Reserved, Delivered)
- Real-time updates without page refresh
- Toast notifications for actions

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user info

### Donor Routes
- `POST /donor/post-food` - Post new food
- `GET /donor/my-posts` - Get donor's posts
- `GET /donor/requests` - Get requests for donor's food
- `POST /donor/accept-request/:id` - Accept request
- `POST /donor/reject-request/:id` - Reject request
- `POST /donor/mark-delivered/:id` - Mark as delivered
- `GET /donor/stats` - Get donor statistics

### Receiver Routes
- `GET /receiver/available-food` - Get all available food
- `POST /receiver/request-food/:id` - Request food
- `GET /receiver/my-requests` - Get receiver's requests

### Admin Routes
- `GET /auth/admin/pending-users` - Get unverified users
- `POST /auth/admin/verify/:id` - Verify user
- `DELETE /auth/admin/reject/:id` - Reject and delete user

## 🛠️ Manual Testing Steps

1. **Sign up** as both Donor and Receiver (use different emails)
2. Visit `/admin` to verify both accounts
3. **Login as Donor** → Post some food items
4. **Login as Receiver** → Browse and request food
5. **Back to Donor** → View requests and accept one
6. Mark the accepted item as delivered
7. Check that donor points increased

## 🔐 Security Notes

- Passwords are hashed using bcryptjs
- Session-based authentication
- Role-based access control
- MongoDB injection protection via Mongoose

## 📝 Future Enhancements

- Email notifications for requests and verifications
- Image upload for food items
- Real-time chat between donor and receiver
- Mobile app (React Native)
- Advanced admin dashboard with analytics
- Rating system for donors and receivers
- Map integration for location-based search

## 📄 License

ISC

## 👨‍💻 Author

Food Management System - Built with ❤️ for reducing food waste

---

**Note:** For production deployment, make sure to:
- Change the SESSION_SECRET in `.env`
- Use a secure MongoDB connection
- Enable HTTPS
- Add rate limiting and input validation
- Implement proper error logging
