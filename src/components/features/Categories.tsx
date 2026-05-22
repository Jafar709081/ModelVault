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
  return (
    <section className="categories-section" id="categories">
      <div className="container">
        <h2 className="section-title-centered">Browse by Category</h2>
        <p className="section-sub-centered">
          Explore projects organized by domain — find exactly what inspires you.
        </p>
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <button key={cat.name} className="category-card">
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
