import { A } from "@solidjs/router";
import { Show, createSignal, onMount } from "solid-js";
import { getBookCoverUrl } from "../lib/supabase";

function Book({ book }) {
  const [cover_url, setCoverUrl] = createSignal(null);

  onMount(async () => {
    if (!book?.cover_url) {
      return;
    }

    const result = await getBookCoverUrl(book.cover_url);

    if (result.success) {
      setCoverUrl(result.data);
    }
  });

  return (
    <div>
      <nav>
        <A href={`/app/write/${book.id}`}>Edit</A>
      </nav>

      <div>
        <Show when={cover_url()}>
          <img src={cover_url()} alt={`${book.title}'s cover`} />
        </Show>
      </div>

      <div>
        <h3>{book.title}</h3>
        <p>{book.blurp}</p>
      </div>

      <div>
        <p>{book.created_at}</p>
        <p>{book.updated_at}</p>
      </div>
    </div>
  );
}

export default Book;
