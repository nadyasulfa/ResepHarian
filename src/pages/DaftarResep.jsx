import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/CariResep";
import CategoryFilter from "../components/FilterKategori";
import RecipeCard from "../components/KartuResep";
import { filterRecipes } from "../data/bantuanResep";

function RecipeList({ recipes }) {
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "Semua");

  const filtered = filterRecipes(recipes, search, category);

  return (
    <section className="container section">
      <h1 className="page-title">Jelajahi Semua Resep</h1>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>Resep tidak ditemukan</h3>
          <p>Coba kata kunci lain atau pilih kategori yang berbeda.</p>
        </div>
      ) : (
        <>
          <p className="result-count">{filtered.length} resep ditemukan</p>
          <div className="recipe-grid">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default RecipeList;
