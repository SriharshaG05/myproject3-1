# Admin Activity Monitoring System - Complete Documentation

## 🎯 Overview
Successfully implemented a comprehensive activity monitoring system that allows admins to track and monitor all donor and receiver activities in real-time.

## ✨ Features Implemented

### 1. **Activity Logging System**
- Automatic logging of all user actions
- IP address and user agent tracking
- Metadata storage for detailed information
- Timestamps for all activities

### 2. **Activity Types Tracked**
- 📦 **food_posted** - When donor posts new food
- 🙋 **request_made** - When receiver requests food
- ✅ **request_accepted** - When donor accepts a request
- ❌ **request_rejected** - When donor rejects a request
- 🎉 **request_completed** - When delivery is marked as complete
- 🔑 **login** - User login activities
- 👤 **profile_updated** - Profile modifications

### 3. **Admin Dashboard Features**
- **Statistics Overview**: Real-time counts of users, food posts, requests, and activities
- **Activity Monitor**: Filtered view of all user activities
- **User Management**: Pending user verification system
- **Contact Messages**: Integrated contact form management

## 📁 Files Created/Modified

### New Files:
1. **models/activity.js** - Activity tracking model
2. **routes/admin.js** - Admin-specific routes for monitoring

### Modified Files:
1. **routes/donor.js** - Added activity logging to all donor actions
2. **routes/receiver.js** - Added activity logging to receiver actions
3. **routes/auth.js** - Added login activity tracking
4. **server.js** - Integrated admin routes
5. **views/admin.html** - Enhanced with activity monitoring UI
6. **public/js/admin.js** - Added activity monitoring JavaScript

## 🔌 API Endpoints

### Admin Statistics
```http
GET /admin/statistics
```
Returns comprehensive system statistics including:
- User counts (donors, receivers, pending)
- Food statistics (total, available, reserved, completed)
- Request statistics (pending, accepted, rejected, completed)
- Activity counts

**Response:**
```json
{
  "success": true,
  "statistics": {
    "users": {
      "donors": 25,
      "receivers": 40,
      "pending": 5,
      "total": 65
    },
    "food": {
      "total": 150,
      "available": 30,
      "reserved": 10,
      "completed": 110
    },
    "requests": {
      "total": 200,
      "pending": 15,
      "accepted": 50,
      "rejected": 20,
      "completed": 115
    },
    "activities": {
      "today": 45,
      "byRole": [...]
    }
  }
}
```

