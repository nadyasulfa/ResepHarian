import { ChefHat } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="logo">
          <ChefHat size={22} />
          <span>ResepHarian</span>
        </div>
        <p>&copy; 2026 Nadya ResepHarian. Temukan resep favoritmu.</p>
      </div>
    </footer>
  );
}

export default Footer;
