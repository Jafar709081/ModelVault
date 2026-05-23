import { useScrollReveal } from "@/hooks/useScrollReveal";

const CATEGORIES = [
  { icon: "📡", name: "IoT", count: "42 projects" },
  { icon: "🤖", name: "Robotics", count: "31 projects" },
  { icon: "🏠", name: "Home Automation", count: "28 projects" },
  { icon: "🌾", name: "Agriculture Tech", count: "19 projects" },
  { icon: "📊", name: "Smart Sensors", count: "35 projects" },
  { icon: "☀️", name: "Renewable Energy", count: "16 projects" },
  { icon: "🏥", name: "Medical Devices", count: "12 projects" },
  { icon: "🔐", name: "Security Systems", count: "24 projects" },
];

export default function Categories() {
  const containerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="categories-section" id="categories">
      <div className="container">
        <h2 className="section-title-centered reveal-heading">Browse by Category</h2>
        <p className="section-sub-centered reveal-heading" style={{ animationDelay: "0.08s" }}>
          Explore projects organized by domain — find exactly what inspires you.
        </p>
        <div className="categories-grid" ref={containerRef}>
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              className="category-card reveal"
              style={{ "--stagger": i } as React.CSSProperties}
            >
              <div className="category-icon-wrap">
                <span className="category-icon">{cat.icon}</span>
              </div>
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
