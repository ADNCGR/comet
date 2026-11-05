export type LocalizedText = Record<string, string>;

export interface HeroSlide {
  eyebrow: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  cta: LocalizedText;
  href: string;
  image: string;
}

export interface TextBlock {
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  cta?: LocalizedText;
  href?: string;
  image?: string;
}

export interface ProductCategory {
  title: LocalizedText;
  range: string;
  href: string;
  image: string;
}

export interface SolutionBlock {
  overline: LocalizedText;
  title: LocalizedText;
  href: string;
  image: string;
  variant?: "image" | "map" | "solid";
}

export interface MetricItem {
  value: number;
  from?: number;
  suffix?: string;
  label: LocalizedText;
}

export interface NewsItem {
  href: string;
  image: string;
  category: LocalizedText;
  title: LocalizedText;
  date: string;
}

export interface HomepageContent {
  heroSlides: HeroSlide[];
  intro: TextBlock;
  promoBlocks: TextBlock[];
  productsHeader: TextBlock;
  productCategories: ProductCategory[];
  solutionsHeader: TextBlock;
  solutionBlocks: SolutionBlock[];
  metrics: MetricItem[];
  newsHeader: TextBlock;
  newsItems: NewsItem[];
}

export const textFor = (value: LocalizedText | undefined, lang: string, fallback = "") => {
  if (!value) return fallback;
  const normalized = lang.split("-")[0];
  return value[normalized] || value.fr || value.en || value.ar || fallback;
};

