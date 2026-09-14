function Stat({ value, title }) {
  return (
    <div class="column is-3-desktop is-6-touch">
      <h2 class="title is-1 text-purple-accent font-weight-bold mb-1">
        {value}
      </h2>
      <p class="is-size-6 text-light-ter">{title}</p>
    </div>
  );
}

export default Stat;
