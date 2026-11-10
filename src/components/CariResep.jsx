import { Search, X } from "lucide-react";

function SearchBar({ value, onChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <Search size={20} className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari resep, contoh: nasi goreng"
        aria-label="Cari resep"
      />
      {value && (
        <button type="button" className="clear-btn" onClick={() => onChange("")} aria-label="Hapus pencarian">
          <X size={18} />
        </button>
      )}
    </form>
  );
}

export default SearchBar;
