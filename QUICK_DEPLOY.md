# 🏥 QUICK DEPLOYMENT SCRIPT

## One-Click Deployment to Railway.app (Recommended)

This script guides you through deploying the Hospital Appointment System to production.

## Prerequisites

- Git installed: https://git-scm.com
- GitHub account: https://github.com
- Railway.app account: https://railway.app

## Quick Steps

### Step 1: Prepare Your Code

```bash
# Navigate to project directory
cd "c:\Users\meera\Hospital App"

# Initialize Git (if not already done)
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `hospital-appointment-system`
3. Description: "Hospital Appointment Booking System"
4. Make it Public
5. Click "Create Repository"
6. Copy the repository URL

### Step 3: Push Code to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit - Hospital Appointment System v1.0"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/hospital-appointment-system.git

# Set branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Deploy to Railway.app

1. **Go to https://railway.app**
2. **Sign up or login** (use GitHub for easier authentication)
3. **Create New Project** → "Deploy from GitHub"
4. **Connect your GitHub account** and authorize Railway
5. **Select your repository**: `hospital-appointment-system`
6. **Railway automatically detects Node.js** and deploys

### Step 5: Add MongoDB

1. In Railway dashboard, click **"Add Service"**
2. Select **"MongoDB"**
3. Railway automatically configures `MONGODB_URI` variable

### Step 6: Configure Environment Variables

In Railway project settings, go to **Variables** and add:

```
NODE_ENV=production
JWT_SECRET=generate_a_random_secure_string_here_change_this
JWT_EXPIRE=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CORS_ORIGIN=https://your-deployed-url.railway.app
```

### Step 7: Get Your Live URL

- Railway automatically generates a URL like: `https://hospital-app-prod-xxxxx.railway.app`
- Your application is LIVE! 🎉

### Step 8: Custom Domain (Optional)

1. In Railway settings, click **"Domain"**
2. Add your custom domain
3. Point DNS to Railway nameservers

---

## Testing Your Deployment

After deployment, test these endpoints:

```bash
# Health Check
curl https://your-app-url.railway.app/api/health

# List Doctors
curl https://your-app-url.railway.app/api/doctors

# Frontend
Open browser to: https://your-app-url.railway.app
```

---

## Share Your Live Application

**Share this link:**
```
🏥 Hospital Appointment System
Visit: https://your-deployed-url.railway.app

✨ Features:
✓ Patient Appointment Booking
✓ Doctor Management Portal
✓ Admin Dashboard
✓ Real-time Analytics
✓ Tamil Nadu Government Hospital Tracker
✓ Payment Integration
```

---

## Troubleshooting

### App won't start?
- Check Railway logs (Click "Logs" in dashboard)
- Ensure `package.json` has correct start script
- Verify MongoDB connexion

### Can't access database?
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check `MONGODB_URI` variable is set

### Files not loading?
- Check static files route in server.js
- Ensure files are in root directory
- Refresh browser cache (Ctrl+Shift+Delete)

---

## Free Resources Used

✅ **Railway.app** - Free tier: Perfect for this app
✅ **MongoDB Atlas** - Free: 5GB storage
✅ **GitHub** - Free: Code hosting

**Total Cost: $0** (with Railway free tier)

---

## Need a Simpler Option?

### Alternative: Deploy to Render.com

1. Go to https://render.com
2. Click "New Web Service"
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add MongoDB Atlas URI
7. Deploy automatically deploys on git push

---

## Next Steps After Deployment

1. ✅ Share your live link with users
2. ✅ Configure custom domain
3. ✅ Set up monitoring/alerts
4. ✅ Enable backups for MongoDB
5. ✅ Monitor application logs

---

**Your hospital appointment system is now live! 🚀**

Questions? Check DEPLOYMENT_GUIDE.md for detailed instructions.
