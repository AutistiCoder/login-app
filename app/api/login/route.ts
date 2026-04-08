// log the user in using POST
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email,password);
  // Fake success for now
 return NextResponse.redirect(new URL("/?loggedIn=true", req.url));
}