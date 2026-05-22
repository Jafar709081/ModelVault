import { useState, useRef, useEffect } from "react";
import { Search, Sun, Moon, Plus, Cpu, X, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useThemeContext } from "@/contexts/ThemeContext";

const NAV_LINKS = [
  { label: "Home", href: "/", hash: "" },
  { label: "Explore", href: "/#featured", hash: "featured" },
  { label: "Categories", href: "/#categories", hash: "categories" },
  { label: "About", href: "/#about", hash: "about" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggle } = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === "/";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    if (hash && isHome) {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      setDrawerOpen(false);
    } else {
      setDrawerOpen(false);
    }
  };

  // Close drawer on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
    if (drawerOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [drawerOpen]);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <a
          href="/"
          className="navbar-logo"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
        >
          <div className="logo-icon">
            <Cpu size={16} color="white" />
          </div>
          <span className="navbar-logo-text">ModelVault</span>
        </a>

        {/* Nav Links — desktop */}
        <ul className="nav-links nav-links-desktop">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" && location.pathname === "/";
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`nav-link${isActive ? " active" : ""}`}
                  onClick={(e) => handleNavClick(e, link.hash)}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Theme toggle */}
          <button
            className="btn-theme-toggle"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="btn-icon btn-search-icon" aria-label="Search">
            <Search size={17} />
          </button>

          <button className="btn-login" onClick={() => navigate("/login")}>
            Login
          </button>

          <button
            className="btn-add animate-glow"
            onClick={() => navigate("/login")}
          >
            <Plus size={15} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            Add Project
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="btn-hamburger"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />
      )}
      <div
        ref={drawerRef}
        className={`mobile-drawer${drawerOpen ? " drawer-open" : ""}`}
      >
        <div className="drawer-header">
          <div className="navbar-logo" style={{ cursor: "default" }}>
            <div className="logo-icon" style={{ width: 28, height: 28 }}>
              <Cpu size={13} color="white" />
            </div>
            <span className="navbar-logo-text" style={{ fontSize: "1.1rem" }}>ModelVault</span>
          </div>
          <button className="btn-icon" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <ul className="drawer-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="drawer-link"
                onClick={(e) => handleNavClick(e, link.hash)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="drawer-footer">
          <button
            className="btn-theme-toggle drawer-theme-btn"
            onClick={() => { toggle(); }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <button className="btn-login" style={{ width: "100%" }} onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn-add" style={{ width: "100%" }} onClick={() => navigate("/login")}>
            <Plus size={15} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            Add Project
          </button>
        </div>
      </div>
    </>
  );
}
