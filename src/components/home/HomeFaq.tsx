import { HOME } from "@/data/home";
import { useLang } from "@/lib/locale";
import { Lines } from "@/components/Lines";
import { Faq } from "@/components/Faq";

export const HomeFaq = () => {
  const { pick } = useLang();
  const copy = HOME.faq;
  const items = copy.items.map((item) => ({ q: pick(item.q), a: pick(item.a) }));

  return (
    <section className="hfaq on-paper section" aria-labelledby="faq-title">
      <div className="wrap hfaq-grid">
        <header>
          <span className="eyebrow">{pick(copy.eyebrow)}</span>
          <Lines id="faq-title" className="t-h2" lines={pick(copy.title)} />
        </header>
        <div className="rise">
          <Faq items={items} schema />
        </div>
      </div>
    </section>
  );
};
