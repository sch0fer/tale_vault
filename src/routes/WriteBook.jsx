import { For, Show, createSignal, onMount } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import {
  categories,
  loadBook,
  saveBook,
  addChapter,
  getBookCoverUrl,
} from "../lib/supabase";
import CategoryCheckbox from "../components/CategoryCheckbox";
import Chapter from "../components/Chapter";
import ResponseMessage from "../components/ResponseMessage";
import { useAuth } from "../context/AuthContext";

function WriteBook() {
  const { user } = useAuth();
  const [chapters, setChapters] = createSignal([]);
  const [cover_file, setCoverFile] = createSignal(null);
  const [cover_url, setCoverUrl] = createSignal(null);
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

    try {
      const result = await loadBook(book_id);

      setResponse(result);

      if (!result.success) {
        setBook(null);
        setChapters([]);
        return;
      }

      setBook(result.data.book);
      setChapters(result.data.chapters ?? []);
    } catch (error) {
      setBook(null);
      setChapters([]);

      setResponse({
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to load book.",
        data: null,
      });
    } finally {
      setLoading(false);
    }
  };

  onMount(async () => {
    await loadBookData();

    const current_book = book();

    if (!current_book?.cover_url) {
      return;
    }

    const result = await getBookCoverUrl(current_book.cover_url);

    if (result.success) {
      setCoverUrl(result.data);
    }
  });

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (saving() || !book_id) {
      return;
    }

    setResponse(null);
    setSaving(true);

    try {
      const form_data = new FormData(e.currentTarget);

      const result = await saveBook(
        user()?.id,
        book_id,
        form_data,
        cover_file(),
      );

      setResponse(result);

      if (result.success) {
        setBook(result.data);

        if (result.data?.cover_url) {
          const cover_result = await getBookCoverUrl(result.data.cover_url);

          if (cover_result.success) {
            setCoverUrl(cover_result.data);
          }
        }

        setCoverFile(null);
      }
    } catch (error) {
      setResponse({
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to save changes.",
        data: null,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();

    const current_book = book();

    if (!current_book) {
      return;
    }

    e.currentTarget.form?.reset();

    setCoverFile(null);
    setResponse(null);
  };

  const handleNewChapter = async () => {
    if (creating_chapter() || !book_id) {
      return;
    }

    setResponse(null);
    setCreatingChapter(true);

    try {
      const result = await addChapter(book_id);

      setResponse(result);

      if (result.success && result.data) {
        setChapters((current_chapters) => [...current_chapters, result.data]);

        navigate(`/app/write/${book_id}/${result.data.id}`);
      }
    } catch (error) {
      setResponse({
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to create chapter.",
        data: null,
      });
    } finally {
      setCreatingChapter(false);
    }
  };

  return (
    <Show when={!loading()} fallback={<p>Loading book...</p>}>
      <Show
        when={book()}
        fallback={
          <div>
            <ResponseMessage response={response} setResponse={setResponse} />

            <p>Unable to load this book.</p>
          </div>
        }
      >
        <form onSubmit={handleSaveChanges}>
          <div>
            <button type="submit" disabled={saving()}>
              {saving() ? "Saving..." : "Save changes"}
            </button>

            <button type="button" onClick={handleReset} disabled={saving()}>
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

            <input
              type="file"
              name="cover"
              id="cover"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0] ?? null;
                setCoverFile(file);
              }}
            />

            <Show when={cover_url()}>
              <img src={cover_url()} alt="Current book cover" />
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
              <span>Chapters</span>

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
    </Show>
  );
}

export default WriteBook;
