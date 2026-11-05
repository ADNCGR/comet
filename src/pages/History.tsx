import { PageTemplate } from "@/components/PageTemplate";
import { CompanyLinks } from "@/components/CompanyLinks";
import { Lines } from "@/components/Lines";
import { useLang, type Copy } from "@/lib/locale";

const HERO_IMAGE = "https://www.officinecomet.com/wp-content/uploads/2023/11/banner-home-7.jpg";
const IMG = "https://www.officinecomet.com/wp-content/uploads";

const YEARS: { year: string; title: Copy; text: Copy; image: string; alt: Copy }[] = [
  {
    year: "1960",
    title: { fr: "Les débuts", en: "The beginning" },
    text: {
      fr: "Valter Aleotti, passionné de machines industrielles, fonde Co.me.t. Officine (Costruzione Meccanica Trasporti) avec une petite équipe d'ingénieurs, à Ozzano dell'Emilia, au cœur de la Motor Valley. Son but : des nacelles innovantes et sûres pour la construction et la maintenance.",
      en: "Valter Aleotti, passionate about industrial machinery, founds Co.me.t. Officine (Costruzione Meccanica Trasporti) with a small team of engineers in Ozzano dell'Emilia, in the heart of the Motor Valley. His aim: innovative, safe platforms for construction and maintenance.",
    },
    image: `${IMG}/2023/11/Azienda-1960_1-178x140.jpg`,
    alt: { fr: "L'atelier Co.me.t. en 1960", en: "The Co.me.t. workshop in 1960" },
  },
  {
    year: "1961",
    title: { fr: "La première nacelle", en: "The first platform" },
    text: {
      fr: "Première gamme de nacelles sur camion, baptisée « Skyworker » : de 14 à 18 m, compactes, maniables et équipées des sécurités les plus récentes. Le succès est immédiat auprès des compagnies d'électricité.",
      en: "The first range of truck-mounted platforms, called “Skyworker”: 14 to 18 m, compact, easy to handle and fitted with the latest safety systems. An instant success with electricity companies.",
    },
    image: `${IMG}/2023/11/Prima-Skyworker-Prodotta-1960-178x140.jpg`,
    alt: { fr: "La première Skyworker", en: "The first Skyworker" },
  },
  {
    year: "1974",
    title: { fr: "Croissance et innovation", en: "Growth and innovation" },
    text: {
      fr: "La demande grandit, l'entreprise recrute des ingénieurs et investit dans la technologie. À la fin des années 1970 naît la gamme télescopique « Eurosfilo », plus haute et plus puissante.",
      en: "Demand grows, the company hires engineers and invests in technology. At the end of the 1970s the telescopic “Eurosfilo” range is born, higher and stronger.",
    },
    image: `${IMG}/2023/11/La-prima-Eurosfilo-178x140.jpg`,
    alt: { fr: "La première Eurosfilo", en: "The first Eurosfilo" },
  },
  {
    year: "1982",
    title: { fr: "Le concept réinventé", en: "The concept reinvented" },
    text: {
      fr: "Les modèles articulés « Eurosky » renouvellent la nacelle sur camion. C.O.M.E.T. devient aussi le premier constructeur italien spécialisé dans les nacelles isolées, conçues pour protéger des contacts électriques.",
      en: "The articulated “Eurosky” models renew the truck-mounted platform. C.O.M.E.T. also becomes the first Italian manufacturer to specialise in insulated platforms, built to protect against electrical contact.",
    },
    image: `${IMG}/2023/11/eurosky-13A017-178x140.jpg`,
    alt: { fr: "Une Eurosky des années 1980", en: "A 1980s Eurosky" },
  },
  {
    year: "1984",
    title: { fr: "Vers le monde", en: "Going global" },
    text: {
      fr: "Une présence internationale se construit, avec un réseau d'une quarantaine de distributeurs pour servir les clients au plus près de leurs marchés.",
      en: "An international presence takes shape, with a network of some forty distributors serving customers close to their markets.",
    },
    image: `${IMG}/2024/03/MYYR9200-178x140.jpg`,
    alt: { fr: "Une nacelle C.O.M.E.T. en intervention", en: "A C.O.M.E.T. platform at work" },
  },
  {
    year: "2023",
    title: { fr: "Aujourd'hui", en: "Today" },
    text: {
      fr: "C.O.M.E.T. continue d'innover : nacelles connectées, nouveaux modèles éco-responsables, sécurité et durabilité au cœur de chaque projet. Au Maroc, COMET Maroc porte ce savoir-faire sur les chantiers.",
      en: "C.O.M.E.T. keeps innovating: connected platforms, new eco-friendly models, safety and sustainability at the heart of every design. In Morocco, COMET Morocco brings this know-how to the job site.",
    },
    image: `${IMG}/2023/11/anno-2023-178x140.jpg`,
    alt: { fr: "Une nacelle C.O.M.E.T. récente", en: "A recent C.O.M.E.T. platform" },
  },
];

/** History: the manufacturer's sixty years, one milestone per row. */
const History = () => {
  const { pick } = useLang();
  const title = pick({ fr: "Histoire", en: "History" });

  return (
    <PageTemplate
      seo={{
        path: "/histoire",
        title: pick({ fr: "Histoire de C.O.M.E.T., depuis 1960 | COMET Maroc", en: "The C.O.M.E.T. story, since 1960 | COMET Morocco" }),
        description: pick({
          fr: "De la première Skyworker en 1961 aux gammes Eurosfilo et Eurosky : plus de soixante ans d'histoire du constructeur italien de nacelles C.O.M.E.T.",
          en: "From the first Skyworker in 1961 to the Eurosfilo and Eurosky ranges: more than sixty years of the Italian platform maker C.O.M.E.T.",
        }),
      }}
      hero={{
        eyebrow: pick({ fr: "Entreprise", en: "Company" }),
        title: pick({ fr: ["Depuis 1960,", "en hauteur."], en: ["Working at height", "since 1960."] }),
        text: pick({
          fr: "Plus de soixante ans d'innovations, de la première Skyworker aux nacelles connectées d'aujourd'hui.",
          en: "More than sixty years of innovation, from the first Skyworker to today's connected platforms.",
        }),
        image: HERO_IMAGE,
      }}
      crumbs={[{ label: pick({ fr: "À propos", en: "About" }), to: "/a-propos" }, { label: title }]}
    >
      <section className="section" aria-labelledby="history-title">
        <div className="wrap">
          <div className="pg-head">
            <div>
              <span className="eyebrow">{pick({ fr: "Des années 60 à aujourd'hui", en: "From the 60s to today" })}</span>
              <Lines id="history-title" className="t-h2" lines={pick({ fr: ["Six dates,", "une seule idée."], en: ["Six dates,", "one idea."] })} />
            </div>
            <p className="t-lead rise">
              {pick({
                fr: "Des nacelles sûres, fiables et utiles à ceux qui travaillent en hauteur.",
                en: "Platforms that are safe, reliable and useful to people who work at height.",
              })}
            </p>
          </div>

          <ol className="pg-years">
            {YEARS.map((entry) => (
              <li key={entry.year} className="pg-year">
                <span className="pg-year-date rise">{entry.year}</span>
                <div className="pg-year-body rise">
                  <div>
                    <h3 className="t-h3">{pick(entry.title)}</h3>
                    <p className="t-body">{pick(entry.text)}</p>
                  </div>
                  <img src={entry.image} alt={pick(entry.alt)} width={178} height={140} loading="lazy" decoding="async" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CompanyLinks current="/histoire" />
    </PageTemplate>
  );
};

export default History;
