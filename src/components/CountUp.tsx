import { useEffect, useRef, useState } from "react";

type Props = {
  value: number | null;
  duration?: number;
  format?: (n: number) => string;
  fallback?: string;
  className?: string;
};

const defaultFormat = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1) + "k";
  return n.toLocaleString();
};

const CountUp = ({ value, duration = 1400, format = defaultFormat, fallback = "—", className }: Props) => {
  const [n, setN] = useState(0);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(0);

  useEffect(() => {
    if (value == null) return;
    fromRef.current = n;
    startRef.current = null;
    let raf = 0;
    const target = value;
    const from = fromRef.current;
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <span className={className}>{value == null ? fallback : format(n)}</span>;
};

export default CountUp;
