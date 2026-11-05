import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/brand/comet-maroc-white.png";
import { CONTACT, WHATSAPP_HELLO, whatsappHref } from "@/config/contact";
import { targetCategories } from "@/data/targetPages";
import { textFor } from "@/data/homepageContent";
import { useLang } from "@/lib/locale";
import { Lines } from "@/components/Lines";
import { WhatsAppIcon } from "@/components/icons";
import "./Footer.css";

const FOOTER_RANGES = [
  "piattaforme-pick-up",
  "piattaforme-van",
  "piattaforme-aeree-telescopiche",
  "piattaforme-aeree-articolate",
  "piattaforme-aeree-cingolate",
  "piattaforme-aeree-isolate",
];

const COMPANY_LINKS = [
  { to: "/a-propos", label: { fr: "À propos", en: "About" } },
  { to: "/histoire", label: { fr: "Notre histoire", en: "Our history" } },
  { to: "/certifications", label: { fr: "Certifications", en: "Certifications" } },
  { to: "/service", label: { fr: "Service & SAV", en: "Service" } },
  { to: "/occasion", label: { fr: "Stock & occasion", en: "Stock & used" } },
  { to: "/actualites", label: { fr: "Actualités", en: "News" } },
];

/**
 * The end of every page: a last call to talk (unless the page already ends on
 * one), then the ranges, the company and the direct lines.
 */
export const Footer = ({ cta = true }: { cta?: boolean }) => {
  const { lang, pick } = useLang();
  const ranges = FOOTER_RANGES.map((slug) => targetCategories.find((c) => c.slug === slug)).filter(Boolean);

  return (
    <footer className="foot on-dark">
      {cta && (
        <section className="foot-cta wrap" aria-labelledby="foot-cta-title">
          <Lines
            id="foot-cta-title"
            className="t-h1"
            lines={pick({ fr: ["Un chantier en hauteur ?", "Parlons-en."], en: ["Working at height?", "Let's talk."] })}
          />
          <div className="foot-cta-actions rise">
            <Link to="/contact#devis" className="btn btn--light">
              {pick({ fr: "Demander un devis", en: "Request a quote" })}
              <ArrowRight aria-hidden="true" />
            </Link>
            <a href={whatsappHref(pick(WHATSAPP_HELLO))} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </section>
      )}

      <div className="foot-main wrap">
        <div className="foot-brand">
          <img src={logo} alt="COMET Maroc" width={139} height={64} loading="lazy" />
          <p>
            {pick({
              fr: "Représentation commerciale au Maroc des nacelles élévatrices C.O.M.E.T., conçues et fabriquées en Italie depuis 1960.",
              en: "Commercial representation in Morocco of C.O.M.E.T. aerial platforms, designed and built in Italy since 1960.",
            })}
          </p>
        </div>

        <nav className="foot-col" aria-labelledby="foot-ranges">
          <h3 id="foot-ranges">{pick({ fr: "Gammes", en: "Ranges" })}</h3>
          <ul>
            {ranges.map((range) => (
              <li key={range!.slug}>
                <Link to={`/${range!.slug}`}>{textFor(range!.title, lang)}</Link>
              </li>
            ))}
            <li>
              <Link to="/produits">{pick({ fr: "Tout le catalogue", en: "Full catalogue" })}</Link>
            </li>
          </ul>
        </nav>

        <nav className="foot-col" aria-labelledby="foot-company">
          <h3 id="foot-company">COMET Maroc</h3>
          <ul>
            {COMPANY_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{pick(item.label)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="foot-col">
          <h3>{pick({ fr: "Nous joindre", en: "Get in touch" })}</h3>
          <ul>
            <li>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </li>
            <li>
              <a href={whatsappHref(pick(WHATSAPP_HELLO))} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li className="foot-plain">
              {CONTACT.city}, {pick(CONTACT.country)}
            </li>
          </ul>
        </div>
      </div>

      <div className="foot-base wrap">
        <p>
          © {new Date().getFullYear()} {CONTACT.brand}.{" "}
          {pick({
            fr: "Nacelles conçues et fabriquées par CO.ME.T. Officine, Italie.",
            en: "Platforms designed and built by CO.ME.T. Officine, Italy.",
          })}
        </p>
        <nav aria-label={pick({ fr: "Informations légales", en: "Legal" })}>
          <Link to="/privacy-policy">{pick({ fr: "Confidentialité", en: "Privacy" })}</Link>
          <Link to="/code-of-ethics">{pick({ fr: "Code éthique", en: "Code of ethics" })}</Link>
          <Link to="/policy">{pick({ fr: "Politique d'entreprise", en: "Company policy" })}</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
