import { useEffect, useRef } from "react";

interface UseScrollRevealOptions {
  /** Root margin — how far before the element enters the viewport to trigger (default: "-60px") */
  rootMargin?: string;
  /** Whether the animation should only fire once (default: true) */
  once?: boolean;
}

/**
 * Attaches an IntersectionObserver to a container element.
 * When a child with class `.reveal` enters the viewport the observer
 * adds `data-revealed="true"` to it, which CSS transitions pick up.
 *
 * Returns a ref to attach to the container.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const { rootMargin = "-60px", once = true } = options;
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = Array.from(container.querySelectorAll<HTMLElement>(".reveal"));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            delete (entry.target as HTMLElement).dataset.revealed;
          }
        });
      },
      { rootMargin, threshold: 0.08 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return containerRef;
}

/**
 * Single-element version — attach directly to one element.
 */
export function useRevealElement<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const { rootMargin = "-60px", once = true } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealed = "true";
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          delete (entry.target as HTMLElement).dataset.revealed;
        }
      },
      { rootMargin, threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return ref;
}
