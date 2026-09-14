import { For, Show, createSignal, createEffect } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { categories, loadBook, saveChanges, addChapter } from "../utils/lib";
import CategoryCheckbox from "../components/CategoryCheckbox";
import Chapter from "../components/Chapter";
import ResponseMessage from "../components/ResponseMessage";

function WriteBook() {
  const [chapters, setChapters] = createSignal([]);
  const [book, setBook] = createSignal(null);
  const [response, setResponse] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [saving, setSaving] = createSignal(false);
  const [creating_chapter, setCreatingChapter] = createSignal(false);

  const { book_id } = useParams();
  const navigate = useNavigate();

  const loadBookData = async () => {
    if (!book_id) {
      setResponse({
        success: false,
        message: "Book ID is required.",
        data: null,
      });
      setLoading(false);
      return;
    }

    setLoading(true);
    setResponse(null);

    const result = await loadBook(book_id);

    setResponse(result);

    if (result.success) {
      setBook(result.data.book);
      setChapters(result.data.chapters ?? []);
    } else {
      setBook(null);
      setChapters([]);
    }

    setLoading(false);
  };

  createEffect(() => {
    if (!book_id) {
      setLoading(false);
      return;
    }

    loadBookData();
  });

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (saving() || !book_id) {
      return;
    }

    setResponse(null);
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const result = await saveChanges(book_id, formData);

    setResponse(result);

    if (result.success) {
      setBook(result.data);
    }

    setSaving(false);
  };

  const handleNewChapter = async () => {
    if (creating_chapter() || !book_id) {
      return;
    }

    setResponse(null);
    setCreatingChapter(true);

    const result = await addChapter(book_id);

    setResponse(result);

    if (result.success && result.data) {
      setChapters((current_chapters) => [...current_chapters, result.data]);

      navigate(`/app/write/${book_id}/${result.data.id}`);
    }

    setCreatingChapter(false);
  };

  if (loading()) {
    return <p>Loading book...</p>;
  }

  return (
    <Show when={book()} fallback={<p>Unable to load this book.</p>}>
      <form onSubmit={handleSaveChanges}>
        <div>
          <button type="submit" disabled={saving()}>
            {saving() ? "Saving..." : "Save changes"}
          </button>

          <button type="reset" disabled={saving()}>
            Revert changes
          </button>
        </div>

        <ResponseMessage response={response} setResponse={setResponse} />

        <div>
          <label for="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={book()?.title ?? ""}
          />
        </div>

        <div>
          <label for="cover">Select cover</label>
          <input type="file" name="cover" id="cover" accept="image/*" />

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
          <div>
            Chapters
            <button
              type="button"
              onClick={handleNewChapter}
              disabled={creating_chapter()}
            >
              {creating_chapter() ? "Creating..." : "New chapter"}
            </button>
          </div>

          <For each={chapters()}>
            {(chapter) => <Chapter chapter={chapter} />}
          </For>
        </div>
      </form>
    </Show>
  );
}

export default WriteBook;
