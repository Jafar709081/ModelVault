import { Search, Plus, Cpu } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Explore", href: "#featured" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/" className="navbar-logo">
        <div className="logo-icon">
          <Cpu size={16} color="white" />
        </div>
        <span className="navbar-logo-text">ModelVault</span>
      </a>

      {/* Nav Links */}
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={`nav-link${link.label === "Home" ? " active" : ""}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="navbar-actions">
        <button className="btn-icon" aria-label="Search">
          <Search size={17} />
        </button>
        <button className="btn-login">Login</button>
        <button className="btn-add animate-glow">
          <Plus size={15} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
          Add Project
        </button>
      </div>
    </nav>
  );
}