### Get Activities
```http
GET /admin/activities?page=1&limit=20&role=donor&type=food_posted
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `role` - Filter by role: 'donor' or 'receiver'
- `type` - Filter by activity type

**Response:**
```json
{
  "success": true,
  "activities": [
    {
      "_id": "...",
      "userId": "...",
      "userName": "John Doe",
      "userRole": "donor",
      "activityType": "food_posted",
      "description": "Posted food: Rice and Curry",
      "metadata": {
        "foodId": "...",
        "foodName": "Rice and Curry",
        "quantity": "10 servings",
        "location": "Downtown"
      },
      "ipAddress": "192.168.1.1",
      "createdAt": "2025-10-21T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalActivities": 200,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Get User-Specific Activities
```http
GET /admin/user/:userId/activities
```

### Get Dashboard Data
```http
GET /admin/dashboard-data
```
Returns all necessary data for admin dashboard in one call.

## 📊 Activity Metadata Structure

Each activity includes comprehensive metadata:

```javascript
{
  foodId: ObjectId,          // Reference to food item
  requestId: ObjectId,       // Reference to request
  foodName: String,          // Name of food
  quantity: String,          // Quantity information
  location: String,          // Location information
  receiverName: String,      // Receiver's name (for donor activities)
  donorName: String,         // Donor's name (for receiver activities)
  additionalInfo: Mixed      // Any extra information
}
```

## 🎨 Admin Dashboard UI Components

### 1. Statistics Grid
Displays real-time counts:
- 👨‍🌾 Total Donors
- 👥 Total Receivers
- 🍲 Total Food Posts
- 📋 Total Requests
- ⚡ Today's Activity Count

### 2. Activity Monitor
Features:
- **Role Filter**: View activities by donors or receivers
- **Type Filter**: Filter by specific activity types
- **Real-time Updates**: Refresh button to reload activities
- **Pagination**: Navigate through activity history
- **Color Coding**: Visual distinction between donor (green) and receiver (blue) activities

### 3. Activity Item Display
Each activity shows:
- User name and role badge
- Activity timestamp
- Description of action
- Activity type icon
- Relevant metadata

## 🔧 How to Use

### For Admins:

1. **Login to Admin Panel**
   ```
   http://localhost:3000/admin
   ```

2. **View Statistics**
   - See overview of system usage at the top
   - Monitor today's activity count

3. **Monitor Activities**
   - View all recent activities in real-time
   - Filter by role (Donors/Receivers)
   - Filter by activity type
   - Click refresh to update

4. **Manage Users**
   - Verify or reject pending users
   - View user verification requests

5. **Handle Contact Messages**
   - Read user messages
   - Mark as read or replied
   - Delete spam messages

## 🔍 Activity Examples

### Donor Activities:
```
✅ John Doe posted food: Rice and Curry
   DONOR | Food Posted | Oct 21, 2025, 10:30 AM

✅ Jane Smith accepted request from Mike Johnson for Pizza
   DONOR | Request Accepted | Oct 21, 2025, 11:15 AM

✅ John Doe completed delivery of Rice and Curry
   DONOR | Request Completed | Oct 21, 2025, 02:45 PM
```

### Receiver Activities:
```
✅ Mike Johnson requested Rice and Curry from John Doe
   RECEIVER | Request Made | Oct 21, 2025, 10:35 AM

✅ Sarah Williams requested Pizza from Jane Smith
   RECEIVER | Request Made | Oct 21, 2025, 11:00 AM

✅ Mike Johnson logged in
   RECEIVER | Login | Oct 21, 2025, 09:00 AM
```

## 📈 Statistics Dashboard

The admin can monitor:
- **User Growth**: Track donor and receiver registrations
- **Food Distribution**: See available vs completed food
- **Request Status**: Monitor pending, accepted, rejected requests
- **Activity Trends**: View today's activity count
- **System Health**: Overall platform usage

## 🔐 Security Features

1. **Admin Authentication**: All endpoints require admin session
2. **IP Tracking**: Log IP addresses for security
3. **User Agent Logging**: Track device/browser information
4. **Activity Audit Trail**: Complete history of all actions

## 💡 Use Cases

### 1. Monitor Platform Usage
Track how actively users are engaging with the platform.

### 2. Identify Suspicious Activity
Detect unusual patterns or potential misuse.

### 3. Performance Analytics
Understand peak usage times and popular features.

### 4. User Verification
Review user activity before verification approval.

### 5. Support & Troubleshooting
View user actions to resolve support tickets.

## 🎯 Key Benefits

✅ **Real-time Monitoring**: See activities as they happen
✅ **Comprehensive Tracking**: All actions logged automatically
✅ **Easy Filtering**: Find specific activities quickly
✅ **User Insights**: Understand user behavior patterns
✅ **Security**: Complete audit trail for accountability
✅ **Performance**: Optimized queries with proper indexing
✅ **Scalability**: Pagination for large datasets

## 🚀 Testing the System

1. **Test as Donor:**
   - Login as donor
   - Post food
   - Accept/reject requests
   - Mark as delivered
   - Check admin panel for logged activities

2. **Test as Receiver:**
   - Login as receiver
   - Request food
   - Check admin panel for logged activities

3. **View in Admin Panel:**
   - Login as admin
   - View statistics
   - Browse activity monitor
   - Filter by role and type
   - Check real-time updates

## 📝 Database Schema

### Activity Collection
```javascript
{
  userId: ObjectId (required, indexed),
  userName: String (required),
  userRole: String (required, enum: ['donor', 'receiver']),
  activityType: String (required, indexed),
  description: String (required),
  metadata: {
    foodId: ObjectId,
    requestId: ObjectId,
    foodName: String,
    quantity: String,
    location: String,
    additionalInfo: Mixed
  },
  ipAddress: String,
  userAgent: String,
  status: String (enum: ['success', 'failed', 'pending']),
  createdAt: Date (indexed),
  updatedAt: Date
}
```

## 🔄 Future Enhancements

Potential improvements:
- Export activity reports (CSV, PDF)
- Advanced analytics and charts
- Real-time notifications for admins
- Activity search functionality
- Date range filtering
- Custom activity alerts
- User activity profiles

---

**Status**: ✅ Fully Implemented and Running

**Server**: http://localhost:3000
**Admin Panel**: http://localhost:3000/admin
**Database**: MongoDB with Activity collection

The admin can now monitor all donor and receiver activities in real-time with comprehensive filtering and statistics!
