import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/CariResep";
import CategoryFilter from "../components/FilterKategori";
import RecipeCard from "../components/KartuResep";
import { filterRecipes } from "../data/bantuanResep";
import { useFavorites } from "./Favorit";

function RecipeList({ recipes, showOnlyFav }) {
  const [params] = useSearchParams();

  const [search, setSearch] = useState(params.get("q") || "");
  const [category, setCategory] = useState(
    params.get("category") || "Semua"
  );

  const { favorites } = useFavorites();

  let filtered = filterRecipes(recipes, search, category);

  if (showOnlyFav) {
    filtered = filtered.filter((recipe) =>
      favorites.includes(recipe.id)
    );
  }

  return (
    <section className="container section">
      <h1 className="page-title">
        {showOnlyFav ? "Resep Favorit" : "Jelajahi Semua Resep"}
      </h1>

      {!showOnlyFav && (
        <div className="toolbar">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <CategoryFilter
            selected={category}
            onSelect={setCategory}
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>
            {showOnlyFav
              ? "Belum ada resep favorit"
              : "Resep tidak ditemukan"}
          </h3>

          <p>
            {showOnlyFav
              ? "Tekan ikon hati pada kartu resep untuk menyimpan favorit."
              : "Coba kata kunci lain atau pilih kategori berbeda."}
          </p>
        </div>
      ) : (
        <>
          <p className="result-count">
            {filtered.length} resep ditemukan
          </p>

          <div className="recipe-grid">
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default RecipeList;
