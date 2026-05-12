# Security & Authentication Documentation

## Overview

This document outlines the complete security architecture for the Mercy City Church Management System, including user registration, OTP verification, admin approval, and role-based access control.

## Architecture

### User Roles

```
user   - Regular church members (requires verification and approval)
admin  - Administrators (full access to dashboard)
```

### User States

1. **Unverified** - User created, OTP sent, awaiting phone verification
2. **Verified (Pending)** - Phone verified, awaiting admin approval
3. **Verified & Approved** - Full access granted
4. **Verified & Rejected** - Account rejected, cannot login

## Registration Flow

### Step 1: Registration

**Endpoint**: `POST /api/auth/register`

**Request**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+263780333703",
  "password": "SecurePassword123",
  "passwordConfirm": "SecurePassword123"
}
```

**Validation**:
- All fields required
- Email must be unique
- Phone must be unique and international format
- Password minimum 6 characters
- Passwords must match

**Response**:
```json
{
  "success": true,
  "message": "Registration successful. Verification code sent to your phone.",
  "phone": "****333703",
  "userId": "507f1f77bcf86cd799439011",
  "requiresVerification": true
}
```

**Backend Process**:
1. Validate input
2. Check for duplicates (email, phone)
3. Create user with `isVerified: false`, `approvalStatus: pending`
4. Hash password using bcrypt
5. Send OTP via Twilio Verify
6. Store verification SID in database

### Step 2: OTP Verification

**Endpoint**: `POST /api/auth/verify-otp`

**Request**:
```json
{
  "phoneNumber": "+263780333703",
  "code": "123456"
}
```

**Validation**:
- 6-digit numeric code
- Code must be valid with Twilio
- Max 3 verification attempts
- User must exist

**Response**:
```json
{
  "success": true,
  "message": "Phone verified! Waiting for admin approval to activate your account.",
  "isVerified": true,
  "approvalStatus": "pending"
}
```

**Backend Process**:
1. Find user by phone
2. Verify code with Twilio Verify API
3. If valid: set `isVerified: true`, mark `approvalStatus: pending`
4. If invalid: increment attempts, reject
5. On 3rd failed attempt: reject with rate limit

### Step 3: Admin Approval

**Endpoint**: `POST /api/admin/approve-user/:userId`

**Required**: Admin authentication + role check

**Response**:
```json
{
  "success": true,
  "message": "John Doe has been approved",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "approvalStatus": "approved"
  }
}
```

**Backend Process**:
1. Check admin role
2. Find user
3. Verify user is verified but not approved
4. Set `approvalStatus: approved`
5. Set `approvedBy: adminId`
6. Send approval email to user (TODO)

### Step 4: Login

**Endpoint**: `POST /api/auth/login`

**Request**:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Validation**:
- Email and password required
- Password must match (bcrypt comparison)
- User must be verified (`isVerified: true`)
- User must be approved (`approvalStatus: approved`)

**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Cases**:
- Not verified: `403 Forbidden` - "Account not verified. Please verify your phone number first."
- Not approved: `403 Forbidden` - "Account pending admin approval. Check your email for confirmation."
- Invalid credentials: `401 Unauthorized` - "Invalid email or password"

## API Endpoints

### Authentication Routes

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/auth/register` | None | User registration |
| POST | `/api/auth/verify-otp` | None | Verify OTP code |
| POST | `/api/auth/resend-otp` | None | Resend OTP code |
| POST | `/api/auth/login` | None | User login |
| GET | `/api/auth/profile` | JWT | Get user profile |

### Admin Approval Routes

| Method | Endpoint | Auth | Role | Purpose |
|--------|----------|------|------|---------|
| GET | `/api/admin/pending-approvals` | JWT | admin | List pending users |
| POST | `/api/admin/approve-user/:id` | JWT | admin | Approve user |
| POST | `/api/admin/reject-user/:id` | JWT | admin | Reject user |
| GET | `/api/admin/users` | JWT | admin | Get all users |
| DELETE | `/api/admin/users/:id` | JWT | admin | Deactivate user |

## Frontend Components

### ProtectedRoute Component

Protects admin-only pages from public access.

```jsx
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

**Features**:
- Checks authentication
- Verifies role (admin only)
- Checks verification and approval status
- Auto-redirects to login if unauthorized
- Shows loading spinner during auth check

### Public Pages (No Admin Links)

- Homepage
- About
- Ministries
- Sermons
- Events
- Gallery
- Donate
- Contact
- Login
- Register
- Pending Approval

**Important**: Admin button/links do NOT appear in public navbar

## Security Requirements

### Environment Variables (NEVER commit to GitHub)

**Required `.env` file**:
```
# Database
MONGODB_URI=mongodb://localhost:27017/mercy-city

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Twilio Verify
TWILIO_ACCOUNT_SID=AC035538b950766b9c6e6ee9d2b06b6b8f
TWILIO_AUTH_TOKEN=d6facc34f2717117c20c243cfa3aaab5
TWILIO_VERIFY_SID=VA_YOUR_VERIFY_SERVICE_SID
TWILIO_PHONE_NUMBER=+263719281211

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Client
CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### .gitignore

```
# Environment
.env
.env.local
.env.*.local

# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build
build/
dist/
.next/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
```

### Password Security

