import { useEffect, useState } from "react";

interface Ember {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  hue: number;
}

interface Props {
  count?: number;
  className?: string;
}

const Embers = ({ count = 22, className = "" }: Props) => {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    const arr: Ember[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 10,
      drift: -40 + Math.random() * 80,
      hue: Math.random() > 0.5 ? 42 : 18,
    }));
    setEmbers(arr);
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            background: `hsl(${e.hue} 80% 60%)`,
            boxShadow: `0 0 ${e.size * 3}px hsl(${e.hue} 80% 60% / 0.8)`,
            animation: `ember-rise ${e.duration}s linear ${e.delay}s infinite`,
            // @ts-expect-error css var
            "--drift": `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Embers;
