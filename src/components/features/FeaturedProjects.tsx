import { Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ProjectCard from "@/components/features/ProjectCard";
import { SAMPLE_PROJECTS } from "@/constants/projects";

interface Props {
  searchQuery?: string;
}

export default function FeaturedProjects({ searchQuery = "" }: Props) {
  const q = searchQuery.trim().toLowerCase();
  const gridRef = useScrollReveal<HTMLDivElement>({ rootMargin: "-40px" });

  const filtered = q
    ? SAMPLE_PROJECTS.filter((p) => {
        const haystack = [
          p.title,
          p.description,
          p.student,
          p.semester,
          p.cost,
          ...p.tags,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
    : SAMPLE_PROJECTS;

  return (
    <section className="section" id="featured">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title reveal-heading">
            {q ? `Search results for "${searchQuery}"` : "Featured Projects"}
          </h2>
          {!q && (
            <a href="#" className="view-all-link reveal-heading" style={{ animationDelay: "0.1s" }}>
              View All →
            </a>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="search-empty">
            <Search size={40} className="search-empty-icon" />
            <p className="search-empty-title">
              No projects found for &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="search-empty-sub">
              Try a different keyword or browse by category
            </p>
          </div>
        ) : (
          <div className="bento-grid" ref={gridRef}>
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className="reveal"
                style={{ "--stagger": i } as React.CSSProperties}
              >
                <ProjectCard project={project} searchQuery={searchQuery} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
