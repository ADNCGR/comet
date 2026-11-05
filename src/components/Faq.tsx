import { useEffect, useId, useState } from "react";
import "./Faq.css";

type FaqItem = { q: string; a: string };

/**
 * Questions that open one at a time, on a click. With `schema`, the page also
 * carries them as FAQPage structured data for search engines.
 */
export const Faq = ({ items, schema = false }: { items: FaqItem[]; schema?: boolean }) => {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId().replace(/:/g, "");

  const jsonLd = schema
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      })
    : "";

  useEffect(() => {
    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = `faq-jsonld-${uid}`;
    script.textContent = jsonLd;
    document.head.appendChild(script);
    return () => script.remove();
  }, [jsonLd, uid]);

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="faq-item" data-open={isOpen || undefined}>
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq-sign" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-panel" id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`}>
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
