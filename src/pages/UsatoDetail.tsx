import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { WhatsAppIcon } from "@/components/icons";
import { WHATSAPP_HELLO, whatsappHref } from "@/config/contact";
import { useLang } from "@/lib/locale";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

type LocalizedText = { fr?: string; en?: string; ar?: string; [key: string]: string | undefined };

type SpecItem = {
  label: LocalizedText;
  value: LocalizedText;
};

type StockPageContent = {
  kind: "stock";
  status: "in_stock" | "pre_owned";
  title: LocalizedText;
  eyebrow: LocalizedText;
  description: LocalizedText;
  image: string;
  image2?: string;
  specs?: SpecItem[];
  details?: SpecItem[];
};

const fallbackPages: Record<string, StockPageContent> = {
  "aerial-platform-in-stock-new-eurosky-18-2-7-5-hq": {
    kind: "stock",
    status: "in_stock",
    title: { fr: "NEW EUROSKY 18/2/7.5 HQ", en: "NEW EUROSKY 18/2/7.5 HQ", ar: "NEW EUROSKY 18/2/7.5 HQ" },
    eyebrow: { fr: "Aerial Platform IN STOCK New Eurosky 18-2-7.5 HQ", en: "Aerial Platform IN STOCK New Eurosky 18-2-7.5 HQ", ar: "Aerial Platform IN STOCK New Eurosky 18-2-7.5 HQ" },
    description: {
      fr: "La New Eurosky est une nacelle articulée, précise sur les chantiers urbains exigeants.",
      en: "The EUROSKY articulated aerial platforms are designed to offer maximum operational efficiency in small spaces, without sacrificing performance and safety.",
      ar: "منصة EUROSKY التلسكوبية أداة دقيقة للمواقع الحضرية الصعبة.",
    },
    image: "https://www.officinecomet.com/wp-content/uploads/2025/09/Eurosky-18-Iveco-Daily-1-1-scaled.jpg",
    image2: "https://www.officinecomet.com/wp-content/uploads/2025/09/Eurosky-18-Iveco-Daily-1-1-scaled.jpg",
    specs: [
      { label: { fr: "HAUTEUR DE TRAVAIL", en: "WORKING HEIGHT", ar: "ارتفاع العمل" }, value: { fr: "18 m", en: "18 m", ar: "18 m" } },
      { label: { fr: "DÉPORT LATÉRAL MAX.", en: "MAX. LATERAL OUTREACH", ar: "أقصى مدى جانبي" }, value: { fr: "7.5 m", en: "7.5 m", ar: "7.5 m" } },
      { label: { fr: "PLANCHER PANIER", en: "BASKET FLOOR", ar: "أرضية السلة" }, value: { fr: "16 m", en: "16 m", ar: "16 m" } },
      { label: { fr: "HAUTEUR DE PONTAGE", en: "BRIDGING HEIGHT", ar: "ارتفاع التجسير" }, value: { fr: "8 m", en: "8 m", ar: "8 m" } },
      { label: { fr: "CAPACITÉ PANIER MAX.", en: "MAX. BASKET CAPACITY", ar: "أقصى حمولة للسلة" }, value: { fr: "200 Kg - 2 personnes", en: "200 Kg - 2 people", ar: "200 كغ - شخصان" } },
      { label: { fr: "STABILISATEURS HYDRAULIQUES", en: "HYDRAULIC OUTRIGGERS", ar: "أرجل الاستقرار الهيدروليكية" }, value: { fr: "4 en forme de H", en: "4 in H shape", ar: "4 على شكل H" } },
      { label: { fr: "ROTATION", en: "ROTATION", ar: "الدوران" }, value: { fr: "360° continu", en: "360° continuous", ar: "360° مستمر" } },
      { label: { fr: "COMMANDES", en: "CONTROLS", ar: "أوامر التحكم" }, value: { fr: "100% hydraulique basse pression", en: "100% hydraulic low pressure", ar: "100% هيدروليكي ضغط منخفض" } },
      { label: { fr: "POIDS TOTAL MINIMUM GVW", en: "MINIMUM GVW PTT", ar: "الوزن الإجمالي الأدنى" }, value: { fr: "3.5 ton", en: "3.5 ton", ar: "3.5 طن" } },
    ],
    details: [
      { label: { fr: "MODÈLE", en: "MODEL", ar: "الطراز" }, value: { fr: "NEW EUROSKY 18/2/7.5 HQ", en: "NEW EUROSKY 18/2/7.5 HQ", ar: "NEW EUROSKY 18/2/7.5 HQ" } },
      { label: { fr: "NUMÉRO DE SÉRIE", en: "SERIAL", ar: "الرقم التسلسلي" }, value: { fr: "MT15087 - MT15088 - MT15089 - MT15090", en: "MT15087 - MT15088 - MT15089 - MT15090", ar: "MT15087 - MT15088 - MT15089 - MT15090" } },
      { label: { fr: "STATUT", en: "STATUS", ar: "الحالة" }, value: { fr: "Prête à livrer", en: "READY TO DELIVER", ar: "جاهز للتسليم" } },
      { label: { fr: "VÉHICULE", en: "VEHICLE", ar: "المركبة" }, value: { fr: "IVECO DAILY 35S14H P3450 (E6E)", en: "IVECO DAILY 35S14H P3450 (E6E)", ar: "IVECO DAILY 35S14H P3450 (E6E)" } },
      { label: { fr: "PRODUCTION", en: "PRODUCTION", ar: "الإنتاج" }, value: { fr: "2025", en: "2025", ar: "2025" } },
      { label: { fr: "CARACTÉRISTIQUES", en: "CHARACTERISTICS", ar: "الخصائص" }, value: { fr: "Couleur standard: blanc/vert\nSystème électrique 12V", en: "Standard colour: white/green\n12V electrical system", ar: "اللون القياسي: أبيض/أخضر\nنظام كهربائي 12V" } },
      { label: { fr: "OPTIONNEL", en: "OPTIONAL", ar: "اختياري" }, value: { fr: "Panier en fibre de verre", en: "Fiberglass Basket", ar: "سلة ألياف زجاجية" } },
    ],
  },
  "aerial-platform-in-stock-new-eurosfilo-17-2-9-11-hq": {
    kind: "stock",
    status: "in_stock",
    title: { fr: "NEW EUROSFILO 17/2/9(11) HQ", en: "NEW EUROSFILO 17/2/9(11) HQ", ar: "NEW EUROSFILO 17/2/9(11) HQ" },
    eyebrow: { fr: "Aerial Platform IN STOCK New Eurosfilo 17-2-9(11) HQ", en: "Aerial Platform IN STOCK New Eurosfilo 17-2-9(11) HQ", ar: "Aerial Platform IN STOCK New Eurosfilo 17-2-9(11) HQ" },
    description: {
      fr: "La New Eurosfilo est une nacelle télescopique, pour monter vite et loin.",
      en: "The NEW EUROSFILO is a telescopic aerial platform built to reach high and far.",
      ar: "منصة NEW EUROSFILO المفصلية مصممة لتجاوز العوائق.",
    },
    image: "https://www.officinecomet.com/wp-content/uploads/2025/09/3S4D6359-scaled.jpg",
    image2: "https://www.officinecomet.com/wp-content/uploads/2025/09/3S4D6359-scaled.jpg",
    specs: [
      { label: { fr: "HAUTEUR DE TRAVAIL", en: "WORKING HEIGHT", ar: "ارتفاع العمل" }, value: { fr: "17 m", en: "17 m", ar: "17 m" } },
      { label: { fr: "DÉPORT LATÉRAL MAX.", en: "MAX. LATERAL OUTREACH", ar: "أقصى مدى جانبي" }, value: { fr: "9 m (11 m)", en: "9 m (11 m)", ar: "9 m (11 m)" } },
      { label: { fr: "CAPACITÉ PANIER MAX.", en: "MAX. BASKET CAPACITY", ar: "أقصى حمولة للسلة" }, value: { fr: "200 Kg - 2 personnes", en: "200 Kg - 2 people", ar: "200 كغ - شخصان" } },
      { label: { fr: "ROTATION", en: "ROTATION", ar: "الدوران" }, value: { fr: "360° continu", en: "360° continuous", ar: "360° مستمر" } },
      { label: { fr: "COMMANDES", en: "CONTROLS", ar: "أوامر التحكم" }, value: { fr: "100% hydraulique basse pression", en: "100% hydraulic low pressure", ar: "100% هيدروليكي ضغط منخفض" } },
    ],
    details: [
      { label: { fr: "MODÈLE", en: "MODEL", ar: "الطراز" }, value: { fr: "NEW EUROSFILO 17/2/9(11) HQ", en: "NEW EUROSFILO 17/2/9(11) HQ", ar: "NEW EUROSFILO 17/2/9(11) HQ" } },
      { label: { fr: "STATUT", en: "STATUS", ar: "الحالة" }, value: { fr: "Prête à livrer", en: "READY TO DELIVER", ar: "جاهز للتسليم" } },
      { label: { fr: "VÉHICULE", en: "VEHICLE", ar: "المركبة" }, value: { fr: "ISUZU NMR85H", en: "ISUZU NMR85H", ar: "ISUZU NMR85H" } },
      { label: { fr: "PRODUCTION", en: "PRODUCTION", ar: "الإنتاج" }, value: { fr: "2024/25", en: "2024/25", ar: "2024/25" } },
      { label: { fr: "CARACTÉRISTIQUES", en: "CHARACTERISTICS", ar: "الخصائص" }, value: { fr: "KIT A (with standard subframe)\nStandard color: white/green\nElectric system 24V", en: "KIT A (with standard subframe)\nStandard color: white/green\nElectric system 24V", ar: "KIT A (with standard subframe)\nStandard color: white/green\nElectric system 24V" } },
      { label: { fr: "OPTIONNEL", en: "OPTIONAL", ar: "اختياري" }, value: { fr: "Heavy duty subframe GWV 6T-12T;\nFiberglass Basket;\nHydraulic plug-in the subframe;\nHydraulic plug-in the basket;", en: "Heavy duty subframe GWV 6T-12T;\nFiberglass Basket;\nHydraulic plug-in the subframe;\nHydraulic plug-in the basket;", ar: "Heavy duty subframe GWV 6T-12T;\nFiberglass Basket;\nHydraulic plug-in the subframe;\nHydraulic plug-in the basket;" } },
    ],
  },
  "aerial-platform-in-stock-new-eurosfilo-22-2-12-15-hq": {
    kind: "stock",
    status: "in_stock",
    title: { fr: "NEW EUROSFILO 22/2/12(15) HQ", en: "NEW EUROSFILO 22/2/12(15) HQ", ar: "NEW EUROSFILO 22/2/12(15) HQ" },
    eyebrow: { fr: "Aerial Platform IN STOCK New Eurosfilo 22-2-12(15) HQ", en: "Aerial Platform IN STOCK New Eurosfilo 22-2-12(15) HQ", ar: "Aerial Platform IN STOCK New Eurosfilo 22-2-12(15) HQ" },
    description: {
      fr: "La New Eurosfilo 22 est une nacelle télescopique pour les grandes hauteurs.",
      en: "The NEW EUROSFILO 22 is a high-performance telescopic platform.",
      ar: "منصة NEW EUROSFILO 22 المفصلية عالية الأداء.",
    },
    image: "https://www.officinecomet.com/wp-content/uploads/2025/09/KIT-B-ESEMPIO.jpg",
    image2: "https://www.officinecomet.com/wp-content/uploads/2025/09/KIT-B-ESEMPIO.jpg",
    specs: [
      { label: { fr: "HAUTEUR DE TRAVAIL", en: "WORKING HEIGHT", ar: "ارتفاع العمل" }, value: { fr: "22 m", en: "22 m", ar: "22 m" } },
      { label: { fr: "DÉPORT LATÉRAL MAX.", en: "MAX. LATERAL OUTREACH", ar: "أقصى مدى جانبي" }, value: { fr: "12 m (15 m)", en: "12 m (15 m)", ar: "12 m (15 m)" } },
      { label: { fr: "CAPACITÉ PANIER MAX.", en: "MAX. BASKET CAPACITY", ar: "أقصى حمولة للسلة" }, value: { fr: "200 Kg - 2 personnes", en: "200 Kg - 2 people", ar: "200 كغ - شخصان" } },
      { label: { fr: "ROTATION", en: "ROTATION", ar: "الدوران" }, value: { fr: "360° continu", en: "360° continuous", ar: "360° مستمر" } },
      { label: { fr: "COMMANDES", en: "CONTROLS", ar: "أوامر التحكم" }, value: { fr: "100% hydraulique basse pression", en: "100% hydraulic low pressure", ar: "100% هيدروليكي ضغط منخفض" } },
    ],
    details: [
      { label: { fr: "MODÈLE", en: "MODEL", ar: "الطراز" }, value: { fr: "NEW EUROSFILO 22/2/12(15) HQ", en: "NEW EUROSFILO 22/2/12(15) HQ", ar: "NEW EUROSFILO 22/2/12(15) HQ" } },
      { label: { fr: "STATUT", en: "STATUS", ar: "الحالة" }, value: { fr: "Prête à livrer", en: "READY TO DELIVER", ar: "جاهز للتسليم" } },
      { label: { fr: "VÉHICULE", en: "VEHICLE", ar: "المركبة" }, value: { fr: "IVECO DAILY", en: "IVECO DAILY", ar: "IVECO DAILY" } },
      { label: { fr: "PRODUCTION", en: "PRODUCTION", ar: "الإنتاج" }, value: { fr: "2025", en: "2025", ar: "2025" } },
      { label: { fr: "CARACTÉRISTIQUES", en: "CHARACTERISTICS", ar: "الخصائص" }, value: { fr: "KIT B", en: "KIT B", ar: "KIT B" } },
    ],
  },
  "aerial-platform-in-stock-new-eurosky-21-2-7-9-hq": {
    kind: "stock",
    status: "in_stock",
    title: { fr: "NEW EUROSKY 21/2/7(9) HQ", en: "NEW EUROSKY 21/2/7(9) HQ", ar: "NEW EUROSKY 21/2/7(9) HQ" },
    eyebrow: { fr: "Aerial Platform IN STOCK New Eurosky 21-2-7(9) HQ", en: "Aerial Platform IN STOCK New Eurosky 21-2-7(9) HQ", ar: "Aerial Platform IN STOCK New Eurosky 21-2-7(9) HQ" },
    description: {
      fr: "La New Eurosky 21 est une nacelle articulée compacte et performante.",
      en: "The NEW EUROSKY 21 is a high-performance compact articulated platform.",
      ar: "منصة NEW EUROSKY 21 التلسكوبية المدمجة عالية الأداء.",
    },
    image: "https://www.officinecomet.com/wp-content/uploads/2025/09/Image1.jpg",
    image2: "https://www.officinecomet.com/wp-content/uploads/2025/09/Image1.jpg",
    specs: [
      { label: { fr: "HAUTEUR DE TRAVAIL", en: "WORKING HEIGHT", ar: "ارتفاع العمل" }, value: { fr: "21 m", en: "21 m", ar: "21 m" } },
      { label: { fr: "DÉPORT LATÉRAL MAX.", en: "MAX. LATERAL OUTREACH", ar: "أقصى مدى جانبي" }, value: { fr: "7 m (9 m)", en: "7 m (9 m)", ar: "7 m (9 m)" } },
      { label: { fr: "CAPACITÉ PANIER MAX.", en: "MAX. BASKET CAPACITY", ar: "أقصى حمولة للسلة" }, value: { fr: "200 Kg - 2 personnes", en: "200 Kg - 2 people", ar: "200 كغ - شخصان" } },
      { label: { fr: "STABILISATEURS HYDRAULIQUES", en: "HYDRAULIC OUTRIGGERS", ar: "أرجل الاستقرار الهيدروليكية" }, value: { fr: "4 en forme de H", en: "4 in H shape", ar: "4 على شكل H" } },
      { label: { fr: "ROTATION", en: "ROTATION", ar: "الدوران" }, value: { fr: "360° continu", en: "360° continuous", ar: "360° مستمر" } },
      { label: { fr: "COMMANDES", en: "CONTROLS", ar: "أوامر التحكم" }, value: { fr: "100% hydraulique basse pression", en: "100% hydraulic low pressure", ar: "100% هيدروليكي ضغط منخفض" } },
    ],
    details: [
      { label: { fr: "MODÈLE", en: "MODEL", ar: "الطراز" }, value: { fr: "NEW EUROSKY 21/2/7(9) HQ", en: "NEW EUROSKY 21/2/7(9) HQ", ar: "NEW EUROSKY 21/2/7(9) HQ" } },
      { label: { fr: "STATUT", en: "STATUS", ar: "الحالة" }, value: { fr: "Prête à livrer", en: "READY TO DELIVER", ar: "جاهز للتسليم" } },
      { label: { fr: "VÉHICULE", en: "VEHICLE", ar: "المركبة" }, value: { fr: "IVECO DAILY 35S14H P3450 (E6E)", en: "IVECO DAILY 35S14H P3450 (E6E)", ar: "IVECO DAILY 35S14H P3450 (E6E)" } },
      { label: { fr: "PRODUCTION", en: "PRODUCTION", ar: "الإنتاج" }, value: { fr: "2025", en: "2025", ar: "2025" } },
    ],
  },
  "aerial-platform-pre-owned-new-eurosfilo-17-2-7-8-5-hq": {
    kind: "stock",
    status: "pre_owned",
    title: { fr: "NEW EUROSFILO 17/2/7(8.5) HQ", en: "NEW EUROSFILO 17/2/7(8.5) HQ", ar: "NEW EUROSFILO 17/2/7(8.5) HQ" },
    eyebrow: { fr: "Aerial Platform PRE OWNED New Eurosfilo 17-2-7(8.5) HQ", en: "Aerial Platform PRE OWNED New Eurosfilo 17-2-7(8.5) HQ", ar: "Aerial Platform PRE OWNED New Eurosfilo 17-2-7(8.5) HQ" },
    description: {
      fr: "La New Eurosfilo 17 est une nacelle télescopique d'occasion, en excellent état.",
      en: "The NEW EUROSFILO 17(8.5) is a pre-owned telescopic aerial platform in excellent condition.",
      ar: "منصة NEW EUROSFILO 17(8.5) المفصلية المستعملة بحالة ممتازة.",
    },
    image: "https://www.officinecomet.com/wp-content/uploads/2025/09/Foto-Usato_7-1.jpg",
    image2: "https://www.officinecomet.com/wp-content/uploads/2025/09/Foto-Usato_7-1.jpg",
    specs: [
      { label: { fr: "HAUTEUR DE TRAVAIL", en: "WORKING HEIGHT", ar: "ارتفاع العمل" }, value: { fr: "17 m", en: "17 m", ar: "17 m" } },
      { label: { fr: "DÉPORT LATÉRAL MAX.", en: "MAX. LATERAL OUTREACH", ar: "أقصى مدى جانبي" }, value: { fr: "7 m (8.5 m)", en: "7 m (8.5 m)", ar: "7 m (8.5 m)" } },
      { label: { fr: "CAPACITÉ PANIER MAX.", en: "MAX. BASKET CAPACITY", ar: "أقصى حمولة للسلة" }, value: { fr: "200 Kg - 2 personnes", en: "200 Kg - 2 people", ar: "200 كغ - شخصان" } },
      { label: { fr: "ROTATION", en: "ROTATION", ar: "الدوران" }, value: { fr: "360° continu", en: "360° continuous", ar: "360° مستمر" } },
      { label: { fr: "COMMANDES", en: "CONTROLS", ar: "أوامر التحكم" }, value: { fr: "100% hydraulique basse pression", en: "100% hydraulic low pressure", ar: "100% هيدروليكي ضغط منخفض" } },
    ],
    details: [
      { label: { fr: "MODÈLE", en: "MODEL", ar: "الطراز" }, value: { fr: "NEW EUROSFILO 17/2/7(8.5) HQ", en: "NEW EUROSFILO 17/2/7(8.5) HQ", ar: "NEW EUROSFILO 17/2/7(8.5) HQ" } },
      { label: { fr: "STATUT", en: "STATUS", ar: "الحالة" }, value: { fr: "Occasion", en: "PRE OWNED", ar: "مستعملة" } },
      { label: { fr: "VÉHICULE", en: "VEHICLE", ar: "المركبة" }, value: { fr: "IVECO DAILY 35", en: "IVECO DAILY 35", ar: "IVECO DAILY 35" } },
      { label: { fr: "ÉTAT", en: "CONDITION", ar: "الحالة" }, value: { fr: "Occasion, excellent état", en: "Pre-owned - Excellent condition", ar: "مستعملة - حالة ممتازة" } },
    ],
  },
};

