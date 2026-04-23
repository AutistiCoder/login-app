import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";
export default async function ProtectedPage()
{
    // try to retrieve a login cookie
    const cookieStore = await cookies();
     const sessionId = cookieStore.get("sessionId")?.value;
 // if there's no session ID stored, user is not logged in; tell them to log in.
  if (!sessionId) {
    return (
      <div>
        Please log in to view this page.
      </div>
    );
  }

  const results = await sql`
    SELECT user_email
    FROM sessions
    WHERE session_id = ${sessionId}
  `;
  // if session found, welcome the user.
  // else tell them to log in
  if (results.rows.length > 0)
    return <div>
        Welcome to this protected page! In a real app, you might create a post, access bank details, or something. Here, all you can do is read this.
    </div>;
    return <div>
        Please log in to view this page.
      </div>
}