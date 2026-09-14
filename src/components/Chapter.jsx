import { A } from "@solidjs/router";

function Chapter({ chapter }) {
  return (
    <div>
      <nav>
        <A href={`/app/write/${chapter.book_id}/${chapter.id}`}>Edit</A>
      </nav>
      <div>
        <h3>{chapter.title}</h3>
      </div>
      <div>
        <p>{chapter.created_at}</p>
        <p>{chapter.updated_at}</p>
      </div>
    </div>
  );
}
export default Chapter;
