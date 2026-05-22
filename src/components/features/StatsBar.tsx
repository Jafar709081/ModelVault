const STATS = [
  {
    icon: "🔧",
    number: "240+",
    label: "Projects Uploaded",
    glow: "purple-glow",
  },
  {
    icon: "👥",
    number: "1,200+",
    label: "Students Helped",
    glow: "orange-glow",
  },
  {
    icon: "💡",
    number: "50+",
    label: "Categories",
    glow: "blue-glow",
  },
];

export default function StatsBar() {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`stat-card ${stat.glow} fade-in-up`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
