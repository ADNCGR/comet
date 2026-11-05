import type { CSSProperties } from "react";
import { PageTemplate } from "@/components/PageTemplate";
import { CompanyLinks } from "@/components/CompanyLinks";
import { Lines } from "@/components/Lines";
import { useLang, type Copy } from "@/lib/locale";

const HERO_IMAGE = "https://www.officinecomet.com/wp-content/uploads/2023/06/sfondo-pag-piattaforme.jpg";
const SITE_IMAGE = "https://www.officinecomet.com/wp-content/uploads/2024/04/Comet-Perugia-1.jpg";

const FACTS: { value: string; label: Copy }[] = [
  { value: "1960", label: { fr: "Fondation du constructeur", en: "The manufacturer is founded" } },
  { value: "2", label: { fr: "Sites de production en Italie", en: "Production sites in Italy" } },
  { value: "85", label: { fr: "Modèles au catalogue", en: "Models in the range" } },
  { value: "35", label: { fr: "Pays équipés", en: "Countries" } },
];

const COMMITMENTS: { title: Copy; text: Copy }[] = [
  {
    title: { fr: "Qualité", en: "Quality" },
    text: {
      fr: "Des composants italiens de premier choix, une traçabilité complète sur chaque machine, des procédés certifiés ISO 9001:2015 et des modèles conformes au marquage CE.",
      en: "Top-quality Italian components, full traceability on every machine, ISO 9001:2015 certified processes and CE-marked models.",
    },
  },
  {
    title: { fr: "Sécurité", en: "Safety" },
    text: {
      fr: "Des dispositifs de sécurité actifs, qui protègent l'opérateur même en cas de panne (marque 100% SAFE), et une formation à l'utilisation sûre des nacelles.",
      en: "Active safety devices that protect the operator even in case of failure (the 100% SAFE mark), and training in the safe use of platforms.",
    },
  },
  {
    title: { fr: "Environnement", en: "Environment" },
    text: {
      fr: "Une ligne ECO à l'huile hydraulique biodégradable, et des usines équipées de panneaux photovoltaïques.",
      en: "An ECO line running on biodegradable hydraulic oil, and factories fitted with solar panels.",
    },
  },
  {
    title: { fr: "Proximité", en: "Close at hand" },
    text: {
      fr: "Au Maroc, un interlocuteur à Casablanca, du premier devis à l'entretien, avec les pièces et le service après-vente.",
      en: "In Morocco, one contact in Casablanca, from the first quote to servicing, with parts and after-sales service.",
    },
  },
];

/** About: COMET Maroc, the manufacturer behind it, what both stand for. */
const Azienda = () => {
  const { pick } = useLang();
  const title = pick({ fr: "À propos", en: "About" });

  return (
    <PageTemplate
      seo={{
        path: "/a-propos",
        title: pick({ fr: "À propos de COMET Maroc · Nacelles C.O.M.E.T. au Maroc", en: "About COMET Morocco · C.O.M.E.T. platforms in Morocco" }),
        description: pick({
          fr: "COMET Maroc représente au Maroc les nacelles élévatrices C.O.M.E.T., conçues et fabriquées en Italie depuis 1960 : devis, démonstration, formation et service depuis Casablanca.",
          en: "COMET Morocco represents C.O.M.E.T. aerial platforms in Morocco, designed and built in Italy since 1960: quotes, demos, training and service from Casablanca.",
        }),
        keywords: "COMET Maroc, CO.ME.T. Officine, nacelle italienne Maroc, représentant nacelle Maroc, Casablanca",
      }}
      hero={{
        eyebrow: pick({ fr: "Entreprise", en: "Company" }),
        title: pick({ fr: ["Qui nous", "sommes."], en: ["Who", "we are."] }),
        text: pick({
          fr: "COMET Maroc représente au Maroc les nacelles élévatrices C.O.M.E.T., conçues et fabriquées en Italie depuis 1960.",
          en: "COMET Morocco represents C.O.M.E.T. aerial platforms in Morocco, designed and built in Italy since 1960.",
        }),
        image: HERO_IMAGE,
      }}
      crumbs={[{ label: title }]}
    >
      <section className="section" aria-labelledby="about-mission">
        <div className="wrap pg-intro">
          <header>
            <span className="eyebrow">COMET Maroc</span>
            <Lines id="about-mission" className="t-h2" lines={pick({ fr: ["Le relais", "du constructeur."], en: ["The manufacturer's", "partner."] })} />
          </header>
          <div className="pg-intro-text rise">
            <p className="t-lead">
              {pick({
                fr: "Notre mission : apporter aux professionnels marocains des nacelles de qualité européenne, adaptées à leurs chantiers, avec un service de proximité.",
                en: "Our mission: bring Moroccan professionals European-quality platforms, suited to their work, with service close at hand.",
              })}
            </p>
            <p className="t-body">
              {pick({
                fr: "Depuis Casablanca, nous suivons chaque projet de bout en bout : choix de la gamme et du porteur, devis, démonstration, livraison, formation des opérateurs, puis entretien et pièces détachées.",
                en: "From Casablanca, we follow each project end to end: choice of range and carrier, quote, demo, delivery, operator training, then servicing and spare parts.",
              })}
            </p>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: "clamp(48px, 6vw, 80px)" }}>
          <dl className="pg-facts rise">
            {FACTS.map((fact) => (
              <div key={fact.value + fact.label.fr}>
                <dt>{pick(fact.label)}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="on-paper section" aria-labelledby="about-maker">
        <div className="wrap pg-split">
          <div className="pg-split-media rise">
            <img
              src={SITE_IMAGE}
              alt={pick({ fr: "Le site C.O.M.E.T. de San Giustino, en Italie", en: "The C.O.M.E.T. site in San Giustino, Italy" })}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="pg-split-body">
            <span className="eyebrow">{pick({ fr: "Le constructeur", en: "The manufacturer" })}</span>
            <Lines id="about-maker" className="t-h2" lines={pick({ fr: ["Fabriquées", "en Italie."], en: ["Built", "in Italy."] })} />
            <p className="t-body rise">
              {pick({
                fr: "CO.ME.T. Officine S.p.A. conçoit et fabrique ses nacelles sur deux sites : San Giovanni in Persiceto, près de Bologne, qui réunit production et bureaux, et San Giustino, près de Pérouse, dédié à la production avec ses bureaux techniques.",
                en: "CO.ME.T. Officine S.p.A. designs and builds its platforms at two sites: San Giovanni in Persiceto, near Bologna, with production and offices, and San Giustino, near Perugia, dedicated to production with its technical offices.",
              })}
            </p>
            <p className="t-body rise">
              {pick({
                fr: "Plus de soixante ans de métier, le premier constructeur italien à s'être spécialisé dans les nacelles isolées, et une présence dans 35 pays.",
                en: "More than sixty years in the trade, the first Italian manufacturer to specialise in insulated platforms, and a presence in 35 countries.",
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-values">
        <div className="wrap">
          <div className="pg-head">
            <div>
              <span className="eyebrow">{pick({ fr: "Nos engagements", en: "Our commitments" })}</span>
              <Lines id="about-values" className="t-h2" lines={pick({ fr: ["Ce qui ne", "se négocie pas."], en: ["What is not", "up for debate."] })} />
            </div>
          </div>
          <ol className="pg-list">
            {COMMITMENTS.map((item, i) => (
              <li key={item.title.fr} className="rise" style={{ "--i": i } as CSSProperties}>
                <span className="pg-list-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{pick(item.title)}</h3>
                <p>{pick(item.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CompanyLinks current="/a-propos" />
    </PageTemplate>
  );
};

export default Azienda;
