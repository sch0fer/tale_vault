function ValueCard({ icon, title, details, variant = "feature-purple-dark" }) {
  return (
    <div class="column is-4-desktop is-6-tablet">
      <div class={`feature-card ${variant}`}>
        <div class="feature-icon-box">{icon}</div>
        <h3 class="title is-4 text-white mb-3">{title}</h3>
        <p class="is-size-6 leading-relaxed text-light-ter">{details}</p>
      </div>
    </div>
  );
}

export default ValueCard;
