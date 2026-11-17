import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UtensilsCrossed, Cake, GlassWater, Cookie } from "lucide-react";
import SearchBar from "../components/CariResep";
import RecipeCard from "../components/KartuResep";
import { useFavorites } from "./Favorit";

const categoryIcons = {
  "Makanan Utama": UtensilsCrossed,
  Dessert: Cake,
  Minuman: GlassWater,
  Camilan: Cookie,
};


function Home({ recipes, showOnlyFav }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { favorites } = useFavorites();

  const popular = recipes.filter((r) => r.popular).slice(0, 6);
  const shown = popular.length > 0 ? popular : recipes.slice(0, 6);

  const displayedRecipes = showOnlyFav
    ? recipes.filter((r) => favorites.includes(r.id))
    : shown;

  const goSearch = () => {
    const q = search.trim();
    navigate(q ? `/recipes?q=${encodeURIComponent(q)}` : "/recipes");
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Masak Lebih Mudah, Sajikan Lebih Istimewa</h1>
          <p>
            Temukan berbagai resep masakan lezat yang mudah dibuat di rumah.
          </p>
          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={goSearch}
          />
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">
          {showOnlyFav ? "Resep Favorit" : "Resep Populer"}
        </h2>

        {displayedRecipes.length === 0 ? (
          <div className="empty-state">
            <h3>
              {showOnlyFav
                ? "Belum ada resep favorit"
                : "Belum ada resep"}
            </h3>
            <p>
              {showOnlyFav
                ? "Tekan ikon hati pada resep untuk menyimpannya."
                : "Tambahkan resep untuk mulai mengisi koleksi."}
            </p>
          </div>
        ) : (
          <div className="recipe-grid">
            {displayedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {!showOnlyFav && (
        <section className="container section">
          <h2 className="section-title">Kategori Masakan</h2>

          <div className="category-grid">
            {Object.entries(categoryIcons).map(([name, Icon]) => (
              <Link
                key={name}
                to={`/recipes?category=${encodeURIComponent(name)}`}
                className="category-card"
              >
                <Icon size={28} />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
