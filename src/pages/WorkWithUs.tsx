import { Mail } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { CompanyLinks } from "@/components/CompanyLinks";
import { CONTACT, mailHref } from "@/config/contact";
import { useLang } from "@/lib/locale";

export const WorkWithUs = () => {
  const { pick } = useLang();
  const title = pick({ fr: "Nous rejoindre", en: "Join us" });
  return (
    <PageTemplate
      seo={{
        path: "/nous-rejoindre",
        title: `${title} | COMET Maroc`,
        description: pick({ fr: "Technique, commerce, service après-vente, revendeurs : envoyez votre candidature à COMET Maroc.", en: "Technical, sales, service, dealers: send your application to COMET Morocco." }),
      }}
      hero={{
        eyebrow: pick({ fr: "Carrières", en: "Careers" }),
        title: pick({ fr: ["Nous", "rejoindre."], en: ["Join", "us."] }),
        text: pick({ fr: "Technique, commerce, service : rejoignez l'équipe qui équipe les chantiers marocains.", en: "Technical, sales, service: join the team equipping Moroccan job sites." }),
        image: "https://www.officinecomet.com/wp-content/uploads/2024/02/lavora-con-noi3.jpg",
        size: "sm",
      }}
      crumbs={[{ label: pick({ fr: "À propos", en: "About" }), to: "/a-propos" }, { label: title }]}
    >
      <section className="section">
        <div className="wrap">
          <div className="pg-band rise">
            <div>
              <h2>{pick({ fr: "Candidature spontanée", en: "Open application" })}</h2>
              <p>
                {pick({
                  fr: `Envoyez votre CV et quelques lignes à ${CONTACT.email}, en précisant le métier visé. Revendeurs et partenaires : écrivez-nous aussi.`,
                  en: `Send your CV and a few lines to ${CONTACT.email}, naming the job you want. Dealers and partners: write to us too.`,
                })}
              </p>
            </div>
            <div className="pg-band-actions">
              <a className="btn btn--light" href={mailHref(pick({ fr: "Candidature COMET Maroc", en: "Application COMET Morocco" }))}>
                <Mail aria-hidden="true" />
                {pick({ fr: "Envoyer ma candidature", en: "Send my application" })}
              </a>
            </div>
          </div>
        </div>
      </section>
      <CompanyLinks current="/nous-rejoindre" />
    </PageTemplate>
  );
};

export default WorkWithUs;
