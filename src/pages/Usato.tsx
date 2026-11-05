import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { Lines } from "@/components/Lines";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { useLang, type Copy } from "@/lib/locale";

type StockItem = {
  title: string;
  description: Copy;
  image: string;
  href: string;
  status: "in_stock" | "pre_owned";
};

const IMG = "https://www.officinecomet.com/wp-content/uploads/2025/09";

const fallbackInStock: StockItem[] = [
  {
    title: "New Eurosky 18-2-7.5 HQ",
    description: { fr: "Nacelle disponible, sur Iveco Daily 35S14H P3450.", en: "Platform in stock, on an Iveco Daily 35S14H P3450." },
    image: `${IMG}/Eurosky-18-Iveco-Daily-1-1-scaled.jpg`,
    href: "/aerial-platform-in-stock-new-eurosky-18-2-7-5-hq",
    status: "in_stock",
  },
  {
    title: "New Eurosfilo 17-2-9(11) HQ",
    description: { fr: "Kit (A) avec faux-châssis standard, disponible.", en: "Kit (A) with standard subframe, in stock." },
    image: `${IMG}/3S4D6359-scaled.jpg`,
    href: "/aerial-platform-in-stock-new-eurosfilo-17-2-9-11-hq",
    status: "in_stock",
  },
  {
    title: "New Eurosfilo 22-2-12(15) HQ",
    description: { fr: "Kit (B), disponible.", en: "Kit (B), in stock." },
    image: `${IMG}/KIT-B-ESEMPIO.jpg`,
    href: "/aerial-platform-in-stock-new-eurosfilo-22-2-12-15-hq",
    status: "in_stock",
  },
  {
    title: "New Eurosky 21-2-7(9) HQ",
    description: { fr: "Nacelle disponible, sur Iveco Daily 35S14H P3450.", en: "Platform in stock, on an Iveco Daily 35S14H P3450." },
    image: `${IMG}/Image1.jpg`,
    href: "/aerial-platform-in-stock-new-eurosky-21-2-7-9-hq",
    status: "in_stock",
  },
];

const fallbackPreOwned: StockItem[] = [
  {
    title: "New Eurosfilo 17/2/7(8.5) HQ",
    description: { fr: "Nacelle d'occasion, sur Iveco Daily 35.", en: "Pre-owned platform, on an Iveco Daily 35." },
    image: `${IMG}/Foto-Usato_7-1.jpg`,
    href: "/aerial-platform-pre-owned-new-eurosfilo-17-2-7-8-5-hq",
    status: "pre_owned",
  },
];

type SitePageRow = { slug: string; title: Json; content: Json };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === "object" && !Array.isArray(value));

const text = (value: unknown, lang: "fr" | "en") => {
  if (!isRecord(value)) return "";
  return (value[lang] as string) || (value.fr as string) || (value.en as string) || "";
};

const parsePage = (row: SitePageRow): StockItem | null => {
  if (!isRecord(row.content) || row.content.kind !== "stock") return null;
  return {
    title: text(row.content.title, "fr") || row.slug.replace(/-/g, " "),
    description: { fr: text(row.content.description, "fr"), en: text(row.content.description, "en") },
    image: typeof row.content.image === "string" ? row.content.image : "",
    href: `/${row.slug}`,
    status: row.content.status === "pre_owned" ? "pre_owned" : "in_stock",
  };
};

const merge = (fallback: StockItem[], live: StockItem[]) => {
  const map = new Map<string, StockItem>();
  fallback.forEach((item) => map.set(item.href, item));
  live.forEach((item) => map.set(item.href, { ...map.get(item.href), ...item }));
  return Array.from(map.values());
};

