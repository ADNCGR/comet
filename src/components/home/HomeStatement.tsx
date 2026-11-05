import { useRef } from "react";
import { HOME } from "@/data/home";
import { useScrollProgress } from "@/hooks/useReveal";
import { useLang } from "@/lib/locale";
import { Lines } from "@/components/Lines";

/** A whole screen, a photo settling as it passes, two lines bold in the middle. */
export const HomeStatement = () => {
  const { pick } = useLang();
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, "pass");
  const copy = HOME.statement;

  return (
    <section ref={ref} className="hs" aria-label={pick(copy.lines).join(" ")}>
      <div className="hs-media" aria-hidden="true">
        <img src={copy.image} alt="" loading="lazy" decoding="async" />
      </div>
      <Lines as="p" className="screen-title" lines={pick(copy.lines)} />
      <p className="hs-caption wrap rise">{pick(copy.caption)}</p>
    </section>
  );
};
