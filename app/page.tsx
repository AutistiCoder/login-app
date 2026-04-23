import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";

export default async function Home() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return (
      <div>
        <a href="/login">Log In</a>
        <br />
        <a href="/signUp">Sign Up</a>
      </div>
    );
  }

  const results = await sql`
    SELECT user_email
    FROM sessions
    WHERE session_id = ${sessionId}
  `;

  if (results.rows.length === 0) {
    return (
      <div>
        <a href="/login">Log In</a>
        <br />
        <a href="/signUp">Sign Up</a>
        
        </div>
    );
  }

  return <div>
    
        <a href="/api/logOut">Log Out</a>
        <br />
    Welcome, {results.rows[0].user_email}!</div>;
}