import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/FormResep";

function AddRecipe({ onAdd }) {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const newId = onAdd(data);
    navigate(`/recipes/${newId}`);
  };

  return (
    <section className="container section narrow">
      <h1 className="page-title">Tambah Resep Baru</h1>
      <RecipeForm onSubmit={handleSubmit} submitLabel="Simpan Resep" />
    </section>
  );
}

export default AddRecipe;
