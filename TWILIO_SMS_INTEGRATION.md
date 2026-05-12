# Twilio SMS Integration Guide

## Setup

1. **Get Twilio Credentials**
   - Account SID: `AC035538b950766b9c6e6ee9d2b06b6b8f`
   - Auth Token: `d6facc34f2717117c20c243cfa3aaab5`
   - Phone Number: `+263719281211`

2. **Update `.env` in `server/`**
   ```
   TWILIO_ACCOUNT_SID=AC035538b950766b9c6e6ee9d2b06b6b8f
   TWILIO_AUTH_TOKEN=d6facc34f2717117c20c243cfa3aaab5
   TWILIO_PHONE_NUMBER=+263719281211
   ```

3. **Install Twilio SDK**
   ```bash
   cd server
   npm install twilio
   ```

## API Endpoints

### Send Single SMS
```bash
POST /api/admin/sms/send-sms
Authorization: Bearer <token>

{
  "phoneNumber": "+263780333703",
  "message": "Your message here"
}
```

### Send Bulk SMS
```bash
POST /api/admin/sms/send-sms
Authorization: Bearer <token>

{
  "recipientIds": ["member_id_1", "member_id_2"],
  "message": "Your message here"
}
```

### Send Event Reminder
```bash
POST /api/admin/sms/send-event-reminder
Authorization: Bearer <token>

{
  "eventId": "event_id",
  "message": "Custom message (optional)"
}
```

### Send Prayer Request Notification
```bash
POST /api/admin/sms/send-prayer-request
Authorization: Bearer <token>

{
  "prayerRequestId": "prayer_id",
  "customMessage": "Custom message (optional)"
}
```

### Test SMS
```bash
POST /api/admin/sms/test-sms
Authorization: Bearer <token>

{
  "phoneNumber": "+263780333703"
}
```

## Frontend Features

### Admin Dashboard SMS Page
- **Location**: `/client/admin-dashboard/pages/send-sms.js`
- **Features**:
  - Single SMS to individual
  - Bulk SMS to multiple members
  - Test SMS for verification
  - Message length counter (160 chars)
  - Success/error feedback

### Sidebar Integration
- SMS page linked in admin sidebar as "Send SMS"
- Requires admin authentication

## Usage Examples

### Send to Single Member
1. Navigate to Admin Dashboard → Send SMS
2. Select "Single SMS" mode
3. Enter phone number: `+263780333703`
4. Enter message
5. Click "Send SMS"

### Send to All Active Members
1. Select "Bulk SMS" mode
2. Choose members from the list
3. Enter message
4. Click "Send SMS"

### Send Event Reminder
Call API directly:
```javascript
await api.post('/api/admin/sms/send-event-reminder', {
  eventId: "60d5ec49f1b2c72b8c8e4b1d",
  message: "Don't forget our church picnic this Sunday!"
}, {
  headers: { Authorization: `Bearer ${token}` }
});
```

## Automated Notifications

### On Event Created
The system can automatically notify members:
```javascript
const { notifyEventReminder } = require('../utils/twilio');
const memberPhones = members.map(m => m.phone);
await notifyEventReminder(memberPhones, event);
```

### On Prayer Request
Automatically alert members:
```javascript
const { notifyPrayerRequest } = require('../utils/twilio');
await notifyPrayerRequest(memberPhones, prayerRequest);
```

### On Donation
Send thank you message:
```javascript
const { sendDonationThankYou } = require('../utils/twilio');
await sendDonationThankYou(donorPhone, donation);
```

## Error Handling

Common errors:
- **Invalid phone number**: Ensure international format (+country_code)
- **Rate limiting**: Twilio has limits per minute/hour
- **Auth failure**: Check TWILIO_AUTH_TOKEN in .env
- **No recipients**: Bulk SMS requires at least one selected member

## Security

- All SMS routes require `authenticateToken` middleware
- Only admins can send SMS (role check)
- Never commit `.env` with real credentials
- Use environment variables in production

## Testing

1. Send test SMS from Admin Dashboard
2. Verify message received on phone
3. Check server logs for SID confirmation
4. Use test mode before bulk sending
