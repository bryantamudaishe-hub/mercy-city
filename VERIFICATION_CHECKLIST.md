# Pre-Launch Verification Checklist

## 🔧 Backend Setup

### Environment & Dependencies
- [ ] `.env` file created with all credentials
- [ ] `TWILIO_ACCOUNT_SID` added
- [ ] `TWILIO_AUTH_TOKEN` added
- [ ] `TWILIO_PHONE_NUMBER` added
- [ ] `TWILIO_VERIFY_SID` added (Verify Service SID)
- [ ] `JWT_SECRET` changed to random string
- [ ] `MONGODB_URI` configured
- [ ] `npm install` completed in server folder
- [ ] `npm install twilio` completed

### Server Startup
- [ ] Backend starts: `npm run dev` in server folder
- [ ] Server listens on port 5000
- [ ] MongoDB connection successful
- [ ] No startup errors in console

### File Verification
- [ ] `server/models/User.js` has verification fields
- [ ] `server/utils/twilioVerify.js` exists
- [ ] `server/controllers/authController.js` has OTP functions
- [ ] `server/controllers/userApprovalController.js` exists
- [ ] `server/routes/auth.js` includes OTP routes
- [ ] `server/routes/admin.js` includes approval routes

## 🌐 Public Website Setup

### Environment & Dependencies
- [ ] Folder: `client/public-site`
- [ ] `.env` file created
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:5000`
- [ ] `npm install` completed
- [ ] Site starts: `npm run dev`
- [ ] Site accessible at http://localhost:3000

### File Verification
- [ ] `pages/register.js` exists (3-step form)
- [ ] `pages/pending-approval.js` exists
- [ ] `components/Navbar.js` has login/register buttons
- [ ] No admin button in navbar
- [ ] Dark mode toggle works
- [ ] Language selector works

### URL Verification
- [ ] Homepage loads: http://localhost:3000
- [ ] Register page: http://localhost:3000/register
- [ ] Pending page: http://localhost:3000/pending-approval
- [ ] Login page: http://localhost:3000/login
- [ ] Navigation smooth and responsive

## 👨‍💼 Admin Dashboard Setup

### Environment & Dependencies
- [ ] Folder: `client/admin-dashboard`
- [ ] `.env` file created
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:5000`
- [ ] `npm install` completed
- [ ] Axios installed
- [ ] Dashboard starts: `npm run dev`
- [ ] Accessible at http://localhost:3001 (or configured port)

### File Verification
- [ ] `components/ProtectedRoute.js` exists
- [ ] `pages/approvals.js` exists
- [ ] `components/Sidebar.js` has approvals link
- [ ] Authentication context exists
- [ ] No public pages accessible

### URL Verification
- [ ] Admin requires login
- [ ] Dashboard protected
- [ ] Approvals page accessible only to admin

## 📱 Registration Flow Testing

### Step 1: Registration Form
- [ ] Navigate to http://localhost:3000/register
- [ ] Form displays 3 step indicator
- [ ] First Name field accepts input
- [ ] Last Name field accepts input
- [ ] Email field validates format
- [ ] Phone field accepts +263 format
- [ ] Password field requires 6+ characters
- [ ] Confirm Password must match
- [ ] Submit button enabled when valid
- [ ] Error: Duplicate email rejected
- [ ] Error: Duplicate phone rejected
- [ ] Error: Weak password rejected

### Step 2: OTP Sending
- [ ] Click "Register & Send Code"
- [ ] Loading indicator appears
- [ ] Button disabled during submission
- [ ] Response: Success message
- [ ] Redirects to OTP entry step
- [ ] Phone number masked (****3703)
- [ ] 60-second countdown timer starts
- [ ] SMS received on test phone

### Step 3: OTP Verification
- [ ] OTP input field appears
- [ ] Can only enter 6 digits
- [ ] Submit button activates after 6 digits
- [ ] Enter correct code → Success
- [ ] Error: Invalid code rejected
- [ ] Max attempts enforced (3 tries)
- [ ] Resend button works (after 60 sec)
- [ ] Resend sends new code
- [ ] Redirects to success page

### Step 4: Success Page
- [ ] Success message displays
- [ ] "Go to Login" button available
- [ ] FAQ section visible
- [ ] Clear next steps explained

## 👨‍⚖️ Admin Approval Flow

### Pending Users
- [ ] Navigate to admin dashboard
- [ ] View Pending Approvals in sidebar
- [ ] URL: http://localhost:3001/admin/approvals (or configured)
- [ ] List shows registered users
- [ ] Each user shows:
  - [ ] Name
  - [ ] Email
  - [ ] Phone
  - [ ] Verification status (checkmark)
  - [ ] Join date

### Approval Actions
- [ ] Click "Approve" button
- [ ] User status changes to "approved"
- [ ] Success message appears
- [ ] User removed from pending list
- [ ] Click "Reject" button
- [ ] Modal appears asking for reason
- [ ] Enter rejection reason
- [ ] Reject confirmed
- [ ] User status changes to "rejected"
- [ ] Success message appears

## 🔐 Security Verification

### Environment Security
- [ ] `.env` is in `.gitignore`
- [ ] `.env` file not committed to Git
- [ ] No secrets in source code
- [ ] `.env.example` provided as template
- [ ] Production secrets use environment variables

### Route Protection
- [ ] Admin pages require login
- [ ] Non-admin redirected from admin
- [ ] Unapproved users can't access admin
- [ ] Public pages accessible without login
- [ ] No admin button in public navbar
- [ ] No admin routes in public menu

### Password Security
- [ ] Passwords hashed in database (check with MongoDB)
- [ ] Never sent plain text in responses
- [ ] Minimum 6 characters enforced
- [ ] Bcrypt hashing confirmed

