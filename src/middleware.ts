import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the request is for an API endpoint
  if (pathname.startsWith("/api")) {
    // 1. Handle preflight OPTIONS request
    if (request.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 200 });
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
      response.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight response for 24 hours
      return response;
    }

    // 2. Auth Protection Checks
    let authRequired = false;

    if (pathname === "/api/rates") {
      if (request.method !== "GET") {
        authRequired = true;
      }
    } else if (pathname === "/api/pickups") {
      if (request.method !== "POST") {
        authRequired = true;
      }
    } else if (pathname.startsWith("/api/pickups/")) {
      if (pathname === "/api/pickups/feedback" && request.method === "POST") {
        authRequired = false;
      } else {
        authRequired = true;
      }
    }

    if (authRequired) {
      const token = request.cookies.get("admin_session")?.value;
      const isValid = token ? await verifySession(token) : false;

      if (!isValid) {
        return NextResponse.json(
          { error: "Unauthorized: Access Denied" },
          { status: 401 }
        );
      }
    }

    // 3. Handle standard API requests (GET, POST, PATCH, etc.)
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    return response;
  }

  return NextResponse.next();
}

// Only match API routes
export const config = {
  matcher: "/api/:path*",
};
