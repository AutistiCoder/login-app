import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

export async function POST(req: Request)
{
const formData = await req.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email,password);
  if (email === null)
    return NextResponse.redirect("/error?message=missing_or_invalid_email");
  if (password === null)
    return NextResponse.redirect("/error?message=missing_or_invalid_password");
const salt = 1; // for greater security, don't hardcode like I am doing here - this is for demo purposes only
  try
  {
    const passwordHash = await bcrypt.hash(password as string,salt);
    const result = await sql`INSERT INTO users (email, password_hash) VALUES (${email as string},${passwordHash})`;
    
    return NextResponse.redirect(new URL("/?loggedIn=true", req.url));
  }
  catch (e)
  {
    console.log(e);
    return NextResponse.redirect(new URL("/error/",req.url)); // error response should be blank without more info about the error, so as not to accidentally expose server information
  }
}