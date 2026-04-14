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
    
    return NextResponse.redirect(new URL("/?loggedIn=true", req.url));
  }
  catch (e)
  {
    console.log(e);
    return NextResponse.redirect(new URL("/error/",req.url)); // error response should be blank without more info about the error, so as not to accidentally expose server information
  }
}