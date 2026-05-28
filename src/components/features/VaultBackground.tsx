import { useEffect, useRef } from "react";
import { useThemeContext } from "@/contexts/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

/**
 * Immersive vault background:
 * - Animated perspective grid floor (dark mode)
 * - Floating particles / circuit nodes
 * - Volumetric light rays
 * - Reacts to global mouse movement (parallax)
 */
export default function VaultBackground() {
  const { theme } = useThemeContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const count = Math.min(Math.floor(window.innerWidth / 8), 120);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      color: isDark
        ? Math.random() > 0.5 ? "#8b5cf6" : Math.random() > 0.5 ? "#3b82f6" : "#06b6d4"
        : Math.random() > 0.5 ? "#7c3aed" : "#4f46e5",
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Connection lines between nearby particles
    const drawConnections = (pts: Particle[]) => {
      const maxDist = 120;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.12 : 0.07);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(139,92,246,${alpha})`
              : `rgba(124,58,237,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Perspective grid
    const drawGrid = () => {
      if (!isDark) return;
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const horizon = H * (0.52 + my * 0.04);
      const vanishX = W * (0.5 + (mx - 0.5) * 0.1);

      const cols = 18;
      const gridOpacity = 0.07;

      // Vertical lines
      for (let i = 0; i <= cols; i++) {
        const t = i / cols;
        const bx = t * W;
        const alpha = gridOpacity * (1 - Math.abs(t - 0.5) * 1.2);
        if (alpha <= 0) continue;
        const grad = ctx.createLinearGradient(vanishX, horizon, bx, H);
        grad.addColorStop(0, `rgba(139,92,246,0)`);
        grad.addColorStop(0.3, `rgba(139,92,246,${alpha * 0.6})`);
        grad.addColorStop(1, `rgba(79,70,229,${alpha})`);
        ctx.beginPath();
        ctx.moveTo(vanishX, horizon);
        ctx.lineTo(bx, H);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Horizontal lines (foreshortened)
      const rows = 14;
      for (let i = 0; i < rows; i++) {
        const t = Math.pow(i / rows, 1.8);
        const y = horizon + (H - horizon) * t;
        const progress = (y - horizon) / (H - horizon);
        const alpha = gridOpacity * progress * 0.8;
        const spread = progress * W * 0.5;
        const lx = W * 0.5 - spread;
        const rx = W * 0.5 + spread;

        const grad = ctx.createLinearGradient(lx, y, rx, y);
        grad.addColorStop(0, `rgba(139,92,246,0)`);
        grad.addColorStop(0.2, `rgba(139,92,246,${alpha})`);
        grad.addColorStop(0.8, `rgba(79,70,229,${alpha})`);
        grad.addColorStop(1, `rgba(139,92,246,0)`);
        ctx.beginPath();
        ctx.moveTo(lx, y);
        ctx.lineTo(rx, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    };

    // Volumetric light beams (dark only)
    const drawLightBeams = () => {
      if (!isDark) return;
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouseRef.current.x;

      const beams = [
        { x: W * (0.2 + mx * 0.15), color: "rgba(139,92,246,0.025)", width: W * 0.25 },
        { x: W * (0.75 - mx * 0.1), color: "rgba(59,130,246,0.02)", width: W * 0.2 },
      ];

      beams.forEach(({ x, color, width }) => {
        const grad = ctx.createRadialGradient(x, 0, 0, x, 0, H * 1.2);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x - width / 2, 0);
        ctx.lineTo(x + width / 2, 0);
        ctx.lineTo(x + width * 1.5, H);
        ctx.lineTo(x - width * 1.5, H);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      });
    };

    // Floating circuit nodes (small glowing squares)
    const circuitNodes: Array<{ x: number; y: number; size: number; angle: number; speed: number; color: string }> = 
      Array.from({ length: isDark ? 18 : 8 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 6 + 3,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.3,
        color: isDark
          ? Math.random() > 0.5 ? "rgba(139,92,246,0.4)" : "rgba(59,130,246,0.3)"
          : "rgba(124,58,237,0.2)",
      }));

    let frame = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frame++;

      // Background fill
      if (isDark) {
        const bgGrad = ctx.createRadialGradient(
          canvas.width * 0.5, canvas.height * 0.3, 0,
          canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
        );
        bgGrad.addColorStop(0, "rgba(26,16,51,0.0)");
        bgGrad.addColorStop(1, "rgba(10,10,15,0.0)");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      drawLightBeams();
      drawGrid();

      // Update & draw particles
      const pts = particlesRef.current;
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulseOpacity = p.opacity * (0.6 + Math.sin(p.pulse) * 0.4);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, p.color.replace(")", `,${pulseOpacity})`).replace("rgb", "rgba").replace("#", "rgba(").replace("rgb(", "rgba(").replace(/rgba\(([^)]+)\)/, (m) => {
          const hex = p.color;
          if (hex.startsWith("#")) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r},${g},${b},${pulseOpacity})`;
          }
          return m;
        }));
        glow.addColorStop(1, "rgba(0,0,0,0)");

        // Draw as glowing dot
        const hexColor = p.color;
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);

        const glowG = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        glowG.addColorStop(0, `rgba(${r},${g},${b},${pulseOpacity})`);
        glowG.addColorStop(0.4, `rgba(${r},${g},${b},${pulseOpacity * 0.3})`);
        glowG.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glowG;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(pulseOpacity * 1.5, 1)})`;
        ctx.fill();
      });

      drawConnections(pts);

      // Draw circuit nodes (rotating squares)
      circuitNodes.forEach((node, idx) => {
        node.angle += node.speed * 0.02;
        node.x += Math.sin(frame * 0.005 + idx) * 0.15;
        node.y += Math.cos(frame * 0.007 + idx * 1.3) * 0.12;

        if (node.x < -50) node.x = canvas.width + 50;
        if (node.x > canvas.width + 50) node.x = -50;
        if (node.y < -50) node.y = canvas.height + 50;
        if (node.y > canvas.height + 50) node.y = -50;

        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.rotate(node.angle);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(-node.size / 2, -node.size / 2, node.size, node.size);

        // Inner cross
        ctx.beginPath();
        ctx.moveTo(-node.size * 0.8, 0);
        ctx.lineTo(node.size * 0.8, 0);
        ctx.moveTo(0, -node.size * 0.8);
        ctx.lineTo(0, node.size * 0.8);
        ctx.strokeStyle = node.color;
        ctx.stroke();
        ctx.restore();
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="vault-background-canvas"
      aria-hidden="true"
    />
  );
}
