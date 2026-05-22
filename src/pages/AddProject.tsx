import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  X,
  Plus,
  Link as LinkIcon,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const CATEGORIES = [
  "IoT",
  "Robotics",
  "Home Automation",
  "Agriculture Tech",
  "Smart Sensors",
  "Renewable Energy",
  "Medical Devices",
  "Security Systems",
];

const SEMESTERS = [
  "Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8",
];

type ProjectType = "physical" | "software" | null;
type BuyLocation = "online" | "local" | "both";

interface Component {
  id: number;
  name: string;
  price: string;
}

interface PreviewFile {
  id: number;
  url: string;
  name: string;
}

export default function AddProject() {
  const navigate = useNavigate();

  // Type & Category
  const [projectType, setProjectType] = useState<ProjectType>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Basic Info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Physical: components
  const [components, setComponents] = useState<Component[]>([
    { id: 1, name: "", price: "" },
  ]);
  const nextCompId = useRef(2);

  // Software: tools
  const [toolInput, setToolInput] = useState("");
  const [tools, setTools] = useState<string[]>([]);

  // Physical: buy location
  const [buyLocation, setBuyLocation] = useState<BuyLocation>("online");
  const [storeName, setStoreName] = useState("");

  // Software: project link
  const [projectLink, setProjectLink] = useState("");

  // Cost
  const [totalCost, setTotalCost] = useState("");

  // Images
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nextImgId = useRef(1);

  // Student info
  const [semester, setSemester] = useState("");
  const [studentName, setStudentName] = useState("");

  // Success state
  const [submitted, setSubmitted] = useState(false);

  // --- Handlers ---

  const addComponent = () => {
    setComponents((prev) => [
      ...prev,
      { id: nextCompId.current++, name: "", price: "" },
    ]);
  };

  const removeComponent = (id: number) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  const updateComponent = (id: number, field: "name" | "price", value: string) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const componentTotal = components.reduce((sum, c) => {
    const price = parseFloat(c.price) || 0;
    return sum + price;
  }, 0);

  const addTool = () => {
    const trimmed = toolInput.trim();
    if (trimmed && !tools.includes(trimmed)) {
      setTools((prev) => [...prev, trimmed]);
    }
    setToolInput("");
  };

  const handleToolKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTool();
    }
  };

  const removeTool = (tool: string) => {
    setTools((prev) => prev.filter((t) => t !== tool));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 4 - previews.length;
    const toAdd = files.slice(0, remaining);
    toAdd.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => [
        ...prev,
        { id: nextImgId.current++, url, name: file.name },
      ]);
    });
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePreview = (id: number) => {
    setPreviews((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    const remaining = 4 - previews.length;
    const toAdd = files.slice(0, remaining);
    toAdd.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => [
        ...prev,
        { id: nextImgId.current++, url, name: file.name },
      ]);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting project:", {
      projectType,
      selectedCategory,
      title,
      description,
      components,
      tools,
      buyLocation,
      storeName,
      projectLink,
      totalCost,
      semester,
      studentName,
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 2200);
  };

  return (
    <div className="page-dark">
      <Navbar />

      {/* Success Toast */}
      {submitted && (
        <div className="success-toast fade-in-up">
          <CheckCircle size={20} color="#4ade80" />
          <span>
            Project submitted successfully! It will appear on ModelVault shortly.
          </span>
        </div>
      )}

      <div className="add-project-page">
        <div className="add-project-glow" aria-hidden="true" />

        {/* Page Header */}
        <div className="add-project-header fade-in-up">
          <h1 className="add-project-title gradient-text">
            Upload Your Model
          </h1>
          <p className="add-project-sub">
            Share your project with 1,200+ engineering students
          </p>
        </div>

        <form onSubmit={handleSubmit} className="add-project-form" noValidate>

          {/* ── SECTION 1: Project Type ── */}
          <div className="form-section fade-in-up">
            <p className="form-section-label">
              What type of project is this?
            </p>
            <div className="type-cards">
              <button
                type="button"
                className={`type-card ${projectType === "physical" ? "type-card-active" : ""}`}
                onClick={() => setProjectType("physical")}
              >
                <span className="type-card-icon">🔧</span>
                <span className="type-card-title">Physical Model</span>
                <span className="type-card-sub">
                  Hardware, IoT, robotics, circuits
                </span>
              </button>
              <button
                type="button"
                className={`type-card ${projectType === "software" ? "type-card-active" : ""}`}
                onClick={() => setProjectType("software")}
              >
                <span className="type-card-icon">💻</span>
                <span className="type-card-title">Software / App</span>
                <span className="type-card-sub">
                  Web app, mobile app, AI tool
                </span>
              </button>
            </div>
          </div>

          {/* ── SECTION 2: Category ── */}
          <div className="form-section fade-in-up" style={{ animationDelay: "0.05s" }}>
            <p className="form-section-label">Select Category</p>
            <div className="category-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${selectedCategory === cat ? "category-pill-active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── SECTION 3: Title ── */}
          <div className="form-section fade-in-up" style={{ animationDelay: "0.1s" }}>
            <label className="form-section-label" htmlFor="project-title">
              Project Title
            </label>
            <input
              id="project-title"
              type="text"
              className="form-input"
              maxLength={80}
              placeholder="e.g. Gas Leak Detector with SMS Alert"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="char-count">{title.length}/80</p>
          </div>

          {/* ── SECTION 4: Description ── */}
          <div className="form-section fade-in-up" style={{ animationDelay: "0.15s" }}>
            <label className="form-section-label" htmlFor="project-desc">
              Brief Your Model
            </label>
            <textarea
              id="project-desc"
              className="form-textarea"
              rows={4}
              maxLength={500}
              placeholder="Explain what your project does, how it works, and what problem it solves..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="char-count">{description.length}/500</p>
          </div>

          {/* ── SECTION 5: Conditional — Components or Tools ── */}
          {projectType === "physical" && (
            <div className="form-section conditional-section fade-in-up">
              <p className="form-section-label">Components Used</p>
              <div className="components-list">
                {components.map((comp) => (
                  <div key={comp.id} className="component-row">
                    <input
                      type="text"
                      className="form-input comp-name"
                      placeholder="Component name (e.g. MQ-2 Gas Sensor)"
                      value={comp.name}
                      onChange={(e) => updateComponent(comp.id, "name", e.target.value)}
                    />
                    <div className="comp-price-wrap">
                      <span className="comp-price-prefix">₹</span>
                      <input
                        type="number"
                        className="form-input comp-price"
                        placeholder="Price"
                        min="0"
                        value={comp.price}
                        onChange={(e) => updateComponent(comp.id, "price", e.target.value)}
                      />
                    </div>
                    {components.length > 1 && (
                      <button
                        type="button"
                        className="comp-remove"
                        onClick={() => removeComponent(comp.id)}
                        aria-label="Remove component"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" className="btn-add-comp" onClick={addComponent}>
                <Plus size={15} />
                Add Component
              </button>
              <div className="comp-total">
                Component Total:{" "}
                <span>
                  ₹ {componentTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}

          {projectType === "software" && (
            <div className="form-section conditional-section fade-in-up">
              <p className="form-section-label">
                Applications / AI / Softwares used to develop
              </p>
              <div className="tool-input-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Python, FastAPI, Supabase..."
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  onKeyDown={handleToolKeyDown}
                />
                <button
                  type="button"
                  className="btn-add-tool"
                  onClick={addTool}
                >
                  <Plus size={15} />
                  Add
                </button>
              </div>
              {tools.length > 0 && (
                <div className="tools-chips">
                  {tools.map((tool) => (
                    <span key={tool} className="tool-chip">
                      {tool}
                      <button
                        type="button"
                        onClick={() => removeTool(tool)}
                        className="tool-chip-remove"
                        aria-label={`Remove ${tool}`}
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── SECTION 6: Conditional — Buy Location or Project Link ── */}
          {projectType === "physical" && (
            <div className="form-section conditional-section fade-in-up">
              <p className="form-section-label">Where to Buy Components</p>
              <p className="form-section-sublabel">Store / Purchase Location</p>
              <div className="buy-toggle">
                {(["online", "local", "both"] as BuyLocation[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`buy-toggle-btn ${buyLocation === opt ? "buy-toggle-active" : ""}`}
                    onClick={() => setBuyLocation(opt)}
                  >
                    {opt === "online"
                      ? "Online Store"
                      : opt === "local"
                      ? "Local Market"
                      : "Both"}
                  </button>
                ))}
              </div>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Robu.in, Amazon, SP Road Bangalore"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                style={{ marginTop: "0.875rem" }}
              />
            </div>
          )}

          {projectType === "software" && (
            <div className="form-section conditional-section fade-in-up">
              <label className="form-section-label" htmlFor="project-link">
                Live Link / GitHub / Demo URL
              </label>
              <div className="input-wrap">
                <LinkIcon size={15} className="input-icon" />
                <input
                  id="project-link"
                  type="url"
                  className="form-input with-icon"
                  placeholder="https://your-project-link.com"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ── SECTION 7: Total Cost ── */}
          <div className="form-section fade-in-up">
            <label className="form-section-label" htmlFor="total-cost">
              Total Project Cost (₹)
            </label>
            <div className="input-wrap">
              <span className="input-prefix">₹</span>
              <input
                id="total-cost"
                type="number"
                min="0"
                className="form-input with-prefix"
                placeholder="e.g. 850"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
              />
            </div>
            <p className="field-hint">
              For physical models this should include all components + misc costs.
            </p>
          </div>

          {/* ── SECTION 8: Image Upload ── */}
          {projectType !== null && (
            <div className="form-section conditional-section fade-in-up">
              <p className="form-section-label">
                {projectType === "physical"
                  ? "Project Images (Max 4)"
                  : "Screenshots or Demo Images (Max 4)"}
              </p>

              {previews.length < 4 && (
                <div
                  className="upload-box"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                  aria-label="Upload images"
                >
                  <Upload size={28} className="upload-icon" />
                  <p className="upload-main">Drag &amp; drop or click to upload</p>
                  <p className="upload-sub">
                    JPG, PNG up to 5MB each — max 4 images
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="upload-input-hidden"
                    onChange={handleFileChange}
                  />
                </div>
              )}

              {previews.length > 0 && (
                <div className="preview-grid">
                  {previews.map((p) => (
                    <div key={p.id} className="preview-item">
                      <img src={p.url} alt={p.name} className="preview-img" />
                      <button
                        type="button"
                        className="preview-remove"
                        onClick={() => removePreview(p.id)}
                        aria-label="Remove image"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── SECTION 9: Semester & Student Info ── */}
          <div className="form-section fade-in-up">
            <div className="two-col">
              <div className="field-group">
                <label className="form-section-label" htmlFor="semester">
                  Your Semester
                </label>
                <select
                  id="semester"
                  className="form-select"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Select semester</option>
                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label className="form-section-label" htmlFor="student-name">
                  Your Name
                </label>
                <input
                  id="student-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Rohan Mehta"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ── SUBMIT ── */}
          <div className="form-section" style={{ paddingTop: 0 }}>
            <button type="submit" className="btn-publish" disabled={submitted}>
              🚀 Publish My Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
