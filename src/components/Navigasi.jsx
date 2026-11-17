import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  ChefHat,
  Menu,
  X,
  PlusCircle,
  Sun,
  Moon,
  Heart,
  Check,
} from "lucide-react";

import { useTheme, COLOR_THEMES } from "../pages/Tema";
import { useFavorites } from "../pages/Favorit";

function Navbar({ onToggleFavFilter, showOnlyFav }) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const { darkMode, setDarkMode, accentColor, setAccentColor } = useTheme();
  const { favorites } = useFavorites();

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
          <NavLink to="/" end onClick={closeMenu}>
            Beranda
          </NavLink>

          <NavLink to="/recipes" end onClick={closeMenu}>
            Resep
          </NavLink>

          <NavLink
            to="/recipes/add"
            className="nav-cta"
            onClick={closeMenu}
          >
            <PlusCircle size={16} />
            Tambah Resep
          </NavLink>
        </nav>

        <div className="nav-controls">

          <div className="theme-colors" title="Pilih Warna Tema">
            {Object.entries(COLOR_THEMES).map(([key, val]) => (
              <button
                key={key}
                type="button"
                onClick={() => setAccentColor(key)}
                className={`color-dot ${
                  accentColor === key ? "active" : ""
                }`}
                style={{ backgroundColor: val.primary }}
                title={val.name}
                aria-label={`Tema ${val.name}`}
              >
                {accentColor === key && (
                  <Check size={13} color="#ffffff" />
                )}
              </button>
            ))}
          </div>

          <button
            className={`icon-btn ${showOnlyFav ? "selected" : ""}`}
            onClick={() => {
              onToggleFavFilter(!showOnlyFav);
            }}
            title="Tampilkan resep favorit"
          >
            <Heart
              size={18}
              fill={showOnlyFav ? "currentColor" : "none"}
            />
            <span>Favorit ({favorites.length})</span>
          </button>

          <button
            className="icon-btn mode-btn"
            onClick={() => setDarkMode(!darkMode)}
            title={
              darkMode
                ? "Beralih ke Mode Terang"
                : "Beralih ke Mode Gelap"
            }
            aria-label="Ganti mode tampilan"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
