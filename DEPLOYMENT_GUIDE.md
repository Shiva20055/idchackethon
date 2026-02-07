# Hospital Appointment System - Deployment Guide

## 🚀 Quick Deployment Options

This guide provides step-by-step instructions for deploying the Hospital Appointment System to production.

---

## Option 1: Railway.app (Recommended - Easiest)

Railway.app is the easiest platform for deploying Node.js + MongoDB applications. Free tier available.

### Steps:

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub or email
   - Verify your email

2. **Deploy Backend & Database**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect your GitHub (or upload files)
   - Select the hospital appointment repository
   - Railway will auto-detect Node.js project

3. **Add MongoDB Plugin**
   - In Railway dashboard, click "Add Service"
   - Search and select "MongoDB"
   - This creates a free MongoDB instance
   - Railway automatically sets `MONGODB_URI` environment variable

4. **Configure Environment Variables**
   - In Railway project settings, add variables:
     ```
     NODE_ENV=production
     JWT_SECRET=your_super_secure_random_string_here
     JWT_EXPIRE=7d
     PORT=5000
     ```

5. **Deploy Frontend**
   - Create a new Railway project for frontend
   - OR use Vercel/Netlify (see Option 3)
   - Point to your public folder

6. **Get Your Live URL**
   - Railway provides your app URL automatically
   - Example: `https://hospital-app-prod-xxxxx.railway.app`
   - Your public URL for sharing!

### Cost: FREE for most reasonable usage

---

## Option 2: Render.com

Render offers free tier deployment (12-hour free hobby tier).

### Steps:

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository
   - Choose Node environment
   - Set start command: `npm start`

3. **Add MongoDB**
   - In Render dashboard: "New +" → "PostgreSQL" or MongoDB Atlas
   - OR use free MongoDB Atlas (see steps below)

4. **Add Environment Variables**
   - In Render service settings → "Environment"
   - Add all variables from `.env`

5. **Deploy**
   - Render automatically deploys on git push
   - Your live URL appears in dashboard

### Cost: $10/month for paid tier (includes free hobby plans with limitations)

---

## Option 3: Heroku (Legacy but Still Works)

Heroku discontinued free tier, but you can use paid plans.

### Steps:

1. **Install Heroku CLI**
   ```bash
   # On Windows, download from: https://devcenter.heroku.com/articles/heroku-cli
   # Or use npm:
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create hospital-appointment-system
   ```

4. **Add MongoDB Atlas (Free)**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free account
   - Create free cluster
   - Copy connection string
   - Add to Heroku:
     ```bash
     heroku config:set MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/hospital_appointments"
     ```

5. **Add Other Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET="your_secret_key"
   ```

6. **Deploy Code**
   ```bash
   git push heroku main
   ```

7. **Get Your Live URL**
   ```bash
   heroku open
   ```

### Cost: $7-50+/month depending on resources

---

## MongoDB Atlas Setup (Free Cloud Database)

### Steps:

1. **Sign Up**
   - Go to https://www.mongodb.com/cloud/atlas
   - Click "Try Free"
   - Create account with email

2. **Create Free Cluster**
   - Click "Create" (default free tier)
   - Select free tier (0.5GB storage)
   - Choose nearest region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Security" → "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Create strong password
   - Click "Add User"

4. **Allow Network Access**
   - Go to "Security" → "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere"
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Databases"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

6. **Example Connection String**
   ```
   mongodb+srv://admin:your_password@cluster0.xxxxx.mongodb.net/hospital_appointments?retryWrites=true&w=majority
   ```

### Cost: FREE with 5GB storage

---

## Complete Deployment Workflow

### Step 1: Local Testing
```bash
# Install dependencies
npm install

# Make sure MongoDB is running locally
# mongod

# Run server
npm start

