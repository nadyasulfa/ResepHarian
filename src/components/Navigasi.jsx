import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChefHat, Menu, X, PlusCircle } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <ChefHat size={26} />
          <span>ResepHarian</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>Beranda</NavLink>
          <NavLink to="/recipes" end onClick={closeMenu}>Resep</NavLink>
          <NavLink to="/recipes/add" className="nav-cta" onClick={closeMenu}>
            <PlusCircle size={16} /> Tambah Resep
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
