# AFMIZ Mercy City Assembly Website

A comprehensive, production-ready church management system with secure authentication, SMS verification, admin approval system, and integrated Twilio services.

## 🌟 Features

### 🏠 Public Website
- **Church Introduction**: Spirit-filled community focused on Word, Worship, and Prayer
- **Service Times**: Sunday services, prayer meetings, youth programs
- **Announcements**: Latest church news and events
- **Social Media**: Facebook, Instagram, TikTok, WhatsApp, YouTube links
- **Giving Portal**: Online donations and pledges
- **Dark Mode Support**: Modern theme switching

### 🔐 Secure Authentication

#### User Registration & Verification
- **3-Step Registration Flow**:
  1. User fills registration form (name, email, phone, password)
  2. **Twilio SMS OTP** verification (6-digit code)
  3. Admin approval before account activation
- **Phone Verification**: International format support (+263...)
- **OTP Features**:
  - 60-second resend cooldown
  - Max 3 verification attempts
  - Rate limiting
  - Code expiration

#### Account Approval System
- **Admin Dashboard**: View pending user approvals
- **One-Click Approval**: Activate verified users
- **Rejection System**: Decline with custom reason
- **Email Notifications**: Users notified of approval status

#### Login Security
- **JWT Authentication**: Secure token-based login
- **Password Hashing**: Bcrypt encryption
- **Token Expiration**: 7-day default expiration
- **Protected Routes**: Role-based access control

### 🛡️ Security Features

**Authentication & Authorization**:
- Bcrypt password hashing (10-round salt)
- JWT token-based authentication
- Role-based access control (user/admin)
- Protected admin routes
- Automatic token verification

**Admin Security**:
- Admin dashboard completely hidden from public
- No admin buttons/links in public navbar
- Protected routes with role checking
- Admin-only endpoints
- Secure admin login required

**Data Security**:
- Password never stored plain text
- Sensitive data excluded from responses
- Environment variables for secrets
- No credentials in GitHub (.env excluded)
- Rate limiting on OTP requests

### 🎛️ Admin Dashboard

**User Management**:
- Pending approvals list
- One-click approval/rejection
- User status tracking
- Search and filter users
- Activity logs

**SMS Messaging** (Twilio Integration):
- Send SMS to individual users
- Bulk messaging to members
- Event reminders
- Prayer request notifications
- Message templates

**Content Management**:
- Announcement creation & editing
- Event management
- Sermon uploads
- Gallery management
- Blog posts

**Analytics & Reports**:
- Dashboard overview
- Financial reports
- Membership statistics
- Export functionality
- Chart visualizations

### 📱 Responsive Design
- **Mobile Optimized**: Full mobile navbar with hamburger menu
- **Tablet Support**: Adaptive layouts
- **Desktop**: Full feature access
- **Dark Mode**: Night-friendly interface

### 🌐 Internationalization
- **Multi-Language**: English & Spanish support
- **Language Selector**: Easy switching in navbar
- **Localized Content**: All pages translated
- **Admin Locale**: Dashboard localization

### 🔔 Notification System
- **Twilio SMS**: SMS notifications via OTP service
- **Email Verification**: Email notifications (configurable)
- **Bulk Messaging**: Send to multiple recipients
- **Event Alerts**: Automatic event reminders
- **Prayer Requests**: Notify members of prayer needs

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations (optional)
- **Axios** - API requests
- **LocalStorage** - Token persistence

### Backend
- **Node.js & Express** - Server
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Twilio SDK** - SMS & Verify services
- **CORS & CSRF** - Security

### Infrastructure
- **MongoDB Atlas** - Cloud database (optional)
- **Twilio** - SMS & OTP verification
- **Vercel/Heroku** - Hosting (optional)

## 📦 Project Structure

