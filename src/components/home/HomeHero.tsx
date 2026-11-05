import { useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-pickup-nacelle.jpg";
import { HOME } from "@/data/home";
import { useScrollProgress } from "@/hooks/useReveal";
import { useLang } from "@/lib/locale";
import { Lines } from "@/components/Lines";

/** The whole first screen: the real machine, the name bold in the middle. */
export const HomeHero = () => {
  const { pick } = useLang();
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, "leave");
  const hero = HOME.hero;

  return (
    <section ref={ref} className="hh on-dark" aria-labelledby="home-title">
      <img className="hh-bg" src={heroImage} alt={pick(hero.imageAlt)} width={1600} height={1066} />
      <div className="hh-inner wrap">
        <p className="eyebrow rise">{pick(hero.eyebrow)}</p>
        <Lines as="h1" id="home-title" className="hh-title" lines={pick(hero.title)} delay={80} />
        <p className="t-lead hh-text rise" style={{ "--d": "300ms" } as CSSProperties}>
          {pick(hero.text)}
        </p>
        <div className="hh-actions rise" style={{ "--d": "380ms" } as CSSProperties}>
          <Link to="/contact#devis" className="btn btn--light">
            {pick(hero.primary)}
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link to="/produits" className="btn btn--ghost">
            {pick(hero.secondary)}
          </Link>
        </div>
      </div>
      <ul className="hh-facts wrap rise" style={{ "--d": "480ms" } as CSSProperties}>
        {hero.facts.map((fact) => (
          <li key={fact.fr}>{pick(fact)}</li>
        ))}
      </ul>
    </section>
  );
};
