# Hospital Appointment System - Backend Setup Guide

## Overview
This guide covers the complete backend implementation of the Hospital Appointment Booking System using Node.js, Express, MongoDB, and Mongoose.

## Prerequisites

- Node.js 14+ installed
- MongoDB 4.0+ installed and running
- npm or yarn package manager
- Postman (for API testing)

## Installation & Setup

### 1. Install Dependencies

```bash
cd "c:\Users\meera\Hospital App"
npm install
```

This will install all packages listed in package.json:
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password encryption
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin requests
- **dotenv**: Environment variables
- And other utilities

### 2. Configure Environment Variables

Edit `.env` file with your settings:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/hospital_appointments

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d

# Other configurations as needed
```

**Important**: Change `JWT_SECRET` in production!

### 3. Start MongoDB

**Windows:**
```bash
mongod
```

**Or with MongoDB as a Service:**
```bash
net start MongoDB
```

### 4. Start the Server

**Development (with auto-restart):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will start at `http://localhost:5000`

## Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   ├── User.js              # Patient schema
│   ├── Doctor.js            # Healthcare provider schema
│   ├── Appointment.js       # Appointment schema
│   ├── Department.js        # Department schema
│   └── Review.js            # Review/Rating schema
├── controllers/
│   ├── userController.js    # User CRUD operations
│   ├── doctorController.js  # Doctor CRUD operations
│   ├── appointmentController.js  # Appointment management
│   ├── departmentController.js   # Department management
│   └── reviewController.js  # Review operations
├── routes/
│   ├── users.js             # User endpoints
│   ├── doctors.js           # Doctor endpoints
│   ├── appointments.js      # Appointment endpoints
│   ├── departments.js       # Department endpoints
│   └── reviews.js           # Review endpoints
└── server.js                # Main Express app
```

## Database Models

### User (Patient) Model
**Fields:**
- Basic: firstName, lastName, email (unique), phone (unique)
- Authentication: password (hashed), isActive, isVerified
- Personal: dateOfBirth, gender, bloodGroup
- Address: street, city, state, zipCode, country
- Emergency Contact: name, phone, relationship
- Medical History: allergies, chronicDiseases, medications, surgeries
- Appointments: array of Appointment IDs
- Timestamps: createdAt, updatedAt, lastLogin

**Methods:**
- `matchPassword(password)`: Verify password using bcryptjs
- Virtual: `fullName` - computed field combining first and last name

### Doctor Model
**Fields:**
- Basic: firstName, lastName, email (unique), phone (unique)
- Professional: licenseNumber (unique), specialization (12 types), qualifications, yearsOfExperience
- Department: ObjectId reference
- Availability:
  - isAvailable (boolean)
  - workingHours (startTime, endTime)
  - breakTime (startTime, endTime)
  - availableDays (array of day names)
  - unavailableDates (array of dates)
- Appointments: array of Appointment IDs
- Ratings: avgRating (0-5), totalReviews, reviews array
- Consultation: consultationFee (default ₹100)
- Clinic: name, address, city, state, phone
- Statistics: totalAppointments, completedAppointments, cancelledAppointments

**Methods:**
- `matchPassword(password)`: Verify password
- `updateAverageRating()`: Calculate average rating from reviews
- Virtual: `fullName` - with "Dr." prefix

### Appointment Model
**Fields:**
- References: patient, doctor, department (ObjectId)
- Date/Time: appointmentDate, appointmentTime, duration (30 min default)
- Consultation: symptoms, diagnosis, prescriptions, notes
- Payment: consultationFee, paymentId, paymentStatus
- Status: scheduled, confirmed, in progress, completed, cancelled, no-show
- Cancellation: cancellationReason, cancelledBy, cancellationDate
- Type: consultationType (In-Person/Online/Phone), videoLink
- Reminder: reminderSent, reminderSentAt
- Follow-up: followUpRequired, followUpDate, followUpNotes
- Timestamps: createdAt, updatedAt, confirmedAt, completedAt

**Methods:**
- `isInPast()`: Check if appointment is in past
- Virtual: `endTime` - calculated from appointment time and duration

### Department Model
**Fields:**
- Basic: name (unique), description, head (Doctor ObjectId)
- Doctors: array of Doctor IDs
- Contact: email, phone
- Location: building, floor, room
- Operating Hours: Mon-Sun with start/end times
- Equipment & Facilities: arrays of strings
- Statistics: totalAppointments, completedAppointments, cancelledAppointments, averageWaitTime
- Ratings: avgRating (0-5), totalReviews
- Specializations: array of specialization types
- Status: isActive, isOpen, isEmergency

**Methods:**
- `updateStatistics()`: Aggregate appointment data
- `getAvailableDoctors()`: Fetch available doctors in department
- Virtuals: `doctorCount`, `cancellationRate`, `completionRate`

### Review Model
**Fields:**
- References: doctor, patient, appointment, department (ObjectId)
- Rating: rating (1-5, required)
- Content: title, comment (required)
- Categories: doctorBehavior (1-5), facilityQuality (1-5), recommendedDoctor, recommendedHospital
- Moderation: isVerified, isApproved
- Votes: helpfulCount, unhelpfulCount
- Timestamps: createdAt, updatedAt

**Constraints:**
- One review per patient per doctor (unique index on doctor + patient)
- Automatically updates doctor's avgRating on save/delete

## API Endpoints

### User Endpoints
```
POST   /api/users/register              # Register new patient
POST   /api/users/login                 # Login patient
GET    /api/users/:id                   # Get profile
PUT    /api/users/:id                   # Update profile
PUT    /api/users/:id/change-password   # Change password
GET    /api/users                       # Get all users (Admin)
DELETE /api/users/:id                   # Delete account
```

### Doctor Endpoints
```
POST   /api/doctors/register            # Register new doctor
POST   /api/doctors/login               # Login doctor
GET    /api/doctors/:id                 # Get doctor profile
PUT    /api/doctors/:id                 # Update profile
PUT    /api/doctors/:id/availability    # Update availability
GET    /api/doctors/:id/appointments    # Get doctor's appointments
GET    /api/doctors                     # List all doctors (with filters)
GET    /api/admin/doctors               # Get all doctors (Admin)
DELETE /api/doctors/:id                 # Delete doctor (Admin)
```

### Appointment Endpoints
```
POST   /api/appointments                # Create appointment
GET    /api/appointments/:id            # Get appointment details
GET    /api/appointments/user/:userId   # Get user's appointments
PUT    /api/appointments/:id            # Update appointment
PUT    /api/appointments/:id/cancel     # Cancel appointment
PUT    /api/appointments/:id/complete   # Complete appointment
GET    /api/appointments                # Get all appointments (Admin)
GET    /api/appointments/stats          # Get statistics (Admin)
```

### Department Endpoints
```
POST   /api/departments                         # Create department (Admin)
GET    /api/departments                         # List all departments
GET    /api/departments/:id                     # Get department details
PUT    /api/departments/:id                     # Update department (Admin)
DELETE /api/departments/:id                     # Delete department (Admin)
GET    /api/departments/:id/stats               # Get statistics
PUT    /api/departments/:id/add-doctor/:doctorId      # Add doctor (Admin)
PUT    /api/departments/:id/remove-doctor/:doctorId   # Remove doctor (Admin)
```

### Review Endpoints
```
POST   /api/reviews                      # Create review
GET    /api/reviews/:id                  # Get review
GET    /api/reviews/doctor/:doctorId    # Get doctor's reviews
PUT    /api/reviews/:id                  # Update review
PUT    /api/reviews/:id/helpful         # Mark as helpful
GET    /api/reviews                      # Get all reviews (Admin)
PUT    /api/reviews/:id/approve         # Approve review (Admin)
DELETE /api/reviews/:id                  # Delete review
```

## Authentication

### JWT Token Flow

1. **Register/Login**: User receives JWT token
2. **Store Token**: Client stores token (localStorage/sessionStorage)
3. **Send Token**: Client includes token in Authorization header
   ```
   Authorization: Bearer <token>
   ```
4. **Token Verification**: Middleware checks token validity
5. **Access Granted**: Licensed to access protected routes

### Specializations Supported
- Cardiology
- Neurology
- Orthopedics
- Pediatrics
- Dermatology
- General Medicine
- Oncology
- Dental
- Psychiatry
- Internal Medicine
- Surgery
- Gynecology

## Common API Request Examples

### Register Patient
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "Password123",
    "passwordConfirm": "Password123",
    "dateOfBirth": "1990-01-15",
    "gender": "Male",
    "bloodGroup": "O+"
  }'
```

