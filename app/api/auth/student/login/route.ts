import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Simple admin credentials - in production, use environment variables
const STUDENT_EMAIL = process.env.STUDENT_LOGIN_EMAIL || "student";
const STUDENT_PASSWORD = process.env.STUDENT_LOGIN_PASSWORD || "password";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Simple credential check
    // Accepts "admin", "admin@eyriecare.com", or any email starting with "admin"
    const normalizedEmail = email.toLowerCase().trim();
    const isStudentEmail = 
      normalizedEmail === STUDENT_EMAIL.toLowerCase() ||
      normalizedEmail === "student@eyriecare.com" ||
      normalizedEmail === "student" ||
      normalizedEmail.startsWith("student@");

    if (!isStudentEmail || password !== STUDENT_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create a simple session token (in production, use JWT or proper session management)
    const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString("base64");
    
    // Set cookie with session
    const cookieStore = await cookies();
    cookieStore.set("student_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

