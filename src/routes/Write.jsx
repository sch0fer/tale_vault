import { createSignal, createEffect, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { loadUserBooks, addBook } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

import ResponseMessage from "../components/ResponseMessage";
import Book from "../components/Book";

function Write() {
  const [response, setResponse] = createSignal(null);
  const [books, setBooks] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [creating, setCreating] = createSignal(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  createEffect(() => {
    const author_id = user()?.id;

    if (!author_id) {
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    loadUserBooks(author_id).then((result) => {
      setResponse(result);

      if (result.success) {
        setBooks(result.data ?? []);
      } else {
        setBooks([]);
      }

      setLoading(false);
    });
  });

  const handleNewBook = async () => {
    const author_id = user()?.id;

    if (!author_id || creating()) {
      return;
    }

    setResponse(null);
    setCreating(true);

    const result = await addBook(author_id);

    setResponse(result);

    if (result.success && result.data) {
      setBooks((current_books) => [...current_books, result.data]);
      navigate(`/app/write/${result.data.id}`);
    }

    setCreating(false);
  };

  return (
    <div>
      <h1>Editor's room</h1>

      <ResponseMessage response={response} setResponse={setResponse} />

      <button onClick={handleNewBook} disabled={creating()}>
        {creating() ? "Creating..." : "New book"}
      </button>

      <div>
        {loading() ? (
          <p>Loading books...</p>
        ) : books().length === 0 ? (
          <p>No books yet.</p>
        ) : (
          <For each={books()}>{(book) => <Book book={book} />}</For>
        )}
      </div>
    </div>
  );
}

export default Write;
