import { Show, createSignal, onMount } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { loadChapter, saveChapter } from "../lib/supabase";
import ResponseMessage from "../components/ResponseMessage";

function WriteChapter() {
  const [chapter, setChapter] = createSignal(null);
  const [response, setResponse] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [saving, setSaving] = createSignal(false);

  const { book_id, chapter_id } = useParams();
  const navigate = useNavigate();

  const loadChapterData = async () => {
    if (!book_id || !chapter_id) {
      setResponse({
        success: false,
        message: "Book ID and chapter ID are required.",
        data: null,
      });
      setChapter(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const result = await loadChapter(book_id, chapter_id);

      setResponse(result);

      if (!result.success) {
        setChapter(null);
        return;
      }

      setChapter(result.data);
    } catch (error) {
      setChapter(null);

      setResponse({
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to load chapter.",
        data: null,
      });
    } finally {
      setLoading(false);
    }
  };

  onMount(loadChapterData);

  const handleSave = async (e) => {
    e.preventDefault();

    if (saving() || !chapter_id) {
      return;
    }

    setResponse(null);
    setSaving(true);

    try {
      const form_data = new FormData(e.currentTarget);
      const result = await saveChapter(chapter_id, form_data);

      setResponse(result);

      if (result.success) {
        setChapter(result.data);
      }
    } catch (error) {
      setResponse({
        success: false,
        message:
          error instanceof Error ? error.message : "Unable to save chapter.",
        data: null,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Show when={!loading()} fallback={<p>Loading chapter...</p>}>
      <Show
        when={chapter()}
        fallback={
          <ResponseMessage response={response} setResponse={setResponse} />
        }
      >
        <form onSubmit={handleSave}>
          <div>
            <button type="submit" disabled={saving()}>
              {saving() ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/app/write/${book_id}`)}
              disabled={saving()}
            >
              Back to book
            </button>
          </div>

          <ResponseMessage response={response} setResponse={setResponse} />

          <div>
            <label for="title">Chapter title</label>

            <input
              type="text"
              name="title"
              id="title"
              value={chapter()?.title ?? ""}
            />
          </div>

          <div>
            <label for="content">Content</label>

            <textarea
              name="content"
              id="content"
              value={chapter()?.content_encrypted ?? ""}
            />
          </div>
        </form>
      </Show>
    </Show>
  );
}

export default WriteChapter;
