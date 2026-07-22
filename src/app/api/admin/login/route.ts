import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { password } = body;

    const correctKey = process.env.ADMIN_ACCESS_KEY || "admin9550";
    if (password === correctKey) {
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