# Test endpoints
# http://localhost:5000/api/health
```

### Step 2: Prepare for Production

1. **Update server.js to serve static files**
   - Ensure static files are served from `/` route
   - Server should serve HTML/CSS/JS files

2. **Create production `.env`**
   ```bash
   cp .env.example .env
   # Fill in production values
   ```

3. **Test with production config**
   ```bash
   NODE_ENV=production npm start
   ```

### Step 3: Push to Git

```bash
git init
git add .
git commit -m "Initial commit - Hospital Appointment System"
git remote add origin https://github.com/yourusername/hospital-app.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy (Choose One)

**For Railway.app (Recommended):**
```bash
# No command needed - connect GitHub and auto-deploy
# Just connect repository in Railway dashboard
```

**For Render:**
```bash
# Connect GitHub repository in dashboard
# Auto-deploys on git push
```

**For Heroku:**
```bash
heroku create hospital-app
git push heroku main
```

### Step 5: Test Production

1. **Health Check**
   ```
   https://your-app.com/api/health
   ```

2. **Test API**
   ```
   POST https://your-app.com/api/users/register
   GET https://your-app.com/api/doctors
   ```

3. **Test Frontend**
   ```
   https://your-app.com/index.html
   ```

---

## Environment Variables Checklist

### Required (Production)
- ✅ `NODE_ENV=production`
- ✅ `MONGODB_URI=mongodb+srv://...`
- ✅ `JWT_SECRET=your_strong_random_string`
- ✅ `PORT=5000` (or auto-assigned)

### Recommended
- 🎯 `JWT_EXPIRE=7d`
- 🎯 `SMTP_HOST=smtp.gmail.com`
- 🎯 `SMTP_USER=your_email@gmail.com`
- 🎯 `CORS_ORIGIN=https://your-domain.com`

### Optional
- 📝 `FRONTEND_URL=https://your-domain.com`
- 📝 `ADMIN_EMAIL=admin@example.com`

---

## Your Production URLs

Once deployed, you'll get URLs like:

```
🌐 Frontend: https://hospital-app-prod-xxxxx.railway.app
📡 Backend API: https://hospital-api-prod-xxxxx.railway.app
📊 Admin Panel: https://hospital-app-prod-xxxxx.railway.app/admin-login.html
👨‍⚕️ Doctor Portal: https://hospital-app-prod-xxxxx.railway.app/doctor-login.html
👤 Patient Portal: https://hospital-app-prod-xxxxx.railway.app/user-login.html
```

---

## Share Your Live Application

After deployment, share:

**Share your live link:**
```
🏥 Hospital Appointment System
👉 https://your-app-name.railway.app

✨ Features:
- Patient Appointment Booking
- Doctor Management
- Admin Dashboard
- Real-time Analytics
- Government Hospital Tracker (Tamil Nadu)
```

---

## Troubleshooting

### App Won't Start
```
Check logs:
- Railway: View in dashboard
- Render: Check Logs tab
- Heroku: heroku logs --tail
```

### Database Connection Error
```
✅ MongoDB Atlas is running
✅ IP is whitelisted (allow 0.0.0.0/0)
✅ Connection string is correct
✅ Username/password are correct
```

### CORS Errors
```
Update server.js:
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
```

### Static Files Not Serving
```
Ensure server.js has:
app.use(express.static(path.join(__dirname, '../')));
```

---

## Security Checklist

Before going live:

- ✅ Change `JWT_SECRET` to a strong random string
- ✅ Use HTTPS only (automatically provided by platforms)
- ✅ Set `NODE_ENV=production`
- ✅ Enable CORS for your domain only
- ✅ Restrict MongoDB access to app servers
- ✅ Use strong admin passwords
- ✅ Enable email verification for users
- ✅ Set up HTTPS certificates (auto-provided)

---

## Next Steps

1. Choose a deployment platform
2. Set up MongoDB Atlas
3. Create environment variables
4. Deploy code
5. Test all endpoints
6. Share your live link!

---

## Need Help?

- **Railway Support:** https://docs.railway.app
- **Render Support:** https://render.com/docs
- **Heroku Support:** https://devcenter.heroku.com
- **MongoDB Support:** https://docs.mongodb.com/atlas

---

**Happy Deploying! 🚀**
