import { textFor, type LocalizedText } from "@/data/homepageContent";

export type TargetKind = "category" | "product" | "news" | "page";

export type TargetSpec = {
  label: LocalizedText;
  value: LocalizedText;
};

export type TargetCard = {
  title: LocalizedText;
  slug: string;
  image: string;
  range?: string;
  excerpt?: LocalizedText;
  kind?: TargetKind;
};

export type TargetPage = {
  title: LocalizedText;
  slug: string;
  eyebrow: LocalizedText;
  description: LocalizedText;
  image: string;
  kind: TargetKind;
  cards?: TargetCard[];
  specs?: TargetSpec[];
  body?: LocalizedText[];
  date?: string;
};

export const uiText = {
  catalog: { ar: "الكتالوج", fr: "Catalogue", en: "Catalog" },
  models: { ar: "النماذج والفئات", fr: "Modèles et catégories", en: "Models and categories" },
  discover: { ar: "اكتشف", fr: "Découvrir", en: "Discover" },
  technicalSheet: { ar: "البطاقة التقنية", fr: "Fiche technique", en: "Technical sheet" },
  keySpecs: { ar: "المواصفات الرئيسية", fr: "Caractéristiques principales", en: "Key specifications" },
  requestInfo: { ar: "اطلب المعلومات", fr: "Demander des informations", en: "Request information" },
  loading: { ar: "تحميل المحتوى...", fr: "Chargement du contenu...", en: "Loading content..." },
};

const heroImages = {
  truck: "https://www.officinecomet.com/wp-content/uploads/2024/03/officine-comet-eurosky-hd.jpg",
  van: "https://www.officinecomet.com/wp-content/uploads/2024/10/VanMounted-home3.jpg",
  pickup: "https://www.officinecomet.com/wp-content/uploads/2023/11/pickup-new4.jpg",
  tracked: "https://www.officinecomet.com/wp-content/uploads/2023/11/cingolate-new.jpg",
  trailer: "https://www.officinecomet.com/wp-content/uploads/2023/11/trainabili-new5.jpg",
  service: "https://www.officinecomet.com/wp-content/uploads/2024/04/assistenza2.jpg",
  news: "https://www.officinecomet.com/wp-content/uploads/2025/07/Gis-2025-articolo-370x230.jpg",
};

const t = (fr: string, en: string, ar: string): LocalizedText => ({ fr, en, ar });

