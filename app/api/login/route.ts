// log the user in using POST
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";
export async function POST(req: Request) {
  const formData = await req.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  console.log(`attempting to log ${email} in`);
  if (email === null)
    return NextResponse.redirect(new URL("/error?message=missing_or_invalid_email",req.url));
  if (password === null)
    return NextResponse.redirect(new URL("/error?message=missing_or_invalid_password",req.url));
  try
  {
  // check to see if the user record exists and has this password
  const results = await sql`SELECT email,password_hash FROM users WHERE email=${email as string}`;
  if (results.rows.length === 0)
    return NextResponse.redirect(new URL("/error?message=missing_user",req.url));
  const isValid = await bcrypt.compare(
  password as string,
  results.rows[0].password_hash
);
  if (isValid)
    return NextResponse.redirect(new URL("/?loggedIn=true", req.url));
  else
    return NextResponse.redirect(new URL("/error?message=missing_or_invalid_password",req.url));
}
catch (e)
{
  console.log(e);
  return NextResponse.redirect(new URL("/error",req.url));
}

}