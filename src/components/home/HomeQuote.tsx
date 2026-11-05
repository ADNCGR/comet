import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, WHATSAPP_HELLO, whatsappHref } from "@/config/contact";
import { HOME } from "@/data/home";
import { useLang } from "@/lib/locale";
import { Lines } from "@/components/Lines";
import { QuoteForm } from "@/components/QuoteForm";
import { WhatsAppIcon } from "@/components/icons";

/** The page ends on the request itself, with the direct lines beside it. */
export const HomeQuote = () => {
  const { pick } = useLang();
  const copy = HOME.quote;

  return (
    <section className="hq on-dark section" aria-labelledby="quote-title">
      <div className="wrap hq-grid">
        <div className="hq-intro">
          <span className="eyebrow">{pick(copy.eyebrow)}</span>
          <Lines id="quote-title" className="t-h1" lines={pick(copy.title)} />
          <p className="t-lead rise">{pick(copy.text)}</p>
          <ul className="hq-lines rise">
            <li>
              <a href={CONTACT.phoneHref}>
                <Phone aria-hidden="true" />
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={whatsappHref(pick(WHATSAPP_HELLO))} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {pick({ fr: "WhatsApp, réponse rapide", en: "WhatsApp, quick answer" })}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>
                <Mail aria-hidden="true" />
                {CONTACT.email}
              </a>
            </li>
            <li>
              <span>
                <MapPin aria-hidden="true" />
                {CONTACT.city}, {pick(CONTACT.country)}
              </span>
            </li>
          </ul>
        </div>
        <div className="hq-card rise">
          <QuoteForm id="devis" source="accueil" />
        </div>
      </div>
    </section>
  );
};
