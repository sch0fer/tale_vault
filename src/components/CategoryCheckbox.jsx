function CategoryCheckbox({ children, categories = [] }) {
  const slug = children.toLowerCase();
  return (
    <label class="checkbox text-light-ter mb-3">
      <input
        class="mr-2"
        type="checkbox"
        name="category"
        value={slug}
        checked={categories.includes(slug)}
      />
      {children}
    </label>
  );
}
export default CategoryCheckbox;
