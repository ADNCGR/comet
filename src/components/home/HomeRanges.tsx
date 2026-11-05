import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HOME } from "@/data/home";
import { targetCategories } from "@/data/targetPages";
import { textFor } from "@/data/homepageContent";
import { useLang } from "@/lib/locale";
import { Lines } from "@/components/Lines";

const dash = (range?: string) => (range ?? "").replace(/(\d)\s*-\s*(\d)/, "$1–$2");

/**
 * The ranges, side by side. On large screens the section holds still while
 * the scroll walks the row of cards past; on phones the row is swiped.
 */
export const HomeRanges = () => {
  const { lang, pick } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copy = HOME.ranges;

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const track = trackRef.current;
    if (!section || !frame || !track) return;
    const wide = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    let distance = 0;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!distance) return;
      const r = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      track.style.translate = `${(-p * distance).toFixed(1)}px 0`;
      section.style.setProperty("--p", p.toFixed(4));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const measure = () => {
      if (!wide.matches) {
        distance = 0;
        section.style.height = "";
        track.style.translate = "";
        section.style.removeProperty("--p");
        return;
      }
      distance = Math.max(0, track.scrollWidth - frame.clientWidth);
      // the section is as tall as the row is long: one screen plus the distance to walk
      section.style.height = `${window.innerHeight + distance}px`;
      update();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", measure);
    wide.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hr on-paper" aria-labelledby="ranges-title">
      <div ref={frameRef} className="hr-frame">
        <header className="hr-head wrap">
          <div>
            <span className="eyebrow">{pick(copy.eyebrow)}</span>
            <Lines id="ranges-title" className="t-h2" lines={pick(copy.title)} />
          </div>
          <div className="hr-intro rise">
            <p className="t-lead">{pick(copy.text)}</p>
            <Link to="/produits" className="link-arrow">
              {pick(copy.all)}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </header>

        <div className="hr-viewport">
          <div ref={trackRef} className="hr-track">
            {targetCategories.map((category, i) => {
              const title = textFor(category.title, lang);
              return (
                <Link key={category.slug} to={`/${category.slug}`} className="hr-card rise" style={{ "--i": Math.min(i, 3) } as CSSProperties}>
                  <div className="hr-img">
                    <img src={category.image} alt={title} loading="lazy" decoding="async" />
                  </div>
                  <div className="hr-body">
                    <p className="hr-range">{dash(category.range)}</p>
                    <h3 className="t-h3">{title}</h3>
                    {category.excerpt && <p className="hr-text">{textFor(category.excerpt, lang)}</p>}
                    <span className="link-arrow">
                      {pick(copy.see)}
                      <ArrowRight aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
            <Link to="/produits" className="hr-card hr-card--all on-dark">
              <span className="hr-all-title">{pick(copy.all)}</span>
              <span className="hr-text">{pick(copy.allText)}</span>
              <span className="link-arrow">
                {pick({ fr: "Ouvrir le catalogue", en: "Open the catalogue" })}
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <div className="hr-progress wrap" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
};
