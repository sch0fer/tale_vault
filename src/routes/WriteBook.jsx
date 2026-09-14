import { For } from "solid-js";
import { categories } from "../utils/static";
import CategoryCheckbox from "../components/CategoryCheckbox";

function WriteBook() {
  return (
    <form>
      <label>
        Title <input type="text" name="title" id="title" />
      </label>
      <div>
        <For each={categories}>
          {(category) => {
            <CategoryCheckbox>{category}</CategoryCheckbox>;
          }}
        </For>
      </div>
      <div>
        <label>Short summary</label>
        <textarea></textarea>
      </div>
    </form>
  );
}
export default WriteBook;
