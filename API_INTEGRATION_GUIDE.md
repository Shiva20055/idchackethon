# API Integration Guide - Hospital Appointment System

This guide shows how to integrate your frontend applications with the backend API endpoints.

## 🔑 Authentication

All protected endpoints require a JWT token in the Authorization header:

```javascript
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};
```

Store token after login/register (localStorage):
```javascript
localStorage.setItem('token', response.token);
```

Retrieve token for API calls:
```javascript
const token = localStorage.getItem('token');
```

## 👤 User (Patient) API Integration

### 1. Register Patient

**Frontend Code:**
```javascript
async function registerPatient(formData) {
    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                bloodGroup: formData.bloodGroup
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            // Store token
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id);
            window.location.href = 'user-dashboard.html';
        } else {
            alert('Registration failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 2. Login Patient

```javascript
async function loginPatient(email, password) {
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id);
            window.location.href = 'user-dashboard.html';
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 3. Get Patient Profile

```javascript
async function getUserProfile(userId) {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            console.log('User Profile:', data.user);
            return data.user;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 4. Update Patient Profile

```javascript
async function updatePatientProfile(userId, updates) {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updates)
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            alert('Profile updated successfully');
            return data.user;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

## 👨‍⚕️ Doctor API Integration

### 1. Register Doctor

