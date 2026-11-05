import { useEffect } from "react";
import { SITE_ORIGIN, SITE_NAME, DEFAULT_OG_IMAGE, DEFAULT_LOCALE } from "./site";

export type SeoProps = {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const esc = key.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  let el = document.querySelector(`meta[${attr}="${esc}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertHreflang(hreflang: string, href: string) {
  let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "alternate";
    el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.href = href;
}

/** URL canonique absolue, trailing slash uniquement pour la racine */
export function canonicalUrl(path: string): string {
  if (!path || path === "/") return `${SITE_ORIGIN}/`;
  const clean = `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_ORIGIN}${clean}`;
}

function buildRouteJsonLd(path: string, pageTitle: string, pageDescription: string) {
  const url = canonicalUrl(path);
  const baseRoot = `${SITE_ORIGIN}/`;
  const items: { name: string; item: string }[] = [{ name: "Accueil", item: baseRoot }];
  if (path !== "/" && path !== "") {
    const segments: Record<string, string> = {
      "/produits": "Catalogue nacelles",
      "/secteurs": "Secteurs d’activité",
      "/a-propos": "À propos",
      "/contact": "Contact",
    };
    const normalized = path.startsWith("/") ? path : `/${path}`;
    items.push({
      name: segments[normalized] ?? pageTitle,
      item: url,
    });
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: pageTitle,
        description: pageDescription.slice(0, 300),
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseRoot}#website`,
          url: baseRoot,
          name: SITE_NAME,
        },
        inLanguage: "fr-MA",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.item,
        })),
      },
    ],
  };
}

export function Seo({ title, description, keywords, path, noindex, ogImage }: SeoProps) {
  const canonical = canonicalUrl(path === "" ? "/" : path);
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  const fullTitle = title;

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta("name", "description", description.slice(0, 320));
    if (keywords) {
      upsertMeta("name", "keywords", keywords);
    }

    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1");

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", DEFAULT_LOCALE);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description.slice(0, 300));
    upsertMeta("property", "og:image", image);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:url", canonical);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description.slice(0, 200));
    upsertMeta("name", "twitter:image", image);

    upsertMeta("name", "geo.region", "MA");
    upsertMeta("name", "geo.placename", "Casablanca");

    if (noindex) {
      document.querySelector('link[rel="canonical"]')?.remove();
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
    } else {
      upsertCanonical(canonical);
      upsertHreflang("fr", canonical);
      upsertHreflang("fr-MA", canonical);
      upsertHreflang("x-default", canonical);
    }

    const graph = buildRouteJsonLd(path === "" ? "/" : path, title, description);
    const scriptId = "seo-route-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [title, description, keywords, path, noindex, ogImage, canonical, fullTitle, image]);

  return null;
}
