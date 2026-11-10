export const CATEGORIES = ["Makanan Utama", "Dessert", "Minuman", "Camilan"];
export const DIFFICULTIES = ["Mudah", "Sedang", "Sulit"];

export function filterRecipes(recipes, search, category) {
  return recipes.filter((resep) => {
    const namaCocok = resep.name.toLowerCase().includes(search.toLowerCase());
    const kategoriCocok = category === "Semua" || resep.category === category;
    return namaCocok && kategoriCocok;
  });
}

export function generateId() {
  return Date.now().toString();
}

export function textToList(teks) {
  return teks
    .split("\n")
    .map((baris) => baris.trim())
    .filter((baris) => baris !== "");
}

export function listToText(daftar) {
  return daftar.join("\n");
}

export function resizeImage(file, maxSize = 800) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
