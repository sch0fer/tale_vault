import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  return <div>Profile</div>;
}
export default Profile;