### Login Patient
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Create Appointment
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "patientId": "user_id",
    "doctorId": "doctor_id",
    "departmentId": "dept_id",
    "appointmentDate": "2024-12-25",
    "appointmentTime": "14:30",
    "symptoms": "Chest pain and shortness of breath"
  }'
```

### Get Doctor Reviews
```bash
curl http://localhost:5000/api/reviews/doctor/doctor_id?page=1&limit=10
```

## Error Handling

Standard error response structure:
```json
{
  "status": "error",
  "message": "Error description"
}
```

### Common Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad request (validation error)
- **401**: Unauthorized (invalid credentials)
- **404**: Not found
- **409**: Conflict (duplicate entry)
- **500**: Server error

## Validation Rules

### User Fields
- **Email**: Valid email format (regex validated)
- **Phone**: Exactly 10 digits
- **Password**: Minimum 6 characters
- **FirstName/LastName**: 2-50 characters
- **Gender**: Male, Female, or Other
- **BloodGroup**: O+, O-, A+, A-, B+, B-, AB+, AB-

### Doctor Fields
- **LicenseNumber**: Required and unique
- **Specialization**: Must be from 12 predefined types
- **YearsOfExperience**: 0-70 range
- **Phone**: 10 digits
- **ConsultationFee**: Minimum 0 (default ₹100)

### Appointment Fields
- **AppointmentDate**: Must be in future
- **AppointmentTime**: HH:MM format
- **Symptoms**: 5-500 characters
- **Status**: Scheduled, Confirmed, Completed, Cancelled, No-Show

### Review Fields
- **Rating**: 1-5 (required)
- **Comment**: 10-1000 characters
- **DoctorBehavior/FacilityQuality**: Optional 1-5 scale

## Testing the API

### Using Postman
1. Import API collection (create REST requests)
2. Set Authorization header with token
3. Test each endpoint
4. Verify response status and data

### Using cURL
```bash
# Test API health
curl http://localhost:5000/api/health