export const defaultHomepageContent: HomepageContent = {
  heroSlides: [
    {
      eyebrow: {
        ar: "خبرة | تكنولوجيا | أمان",
        fr: "EXPERIENCE | TECHNOLOGY | SAFETY",
        en: "EXPERIENCE | TECHNOLOGY | SAFETY",
      },
      title: {
        ar: "45.20 EUROSKY-T",
        fr: "45.20 EUROSKY-T",
        en: "45.20 EUROSKY-T",
      },
      subtitle: {
        ar: "منصة تلسكوبية على شاحنة بارتفاع خارق للعمل الاحترافي.",
        fr: "Nacelle télescopique sur camion avec grande hauteur de travail.",
        en: "Telescopic platform on truck with great working height for professional use.",
      },
      cta: {
        ar: "اكتشف المزيد",
        fr: "DISCOVER MORE",
        en: "DISCOVER MORE",
      },
      href: "https://www.officinecomet.com/en/new-eurosky-t/",
      image: "https://www.officinecomet.com/wp-content/uploads/2024/03/officine-comet-eurosky-hd.jpg",
    },
    {
      eyebrow: {
        ar: "خبرة | تكنولوجيا | أمان",
        fr: "EXPERIENCE | TECHNOLOGY | SAFETY",
        en: "EXPERIENCE | TECHNOLOGY | SAFETY",
      },
      title: {
        ar: "نيو يوروسكاي 18.7",
        fr: "NEW EUROSKY 18.7",
        en: "NEW EUROSKY 18.7",
      },
      subtitle: {
        ar: "منصة عمل هوائية خفيفة ومبتكرة لعمليات التدخل السريع.",
        fr: "Nacelle élévatrice innovante et légère pour interventions rapides.",
        en: "Innovative and lightweight aerial platform for rapid interventions.",
      },
      cta: {
        ar: "اكتشف المزيد",
        fr: "DISCOVER MORE",
        en: "DISCOVER MORE",
      },
      href: "https://www.officinecomet.com/en/new-eurosky/",
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Eurosky-26-Iveco-Eurocargo-new.jpg",
    },
    {
      eyebrow: {
        ar: "خبرة | تكنولوجيا | أمان",
        fr: "EXPERIENCE | TECHNOLOGY | SAFETY",
        en: "EXPERIENCE | TECHNOLOGY | SAFETY",
      },
      title: {
        ar: "12 X TRACTOR",
        fr: "12 X TRACTOR",
        en: "12 X TRACTOR",
      },
      subtitle: {
        ar: "منصة جوية قابلة للقطر مدمجة وعملية.",
        fr: "Towable aerial platform, compact and practical.",
        en: "Towable aerial platform, compact and practical.",
      },
      cta: {
        ar: "اكتشف المزيد",
        fr: "DISCOVER MORE",
        en: "DISCOVER MORE",
      },
      href: "https://www.officinecomet.com/en/towable-platform/",
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/trainabili-new5.jpg",
    },
    {
      eyebrow: {
        ar: "خبرة | تكنولوجيا | أمان",
        fr: "EXPERIENCE | TECHNOLOGY | SAFETY",
        en: "EXPERIENCE | TECHNOLOGY | SAFETY",
      },
      title: {
        ar: "حلول البيك آب",
        fr: "PICK-UP SOLUTIONS",
        en: "PICK-UP SOLUTIONS",
      },
      subtitle: {
        ar: "منصات جوية مدمجة وسريعة الحركة مصممة للتركيب على سيارات بيك آب.",
        fr: "Nacelles compactes et maniables adaptées aux véhicules Pick-up.",
        en: "Compact and highly maneuverable aerial platforms for pick-up vehicles.",
      },
      cta: {
        ar: "اكتشف المزيد",
        fr: "DISCOVER MORE",
        en: "DISCOVER MORE",
      },
      href: "https://www.officinecomet.com/en/pick-up-platforms/",
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/pickup-new4.jpg",
    },
  ],
  intro: {
    eyebrow: {
      ar: "منذ عام 1960 ورش عمل CO.ME.T. تصمم وتصنع",
      fr: "SINCE 1960 CO.ME.T WORKSHOPS DESIGNS AND MANUFACTURES",
      en: "SINCE 1960 CO.ME.T WORKSHOPS DESIGNS AND MANUFACTURES",
      it: "DAL 1960 CO.ME.T OFFICINE PROGETTA E COSTRUISCE",
    },
    title: {
      ar: "منصات معزولة ومجنزرة ذاتية الدفع للعمل في الارتفاع",
      fr: "Self-propelled Tracked Isolated Aerial Platforms",
      en: "Self-propelled Tracked Isolated Aerial Platforms",
      it: "Piattaforme Aeree Semoventi Cingolate Isolate",
    },
    body: {
      ar: "تقوم CO.ME.T. Officine بتصميم وتصنيع وبيع المنصات الجوية منذ عام 1960. وكانت أول شركة تقدم مفهوم 'المنصة الهيدروليكية' في أوروبا، مع أكثر من 10,000 تركيب في إيطاليا وجميع أنحاء العالم، لتضمن الجودة والأمان في الارتفاع.",
      fr: "CO.ME.T. designs, manufactures and sells since 1960 aerial platforms and has been the first one to introduce the concept of 'hydraulic platform' in Europe (over 10,000 installations sold in Italy and worldwide).",
      en: "Welcome to the world of professional elevation, where experience and innovation come together to overcome every height challenge. We are CO.ME.T. Officine, the undisputed leader in the design and construction of self-propelled, towable, trunnion and tracked aerial platforms. With over 60 years of experience, we have earned the trust of businesses in every industry through our in-depth knowledge, reliability and customized solutions.",
      it: "Benvenuti nel mondo dell'elevazione professionale, dove esperienza e innovazione si uniscono per superare ogni sfida in quota. Siamo CO.ME.T. Officine, leader indiscusso nella progettazione e costruzione di piattaforme aeree semoventi, trainabili, a barbetta e cingolate. Con oltre 60 anni di esperienza, abbiamo guadagnato la fiducia di aziende di ogni settore grazie alla nostra profonda competenza, affidabilità e soluzioni personalizzate.",
    },
  },
  promoBlocks: [
    {
      eyebrow: {
        ar: "منتجاتنا",
        fr: "OUR PRODUCTS",
        en: "OUR PRODUCTS",
        it: "I NOSTRI PRODOTTI"
      },
      title: {
        ar: "أكثر من 80 نموذجاً من منصات العمل الجوية",
        fr: "More than 80 models of aerial platforms",
        en: "More than 80 models of aerial platforms",
        it: "Più di 80 modelli di piattaforme aeree"
      },
      body: {
        ar: "تضم مجموعة منتجاتنا أكثر من 80 نموذجًا مختلفًا من منصات العمل الجوية الكفيلة بتلبية كافة متطلبات الرفع والوصول المهني.",
        fr: "Notre gamme comprend plus de 80 modèles de nacelles élévatrices conçues pour répondre à tous les besoins d'élévation professionnelle.",
        en: "Our philosophy is based on safety and excellence, addressing the specific needs of working at height. Each platform we design is the result of advanced technical expertise and an unwavering commitment to deliver products that exceed industry standards.",
      },
      cta: {
        ar: "اكتشف المزيد",
        fr: "DISCOVER MORE",
        en: "DISCOVER MORE",
      },
      href: "https://www.officinecomet.com/en/aerial-platforms/",
    },
    {
      eyebrow: {
        ar: "الخدمة",
        fr: "SERVICE",
        en: "SERVICE",
        it: "SERVICE"
      },
      title: {
        ar: "مساعدة عالمية",
        fr: "GLOBAL ASSISTANCE",
        en: "GLOBAL ASSISTANCE",
        it: "ASSISTENZA GLOBALE"
      },
      body: {
        ar: "نحن نقدم خدمة دعم فني عالمية وصيانة مستمرة لجميع منصاتنا المعالجة لضمان الأمان الأقصى والكفاءة العالية لمعداتكم.",
        fr: "Nous offrons un service d'assistance globale et de maintenance préventive pour assurer la longévité et la sécurité de vos nacelles.",
        en: "CO.ME.T. Officine has an extensive sales, rental and service network with authorized centers in Italy and abroad, in the countries where it is present. All maintenance activity, under warranty and post-warranty, is monitored directly by the parent company to enable continuous product improvement.",
      },
      cta: {
        ar: "اكتشف المزيد",
        fr: "DISCOVER MORE",
        en: "DISCOVER MORE",
      },
      href: "https://www.officinecomet.com/en/service/",
      image: "https://www.officinecomet.com/wp-content/uploads/2024/04/assistenza2.jpg",
    },
  ],
  productsHeader: {
    eyebrow: {
      ar: "تكنولوجيا متقدمة",
      fr: "Advanced technology",
      en: "CUTTING-EDGE TECHNOLOGY",
      it: "TECNOLOGIA ALL'AVANGUARDIA",
    },
    title: {
      ar: "منصات جوية",
      fr: "Aerial platforms",
      en: "Aerial platforms",
      it: "Piattaforme Aeree",
    },
    body: {
      ar: "حلول آمنة وفعالة ومخصصة للعمل في الارتفاع بكل طمأنينة.",
      fr: "Des solutions sûres, efficaces et sur mesure pour travailler en hauteur en toute confiance.",
      en: "We work to solve your problems efficiently, giving you the peace of mind to operate safely and with superior performance. Discover the unlimited potential of elevation with CO.ME.T. OFFICINE.",
    },
    cta: {
      ar: "اكتشف المزيد",
      fr: "discover more",
      en: "discover more",
    },
    href: "https://www.officinecomet.com/en/aerial-platforms/",
  },
  productCategories: [
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Dsc_0034_new4.jpg",
      range: "14-24 m",
      title: { ar: "تلسكوبية", fr: "TELESCOPIC", en: "TELESCOPIC" },
      href: "/products#telescopic",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Eurosky-26-Iveco-Eurocargo-new.jpg",
      range: "14-45 m",
      title: { ar: "مفصلية", fr: "ARTICULATED", en: "ARTICULATED" },
      href: "/products#articulated",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2024/10/VanMounted-home3.jpg",
      range: "12-14 m",
      title: { ar: "فان", fr: "VAN", en: "VAN" },
      href: "/products#van",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/pickup-new4.jpg",
      range: "12-16 m",
      title: { ar: "بيك آب", fr: "PICK UP", en: "PICK UP" },
      href: "/products#pickup",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/cingolate-new.jpg",
      range: "14-25 m",
      title: { ar: "مجنزرة", fr: "CRAWLER", en: "CRAWLER" },
      href: "/products#crawler",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/trainabili-new5.jpg",
      range: "12-14 m",
      title: { ar: "مقطورة", fr: "TOWABLE", en: "TOWABLE" },
      href: "/products#towable",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2024/03/EUROSKY-T45_20_new.jpg",
      range: "45 m",
      title: { ar: "ارتفاعات كبيرة", fr: "GREAT HEIGHTS", en: "GREAT HEIGHTS" },
      href: "/products#greatheights",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2024/02/manutenzione3.jpg",
      range: "11 m",
      title: { ar: "صيانة الأنفاق", fr: "TUNNELS MAINTENANCE", en: "TUNNELS MAINTENANCE" },
      href: "/products#tunnels",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Eurosky-18-I-Iveco-Eurocargo-new5.jpg",
      range: "16-24 m",
      title: { ar: "معزولة", fr: "INSULATED", en: "INSULATED" },
      href: "/products#insulated",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2024/04/Euroflag-scaled.jpg",
      range: "45 m",
      title: { ar: "مكافحة الحرائق", fr: "FIRE FIGHTING", en: "FIRE FIGHTING" },
      href: "/products#firefighting",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2024/04/elettriche-2.jpg",
      range: "12-25 m",
      title: { ar: "كهربائية", fr: "ELECTRICAL", en: "ELECTRICAL" },
      href: "/products#electrical",
    },
  ],
  solutionsHeader: {
    eyebrow: { ar: "Co.me.t. OFFICINE", fr: "Co.me.t. OFFICINE", en: "Co.me.t. OFFICINE" },
    title: {
      ar: "حلول للعمل في الارتفاع",
      fr: "Solutions for working at height",
      en: "Solutions for working at height",
      it: "Soluzioni per lavorare in altezza"
    },
    body: { ar: "", fr: "", en: "" },
  },
  solutionBlocks: [
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/quadrato-home2.jpg",
      overline: { ar: "OFFICINE COMET", fr: "OFFICINE COMET", en: "OFFICINE COMET" },
      title: { ar: "متخصصون في الارتفاعات الكبيرة", fr: "Specialist for great heights", en: "Specialist for great heights", it: "Specialisti delle grandi altezze" },
      href: "https://www.officinecomet.com/en/aerial-platforms/",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2024/02/ai-generated-8062984_1920.jpg",
      overline: { ar: "OFFICINE COMET", fr: "OFFICINE COMET", en: "OFFICINE COMET" },
      title: { ar: "نحن نبحث عن موزعين", fr: "We are hiring dealers", en: "We are hiring dealers", it: "Ricerca assumiamo dealers" },
      href: "https://www.officinecomet.com/en/work-with-us/",
    },
    {
      image: "https://www.officinecomet.com/wp-content/uploads/2023/11/world-map-300x148-1.png",
      overline: { ar: "OFFICINE COMET", fr: "OFFICINE COMET", en: "OFFICINE COMET" },
      title: { ar: "شبكة المبيعات وما بعد البيع", fr: "Sales and After-sales Network", en: "Sales and After-sales Network", it: "Network vendite e post vendita" },
      href: "https://www.officinecomet.com/en/service",
      variant: "map",
    },
  ],
  metrics: [
    { value: 85, suffix: "", label: { ar: "نماذج", fr: "MODELS", en: "MODELS", it: "MODELLI" } },
    { value: 10000, suffix: "", label: { ar: "عملاء حول العالم", fr: "CUSTOMERS IN THE WORLD", en: "CUSTOMERS IN THE WORLD", it: "CLIENTI NEL MONDO" } },
    { value: 35, suffix: "", label: { ar: "فروع حول العالم", fr: "COUNTRIES AROUND THE WORLD", en: "COUNTRIES AROUND THE WORLD", it: "PAESI NEL MONDO" } },
    { value: 20000, suffix: "", label: { ar: "منصات منتجة", fr: "MANUFACTURED PLATFORMS", en: "MANUFACTURED PLATFORMS", it: "PIATTAFORME PRODOTTE" } },
  ],
  newsHeader: {
    eyebrow: { ar: "أخبار ومعارض", fr: "Fairs and Events", en: "Fairs and Events" },
    title: { ar: "المعارض والأحداث", fr: "Fairs", en: "Fairs" },
    body: {
      ar: "تابع مشاركاتنا وأحدث حضورنا في المعارض الدولية الكبرى.",
      fr: "The presence of Co.me.t. Officine confirms its constant commitment to offering innovative and high-quality solutions in the field of aerial platforms at sector fairs, demonstrating its leadership and attention to customer needs.",
      en: "The presence of Co.me.t. Officine confirms its constant commitment to offering innovative and high-quality solutions in the field of aerial platforms at sector fairs, demonstrating its leadership and attention to customer needs.",
    },
    cta: { ar: "كل المعارض", fr: "All fairs", en: "All fairs" },
    href: "https://www.officinecomet.com/news-and-fairs/",
  },
  newsItems: [
    {
      href: "https://www.officinecomet.com/co-me-t-officine-present-to-gis-2025/",
      image: "https://www.officinecomet.com/wp-content/uploads/2025/07/Gis-2025-articolo-370x230.jpg",
      category: { ar: "معارض", fr: "Fairs", en: "Fairs" },
      title: { ar: "Co.me.t. Officine present to GIS 2025", fr: "Co.me.t. Officine present to GIS 2025", en: "Co.me.t. Officine present to GIS 2025" },
      date: "2025-07-11",
    },
    {
      href: "https://www.officinecomet.com/comet-officine-present-at-bauma-2025/",
      image: "https://www.officinecomet.com/wp-content/uploads/2025/02/bauma-2025-news-370x230.jpg",
      category: { ar: "معارض", fr: "Fairs", en: "Fairs" },
      title: { ar: "Co.me.t. Officine Present at BAUMA 2025", fr: "Co.me.t. Officine Present at BAUMA 2025", en: "Co.me.t. Officine Present at BAUMA 2025" },
      date: "2025-02-15",
    },
    {
      href: "https://www.officinecomet.com/co-me-t-officine-present-at-bauma-india-2024/",
      image: "https://www.officinecomet.com/wp-content/uploads/2024/10/bauma-india-news-370x230.jpg",
      category: { ar: "معارض", fr: "Fairs", en: "Fairs" },
      title: { ar: "Co.me.t. Officine Present at BAUMA INDIA 2024", fr: "Co.me.t. Officine Present at BAUMA INDIA 2024", en: "Co.me.t. Officine Present at BAUMA INDIA 2024" },
      date: "2024-10-15",
    },
  ],
};
