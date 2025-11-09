# 🚀 Deployment Guide

This guide will help you deploy your Food Management System to production.

---

## Option 1: Deploy to Render (Recommended - Free Tier Available)

### Prerequisites
- GitHub account
- Render account (https://render.com)
- MongoDB Atlas account

### Step 1: Prepare Your Code

1. **Push to GitHub:**
```powershell
git init
git add .
git commit -m "Initial commit: Food Management System"
git branch -M main
git remote add origin https://github.com/yourusername/food-management.git
git push -u origin main
```

2. **Update package.json:**
Make sure your `package.json` has:
```json
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### Step 2: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0)
3. Set up database access (username/password)
4. Set network access to 0.0.0.0/0 (allow from anywhere)
5. Get connection string

### Step 3: Deploy to Render

1. Go to https://render.com and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: food-management-system
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   - `MONGODB_URI`: (your MongoDB Atlas connection string)
   - `SESSION_SECRET`: (generate a random string)
   - `NODE_ENV`: `production`

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Your app will be live at: `https://food-management-system.onrender.com`

---

## Option 2: Deploy to Heroku

### Prerequisites
- Heroku account
- Heroku CLI installed

### Step 1: Prepare for Heroku

1. **Create Procfile:**
```powershell
echo "web: node server.js" > Procfile
```

2. **Update server.js** (if needed):
Ensure port uses `process.env.PORT`

### Step 2: Deploy

```powershell
# Login to Heroku
heroku login

# Create app
heroku create food-management-system

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
heroku config:set SESSION_SECRET="your_random_secret"
heroku config:set NODE_ENV="production"

# Deploy
git push heroku main

# Open app
heroku open
```

---

## Option 3: Deploy to Railway

### Step 1: Setup

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository

### Step 2: Configure

1. Add environment variables:
   - `MONGODB_URI`
   - `SESSION_SECRET`
   - `NODE_ENV=production`

2. Railway will auto-detect Node.js and deploy

3. Your app will be live at the generated URL

---

## Option 4: Deploy to Vercel (Requires Serverless Setup)

Vercel is great for frontend, but requires modification for Express backend.
**Not recommended** for this project without converting to Next.js or serverless functions.

---

## Environment Variables for Production

Make sure to set these in your hosting platform:

```env
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food_management
SESSION_SECRET=a_very_long_random_string_here
NODE_ENV=production

# Optional
PORT=3000  # Most platforms set this automatically
```

---

## Post-Deployment Checklist

After deployment, test these features:

- [ ] Home page loads correctly
- [ ] Can sign up new users
- [ ] Admin panel accessible
- [ ] Can verify users
- [ ] Donor can log in and post food
- [ ] Receiver can log in and browse food
- [ ] All static files (CSS, JS) load properly
- [ ] Images and icons display correctly
- [ ] MongoDB connection works
- [ ] Session persistence works
- [ ] All API endpoints respond correctly

---

## Common Deployment Issues

### Issue 1: MongoDB Connection Failed
**Error:** `MongoServerError: bad auth`

**Solution:**
- Verify MongoDB Atlas connection string
- Ensure username and password are correct
- URL-encode special characters in password
- Check Network Access allows 0.0.0.0/0

### Issue 2: Application Error / 503
**Error:** Application not starting

**Solution:**
- Check logs: `heroku logs --tail` or Render dashboard
- Verify `package.json` has correct start script
- Ensure all dependencies are in `dependencies` (not `devDependencies`)
- Check Node.js version compatibility

### Issue 3: CSS/JS Not Loading
**Error:** Styling broken, JS not working

**Solution:**
- Verify static files middleware in server.js
- Check file paths are correct
- Clear browser cache
- Ensure `public` folder is committed to git

### Issue 4: Sessions Not Persisting
**Error:** Keep getting logged out

**Solution:**
- Set `SESSION_SECRET` environment variable
- Use session store like `connect-mongo` for production:

```javascript
const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));
```

---

## Performance Optimization

### 1. Use Session Store
Install: `npm install connect-mongo`

Update server.js to use MongoDB session store (see Issue 4 above)

### 2. Enable Compression
```javascript
const compression = require('compression');
app.use(compression());
```

### 3. Add Caching Headers
```javascript
app.use(express.static('public', {
  maxAge: '1d'
}));
```

### 4. Database Indexing
Add indexes in models:
```javascript
userSchema.index({ email: 1 });
foodSchema.index({ status: 1, location: 1 });
```

---

## Security Enhancements for Production

### 1. Install Helmet
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 2. Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/auth/', limiter);
```

### 3. CORS Configuration
```bash
npm install cors
```

```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### 4. Environment Variables
Never commit `.env` file!
Always use platform-specific environment variable settings.

---

## Custom Domain Setup

### For Render:
1. Go to Settings → Custom Domains
2. Add your domain (e.g., food-management.com)
3. Update DNS records with provided values
4. Wait for DNS propagation (up to 48 hours)

### For Heroku:
```bash
heroku domains:add www.yourdomain.com
# Follow DNS instructions
```

---

## Monitoring and Maintenance

### 1. Set Up Logging
Use services like:
- Papertrail (for Heroku)
- Render's built-in logs
- LogDNA / Loggly

### 2. Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake

### 3. Error Tracking
- Sentry (recommended)
- Rollbar
- Bugsnag

### 4. Analytics
- Google Analytics
- Mixpanel
- Plausible (privacy-focused)

---

## Backup Strategy

### MongoDB Atlas Backups
Atlas provides automated backups on paid tiers.

For free tier:
- Use `mongodump` weekly
- Store backups in cloud storage (AWS S3, Google Drive)

```bash
mongodump --uri="your_mongodb_uri" --out=./backup
```

---

## Scaling Considerations

### When to Scale:
- 100+ active users
- 1000+ food posts
- Slow response times

### Horizontal Scaling:
- Add more Render/Heroku instances
- Use load balancer

### Database Scaling:
- Upgrade MongoDB Atlas tier
- Add read replicas
- Implement caching (Redis)

---

## Cost Estimates

### Free Tier Setup:
- **Render**: Free (with limitations)
- **MongoDB Atlas**: Free (M0 cluster, 512MB)
- **Total**: $0/month

### Recommended Production Setup:
- **Render**: $7/month (Starter)
- **MongoDB Atlas**: $9/month (M10 cluster)
- **Custom Domain**: $12/year
- **Total**: ~$16/month + domain

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Heroku Docs**: https://devcenter.heroku.com
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Node.js Deployment**: https://nodejs.org/en/docs/guides/

---

## 🎉 Congratulations!

Your Food Management System is now live and accessible to users worldwide!

**Share your deployment:**
- Tweet about it
- Add to your portfolio
- Share with NGOs and food banks
- Get user feedback
- Iterate and improve

---

**Happy Deploying! 🚀**
