import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HOME } from "@/data/home";
import { useScrollProgress } from "@/hooks/useReveal";
import { useLang } from "@/lib/locale";
import { Lines } from "@/components/Lines";

/** Five steps; a line fills down the list as it is read. */
export const HomeProcess = () => {
  const { pick } = useLang();
  const stepsRef = useRef<HTMLOListElement>(null);
  useScrollProgress(stepsRef, "pass");
  const copy = HOME.process;

  return (
    <section className="hp on-dark section" aria-labelledby="process-title">
      <div className="wrap hp-grid">
        <div className="hp-head">
          <span className="eyebrow">{pick(copy.eyebrow)}</span>
          <Lines id="process-title" className="t-h2" lines={pick(copy.title)} />
          <p className="t-lead rise">{pick(copy.text)}</p>
          <Link to="/contact#devis" className="btn btn--light rise">
            {pick({ fr: "Commencer par un devis", en: "Start with a quote" })}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <ol ref={stepsRef} className="hp-steps">
          {copy.steps.map((step, i) => (
            <li key={step.title.fr} className="hp-step rise">
              <span className="hp-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="t-h3">{pick(step.title)}</h3>
                <p className="hp-time">{pick(step.time)}</p>
                <p className="t-body">{pick(step.text)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
