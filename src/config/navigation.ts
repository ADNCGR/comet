import type { Copy } from "@/lib/locale";

export type NavItem = {
  to: string;
  label: Copy;
  /** every path that counts as this page (French, English and legacy Italian slugs) */
  match: readonly string[];
};

/** The main menu, in the order a buyer goes through it. */
export const NAV_LINKS: NavItem[] = [
  { to: "/produits", label: { fr: "Gammes", en: "Ranges" }, match: ["/produits", "/products", "/piattaforme-aeree"] },
  { to: "/occasion", label: { fr: "Stock & occasion", en: "Stock & used" }, match: ["/occasion", "/usato", "/used", "/aerial-platform-"] },
  { to: "/service", label: { fr: "Service", en: "Service" }, match: ["/service", "/assistenza"] },
  { to: "/a-propos", label: { fr: "Entreprise", en: "Company" }, match: ["/a-propos", "/azienda", "/about", "/history", "/histoire", "/la-storia", "/certifications", "/certificazioni"] },
  { to: "/actualites", label: { fr: "Actualités", en: "News" }, match: ["/actualites", "/news"] },
  { to: "/contact", label: { fr: "Contact", en: "Contact" }, match: ["/contact", "/contatti"] },
];

export const isActivePath = (pathname: string, match: readonly string[]) =>
  match.some((m) => (m.endsWith("-") ? pathname.startsWith(m) : pathname === m || pathname.startsWith(`${m}/`)));
