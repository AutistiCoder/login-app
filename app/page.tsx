type HomeProps = {searchParams?: Promise<{loggedIn?: string}>};
export default async function Home(props: HomeProps) {
  const searchParams = await props.searchParams;
  const isLoggedIn = searchParams?.loggedIn === "true";
  // if we're logged in, return a div with "Welcome", else return a link to the login page
  return isLoggedIn ? <div>Welcome</div> : 
  <div><a href="/login">Log In</a>
  <br/>
  <a href="/signUp">Sign Up</a>
  </div>;
}
