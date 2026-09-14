import { useSearchParams } from "@solidjs/router";
import CategoryCheckbox from "../components/CategoryCheckbox";

function Explore() {
  const [searchParams] = useSearchParams();
  const categories = Array.isArray(searchParams.category)
    ? searchParams.category
    : searchParams.category
      ? [searchParams.category]
      : [];
  return (
    <section class="section px-0">
      <div class="container">
        <div class="columns is-variable is-6">
          <div class="column is-4-desktop is-5-tablet">
            <div class="card bg-card border-dark">
              <div class="card-content">
                <h1 class="title is-4 text-light mb-2">Explore</h1>

                <p class="text-light-ter is-size-7 mb-5">
                  Find stories you want to read.
                </p>

                <form>
                  <div class="field">
                    <label class="label text-light" for="explore-search">
                      Search
                    </label>

                    <div class="control">
                      <input
                        id="explore-search"
                        class="input"
                        type="search"
                        name="query"
                        placeholder="Search stories..."
                        value={searchParams.query || ""}
                      />
                    </div>
                  </div>

                  <fieldset class="field">
                    <legend class="label text-light mb-3">Categories</legend>

                    <div class="is-flex is-flex-direction-column">
                      <CategoryCheckbox categories={categories}>
                        Fantasy
                      </CategoryCheckbox>
                      <CategoryCheckbox categories={categories}>
                        Sci-Fi
                      </CategoryCheckbox>
                      <CategoryCheckbox categories={categories}>
                        Thriller
                      </CategoryCheckbox>
                      <CategoryCheckbox categories={categories}>
                        Horror
                      </CategoryCheckbox>
                      <CategoryCheckbox categories={categories}>
                        Love
                      </CategoryCheckbox>
                    </div>
                  </fieldset>

                  <div class="field mt-5">
                    <div class="control">
                      <button
                        class="button is-purple is-fullwidth"
                        type="submit"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="is-flex is-justify-content-space-between is-align-items-center mb-5">
              <div>
                <h2 class="title is-4 text-light mb-1">Results</h2>
                <p class="text-light-ter is-size-7">
                  Discover stories from the TaleVault community.
                </p>
              </div>
            </div>

            <div class="card bg-card border-dark">
              <div class="card-content has-text-centered py-6">
                <p class="text-light-ter">No stories found yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Explore;
