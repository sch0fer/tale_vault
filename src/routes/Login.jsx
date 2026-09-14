import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Mail, Lock, LogIn } from "lucide-solid";
import { login } from "../lib/supabase";
import ResponseMessage from "../components/ResponseMessage";

function Login() {
  const [response, setResponse] = createSignal(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    const formData = new FormData(e.currentTarget);
    setResponse(await login(formData));
    if (response()?.status) navigate(`/profile/${response()?.data.id}`);
  };

  return (
    <div class="columns is-centered py-6">
      <div class="column is-10-tablet is-6-desktop is-5-widescreen">
        <div class="box bg-darker border-top-purple p-5 p-6-tablet">
          <div class="has-text-centered mb-6">
            <h2 class="title is-3 text-white font-weight-bold mb-3">
              Welcome back
            </h2>
            <p class="subtitle is-6 text-light-ter">
              Sign in to continue to TaleVault
            </p>
          </div>
          <ResponseMessage response={response} setResponse={setResponse} />

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
              <div class="is-flex is-justify-content-space-between is-align-items-center mb-2">
                <label class="label text-light is-size-7 mb-0" for="password">
                  Password
                </label>
                <A
                  href="#"
                  class="is-size-7 text-purple-accent hover-underline"
                >
                  Forgot password?
                </A>
              </div>
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
                    <LogIn size={18} />
                  </span>
                  <span>Sign in</span>
                </button>
              </div>
            </div>

            <div class="has-text-centered pt-5 border-top-dark">
              <p class="is-size-7 text-light-ter">
                Don't have an account?
                <A
                  href="/auth/sign-up"
                  class="text-purple-accent font-weight-semibold hover-underline ml-1"
                >
                  Create one!
                </A>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
