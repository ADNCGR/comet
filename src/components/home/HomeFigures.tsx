import { useEffect, useRef, useState, type CSSProperties } from "react";
import { HOME } from "@/data/home";
import { useLang } from "@/lib/locale";

const easeOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Counts up from zero the first time it is seen. */
const CountUp = ({ value, count, locale }: { value: number; count: boolean; locale: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(count ? 0 : value);

  useEffect(() => {
    if (!count) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1100);
          setShown(Math.round(value * easeOut(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [count, value]);

  return (
    <span ref={ref} aria-label={value.toLocaleString(locale)}>
      {count ? shown.toLocaleString(locale) : value}
    </span>
  );
};

/** The manufacturer's figures, big. */
export const HomeFigures = () => {
  const { lang, pick } = useLang();
  const locale = lang === "fr" ? "fr-FR" : "en-GB";
  const copy = HOME.figures;

  return (
    <section className="hf section--tight" aria-label={pick(copy.eyebrow)}>
      <div className="wrap">
        <span className="eyebrow">{pick(copy.eyebrow)}</span>
        <dl className="hf-grid">
          {copy.items.map((item, i) => (
            <div key={item.value} className="hf-item rise" style={{ "--i": i } as CSSProperties}>
              <dt>{pick(item.label)}</dt>
              <dd>
                <CountUp value={item.value} count={item.count} locale={locale} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