```javascript
async function registerDoctor(formData) {
    try {
        const response = await fetch('http://localhost:5000/api/doctors/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm,
                licenseNumber: formData.licenseNumber,
                specialization: formData.specialization,
                yearsOfExperience: formData.yearsOfExperience
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            localStorage.setItem('token', data.token);
            localStorage.setItem('doctorId', data.doctor.id);
            window.location.href = 'doctor-dashboard.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 2. Get All Doctors (with filters)

```javascript
async function getAllDoctors(filters = {}) {
    try {
        // Build query string
        const params = new URLSearchParams();
        if (filters.specialization) params.append('specialization', filters.specialization);
        if (filters.department) params.append('department', filters.department);
        if (filters.isAvailable) params.append('isAvailable', 'true');

        const response = await fetch(
            `http://localhost:5000/api/doctors?${params.toString()}`,
            { method: 'GET' }
        );

        const data = await response.json();
        
        if (data.status === 'success') {
            return data.doctors;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 3. Get Single Doctor Details

```javascript
async function getDoctorDetails(doctorId) {
    try {
        const response = await fetch(
            `http://localhost:5000/api/doctors/${doctorId}`,
            { method: 'GET' }
        );

        const data = await response.json();
        
        if (data.status === 'success') {
            return data.doctor;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 4. Update Doctor Availability

```javascript
async function updateDoctorAvailability(doctorId, availability) {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(
            `http://localhost:5000/api/doctors/${doctorId}/availability`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    isAvailable: availability.isAvailable,
                    workingHours: availability.workingHours,
                    breakTime: availability.breakTime,
                    availableDays: availability.availableDays
                })
            }
        );

        const data = await response.json();
        
        if (data.status === 'success') {
            alert('Availability updated');
            return data.availability;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

## 📅 Appointment API Integration

### 1. Create Appointment (with ₹100 payment)

```javascript
async function createAppointment(appointmentData) {
    const token = localStorage.getItem('token');
    
    try {
        // Create appointment
        const response = await fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                patientId: appointmentData.patientId,
                doctorId: appointmentData.doctorId,
                departmentId: appointmentData.departmentId,
                appointmentDate: appointmentData.appointmentDate,
                appointmentTime: appointmentData.appointmentTime,
                symptoms: appointmentData.symptoms
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            const appointment = data.appointment;
            
            // Record payment (₹100)
            const payment = {
                orderId: `ORD-${Date.now()}`,
                amount: 100,
                currency: 'INR',
                appointmentId: appointment._id,
                patientEmail: appointmentData.patientEmail,
                status: 'Completed',
                timestamp: new Date().toISOString()
            };
            
            // Store payment locally
            let payments = JSON.parse(localStorage.getItem('payments') || '[]');
            payments.push(payment);
            localStorage.setItem('payments', JSON.stringify(payments));
            
            alert(`Appointment booked! Order ID: ${payment.orderId}`);
            return appointment;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 2. Get Patient's Appointments

```javascript
async function getUserAppointments(userId) {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(
            `http://localhost:5000/api/appointments/user/${userId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const data = await response.json();
        
        if (data.status === 'success') {
            return data.appointments;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 3. Cancel Appointment

```javascript
async function cancelAppointment(appointmentId, reason) {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(
            `http://localhost:5000/api/appointments/${appointmentId}/cancel`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    cancellationReason: reason,
                    cancelledBy: 'Patient'
                })
            }
        );

        const data = await response.json();
        
        if (data.status === 'success') {
            alert('Appointment cancelled');
            return data.appointment;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

## 🏥 Department API Integration

### 1. Get All Departments

```javascript
async function getAllDepartments(filters = {}) {
    try {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        
        const response = await fetch(
            `http://localhost:5000/api/departments?${params.toString()}`,
            { method: 'GET' }
        );

        const data = await response.json();
        
        if (data.status === 'success') {
            return data.departments;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 2. Get Department Details with Stats

```javascript
async function getDepartmentDetails(departmentId) {
    try {
        const response = await fetch(
            `http://localhost:5000/api/departments/${departmentId}`,
            { method: 'GET' }
        );

        const data = await response.json();
        
        if (data.status === 'success') {
            return data.department;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

## ⭐ Review API Integration

### 1. Create Review for Doctor

```javascript
async function createReview(reviewData) {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                doctorId: reviewData.doctorId,
                patientId: reviewData.patientId,
                appointmentId: reviewData.appointmentId,
                rating: reviewData.rating,
                title: reviewData.title,
                comment: reviewData.comment,
                doctorBehavior: reviewData.doctorBehavior,
                facilityQuality: reviewData.facilityQuality
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            alert('Review submitted successfully');
            return data.review;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### 2. Get Doctor Reviews

```javascript
async function getDoctorReviews(doctorId, page = 1) {
    try {
        const response = await fetch(
            `http://localhost:5000/api/reviews/doctor/${doctorId}?page=${page}&limit=10`,
            { method: 'GET' }
        );

        const data = await response.json();
        
        if (data.status === 'success') {
            return {
                reviews: data.reviews,
                averages: data.averages,
                total: data.total
            };
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

## 🔧 Helper Functions

### Get Auth Token

```javascript
function getAuthToken() {
    return localStorage.getItem('token');
}
```

### Check if Logged In

```javascript
function isLoggedIn() {
    return !!localStorage.getItem('token');
}
```

### Logout

```javascript
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('doctorId');
    window.location.href = 'index.html';
}
```

### Redirect if Not Authenticated

```javascript
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
    }
}
```

### API Base URL Configuration

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Use like:
const response = await fetch(`${API_BASE_URL}/doctors`);
```

## 📊 Payment Integration Example

```javascript
// After successful appointment booking
async function processPayment(appointmentId, amount = 100) {
    const payment = {
        orderId: `ORD-${Date.now()}`,
        appointmentId: appointmentId,
        amount: amount,
        currency: 'INR',
        status: 'Completed',
        timestamp: new Date().toISOString(),
        patientEmail: localStorage.getItem('userEmail')
    };
    
    // Store in localStorage (for now)
    let payments = JSON.parse(localStorage.getItem('payments') || '[]');
    payments.push(payment);
    localStorage.setItem('payments', JSON.stringify(payments));
    
    console.log('Payment recorded:', payment);
    return payment;
}
```

## 🚨 Error Handling

```javascript
async function handleApiError(response) {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API Error');
    }
    return response;
}

// Usage:
try {
    const response = await fetch(url);
    await handleApiError(response);
    const data = await response.json();
} catch (error) {
    console.error('Error:', error.message);
}
```

## ✅ Integration Checklist

- [ ] Set up API_BASE_URL constant
- [ ] Implement token storage/retrieval
- [ ] Add auth guards to protected pages
- [ ] Implement all 5 endpoint categories
- [ ] Add error handling
- [ ] Test all CRUD operations
- [ ] Verify payment recording
- [ ] Test pagination
- [ ] Handle edge cases
- [ ] Add loading states to UI
- [ ] Implement logout functionality
- [ ] Test admin features

## 🧪 Testing with Curl

```bash
# Register patient
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"Test",
    "lastName":"User",
    "email":"test@example.com",
    "phone":"9999999999",
    "password":"Pass123",
    "passwordConfirm":"Pass123",
    "dateOfBirth":"1990-01-01",
    "gender":"Male",
    "bloodGroup":"O+"
  }'

# Get all doctors
curl http://localhost:5000/api/doctors

# Get departments
curl http://localhost:5000/api/departments
```

## 📝 Environment Variables for Frontend

```javascript
// Create a config.js file
const CONFIG = {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    JWT_STORAGE_KEY: 'token',
    USER_ID_KEY: 'userId',
    DOCTOR_ID_KEY: 'doctorId'
};

export default CONFIG;
```

## 🔐 Security Tips

1. **Never expose API keys** in frontend code
2. **Use HTTPS** in production
3. **Validate input** before sending to API
4. **Store tokens securely** (consider httpOnly cookies)
5. **Implement CSRF protection**
6. **Set proper CORS headers**
7. **Rate limit requests**
8. **Sanitize user input**

---

For more details, refer to BACKEND_SETUP_GUIDE.md
