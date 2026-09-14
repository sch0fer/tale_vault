import { A } from "@solidjs/router";
import { useAuth } from "../context/AuthContext";
import { Show, createEffect, createSignal } from "solid-js";
function Link({ children }) {
  const { user } = useAuth();
  const [condition, setCondition] = createSignal(true);
  createEffect(() => {
    if (children.when) {
      switch (children.when) {
        case "userAuth":
          setCondition(user()?.id);
          break;
        case "userNoAuth":
          setCondition(!user()?.id);
          break;
      }
    }
  });
  return (
    <Show when={condition()}>
      <A
        class="button text-light"
        inactiveClass="is-ghost"
        activeClass="is-purple"
        href={children.link}
        onClick={children.onClick}
        end
      >
        <span class="icon">{children.icon}</span> <span>{children.text}</span>
      </A>
    </Show>
  );
}
export default Link;
