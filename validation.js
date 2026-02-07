/**
 * Hospital Appointment System - Form Validation Script
 * Comprehensive validation for all user forms and inputs
 */

// ============================================
// EMAIL VALIDATION
// ============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// PASSWORD VALIDATION
// ============================================
function isValidPassword(password) {
    // Password must be at least 6 characters
    if (password.length < 6) {
        return {
            valid: false,
            message: 'Password must be at least 6 characters long'
        };
    }
    return { valid: true, message: 'Password is valid' };
}

// ============================================
// PHONE NUMBER VALIDATION
// ============================================
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return phoneRegex.test(cleanPhone);
}

// ============================================
// NAME VALIDATION
// ============================================
function isValidName(name) {
    if (name.trim().length < 3) {
        return {
            valid: false,
            message: 'Name must be at least 3 characters long'
        };
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
        return {
            valid: false,
            message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
        };
    }
    return { valid: true, message: 'Name is valid' };
}

// ============================================
// DATE VALIDATION
// ============================================
function isValidAppointmentDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate <= today) {
        return {
            valid: false,
            message: 'Please select a future date for your appointment'
        };
    }
    
    // Check if date is not more than 30 days in future
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    
    if (selectedDate > maxDate) {
        return {
            valid: false,
            message: 'Appointments can only be booked up to 30 days in advance'
        };
    }
    
    return { valid: true, message: 'Date is valid' };
}

