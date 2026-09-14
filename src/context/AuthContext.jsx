import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  Show,
  useContext,
} from "solid-js";
import { useNavigate } from "@solidjs/router";
import { supabase } from "../utils/lib";
const AuthContext = createContext();
export function AuthProvider(props) {
  const [user, setUser] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  onMount(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );
    return () => authListener.subscription.unsubscribe();
  });
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
export function ProtectedRoute(props) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  createEffect(() => {
    if (!loading() && !user()) {
      navigate("/auth/sign-in", { replace: true });
    }
  });
  return (
    <Show
      when={!loading()}
      fallback={
        <div class="has-text-centered py-6 text-light-ter"> Loading... </div>
      }
    >
      <Show when={user()}>{props.children}</Show>
    </Show>
  );
}
