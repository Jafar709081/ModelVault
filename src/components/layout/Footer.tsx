import { Cpu } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Home", href: "#" },
  { label: "Explore", href: "#featured" },
  { label: "Categories", href: "#categories" },
  { label: "Upload", href: "#upload" },
  { label: "About", href: "#about" },
  { label: "Privacy", href: "#" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Logo */}
        <a href="/" className="footer-logo">
          <div className="logo-icon" style={{ width: 28, height: 28, borderRadius: 7 }}>
            <Cpu size={13} color="white" />
          </div>
          <span className="footer-logo-text">ModelVault</span>
        </a>

        {/* Links */}
        <ul className="footer-links">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="footer-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Credit */}
        <p className="footer-credit">
          Made with ♥ by{" "}
          <span>VCET Engineering Students</span>
        </p>
      </div>

      <hr className="footer-divider" />
      <p className="footer-bottom">
        © {new Date().getFullYear()} ModelVault. Open for all engineering
        students.
      </p>
    </footer>
  );
}
