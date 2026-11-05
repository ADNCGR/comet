import { PageTemplate } from "@/components/PageTemplate";
import { CompanyLinks } from "@/components/CompanyLinks";
import { useLang, type Copy } from "@/lib/locale";

const POINTS: { t: Copy; p: Copy }[] = [
  { t: { fr: "Objet du code", en: "Purpose" }, p: { fr: "Document officiel approuvé par l'organe d'administration : il fixe les engagements éthiques des dirigeants, salariés, collaborateurs et fournisseurs.", en: "An official document approved by the board, setting the ethical commitments of directors, staff, partners and suppliers." } },
  { t: { fr: "Respect de la personne et équité", en: "Respect and fairness" }, p: { fr: "Respect de l'intégrité de chacun, égalité des chances, aucune discrimination liée à l'âge, au sexe, à la santé, à l'origine, aux opinions ou à la religion.", en: "Respect for everyone's integrity, equal opportunities, no discrimination on age, sex, health, origin, opinions or religion." } },
  { t: { fr: "Légalité, honnêteté, transparence", en: "Legality, honesty, transparency" }, p: { fr: "Respect des lois et des règles internes ; aucun intérêt de l'entreprise ne justifie une conduite malhonnête. Informations exactes, complètes et claires.", en: "Compliance with laws and internal rules; no company interest justifies dishonesty. Accurate, complete and clear information." } },
  { t: { fr: "Confidentialité", en: "Confidentiality" }, p: { fr: "Les données personnelles sont protégées ; les informations confidentielles ne servent qu'à l'exercice des fonctions.", en: "Personal data is protected; confidential information is used only for one's duties." } },
  { t: { fr: "Environnement", en: "Environment" }, p: { fr: "L'environnement est un patrimoine à préserver : l'entreprise intègre les enjeux sociaux et environnementaux et vise un développement durable.", en: "The environment is a heritage to protect: social and environmental issues are built into the business." } },
  { t: { fr: "Signalements et sanctions", en: "Reporting and sanctions" }, p: { fr: "Toute violation doit être signalée ; les auteurs de signalements sont protégés contre les représailles et leur identité reste confidentielle.", en: "Any breach must be reported; whistleblowers are protected from retaliation and kept confidential." } },
];

const CodeOfEthics = () => {
  const { pick } = useLang();
  const title = pick({ fr: "Code éthique", en: "Code of ethics" });
  return (
    <PageTemplate
      seo={{
        path: "/code-ethique",
        title: `${title} | COMET Maroc`,
        description: pick({ fr: "Les principes du Code éthique du constructeur CO.ME.T. Officine S.p.A.", en: "The principles of the CO.ME.T. Officine S.p.A. code of ethics." }),
      }}
      hero={{
        eyebrow: pick({ fr: "Entreprise", en: "Company" }),
        title: pick({ fr: ["Code", "éthique."], en: ["Code", "of ethics."] }),
        text: pick({ fr: "Intégrité, transparence et responsabilité envers clients, collaborateurs et partenaires.", en: "Integrity, transparency and responsibility towards customers, staff and partners." }),
        image: "https://www.officinecomet.com/wp-content/uploads/2024/02/certification-3.jpg",
        size: "sm",
      }}
      crumbs={[{ label: pick({ fr: "À propos", en: "About" }), to: "/a-propos" }, { label: title }]}
    >
      <section className="section">
        <div className="wrap pg-prose">
          <p className="pg-note">
            {pick({ fr: "Résumé en français du Code éthique de CO.ME.T. Officine S.p.A. Le texte original en italien fait foi.", en: "Summary of the CO.ME.T. Officine S.p.A. code of ethics. The original Italian text prevails." })}
          </p>
          {POINTS.map((x) => (
            <div key={x.t.fr}>
              <h3>{pick(x.t)}</h3>
              <p>{pick(x.p)}</p>
            </div>
          ))}
        </div>
      </section>
      <CompanyLinks current="/code-ethique" />
    </PageTemplate>
  );
};

export default CodeOfEthics;
