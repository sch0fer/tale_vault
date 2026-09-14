import { useNavigate } from "@solidjs/router";
import { logout } from "../lib/supabase";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/");
    }
  };
  handleLogout();
  return null;
}

export default Logout;
