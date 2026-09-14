import { Show } from "solid-js";
import { A } from "@solidjs/router";
import {
  User,
  Mail,
  CalendarDays,
  BookOpen,
  PenLine,
  Settings,
} from "lucide-solid";

import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <section class="section px-0">
      <div class="columns is-centered">
        <div class="column is-10-desktop is-11-tablet">
          <div class="card bg-card border-dark">
            <div class="card-content p-6">
              {/* Profile header */}
              <div class="columns is-vcentered is-variable is-6">
                <div class="column is-narrow">
                  <div class="profile-avatar" aria-hidden="true">
                    <User size={48} />
                  </div>
                </div>

                <div class="column">
                  <p class="is-size-7 text-purple has-text-weight-semibold mb-2">
                    PROFILE
                  </p>

                  <h1 class="title is-2 text-light mb-2">
                    {user()?.user_metadata?.username ||
                      user()?.email?.split("@")[0] ||
                      "TaleVault user"}
                  </h1>

                  <p class="text-light-ter">
                    Your TaleVault reader and writer profile.
                  </p>
                </div>

                <div class="column is-narrow">
                  <A class="button is-purple" href="/app/profile/edit">
                    <span class="icon">
                      <Settings size={16} />
                    </span>

                    <span>Edit profile</span>
                  </A>
                </div>
              </div>

              <hr class="has-background-grey-darker my-6" />

              {/* Account information */}
              <div class="columns is-multiline">
                <div class="column is-6">
                  <div class="profile-info-item">
                    <span class="icon text-purple">
                      <Mail size={18} />
                    </span>

                    <div>
                      <p class="is-size-7 text-light-ter mb-1">Email</p>

                      <p class="text-light">
                        {user()?.email || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="column is-6">
                  <div class="profile-info-item">
                    <span class="icon text-purple">
                      <CalendarDays size={18} />
                    </span>

                    <div>
                      <p class="is-size-7 text-light-ter mb-1">Member since</p>

                      <p class="text-light">
                        {user()?.created_at
                          ? new Date(user().created_at).toLocaleDateString()
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile sections */}
              <div class="columns mt-2">
                <div class="column is-6">
                  <div class="card bg-dark border-dark h-100">
                    <div class="card-content">
                      <span class="icon is-medium text-purple mb-3">
                        <BookOpen size={24} />
                      </span>

                      <h2 class="title is-5 text-light">Reading</h2>

                      <p class="text-light-ter is-size-7">
                        Your reading activity and saved stories can appear here
                        as those features are implemented.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="column is-6">
                  <div class="card bg-dark border-dark h-100">
                    <div class="card-content">
                      <span class="icon is-medium text-purple mb-3">
                        <PenLine size={24} />
                      </span>

                      <h2 class="title is-5 text-light">Writing</h2>

                      <p class="text-light-ter is-size-7">
                        Your stories and drafts can appear here as the writing
                        flow is implemented.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Show when={!user()}>
            <p class="has-text-centered text-light-ter mt-5">
              Please sign in to view your profile.
            </p>
          </Show>
        </div>
      </div>
    </section>
  );
}

export default Profile;
