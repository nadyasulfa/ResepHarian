import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UtensilsCrossed, Cake, GlassWater, Cookie } from "lucide-react";
import SearchBar from "../components/CariResep";
import RecipeCard from "../components/KartuResep";

const categoryIcons = {
  "Makanan Utama": UtensilsCrossed,
  Dessert: Cake,
  Minuman: GlassWater,
  Camilan: Cookie,
};

function Home({ recipes }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const popular = recipes.filter((r) => r.popular).slice(0, 6);
  const shown = popular.length > 0 ? popular : recipes.slice(0, 6);

  const goSearch = () => {
    const q = search.trim();
    navigate(q ? `/recipes?q=${encodeURIComponent(q)}` : "/recipes");
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Masak Lebih Mudah, Sajikan Lebih Istimewa</h1>
          <p>Temukan berbagai resep masakan lezat yang mudah dibuat di rumah.</p>
          <SearchBar value={search} onChange={setSearch} onSubmit={goSearch} />
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Resep Populer</h2>
        <div className="recipe-grid">
          {shown.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Kategori Masakan</h2>
        <div className="category-grid">
          {Object.entries(categoryIcons).map(([name, Icon]) => (
            <Link key={name} to={`/recipes?category=${encodeURIComponent(name)}`} className="category-card">
              <Icon size={28} />
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
