import ProjectCard from "@/components/features/ProjectCard";
import { SAMPLE_PROJECTS } from "@/constants/projects";

export default function FeaturedProjects() {
  return (
    <section className="section" id="featured">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <a href="#" className="view-all-link">
            View All →
          </a>
        </div>
        <div className="bento-grid">
          {SAMPLE_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
