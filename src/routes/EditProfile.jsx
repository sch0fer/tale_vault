import { useAuth } from "../context/AuthContext";

function EditProfile() {
  const { user } = useAuth();
  return (
    <div>
      <form>
        <fieldset>
          <legend>Change username</legend>
          <input type="text" name="new_username" id="new_username" />
        </fieldset>
        <fieldset>
          <legend>Change email</legend>
          <input type="email" name="new_email" id="new_email" />
        </fieldset>
        <fieldset>
          <legend>Change password</legend>
          <label>
            Password{" "}
            <input type="password" name="new_password" id="new_password" />
          </label>
          <label>
            Repeat password{" "}
            <input
              type="password"
              name="new_repeat_password"
              id="new_repeat_password"
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Confirm changes</legend>
          <label>
            Current password{" "}
            <input type="text" name="current_password" id="current_password" />
          </label>
          <label>
            <input type="checkbox" name="captcha" id="captcha" />
            Captcha
          </label>
        </fieldset>
        <div>
          <button type="submit">Submit changes</button>
        </div>
      </form>
    </div>
  );
}
export default EditProfile;
