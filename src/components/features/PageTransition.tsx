import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

/**
 * Wraps a page with a smooth fade-and-slide-up entrance animation.
 * Uses a CSS class that is added one frame after mount so the
 * transition actually plays.
 */
export default function PageTransition({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Next frame → trigger CSS transition
    const id = requestAnimationFrame(() => {
      el.dataset.entered = "true";
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div ref={ref} className="page-transition-root">
      {children}
    </div>
  );
}
