import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { CompanyLinks } from "@/components/CompanyLinks";
import { useLang, type Copy } from "@/lib/locale";

const PDF = "https://www.officinecomet.com/wp-content/uploads/2026/03";
const DOCS: { name: Copy; text: Copy; href: string }[] = [
  { name: { fr: "Politique d'entreprise", en: "Company policy" }, text: { fr: "Les principes de la stratégie : innovation, durabilité, satisfaction client.", en: "The principles behind the strategy: innovation, sustainability, customer satisfaction." }, href: `${PDF}/Politica-Aziendale.pdf` },
  { name: { fr: "Politique anticorruption", en: "Anti-corruption policy" }, text: { fr: "Une opposition ferme à toute forme de corruption, en toute transparence.", en: "Firm opposition to any form of corruption, in full transparency." }, href: `${PDF}/Politica-Anticorruzione.pdf` },
  { name: { fr: "Politique d'égalité femmes-hommes", en: "Gender equality policy" }, text: { fr: "Égalité des chances, diversité et place des femmes dans l'entreprise.", en: "Equal opportunities, diversity and women's place in the company." }, href: `${PDF}/Politica-Parita-di-Genere.pdf` },
];

const Policy = () => {
  const { pick } = useLang();
  const title = pick({ fr: "Politique d'entreprise", en: "Company policy" });
  return (
    <PageTemplate
      seo={{
        path: "/politique-entreprise",
        title: `${title} | COMET Maroc`,
        description: pick({ fr: "Politique d'entreprise, anticorruption et égalité du constructeur CO.ME.T. Officine S.p.A.", en: "Company, anti-corruption and equality policies of CO.ME.T. Officine S.p.A." }),
      }}
      hero={{
        eyebrow: pick({ fr: "Entreprise", en: "Company" }),
        title: pick({ fr: ["Nos", "engagements."], en: ["Our", "commitments."] }),
        text: pick({ fr: "Les documents qui définissent la vision et les valeurs du constructeur.", en: "The documents that set out the manufacturer's vision and values." }),
        image: "https://www.officinecomet.com/wp-content/uploads/2024/02/certification-3.jpg",
        size: "sm",
      }}
      crumbs={[{ label: pick({ fr: "À propos", en: "About" }), to: "/a-propos" }, { label: title }]}
    >
      <section className="section">
        <div className="wrap pg-docs">
          {DOCS.map((d, i) => (
            <a key={d.href} className="pg-doc rise" style={{ "--i": i } as CSSProperties} href={d.href} target="_blank" rel="noopener noreferrer">
              <span className="pg-doc-kind">Document</span>
              <h3>{pick(d.name)}</h3>
              <p>{pick(d.text)}</p>
              <span className="link-arrow">
                {pick({ fr: "Lire (PDF, italien)", en: "Read (PDF, Italian)" })}
                <ArrowRight aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>
      <CompanyLinks current="/politique-entreprise" />
    </PageTemplate>
  );
};

export default Policy;
