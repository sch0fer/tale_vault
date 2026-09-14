import { For, createSignal, createEffect } from "solid-js";
import { useParams } from "@solidjs/router";
import { categories, loadBook, saveChanges } from "../utils/lib";
import CategoryCheckbox from "../components/CategoryCheckbox";
import Chapter from "../components/Chapter";
import ResponseMessage from "../components/ResponseMessage";

function WriteBook() {
  const [chapters, setChapters] = createSignal([]);
  const [book, setBook] = createSignal(null);
  const [response, setResponse] = createSignal(null);

  const { book_id } = useParams();

  createEffect(() => {
    if (!book_id) return;
    setResponse(loadBook(book_id));
    setChapters(response().data.chapters);
    setBook(response().data.book);
  });

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setResponse(await saveChanges(formData));
  };

  return (
    <form>
      <div>
        <button type="submit" onClick={handleSaveChanges}>
          Save changes
        </button>
        <button type="reset">Revert changes</button>
      </div>

      <ResponseMessage response={response} setResponse={setResponse} />

      <div>
        <label>
          Title{" "}
          <input
            type="text"
            name="title"
            id="title"
            value={book()?.title ?? ""}
          />
        </label>
      </div>

      <div>
        <label>
          Select cover{" "}
          <input type="file" name="cover" id="cover" accept="image/*" />
        </label>

        <Show when={book()?.cover_url}>
          <img src={book().cover_url} alt="Current book cover" />
        </Show>
      </div>

      <div>
        <For each={categories}>
          {(category) => <CategoryCheckbox>{category}</CategoryCheckbox>}
        </For>
      </div>

      <div>
        <label for="blurp">Short summary</label>

        <textarea name="blurp" id="blurp" value={book()?.blurp ?? ""} />
      </div>

      <div>
        Chapters
        <button type="button">New chapter</button>
        <For each={chapters()}>
          {(chapter) => <Chapter chapter={chapter} />}
        </For>
      </div>
    </form>
  );
}

export default WriteBook;
