# Hospital Appointment System - Quick Start Guide

Get the system running in 5 minutes!

## ⚡ Prerequisites

Make sure you have installed:
- **Node.js** (14+) - Download from https://nodejs.org
- **MongoDB** (4.0+) - Download from https://mongodb.com or use MongoDB Atlas

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (1 minute)

```powershell
cd "c:\Users\meera\Hospital App"
npm install
```

Wait for installation to complete.

### Step 2: Start MongoDB (30 seconds)

**Option A: Local MongoDB**
```powershell
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create free account at https://mongodb.com/cloud/atlas
- Copy connection string to `.env` file as `MONGODB_URI`

### Step 3: Configure Environment (30 seconds)

Edit `.env` file in project root:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hospital_appointments
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
```

### Step 4: Seed Sample Data (1 minute)

```powershell
npm run seed
```

This creates:
- 3 sample patients
- 6 sample doctors
- 6 departments

### Step 5: Start the Server (1 minute)

```powershell
npm run dev
```

Expected output:
```
╔══════════════════════════════════════════╗
║   Hospital Appointment System Started    ║
║   Server running on port 5000            ║
║   Environment: development               ║
╚══════════════════════════════════════════╝
```

## 🌐 Access the Application

Open browser and navigate to:
```
http://localhost:5000
```

## 🔐 Login Credentials

### Patients (From seeded data)
```
Email: rajesh@example.com
Password: Password123
───────────────────────────
Email: priya@example.com
Password: Password123
───────────────────────────
Email: amit@example.com
Password: Password123
```

### Doctors (From seeded data)
```
Email: sandeep@hospital.com          | Specialization: Cardiology
Password: Password123
───────────────────────────────────────────────────────────────
Email: neha@hospital.com             | Specialization: Neurology
Password: Password123
───────────────────────────────────────────────────────────────
Email: arun@hospital.com             | Specialization: Orthopedics
Password: Password123
───────────────────────────────────────────────────────────────
Email: anjali@hospital.com           | Specialization: Pediatrics
Password: Password123
───────────────────────────────────────────────────────────────
Email: rajiv@hospital.com            | Specialization: Dermatology
Password: Password123
───────────────────────────────────────────────────────────────
Email: meera@hospital.com            | Specialization: General Medicine
Password: Password123
```

### Admin
```
Email: admin@hospital.com
Password: admin123
```

## 🧪 Test the Application

### As a Patient:
1. Click "Patient" on landing page
2. Login with `rajesh@example.com` / `Password123`
3. Go to dashboard
4. Select a doctor and book an appointment
5. Pay ₹100 for booking
6. View your appointments

### As a Doctor:
1. Click "Doctor" on landing page
2. Login with `sandeep@hospital.com` / `Password123`
3. Set your availability (working hours, break time)
4. View appointments
5. Update appointment status

### As Admin:
1. Click "Admin" on landing page
2. Login with `admin@hospital.com` / `admin123`
3. View analytics dashboard
4. Manage doctors and departments
5. View all appointments
6. Check revenue reports

## 📊 Test API Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get All Doctors
```bash
curl http://localhost:5000/api/doctors
```

### Get All Departments
```bash
curl http://localhost:5000/api/departments
```

### Get Doctor Reviews
```bash
curl http://localhost:5000/api/reviews/doctor/{doctorId}
```

## 🛑 Stop the Server

Press `Ctrl + C` in terminal where server is running.

## 🔄 Common Commands

```powershell
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start

# Seed database with sample data
npm run seed

# Run tests (if configured)
npm test

# Lint code (if configured)
npm run lint
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env` | Configuration and secrets |
| `index.html` | Landing page |
| `user-login.html` | Patient portal |
| `doctor-login.html` | Doctor portal |
| `admin-login.html` | Admin portal |
| `server/server.js` | Express server |
| `server/models/` | Database schemas |
| `package.json` | Dependencies |

## 🚨 Troubleshooting

### "MongoDB connection failed"
```powershell
# Check if MongoDB is running
mongod.exe --version

# Start MongoDB
mongod
```

### "Port 5000 already in use"
```powershell
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID {PID} /F

# Or use different port in .env
PORT=5001
```

### "npm install fails"
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rmdir /s node_modules
del package-lock.json

# Reinstall
npm install
```

### "API endpoints not working"
- Verify MongoDB is running
- Check .env configuration
- Verify port 5000 is accessible
- Check browser console for errors
- Restart server: `npm run dev`

## 📚 Next Steps

1. **Explore the Code**: Review files in `server/models/` and `server/controllers/`
2. **Read Documentation**: Check `README.md`, `BACKEND_SETUP_GUIDE.md`
3. **Test API**: Use Postman or curl to test endpoints
4. **Modify Data**: Update `.env` configuration as needed
5. **Build Features**: Add new functionality following existing patterns

## 🎓 Key Features to Try

- ✅ Patient appointment booking with ₹100 payment
- ✅ Doctor availability scheduling
- ✅ Real-time form validation
- ✅ Analytics dashboard with 4 charts
- ✅ Payment tracking and revenue reports
- ✅ Doctor reviews and ratings
- ✅ Department management
- ✅ Appointment status tracking

## 📞 Quick Reference

| What | How |
|------|-----|
| Start server | `npm run dev` |
| Seed data | `npm run seed` |
| Access app | `http://localhost:5000` |
| API docs | `BACKEND_SETUP_GUIDE.md` |
| Integration | `API_INTEGRATION_GUIDE.md` |
| Validation | `VALIDATION_GUIDE.md` |

## 💡 Pro Tips

1. **Keep MongoDB running** in a separate terminal
2. **Use different terminals** for server and MongoDB
3. **Check .env file** if API calls fail
4. **Refresh browser** after making changes
5. **Open DevTools (F12)** to check errors
6. **Use Postman** for API testing

## 🎉 You're Ready!

Your hospital appointment system is now running!

### What's Included:
- ✅ 3 user portals (Patient, Doctor, Admin)
- ✅ 50+ API endpoints
- ✅ 5 database models
- ✅ Payment processing (₹100)
- ✅ 4 analytics charts
- ✅ User management
- ✅ Doctor scheduling
- ✅ Appointment tracking

### Next Phase:
When ready to deploy:
1. Set NODE_ENV=production
2. Configure production database
3. Change JWT_SECRET
4. Deploy to Heroku, AWS, or similar
5. Enable HTTPS/SSL

---

**Questions?** Check the documentation files or the code comments.

**Need help?** Refer to:
- `README.md` - Project overview
- `BACKEND_SETUP_GUIDE.md` - Technical setup
- `API_INTEGRATION_GUIDE.md` - API reference
- `PROJECT_SUMMARY.md` - Complete project details

**Happy coding!** 🚀
