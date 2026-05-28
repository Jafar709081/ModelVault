import { useRef, useEffect, useCallback } from "react";

interface MouseTiltOptions {
  maxTilt?: number;       // degrees (default 12)
  perspective?: number;   // px (default 800)
  scale?: number;         // hover scale (default 1.03)
  glare?: boolean;        // show glare overlay (default true)
  speed?: number;         // transition speed ms (default 300)
}

/**
 * Returns a ref to attach to the card container.
 * The hook tracks mouse position over the card and applies
 * CSS custom properties for rotateX, rotateY, and glare position.
 */
export function useMouseTilt<T extends HTMLElement = HTMLElement>(
  options: MouseTiltOptions = {}
) {
  const {
    maxTilt = 12,
    perspective = 900,
    scale = 1.04,
    glare = true,
    speed = 300,
  } = options;

  const ref = useRef<T>(null);
  const rafRef = useRef<number>(0);
  const isHovering = useRef(false);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--tilt-scale", "1");
    el.style.setProperty("--glare-x", "50%");
    el.style.setProperty("--glare-y", "50%");
    el.style.setProperty("--glare-opacity", "0");
    el.style.setProperty("--transition-speed", `${speed}ms`);
  }, [speed]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial CSS properties
    el.style.setProperty("--perspective", `${perspective}px`);
    el.style.setProperty("--transition-speed", `${speed}ms`);
    reset();

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);

        const rotX = -dy * maxTilt;
        const rotY = dx * maxTilt;

        el.style.setProperty("--tilt-x", `${rotX}deg`);
        el.style.setProperty("--tilt-y", `${rotY}deg`);
        el.style.setProperty("--tilt-scale", `${scale}`);
        el.style.setProperty("--transition-speed", "80ms");

        if (glare) {
          const gx = ((e.clientX - rect.left) / rect.width) * 100;
          const gy = ((e.clientY - rect.top) / rect.height) * 100;
          el.style.setProperty("--glare-x", `${gx}%`);
          el.style.setProperty("--glare-y", `${gy}%`);
          el.style.setProperty("--glare-opacity", "1");
        }
      });
    };

    const onMouseEnter = () => {
      isHovering.current = true;
      el.style.setProperty("--transition-speed", "80ms");
    };

    const onMouseLeave = () => {
      isHovering.current = false;
      cancelAnimationFrame(rafRef.current);
      reset();
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [maxTilt, perspective, scale, glare, speed, reset]);

  return ref;
}
