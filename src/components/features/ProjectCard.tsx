import type { Project } from "@/types/project";

interface Props {
  project: Project;
}

function getChipClass(style: string) {
  switch (style) {
    case "purple": return "chip chip-purple";
    case "green":  return "chip chip-green";
    case "blue":   return "chip chip-blue";
    case "orange": return "chip chip-orange";
    default:       return "chip chip-gray";
  }
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="bento-card">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="bento-card-img"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop";
        }}
      />
      <div className="bento-card-body">
        <div className="bento-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className={getChipClass(project.tagStyle)}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className="bento-card-title">{project.title}</h3>
        <p className="bento-card-desc">{project.description}</p>
        <div className="bento-card-footer">
          <div className="bento-card-badges">
            <span className="badge-cost">{project.cost}</span>
            <span className="badge-sem">{project.semester}</span>
          </div>
          <div className="student-info">
            <img
              src={project.avatarUrl}
              alt={project.student}
              className="student-avatar"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(project.student)}&background=8b5cf6&color=fff&size=28`;
              }}
            />
            <span className="student-name">{project.student}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
