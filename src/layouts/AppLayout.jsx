import Link from "../components/Link";
import { useAuth } from "../context/AuthContext";
import { createNavArray } from "../utils/lib";
import { For } from "solid-js";
function AppLayout({ children }) {
  const { user } = useAuth();
  const nav_array = createNavArray("app", { user_id: user()?.id });
  return (
    <nav class="panel">
      <p class="panel-heading">Your TaleVault</p>
      <p class="panel-tabs">
        <For each={nav_array}>{(nav_item) => <Link>{nav_item}</Link>}</For>
      </p>
      <div class="panel-block">
        <div class="container is-fluid">{children}</div>
      </div>
    </nav>
  );
}
export default AppLayout;
