import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { Lines } from "@/components/Lines";
import { WhatsAppIcon } from "@/components/icons";
import { CONTACT, whatsappHref } from "@/config/contact";
import { useLang, type Copy } from "@/lib/locale";

const HERO_IMAGE = "https://www.officinecomet.com/wp-content/uploads/2024/04/assistenza2.jpg";
const WORKSHOP_IMAGE = "https://www.officinecomet.com/wp-content/uploads/2024/02/foto-aerea-2.jpg";

const SERVICES: { title: Copy; text: Copy }[] = [
  {
    title: { fr: "Mise en service et formation", en: "Commissioning and training" },
    text: {
      fr: "À la livraison, la nacelle est mise en route avec vos opérateurs : commandes, contrôles, sécurité et manœuvres de secours.",
      en: "On delivery, the platform is started up with your operators: controls, checks, safety and emergency lowering.",
    },
  },
  {
    title: { fr: "Maintenance préventive", en: "Preventive maintenance" },
    text: {
      fr: "Des entretiens réguliers, selon le plan du constructeur, pour une nacelle sûre et disponible quand vous en avez besoin.",
      en: "Regular servicing, following the manufacturer's plan, for a platform that is safe and ready when you need it.",
    },
  },
  {
    title: { fr: "Réparations", en: "Repairs" },
    text: {
      fr: "Diagnostic et intervention par des techniciens formés sur les nacelles C.O.M.E.T., partout au Maroc.",
      en: "Diagnosis and repair by technicians trained on C.O.M.E.T. platforms, across Morocco.",
    },
  },
  {
    title: { fr: "Pièces détachées d'origine", en: "Original spare parts" },
    text: {
      fr: "Des pièces C.O.M.E.T. d'origine, disponibles localement ou commandées directement chez le constructeur.",
      en: "Original C.O.M.E.T. parts, available locally or ordered straight from the manufacturer.",
    },
  },
];

const SERVICE_HELLO: Copy = {
  fr: "Bonjour COMET Maroc, j'ai besoin du service après-vente pour ma nacelle. Modèle : ",
  en: "Hello COMET Morocco, I need after-sales service for my platform. Model: ",
};

/** Service: what happens after the sale, and how to reach it. */
const Assistenza = () => {
  const { pick } = useLang();
  const title = pick({ fr: "Service", en: "Service" });

  return (
    <PageTemplate
      seo={{
        path: "/service",
        title: pick({
          fr: "Service après-vente, pièces et maintenance de nacelles | COMET Maroc",
          en: "After-sales service, parts and platform maintenance | COMET Morocco",
        }),
        description: pick({
          fr: "Mise en service, formation des opérateurs, maintenance préventive, réparations et pièces d'origine C.O.M.E.T. : le service de COMET Maroc pour votre nacelle.",
          en: "Commissioning, operator training, preventive maintenance, repairs and original C.O.M.E.T. parts: COMET Morocco's service for your platform.",
        }),
        keywords: "SAV nacelle Maroc, pièces détachées nacelle COMET, maintenance nacelle élévatrice, formation opérateur nacelle, réparation nacelle Casablanca",
      }}
      hero={{
        eyebrow: pick({ fr: "Service & SAV", en: "Service" }),
        title: pick({ fr: ["Votre nacelle,", "suivie de près."], en: ["Your platform,", "looked after."] }),
        text: pick({
          fr: "Formation, entretien, réparations, pièces d'origine : COMET Maroc vous accompagne pendant toute la vie de votre machine.",
          en: "Training, servicing, repairs, original parts: COMET Morocco stays with you for the whole life of your machine.",
        }),
        image: HERO_IMAGE,
        actions: (
          <>
            <a className="btn btn--light" href={whatsappHref(pick(SERVICE_HELLO))} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {pick({ fr: "Contacter le SAV", en: "Contact service" })}
            </a>
            <a className="btn btn--ghost" href={CONTACT.phoneHref}>
              <Phone aria-hidden="true" />
              {CONTACT.phone}
            </a>
          </>
        ),
      }}
      crumbs={[{ label: title }]}
    >
      <section className="section" aria-labelledby="service-title">
        <div className="wrap">
          <div className="pg-head">
            <div>
              <span className="eyebrow">{pick({ fr: "Après la vente", en: "After the sale" })}</span>
              <Lines id="service-title" className="t-h2" lines={pick({ fr: ["Quatre services,", "un seul contact."], en: ["Four services,", "one contact."] })} />
            </div>
            <p className="t-lead rise">
              {pick({
                fr: "Le même interlocuteur du devis à l'entretien : il connaît votre machine et votre chantier.",
                en: "The same person from quote to servicing: they know your machine and your work.",
              })}
            </p>
          </div>

          <ol className="pg-list">
            {SERVICES.map((service, i) => (
              <li key={service.title.fr} className="rise" style={{ "--i": i } as CSSProperties}>
                <span className="pg-list-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{pick(service.title)}</h3>
                <p>{pick(service.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-paper section" aria-labelledby="service-maker">
        <div className="wrap">
          <div className="pg-split">
            <div className="pg-split-media rise">
              <img
                src={WORKSHOP_IMAGE}
                alt={pick({ fr: "L'usine C.O.M.E.T. en Italie, vue du ciel", en: "The C.O.M.E.T. factory in Italy, from above" })}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="pg-split-body">
              <span className="eyebrow">{pick({ fr: "Avec le constructeur", en: "With the manufacturer" })}</span>
              <Lines id="service-maker" className="t-h2" lines={pick({ fr: ["Le savoir-faire", "de l'usine."], en: ["The factory's", "know-how."] })} />
              <p className="t-body rise">
                {pick({
                  fr: "Chez C.O.M.E.T., la maintenance, sous garantie comme après, est suivie par la maison mère. COMET Maroc s'appuie sur elle pour les pièces, la documentation technique et les cas les plus pointus.",
                  en: "At C.O.M.E.T., maintenance, under warranty and after, is followed by the parent company. COMET Morocco relies on it for parts, technical documents and the trickiest cases.",
                })}
              </p>
              <Link to="/contact?projet=sav#devis" className="link-arrow rise">
                {pick({ fr: "Demander une intervention", en: "Request a repair" })}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export default Assistenza;
