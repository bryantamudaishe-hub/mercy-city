# Complete Setup & Deployment Guide

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or Atlas)
- Twilio Account with Verify Service
- Git

### Installation Steps

#### 1. Clone & Setup Environment

```bash
cd mercy-city-files
cp .env.example .env
# Edit .env with your actual credentials
```

#### 2. Backend Setup

```bash
cd server
npm install twilio
npm install  # If not done already
```

#### 3. Frontend Setup

```bash
# Public Site
cd client/public-site
npm install

# Admin Dashboard
cd client/admin-dashboard
npm install
```

#### 4. Create Twilio Verify Service

1. Go to [Twilio Console](https://www.twilio.com/console)
2. Navigate to Verify → Services
3. Click "Create Service"
4. Name it "Mercy City OTP"
5. Copy the Service SID
6. Add to `.env`: `TWILIO_VERIFY_SID=VA_xxx`

#### 5. Start Services

```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Public Site
cd client/public-site
npm run dev

# Terminal 3: Admin Dashboard
cd client/admin-dashboard
npm run dev
```

**URLs**:
- Public Site: http://localhost:3000
- Admin Dashboard: http://localhost:3001 (if configured)
- Backend API: http://localhost:5000

## User Registration Flow (Testing)

### 1. Register New User

**URL**: http://localhost:3000/register

**Form**:
```
First Name: John
Last Name: Doe
Email: john@example.com
Phone: +263780333703  (must include country code)
Password: Test123456
Confirm Password: Test123456
```

**Click**: "Register & Send Code"

### 2. Receive OTP

You should receive an SMS with a 6-digit code to your phone number.

### 3. Verify OTP

**URL**: http://localhost:3000/register (OTP step)

Enter the 6-digit code and click "Verify Code"

### 4. Admin Approval

**URL**: http://localhost:3001/admin/approvals (or your admin URL)

1. Login as admin
2. View pending approvals
3. Click "Approve" to activate the user

### 5. User Login

**URL**: http://localhost:3000/login

```
Email: john@example.com
Password: Test123456
```

## Database Setup

### MongoDB Local

```bash
# Install MongoDB
# https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod

# Verify connection
mongo mongodb://localhost:27017
```

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Add to `.env`: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mercy-city`

## Environment Variables Reference

### Required for OTP Verification

```
TWILIO_ACCOUNT_SID=AC035538b950766b9c6e6ee9d2b06b6b8f
TWILIO_AUTH_TOKEN=d6facc34f2717117c20c243cfa3aaab5
TWILIO_PHONE_NUMBER=+263719281211
TWILIO_VERIFY_SID=VA_YOUR_SERVICE_SID
```

### Required for Backend

```
MONGODB_URI=mongodb://localhost:27017/mercy-city
JWT_SECRET=your_random_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Required for Frontend

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## API Endpoints for Testing

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+263780333703",
    "password": "Test123456",
    "passwordConfirm": "Test123456"
  }'
```

### Verify OTP

```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+263780333703",
    "code": "123456"
  }'
```

### Resend OTP

```bash
curl -X POST http://localhost:5000/api/auth/resend-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+263780333703"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Test123456"
  }'
```

### Get Pending Approvals (Admin)

```bash
curl -X GET http://localhost:5000/api/admin/pending-approvals \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Approve User (Admin)

```bash
curl -X POST http://localhost:5000/api/admin/approve-user/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Production Deployment

### Prerequisites
- VPS or Cloud Server (AWS, Heroku, DigitalOcean, etc.)
- MongoDB Atlas (cloud database)
- Domain name
- SSL Certificate (Let's Encrypt)

### Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Change `JWT_SECRET` to strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB connection
- [ ] Configure MongoDB Atlas network access
- [ ] Set up Twilio production credentials
- [ ] Configure email service (SMTP)
- [ ] Enable HTTPS
- [ ] Set secure cookies in production
- [ ] Configure CORS for production domain
- [ ] Set up error monitoring (Sentry)
- [ ] Configure database backups
- [ ] Set up logging
- [ ] Test complete user flow
- [ ] Monitor logs and errors

### Deployment via Vercel (Frontend)

```bash
# Public Site
cd client/public-site
vercel --prod

