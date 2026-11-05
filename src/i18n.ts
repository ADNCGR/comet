import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationFR from "./locales/fr/translation.json";
import translationEN from "./locales/en/translation.json";

/*
 * French is the site's language and the default for every visitor; English is
 * one click away and remembered. The Arabic and Italian files stay in
 * src/locales for later, but are not offered until the pages are translated.
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: translationFR },
      en: { translation: translationEN },
    },
    supportedLngs: ["fr", "en"],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    fallbackLng: "fr",
    detection: {
      // only an explicit choice switches the language, never the browser's
      order: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
