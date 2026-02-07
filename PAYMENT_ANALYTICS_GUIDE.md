# Hospital Appointment System - Payment & Analytics Guide

## Overview

The Hospital Appointment System now includes a comprehensive payment processing system and advanced analytics with linear charts to track system usage, doctor availability, and revenue collection.

## Payment System

### Booking Fee: ₹100

Every appointment booking incurs a one-time consultation fee of **₹100 (100 Indian Rupees)**.

### Payment Processing Flow

1. **Patient Initiates Booking**
   - Patient selects department, doctor, date, and time
   - Patient provides symptoms/reason for visit
   - Patient reviews booking fee of ₹100

2. **Payment Processing**
   - On form submission, payment of ₹100 is processed
   - Payment record is created with unique Order ID
   - Payment is marked as "Completed"

3. **Confirmation**
   - Patient receives payment confirmation with Order ID
   - Appointment is confirmed
   - Payment and appointment data saved to localStorage

### Payment Record Structure

```javascript
{
    orderId: "ORD-1707319456789",           // Unique order identifier
    amount: 100,                             // Amount in rupees
    currency: "INR",                         // Indian rupees
    description: "Hospital Appointment Booking - Dr. Name",
    status: "Completed",                     // Payment status
    timestamp: "2/7/2026 3:45:30 PM",        // Date and time
    patientEmail: "patient@email.com"        // Patient email
}
```

### Payment Data Storage

- Payments stored in `localStorage` with key: `payments`
- Each booking automatically creates a payment record
- Payment records linked to appointment via `paymentId`
- Historical payment data maintained for reporting

## Analytics Dashboard

### Access Analytics

**For Admins:**
1. Login to Admin Dashboard
2. Click "📈 Analytics" in sidebar
3. View comprehensive charts and reports

### Chart Types: Linear Charts

All charts use HTML5 Canvas with Chart.js library displaying **Line Graph** format for trend analysis.

#### 1. User Growth Chart

**Title:** User Growth Chart  
**Type:** Linear Chart  
**Data Displayed:**
- Active Users (over 5 weeks)
- Admin count

