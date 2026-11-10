import { CATEGORIES } from "../data/bantuanResep";

function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="category-filter">
      {["Semua", ...CATEGORIES].map((cat) => (
        <button
          key={cat}
          className={`chip ${selected === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