```
project-root/
├── client/
│   ├── public-site/          # Public website (Next.js)
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/          # Theme, Locale contexts
│   │   └── styles/
│   │
│   └── admin-dashboard/      # Admin dashboard (Next.js)
│       ├── pages/
│       ├── components/
│       ├── context/          # Auth, Locale contexts
│       └── middleware/
│
├── server/                    # Express backend
│   ├── models/               # MongoDB schemas
│   ├── controllers/          # Route handlers
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth, validation
│   ├── utils/                # Helpers (Twilio, etc.)
│   ├── config/               # Database setup
│   └── app.js                # Express app
│
├── .env                      # Environment variables (SECRET)
├── .env.example              # Template
├── .gitignore                # Git ignore rules
├── README.md                 # This file
├── SECURITY_AUTHENTICATION.md # Security docs
├── SETUP_DEPLOYMENT_GUIDE.md # Deployment guide
└── TWILIO_SMS_INTEGRATION.md # SMS docs
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- Twilio Account
- Git

### Quick Start

```bash
# 1. Clone and setup environment
cp .env.example .env
# Edit .env with your credentials

# 2. Backend
cd server
npm install
npm run dev

# 3. Public Site (new terminal)
cd client/public-site
npm install
npm run dev

# 4. Admin Dashboard (new terminal)
cd client/admin-dashboard
npm install
npm run dev
```

**URLs**:
- Public Site: http://localhost:3000
- Admin Dashboard: http://localhost:3001
- API: http://localhost:5000

### Configure Twilio

1. Create account at [Twilio.com](https://www.twilio.com)
2. Get credentials:
   - Account SID
   - Auth Token
   - SMS Number
3. Create **Verify Service** for OTP
4. Add to `.env`:
   ```
   TWILIO_ACCOUNT_SID=AC...
   TWILIO_AUTH_TOKEN=...
   TWILIO_VERIFY_SID=VA...
   TWILIO_PHONE_NUMBER=+...
   ```

## 📖 User Registration Flow

### 1. Register
**URL**: http://localhost:3000/register
- Fill form (name, email, phone, password)
- Submit → OTP sent via SMS

### 2. Verify OTP
- Enter 6-digit code
- Click "Verify Code"
- Wait for admin approval

### 3. Admin Approval
**URL**: http://localhost:3001/admin/approvals
- Admin reviews pending users
- Click "Approve" or "Reject"

### 4. Login
**URL**: http://localhost:3000/login
- Email & password
- Access user account

### 5. Admin Access
**URL**: http://localhost:3001
- Admin login (role=admin)
- Full dashboard access

## 🔒 Security Checklist

- ✅ SMS OTP verification
- ✅ Admin approval system
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Role-based access
- ✅ Admin hidden from public
- ✅ No secrets in GitHub (.env)
- ✅ Rate limiting on OTP
- ✅ CORS configured
- ✅ CSRF protection
- ✅ Secure password requirements

## 📚 Documentation

- [Security & Authentication](./SECURITY_AUTHENTICATION.md) - Complete auth flow
- [Setup & Deployment](./SETUP_DEPLOYMENT_GUIDE.md) - Production deployment
- [Twilio Integration](./TWILIO_SMS_INTEGRATION.md) - SMS details

## 🚀 Deployment

### Vercel (Frontend)
```bash
vercel --prod
```

### Heroku (Backend)
```bash
heroku create your-app
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Production Checklist
- [ ] Change JWT_SECRET
- [ ] Use production MongoDB
- [ ] Configure Twilio production
- [ ] Enable HTTPS
- [ ] Set CORS domain
- [ ] Configure email service
- [ ] Set NODE_ENV=production
- [ ] Test OTP flow
- [ ] Test admin approval
- [ ] Monitor logs

## 🐛 Troubleshooting

### OTP Not Arriving
- Check phone number format (+263...)
- Verify Twilio Verify Service active
- Check Twilio credits
- Try resend (60 sec cooldown)

### Admin Dashboard Won't Load
- Check JWT token valid
- Verify user role is "admin"
- Check browser console errors
- Clear localStorage

