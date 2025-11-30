import nodemailer from "nodemailer";

export function createEmailTransporter() {
  // If using Gmail or any other service (simplest + recommended)
  if (process.env.SMTP_SERVICE) {
    return nodemailer.createTransport({
      service: process.env.SMTP_SERVICE, // 'gmail'
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD, // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false, // <— FIX
      },
    });
  }

  // Custom SMTP configuration
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // Gmail requires this unless on port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // <— FIX
    },
  });
}

export async function verifyEmailConfig() {
  try {
    const transporter = createEmailTransporter();
    await transporter.verify();
    console.log("✅ Email server is ready to send messages");
    return true;
  } catch (error) {
    console.error("❌ Email server configuration error:", error);
    return false;
  }
}
