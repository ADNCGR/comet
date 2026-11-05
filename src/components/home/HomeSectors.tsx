import { HOME } from "@/data/home";
import { useLang } from "@/lib/locale";
import { Lines } from "@/components/Lines";

/** The trades that work at height, one big line each, coming up as they are reached. */
export const HomeSectors = () => {
  const { pick } = useLang();
  const copy = HOME.sectors;

  return (
    <section className="hsec section" aria-labelledby="sectors-title">
      <div className="wrap">
        <header className="hsec-head">
          <span className="eyebrow">{pick(copy.eyebrow)}</span>
          <Lines id="sectors-title" className="t-h2" lines={pick(copy.title)} />
        </header>
        <ul className="hsec-list">
          {copy.items.map((item, i) => (
            <li key={item.name.fr} className="hsec-row">
              <span className="hsec-i" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Lines as="h3" className="hsec-name" lines={[pick(item.name)]} />
              <p className="hsec-text rise">{pick(item.text)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