### Login Failed
- Verify account is approved
- Check email/password correct
- Try resetting password
- Check user status

### Database Connection Error
- MongoDB running?
- Check MONGODB_URI
- Verify credentials
- Check network access (if Atlas)

## 📊 API Endpoints

### Public Auth
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/verify-otp` | Verify OTP code |
| POST | `/api/auth/resend-otp` | Resend OTP |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/profile` | Get profile (protected) |

### Admin Only
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/admin/pending-approvals` | Pending users |
| POST | `/api/admin/approve-user/:id` | Approve user |
| POST | `/api/admin/reject-user/:id` | Reject user |
| POST | `/api/admin/send-sms` | Send SMS |
| GET | `/api/admin/users` | List all users |

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request
5. Follow security guidelines

## 📝 License

Proprietary - AFMIZ Mercy City Assembly

## 📞 Support

- Email: support@mercycity.church
- WhatsApp: [Link]
- Phone: [Link]

---

**Last Updated**: May 2026
**Version**: 2.0.0 (Security Release)

- **Two-Factor Authentication**: SMS verification codes
- **Session Management**: 30-minute auto-logout
- **Role-Based Access Control**: Different permissions per user type

### Data Protection
- **Input Validation**: XSS and SQL injection prevention
- **HTTPS Ready**: SSL encryption support
- **Security Logging**: All access attempts monitored
- **Account Lockout**: After 3 failed login attempts

## 🎨 Design & Technology

### Visual Design
- **Classic + Technological**: Professional church aesthetic
- **Zimbabwe-Inspired Colors**: Deep green (#1a472a), Gold (#d4af37), Red (#c41e3a)
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Modern UI/UX**: Smooth animations and intuitive navigation

### Technical Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js for data visualization
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Segoe UI)
- **Responsive**: CSS Grid and Flexbox

## 📁 File Structure

```
mercy-city-files/
├── index.html              # Main church website
├── styles.css              # Main website styles
├── script.js               # Main website functionality
├── admin.html              # Admin dashboard
├── admin-styles.css        # Admin dashboard styles
├── admin-script.js         # Admin dashboard functionality
├── login.html              # Admin login page
├── login-styles.css        # Login page styles
├── login-script.js         # Login functionality
└── 501677961_18089998102718163_546494354468193759_n.PNG.jpg  # Church logo
```

## 🚀 Getting Started

1. **Download all files** to the same directory
2. **Open `index.html`** in your web browser to view the main website
3. **Admin Access**: Click "Admin" in navigation or open `login.html`
4. **Login Credentials** (Demo):
   - Username: `pastor` or `admin@mercycityassembly.zw`
   - Password: `admin123` or `password123`
   - 2FA Code: `123456` or `654321`

## 👥 User Roles

### Visitor
- Browse website content
- Submit pledges and offerings
- View public information

### Member
- All visitor permissions
- Receive notifications
- Track personal pledges

### Admin (Church Leaders)
- Full dashboard access
- User management
- Financial oversight
- Notification broadcasting
- Report generation

## 📊 Admin Dashboard Features

### Dashboard Overview
- Real-time statistics (pledges, offerings, members)
- Recent activity feed
- Financial trend charts
- Quick action buttons

### Pledges Management
- View all pledges with filtering
- Search by name/email
- Status tracking (Active, Pending, Completed)
- Export capabilities

### Offerings Management
- Track all donations
- Receipt generation
- Payment method analysis
- Financial reporting

### User Management
- Add/edit user accounts
- Role assignment
- Member statistics
- Bulk operations

### Notifications
- Compose messages
- Multi-channel sending
- Delivery tracking
- History and analytics

### Reports
- Financial reports (downloadable)
- Membership analytics
- Attendance tracking
- Notification performance

## 🔧 Customization

### Church Information
- Update church name, address, contact details
- Modify service times and announcements
- Change social media links

### Branding
- Replace logo file with your church logo
- Adjust color scheme in CSS variables
- Customize text content and messaging

### Features
- Add new pledge types or payment methods
- Extend notification channels
- Add new admin dashboard sections

## 📞 Support

For technical support or customization requests:
- Email: info@mercycityassembly.zw
- Phone: +263 0000 000000
- Address: 88-89 Aerodrome Road, Mutare, Zimbabwe

## 📝 License

This website is created for AFMIZ Mercy City Assembly. All rights reserved.

## 🙏 Acknowledgments

Built with love for the AFMIZ Mercy City Assembly community. May this website serve to strengthen our church family and spread God's message of hope and mercy.

**"For where two or three gather in my name, there am I with them." - Matthew 18:20**

---

## New Full-Stack Church Management System

This workspace now includes a new full-stack structure under `client` and `server`:

- `client/public-site`: Next.js public website with Tailwind CSS and SEO-ready pages.
- `client/admin-dashboard`: Next.js admin dashboard with secure role-based UI.
- `server`: Express backend with JWT authentication, Mongoose models, protected admin routes, and CMS content APIs.

### Setup

1. Copy `.env.example` to `server/.env` and set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL`.
2. Run `npm install` in `server`, `client/public-site`, and `client/admin-dashboard`.
3. Start the backend with `npm run dev` in `server`.
4. Start the public site with `npm run dev` in `client/public-site`.
5. Start the admin dashboard with `npm run dev` in `client/admin-dashboard`.