# Admin Dashboard
cd client/admin-dashboard
vercel --prod
```

### Deployment via Heroku (Backend)

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Create app
heroku create mercy-city-api

# Set environment variables
heroku config:set JWT_SECRET=your_production_secret
heroku config:set MONGODB_URI=your_production_mongodb
heroku config:set TWILIO_ACCOUNT_SID=your_twilio_sid
# ... set all other env vars

# Deploy
git push heroku main
```

### Docker Deployment

```bash
# Build image
docker build -t mercy-city-api .

# Run container
docker run -p 5000:5000 \
  -e MONGODB_URI=your_mongodb \
  -e JWT_SECRET=your_secret \
  mercy-city-api
```

## Troubleshooting

### OTP Not Arriving

1. Check phone number format (must include country code)
2. Verify Twilio Verify Service is active
3. Check Twilio credits
4. Try resend (60 second cooldown)
5. Check SMS logs in Twilio Console

### Login Fails

- **"Account not verified"**: User hasn't completed OTP verification
- **"Pending admin approval"**: Admin hasn't approved account yet
- **"Invalid credentials"**: Wrong email or password

### Admin Dashboard Not Loading

1. Check JWT token is valid
2. Verify user has admin role
3. Check ProtectedRoute component
4. Check browser console for errors
5. Check server logs

### Database Connection Failed

1. Verify MongoDB is running
2. Check MONGODB_URI is correct
3. If using MongoDB Atlas, check network access
4. Verify username/password
5. Check firewall rules

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

## Testing Checklist

- [ ] User can register with valid data
- [ ] Duplicate email shows error
- [ ] Duplicate phone shows error
- [ ] Weak password shows error
- [ ] OTP sent to phone
- [ ] OTP verified successfully
- [ ] Invalid OTP rejected
- [ ] User cannot login before verification
- [ ] User cannot login before approval
- [ ] Admin can approve users
- [ ] Admin can reject users
- [ ] Approved user can login
- [ ] Admin dashboard loads
- [ ] Public pages have no admin links
- [ ] Logout clears token
- [ ] Token expires after 7 days
- [ ] Passwords hashed (check DB)
- [ ] Admin user cannot be created via registration
- [ ] Rate limiting works (60 sec resend)
- [ ] Max 3 OTP attempts enforced

## Performance Optimization

### Frontend
- Enable code splitting
- Lazy load components
- Optimize images
- Cache static assets
- Use CDN for assets

### Backend
- Add database indexes
- Implement caching (Redis)
- Use connection pooling
- Monitor query performance
- Rate limit endpoints

### Database
- Regular backups
- Monitor disk space
- Optimize indexes
- Clean old logs

## Security Hardening

- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Input validation
- [ ] SQL injection protection (Mongoose)
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Secure cookies
- [ ] Password hashing (bcrypt)
- [ ] JWT expiration
- [ ] Admin routes protected
- [ ] No sensitive data in responses
- [ ] Error messages don't leak info
- [ ] API keys not exposed
- [ ] Database credentials secured
- [ ] Logs don't contain sensitive data

## Monitoring & Analytics

### Set Up Error Tracking

```javascript
// server/app.js
const Sentry = require("@sentry/node");

Sentry.init({ 
  dsn: process.env.SENTRY_DSN 
});

app.use(Sentry.Handlers.errorHandler());
```

### Set Up Logging

```bash
npm install winston
```

### Monitor Performance

- Response times
- Error rates
- Database query performance
- Memory usage
- CPU usage

## Support & Documentation

- **API Docs**: See `SECURITY_AUTHENTICATION.md`
- **SMS Docs**: See `TWILIO_SMS_INTEGRATION.md`
- **Twilio Docs**: https://www.twilio.com/docs/verify/api
- **JWT Docs**: https://jwt.io/
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **Next.js Docs**: https://nextjs.org/docs

## Next Steps

1. Complete user registration flow
2. Set up admin approval system
3. Deploy to production
4. Set up monitoring
5. Configure backups
6. Plan scaling strategy
7. Add email notifications
8. Implement two-factor authentication
9. Add social login
10. Set up analytics

## Contact & Support

For issues, contact support@mercycity.church
