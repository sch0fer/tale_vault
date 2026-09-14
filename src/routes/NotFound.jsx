import { A } from "@solidjs/router";

function NotFound() {
  return (
    <>
      <h1>404</h1>
      <h3>Page you are looking for doesn't exist.</h3>
      <A href="/">Go back to homepage</A>
    </>
  );
}
export default NotFound;
