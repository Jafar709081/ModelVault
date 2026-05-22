const HOW_CARDS = [
  {
    icon: "📤",
    iconClass: "icon-purple",
    number: "01",
    title: "Upload Your Model",
    description:
      "Share project photos, circuit diagrams, component lists, and a video demo. Help your juniors start ahead.",
  },
  {
    icon: "🔍",
    iconClass: "icon-blue",
    number: "02",
    title: "Browse Projects",
    description:
      "Search and filter hundreds of senior projects by category, semester, cost range, or specific components.",
  },
  {
    icon: "💰",
    iconClass: "icon-green",
    number: "03",
    title: "Get Cost Info",
    description:
      "See exact component prices, where to buy locally or online, and the total budget breakdown for any project.",
  },
  {
    icon: "🚀",
    iconClass: "icon-orange",
    number: "04",
    title: "Improve & Build",
    description:
      "Take an existing project and build something better. Track your improvements and publish your upgraded version.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section" id="about">
      <h2 className="section-title-centered">How It Works</h2>
      <p className="section-sub-centered">
        From inspiration to implementation — ModelVault guides every step.
      </p>
      <div className="how-grid">
        {HOW_CARDS.map((card, i) => (
          <div
            key={card.title}
            className={`how-card fade-in-up`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="how-card-num">{card.number}</span>
            <div className={`how-card-icon ${card.iconClass}`}>
              <span>{card.icon}</span>
            </div>
            <h3 className="how-card-title">{card.title}</h3>
            <p className="how-card-desc">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