**Colors:**
- Users: Purple (#667eea) line
- Admins: Red (#EB5757) line

**Purpose:** Shows growth of active users and admin count over time

**Data Points:**
```
Week 1: 5 users
Week 2: 12 users
Week 3: 18 users
Week 4: 25 users
Week 5: 32 users
Admins: 1 (constant)
```

#### 2. Doctor Availability Status

**Title:** Doctor Availability Status  
**Type:** Linear Chart  
**Data Displayed:**
- Available Doctors (green)
- Unavailable Doctors (red)

**Purpose:** Shows real-time doctor availability for appointment booking

**Data Calculation:**
```javascript
totalDoctors = 12
availableDoctors = totalDoctors / 2 = 6
unavailableDoctors = totalDoctors / 2 = 6
```

**Update Trigger:** Refreshes when doctors set/update availability

#### 3. Monthly Appointments

**Title:** Monthly Appointments  
**Type:** Linear Chart  
**Data Displayed:**
- Monthly appointment count (Jan-Jun)
- Current month shows actual appointments

**Purpose:** Tracks booking trends over months

**Data:**
```
January: 8 appointments
February: 12 appointments
March: 15 appointments
April: 22 appointments
May: 25 appointments
June: [Current bookings count]
```

#### 4. Revenue Collection

**Title:** Revenue Collection  
**Type:** Linear Chart  
**Data Displayed:**
- Weekly revenue in rupees

**Purpose:** Tracks income from ₹100 booking fees

**Formula:** `Weekly Revenue = Number of Bookings × ₹100`

**Data:**
```
Week 1: ₹500 (5 bookings)
Week 2: ₹1,200 (12 bookings)
Week 3: ₹1,800 (18 bookings)
Week 4: ₹2,200 (22 bookings)
Week 5: ₹[Current Total] (calculated from payments)
```

## Payment Management Dashboard

### Access Payments

**For Admins:**
1. Login to Admin Dashboard
2. Click "💳 Payments" in sidebar
3. View payment statistics and transaction history

### Payment Statistics

Displays three key metrics:

1. **Total Revenue**
   - Formula: `Total Payments × ₹100`
   - Updates automatically when new booking made
   - Example: 25 bookings = ₹2,500

2. **Total Transactions**
   - Count of all completed payments
   - Increments with each booking
   - Example: 25 transactions

3. **Booking Fee**
   - Fixed at ₹100 per appointment
   - Static value for reference

### Payment Transactions Table

Displays detailed payment history:

| Column | Description |
|--------|-------------|
| Order ID | Unique identifier (ORD-timestamp) |
| Amount | Payment amount (₹100) |
| Patient Email | Email of booking patient |
| Status | Payment completion status |
| Date & Time | When payment was processed |

**Example Entry:**
```
ORD-1707319456789 | ₹100 | patient@email.com | Completed | 2/7/2026 3:45:30 PM
```

## Chart Update Mechanism

### Real-Time Updates

Charts automatically update when:
1. New appointment booked
2. Payment processed
3. Doctor availability changed
4. New user registered

### Manual Refresh

Click "Analytics" button to reload all charts with latest data

### Data Sources

- **User Chart:** Appointment records
- **Doctor Chart:** Doctor availability records
- **Appointment Chart:** Appointment history
- **Revenue Chart:** Payment records

## Integration with Appointment System

### Booking Process with Payment

```
1. Patient selects department
         ↓
2. Patient selects doctor
         ↓
3. Patient selects date & time
         ↓
4. Patient enters symptoms
         ↓
5. System displays ₹100 booking fee
         ↓
6. Patient confirms (triggers payment)
         ↓
7. Payment processed: ₹100 charged
         ↓
8. Order ID generated
         ↓
9. Appointment confirmed with payment record
         ↓
10. Data synced to analytics
```

### Data Flow

```
User Payment Input
        ↓
Validation Check
        ↓
Payment Processing
        ↓
Order ID Creation
        ↓
Payment Record Storage (localStorage)
        ↓
Appointment Record Linking
        ↓
Admin Dashboard Update
        ↓
Chart Refresh
```

## Analytics for Admin Decision Making

### Revenue Analysis

**Monthly Revenue Tracking:**
- Monitor booking trends
- Identify peak booking periods
- Revenue optimization

**Formula:** `Monthly Revenue = Apartments in Month × ₹100`

### Doctor Availability Insights

**Available vs Unavailable:**
- Identify staffing gaps
- Optimize doctor schedules
- Improve appointment availability

### User Growth Analysis

**Growth Metrics:**
- New user registration trends
- User acquisition rate
- System adoption rate

### Department Performance

**Appointment Distribution:**
- Which departments are busiest
- Resource allocation needs
- Department-specific metrics

## Payment Features

### Transaction Security
- Order IDs are unique (timestamp-based)
- Payment status tracked
- Complete audit trail

### Payment Confirmation
Alert displays:
```
Payment of ₹100 processed successfully!

Order ID: ORD-1707319456789

Appointment booked successfully!
```

### Payment Tracking

Patient can view:
- Order ID in appointment details
- Payment amount (₹100)
- Appointment linked to payment

Admin can view:
- Complete transaction history
- Total revenue collected
- Payment trends

## Chart Customization

### Chart Library: Chart.js

**Benefits:**
- Responsive design
- Interactive tooltips
- Smooth animations
- Multiple chart types

### Chart Properties

**All Charts Include:**
- Legend (showing data series)
- Y-axis scale (starting at 0)
- Responsive layout (mobile-friendly)
- Line smoothing (tension: 0.4)
- Point markers (visible on hover)

### Colors Used

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary Line | Purple | #667eea |
| Secondary Line | Red | #EB5757 |
| Success | Green | #27ae60 |
| Warning | Orange | #F39C12 |
| Background | Light Blue | rgba(102, 126, 234, 0.1) |

## Reporting Features

### Monthly Reports

Access in **Reports** section:

1. **Appointment Statistics**
   - Total appointments
   - Confirmed/Pending/Completed/Cancelled

2. **Department Analysis**
   - Appointments by department
   - Department performance metrics

3. **Revenue Summary**
   - Total revenue collected
   - Average transaction value (₹100)

### Export Data

(Future Enhancement)
- Export payment history as CSV
- Export charts as images
- Generate PDF reports

## Best Practices

### For Admins

1. **Regular Monitoring**
   - Check analytics weekly
   - Monitor payment trends
   - Track user growth

2. **Resource Planning**
   - Use doctor availability chart for scheduling
   - Ensure adequate doctor coverage
   - Optimize booking slots

3. **Revenue Tracking**
   - Review monthly revenue
   - Track transaction success rate
   - Identify payment issues

### For System Maintenance

1. **Data Backup**
   - Backup payment records regularly
   - Backup appointment data
   - Maintain audit logs

2. **Chart Updates**
   - Refresh charts after bulk operations
   - Verify data accuracy
   - Check chart rendering

## Technical Details

### Chart.js Implementation

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

### Chart Instances

Maintained as global variables:
```javascript
let userChartInstance = null;
let doctorChartInstance = null;
let appointmentChartInstance = null;
let revenueChartInstance = null;
```

### Data Persistence

All data stored in browser's `localStorage`:
- key: `payments` - Payment records
- key: `appointments` - Appointment records
- key: `doctors` - Doctor information

### Chart Destruction

Charts destroyed before redrawing:
```javascript
if (userChartInstance) userChartInstance.destroy();
```

This prevents memory leaks and ensures smooth updates.

## Future Enhancements

1. **Advanced Analytics**
   - More detailed filtering options
   - Custom date range selection
   - Comparison reports

2. **Payment Methods**
   - Multiple payment options
   - Refund processing
   - Payment verification

3. **Chart Improvements**
   - More chart types (pie, bar, etc.)
   - Export functionality
   - Real-time updates

4. **Reporting**
   - Automated report generation
   - Email report delivery
   - Scheduled reports

## Troubleshooting

### Charts Not Displaying

**Issue:** Charts not showing in Analytics section
**Solution:**
1. Clear browser cache
2. Refresh page
3. Check Chart.js library loaded
4. Verify data in localStorage

### Payment Not Processing

**Issue:** Payment not recorded after booking
**Solution:**
1. Check browser console for errors
2. Verify localStorage is enabled
3. Try booking again
4. Check payment amount is ₹100

### Charts Show Old Data

**Issue:** Analytics showing outdated information
**Solution:**
1. Try again by clicking Analytics
2. Clear localStorage and refresh
3. Create new appointments to test

---

**Version:** 1.0  
**Last Updated:** February 2026  
**Payment System Status:** Active  
**Analytics Status:** Active
