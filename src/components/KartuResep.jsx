
import { Link } from "react-router-dom";
import { Clock, Heart, Users } from "lucide-react";
import { useFavorites } from "../pages/Favorit";

function RecipeCard({ recipe }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const liked = isFavorite(recipe.id);

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFavorite(recipe.id);
  };

  return (
    <article className="recipe-card">

      <div className="card-image">
        <Link to={`/recipes/${recipe.id}`}>
          <img
            src={recipe.image}
            alt={recipe.name}
            loading="lazy"
          />
        </Link>

        <button
          type="button"
          className={`fav-badge-btn ${liked ? "liked" : ""}`}
          onClick={handleFavClick}
          title={liked ? "Hapus dari Favorit" : "Simpan ke Favorit"}
          aria-label={liked ? "Hapus dari favorit" : "Simpan ke favorit"}
        >
          <Heart
            size={20}
            fill={liked ? "#e11d48" : "none"}
            color={liked ? "#e11d48" : "#64748b"}
          />
        </button>
      </div>

      <div className="card-body">
        <span className="category-tag">
          {recipe.category}
        </span>

        <h3>{recipe.name}</h3>

        <p className="card-meta">
          <Clock size={15} />
          {recipe.time} menit
        </p>

        <p className="card-description">
          {recipe.description}
        </p>

        <div className="recipe-card-bottom">
          <span>
            <Users size={15} />
            {recipe.servings || 2} Porsi
          </span>
        </div>

        <Link
          to={`/recipes/${recipe.id}`}
          className="btn btn-outline btn-block"
        >
          Lihat Resep
        </Link>
      </div>

    </article>
  );
}

export default RecipeCard;
