import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMouseTilt } from "@/hooks/useMouseTilt";

const POPULAR_TAGS = [
  "#GasLeakDetector",
  "#SmartIrrigation",
  "#HomeAutomation",
  "#RFIDAttendance",
  "#LineFollower",
  "#SolarMonitor",
];

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function HeroSection({ searchQuery, onSearchChange }: Props) {
  const navigate = useNavigate();
  const searchTiltRef = useMouseTilt<HTMLDivElement>({ maxTilt: 5, scale: 1.01, glare: false });

  const handleTagClick = (tag: string) => {
    onSearchChange(tag.replace("#", ""));
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero hero-3d">
      {/* Decorative 3D depth rings */}
      <div className="hero-depth-ring hero-depth-ring-1" aria-hidden="true" />
      <div className="hero-depth-ring hero-depth-ring-2" aria-hidden="true" />
      <div className="hero-depth-ring hero-depth-ring-3" aria-hidden="true" />

      {/* Floating geometric accents */}
      <div className="hero-geo hero-geo-1" aria-hidden="true" />
      <div className="hero-geo hero-geo-2" aria-hidden="true" />
      <div className="hero-geo hero-geo-3" aria-hidden="true" />

      {/* Eyebrow */}
      <div className="fade-in-up" style={{ animationDelay: "0s", position: "relative", zIndex: 2 }}>
        <span className="hero-eyebrow hero-eyebrow-3d">
          <span className="hero-eyebrow-dot" />
          Open to all engineering students · 100% free
        </span>
      </div>

      {/* Heading */}
      <h1 className="hero-heading hero-heading-3d fade-in-up delay-1">
        <span className="gradient-text hero-text-depth">Discover Student Projects.</span>
        <br />
        <span className="hero-heading-line2">Build Better Ones.</span>
      </h1>

      {/* Subtext */}
      <p className="hero-sub fade-in-up delay-2" style={{ position: "relative", zIndex: 2 }}>
        Browse 100s of real models built by your seniors — components, cost,
        and everything in between.
      </p>

      {/* Search Bar — 3D floating panel */}
      <div className="search-container fade-in-up delay-3" ref={searchTiltRef} style={{ position: "relative", zIndex: 2 }}>
        <div className="search-bar search-bar-3d">
          {/* Scanline on search bar (dark) */}
          <div className="search-bar-scanline" aria-hidden="true" />
          <Search size={20} className="search-icon-inner" />
          <input
            type="text"
            className="search-input"
            placeholder="Search projects, components, categories..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button
            className="search-btn"
            onClick={() =>
              document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Search size={16} />
            Search
          </button>
        </div>
        {/* Floating depth shadow */}
        <div className="search-depth-shadow" aria-hidden="true" />
      </div>

      {/* Popular Tags */}
      <div className="tags-row fade-in-up delay-4" style={{ position: "relative", zIndex: 2 }}>
        <span className="tags-label">Popular:</span>
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            className={`tag-chip tag-chip-3d${searchQuery === tag.replace("#", "") ? " tag-chip-active" : ""}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* CTAs */}
      <div className="cta-group fade-in-up delay-5" style={{ position: "relative", zIndex: 2 }}>
        <a
          href="#featured"
          className="btn-primary btn-primary-3d"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="btn-3d-text">Explore Projects</span>
          <span className="btn-3d-arrow">→</span>
        </a>
        <button className="btn-outline btn-outline-3d" onClick={() => navigate("/login")}>
          Upload Your Model +
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator fade-in-up" style={{ animationDelay: "0.8s", position: "relative", zIndex: 2 }}>
        <div className="scroll-indicator-track">
          <div className="scroll-indicator-dot" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
