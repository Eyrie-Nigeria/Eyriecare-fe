import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect admin API routes (page protection is handled by layout.tsx)
  if (pathname.startsWith("/api/admin")) {
    const session = request.cookies.get("admin_session");
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }
  else if (pathname.startsWith("/api/doctor")) {
    const session = request.cookies.get("doctor_session");
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }
  else if (pathname.startsWith("/api/student")) {
    const session = request.cookies.get("student_session");
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/api/doctor/:path*", "/api/student/:path*"],
  
};

