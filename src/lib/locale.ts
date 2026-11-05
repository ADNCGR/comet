import { useTranslation } from "react-i18next";

/** The languages the site speaks. French is the reference; English on request. */
export type Lang = "fr" | "en";

/** A piece of copy in every language the site speaks. */
export type Copy<T = string> = { fr: T; en: T };

export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "en", label: "EN", name: "English" },
];

/**
 * The current language, a picker for bilingual copy, and the switch.
 * Components that call it re-render when the language changes; no reload.
 */
export function useLang() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language || "fr";
  const lang: Lang = current.startsWith("en") ? "en" : "fr";
  const pick = <T,>(copy: Copy<T>): T => copy[lang];
  const setLang = (next: Lang) => {
    void i18n.changeLanguage(next);
  };
  return { lang, pick, setLang };
}
