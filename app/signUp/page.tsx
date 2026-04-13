export default function SignUpComponent()
{
         return <form action="/api/signUp" method="POST">
  Email: <input name="email" />
  <br />Password: <input name="password" type="password" /><br/>
  <button type="submit">Login</button>
</form>
}