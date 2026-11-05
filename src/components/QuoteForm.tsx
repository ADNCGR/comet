import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { CONTACT, mailHref, whatsappHref } from "@/config/contact";
import { useLang, type Copy } from "@/lib/locale";
import { WhatsAppIcon } from "@/components/icons";
import "./QuoteForm.css";

/** Web3Forms key, set in the hosting's environment (never in the code). */
const ACCESS_KEY = ((import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ?? "").trim();

export const RANGE_OPTIONS: { value: string; label: Copy }[] = [
  { value: "", label: { fr: "Conseillez-moi", en: "Advise me" } },
  { value: "pickup", label: { fr: "Sur pick-up 4×4", en: "On a 4×4 pick-up" } },
  { value: "van", label: { fr: "Sur van ou fourgon", en: "On a van" } },
  { value: "camion-telescopique", label: { fr: "Sur camion, bras télescopique", en: "On a truck, telescopic boom" } },
  { value: "camion-articulee", label: { fr: "Sur camion, bras articulé", en: "On a truck, articulated boom" } },
  { value: "chenillee", label: { fr: "Chenillée", en: "Tracked" } },
  { value: "tractable", label: { fr: "Tractable ou sur tracteur", en: "Towable or tractor-mounted" } },
  { value: "isolee", label: { fr: "Isolée, pour réseaux électriques", en: "Insulated, for power lines" } },
  { value: "autre", label: { fr: "Autre besoin", en: "Something else" } },
];

const NEEDS: { value: string; label: Copy }[] = [
  { value: "neuf", label: { fr: "Achat neuf", en: "New machine" } },
  { value: "stock", label: { fr: "Stock ou occasion", en: "Stock or used" } },
  { value: "demo", label: { fr: "Démonstration", en: "Demo" } },
  { value: "sav", label: { fr: "Pièces et SAV", en: "Parts and service" } },
];

type Status = "idle" | "sending" | "sent" | "error" | "handoff";

/**
 * The quote request. With a Web3Forms key it is sent by e-mail; without one it
 * opens WhatsApp with the request written out, so no request is ever lost.
 * ?modele=, ?gamme= and ?projet= (neuf, stock, demo, sav) in the URL fill it
 * in from the page the visitor came from.
 */
export const QuoteForm = ({ id = "devis", source = "site" }: { id?: string; source?: string }) => {
  const { pick } = useLang();
  const [params] = useSearchParams();
  const model = params.get("modele") ?? "";
  const presetRange = RANGE_OPTIONS.some((o) => o.value === params.get("gamme")) ? params.get("gamme")! : "";
  const presetNeed = NEEDS.find((n) => n.value === params.get("projet"))?.value ?? "neuf";
  const [need, setNeed] = useState(presetNeed);
  const [status, setStatus] = useState<Status>("idle");
  const [summary, setSummary] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const range = RANGE_OPTIONS.find((o) => o.value === get("range")) ?? RANGE_OPTIONS[0];
    const project = NEEDS.find((n) => n.value === need) ?? NEEDS[0];
    const text = [
      `${pick({ fr: "Nom", en: "Name" })} : ${get("name")}`,
      get("company") && `${pick({ fr: "Entreprise", en: "Company" })} : ${get("company")}`,
      `${pick({ fr: "Téléphone", en: "Phone" })} : ${get("phone")}`,
      get("email") && `E-mail : ${get("email")}`,
      get("city") && `${pick({ fr: "Ville", en: "City" })} : ${get("city")}`,
      `${pick({ fr: "Nacelle", en: "Platform" })} : ${pick(range.label)}`,
      `${pick({ fr: "Projet", en: "Project" })} : ${pick(project.label)}`,
      get("message") && `\n${get("message")}`,
    ]
      .filter(Boolean)
      .join("\n");
    setSummary(text);

    if (!ACCESS_KEY) {
      const intro = pick({ fr: "Bonjour COMET Maroc, voici ma demande de devis :", en: "Hello COMET Morocco, here is my quote request:" });
      window.open(whatsappHref(`${intro}\n\n${text}`), "_blank", "noopener,noreferrer");
      setStatus("handoff");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Demande de devis : ${get("company") || get("name")}`,
          from_name: "Site COMET Maroc",
          name: get("name"),
          email: get("email") || undefined,
          phone: get("phone"),
          message: text,
          source,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) throw new Error(result.message || response.statusText);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const waText = `${pick({ fr: "Bonjour COMET Maroc, voici ma demande de devis :", en: "Hello COMET Morocco, here is my quote request:" })}\n\n${summary}`;
  const done = status === "sent" || status === "handoff";

  return (
    <div className="qf" id={id}>
      {status === "sent" && (
        <div className="qf-done" role="status">
          <span className="qf-done-mark" aria-hidden="true">
            <Check />
          </span>
          <h3 className="t-h3">{pick({ fr: "Merci, votre demande est envoyée.", en: "Thank you, your request is on its way." })}</h3>
          <p>
            {pick({
              fr: "Nous revenons vers vous rapidement. Une urgence ? Appelez-nous directement.",
              en: "We will get back to you shortly. Urgent? Call us directly.",
            })}
          </p>
          <div className="qf-done-actions">
            <a className="btn btn--line" href={CONTACT.phoneHref}>
              <Phone aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <button type="button" className="link-arrow" onClick={() => setStatus("idle")}>
              {pick({ fr: "Faire une autre demande", en: "Send another request" })}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {status === "handoff" && (
        <div className="qf-done" role="status">
          <span className="qf-done-mark qf-done-mark--wa" aria-hidden="true">
            <WhatsAppIcon />
          </span>
          <h3 className="t-h3">{pick({ fr: "Votre demande est prête dans WhatsApp.", en: "Your request is ready in WhatsApp." })}</h3>
          <p>
            {pick({
              fr: "Il ne reste qu'à l'envoyer. WhatsApp ne s'est pas ouvert ? Rouvrez-le, ou envoyez la même demande par e-mail.",
              en: "All that is left is to send it. WhatsApp didn't open? Open it again, or send the same request by e-mail.",
            })}
          </p>
          <div className="qf-done-actions">
            <a className="btn btn--wa" href={whatsappHref(waText)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {pick({ fr: "Rouvrir WhatsApp", en: "Open WhatsApp" })}
            </a>
            <a className="btn btn--line" href={mailHref(pick({ fr: "Demande de devis", en: "Quote request" }), summary)}>
              <Mail aria-hidden="true" />
              {pick({ fr: "Par e-mail", en: "By e-mail" })}
            </a>
            <button type="button" className="link-arrow" onClick={() => setStatus("idle")}>
              {pick({ fr: "Modifier ma demande", en: "Edit my request" })}
            </button>
          </div>
        </div>
      )}

      <form className="qf-form" onSubmit={onSubmit} hidden={done}>
        <div className="qf-grid">
          <label className="field">
            <span>{pick({ fr: "Nom et prénom", en: "Full name" })} *</span>
            <input name="name" required autoComplete="name" />
          </label>
          <label className="field">
            <span>
              {pick({ fr: "Entreprise", en: "Company" })} <em>{pick({ fr: "(facultatif)", en: "(optional)" })}</em>
            </span>
            <input name="company" autoComplete="organization" />
          </label>
          <label className="field">
            <span>{pick({ fr: "Téléphone", en: "Phone" })} *</span>
            <input
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="06 12 34 56 78"
              pattern="[0-9\s+.\-\(\)]{8,}"
              title={pick({ fr: "Un numéro de téléphone, 8 chiffres au moins", en: "A phone number, at least 8 digits" })}
            />
          </label>
          <label className="field">
            <span>
              E-mail <em>{pick({ fr: "(facultatif)", en: "(optional)" })}</em>
            </span>
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label className="field">
            <span>{pick({ fr: "Ville du chantier", en: "Site city" })}</span>
            <input name="city" autoComplete="address-level2" placeholder="Casablanca" />
          </label>
          <label className="field">
            <span>{pick({ fr: "Type de nacelle", en: "Platform type" })}</span>
            <select name="range" defaultValue={presetRange}>
              {RANGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {pick(option.label)}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="qf-needs qf-wide">
            <legend>{pick({ fr: "Votre projet", en: "Your project" })}</legend>
            <div>
              {NEEDS.map((item) => (
                <label key={item.value} className="qf-chip">
                  <input type="radio" name="need" value={item.value} checked={need === item.value} onChange={() => setNeed(item.value)} />
                  <span>{pick(item.label)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field qf-wide">
            <span>
              {pick({ fr: "Votre chantier", en: "Your job" })}{" "}
              <em>{pick({ fr: "(hauteur de travail, type d'intervention, délais…)", en: "(working height, type of work, timing…)" })}</em>
            </span>
            <textarea name="message" rows={5} defaultValue={model ? `${pick({ fr: "Modèle", en: "Model" })} : ${model}\n` : ""} />
          </label>

          <input type="checkbox" name="botcheck" className="qf-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        </div>

        {status === "error" && (
          <p className="qf-error" role="alert">
            {pick({
              fr: "L'envoi n'a pas abouti. Réessayez, ou envoyez la même demande sur WhatsApp.",
              en: "Sending failed. Try again, or send the same request on WhatsApp.",
            })}{" "}
            <a href={whatsappHref(waText)} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </p>
        )}

        <div className="qf-foot">
          {ACCESS_KEY ? (
            <button type="submit" className="btn btn--solid" disabled={status === "sending"}>
              {status === "sending" ? pick({ fr: "Envoi…", en: "Sending…" }) : pick({ fr: "Envoyer la demande", en: "Send the request" })}
              {status !== "sending" && <ArrowRight aria-hidden="true" />}
            </button>
          ) : (
            <button type="submit" className="btn btn--wa">
              <WhatsAppIcon />
              {pick({ fr: "Envoyer via WhatsApp", en: "Send via WhatsApp" })}
            </button>
          )}
          <p className="qf-note">
            {ACCESS_KEY
              ? pick({ fr: "Nous vous rappelons ou vous écrivons, selon vos coordonnées.", en: "We call or write back, using the details you give." })
              : pick({ fr: "Votre demande s'ouvre dans WhatsApp, prête à envoyer.", en: "Your request opens in WhatsApp, ready to send." })}
          </p>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
