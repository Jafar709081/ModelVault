import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  const handleTagClick = (tag: string) => {
    // strip # and use as search term
    onSearchChange(tag.replace("#", ""));
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      {/* Eyebrow */}
      <div className="fade-in-up" style={{ animationDelay: "0s" }}>
        <span className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Open to all engineering students · 100% free
        </span>
      </div>

      {/* Heading */}
      <h1 className="hero-heading fade-in-up delay-1">
        <span className="gradient-text">Discover Student Projects.</span>
        <br />
        Build Better Ones.
      </h1>

      {/* Subtext */}
      <p className="hero-sub fade-in-up delay-2">
        Browse 100s of real models built by your seniors — components, cost,
        and everything in between.
      </p>

      {/* Search Bar */}
      <div className="search-container fade-in-up delay-3">
        <div className="search-bar">
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
      </div>

      {/* Popular Tags */}
      <div className="tags-row fade-in-up delay-4">
        <span className="tags-label">Popular:</span>
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            className={`tag-chip${searchQuery === tag.replace("#", "") ? " tag-chip-active" : ""}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* CTAs */}
      <div className="cta-group fade-in-up delay-5">
        <a
          href="#featured"
          className="btn-primary"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explore Projects
        </a>
        <button className="btn-outline" onClick={() => navigate("/login")}>
          Upload Your Model +
        </button>
      </div>
    </section>
  );
}
