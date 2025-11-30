import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/storage";
import { sendWaitlistNotification, sendWaitlistConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, role} = await request.json();

    if (!email || !email.includes("@") || !role) {
      return NextResponse.json(
        { error: "Valid email and role are required" },
        { status: 400 }
      );
    }

    // Add to waitlist storage
    const entry = await addToWaitlist(email, role);
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Send notification email to admin (don't block on failure)
    try {
      await sendWaitlistNotification({
        email: entry.email,
        timestamp,
      });
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError);
      // Continue even if email fails
    }

    // Send confirmation email to user (optional, don't block)
    try {
      await sendWaitlistConfirmation(entry.email);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Continue even if email fails
    }

    return NextResponse.json(
      { message: "Successfully joined waitlist", email: entry.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


