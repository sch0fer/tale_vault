import { A } from "@solidjs/router";

function FooterLink({ children, href, icon }) {
  return (
    <li>
      <A class="text-light-ter is-flex is-align-items-center py-1" href={href}>
        <span class="icon mr-2">{icon}</span>
        <span>{children}</span>
      </A>
    </li>
  );
}
export default FooterLink;
