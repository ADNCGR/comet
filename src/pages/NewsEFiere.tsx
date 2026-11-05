import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { findTargetPage } from "@/data/targetPages";
import { useLang, type Copy } from "@/lib/locale";

const IMG = "https://www.officinecomet.com/wp-content/uploads";

const NEWS: { image: string; fair: boolean; title: Copy; date: string; slug: string }[] = [
  { image: `${IMG}/2025/11/1-570x230.jpg`, fair: false, title: { fr: "C.O.M.E.T. engage sa certification pour l'égalité femmes-hommes (UNI/PdR 125:2022)", en: "C.O.M.E.T. starts its gender equality certification (UNI/PdR 125:2022)" }, date: "25/11/2025", slug: "/co-me-t-officine-s-p-a-avvia-il-percorso-per-ottenere-la-certificazione-per-la-parita-di-genere-uni-pdr-1252022" },
  { image: `${IMG}/2025/07/Gis-2025-articolo-570x230.jpg`, fair: true, title: { fr: "C.O.M.E.T. au salon GIS 2025", en: "C.O.M.E.T. at GIS 2025" }, date: "10/07/2025", slug: "/co-me-t-officine-presente-al-gis-2025" },
  { image: `${IMG}/2025/04/11-570x230.jpg`, fair: false, title: { fr: "Les 6 dernières nacelles livrées à ENEL", en: "The last 6 platforms delivered to ENEL" }, date: "23/04/2025", slug: "/consegna-piattaforme-enel-comet" },
  { image: `${IMG}/2025/02/bauma-2025-news-570x230.jpg`, fair: true, title: { fr: "C.O.M.E.T. au BAUMA 2025", en: "C.O.M.E.T. at BAUMA 2025" }, date: "07/04/2025", slug: "/co-me-t-officine-presente-al-bauma-2025" },
  { image: `${IMG}/2024/04/Immagine-WhatsApp-2025-03-05-ore-12.11.53_2c833244-570x230.jpg`, fair: false, title: { fr: "Le service après-vente du constructeur renforcé", en: "The manufacturer's after-sales team grows" }, date: "05/03/2025", slug: "/potenziamento-dellufficio-after-sales" },
  { image: `${IMG}/2024/10/bauma-india-news-570x230.jpg`, fair: true, title: { fr: "C.O.M.E.T. au BAUMA INDIA 2024", en: "C.O.M.E.T. at BAUMA INDIA 2024" }, date: "11/12/2024", slug: "/co-me-t-officine-presente-al-bauma-india-2024" },
  { image: `${IMG}/2024/04/Fiera-2-570x230.jpg`, fair: true, title: { fr: "C.O.M.E.T. aux VERTIKAL DAYS 2024", en: "C.O.M.E.T. at VERTIKAL DAYS 2024" }, date: "11/09/2024", slug: "/co-me-t-officine-presente-al-vertikal-days-2024" },
  { image: `${IMG}/2024/04/News-isolate-570x230.jpg`, fair: false, title: { fr: "Nacelles isolées : l'excellence italienne", en: "Insulated platforms: Italian excellence" }, date: "22/04/2024", slug: "/co-me-t-eccellenza-italiana-nelle-piattaforme-aeree-isolate" },
  { image: `${IMG}/2024/04/News-euroflag-570x230.jpg`, fair: false, title: { fr: "Nouvelle gamme EUROFLAG", en: "New EUROFLAG range" }, date: "22/04/2024", slug: "/nuova-linea-euroflag-di-piattaforme-aeree" },
];

/** News and fairs: on this site when there is a page, on the manufacturer's otherwise. */
const NewsEFiere = () => {
  const { pick } = useLang();
  const title = pick({ fr: "Actualités", en: "News" });

  return (
    <PageTemplate
      seo={{
        path: "/actualites",
        title: pick({ fr: "Actualités et salons C.O.M.E.T. | COMET Maroc", en: "C.O.M.E.T. news and fairs | COMET Morocco" }),
        description: pick({
          fr: "Les nouvelles du constructeur C.O.M.E.T. : salons (BAUMA, GIS, Vertikal Days), nouvelles gammes, livraisons et certifications.",
          en: "News from C.O.M.E.T.: fairs (BAUMA, GIS, Vertikal Days), new ranges, deliveries and certifications.",
        }),
      }}
      hero={{
        eyebrow: pick({ fr: "Actualités & salons", en: "News & fairs" }),
        title: pick({ fr: ["Les dernières", "nouvelles."], en: ["The latest", "news."] }),
        text: pick({ fr: "Salons, nouvelles gammes, livraisons : ce qui se passe chez C.O.M.E.T.", en: "Fairs, new ranges, deliveries: what's happening at C.O.M.E.T." }),
        image: `${IMG}/2024/04/striscia-fiere.jpg`,
        size: "sm",
      }}
      crumbs={[{ label: title }]}
    >
      <section className="on-paper section">
        <div className="wrap pg-machines">
          {NEWS.map((item, i) => {
            const local = Boolean(findTargetPage(item.slug));
            const label = pick(item.title);
            return (
              <article key={item.slug} className="pg-machine rise" style={{ "--i": i % 3 } as CSSProperties}>
                <div className="pg-machine-media">
                  <img src={item.image} alt="" loading="lazy" decoding="async" />
                  <span className="pg-machine-tag">{item.fair ? pick({ fr: "Salon", en: "Fair" }) : pick({ fr: "Actualité", en: "News" })}</span>
                </div>
                <div className="pg-machine-body">
                  <span className="pg-machine-height">{item.date}</span>
                  <h3>
                    {local ? (
                      <Link to={item.slug}>{label}</Link>
                    ) : (
                      <a href={`https://www.officinecomet.com${item.slug}/`} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    )}
                  </h3>
                  <p />
                  <div className="pg-machine-foot">
                    <span className="link-arrow">
                      {local ? pick({ fr: "Lire", en: "Read" }) : pick({ fr: "Lire chez le constructeur", en: "Read on the maker's site" })}
                      {local ? <ArrowRight aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </PageTemplate>
  );
};

export default NewsEFiere;
