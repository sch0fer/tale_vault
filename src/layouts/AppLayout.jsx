import { A } from "@solidjs/router";
import { PenLine, Compass, UserRound } from "lucide-solid";

function AppLayout({ children }) {
  return (
    <nav class="panel">
      <p class="panel-heading">Your TaleVault</p>
      <p class="panel-tabs">
        <A href="/app/write">Create</A>
        <A href="/app/explore">Explore</A>
        <A href="/app/profile/edit">Edit profile</A>
      </p>
      <div class="panel-block">{children}</div>
    </nav>
  );
}

export default AppLayout;
