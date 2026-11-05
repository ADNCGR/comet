import type { Copy } from "@/lib/locale";

/** What carries the platform: the first thing a buyer decides. */
export type Family = "camion" | "van" | "pickup" | "chenillee" | "tractable" | "speciale";

export const FAMILIES: { id: Family; label: Copy }[] = [
  { id: "camion", label: { fr: "Sur camion", en: "On a truck" } },
  { id: "van", label: { fr: "Sur van", en: "On a van" } },
  { id: "pickup", label: { fr: "Sur pick-up", en: "On a pick-up" } },
  { id: "chenillee", label: { fr: "Chenillées", en: "Tracked" } },
  { id: "tractable", label: { fr: "Tractables", en: "Towable" } },
  { id: "speciale", label: { fr: "Spéciales", en: "Special" } },
];

export type Range = {
  id: string;
  name: string;
  family: Family;
  height: Copy;
  text: Copy;
  image: string;
  /** the range's own page, when the site has one */
  to?: string;
  /** the matching "Type de nacelle" in the quote form */
  quoteRange?: string;
};

const IMG = "https://www.officinecomet.com/wp-content/uploads";

/**
 * The C.O.M.E.T. catalogue, one card per range. Heights are working heights,
 * as published by the manufacturer; the exact figures per model come with the
 * official technical sheet.
 */
