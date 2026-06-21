import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { password } = body;

    if (password === "admin9550") {
      const session = await createSession("admin");
      const res = NextResponse.json({ success: true });
      
      res.cookies.set("admin_session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      
      return res;
    }

    return NextResponse.json({ error: "Invalid access key" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
