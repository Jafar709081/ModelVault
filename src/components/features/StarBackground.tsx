import { useMemo } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  minOpacity: number;
  maxOpacity: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function StarBackground() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      top: `${seededRandom(i * 3) * 100}%`,
      left: `${seededRandom(i * 3 + 1) * 100}%`,
      size: seededRandom(i * 3 + 2) * 2.5 + 0.5,
      duration: seededRandom(i * 7) * 4 + 2,
      delay: seededRandom(i * 5) * 4,
      minOpacity: 0.05 + seededRandom(i * 11) * 0.1,
      maxOpacity: 0.3 + seededRandom(i * 13) * 0.5,
    }));
  }, []);

  return (
    <div className="stars-container" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
            "--min-opacity": star.minOpacity,
            "--max-opacity": star.maxOpacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
