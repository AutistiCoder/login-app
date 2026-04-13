export default function LoginComponent()
{
 return <form action="/api/login" method="POST">
  Username: <input name="email" />
  <br />Password: <input name="password" type="password" /><br/>
  <button type="submit">Login</button>
</form>
}