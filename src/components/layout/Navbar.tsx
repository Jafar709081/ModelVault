import { Search, Plus, Cpu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", href: "/", hash: "" },
  { label: "Explore", href: "/#featured", hash: "featured" },
  { label: "Categories", href: "/#categories", hash: "categories" },
  { label: "About", href: "/#about", hash: "about" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    hash: string
  ) => {
    if (hash && isHome) {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/" className="navbar-logo" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
        <div className="logo-icon">
          <Cpu size={16} color="white" />
        </div>
        <span className="navbar-logo-text">ModelVault</span>
      </a>

      {/* Nav Links */}
      <ul className="nav-links">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.href === "/" ? location.pathname === "/" : false;
          return (
            <li key={link.label}>
              <a
                href={link.href}
                className={`nav-link${isActive ? " active" : ""}`}
                onClick={(e) => handleNavClick(e, link.href, link.hash)}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Actions */}
      <div className="navbar-actions">
        <button className="btn-icon" aria-label="Search">
          <Search size={17} />
        </button>
        <button className="btn-login" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="btn-add animate-glow"
          onClick={() => navigate("/login")}
        >
          <Plus
            size={15}
            style={{
              display: "inline",
              verticalAlign: "middle",
              marginRight: "4px",
            }}
          />
          Add Project
        </button>
      </div>
    </nav>
  );
}
