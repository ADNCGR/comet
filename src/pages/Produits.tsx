import type { CSSProperties } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { Lines } from "@/components/Lines";
import { WhatsAppIcon } from "@/components/icons";
import { WHATSAPP_HELLO, whatsappHref } from "@/config/contact";
import { FAMILIES, RANGES, quoteHref, type Family } from "@/data/ranges";
import { useLang } from "@/lib/locale";

const HERO_IMAGE = "https://www.officinecomet.com/wp-content/uploads/2023/06/sfondo-pag-piattaforme2.jpg";

/**
 * The catalogue: every C.O.M.E.T. range, filtered by what carries it
 * (?famille=van), each with its page and a quote request already filled in.
 */
export const Produits = () => {
  const { pick } = useLang();
  const [params, setParams] = useSearchParams();
  const asked = params.get("famille");
  const family = FAMILIES.some((f) => f.id === asked) ? (asked as Family) : null;
  const shown = family ? RANGES.filter((range) => range.family === family) : RANGES;

  const choose = (next: Family | null) => {
    const copy = new URLSearchParams(params);
    if (next) copy.set("famille", next);
    else copy.delete("famille");
    setParams(copy, { replace: true, preventScrollReset: true });
  };

  const count = (id: Family) => RANGES.filter((range) => range.family === id).length;
  const title = pick({ fr: "Gammes", en: "Ranges" });

  return (
    <PageTemplate
      seo={{
        path: "/produits",
        title: pick({
          fr: "Gammes de nacelles élévatrices COMET · Camion, van, pick-up | COMET Maroc",
          en: "COMET aerial platform ranges · Truck, van, pick-up | COMET Morocco",
        }),
        description: pick({
          fr: "Toutes les gammes de nacelles C.O.M.E.T. disponibles au Maroc : télescopiques et articulées sur camion, sur van, sur pick-up 4×4, chenillées, tractables, isolées. De 12 à 45 m.",
          en: "Every C.O.M.E.T. aerial platform range available in Morocco: telescopic and articulated on trucks, on vans, on 4×4 pick-ups, tracked, towable, insulated. From 12 to 45 m.",
        }),
        keywords: "gamme nacelle COMET, nacelle sur camion Maroc, nacelle sur van, nacelle pick-up, nacelle chenillée, nacelle isolée, Eurosky, Eurosfilo",
      }}
      hero={{
        eyebrow: pick({ fr: "Le catalogue C.O.M.E.T.", en: "The C.O.M.E.T. range" }),
        title: pick({ fr: ["Nos gammes", "de nacelles."], en: ["Our aerial", "platforms."] }),
        text: pick({
          fr: "Plus de 80 modèles, du fourgon de 12 m au camion de 45 m. Choisissez le porteur, nous vous aidons à configurer le reste.",
          en: "More than 80 models, from the 12 m van to the 45 m truck. Choose the carrier, we help you set up the rest.",
        }),
        image: HERO_IMAGE,
      }}
      crumbs={[{ label: title }]}
      cta={false}
    >
      <section className="on-paper section" aria-labelledby="ranges-title">
        <div className="wrap">
          <div className="pg-head">
            <div>
              <span className="eyebrow">{pick({ fr: `${RANGES.length} gammes`, en: `${RANGES.length} ranges` })}</span>
              <Lines id="ranges-title" className="t-h2" lines={pick({ fr: ["Choisissez", "votre porteur."], en: ["Choose", "your carrier."] })} />
            </div>
            <p className="t-lead rise">
              {pick({
                fr: "Chaque gamme se monte sur plusieurs châssis. Le bon choix dépend de la hauteur, de l'accès et de votre parc.",
                en: "Each range fits several chassis. The right choice depends on height, access and your fleet.",
              })}
            </p>
          </div>

          <div className="pg-chips pg-chips--scroll rise" role="group" aria-label={pick({ fr: "Filtrer par porteur", en: "Filter by carrier" })}>
            <button type="button" className="pg-chip" aria-pressed={family === null} onClick={() => choose(null)}>
              {pick({ fr: "Toutes", en: "All" })} <small>{RANGES.length}</small>
            </button>
            {FAMILIES.map((f) => (
              <button key={f.id} type="button" className="pg-chip" aria-pressed={family === f.id} onClick={() => choose(f.id)}>
                {pick(f.label)} <small>{count(f.id)}</small>
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {pick({ fr: `${shown.length} gammes affichées`, en: `${shown.length} ranges shown` })}
          </p>

          <div className="pg-machines" style={{ marginTop: 28 }}>
            {shown.map((range, i) => {
              const familyLabel = FAMILIES.find((f) => f.id === range.family)?.label;
              return (
                <article key={range.id} className="pg-machine rise" style={{ "--i": i % 3 } as CSSProperties}>
                  <div className="pg-machine-media">
                    <img src={range.image} alt="" loading="lazy" decoding="async" />
                    {familyLabel && <span className="pg-machine-tag">{pick(familyLabel)}</span>}
                  </div>
                  <div className="pg-machine-body">
                    <span className="pg-machine-height">{pick(range.height)}</span>
                    <h3>
                      {range.to ? <Link to={range.to}>{range.name}</Link> : <Link to={quoteHref(range)}>{range.name}</Link>}
                    </h3>
                    <p>{pick(range.text)}</p>
                    <div className="pg-machine-foot">
                      <span className="link-arrow">
                        {range.to ? pick({ fr: "Voir la gamme", en: "See the range" }) : pick({ fr: "Recevoir la documentation", en: "Get the documents" })}
                        <ArrowRight aria-hidden="true" />
                      </span>
                      {range.to && (
                        <Link className="pg-machine-quote" to={quoteHref(range)}>
                          {pick({ fr: "Devis", en: "Quote" })}
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="pg-band rise" style={{ marginTop: "clamp(56px, 7vw, 96px)" }}>
            <div>
              <h2>{pick({ fr: "Vous hésitez entre deux gammes ?", en: "Torn between two ranges?" })}</h2>
              <p>
                {pick({
                  fr: "Décrivez votre chantier : hauteur, accès, véhicule. Nous vous orientons vers la bonne nacelle.",
                  en: "Tell us about the job: height, access, vehicle. We point you to the right platform.",
                })}
              </p>
            </div>
            <div className="pg-band-actions">
              <Link to="/contact#devis" className="btn btn--light">
                {pick({ fr: "Demander conseil", en: "Ask for advice" })}
                <ArrowRight aria-hidden="true" />
              </Link>
              <a className="btn btn--ghost" href={whatsappHref(pick(WHATSAPP_HELLO))} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export default Produits;
