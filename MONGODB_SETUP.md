# MongoDB Setup for Windows

## Option 1: Install MongoDB Locally (Recommended for Development)

### Step 1: Download MongoDB
1. Go to https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0.x)
   - Platform: Windows
   - Package: MSI
3. Download and run the installer

### Step 2: Installation
1. Run the `.msi` installer
2. Choose "Complete" installation
3. **Important:** Check "Install MongoDB as a Service"
4. Keep the default data directory: `C:\Program Files\MongoDB\Server\7.0\data`
5. Install "MongoDB Compass" (optional GUI tool)

### Step 3: Verify Installation
Open PowerShell and run:
```powershell
mongod --version
```

### Step 4: Start MongoDB
If installed as a service (recommended):
```powershell
# MongoDB should start automatically
# To check status:
Get-Service MongoDB

# To start manually:
Start-Service MongoDB

# To stop:
Stop-Service MongoDB
```

If not installed as a service:
```powershell
# Create data directory
New-Item -ItemType Directory -Force -Path C:\data\db

# Start MongoDB
mongod --dbpath C:\data\db
```

### Step 5: Test Connection
Open another PowerShell window:
```powershell
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
...
test>
```

Type `exit` to quit.

## Option 2: Use MongoDB Atlas (Cloud - No Installation)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a free cluster (M0)

### Step 2: Configure Database Access
1. Click "Database Access" in left menu
2. Add new database user:
   - Username: `admin`
   - Password: (generate or create)
   - User Privileges: Atlas admin
3. Save

### Step 3: Configure Network Access
1. Click "Network Access" in left menu
2. Add IP Address
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production, use specific IPs
4. Confirm

### Step 4: Get Connection String
1. Click "Database" in left menu
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string, it looks like:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password

### Step 5: Update .env File
```env
MONGODB_URI=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/food_management?retryWrites=true&w=majority
```

## Verifying MongoDB Connection in Your App

After starting your server with `npm start`, you should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:3000
```

If you see an error, check the troubleshooting section below.

## Common Issues & Solutions

### Issue 1: "MongoDB is not recognized"
**Error:** `'mongod' is not recognized as an internal or external command`

**Solution:** Add MongoDB to PATH
1. Open System Environment Variables
2. Edit PATH variable
3. Add: `C:\Program Files\MongoDB\Server\7.0\bin`
4. Restart PowerShell

### Issue 2: "Data directory not found"
**Error:** `Data directory C:\data\db not found`

**Solution:**
```powershell
New-Item -ItemType Directory -Force -Path C:\data\db
mongod --dbpath C:\data\db
```

### Issue 3: "Port 27017 already in use"
**Error:** `Address already in use`

**Solution:**
```powershell
# Find process using port 27017
Get-Process -Id (Get-NetTCPConnection -LocalPort 27017).OwningProcess

# Kill the process (replace PID with actual process ID)
Stop-Process -Id PID -Force

# Or restart MongoDB service
Restart-Service MongoDB
```

### Issue 4: "MongoServerError: Authentication failed"
**Solution:**
- For local: No authentication needed by default
- For Atlas: Check username and password in connection string
- Make sure to URL-encode special characters in password

### Issue 5: "Connection timeout"
**Solution for Atlas:**
- Check Network Access settings
- Ensure IP is whitelisted (or use 0.0.0.0/0)
- Check internet connection
- Verify connection string is correct

## Testing Your MongoDB Connection

### Method 1: Using MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Connection string: `mongodb://localhost:27017`
3. Click "Connect"
4. You should see your databases

### Method 2: Using mongosh (CLI)
```powershell
mongosh
show dbs
use food_management
show collections
```

### Method 3: Check in Your App
1. Start your server
2. Sign up a user
3. Open MongoDB Compass or mongosh
4. Check if user was created:
```javascript
use food_management
db.users.find()
```

## Useful MongoDB Commands

```javascript
// Show all databases
show dbs

// Switch to food_management database
use food_management

// Show all collections
show collections

// View all users
db.users.find().pretty()

// View all food items
db.foods.find().pretty()

// View all requests
db.requests.find().pretty()

// Count documents
db.users.countDocuments()

// Delete all data (be careful!)
db.users.deleteMany({})
db.foods.deleteMany({})
db.requests.deleteMany({})

// Drop entire database (be very careful!)
use food_management
db.dropDatabase()
```

## Recommended: MongoDB Compass

MongoDB Compass is a free GUI tool for MongoDB:
- Visual interface to browse data
- Query builder
- Schema analyzer
- Performance monitoring

Download: https://www.mongodb.com/try/download/compass

## Quick Reference

| Command | Description |
|---------|-------------|
| `mongod` | Start MongoDB server |
| `mongosh` | MongoDB Shell (interact with database) |
| `show dbs` | List all databases |
| `use dbname` | Switch to database |
| `show collections` | List collections in current database |
| `db.collection.find()` | Show all documents |

---

**Need Help?**
- MongoDB Documentation: https://docs.mongodb.com/
- MongoDB Community: https://www.mongodb.com/community/forums/
