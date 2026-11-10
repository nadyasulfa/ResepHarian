import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/FormResep";

function EditRecipe({ recipes, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <section className="container section empty-state">
        <h2>Resep tidak ditemukan</h2>
        <Link to="/recipes" className="btn btn-primary">Kembali ke daftar resep</Link>
      </section>
    );
  }

  const handleSubmit = (data) => {
    onUpdate(id, data);
    navigate(`/recipes/${id}`);
  };

  return (
    <section className="container section narrow">
      <h1 className="page-title">Edit Resep</h1>
      <RecipeForm initialData={recipe} onSubmit={handleSubmit} submitLabel="Simpan Perubahan" />
    </section>
  );
}

export default EditRecipe;
