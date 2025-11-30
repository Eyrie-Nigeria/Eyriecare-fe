import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/storage";
import { createEmailTransporter } from "@/lib/email-helpers";
import { cookies } from "next/headers";


export async function POST(request: NextRequest) {
  try {
    // Check for session cookie
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { email, password, role} = await request.json();

    if (!email || !email.includes("@") || !role) {
      return NextResponse.json(
        { error: "Valid email and role are required" },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already has access" },
        { status: 400 }
      );
    }

    // Create user with password
    const user = await createUser(email, password, role);

    // Send access granted email
    try {
  
      const fromEmail = process.env.FROM_EMAIL || "noreply@eyriecare.com";
      const fromName = process.env.FROM_NAME || "EyrieCare";
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      const redirectUrl = `${appUrl}/login?redirect=/${role}`;
      
      
      const transporter = createEmailTransporter();
      
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: "🎉 Welcome to EyrieCare - Your Access is Ready!",
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
                .credentials-box { background: #E8F3FF; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #1A73E8; }
                .button { display: inline-block; background: #1A73E8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
                .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
                .password { font-family: monospace; background: white; padding: 8px 12px; border-radius: 4px; display: inline-block; margin: 5px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-size: 24px;">Welcome to EyrieCare!</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">Your early access has been granted</p>
                </div>
                <div class="content">
                  <p>Great news! You now have early access to EyrieCare.</p>
                  <div class="credentials-box">
                    <p style="margin: 0 0 10px 0;"><strong>Your Login Credentials:</strong></p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 5px 0;"><strong>Password:</strong> <span class="password">${password}</span></p>
                  </div>
                  <p><strong>Important:</strong> Please save this password securely. You can change it after logging in.</p>
                  <a href="${redirectUrl}" class="button">Login to EyrieCare</a>
                  <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                    If you have any questions, feel free to reach out to our support team.
                  </p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} EyrieCare. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send access email:", emailError);
      // Continue even if email fails - user is still created
    }

    return NextResponse.json(
      { 
        message: "Access granted successfully", 
        user: { email: user.email, createdAt: user.createdAt } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error granting access:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

