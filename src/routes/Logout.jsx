import { useNavigate } from "@solidjs/router";
import { supabase } from "../utils/supabase";
import { createEffect } from "solid-js";
function Logout() {
  createEffect(async () => {
    const navigate = useNavigate();
    await supabase.auth.signOut();
    navigate("/");
  });
}
export default Logout;
