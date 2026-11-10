import { useState } from "react";
import { CATEGORIES, DIFFICULTIES, listToText, textToList, resizeImage } from "../data/bantuanResep";

const emptyForm = {
  name: "",
  category: CATEGORIES[0],
  image: "",
  description: "",
  time: "",
  servings: "",
  difficulty: DIFFICULTIES[0],
  ingredients: "",
  steps: "",
};

function RecipeForm({ initialData = null, onSubmit, submitLabel = "Simpan Resep" }) {
  const [form, setForm] = useState(
    initialData
      ? {
          ...initialData,
          ingredients: listToText(initialData.ingredients),
          steps: listToText(initialData.steps),
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const image = await resizeImage(file);
    setForm((prev) => ({ ...prev, image }));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.image) newErrors.image = "Pilih foto masakan.";
    if (!form.name.trim()) newErrors.name = "Nama masakan wajib diisi.";
    if (!form.time || Number(form.time) <= 0) newErrors.time = "Isi waktu memasak lebih dari 0 menit.";
    if (!form.servings || Number(form.servings) <= 0) newErrors.servings = "Isi jumlah porsi lebih dari 0.";
    if (textToList(form.ingredients).length === 0) newErrors.ingredients = "Tulis minimal satu bahan.";
    if (textToList(form.steps).length === 0) newErrors.steps = "Tulis minimal satu langkah.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      time: Number(form.time),
      servings: Number(form.servings),
      ingredients: textToList(form.ingredients),
      steps: textToList(form.steps),
    });
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Nama masakan</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Contoh: Nasi Goreng" />
        {errors.name && <small className="error">{errors.name}</small>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Kategori</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Tingkat kesulitan</label>
          <select id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange}>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image">Foto masakan</label>
        <input id="image" type="file" accept="image/*" onChange={handleImage} />
        {form.image && <img src={form.image} alt="Pratinjau" className="image-preview" />}
        {errors.image && <small className="error">{errors.image}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Deskripsi</label>
        <textarea id="description" name="description" rows="3" value={form.description} onChange={handleChange} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="time">Waktu memasak (menit)</label>
          <input id="time" name="time" type="number" min="1" value={form.time} onChange={handleChange} />
          {errors.time && <small className="error">{errors.time}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="servings">Jumlah porsi</label>
          <input id="servings" name="servings" type="number" min="1" value={form.servings} onChange={handleChange} />
          {errors.servings && <small className="error">{errors.servings}</small>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ingredients">Daftar bahan (satu bahan per baris)</label>
        <textarea
          id="ingredients"
          name="ingredients"
          rows="6"
          value={form.ingredients}
          onChange={handleChange}
          placeholder={"2 piring nasi putih\n2 butir telur"}
        />
        {errors.ingredients && <small className="error">{errors.ingredients}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="steps">Cara membuat (satu langkah per baris)</label>
        <textarea
          id="steps"
          name="steps"
          rows="6"
          value={form.steps}
          onChange={handleChange}
          placeholder={"Panaskan minyak.\nTumis bawang putih."}
        />
        {errors.steps && <small className="error">{errors.steps}</small>}
      </div>

      <button type="submit" className="btn btn-primary">{submitLabel}</button>
    </form>
  );
}

export default RecipeForm;
