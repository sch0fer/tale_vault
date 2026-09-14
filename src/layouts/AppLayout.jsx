import { A } from "@solidjs/router";
import { useAuth } from "../context/AuthContext";
function AppLayout({ children }) {
  const { user } = useAuth();
  return (
    <nav class="panel">
      <p class="panel-heading">Your TaleVault</p>
      <p class="panel-tabs">
        <A href="/app/write" activeClass="is-active" end>
          Create
        </A>
        <A href="/app/explore" activeClass="is-active" end>
          Explore
        </A>
        <A href={`/profile/${user()?.id}/edit`} activeClass="is-active" end>
          Edit profile
        </A>
        <A href="/app/settings" activeClass="is-active" end>
          Settings
        </A>
      </p>
      <div class="panel-block">
        <div class="container is-fluid">{children}</div>
      </div>
    </nav>
  );
}
export default AppLayout;
