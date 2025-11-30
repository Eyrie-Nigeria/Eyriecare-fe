# EyrieCare Admin Setup Guide

## Email Notifications Setup

### 1. Configure SMTP Settings

EyrieCare uses Nodemailer for sending emails. Configure your SMTP settings in your `.env` file.

#### Option A: Gmail

```env
# Gmail SMTP Configuration
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Note: For Gmail, you need to create an App Password:
# 1. Go to Google Account settings
# 2. Security → 2-Step Verification → App passwords
# 3. Generate an app password for "Mail"
```

#### Option B: Outlook/Office 365

```env
SMTP_SERVICE=outlook
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

#### Option C: Custom SMTP Server

```env
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASSWORD=your-password
```

### 2. Configure Email Settings

Add these to your `.env` file:

```env
# Email address that receives waitlist notifications
ADMIN_EMAIL=your-email@example.com

# Email address that appears as sender
FROM_EMAIL=noreply@eyriecare.com
FROM_NAME=EyrieCare

# Your app URL (for email links)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Admin API key for securing admin routes
ADMIN_API_KEY=your-secret-key-here
```

### 3. Test Email Configuration

You can test your email configuration by checking the server logs when sending a test email, or by creating a test endpoint.

## Admin Panel

### Access

Visit `/admin` to access the admin panel where you can:
- View all waitlist signups
- Grant access to users
- Set passwords for new users
- See who has been granted access

### Granting Access

1. When someone joins the waitlist, you'll receive an email notification
2. Go to `/admin` panel
3. Find the user in the "Pending Requests" section
4. Click "Grant Access"
5. Set a password (minimum 8 characters)
6. The user will automatically receive an email with their login credentials

## Data Storage

Currently, data is stored in JSON files in the `/data` directory:
- `data/waitlist.json` - Waitlist entries
- `data/users.json` - User accounts with passwords

**Note:** For production, consider migrating to a proper database (PostgreSQL, MongoDB, etc.) for better performance and security.

## Security Notes

1. **Password Hashing**: Passwords are hashed using bcrypt before storage
2. **Admin Authentication**: Currently uses a simple API key. For production, implement proper authentication (NextAuth, Clerk, etc.)
3. **Environment Variables**: Never commit `.env` files to version control
4. **Data Directory**: The `/data` directory is gitignored and should not be committed

## Production Recommendations

1. **Database**: Migrate from JSON files to a proper database
2. **Authentication**: Implement proper admin authentication (NextAuth.js, Clerk, etc.)
3. **Email Templates**: Customize email templates in `lib/email.ts`
4. **Rate Limiting**: Add rate limiting to API routes
5. **Logging**: Add proper logging and monitoring
6. **Backup**: Set up regular backups of user data

