export default function CategoryTabs({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="category-tabs">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`tab-btn${activeCategory === cat ? ' active' : ''}`}
          onClick={() => setActiveCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}