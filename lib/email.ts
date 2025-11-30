import { createEmailTransporter } from "./email-helpers";

export interface WaitlistNotificationData {
  email: string;
  timestamp: string;
}

/**
 * Send email notification to admin when someone joins the waitlist
 */
export async function sendWaitlistNotification(data: WaitlistNotificationData) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@eyriecare.com";
  const fromEmail = process.env.FROM_EMAIL || "noreply@eyriecare.com";
  const fromName = process.env.FROM_NAME || "EyrieCare";

  try {
    const transporter = createEmailTransporter();
    
    const result = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      subject: "🎉 New Waitlist Signup - EyrieCare",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1A73E8 0%, #0FB7A4 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
              .info-box { background: #E8F3FF; padding: 15px; border-radius: 6px; margin: 20px 0; }
              .button { display: inline-block; background: #1A73E8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">New Waitlist Signup</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone just joined the EyrieCare waitlist!</p>
              </div>
              <div class="content">
                <div class="info-box">
                  <p style="margin: 0;"><strong>Email:</strong> ${data.email}</p>
                  <p style="margin: 10px 0 0 0;"><strong>Signed up:</strong> ${data.timestamp}</p>
                </div>
                <p>You can now grant access to this user for early testing by visiting the admin panel.</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin" class="button">Go to Admin Panel</a>
              </div>
              <div class="footer">
                <p>EyrieCare Admin Notification</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return result;
  } catch (error) {
    console.error("Error sending waitlist notification email:", error);
    throw error;
  }
}

/**
 * Send confirmation email to user who joined waitlist
 */
export async function sendWaitlistConfirmation(email: string) {
  const fromEmail = process.env.FROM_EMAIL || "noreply@eyriecare.com";
  const fromName = process.env.FROM_NAME || "EyrieCare";

  try {
    const transporter = createEmailTransporter();
    
    const result = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: "Welcome to EyrieCare Waitlist",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1A73E8 0%, #0FB7A4 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
              .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">Welcome to EyrieCare!</h1>
              </div>
              <div class="content">
                <p>Thank you for joining the EyrieCare waitlist!</p>
                <p>We're excited to have you on board. You'll be notified as soon as we're ready to grant you early access to our AI-powered clinical reasoning and documentation platform.</p>
                <p>In the meantime, feel free to reach out if you have any questions.</p>
                <p>Best regards,<br>The EyrieCare Team</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} EyrieCare. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return result;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // Don't throw - confirmation email failure shouldn't block signup
    return null;
  }
}

