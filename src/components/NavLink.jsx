import { A } from "@solidjs/router";

function NavLink({ href, icon, onClick = () => {}, children }) {
  return (
    <A
      class="button text-light"
      inactiveClass="is-ghost"
      activeClass="is-purple"
      href={href}
      onClick={onClick}
      end={true}
    >
      <span class="icon">{icon}</span>
      <span>{children}</span>
    </A>
  );
}
export default NavLink;
