import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist, prisma } from "@/lib/prisma";
import { sendWaitlistNotification, sendWaitlistConfirmation } from "@/lib/email";
import { Check } from 'lucide-react';

// export async function POST(request: NextRequest) {
//   try {
//     const { email, role} = await request.json();

//     if (!email || !email.includes("@") || !role) {
//       return NextResponse.json(
//         { error: "Valid email and role are required" },
//         { status: 400 }
//       );
//     }

//     // Add to waitlist storage
//     const entry = await addToWaitlist(email, role);
//     const timestamp = new Date().toLocaleString("en-US", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });

//     // Send notification email to admin (don't block on failure)
//     try {
//       await sendWaitlistNotification({
//         email: entry.email,
//         timestamp,
//       });
//     } catch (emailError) {
//       console.error("Failed to send admin notification:", emailError);
//       // Continue even if email fails
//     }

//     // Send confirmation email to user (optional, don't block)
//     try {
//       await sendWaitlistConfirmation(entry.email);
//     } catch (emailError) {
//       console.error("Failed to send confirmation email:", emailError);
//       // Continue even if email fails
//     }

//     return NextResponse.json(
//       { message: "Successfully joined waitlist", email: entry.email },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Waitlist error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json({ error: "Email and role are required" }, { status: 400 });
    }
    const CheckEntry = await prisma.waitlistEntry.findUnique({
        where: { email: email.toLowerCase() },
      });
    
    if (CheckEntry) return NextResponse.json({ error: "Email already on waitlist" }, { status: 400 });
    
    const entry = await addToWaitlist(email, role);
     const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

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


    return NextResponse.json({ success: true, entry });
  } catch (err) {
    console.error("Error adding to waitlist:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const waitlist = await import("@/lib/prisma").then((m) => m.getWaitlist());
    return NextResponse.json({ waitlist });
  } catch (err) {
    console.error("Error fetching waitlist:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
