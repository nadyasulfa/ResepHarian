import { Routes, Route } from "react-router-dom";
import usePenyimpanan from "./data/useStorage";
import initialRecipes from "./data/Recipes";
import { generateId } from "./data/bantuanResep";

import Navbar from "./components/Navigasi";
import Footer from "./components/Footer";
import Home from "./pages/Beranda";
import RecipeList from "./pages/DaftarResep";
import RecipeDetail from "./pages/DetailResep";
import AddRecipe from "./pages/TambahResep";
import EditRecipe from "./pages/EditResep";
import NotFound from "./pages/NotFound";

function App() {
  const [recipes, setRecipes] = usePenyimpanan("resepharian_recipes_v3", initialRecipes);

  const addRecipe = (data) => {
    const newRecipe = { ...data, id: generateId(), popular: false };
    setRecipes([newRecipe, ...recipes]);
    return newRecipe.id;
  };

  const updateRecipe = (id, data) => {
    setRecipes(recipes.map((r) => (r.id === id ? { ...r, ...data, id } : r)));
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  const shared = { recipes };

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home {...shared} />} />
          <Route path="/recipes" element={<RecipeList {...shared} />} />
          <Route path="/recipes/add" element={<AddRecipe onAdd={addRecipe} />} />
          <Route
            path="/recipes/edit/:id"
            element={<EditRecipe recipes={recipes} onUpdate={updateRecipe} />}
          />
          <Route path="/recipes/:id" element={<RecipeDetail {...shared} onDelete={deleteRecipe} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
