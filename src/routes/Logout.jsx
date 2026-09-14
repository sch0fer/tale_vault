import { logout } from "../utils/lib";
import { createEffect } from "solid-js";
function Logout() {
  createEffect(() => {
    logout();
  });
}
export default Logout;
