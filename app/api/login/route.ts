// log the user in using POST
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  const formData = await req.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email,password);
  if (email === null)
    return NextResponse.json({error: "missing email"}, {status: 400});
  if (password === null)
    return NextResponse.json({error: "missing password"}, {status: 400});
  const salt = 1; // for greater security, don't hardcode like I am doing here - this is for demo purposes only
  try
  {
    const hashString = await bcrypt.hash(password as string,salt);
    console.log(hashString);
    return NextResponse.redirect(new URL("/?loggedIn=true", req.url));
  }
  catch (e)
  {
    console.log(e);
    return NextResponse.json({error: ""}, {status: 500}); // error response should be blank without more info about the error, so as not to accidentally expose server information
  }
  
  
}