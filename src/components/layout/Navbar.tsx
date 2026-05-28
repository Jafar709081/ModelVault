import { useState, useRef, useEffect } from "react";
import { Search, Sun, Moon, Plus, X, Menu } from "lucide-react";
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
  const navRef = useRef<HTMLElement>(null);

  const isHome = location.pathname === "/";

  // Parallax float on mouse move
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const dx = (e.clientX - cx) / cx;
      nav.style.setProperty("--nav-tilt", `${dx * 1.5}deg`);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (hash && isHome) {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      setDrawerOpen(false);
    } else {
      setDrawerOpen(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
    if (drawerOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [drawerOpen]);

  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  return (
    <>
      <nav ref={navRef} className="navbar navbar-3d">
        {/* Scanline overlay (dark mode only) */}
        <div className="navbar-scanline" aria-hidden="true" />

        {/* 3D Logo */}
        <a
          href="/"
          className="navbar-logo navbar-logo-3d"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
        >
          <div className="logo-icon logo-3d">
            {/* Animated vault icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="white" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="1.5" fill="white"/>
              <line x1="12" y1="8" x2="12" y2="3" stroke="white" strokeWidth="1.2"/>
              <line x1="16.5" y1="9.5" x2="20" y2="6" stroke="white" strokeWidth="1.2"/>
            </svg>
          </div>
          <span className="navbar-logo-text logo-text-3d">ModelVault</span>
        </a>

        {/* Nav Links — desktop */}
        <ul className="nav-links nav-links-desktop">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" && location.pathname === "/";
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`nav-link nav-link-3d${isActive ? " active" : ""}`}
                  onClick={(e) => handleNavClick(e, link.hash)}
                >
                  <span className="nav-link-text">{link.label}</span>
                  <span className="nav-link-glow" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Theme toggle */}
          <button
            className="btn-theme-toggle btn-3d-icon"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="btn-icon btn-3d-icon btn-search-icon" aria-label="Search">
            <Search size={17} />
          </button>

          <button className="btn-login btn-login-3d" onClick={() => navigate("/login")}>
            <span>Login</span>
          </button>

          <button
            className="btn-add btn-add-3d animate-glow"
            onClick={() => navigate("/login")}
          >
            <Plus size={15} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            Add Project
          </button>

          {/* Hamburger */}
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
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="white" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="1.5" fill="white"/>
              </svg>
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
