import { useNavigate } from "react-router-dom";
import type { Project } from "@/types/project";
import { useMouseTilt } from "@/hooks/useMouseTilt";

interface Props {
  project: Project;
  searchQuery?: string;
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

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="search-highlight">{part}</mark>
    ) : part
  );
}

export default function ProjectCard({ project, searchQuery = "" }: Props) {
  const navigate = useNavigate();
  const tiltRef = useMouseTilt<HTMLDivElement>({ maxTilt: 14, scale: 1.03, glare: true });

  return (
    <div
      ref={tiltRef}
      className="card-3d-scene"
      onClick={() => navigate(`/project/${project.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/project/${project.id}`)}
      aria-label={`View ${project.title}`}
    >
      <article className="bento-card card-3d-inner">
        {/* Holographic glare overlay */}
        <div className="card-glare" aria-hidden="true" />

        {/* Corner glow accent */}
        <div className="card-corner-glow" aria-hidden="true" />

        {/* Depth edge lines */}
        <div className="card-depth-edge card-depth-top" aria-hidden="true" />
        <div className="card-depth-edge card-depth-left" aria-hidden="true" />

        {/* Project type indicator dot */}
        <div className="card-type-dot" aria-hidden="true">
          <span className="card-type-dot-inner" />
        </div>

        <img
          src={project.imageUrl}
          alt={project.title}
          className="bento-card-img"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop";
          }}
        />

        {/* Image depth overlay */}
        <div className="card-img-depth" aria-hidden="true" />

        <div className="bento-card-body">
          <div className="bento-card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className={getChipClass(project.tagStyle)}>
                {highlight(tag, searchQuery)}
              </span>
            ))}
          </div>
          <h3 className="bento-card-title">{highlight(project.title, searchQuery)}</h3>
          <p className="bento-card-desc">{highlight(project.description, searchQuery)}</p>
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
              <span className="student-name">{highlight(project.student, searchQuery)}</span>
            </div>
          </div>
        </div>

        {/* Holographic "explore" tag that appears on hover */}
        <div className="card-holo-tag" aria-hidden="true">
          <span>View Project →</span>
        </div>
      </article>
    </div>
  );
}
