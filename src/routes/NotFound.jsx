import { A } from "@solidjs/router";
function NotFound() {
  return (
    <section class="section">
      <div class="container">
        <div class="has-text-centered py-6">
          <p class="is-size-7 has-text-weight-semibold text-purple mb-3">
            ERROR
          </p>
          <h1 class="title is-1 text-light mb-3">404</h1>
          <p class="subtitle is-6 text-light-ter mb-5">
            The page you're looking for doesn't exist.
          </p>
          <A class="button is-purple" href="/">
            Go back home
          </A>
        </div>
      </div>
    </section>
  );
}
export default NotFound;