### Token Security
- [ ] JWT issued on login
- [ ] Token stored in localStorage
- [ ] Token sent in Authorization header
- [ ] Token expires after 7 days
- [ ] Protected routes check token
- [ ] Invalid token rejected

## 📊 API Testing

### Register Endpoint
```bash
✓ Sends OTP when successful
✓ Returns 400 for invalid input
✓ Returns 400 for duplicate email
✓ Returns 400 for duplicate phone
✓ Returns 500 for Twilio errors
```

### Verify OTP Endpoint
```bash
✓ Returns 400 for invalid code
✓ Returns 429 for too many attempts
✓ Returns 400 for expired code
✓ Returns 200 for valid code
✓ Updates user.isVerified in DB
```

### Login Endpoint
```bash
✓ Returns 401 for wrong password
✓ Returns 403 if not verified
✓ Returns 403 if not approved
✓ Returns 200 with token if approved
✓ Updates lastLogin timestamp
```

### Admin Approval Endpoint
```bash
✓ Returns 404 for invalid user
✓ Returns 403 if not admin
✓ Returns 200 for successful approval
✓ Sets approvalStatus = "approved"
✓ Sets approvedBy = admin id
```

## 🎨 UI/UX Verification

### Responsive Design
- [ ] Mobile (320px) - Register form responsive
- [ ] Tablet (768px) - Navbar hamburger works
- [ ] Desktop (1200px) - Full layout displays
- [ ] Dark mode toggle works on all sizes
- [ ] Language selector works on all sizes

### Error Handling
- [ ] Error messages display clearly
- [ ] Error messages helpful and non-technical
- [ ] Error messages don't leak system info
- [ ] Success messages display
- [ ] Loading indicators visible
- [ ] Disabled states show clearly

### Navigation
- [ ] Navbar sticky on scroll
- [ ] Mobile menu opens/closes
- [ ] Menu links work
- [ ] Dark mode persists
- [ ] Language preference persists

## 📚 Documentation Verification

- [ ] `README.md` updated with new features
- [ ] `SECURITY_AUTHENTICATION.md` complete
- [ ] `SETUP_DEPLOYMENT_GUIDE.md` complete
- [ ] `TWILIO_SMS_INTEGRATION.md` complete
- [ ] `IMPLEMENTATION_SUMMARY.md` complete
- [ ] `.env.example` provides all required vars
- [ ] Comments in code explain complex logic

## 🧪 Edge Cases

### OTP Verification
- [ ] Test with leading zeros (000123)
- [ ] Test with spaces entered
- [ ] Test with non-numeric input
- [ ] Test expired code (24+ hours)
- [ ] Test resend after 60 seconds exactly
- [ ] Test multiple concurrent registrations

### Admin Approval
- [ ] Approve same user twice (should error)
- [ ] Reject then approve (should work)
- [ ] Admin logs out then back in (should work)
- [ ] Multiple admins approving (should work)

### Login Edge Cases
- [ ] Case sensitivity of email
- [ ] Extra spaces in password
- [ ] Multiple login attempts
- [ ] Simultaneous logins from different devices
- [ ] Login after approval

## 🚨 Error Scenarios

### Twilio Errors
- [ ] Invalid phone number format
- [ ] Phone number not supported
- [ ] Twilio service down (should show error)
- [ ] No Twilio credits (should show error)
- [ ] Invalid API credentials

### Database Errors
- [ ] MongoDB not running (should show error)
- [ ] Connection timeout
- [ ] Invalid connection string
- [ ] Database full (should handle gracefully)

### Network Errors
- [ ] API endpoint unreachable
- [ ] Slow network (should show loading)
- [ ] Timeout during registration
- [ ] Timeout during OTP verification
- [ ] Connection lost mid-flow

## 📋 Production Readiness

- [ ] No console.logs in production code
- [ ] No debugging code left
- [ ] Error messages user-friendly
- [ ] Logging implemented
- [ ] Rate limiting enabled
- [ ] CORS configured correctly
- [ ] HTTPS enabled (production)
- [ ] Database backups configured
- [ ] Monitoring set up
- [ ] Error tracking (Sentry) configured
- [ ] Performance optimization done
- [ ] Load testing passed

## 🚀 Final Launch Steps

1. [ ] All checkboxes above checked
2. [ ] Code reviewed for security
3. [ ] Security audit passed
4. [ ] Performance tested
5. [ ] Load testing passed
6. [ ] User acceptance testing done
7. [ ] Stakeholder approval obtained
8. [ ] Deployment plan prepared
9. [ ] Rollback plan prepared
10. [ ] Support team trained
11. [ ] Documentation reviewed
12. [ ] Launch announced
13. [ ] Monitoring active
14. [ ] Support hotline active

## 📞 Troubleshooting

**If something doesn't work:**

1. **Check Logs**
   - Backend: Look for error messages in server terminal
   - Frontend: Check browser console (F12)
   - Network: Check Network tab in DevTools

2. **Verify Configuration**
   - .env file exists and is loaded
   - All required variables present
   - No typos in credentials
   - Ports not in use

3. **Check Services**
   - MongoDB running?
   - Backend API responding?
   - Twilio service active?
   - Internet connection stable?

4. **Common Issues**
   - Port 5000 in use: `lsof -ti:5000 | xargs kill -9`
   - Port 3000 in use: `lsof -ti:3000 | xargs kill -9`
   - .env not loaded: Restart services
   - Twilio error: Check API credentials

## ✅ Sign-Off

- [ ] All systems operational
- [ ] All tests passed
- [ ] Documentation complete
- [ ] Security verified
- [ ] Ready for deployment

**Deployment Date**: _______________
**Deployed By**: _______________
**Notes**: ________________________________________________

---

**Need Help?** Refer to documentation files or contact support.
