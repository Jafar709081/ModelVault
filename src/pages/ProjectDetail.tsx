import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Share2, Bookmark, Upload, ExternalLink,
  X, ChevronLeft, ChevronRight, ImageOff, CheckCircle, Copy,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/features/ProjectCard";
import { SAMPLE_PROJECTS } from "@/constants/projects";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = SAMPLE_PROJECTS.find((p) => p.id === id);

  const [featuredImg, setFeaturedImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const [saved, setSaved] = useState(false);

  if (!project) {
    return (
      <div className="page-root min-h-screen" style={{ display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "4rem 1rem" }}>
          <p style={{ fontSize: "3rem" }}>🔍</p>
          <h2 style={{ color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem" }}>Project not found</h2>
          <button className="btn-primary" onClick={() => navigate("/")}>← Back to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  // Build image list from the single imageUrl (in a real app there'd be multiple)
  const images = [project.imageUrl];

  const related = SAMPLE_PROJECTS.filter(
    (p) => p.id !== project.id && (p.category === project.category || p.tagStyle === project.tagStyle)
  ).slice(0, 3);

  const componentTotal = project.components
    ? project.components.reduce((s, c) => s + c.price, 0)
    : 0;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast("Link copied to clipboard!");
    });
  };

  const handleSave = () => {
    setSaved((v) => !v);
    showToast(saved ? "Removed from saved" : "Project saved!");
  };

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevLightbox = () => setLightboxIdx((i) => (i - 1 + images.length) % images.length);
  const nextLightbox = () => setLightboxIdx((i) => (i + 1) % images.length);

  const daysAgo = project.uploadedDaysAgo ?? 0;
  const uploadLabel = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo} days ago`;

  return (
    <div className="page-root min-h-screen">
      <Navbar />

      {/* Toast */}
      {toastMsg && (
        <div className="detail-toast fade-in-up">
          <CheckCircle size={16} color="#4ade80" />
          {toastMsg}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
              <X size={20} />
            </button>
            {images.length > 1 && (
              <>
                <button className="lightbox-nav lightbox-nav-prev" onClick={prevLightbox} aria-label="Previous image">
                  <ChevronLeft size={24} />
                </button>
                <button className="lightbox-nav lightbox-nav-next" onClick={nextLightbox} aria-label="Next image">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            <img src={images[lightboxIdx]} alt="Project" className="lightbox-img" />
          </div>
        </div>
      )}

      <div className="detail-page">
        {/* Back button */}
        <button className="detail-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        <div className="detail-layout">
          {/* ── LEFT COLUMN ── */}
          <div className="detail-main">

            {/* Header */}
            <div className="detail-header">
              <div className="detail-badges-row">
                <span className="detail-type-badge">
                  {project.type === "software" ? "💻 Software / App" : "🔧 Physical Model"}
                </span>
                {project.category && (
                  <span className="chip chip-purple">{project.category}</span>
                )}
                {project.tags.map((t) => (
                  <span key={t} className="chip chip-gray">{t}</span>
                ))}
              </div>

              <h1 className="detail-title">{project.title}</h1>
              <p className="detail-description">{project.description}</p>

              {/* Uploader row */}
              <div className="detail-uploader-row">
                <img
                  src={project.avatarUrl}
                  alt={project.student}
                  className="detail-avatar"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(project.student)}&background=8b5cf6&color=fff&size=40`;
                  }}
                />
                <div>
                  <span className="detail-student-name">{project.student}</span>
                  <div className="detail-meta-row">
                    <span className="detail-meta-item">{project.semester}</span>
                    <span className="detail-meta-dot">·</span>
                    <span className="detail-meta-item">Uploaded {uploadLabel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="detail-gallery">
              {images.length > 0 ? (
                <>
                  <div className="detail-featured-img-wrap" onClick={() => openLightbox(featuredImg)}>
                    <img
                      src={images[featuredImg]}
                      alt={project.title}
                      className="detail-featured-img"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop";
                      }}
                    />
                    <div className="detail-featured-overlay">
                      <span className="detail-zoom-hint">🔍 Click to zoom</span>
                    </div>
                  </div>
                  {images.length > 1 && (
                    <div className="detail-thumbnails">
                      {images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Thumbnail ${i + 1}`}
                          className={`detail-thumb${featuredImg === i ? " detail-thumb-active" : ""}`}
                          onClick={() => setFeaturedImg(i)}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="detail-no-image">
                  <ImageOff size={36} />
                  <span>No images uploaded for this project</span>
                </div>
              )}
            </div>

            {/* ── Components (physical) ── */}
            {project.type === "physical" && project.components && (
              <div className="detail-section">
                <h2 className="detail-section-heading">🔩 Components List</h2>
                <div className="detail-table-wrap">
                  <table className="detail-table">
                    <thead>
                      <tr>
                        <th>Component Name</th>
                        <th className="text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.components.map((c, i) => (
                        <tr key={i}>
                          <td>{c.name}</td>
                          <td className="text-right">₹ {c.price.toLocaleString("en-IN")}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="total-label">TOTAL</td>
                        <td className="total-price text-right">
                          ₹ {componentTotal.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {project.storeName && (
                  <div className="detail-buy-section">
                    <p className="detail-buy-label">🏪 Where to Buy</p>
                    <div className="detail-buy-links">
                      {project.storeName.split("/").map((store, i) => {
                        const s = store.trim();
                        const isUrl = s.startsWith("http");
                        return isUrl ? (
                          <a
                            key={i}
                            href={s}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-buy-link"
                          >
                            <ExternalLink size={14} /> {s}
                          </a>
                        ) : (
                          <span key={i} className="btn-buy-link btn-buy-text">
                            📍 {s}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Tools (software) ── */}
            {project.type === "software" && project.tools && (
              <div className="detail-section">
                <h2 className="detail-section-heading">🛠️ Tools &amp; Technologies Used</h2>
                <div className="detail-tools-chips">
                  {project.tools.map((t) => (
                    <span key={t} className="chip chip-purple" style={{ fontSize: "0.85rem", padding: "0.35rem 0.9rem" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.type === "software" && project.projectLink && (
              <div className="detail-section">
                <h2 className="detail-section-heading">🔗 Project / Demo Link</h2>
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: "inline-flex", marginTop: "0.5rem" }}
                >
                  🚀 View Live Project
                </a>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="detail-bottom-cta">
              <p className="detail-cta-heading">💬 Have questions about this project?</p>
              <p className="detail-cta-sub">
                Reach out to the contributor or upload your own improved version.
              </p>
              <button
                className="btn-primary"
                onClick={() => navigate("/login")}
                style={{ marginTop: "1rem" }}
              >
                🚀 Upload Improved Version
              </button>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="detail-sidebar">
            <div className="detail-sidebar-inner">
              {/* Cost card */}
              <div className="detail-cost-card">
                <div className="detail-cost-label">💰 Total Project Cost</div>
                <div className="detail-cost-amount">{project.cost}</div>
                <div className="detail-cost-meta">({project.semester} project)</div>
              </div>

              {/* Action buttons */}
              <div className="detail-actions">
                <button className="btn-primary detail-action-btn" onClick={() => navigate("/login")}>
                  <Upload size={16} />
                  Upload Your Improved Version
                </button>
                <button
                  className={`btn-outline detail-action-btn${saved ? " saved-active" : ""}`}
                  onClick={handleSave}
                >
                  <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
                  {saved ? "Saved" : "Save Project"}
                </button>
                <button className="btn-outline detail-action-btn" onClick={handleShare}>
                  <Share2 size={16} />
                  Share Project
                </button>
              </div>

              {/* Uploader card */}
              <div className="detail-uploader-card">
                <img
                  src={project.avatarUrl}
                  alt={project.student}
                  className="detail-uploader-avatar"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(project.student)}&background=8b5cf6&color=fff&size=48`;
                  }}
                />
                <div>
                  <p className="detail-uploader-name">{project.student}</p>
                  <p className="detail-uploader-role">{project.semester} · Project Contributor</p>
                </div>
              </div>

              {/* Related projects */}
              {related.length > 0 && (
                <div className="detail-related">
                  <h3 className="detail-related-heading">Similar Projects</h3>
                  <div className="detail-related-cards">
                    {related.map((p) => (
                      <div
                        key={p.id}
                        className="detail-related-card"
                        onClick={() => navigate(`/project/${p.id}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && navigate(`/project/${p.id}`)}
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="detail-related-img"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=120&fit=crop";
                          }}
                        />
                        <div className="detail-related-body">
                          <p className="detail-related-title">{p.title}</p>
                          <p className="detail-related-meta">{p.cost} · {p.semester}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
