import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Users, Gauge, Pencil, Trash2 } from "lucide-react";

function RecipeDetail({ recipes, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <section className="container section empty-state">
        <h2>Resep tidak ditemukan</h2>
        <p>Resep ini mungkin sudah dihapus.</p>
        <Link to="/recipes" className="btn btn-primary">Kembali ke daftar resep</Link>
      </section>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Hapus resep "${recipe.name}"?`)) {
      onDelete(recipe.id);
      navigate("/recipes");
    }
  };

  return (
    <section className="container section detail">
      <Link to="/recipes" className="back-link">
        <ArrowLeft size={18} /> Kembali
      </Link>

      <div className="detail-header">
        <img src={recipe.image} alt={recipe.name} />
        <div className="detail-info">
          <span className="category-tag">{recipe.category}</span>
          <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>

          <ul className="meta-list">
            <li><Clock size={18} /> {recipe.time} menit</li>
            <li><Users size={18} /> {recipe.servings} porsi</li>
            <li><Gauge size={18} /> {recipe.difficulty}</li>
          </ul>

          <div className="action-row">
            <Link to={`/recipes/edit/${recipe.id}`} className="btn btn-outline">
              <Pencil size={16} /> Edit
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="panel">
          <h2>Bahan-bahan</h2>
          <ul className="ingredient-list">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h2>Cara membuat</h2>
          <ol className="step-list">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetail;
