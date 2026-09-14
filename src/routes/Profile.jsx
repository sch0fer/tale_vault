import { CalendarDays, BookOpen, PenLine, UserPen } from "lucide-solid";
import { useAuth } from "../context/AuthContext";
import { loadUserData } from "../lib/supabase";
import { useParams } from "@solidjs/router";
import { createEffect, createSignal, Show } from "solid-js";
import Link from "../components/Link";

function Profile() {
  const { user } = useAuth();
  const { user_id } = useParams();

  const [profile_data, setProfileData] = createSignal(null);
  const [response, setResponse] = createSignal(null);
  const [loading, setLoading] = createSignal(true);

  createEffect(() => {
    const load_profile = async () => {
      setLoading(true);
      setResponse(null);

      const result = await loadUserData(user_id);

      if (!result.success) {
        setResponse(result);
        setProfileData(null);
        setLoading(false);
        return;
      }

      setProfileData(result.data);
      setLoading(false);
    };

    load_profile();
  });

  return (
    <Show when={!loading()} fallback={<p>Loading profile...</p>}>
      <Show
        when={profile_data()}
        fallback={<p>{response()?.message ?? "Profile not found."}</p>}
      >
        {(profile) => (
          <section class="section px-0">
            <div class="columns is-centered">
              <div class="column is-10-desktop is-11-tablet">
                <article class="card bg-card border-dark">
                  <div class="card-content p-5 p-6-tablet">
                    <div class="columns is-vcentered is-variable is-6">
                      <div class="column is-narrow">
                        <div class="profile-avatar" aria-hidden="true">
                          <img
                            src={
                              profile().avatar_url ||
                              `https://placehold.co/100x100?text=${profile().display_name.substring(0, 1)}`
                            }
                            alt={`${profile().display_name}'s avatar`}
                          />
                        </div>
                      </div>

                      <div class="column">
                        <p class="is-size-7 text-purple has-text-weight-semibold mb-2">
                          PROFILE
                          <Show when={user_id == user()?.id}>
                            <Link>
                              {{
                                text: "Edit profile",
                                icon: UserPen,
                                link: `/profile/${user()?.id}/edit`,
                              }}
                            </Link>
                          </Show>
                        </p>

                        <h1 class="title is-2 text-light mb-2">
                          @{profile().display_name}
                        </h1>

                        <p class="text-light-ter">
                          {profile().bio || "Bio..."}
                        </p>
                      </div>
                    </div>

                    <hr class="my-6" />

                    <div class="columns is-multiline">
                      <div class="column is-6">
                        <div class="profile-info-item">
                          
                        </div>
                      </div>

                      <div class="column is-6">
                        <div class="profile-info-item">
                          <span class="icon text-purple">
                            <CalendarDays size={18} />
                          </span>

                          <div>
                            <p class="is-size-7 text-light-ter mb-1">
                              Member since
                            </p>

                            <p class="text-light">
                              {profile().created_at
                                ? new Date(
                                    profile().created_at,
                                  ).toLocaleDateString()
                                : "Not available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="columns mt-2">
                      <div class="column is-6">
                        <article class="card bg-dark border-dark is-flex is-flex-direction-column">
                          <div class="card-content is-flex-grow-1">
                            <span class="icon is-medium text-purple mb-3">
                              <BookOpen size={24} />
                            </span>

                            <h2 class="title is-5 text-light">Reading</h2>

                            <p class="text-light-ter is-size-7">
                              Your reading activity and saved stories will
                              appear here as those features are implemented.
                            </p>
                          </div>
                        </article>
                      </div>

                      <div class="column is-6">
                        <article class="card bg-dark border-dark is-flex is-flex-direction-column">
                          <div class="card-content is-flex-grow-1">
                            <span class="icon is-medium text-purple mb-3">
                              <PenLine size={24} />
                            </span>

                            <h2 class="title is-5 text-light">Writing</h2>

                            <p class="text-light-ter is-size-7">
                              Your stories and drafts will appear here as the
                              writing flow is implemented.
                            </p>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}
      </Show>
    </Show>
  );
}

export default Profile;
