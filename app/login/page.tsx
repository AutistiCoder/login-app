export default function LoginComponent()
{
 return <form action="/api/login" method="POST">
  <input name="email" />
  <input name="password" type="password" />
  <button type="submit">Login</button>
</form>
}