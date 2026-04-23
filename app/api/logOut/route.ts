import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";

export async function GET() {
  // get session ID from cookie
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  // delete session from database if it exists
  if (sessionId) {
    await sql`
      DELETE FROM sessions
      WHERE session_id = ${sessionId}
    `;
  }

  // create response so we can modify cookies
  const response = NextResponse.redirect(new URL("/loggedOut", "http://localhost:3000"));

  // delete cookie from browser
  response.cookies.set("sessionId", "", {
    expires: new Date(0),
    path: "/",
  });

  return response;
}