// ============================================
// FORM VALIDATION - PATIENT LOGIN
// ============================================
function validatePatientLogin(email, password) {
    const errors = [];
    
    if (!email.trim()) {
        errors.push('Email address is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!password) {
        errors.push('Password is required');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ============================================
// FORM VALIDATION - PATIENT REGISTRATION
// ============================================
function validatePatientRegistration(name, email, phone, password) {
    const errors = [];
    
    // Name validation
    if (!name.trim()) {
        errors.push('Full name is required');
    } else {
        const nameValidation = isValidName(name);
        if (!nameValidation.valid) {
            errors.push(nameValidation.message);
        }
    }
    
    // Email validation
    if (!email.trim()) {
        errors.push('Email address is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    if (!phone.trim()) {
        errors.push('Phone number is required');
    } else if (!isValidPhone(phone)) {
        errors.push('Please enter a valid 10-digit phone number');
    }
    
    // Password validation
    if (!password) {
        errors.push('Password is required');
    } else {
        const passwordValidation = isValidPassword(password);
        if (!passwordValidation.valid) {
            errors.push(passwordValidation.message);
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ============================================
// FORM VALIDATION - DOCTOR LOGIN
// ============================================
function validateDoctorLogin(email, password) {
    const errors = [];
    
    if (!email.trim()) {
        errors.push('Email address is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!password) {
        errors.push('Password is required');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ============================================
// FORM VALIDATION - DOCTOR REGISTRATION
// ============================================
function validateDoctorRegistration(name, email, specialization, phone, password) {
    const errors = [];
    
    // Name validation
    if (!name.trim()) {
        errors.push('Full name is required');
    } else {
        const nameValidation = isValidName(name);
        if (!nameValidation.valid) {
            errors.push(nameValidation.message);
        }
    }
    
    // Email validation
    if (!email.trim()) {
        errors.push('Email address is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Specialization validation
    if (!specialization) {
        errors.push('Please select a specialization');
    }
    
    // Phone validation
    if (!phone.trim()) {
        errors.push('Phone number is required');
    } else if (!isValidPhone(phone)) {
        errors.push('Please enter a valid 10-digit phone number');
    }
    
    // Password validation
    if (!password) {
        errors.push('Password is required');
    } else {
        const passwordValidation = isValidPassword(password);
        if (!passwordValidation.valid) {
            errors.push(passwordValidation.message);
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ============================================
// FORM VALIDATION - ADMIN LOGIN
// ============================================
function validateAdminLogin(email, password) {
    const errors = [];
    
    if (!email.trim()) {
        errors.push('Email address is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!password) {
        errors.push('Password is required');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ============================================
// FORM VALIDATION - APPOINTMENT BOOKING
// ============================================
function validateAppointmentBooking(department, doctor, date, time, symptoms) {
    const errors = [];
    
    if (!department) {
        errors.push('Please select a department');
    }
    
    if (!doctor) {
        errors.push('Please select a doctor');
    }
    
    if (!date) {
        errors.push('Please select an appointment date');
    } else {
        const dateValidation = isValidAppointmentDate(date);
        if (!dateValidation.valid) {
            errors.push(dateValidation.message);
        }
    }
    
    if (!time) {
        errors.push('Please select a time slot');
    }
    
    if (!symptoms.trim()) {
        errors.push('Please provide your symptoms or reason for visit');
    } else if (symptoms.trim().length < 5) {
        errors.push('Please provide more details about your symptoms');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ============================================
// FORM VALIDATION - ADD DOCTOR
// ============================================
function validateAddDoctor(name, email, department, experience, qualification) {
    const errors = [];
    
    if (!name.trim()) {
        errors.push('Doctor name is required');
    } else {
        const nameValidation = isValidName(name);
        if (!nameValidation.valid) {
            errors.push(nameValidation.message);
        }
    }
    
    if (!email.trim()) {
        errors.push('Email address is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!department) {
        errors.push('Please select a department');
    }
    
    if (!experience) {
        errors.push('Years of experience is required');
    } else if (isNaN(experience) || experience < 0 || experience > 70) {
        errors.push('Please enter a valid years of experience (0-70)');
    }
    
    if (!qualification.trim()) {
        errors.push('Qualification is required');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ============================================
// FORM VALIDATION - ADD DEPARTMENT
// ============================================
function validateAddDepartment(name, head, description) {
    const errors = [];
    
    if (!name.trim()) {
        errors.push('Department name is required');
    } else if (name.trim().length < 3) {
        errors.push('Department name must be at least 3 characters long');
    }
    
    if (!head.trim()) {
        errors.push('Department head is required');
    } else {
        const headValidation = isValidName(head);
        if (!headValidation.valid) {
            errors.push('Invalid department head name');
        }
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ============================================
// DISPLAY VALIDATION ERROR MESSAGES
// ============================================
function displayErrors(errors) {
    if (errors.length === 0) return '';
    
    const errorMessage = errors.join('\n• ');
    return '• ' + errorMessage;
}

// ============================================
// SHOW ERROR ALERT
// ============================================
function showErrorAlert(title, errors) {
    if (errors.length === 0) return false;
    
    alert(`${title}:\n\n${displayErrors(errors)}`);
    return true;
}

// ============================================
// REAL-TIME VALIDATION - EMAIL
// ============================================
function validateEmailField(inputElement) {
    const email = inputElement.value.trim();
    
    if (!email) {
        inputElement.classList.remove('valid', 'invalid');
        return;
    }
    
    if (isValidEmail(email)) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
    } else {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
    }
}

// ============================================
// REAL-TIME VALIDATION - PASSWORD
// ============================================
function validatePasswordField(inputElement) {
    const password = inputElement.value;
    const validation = isValidPassword(password);
    
    if (!password) {
        inputElement.classList.remove('valid', 'invalid');
        return;
    }
    
    if (validation.valid) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
    } else {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
    }
}

// ============================================
// REAL-TIME VALIDATION - PHONE
// ============================================
function validatePhoneField(inputElement) {
    const phone = inputElement.value.trim();
    
    if (!phone) {
        inputElement.classList.remove('valid', 'invalid');
        return;
    }
    
    if (isValidPhone(phone)) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
    } else {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
    }
}

// ============================================
// REAL-TIME VALIDATION - NAME
// ============================================
function validateNameField(inputElement) {
    const name = inputElement.value.trim();
    
    if (!name) {
        inputElement.classList.remove('valid', 'invalid');
        return;
    }
    
    const validation = isValidName(name);
    if (validation.valid) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
    } else {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
    }
}

// ============================================
// ATTACH EVENT LISTENERS FOR REAL-TIME VALIDATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Email field validation
    const emailFields = document.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateEmailField(this);
        });
        field.addEventListener('input', function() {
            validateEmailField(this);
        });
    });
    
    // Password field validation
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        field.addEventListener('blur', function() {
            validatePasswordField(this);
        });
    });
    
    // Phone field validation
    const phoneFields = document.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        field.addEventListener('blur', function() {
            validatePhoneField(this);
        });
        field.addEventListener('input', function() {
            validatePhoneField(this);
        });
    });
    
    // Name field validation
    const nameFields = document.querySelectorAll('input[type="text"]');
    nameFields.forEach(field => {
        if (field.id && field.id.toLowerCase().includes('name')) {
            field.addEventListener('blur', function() {
                validateNameField(this);
            });
        }
    });
});

// ============================================
// EXPORT FOR USE IN FORMS
// ============================================
// Functions are globally available for use in HTML form onsubmit handlers