export const targetCategories: TargetCard[] = [
  { title: t("Nacelles télescopiques", "Telescopic aerial platforms", "منصات تلسكوبية"), slug: "piattaforme-aeree-telescopiche", image: heroImages.truck, range: "14-24 m", excerpt: t("Bras télescopique sur camion, pour monter vite et loin.", "Telescopic boom on a truck, to reach high and far, fast.", "Bras télescopique sur camion, pour monter vite et loin."), kind: "category" },
  { title: t("Nacelles articulées", "Articulated aerial platforms", "منصات مفصلية"), slug: "piattaforme-aeree-articolate", image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Eurosky-26-Iveco-Eurocargo-new.jpg", range: "14-45 m", excerpt: t("Bras articulé sur camion, pour passer par-dessus les obstacles.", "Articulated boom on a truck, to work up and over obstacles.", "Bras articulé sur camion, pour passer par-dessus les obstacles."), kind: "category" },
  { title: t("Nacelles sur van", "Van mounted platforms", "منصات على فان"), slug: "piattaforme-van", image: heroImages.van, range: "12-14 m", excerpt: t("Montée sur fourgon, pour les interventions en ville.", "Mounted on a van, for city work.", "Montée sur fourgon, pour les interventions en ville."), kind: "category" },
  { title: t("Solutions pick-up", "Pick-up solutions", "حلول البيك آب"), slug: "piattaforme-pick-up", image: heroImages.pickup, range: "12-16 m", excerpt: t("Sur pick-up 4×4, pour les accès difficiles et les longues distances.", "On a 4×4 pick-up, for hard access and long distances.", "Sur pick-up 4×4, pour les accès difficiles et les longues distances."), kind: "category" },
  { title: t("Nacelles chenillées", "Tracked aerial platforms", "منصات مجنزرة"), slug: "piattaforme-aeree-cingolate", image: heroImages.tracked, range: "14-25 m", excerpt: t("Sur chenilles, pour les sols fragiles et les passages étroits.", "On tracks, for fragile ground and narrow passages.", "Sur chenilles, pour les sols fragiles et les passages étroits."), kind: "category" },
  { title: t("Nacelles tractables", "Trailer platforms", "منصات مقطورة"), slug: "piattaforme-aeree-trainabili", image: heroImages.trailer, range: "12-14 m", excerpt: t("Tractable, déplacée derrière un véhicule léger.", "Towable, moved behind a light vehicle.", "Tractable, déplacée derrière un véhicule léger."), kind: "category" },
  { title: t("Nacelles isolées", "Insulated aerial platforms", "منصات معزولة"), slug: "piattaforme-aeree-isolate", image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Eurosky-18-I-Iveco-Eurocargo-new5.jpg", range: "16-24 m", excerpt: t("Isolée, pour travailler près des réseaux électriques.", "Insulated, for work near power lines.", "Isolée, pour travailler près des réseaux électriques."), kind: "category" },
  { title: t("Nacelles électriques", "Electric aerial platforms", "منصات كهربائية"), slug: "piattaforme-aeree-elettriche", image: "https://www.officinecomet.com/wp-content/uploads/2024/04/elettriche-2.jpg", range: "12-25 m", excerpt: t("Alimentation électrique, pour travailler sans bruit ni émissions.", "Electric power, for quiet, emission-free work.", "Alimentation électrique, pour travailler sans bruit ni émissions."), kind: "category" },
  { title: t("Lutte incendie", "Fire fighting", "مكافحة الحرائق"), slug: "fire-fighting", image: "https://www.officinecomet.com/wp-content/uploads/2024/04/Euroflag-scaled.jpg", range: "45 m", excerpt: t("Grandes hauteurs pour les services d'incendie et de secours.", "High reach for fire and rescue services.", "Grandes hauteurs pour les services d'incendie et de secours."), kind: "category" },
  { title: t("Maintenance tunnels", "Tunnel maintenance", "صيانة الأنفاق"), slug: "manutenzione-gallerie", image: "https://www.officinecomet.com/wp-content/uploads/2024/02/manutenzione3.jpg", range: "11 m", excerpt: t("Conçue pour l'entretien des tunnels et des galeries.", "Built for tunnel and gallery maintenance.", "Conçue pour l'entretien des tunnels et des galeries."), kind: "category" },
];

const productLineIntro = t(
  "Chaque modèle se configure selon votre véhicule porteur, la hauteur de travail et le type d'intervention. COMET Maroc vous aide à choisir et vous remet la fiche technique officielle.",
  "Each model is configured for your carrier vehicle, working height and type of work. COMET Morocco helps you choose and provides the official technical sheet.",
  "حلول COMET مكيّفة حسب الحاجات."
);

export const productLines: TargetPage[] = [
  {
    title: t("New Eurosky", "New Eurosky", "نيو يوروسكاي"),
    slug: "new-eurosky",
    eyebrow: t("Gamme camion", "Truck range", "فئة الشاحنات"),
    description: t("Nacelles sur camion de 14 à 22 m de hauteur de travail, avec ou sans jib.", "Truck-mounted platforms from 14 to 22 m working height, with or without jib.", "منصات مدمجة للمركبات الخفيفة والبيك آب."),
    image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Eurosky-26-Iveco-Eurocargo-new.jpg",
    kind: "category",
    body: [productLineIntro],
    cards: [
      { title: t("New Eurosky 14|2|6 HQ JIB", "New Eurosky 14|2|6 HQ JIB", "نيو يوروسكاي 14|2|6 HQ JIB"), slug: "piattaforma-aerea-new-eurosky-14-2-6-hq-jib", image: heroImages.pickup, range: "14 m", kind: "product" },
      { title: t("New Eurosky 16|2|6 HQ JIB", "New Eurosky 16|2|6 HQ JIB", "نيو يوروسكاي 16|2|6 HQ JIB"), slug: "piattaforma-aerea-new-eurosky-16-2-6-7-5-hq-jib", image: heroImages.truck, range: "16 m", kind: "product" },
      { title: t("New Eurosky 18|2|7.5 HQ", "New Eurosky 18|2|7.5 HQ", "نيو يوروسكاي 18|2|7.5 HQ"), slug: "piattaforma-aerea-new-eurosky-18-2-7-5-hq", image: heroImages.truck, range: "18 m", kind: "product" },
      { title: t("New Eurosky 21|2|9 HQ", "New Eurosky 21|2|9 HQ", "نيو يوروسكاي 21|2|9 HQ"), slug: "piattaforma-aerea-new-eurosky-21-2-9-hq", image: heroImages.truck, range: "21 m", kind: "product" },
      { title: t("New Eurosky 22|2|10 HQ JIB", "New Eurosky 22|2|10 HQ JIB", "نيو يوروسكاي 22|2|10 HQ JIB"), slug: "piattaforma-aerea-new-eurosky-22-2-10-hq-jib", image: heroImages.truck, range: "22 m", kind: "product" },
    ],
  },
  {
    title: t("New Eurosky Heavy Duty", "New Eurosky Heavy Duty", "نيو يوروسكاي للخدمة الشاقة"),
    slug: "new-eurosky-heavy-duty",
    eyebrow: t("Gamme camion", "Truck mounted range", "فئة الشاحنات"),
    description: t("Nacelles sur camion de 26 à 33 m, pour les réseaux, les télécoms, l'industrie et les grands chantiers.", "Truck mounted platforms for utilities, telecoms, industry, and major worksites, with height and outreach for professional use.", "منصات على شاحنات للاتصالات والمرافق والصناعة والأوراش الكبرى، بارتفاع ومدى مناسبين للاستخدام المهني."),
    image: heroImages.truck,
    kind: "category",
    body: [productLineIntro],
    cards: [
      { title: t("New Eurosky 26|2|13 HQ JIB", "New Eurosky 26|2|13 HQ JIB", "نيو يوروسكاي 26|2|13 HQ JIB"), slug: "piattaforma-aerea-new-eurosky-26-2-13-hq-jib", image: heroImages.truck, range: "26 m", kind: "product" },
      { title: t("New Eurosky 28|2|14 HQ", "New Eurosky 28|2|14 HQ", "نيو يوروسكاي 28|2|14 HQ"), slug: "piattaforma-aerea-new-eurosky-28-2-14-hq", image: heroImages.truck, range: "28 m", kind: "product" },
      { title: t("New Eurosky 31|2|17 HQ JIB", "New Eurosky 31|2|17 HQ JIB", "نيو يوروسكاي 31|2|17 HQ JIB"), slug: "piattaforma-aerea-new-eurosky-31-2-17-hq-jib", image: heroImages.truck, range: "31 m", kind: "product" },
      { title: t("New Eurosky 33|2|16/18 HQ JIB", "New Eurosky 33|2|16/18 HQ JIB", "نيو يوروسكاي 33|2|16/18 HQ JIB"), slug: "piattaforma-aerea-new-eurosky-33-2-16-18-hq-jib", image: heroImages.truck, range: "33 m", kind: "product" },
    ],
  },
  {
    title: t("New Eurosfilo", "New Eurosfilo", "نيو يوروسفيلو"),
    slug: "new-eurosfilo",
    eyebrow: t("Gamme camion", "Truck range", "فئة مفصلية"),
    description: t("Nacelles sur camion de 14 à 24 m de hauteur de travail, avec ou sans jib.", "Articulated solutions for overcoming obstacles, working precisely, and staying stable on complex sites.", "حلول مفصلية لتجاوز العوائق والعمل بدقة والحفاظ على الثبات في المواقع المعقدة."),
    image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Dsc_0034_new4.jpg",
    kind: "category",
    body: [productLineIntro],
    cards: [
      { title: t("New Eurosfilo 17|2|7.85 HQ", "New Eurosfilo 17|2|7.85 HQ", "نيو يوروسفيلو 17|2|7.85 HQ"), slug: "piattaforma-aerea-pronta-consegna-new-eurosfilo-17-2-7-85-hq", image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Dsc_0034_new4.jpg", range: "17 m", kind: "product" },
      { title: t("New Eurosfilo 19|2|7.85 HQ", "New Eurosfilo 19|2|7.85 HQ", "نيو يوروسفيلو 19|2|7.85 HQ"), slug: "piattaforma-aerea-pronta-consegna-new-eurosfilo-19-2-7-8-5-hq", image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Dsc_0034_new4.jpg", range: "19 m", kind: "product" },
      { title: t("New Eurosfilo 24|2|12/14 HQ JIB", "New Eurosfilo 24|2|12/14 HQ JIB", "نيو يوروسفيلو 24|2|12/14 HQ JIB"), slug: "piattaforma-aerea-new-eurosfilo-24-2-12-14-hq-jib", image: "https://www.officinecomet.com/wp-content/uploads/2023/11/Dsc_0034_new4.jpg", range: "24 m", kind: "product" },
    ],
  },
  {
    title: t("New Eurosky T", "New Eurosky T", "نيو يوروسكاي T"),
    slug: "new-eurosky-t",
    eyebrow: t("Grandes hauteurs", "High reach", "ارتفاعات كبيرة"),
    description: t("La gamme des grandes hauteurs : jusqu'à 45 m de hauteur de travail sur camion.", "High-reach range with long-extension telescopic booms.", "فئة للأشغال على ارتفاعات كبيرة بأذرع تلسكوبية ذات امتداد واسع."),
    image: "https://www.officinecomet.com/wp-content/uploads/2024/03/EUROSKY-T45_20_new.jpg",
    kind: "category",
    body: [productLineIntro],
    cards: [
      { title: t("New Eurosky 45|2|20 T", "New Eurosky 45|2|20 T", "نيو يوروسكاي 45|2|20 T"), slug: "piattaforma-aerea-new-eurosky-45-2-20-t", image: "https://www.officinecomet.com/wp-content/uploads/2024/03/EUROSKY-T45_20_new.jpg", range: "45 m", kind: "product" },
    ],
  },
  {
    title: t("Nacelles sur van", "Van mounted", "منصات على فان"),
    slug: "van-mounted",
    eyebrow: t("Véhicules utilitaires", "Commercial vehicles", "مركبات نفعية"),
    description: t("Nacelles installées sur van pour les interventions rapides en ville, la maintenance des bâtiments et les services techniques.", "Van mounted platforms for fast city interventions, building maintenance, and technical services.", "منصات مركبة على الفان للتدخلات السريعة داخل المدن وصيانة المباني والخدمات التقنية."),
    image: heroImages.van,
    kind: "category",
    body: [productLineIntro],
    cards: [
      { title: t("HVM 12 Van", "HVM 12 Van", "HVM 12 فان"), slug: "piattaforma-aerea-hvm-12-van", image: heroImages.van, range: "12 m", kind: "product" },
      { title: t("HVM 14.5 Van", "HVM 14.5 Van", "HVM 14.5 فان"), slug: "piattaforma-aerea-hvm-145-van", image: heroImages.van, range: "14.5 m", kind: "product" },
    ],
  },
  {
    title: t("Mini Trucks", "Mini Trucks", "ميني تراك"),
    slug: "mini-trucks",
    eyebrow: t("Solutions compactes", "Compact solutions", "حلول مدمجة"),
    description: t("Solutions légères pour véhicules compacts, ruelles, sites étroits et accès limités.", "Light solutions for compact vehicles, narrow streets, tight sites, and limited access.", "حلول خفيفة للمركبات المدمجة والأزقة والمواقع الضيقة ومداخل الورش المحدودة."),
    image: "https://www.officinecomet.com/wp-content/uploads/2024/03/Minitrucks-X14-new.jpg",
    kind: "category",
    body: [productLineIntro],
    cards: [
      { title: t("XMini 12", "XMini 12", "XMini 12"), slug: "piattaforma-aerea-xmini-12", image: "https://www.officinecomet.com/wp-content/uploads/2024/03/Minitrucks-X14-new.jpg", range: "12 m", kind: "product" },
      { title: t("XMini 14", "XMini 14", "XMini 14"), slug: "piattaforma-aerea-xmini-14", image: "https://www.officinecomet.com/wp-content/uploads/2024/03/Minitrucks-X14-new.jpg", range: "14 m", kind: "product" },
    ],
  },
  {
    title: t("Xtrailer", "Xtrailer", "إكس ترايلر"),
    slug: "xtrailer",
    eyebrow: t("Nacelles tractables", "Trailer platforms", "منصات مقطورة"),
    description: t("Nacelles tractables autonomes, simples à déplacer et adaptées aux travaux de maintenance légère.", "Self-contained trailer platforms that are easy to move and suited to lighter maintenance work.", "منصات مقطورة مستقلة وسهلة النقل ومناسبة لأعمال الصيانة الخفيفة."),
    image: heroImages.trailer,
    kind: "category",
    body: [productLineIntro],
    cards: [
      { title: t("Xtrailer 12", "Xtrailer 12", "Xtrailer 12"), slug: "piattaforma-aerea-xtrailer-12", image: heroImages.trailer, range: "12 m", kind: "product" },
      { title: t("Xtrailer 14", "Xtrailer 14", "Xtrailer 14"), slug: "piattaforma-aerea-xtrailer-14", image: heroImages.trailer, range: "14 m", kind: "product" },
      { title: t("Xtrailer 14 batteries", "Xtrailer 14 battery", "Xtrailer 14 بطاريات"), slug: "piattaforma-aerea-pronta-consegna-xtrailer-14-batterie", image: heroImages.trailer, range: "14 m", kind: "product" },
    ],
  },
  {
    title: t("Xtractor", "Xtractor", "إكس تراكتور"),
    slug: "xtractor",
    eyebrow: t("Agricole et tout-terrain", "Agricultural and off-road", "زراعي وطرق وعرة"),
    description: t("Nacelles montées sur tracteur, quand le terrain exige traction, stabilité et accès difficile.", "Solutions for tractors and special applications where the terrain requires traction, stability, and difficult access.", "حلول للجرارات والتطبيقات الخاصة عندما يتطلب الموقع جرّا وثباتا وولوجا صعبا."),
    image: "https://www.officinecomet.com/wp-content/uploads/2024/03/officine-comet-x-tractor.jpg",
    kind: "category",
    body: [productLineIntro],
    cards: [
      { title: t("Xtractor 12", "Xtractor 12", "Xtractor 12"), slug: "piattaforma-aerea-xtractor-12", image: "https://www.officinecomet.com/wp-content/uploads/2024/03/officine-comet-x-tractor.jpg", range: "12 m", kind: "product" },
      { title: t("Xtractor 12 2P", "Xtractor 12 2P", "Xtractor 12 2P"), slug: "piattaforma-aerea-xtractor-12-2p", image: "https://www.officinecomet.com/wp-content/uploads/2024/03/officine-comet-x-tractor.jpg", range: "12 m", kind: "product" },
    ],
  },
  {
    title: t("Leopard", "Leopard", "ليوبارد"),
    slug: "leopard",
    eyebrow: t("Nacelles chenillées", "Tracked platforms", "منصات مجنزرة"),
    description: t("Nacelles chenillées pour les sols fragiles, les pentes et les accès où un véhicule classique ne passe pas.", "Tracked platforms for delicate surfaces, slopes, and sites unreachable by conventional vehicles.", "منصات مجنزرة للأسطح الحساسة والمنحدرات والمواقع التي لا تصلها المركبات التقليدية."),
    image: heroImages.tracked,
    kind: "category",
    body: [productLineIntro],
    cards: [
      { title: t("Leopard 14", "Leopard 14", "Leopard 14"), slug: "piattaforma-aerea-leopard-14", image: heroImages.tracked, range: "14 m", kind: "product" },
      { title: t("Leopard 17", "Leopard 17", "Leopard 17"), slug: "piattaforma-aerea-leopard-17", image: heroImages.tracked, range: "17 m", kind: "product" },
      { title: t("Leopard 21", "Leopard 21", "Leopard 21"), slug: "piattaforma-aerea-leopard-21", image: heroImages.tracked, range: "21 m", kind: "product" },
      { title: t("Leopard 25", "Leopard 25", "Leopard 25"), slug: "piattaforma-aerea-leopard-25", image: heroImages.tracked, range: "25 m", kind: "product" },
    ],
  },
];

const newsPages: TargetPage[] = [
  {
    title: t("COMET au GIS 2025", "COMET at GIS 2025", "COMET في معرض GIS 2025"),
    slug: "co-me-t-officine-presente-al-gis-2025",
    eyebrow: t("Salons", "Fairs", "معارض"),
    description: t("Présentation des solutions de travail en hauteur.", "Presentation of height-access solutions.", "عرض حلول العمل على الارتفاع."),
    image: heroImages.news,
    kind: "news",
    date: "10/07/2025",
    body: [
      t("COMET présente ses dernières solutions pour la maintenance, les réseaux, l'éclairage public et les chantiers urbains.", "COMET presents its latest solutions for maintenance, utilities, public lighting, and urban work sites.", "تعرض COMET أحدث حلولها للصيانة والشبكات والإنارة العمومية والأوراش الحضرية."),
    ],
  },
  {
    title: t("COMET au BAUMA 2025", "COMET at BAUMA 2025", "COMET في BAUMA 2025"),
    slug: "co-me-t-officine-presente-al-bauma-2025",
    eyebrow: t("Salons", "Fairs", "معارض"),
    description: t("Les solutions COMET au salon international des machines de construction.", "COMET solutions at the international construction machinery fair.", "حلول COMET في المعرض الدولي لآلات البناء."),
    image: "https://www.officinecomet.com/wp-content/uploads/2025/02/bauma-2025-news-370x230.jpg",
    kind: "news",
    date: "07/04/2025",
    body: [t("Le BAUMA est un rendez-vous central pour découvrir les évolutions techniques des nacelles.", "BAUMA is a key event for discovering technical progress in aerial platforms.", "يعد BAUMA موعدا رئيسيا لاكتشاف التطورات التقنية في منصات العمل الجوية.")],
  },
  {
    title: t("COMET au BAUMA INDIA 2024", "COMET at BAUMA INDIA 2024", "COMET في BAUMA INDIA 2024"),
    slug: "co-me-t-officine-presente-al-bauma-india-2024",
    eyebrow: t("Salons", "Fairs", "معارض"),
    description: t("Présence internationale et retour d'expérience sur des marchés exigeants.", "International presence and field learning from demanding markets.", "حضور دولي وخبرة ميدانية من أسواق ذات متطلبات عالية."),
    image: "https://www.officinecomet.com/wp-content/uploads/2024/10/bauma-india-news-370x230.jpg",
    kind: "news",
    date: "11/12/2024",
    body: [t("L'expérience internationale nourrit les recommandations techniques proposées aux clients.", "International experience informs the technical recommendations offered to clients.", "تغذي الخبرة الدولية التوصيات التقنية المقدمة للزبناء.")],
  },
  {
    title: t("Livraison de plateformes ENEL", "ENEL platform delivery", "تسليم منصات ENEL"),
    slug: "consegna-piattaforme-enel-comet",
    eyebrow: t("Référence", "Reference", "مرجع"),
    description: t("Un exemple de fourniture pour de grands opérateurs aux exigences techniques strictes.", "A supply example for large operators with strict technical requirements.", "مثال على توريد لفائدة مشغلين كبار بمتطلبات تقنية دقيقة."),
    image: "https://www.officinecomet.com/wp-content/uploads/2023/11/quadrato-home2.jpg",
    kind: "news",
    date: "15/11/2023",
    body: [t("Ces références illustrent la capacité de COMET à livrer des configurations fiables pour des parcs professionnels.", "These references show COMET's ability to deliver reliable configurations for professional fleets.", "توضح هذه المراجع قدرة COMET على توفير تجهيزات موثوقة للأساطيل المهنية.")],
  },
];

const infoPages: TargetPage[] = [
  {
    title: t("Notre Histoire", "Our History", "تاريخنا"),
    slug: "history",
    eyebrow: t("L'entreprise", "The Company", "الشركة"),
    description: t("Depuis 1960, CO.ME.T. Officine consolide sa réputation de leader.", "Since 1960, CO.ME.T. Officine has established its reputation as a leader.", "منذ عام 1960، رسخت CO.ME.T. Officine سمعتها كشركة رائدة."),
    image: "https://www.officinecomet.com/wp-content/uploads/2023/11/quadrato-home2.jpg",
    kind: "page",
    body: [
      t(
        "Tout commence en 1960, lorsque le Commendatore Valter Aleotti décide de lancer son entreprise avec un petit groupe d'ingénieurs : CO.ME.T. Officine est née.",
        "Everything began in 1960, when Commander Valter Aleotti decided to start his business. With a small group of talented engineers, he founded Co.me.t Officine.",
        "بدأ كل شيء في عام 1960 عندما قرر القائد فالتر أليوتي بدء مشروعه."
      ),
      t(
        "En 1961, CO.ME.T. présente sa première gamme de nacelles sur camion, baptisée SKYWORKER.",
        "In 1961, Co.me.t. introduced its first range of truck-mounted platforms called SKYWORKER.",
        "في عام 1961، قدمت Co.me.t. مجموعتها الأولى من المنصات."
      ),
      t(
        "Aujourd'hui, un réseau d'une quarantaine de distributeurs permet de répondre aux besoins des clients dans le monde entier.",
        "Today we boast an extensive network of about 40 distributors allowing us to meet customer needs around the world.",
        "واليوم، نفخر بشبكة واسعة من الموزعين تلبي احتياجات العملاء حول العالم."
      )
    ]
  },
  {
    title: t("Certifications", "Certifications", "الشهادات"),
    slug: "certificazioni",
    eyebrow: t("Qualité et sécurité", "Quality and safety", "الجودة والسلامة"),
    description: t("Standards, documentation et accompagnement pour les projets de nacelles.", "Standards, documentation, and support for aerial platform projects.", "معايير ووثائق ومواكبة لمشاريع منصات العمل."),
    image: "https://www.officinecomet.com/wp-content/uploads/2024/02/foto-aerea-2.jpg",
    kind: "page",
    body: [
      t("La qualité COMET repose sur des procédures contrôlées et une attention constante à la sécurité.", "COMET quality relies on controlled procedures and constant attention to safety.", "تعتمد جودة COMET على إجراءات مضبوطة واهتمام دائم بالسلامة."),
    ],
  },
  {
    title: t("Code éthique", "Code of ethics", "مدونة الأخلاقيات"),
    slug: "codice-etico",
    eyebrow: t("Entreprise", "Company", "الشركة"),
    description: t("Principes de transparence, de responsabilité et de relation commerciale durable.", "Principles of transparency, responsibility, and sustainable business relationships.", "مبادئ الشفافية والمسؤولية والعلاقة التجارية المستدامة."),
    image: "https://www.officinecomet.com/wp-content/uploads/2023/11/quadrato-home2.jpg",
    kind: "page",
    body: [t("Ces principes guident les relations avec clients, partenaires, fournisseurs et collaborateurs.", "These principles guide relationships with customers, partners, suppliers, and collaborators.", "توجه هذه المبادئ العلاقات مع الزبناء والشركاء والموردين والمتعاونين.")],
  },
  {
    title: t("Travailler avec nous", "Work with us", "اعملوا معنا"),
    slug: "lavora-con-noi",
    eyebrow: t("Partenariat", "Partnership", "شراكة"),
    description: t("Opportunités pour distributeurs, techniciens et partenaires.", "Opportunities for dealers, technicians, and partners.", "فرص للموزعين والتقنيين والشركاء."),
    image: heroImages.service,
    kind: "page",
    body: [t("COMET cherche des partenaires capables de développer la vente, l'assistance et la présence locale.", "COMET seeks partners able to develop sales, support, and local presence.", "تبحث COMET عن شركاء قادرين على تطوير البيع والدعم والحضور المحلي.")],
  },
  {
    title: t("Politique de confidentialité", "Privacy policy", "سياسة الخصوصية"),
    slug: "privacy-policy",
    eyebrow: t("Légal", "Legal", "قانوني"),
    description: t("Informations sur les données envoyées via les formulaires et les contacts commerciaux.", "Information about data sent through forms and commercial contacts.", "معلومات حول البيانات المرسلة عبر النماذج والاتصالات التجارية."),
    image: heroImages.service,
    kind: "page",
    body: [t("Les données sont utilisées pour traiter les demandes de devis, d'assistance et de rappel commercial.", "Data is used to process quotation, support, and sales callback requests.", "تستعمل البيانات لمعالجة طلبات العروض والدعم والاتصال التجاري.")],
  },
  {
    title: t("Politique cookies", "Cookie policy", "سياسة ملفات الارتباط"),
    slug: "cookie-policy",
    eyebrow: t("Légal", "Legal", "قانوني"),
    description: t("Informations sur les cookies techniques et les outils nécessaires au fonctionnement du site.", "Information about technical cookies and tools required for site operation.", "معلومات حول ملفات الارتباط التقنية والأدوات الضرورية لعمل الموقع."),
    image: heroImages.service,
    kind: "page",
    body: [t("Le site peut utiliser des cookies techniques pour la sécurité, le fonctionnement et la mesure essentielle.", "The site may use technical cookies for security, operation, and essential measurement.", "قد يستعمل الموقع ملفات ارتباط تقنية للأمان والتشغيل والقياس الأساسي.")],
  },
];

/** the model lines shown on each category page; none where the catalogue has no list yet */
const categoryLines: Record<string, string[]> = {
  "piattaforme-aeree-telescopiche": ["new-eurosfilo"],
  "piattaforme-aeree-articolate": ["new-eurosky", "new-eurosky-heavy-duty", "new-eurosky-t"],
  "piattaforme-van": ["van-mounted"],
  "piattaforme-aeree-cingolate": ["leopard"],
  "piattaforme-aeree-trainabili": ["xtrailer"],
};

const allProductCards = () => productLines.flatMap((line) => line.cards ?? []);

const cardsForCategory = (slug: string) =>
  (categoryLines[slug] ?? []).flatMap((lineSlug) => productLines.find((line) => line.slug === lineSlug)?.cards ?? []);

const targetCategoryPages: TargetPage[] = targetCategories.map((category) => ({
  title: category.title,
  slug: category.slug,
  eyebrow: t("Catégorie", "Category", "فئة"),
  description: category.excerpt ?? t("Gamme COMET.", "COMET range.", "فئة COMET."),
  image: category.image,
  kind: "category",
  body: [productLineIntro],
  cards: cardsForCategory(category.slug),
}));

const productPages: TargetPage[] = allProductCards().map((product) => ({
  title: product.title,
  slug: product.slug,
  eyebrow: t("Modèle", "Model", "نموذج"),
  description: t(
    `${textFor(product.title, "fr")} : nacelle COMET configurable selon le véhicule porteur, la hauteur de travail et l'accès.`,
    `${textFor(product.title, "en")} is a COMET platform configurable by vehicle, height, and access.`,
    `${textFor(product.title, "ar")} منصة COMET قابلة للتكوين حسب المركبة والارتفاع والولوج.`
  ),
  image: product.image,
  kind: "product",
  specs: [
    { label: t("Hauteur de travail", "Working height", "ارتفاع العمل"), value: t(product.range ?? "Sur demande", product.range ?? "On request", product.range ?? "حسب الطلب") },
    { label: t("Configuration", "Configuration", "التكوين"), value: t("Selon votre véhicule porteur", "To suit your carrier vehicle", "حسب المركبة الحاملة") },
    { label: t("Fiche technique", "Technical sheet", "البطاقة التقنية"), value: t("Version officielle COMET, sur demande", "Official COMET version, on request", "النسخة الرسمية عند الطلب") },
  ],
  body: [
    t("La configuration finale dépend du véhicule porteur, de la charge utile, du terrain, des accessoires et des exigences de sécurité.", "Final configuration depends on the carrier vehicle, payload, terrain, accessories, and safety requirements.", "يعتمد التكوين النهائي على المركبة الحاملة والحمولة والتضاريس والملحقات ومتطلبات السلامة."),
    t("COMET Maroc confirme la compatibilité, les délais, les documents techniques et la disponibilité pour votre projet.", "COMET Morocco confirms compatibility, lead time, technical documents and availability for your project.", "يمكن لـ COMET تأكيد التوافق والآجال والوثائق التقنية والتوفر لمشروعكم."),
  ],
}));

export const targetPages: TargetPage[] = [
  ...targetCategoryPages,
  ...productLines,
  ...productPages,
  ...newsPages,
  ...infoPages,
];

export const normalizeSlug = (pathname: string) =>
  pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean).at(-1) ?? "";

export const findTargetPage = (pathname: string) => {
  const slug = normalizeSlug(pathname);
  return targetPages.find((page) => page.slug === slug);
};

export const createFallbackTargetPage = (pathname: string): TargetPage => {
  const slug = normalizeSlug(pathname) || "page";
  const title = slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: t(title, title, title),
    slug,
    eyebrow: t("COMET Maroc", "COMET Morocco", "COMET Maroc"),
    description: t(
      "Page dynamique.",
      "Dynamic page.",
      "صفحة ديناميكية."
    ),
    image: heroImages.truck,
    kind: "page",
    body: [
      t(
        "Cette URL reste navigable.",
        "This URL remains navigable.",
        "يبقى هذا الرابط قابلا للتصفح."
      ),
    ],
  };
};