const StockGrid = ({ items }: { items: StockItem[] }) => {
  const { pick } = useLang();
  return (
    <div className="pg-machines">
      {items.map((item, i) => (
        <article key={item.href} className="pg-machine rise" style={{ "--i": i % 3 } as CSSProperties}>
          <div className="pg-machine-media">
            {item.image && <img src={item.image} alt="" loading="lazy" decoding="async" />}
            <span className="pg-machine-tag">
              {item.status === "pre_owned" ? pick({ fr: "Occasion", en: "Pre-owned" }) : pick({ fr: "En stock", en: "In stock" })}
            </span>
          </div>
          <div className="pg-machine-body">
            <span className="pg-machine-height">C.O.M.E.T.</span>
            <h3>
              <Link to={item.href}>{item.title}</Link>
            </h3>
            <p>{pick(item.description)}</p>
            <div className="pg-machine-foot">
              <span className="link-arrow">
                {pick({ fr: "Voir la fiche", en: "See details" })}
                <ArrowRight aria-hidden="true" />
              </span>
              <Link className="pg-machine-quote" to={`/contact?${new URLSearchParams({ modele: item.title, projet: "stock" })}#devis`}>
                {pick({ fr: "Devis", en: "Quote" })}
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

/** Stock and pre-owned: machines ready sooner, from the CMS when it answers. */
const Usato = () => {
  const { pick } = useLang();
  const [inStock, setInStock] = useState(fallbackInStock);
  const [preOwned, setPreOwned] = useState(fallbackPreOwned);

  useEffect(() => {
    // no CMS configured (no .env): keep the built-in list
    if (!supabase) return;
    let mounted = true;
    supabase
      .from("site_pages")
      .select("slug, title, content")
      .eq("content->>kind", "stock")
      .eq("is_published", true)
      .then(({ data }) => {
        if (!mounted || !data) return;
        const items = (data as SitePageRow[]).map(parsePage).filter(Boolean) as StockItem[];
        setInStock(merge(fallbackInStock, items.filter((item) => item.status === "in_stock")));
        setPreOwned(merge(fallbackPreOwned, items.filter((item) => item.status === "pre_owned")));
      });
    return () => {
      mounted = false;
    };
  }, []);

  const title = pick({ fr: "Stock & occasion", en: "Stock & pre-owned" });

  return (
    <PageTemplate
      seo={{
        path: "/occasion",
        title: pick({ fr: "Nacelles en stock et d'occasion · COMET Maroc", en: "In-stock and pre-owned platforms · COMET Morocco" }),
        description: pick({
          fr: "Nacelles C.O.M.E.T. disponibles rapidement et modèles d'occasion : Eurosky, Eurosfilo. Disponibilité et délai au Maroc confirmés sur demande.",
          en: "C.O.M.E.T. platforms available soon and pre-owned models: Eurosky, Eurosfilo. Availability and lead time in Morocco confirmed on request.",
        }),
        keywords: "nacelle occasion Maroc, nacelle en stock, nacelle disponible rapidement, Eurosky occasion",
      }}
      hero={{
        eyebrow: pick({ fr: "Disponibles rapidement", en: "Available soon" }),
        title: pick({ fr: ["Stock", "& occasion."], en: ["Stock", "& pre-owned."] }),
        text: pick({
          fr: "Des machines déjà fabriquées, pour gagner des semaines. Disponibilité et délai au Maroc confirmés à chaque demande.",
          en: "Machines already built, to save weeks. Availability and lead time in Morocco confirmed with each request.",
        }),
        image: `${IMG}/Eurosky-18-Iveco-Daily-1-1-scaled.jpg`,
        size: "sm",
      }}
      crumbs={[{ label: title }]}
    >
      <section className="on-paper section" aria-labelledby="stock-title">
        <div className="wrap">
          <div className="pg-head">
            <div>
              <span className="eyebrow">{pick({ fr: `${inStock.length} modèles`, en: `${inStock.length} models` })}</span>
              <Lines id="stock-title" className="t-h2" lines={pick({ fr: ["En stock."], en: ["In stock."] })} />
            </div>
          </div>
          <StockGrid items={inStock} />

          <div className="pg-head" style={{ marginTop: "clamp(64px, 8vw, 112px)" }}>
            <div>
              <span className="eyebrow">{pick({ fr: `${preOwned.length} modèle${preOwned.length > 1 ? "s" : ""}`, en: `${preOwned.length} model${preOwned.length > 1 ? "s" : ""}` })}</span>
              <Lines className="t-h2" lines={pick({ fr: ["D'occasion."], en: ["Pre-owned."] })} />
            </div>
          </div>
          <StockGrid items={preOwned} />
        </div>
      </section>
    </PageTemplate>
  );
};

export default Usato;