const isRecord = (v: unknown): v is Record<string, unknown> => Boolean(v && typeof v === "object" && !Array.isArray(v));
const textFor = (obj: LocalizedText | undefined, lang: string): string => obj ? (obj[lang] ?? obj.en ?? obj.fr ?? obj.it ?? Object.values(obj).find(Boolean) ?? "") : "";
const toLocalizedText = (v: unknown): LocalizedText => (isRecord(v) ? (v as LocalizedText) : {});
const toSpecArray = (v: unknown): SpecItem[] => Array.isArray(v) ? v.filter(isRecord).map((item) => ({ label: toLocalizedText(item.label), value: toLocalizedText(item.value) })) : [];

const parseContent = (raw: Json | undefined): StockPageContent | null => {
  if (!isRecord(raw) || raw.kind !== "stock") return null;
  return {
    kind: "stock",
    status: raw.status === "pre_owned" ? "pre_owned" : "in_stock",
    title: toLocalizedText(raw.title),
    eyebrow: toLocalizedText(raw.eyebrow),
    description: toLocalizedText(raw.description),
    image: typeof raw.image === "string" ? raw.image : "",
    image2: typeof raw.image2 === "string" ? raw.image2 : undefined,
    specs: toSpecArray(raw.specs),
    details: toSpecArray(raw.details),
  };
};

