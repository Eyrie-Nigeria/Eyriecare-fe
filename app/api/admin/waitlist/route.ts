import { NextRequest, NextResponse } from "next/server";
import { getWaitlist } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // Check for session cookie (middleware also checks, but double-check here)
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const waitlist = await getWaitlist();
    
    // Sort by newest first
    const sorted = waitlist.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ waitlist: sorted }, { status: 200 });
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

