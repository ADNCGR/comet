import { Fragment, useRef, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useScrollProgress } from "@/hooks/useReveal";
import { useLang } from "@/lib/locale";
import { Lines } from "@/components/Lines";
import "./PageHero.css";

export type Crumb = { label: string; to?: string };

type PageHeroProps = {
  title: string[];
  eyebrow?: string;
  text?: string;
  image?: string;
  /** "lg" takes the whole screen; "md" most of it; "sm" for plain pages */
  size?: "sm" | "md" | "lg";
  crumbs?: Crumb[];
  children?: ReactNode;
};

/**
 * The dark top of every page: a photo under a flat veil, the title bold in
 * the middle, lines sliding up one after the other. Scrolling away lifts the
 * text and lets the photo trail behind.
 */
export const PageHero = ({ title, eyebrow, text, image, size = "md", crumbs, children }: PageHeroProps) => {
  const ref = useRef<HTMLElement>(null);
  const { pick } = useLang();
  useScrollProgress(ref, "leave");

  return (
    <section ref={ref} className={`ph on-dark ph--${size}`}>
      {image && <img className="ph-bg" src={image} alt="" decoding="async" />}
      <div className="ph-inner wrap">
        {eyebrow && <p className="eyebrow rise">{eyebrow}</p>}
        <Lines as="h1" className="ph-title" lines={title} />
        {text && (
          <p className="t-lead ph-text rise" style={{ "--d": "200ms" } as CSSProperties}>
            {text}
          </p>
        )}
        {children && (
          <div className="ph-actions rise" style={{ "--d": "280ms" } as CSSProperties}>
            {children}
          </div>
        )}
      </div>
      {crumbs && crumbs.length > 0 && (
        <nav className="ph-crumbs wrap" aria-label={pick({ fr: "Fil d'Ariane", en: "Breadcrumb" })}>
          <ol>
            <li>
              <Link to="/">{pick({ fr: "Accueil", en: "Home" })}</Link>
            </li>
            {crumbs.map((crumb, i) => (
              <Fragment key={`${crumb.label}-${i}`}>
                <li aria-current={i === crumbs.length - 1 ? "page" : undefined}>
                  {crumb.to && i < crumbs.length - 1 ? <Link to={crumb.to}>{crumb.label}</Link> : crumb.label}
                </li>
              </Fragment>
            ))}
          </ol>
        </nav>
      )}
    </section>
  );
};

export default PageHero;
