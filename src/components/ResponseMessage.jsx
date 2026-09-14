import { Show } from "solid-js";
import { CircleAlert } from "lucide-solid";

function ResponseMessage({ response, setResponse }) {
  return (
    <Show when={response()}>
      <div
        class={`message is-light is-size-7 py-3 px-4 mb-5 is-flex is-align-items-center gap-2 ${
          response().success ? "is-primary" : "is-danger"
        }`}
      >
        <div class="message-header">
          <CircleAlert size={16} />

          <button
            class="delete"
            aria-label="delete"
            onClick={() => setResponse(null)}
          />
        </div>

        <div class="message-body">{response().message}</div>
      </div>
    </Show>
  );
}

export default ResponseMessage;