export const RANGES: Range[] = [
  {
    id: "eurosfilo",
    name: "New Eurosfilo HQ",
    family: "camion",
    height: { fr: "14 – 24 m", en: "14 – 24 m" },
    text: { fr: "Bras télescopique sur camion, pour monter vite et loin.", en: "Telescopic boom on a truck, to reach high and far, fast." },
    image: `${IMG}/2023/08/indice-piattaforme2-EUROSFILO.png`,
    to: "/new-eurosfilo",
    quoteRange: "camion-telescopique",
  },
  {
    id: "eurosky",
    name: "New Eurosky HQ",
    family: "camion",
    height: { fr: "14 – 22 m", en: "14 – 22 m" },
    text: { fr: "Bras articulé sur camion, avec ou sans jib, pour passer par-dessus les obstacles.", en: "Articulated boom on a truck, with or without jib, to work up and over obstacles." },
    image: `${IMG}/2023/06/Image40.jpg`,
    to: "/new-eurosky",
    quoteRange: "camion-articulee",
  },
  {
    id: "eurosky-hd",
    name: "New Eurosky HQ Heavy Duty",
    family: "camion",
    height: { fr: "26 – 33 m", en: "26 – 33 m" },
    text: { fr: "Les grandes hauteurs de la gamme articulée, sur porteur poids lourd.", en: "The high end of the articulated range, on a heavy truck." },
    image: `${IMG}/2024/03/eurosky-31.jpg`,
    to: "/new-eurosky-heavy-duty",
    quoteRange: "camion-articulee",
  },
  {
    id: "eurosky-t",
    name: "New Eurosky T",
    family: "camion",
    height: { fr: "45 m", en: "45 m" },
    text: { fr: "Le sommet du catalogue, pour les très grandes hauteurs.", en: "The top of the range, for the greatest heights." },
    image: `${IMG}/2023/07/indice-piattaforme-EUROSKY-T.png`,
    to: "/new-eurosky-t",
    quoteRange: "camion-articulee",
  },
  {
    id: "mini-trucks",
    name: "Mini Trucks",
    family: "camion",
    height: { fr: "14 – 16 m", en: "14 – 16 m" },
    text: { fr: "Sur porteur compact, pour les rues étroites et les centres-villes.", en: "On a compact truck, for narrow streets and town centres." },
    image: `${IMG}/2024/04/mini-home2.jpg`,
    to: "/mini-trucks",
  },
  {
    id: "van-mounted",
    name: "Van Mounted",
    family: "van",
    height: { fr: "12 – 14 m", en: "12 – 14 m" },
    text: { fr: "Montée sur fourgon, l'outillage reste à l'abri : idéale en ville.", en: "Fitted on a van, the tools stay under cover: made for the city." },
    image: `${IMG}/2024/04/van-mounted-home3.jpg`,
    to: "/van-mounted",
    quoteRange: "van",
  },
  {
    id: "pickup",
    name: "Pick Up Solutions",
    family: "pickup",
    height: { fr: "12 – 16 m", en: "12 – 16 m" },
    text: { fr: "Sur pick-up 4×4, pour les accès difficiles et les longues distances.", en: "On a 4×4 pick-up, for hard access and long distances." },
    image: `${IMG}/2023/07/indice-piattaforme-PICKUP.png`,
    to: "/piattaforme-pick-up",
    quoteRange: "pickup",
  },
  {
    id: "leopard",
    name: "Leopard",
    family: "chenillee",
    height: { fr: "14 – 25 m", en: "14 – 25 m" },
    text: { fr: "Sur chenilles, pour les sols fragiles et les passages étroits.", en: "On tracks, for fragile ground and narrow passages." },
    image: `${IMG}/2023/08/indice-piattaforme-LEOPARD.png`,
    to: "/leopard",
    quoteRange: "chenillee",
  },
  {
    id: "xtrailer",
    name: "X Trailer",
    family: "tractable",
    height: { fr: "12 – 14 m", en: "12 – 14 m" },
    text: { fr: "Tractable, elle se déplace derrière un véhicule léger.", en: "Towable, it travels behind a light vehicle." },
    image: `${IMG}/2024/03/x-trailer-indice.jpg`,
    to: "/xtrailer",
    quoteRange: "tractable",
  },
  {
    id: "xtractor",
    name: "X Tractor",
    family: "tractable",
    height: { fr: "12 m", en: "12 m" },
    text: { fr: "Montée sur tracteur, quand le terrain demande traction et stabilité.", en: "Fitted on a tractor, when the ground calls for traction and stability." },
    image: `${IMG}/2023/07/indice-piattaforme-XRANGE-2.png`,
    to: "/xtractor",
    quoteRange: "tractable",
  },
  {
    id: "insulated",
    name: "Insulated",
    family: "speciale",
    height: { fr: "16 – 24 m", en: "16 – 24 m" },
    text: { fr: "Nacelles isolées, pour travailler près des réseaux électriques.", en: "Insulated platforms, for work near power lines." },
    image: `${IMG}/2023/11/Eurosky-18-I-Iveco-Eurocargo-new5.jpg`,
    to: "/piattaforme-aeree-isolate",
    quoteRange: "isolee",
  },
  {
    id: "electric-range",
    name: "Electric Range",
    family: "speciale",
    height: { fr: "12 – 25 m", en: "12 – 25 m" },
    text: { fr: "Alimentation électrique, pour travailler sans bruit ni émissions.", en: "Electric power, for quiet, emission-free work." },
    image: `${IMG}/2024/02/4-G6.jpg`,
    to: "/piattaforme-aeree-elettriche",
  },
  {
    id: "fire-fighting",
    name: "Fire Fighting",
    family: "speciale",
    height: { fr: "45 m", en: "45 m" },
    text: { fr: "Grandes hauteurs pour les services d'incendie et de secours.", en: "High reach for fire and rescue services." },
    image: `${IMG}/2024/04/Euroflag-new-scaled.jpg`,
    to: "/fire-fighting",
  },
  {
    id: "solar",
    name: "Solar",
    family: "speciale",
    height: { fr: "Dès 11 m", en: "From 11 m" },
    text: { fr: "Gamme spécifique : la documentation vous est envoyée sur demande.", en: "A specific range: the documents are sent on request." },
    image: `${IMG}/2023/07/indice-piattaforme-SOLAR.png`,
  },
];

/** Where "Demander un devis" goes for a range: the form, already filled in. */
export const quoteHref = (range: Pick<Range, "name" | "quoteRange">) => {
  const params = new URLSearchParams({ modele: range.name });
  if (range.quoteRange) params.set("gamme", range.quoteRange);
  return `/contact?${params.toString()}#devis`;
};
