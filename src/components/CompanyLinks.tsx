import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Lines } from "@/components/Lines";
import { useLang, type Copy } from "@/lib/locale";

const PAGES: { to: string; kind: Copy; title: Copy; text: Copy }[] = [
  {
    to: "/a-propos",
    kind: { fr: "Entreprise", en: "Company" },
    title: { fr: "Qui nous sommes", en: "Who we are" },
    text: { fr: "COMET Maroc, le relais du constructeur italien.", en: "COMET Morocco, the Italian manufacturer's partner." },
  },
  {
    to: "/histoire",
    kind: { fr: "Depuis 1960", en: "Since 1960" },
    title: { fr: "Notre histoire", en: "Our history" },
    text: { fr: "De la première Skyworker aux nacelles d'aujourd'hui.", en: "From the first Skyworker to today's platforms." },
  },
  {
    to: "/certifications",
    kind: { fr: "Qualité", en: "Quality" },
    title: { fr: "Certifications", en: "Certifications" },
    text: { fr: "Les normes ISO du constructeur, certificats à l'appui.", en: "The manufacturer's ISO standards, with the certificates." },
  },
  {
    to: "/politique-entreprise",
    kind: { fr: "Engagements", en: "Commitments" },
    title: { fr: "Politique d'entreprise", en: "Company policy" },
    text: { fr: "Qualité, lutte contre la corruption, égalité.", en: "Quality, anti-corruption, equality." },
  },
  {
    to: "/code-ethique",
    kind: { fr: "Principes", en: "Principles" },
    title: { fr: "Code éthique", en: "Code of ethics" },
    text: { fr: "Les règles de conduite qui guident le constructeur.", en: "The rules of conduct that guide the manufacturer." },
  },
  {
    to: "/nous-rejoindre",
    kind: { fr: "Carrières", en: "Careers" },
    title: { fr: "Nous rejoindre", en: "Join us" },
    text: { fr: "Technique, commerce, service : écrivez-nous.", en: "Technical, sales, service: write to us." },
  },
];

/** The other company pages, at the foot of each of them. */
export const CompanyLinks = ({ current }: { current: string }) => {
  const { pick } = useLang();
  const others = PAGES.filter((page) => page.to !== current);

  return (
    <section className="on-paper section--tight" aria-labelledby="company-more">
      <div className="wrap">
        <div className="pg-head">
          <div>
            <span className="eyebrow">{pick({ fr: "Entreprise", en: "Company" })}</span>
            <Lines id="company-more" className="t-h2" lines={pick({ fr: ["Pour aller", "plus loin."], en: ["Read", "further."] })} />
          </div>
        </div>
        <div className="pg-docs">
          {others.map((page, i) => (
            <Link key={page.to} to={page.to} className="pg-doc rise" style={{ "--i": i % 3 } as CSSProperties}>
              <span className="pg-doc-kind">{pick(page.kind)}</span>
              <h3>{pick(page.title)}</h3>
              <p>{pick(page.text)}</p>
              <span className="link-arrow">
                {pick({ fr: "Lire", en: "Read" })}
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLinks;
