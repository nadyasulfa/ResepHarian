import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="container section empty-state">
      <h1>404</h1>
      <h3>Halaman tidak ditemukan</h3>
      <p>Alamat yang kamu buka tidak tersedia.</p>
      <Link to="/" className="btn btn-primary">Kembali ke beranda</Link>
    </section>
  );
}

export default NotFound;
