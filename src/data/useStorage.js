import { useState, useEffect } from "react";

function usePenyimpanan(nama, dataAwal) {
  const [data, setData] = useState(() => {
    const simpan = localStorage.getItem(nama);
    return simpan ? JSON.parse(simpan) : dataAwal;
  });

  useEffect(() => {
    try {
      localStorage.setItem(nama, JSON.stringify(data));
    } catch {
      alert("Penyimpanan browser penuh. Hapus beberapa resep atau gunakan foto yang lebih kecil.");
    }
  }, [nama, data]);

  return [data, setData];
}

export default usePenyimpanan;
