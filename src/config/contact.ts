/**
 * COMET Maroc: every number, address and link the site shows comes from here.
 * Change a value once and the header, footer, forms, WhatsApp links and SEO follow.
 */
export const CONTACT = {
  brand: "COMET Maroc",
  legalName: "COMET Morocco",
  phone: "+212 640 850 380",
  phoneHref: "tel:+212640850380",
  /** international format without "+", as wa.me expects it */
  whatsapp: "212640850380",
  email: "contact@cometmaroc.com",
  city: "Casablanca",
  country: { fr: "Maroc", en: "Morocco" },
} as const;

/** the first WhatsApp message, before the visitor writes anything */
export const WHATSAPP_HELLO = {
  fr: "Bonjour COMET Maroc, je souhaite des informations commerciales sur vos nacelles.",
  en: "Hello COMET Morocco, I would like commercial information about your aerial platforms.",
} as const;

export const whatsappHref = (text: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailHref = (subject?: string, body?: string) => {
  const query = [
    subject ? `subject=${encodeURIComponent(subject)}` : "",
    body ? `body=${encodeURIComponent(body)}` : "",
  ]
    .filter(Boolean)
    .join("&");
  return `mailto:${CONTACT.email}${query ? `?${query}` : ""}`;
};
