import { createSignal, createEffect, For } from "solid-js";
import { loadUserBooks, addBook } from "../utils/lib";
import { useAuth } from "../context/AuthContext";

import ResponseMessage from "../components/ResponseMessage";
import Book from "../components/Book";

function Write() {
  const [response, setResponse] = createSignal(null);
  const [books, setBooks] = createSignal([]);
  const { user } = useAuth();

  createEffect(() => {
    const author_id = user()?.id;
    if (!author_id) return;
    setResponse(loadUserBooks(author_id));
    setBooks(response().data);
  });

  const handleNewBook = async () => {
    setResponse(null);
    const author_id = user()?.id;
    setResponse(await addBook(author_id));
    setBooks((books) => [...books, data]);
  };

  return (
    <div>
      <h1>Editor's room</h1>

      <ResponseMessage response={response} setResponse={setResponse} />

      <button onClick={handleNewBook}>New book</button>

      <div>
        <For each={books()}>{(book) => <Book book={book} />}</For>
      </div>
    </div>
  );
}

export default Write;
