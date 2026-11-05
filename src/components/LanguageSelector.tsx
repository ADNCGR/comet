import { LANGS, useLang } from "@/lib/locale";
import { cn } from "@/lib/utils";

/** FR | EN, the current one filled. Switches in place, remembered for the next visit. */
export const LanguageSelector = ({ className }: { className?: string }) => {
  const { lang, setLang, pick } = useLang();
  return (
    <div className={cn("lang", className)} role="group" aria-label={pick({ fr: "Langue", en: "Language" })}>
      {LANGS.map((item) => (
        <button
          key={item.code}
          type="button"
          lang={item.code}
          title={item.name}
          aria-pressed={lang === item.code}
          onClick={() => setLang(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