# Get all departments
curl http://localhost:5000/api/departments

# Get doctors by specialization
curl "http://localhost:5000/api/doctors?specialization=Cardiology"
```

## Troubleshooting

### MongoDB Connection Failed
- Check MongoDB is running: `mongod`
- Verify connection string in .env
- Check user credentials if authentication enabled

### Port Already in Use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### JWT Token Invalid
- Ensure token is not expired
- Check JWT_SECRET matches in .env
- Verify Authorization header format

### Validation Errors
- Review error message for specific field
- Check field format and constraints
- Ensure required fields are provided

## Performance Considerations

### Database Indexes
Indexes created on frequently queried fields:
- User: email, phone, createdAt
- Doctor: email, phone, licenseNumber, specialization, department, avgRating, createdAt
- Appointment: patient, doctor, appointmentDate, status, createdAt
- Department: name, head, isActive, avgRating, createdAt
- Review: doctor + patient (unique), doctor, createdAt, rating, isApproved

### Best Practices
1. Use pagination for list endpoints (limit 10-100 items)
2. Implement caching for frequently accessed data
3. Use database transactions for critical operations
4. Monitor API response times
5. Log all errors for debugging

## Deployment

### Prerequisites
- Server with Node.js runtime
- MongoDB instance (local or cloud)
- Environment variables configured
- SSL certificate for HTTPS

### Steps
1. Clone repository
2. Install dependencies: `npm install`
3. Configure .env for production
4. Set NODE_ENV=production
5. Start server: `npm start`

### Recommended Hosting
- **Database**: MongoDB Atlas (cloud)
- **Server**: Heroku, AWS, DigitalOcean, Azure
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront

## Support & Resources

- Express.js Documentation: https://expressjs.com
- Mongoose Documentation: https://mongoosejs.com
- MongoDB Documentation: https://docs.mongodb.com
- JWT Guide: https://jwt.io

## Future Enhancements

- [ ] Email notifications (appointment confirmations, reminders)
- [ ] SMS notifications via Twilio
- [ ] Video consultation integration
- [ ] Payment gateway integration (Razorpay, Stripe)
- [ ] Admin dashboard analytics
- [ ] Doctor availability auto-sync
- [ ] Mobile app API
- [ ] WebSocket for real-time notifications
- [ ] Multi-language support
- [ ] HIPAA compliance for healthcare data

---

**Last Updated**: 2024
**Version**: 1.0.0
