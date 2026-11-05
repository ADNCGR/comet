import { useEffect, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { Lines } from "@/components/Lines";
import { WhatsAppIcon } from "@/components/icons";
import { WHATSAPP_HELLO, whatsappHref } from "@/config/contact";
import { textFor } from "@/data/homepageContent";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { findTargetPage, normalizeSlug, type TargetPage } from "@/data/targetPages";
import { useLang } from "@/lib/locale";
import NotFound from "./NotFound";

const isRecord = (value: Json | undefined): value is Record<string, Json | undefined> =>
  Boolean(value && typeof value === "object" && !Array.isArray(value));

const isTargetKind = (value: unknown): value is TargetPage["kind"] =>
  value === "category" || value === "product" || value === "news" || value === "page";

const toTargetPage = (slug: string, content: Json | undefined): TargetPage | null => {
  if (!isRecord(content) || !isRecord(content.title) || !isRecord(content.eyebrow) || !isRecord(content.description)) return null;
  return {
    slug,
    title: content.title as TargetPage["title"],
    eyebrow: content.eyebrow as TargetPage["eyebrow"],
    description: content.description as TargetPage["description"],
    image: typeof content.image === "string" ? content.image : "",
    kind: isTargetKind(content.kind) ? content.kind : "page",
    date: typeof content.date === "string" ? content.date : undefined,
    body: Array.isArray(content.body) ? (content.body as TargetPage["body"]) : undefined,
    cards: Array.isArray(content.cards) ? (content.cards as TargetPage["cards"]) : undefined,
    specs: Array.isArray(content.specs) ? (content.specs as TargetPage["specs"]) : undefined,
  };
};

/** Two lines for the hero title: the name split near its middle word. */
const splitTitle = (title: string) => {
  const words = title.split(" ");
  if (words.length < 3) return [title];
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
};

/**
 * Ranges, models, news and legal pages: from the CMS when it has them, from
 * the site's own data otherwise, and a 404 when neither knows the address.
 */
const DynamicTargetPage = () => {
  const location = useLocation();
  const { lang, pick } = useLang();
  const slug = normalizeSlug(location.pathname);
  const staticPage = findTargetPage(location.pathname);
  const [databasePage, setDatabasePage] = useState<TargetPage | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    setDatabasePage(null);
    // no CMS configured (no .env): only the built-in pages exist
    if (!supabase) {
      setLoaded(true);
      return;
    }
    setLoaded(false);
    supabase
      .from("site_pages")
      .select("content")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
      .then(
        ({ data }) => {
          if (!mounted) return;
          setDatabasePage(toTargetPage(slug, data?.content));
          setLoaded(true);
        },
        () => mounted && setLoaded(true),
      );
    return () => {
      mounted = false;
    };
  }, [slug]);

  const page: TargetPage | null = databasePage
    ? {
        ...(staticPage ?? databasePage),
        ...databasePage,
        image: databasePage.image || staticPage?.image || "",
        cards: databasePage.cards ?? staticPage?.cards,
        specs: databasePage.specs ?? staticPage?.specs,
        body: databasePage.body ?? staticPage?.body,
      }
    : staticPage ?? null;

  if (!page) return loaded ? <NotFound /> : <div className="min-h-screen bg-[var(--ink)]" />;

  const title = textFor(page.title, lang);
  const description = textFor(page.description, lang);
  const isProduct = page.kind === "product";
  const quote = `/contact?${new URLSearchParams({ modele: title })}#devis`;

  return (
    <PageTemplate
      seo={{
        path: location.pathname,
        title: `${title} | COMET Maroc`,
        description,
        keywords: `${title}, nacelle élévatrice Maroc, COMET Maroc`,
      }}
      hero={{
        eyebrow: page.date ? `${textFor(page.eyebrow, lang)} · ${page.date}` : textFor(page.eyebrow, lang),
        title: splitTitle(title),
        text: description,
        image: page.image,
        size: "sm",
        actions:
          page.kind === "category" || isProduct ? (
            <>
              <Link to={quote} className="btn btn--light">
                {pick({ fr: "Demander un devis", en: "Request a quote" })}
                <ArrowRight aria-hidden="true" />
              </Link>
              <a className="btn btn--ghost" href={whatsappHref(`${pick(WHATSAPP_HELLO)} ${title}`)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                WhatsApp
              </a>
            </>
          ) : undefined,
      }}
      crumbs={
        page.kind === "news"
          ? [{ label: pick({ fr: "Actualités", en: "News" }), to: "/actualites" }, { label: title }]
          : page.kind === "page"
            ? [{ label: title }]
            : [{ label: pick({ fr: "Gammes", en: "Ranges" }), to: "/produits" }, { label: title }]
      }
    >
      {page.cards?.length ? (
        <section className="on-paper section" aria-labelledby="models-title">
          <div className="wrap">
            <div className="pg-head">
              <div>
                <span className="eyebrow">{pick({ fr: `${page.cards.length} modèles`, en: `${page.cards.length} models` })}</span>
                <Lines id="models-title" className="t-h2" lines={pick({ fr: ["Les modèles."], en: ["The models."] })} />
              </div>
            </div>
            <div className="pg-machines">
              {page.cards.map((card, i) => (
                <article key={card.slug} className="pg-machine rise" style={{ "--i": i % 3 } as CSSProperties}>
                  <div className="pg-machine-media">
                    <img src={card.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="pg-machine-body">
                    <span className="pg-machine-height">{card.range}</span>
                    <h3>
                      <Link to={`/${card.slug}`}>{textFor(card.title, lang)}</Link>
                    </h3>
                    <p>{card.excerpt ? textFor(card.excerpt, lang) : ""}</p>
                    <div className="pg-machine-foot">
                      <span className="link-arrow">
                        {pick({ fr: "Découvrir", en: "Discover" })}
                        <ArrowRight aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.specs?.length || page.body?.length ? (
        <section className="section">
          <div className="wrap pg-split">
            {page.image && (
              <div className="pg-split-media rise">
                <img src={page.image} alt={title} loading="lazy" decoding="async" />
              </div>
            )}
            <div className="pg-split-body">
              {page.specs?.length ? (
                <>
                  <span className="eyebrow">{pick({ fr: "En bref", en: "At a glance" })}</span>
                  <dl className="pg-specs rise">
                    {page.specs.map((spec) => (
                      <div key={textFor(spec.label, lang)}>
                        <dt>{textFor(spec.label, lang)}</dt>
                        <dd>{textFor(spec.value, lang)}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              ) : null}
              {page.body?.map((paragraph) => (
                <p key={textFor(paragraph, lang)} className="t-body rise">
                  {textFor(paragraph, lang)}
                </p>
              ))}
              {(page.kind === "category" || isProduct) && (
                <Link to={quote} className="link-arrow rise">
                  {pick({ fr: "Recevoir la fiche technique officielle", en: "Get the official technical sheet" })}
                  <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </PageTemplate>
  );
};

export default DynamicTargetPage;