const UsatoDetail = () => {
  const location = useLocation();
  const { lang, pick } = useLang();
  const slug = location.pathname.replace(/^\/+|\/+$/g, "");
  const [page, setPage] = useState<StockPageContent | null>(fallbackPages[slug] ?? null);

  useEffect(() => {
    let mounted = true;
    setPage(fallbackPages[slug] ?? null);
    // no CMS configured (no .env): keep the built-in sheet
    if (!supabase) return;
    supabase
      .from("site_pages")
      .select("content")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!mounted || error) return;
        const live = parseContent(data?.content);
        if (live) setPage(live);
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  const title = page ? textFor(page.title, lang) : slug.replace(/-/g, " ");
  const description = page ? textFor(page.description, lang) : "";
  const isPreOwned = page?.status === "pre_owned";
  const status = isPreOwned ? pick({ fr: "Occasion", en: "Pre-owned" }) : pick({ fr: "En stock", en: "In stock" });
  const stockLabel = pick({ fr: "Stock & occasion", en: "Stock & pre-owned" });
  const quote = `/contact?${new URLSearchParams({ modele: title, projet: "stock" })}#devis`;

  return (
    <PageTemplate
      seo={{
        path: location.pathname,
        title: `${title} · ${status} | COMET Maroc`,
        description: description || pick({ fr: "Nacelle C.O.M.E.T. disponible rapidement.", en: "C.O.M.E.T. platform available soon." }),
        keywords: `${title}, nacelle ${isPreOwned ? "occasion" : "en stock"} Maroc, COMET Maroc`,
      }}
      hero={{
        eyebrow: status,
        title: [title],
        text: description,
        image: page?.image,
        size: "sm",
        actions: (
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
        ),
      }}
      crumbs={[{ label: stockLabel, to: "/occasion" }, { label: title }]}
    >
      <section className="section" aria-labelledby="stock-specs">
        {page ? (
          <div className="wrap pg-split">
            <div className="pg-split-media rise">
              {page.image && <img src={page.image} alt={title} decoding="async" />}
            </div>
            <div className="pg-split-body">
              <span className="eyebrow">{pick({ fr: "Fiche", en: "Details" })}</span>
              <h2 id="stock-specs" className="t-h2">{title}</h2>
              <dl className="pg-specs rise">
                {[...(page.specs ?? []), ...(page.details ?? [])].map((spec, i) => (
                  <div key={i}>
                    <dt>{textFor(spec.label, lang).toLowerCase()}</dt>
                    <dd>{textFor(spec.value, lang)}</dd>
                  </div>
                ))}
              </dl>
              <p className="ct-note rise">
                {pick({
                  fr: "Disponibilité et délai au Maroc confirmés à chaque demande. Sauf pour l'occasion, certaines photos peuvent être des photos d'illustration.",
                  en: "Availability and lead time in Morocco confirmed with each request. Except for pre-owned machines, some photos may be for illustration only.",
                })}
              </p>
            </div>
          </div>
        ) : (
          <div className="wrap pg-lost">
            <p className="t-lead">{pick({ fr: "Cette machine n'est plus en ligne.", en: "This machine is no longer listed." })}</p>
            <Link to="/occasion" className="btn btn--solid">
              {pick({ fr: "Voir le stock", en: "See the stock" })}
            </Link>
          </div>
        )}
      </section>
    </PageTemplate>
  );
};

export default UsatoDetail;
