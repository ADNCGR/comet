import { Mail, MapPin, Phone } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { QuoteForm } from "@/components/QuoteForm";
import { Faq } from "@/components/Faq";
import { Lines } from "@/components/Lines";
import { WhatsAppIcon } from "@/components/icons";
import { CONTACT, WHATSAPP_HELLO, whatsappHref } from "@/config/contact";
import { HOME } from "@/data/home";
import { useLang } from "@/lib/locale";

const CONTACT_IMAGE = "https://www.officinecomet.com/wp-content/uploads/2024/02/contatti2.jpg";

/** Contact: the direct lines, the quote request beside them, then the usual questions. */
const Contact = () => {
  const { pick } = useLang();
  const title = pick({ fr: "Contact", en: "Contact" });

  return (
    <PageTemplate
      seo={{
        path: "/contact",
        title: pick({
          fr: "Contact et devis nacelle · COMET Maroc, Casablanca",
          en: "Contact and quotes · COMET Morocco, Casablanca",
        }),
        description: pick({
          fr: `Devis, démonstration, pièces et SAV : appelez le ${CONTACT.phone}, écrivez sur WhatsApp ou à ${CONTACT.email}. COMET Maroc, Casablanca.`,
          en: `Quotes, demos, parts and service: call ${CONTACT.phone}, write on WhatsApp or to ${CONTACT.email}. COMET Morocco, Casablanca.`,
        }),
        keywords: "contact COMET Maroc, devis nacelle Maroc, nacelle élévatrice Casablanca, démonstration nacelle, SAV nacelle",
      }}
      hero={{
        eyebrow: title,
        title: pick({ fr: ["Parlons de", "votre projet."], en: ["Let's talk about", "your project."] }),
        text: pick({
          fr: "Un devis, une démonstration, une pièce : un seul interlocuteur, à Casablanca.",
          en: "A quote, a demo, a spare part: one contact, in Casablanca.",
        }),
        image: CONTACT_IMAGE,
        size: "sm",
      }}
      crumbs={[{ label: title }]}
      cta={false}
    >
      <section className="on-paper section" aria-labelledby="contact-lines">
        <div className="wrap ct-grid">
          <div className="ct-intro">
            <span className="eyebrow">{pick({ fr: "Nous joindre", en: "Reach us" })}</span>
            <Lines id="contact-lines" className="t-h2" lines={pick({ fr: ["En direct,", "sans détour."], en: ["Directly,", "no detours."] })} />
            <p className="t-lead rise">
              {pick({
                fr: "Appelez, écrivez sur WhatsApp ou remplissez la demande : nous revenons vers vous avec une réponse claire.",
                en: "Call, message us on WhatsApp or fill in the request: we come back with a clear answer.",
              })}
            </p>

            <ul className="ct-list rise">
              <li>
                <a className="ct-row" href={CONTACT.phoneHref}>
                  <span className="ct-ico" aria-hidden="true">
                    <Phone />
                  </span>
                  <span className="ct-label">{pick({ fr: "Téléphone", en: "Phone" })}</span>
                  <span className="ct-value">{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a className="ct-row" href={whatsappHref(pick(WHATSAPP_HELLO))} target="_blank" rel="noopener noreferrer">
                  <span className="ct-ico ct-ico--wa" aria-hidden="true">
                    <WhatsAppIcon />
                  </span>
                  <span className="ct-label">WhatsApp</span>
                  <span className="ct-value">{pick({ fr: "Écrire un message", en: "Send a message" })}</span>
                </a>
              </li>
              <li>
                <a className="ct-row" href={`mailto:${CONTACT.email}`}>
                  <span className="ct-ico" aria-hidden="true">
                    <Mail />
                  </span>
                  <span className="ct-label">E-mail</span>
                  <span className="ct-value">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <div className="ct-row">
                  <span className="ct-ico" aria-hidden="true">
                    <MapPin />
                  </span>
                  <span className="ct-label">{pick({ fr: "Adresse", en: "Address" })}</span>
                  <span className="ct-value">
                    {CONTACT.city}, {pick(CONTACT.country)}
                  </span>
                </div>
              </li>
            </ul>

            <p className="ct-note rise">
              {pick({
                fr: "Pour une pièce ou une intervention, indiquez le modèle et, si possible, le numéro de série de votre nacelle.",
                en: "For a part or a repair, give the model and, if you can, the serial number of your platform.",
              })}
            </p>
          </div>

          <div className="ct-card rise">
            <QuoteForm id="devis" source="contact" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="contact-faq">
        <div className="wrap pg-aside">
          <header>
            <span className="eyebrow">{pick(HOME.faq.eyebrow)}</span>
            <Lines id="contact-faq" className="t-h2" lines={pick(HOME.faq.title)} />
          </header>
          <div className="rise">
            <Faq items={HOME.faq.items.map((item) => ({ q: pick(item.q), a: pick(item.a) }))} />
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export default Contact;
