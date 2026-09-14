import { A } from "@solidjs/router";

function Book({ book }) {
  return (
    <div>
      <nav>
        <A href={`/app/write/${book.id}`}>Edit</A>
      </nav>
      <div>
        <img src={book.cover_url} alt={`${book.title}'s cover`} />
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
