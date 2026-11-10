import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      <div className="card-image">
        <img src={recipe.image} alt={recipe.name} loading="lazy" />
      </div>

      <div className="card-body">
        <span className="category-tag">{recipe.category}</span>
        <h3>{recipe.name}</h3>
        <p className="card-meta">
          <Clock size={15} /> {recipe.time} menit
        </p>
        <Link to={`/recipes/${recipe.id}`} className="btn btn-outline btn-block">
          Lihat Resep
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;
