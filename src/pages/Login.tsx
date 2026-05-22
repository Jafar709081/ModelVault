import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Cpu, Mail, Lock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    // Simulate login — replace with Supabase auth when backend is ready
    setTimeout(() => {
      setIsLoading(false);
      navigate("/add-project");
    }, 1200);
  };

  return (
    <div className="page-dark">
      <Navbar />
      <div className="login-page">
        <div className="login-glow" aria-hidden="true" />

        <div className="login-card fade-in-up">
          {/* Logo */}
          <div className="login-logo">
            <div className="logo-icon logo-icon-lg">
              <Cpu size={22} color="white" />
            </div>
            <span className="navbar-logo-text" style={{ fontSize: "1.5rem" }}>
              ModelVault
            </span>
          </div>

          {/* Heading */}
          <h1 className="login-heading">Welcome Back</h1>
          <p className="login-sub">Login to upload your project model</p>

          {/* Error */}
          {error && <div className="form-error-banner">{error}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {/* Email */}
            <div className="field-group">
              <label className="field-label" htmlFor="email">
                Email Address
              </label>
              <div className="input-wrap">
                <Mail size={16} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="form-input with-icon"
                  placeholder="you@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label" htmlFor="password">
                Password
              </label>
              <div className="input-wrap">
                <Lock size={16} className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="form-input with-icon with-icon-right"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div style={{ textAlign: "right", marginTop: "-0.5rem" }}>
              <a href="#" className="link-purple" style={{ fontSize: "0.82rem" }}>
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`btn-form-submit ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span>or</span>
          </div>

          {/* Sign Up */}
          <p className="login-signup-text">
            Don&apos;t have an account?{" "}
            <Link to="/login" className="link-purple">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
