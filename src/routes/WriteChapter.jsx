import { Show, createSignal, createEffect } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { loadBook, saveChapter } from "../lib/supabase";
import ResponseMessage from "../components/ResponseMessage";

function WriteChapter() {
  const [chapter, setChapter] = createSignal(null);
  const [response, setResponse] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [saving, setSaving] = createSignal(false);

  const { book_id, chapter_id } = useParams();
  const navigate = useNavigate();

  createEffect(() => {
    if (!book_id || !chapter_id) {
      setResponse({
        success: false,
        message: "Book ID and chapter ID are required.",
        data: null,
      });
      setLoading(false);
      return;
    }

    const loadChapter = async () => {
      setLoading(true);
      setResponse(null);

      const result = await loadBook(book_id);

      if (!result.success) {
        setResponse(result);
        setLoading(false);
        return;
      }

      const current_chapter = result.data.chapters.find(
        (item) => item.id === chapter_id,
      );

      if (!current_chapter) {
        setResponse({
          success: false,
          message: "Chapter not found.",
          data: null,
        });
        setLoading(false);
        return;
      }

      setChapter(current_chapter);
      setLoading(false);
    };

    loadChapter();
  });

  const handleSave = async (e) => {
    e.preventDefault();

    if (saving() || !chapter_id) {
      return;
    }

    setResponse(null);
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const result = await saveChapter(chapter_id, formData);

    setResponse(result);

    if (result.success) {
      setChapter(result.data);
    }

    setSaving(false);
  };

  if (loading()) {
    return <p>Loading chapter...</p>;
  }

  return (
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
  );
}

export default WriteChapter;
