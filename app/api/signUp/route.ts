import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

export async function POST(req: Request)
{
const formData = await req.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  console.log(`attempting to sign ${email} up`);
  if (email === null)
    return NextResponse.redirect(
  new URL("/error?message=missing_or_invalid_email", req.url)
);
  if (password === null)
    return NextResponse.redirect(
  new URL("/error?message=missing_or_invalid_password", req.url)
);
const saltLength = 10;
  try
  {
    const passwordHash = await bcrypt.hash(password as string,saltLength);
    const result = await sql`INSERT INTO users (email, password_hash) VALUES (${email as string},${passwordHash})`;
        // create a new session 
    const session = {id: crypto.randomUUID(),userEmail:email as string};
    await sql`
  INSERT INTO sessions (session_id, user_email)
  VALUES (${session.id}, ${session.userEmail})
`;
// respond with the session ID as as a cookie
    const response = NextResponse.redirect(new URL("/", req.url));
response.cookies.set("sessionId", session.id, {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
});
return response;
  }
  catch (e)
  {
    console.log(e);
    return NextResponse.redirect(new URL("/error/",req.url)); // error response should be blank without more info about the error, so as not to accidentally expose server information
  }
}