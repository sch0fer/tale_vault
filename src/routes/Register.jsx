import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { Mail, Lock, UserPlus, CircleAlert } from "lucide-solid";
import { supabase } from "../utils/supabase";

function Register() {
  const [response, setResponse] = createSignal(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const repeat_password = formData.get("repeat_password");
    if (password != repeat_password) {
      setResponse({
        success: false,
        message: "Passwords must be identical!",
        data: null,
      });
      return;
    }
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setResponse({
        success: false,
        message: error.message,
        data: null,
      });
      return;
    }
    setResponse({
      success: true,
      message: "Your account has been created!",
      data: data,
    });
  };

  return (
    <div class="columns is-centered py-6">
      <div class="column is-10-tablet is-6-desktop is-5-widescreen">
        <div class="box bg-darker border-top-purple p-5 p-6-tablet">
          <div class="has-text-centered mb-6">
            <h2 class="title is-3 text-white font-weight-bold mb-3">
              Create an account
            </h2>
            <p class="subtitle is-6 text-light-ter">
              Join TaleVault to start reading and writing
            </p>
          </div>

          <Show when={response()}>
            <div
              class={`notification is-light is-size-7 py-3 px-4 mb-5 is-flex is-align-items-center gap-2 ${response().success ? "is-primary" : "is-danger"}`}
            >
              <CircleAlert size={16} />
              <span>{response().message}</span>
            </div>
          </Show>

          <form onSubmit={handleSubmit}>
            <div class="field mb-5">
              <label class="label text-light is-size-7 mb-2" for="email">
                Email address
              </label>
              <div class="control has-icons-left">
                <input
                  class="input bg-dark text-light border-dark py-5"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@domain.com"
                  required
                />
                <span class="icon is-small is-left text-light-ter">
                  <Mail size={16} />
                </span>
              </div>
            </div>

            <div class="field mb-5">
              <label class="label text-light is-size-7 mb-2" for="password">
                Password
              </label>
              <div class="control has-icons-left">
                <input
                  class="input bg-dark text-light border-dark py-5"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                />
                <span class="icon is-small is-left text-light-ter">
                  <Lock size={16} />
                </span>
              </div>
            </div>

            <div class="field mb-5">
              <label
                class="label text-light is-size-7 mb-2"
                for="repeat_password"
              >
                Repeat password
              </label>
              <div class="control has-icons-left">
                <input
                  class="input bg-dark text-light border-dark py-5"
                  type="password"
                  name="repeat_password"
                  id="repeat_password"
                  placeholder="••••••••"
                  required
                />
                <span class="icon is-small is-left text-light-ter">
                  <Lock size={16} />
                </span>
              </div>
            </div>

            <div class="field mb-6">
              <div class="control">
                <label class="checkbox text-light-ter is-size-7 is-flex is-align-items-center gap-2">
                  <input type="checkbox" name="captcha" id="captcha" required />
                  <span>I am human (Captcha verification)</span>
                </label>
              </div>
            </div>

            <div class="field mb-6">
              <div class="control">
                <button
                  type="submit"
                  class="button is-purple is-fullwidth font-weight-semibold py-5"
                >
                  <span class="icon mr-2">
                    <UserPlus size={18} />
                  </span>
                  <span>Sign up</span>
                </button>
              </div>
            </div>

            <div class="has-text-centered pt-5 border-top-dark">
              <p class="is-size-7 text-light-ter">
                Already have an account?
                <A
                  href="/auth/sign-in"
                  class="text-purple-accent font-weight-semibold hover-underline ml-1"
                >
                  Sign in!
                </A>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