- **Bcrypt Hashing**: All passwords hashed with 10-round salt
- **Minimum Length**: 6 characters (can be increased)
- **Password Comparison**: Using bcrypt.compare()
- **Never Store Plain Text**: Passwords stored hashed only

### JWT Security

- **Token Format**: Standard JWT with payload: `{ id, role }`
- **Expiration**: 7 days (configurable)
- **Secret**: Change `JWT_SECRET` in production
- **Token Storage**: Frontend stores in localStorage (can be upgraded to httpOnly cookies)
- **Token Verification**: `protect` middleware validates on protected routes

### Admin Routes Protection

**Backend Middleware**:
```javascript
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);  // Requires valid JWT
router.use(authorize('admin'));  // Requires admin role
```

**Frontend ProtectedRoute**:
```jsx
<ProtectedRoute requiredRole="admin">
  <AdminPage />
</ProtectedRoute>
```

### Public-Admin Separation

**Public Site** (`client/public-site`):
- Only public pages
- No admin links
- No admin routes
- No edit/delete buttons
- Cannot access `/admin` routes

**Admin Dashboard** (`client/admin-dashboard`):
- Protected routes only
- Requires admin role
- JWT authentication required
- Auto-redirects unauthorized users

## Middleware

### authenticateToken

```javascript
// Verifies JWT token
// Extracts user info from token
// Passes user to next middleware
// Returns 401 if no valid token
```

### authorizeRole

```javascript
// Checks user role
// Allows specified roles only
// Returns 403 if unauthorized
// Example: authorizeRole('admin')
```

## Database Schema

### User Model

```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String (unique),
  password: String (hashed),
  role: String (user | admin),
  
  // Verification
  isVerified: Boolean,
  verifiedAt: Date,
  
  // Admin Approval
  approvalStatus: String (pending | approved | rejected),
  approvedBy: ObjectId,
  approvalDate: Date,
  rejectionReason: String,
  
  // Twilio Tracking
  verificationSid: String,
  verificationAttempts: Number,
  lastVerificationAttempt: Date,
  
  // Account Status
  isActive: Boolean,
  lastLogin: Date,
  loginCount: Number,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

## Rate Limiting

### OTP Requests

- **Maximum Attempts**: 3 per user
- **Request Cooldown**: 60 seconds between resend requests
- **Reset**: After successful verification

## Error Handling

### Common Error Messages

| Error | Status | Message |
|-------|--------|---------|
| Invalid email format | 400 | Email already registered |
| Duplicate phone | 400 | Phone number already registered |
| Weak password | 400 | Password must be at least 6 characters |
| Invalid OTP | 400 | Invalid or expired verification code |
| Too many attempts | 429 | Too many verification attempts. Please request a new code. |
| Not verified | 403 | Account not verified. Please verify your phone number first. |
| Not approved | 403 | Account pending admin approval. Check your email for confirmation. |
| Invalid credentials | 401 | Invalid email or password |
| Unauthorized | 401 | No authentication token provided |
| Forbidden | 403 | Access denied. Admin role required. |

## Testing Checklist

- [ ] User can register with valid data
- [ ] Duplicate email rejected
- [ ] Duplicate phone rejected
- [ ] Weak password rejected
- [ ] OTP sent successfully
- [ ] OTP verified correctly
- [ ] Invalid OTP rejected
- [ ] Rate limiting enforced (60 sec)
- [ ] Max 3 attempts enforced
- [ ] User cannot login if not verified
- [ ] User cannot login if not approved
- [ ] Admin can approve users
- [ ] Admin can reject users
- [ ] Admin approval sends email (TODO)
- [ ] Public navbar has no admin links
- [ ] Admin pages protected
- [ ] Non-admin redirected to home
- [ ] ProtectedRoute redirects unauthorized
- [ ] JWT token valid for 7 days
- [ ] Passwords hashed with bcrypt
- [ ] Sensitive data removed from responses

## Deployment Checklist

- [ ] Change `JWT_SECRET` to strong random string
- [ ] Create Twilio Verify Service
- [ ] Update `TWILIO_VERIFY_SID` in .env
- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB connection
- [ ] Set up SMTP for emails
- [ ] Test OTP verification with real phone
- [ ] Test admin approval flow
- [ ] Test login/logout
- [ ] Verify .env is not in GitHub
- [ ] Test public site (no admin links)
- [ ] Test admin dashboard (protected)
- [ ] Enable HTTPS
- [ ] Set secure cookies
- [ ] Monitor error logs
- [ ] Set up email notifications

## Future Enhancements

- [ ] Two-factor authentication (2FA)
- [ ] Email verification in addition to SMS
- [ ] Social login (Google, Facebook)
- [ ] Password reset flow
- [ ] Account deactivation
- [ ] Login activity logs
- [ ] IP whitelisting for admin
- [ ] Rate limiting on login attempts
- [ ] Account lockout after failed attempts
- [ ] Admin activity audit logs

## Support

For issues or questions about security:
1. Check error messages carefully
2. Review logs in console
3. Test with provided credentials
4. Verify .env configuration
5. Check Twilio service status
6. Ensure MongoDB is running

## References

- [Twilio Verify API](https://www.twilio.com/docs/verify/api)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Security](https://owasp.org/)
- [Node.js Security](https://nodejs.org/en/docs/guides/security/)
