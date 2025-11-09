# 🚀 Quick Start Guide

## Step 1: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```powershell
# If installed as a service, it should already be running
# Or start manually:
mongod
```

**Alternative: Use MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string and update `.env` file

## Step 2: Start the Server

```powershell
npm start
```

Or for development mode with auto-restart:
```powershell
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:3000
```

## Step 3: Access the Application

Open your browser and navigate to: **http://localhost:3000**

## Step 4: Test the Application

### Create Users

1. **Sign up as a Donor:**
   - Go to http://localhost:3000/signup
   - Name: John Donor
   - Email: donor@example.com
   - Password: password123
   - Location: Hyderabad
   - Role: Donate Food
   - Click "Sign Up"

2. **Sign up as a Receiver:**
   - Name: Sarah Receiver
   - Email: receiver@example.com
   - Password: password123
   - Location: Hyderabad
   - Role: Receive Food
   - Click "Sign Up"

### Verify Users (Admin Panel)

3. **Open Admin Panel:**
   - Go to http://localhost:3000/admin
   - You'll see both users pending verification
   - Click "Verify" for both users

### Test Donor Flow

4. **Login as Donor:**
   - Email: donor@example.com
   - Password: password123
   - You'll be redirected to Donor Dashboard

5. **Post Food:**
   - Fill in the form:
     - Food Name: Dal Rice
     - Quantity: 5 plates
     - Prepared Time: (select today's date and time)
     - Available Until: (select a few hours from now)
     - Location: Hyderabad
   - Click "Post Food"
   - You should see your post appear below

### Test Receiver Flow

6. **Login as Receiver:**
   - Open a new incognito/private window
   - Go to http://localhost:3000/login
   - Email: receiver@example.com
   - Password: password123
   - You'll be redirected to Receiver Dashboard

7. **Request Food:**
   - You should see the "Dal Rice" posted by John
   - Click "Request" button
   - Check "My Requests" section - status will be "PENDING"

### Complete the Flow

8. **Back to Donor Dashboard:**
   - Refresh the donor dashboard
   - Scroll to "Requests" section
   - You'll see Sarah's request
   - Click "Accept"
   - The food status will change to "RESERVED"
   - Click "Mark as Delivered"
   - Your points will increase by 10!

9. **Back to Receiver Dashboard:**
   - Refresh the receiver dashboard
   - In "My Requests", the status will be "ACCEPTED"
   - You can see the donor's contact information

## 🎉 Success!

You've successfully tested the complete food donation cycle:
- ✅ User registration and verification
- ✅ Food posting by donor
- ✅ Food request by receiver
- ✅ Request acceptance
- ✅ Delivery confirmation
- ✅ Points system

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running. Start it with `mongod` command.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Change the port in `.env` file or kill the process using port 3000.

### Session Issues
If you're logged out unexpectedly, make sure SESSION_SECRET is set in `.env` file.

## 📱 Test Scenarios

### Scenario 1: Multiple Food Posts
- Donor posts 3-4 different food items
- Receiver filters by location
- Receiver searches by food name

### Scenario 2: Multiple Requests
- Create 2-3 receiver accounts
- All request the same food item
- Donor sees all requests
- Donor accepts one and rejects others

### Scenario 3: Points Accumulation
- Donor posts 5 food items
- Mark all as delivered
- Check points: should be 50 (5 × 10)

## 🎓 Learning Points

This project demonstrates:
- ✅ RESTful API design
- ✅ Session-based authentication
- ✅ Role-based access control
- ✅ CRUD operations with MongoDB
- ✅ Frontend-backend integration
- ✅ Async/await JavaScript
- ✅ Responsive CSS design
- ✅ Form validation
- ✅ Status management

## 📚 Next Steps

1. Add email notifications
2. Implement image uploads
3. Add map integration
4. Create mobile app version
5. Add analytics dashboard
6. Implement rating system

---

**Happy Coding! 🎉**