### Notes

- Admin routes are protected by `server/middleware/authMiddleware.js`.
- Public pages fetch dynamic content from `/api/public/home`.
- The admin dashboard is designed as a separate app and is not accessible through the public site.
- The backend includes models for `User`, `Member`, `Event`, `Sermon`, `Donation`, `PrayerRequest`, `Ministry`, `BlogPost`, `GalleryImage`, and `Notification`.
- Authentication is handled via JWT tokens stored in localStorage for the admin dashboard.
- Public forms (donations, prayer requests, contact) submit data to backend APIs with success/error feedback.
- **NEW**: Email notifications are sent for prayer requests, donations, sermon uploads, and blog posts.
- **NEW**: Admin dashboard includes interactive charts (donations, attendance, ministry distribution).
- **NEW**: Public site features dark mode toggle with persistent theme preference.

### Admin Login

- **Email:** admin@mercycity.org
- **Password:** admin123
- **URL:** http://localhost:3001 (admin dashboard)

### API Endpoints

**Public:**
- `GET /api/public/home` - Get homepage content (events, sermons, ministries, gallery, blog posts)
- `POST /api/public/prayer-requests` - Submit prayer request
- `POST /api/public/contact` - Submit contact form

**Auth:**
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin user
- `GET /api/auth/profile` - Get current user profile

**Admin (Protected):**
- `GET /api/admin/overview` - Dashboard statistics
- `POST /api/admin/events` - Create event
- `PUT /api/admin/events/:id` - Update event
- `POST /api/admin/sermons` - Upload sermon
- `POST /api/admin/donations` - Record donation
- `PUT /api/admin/prayers/:id` - Update prayer request status
- `POST /api/admin/blog` - Create blog post
- `POST /api/admin/gallery` - Upload gallery image
- `PUT /api/admin/users/:id/role` - Change user role

### Features

#### Public Website
- Responsive design with mobile-first approach
- Dark mode toggle (persistent across sessions)
- Dynamic content from admin dashboard
- Interactive forms with email notifications
- SEO-optimized pages

#### Admin Dashboard
- Secure authentication with JWT
- Role-based access control
- Interactive charts and analytics
- Real-time dashboard statistics
- Activity logging for all admin actions
- Email notifications for key events

#### Backend
- RESTful API with proper error handling
- Email notifications for user interactions
- Activity logging for admin actions
- CSRF protection and input validation
- Sample data seeding on first run
