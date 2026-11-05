import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { CompanyLinks } from "@/components/CompanyLinks";
import { useLang, type Copy } from "@/lib/locale";

const PDF = "https://www.officinecomet.com/wp-content/uploads/2026/03";
const CERTS: { name: string; text: Copy; href: string }[] = [
  { name: "ISO 9001:2015", text: { fr: "Qualité : conception, production et assistance de nacelles sur véhicules, remorques et carrosseries.", en: "Quality: design, production and service of vehicle-mounted platforms, trailers and bodywork." }, href: `${PDF}/Cert-ISO-9001-39-00-1122509_Main_IT.pdf` },
  { name: "ISO 14001:2015", text: { fr: "Environnement : soudure, découpe, tournage et assemblage des nacelles.", en: "Environment: welding, cutting, turning and assembly of platforms." }, href: `${PDF}/Cert-ISO-14001-01-104-2517552_TA_IT.pdf` },
  { name: "ISO 45001:2018", text: { fr: "Santé et sécurité au travail : soudure, assemblage, peinture, remorques.", en: "Health and safety at work: welding, assembly, painting, trailers." }, href: `${PDF}/Cert-ISO-45001-01-213-2517552_TA_IT.pdf` },
  { name: "ISO 37001:2016", text: { fr: "Management anticorruption de l'ensemble des activités.", en: "Anti-bribery management across all activities." }, href: `${PDF}/Cert-ISO-37001-01-316-2517552_TA_IT.pdf` },
  { name: "ISO 50001:2018", text: { fr: "Management de l'énergie des procédés de fabrication.", en: "Energy management of the manufacturing processes." }, href: `${PDF}/Cert-ISO-50001-01-407-2517552_TA_IT.pdf` },
  { name: "UNI PdR 125:2022", text: { fr: "Égalité femmes-hommes au travail.", en: "Gender equality at work." }, href: `${PDF}/Cert-UNI-PDR-125-39-125-1352511_Main_IT.pdf` },
];

const Certifications = () => {
  const { pick } = useLang();
  return (
    <PageTemplate
      seo={{
        path: "/certifications",
        title: pick({ fr: "Certifications ISO du constructeur C.O.M.E.T. | COMET Maroc", en: "C.O.M.E.T. ISO certifications | COMET Morocco" }),
        description: pick({ fr: "ISO 9001, 14001, 45001, 37001, 50001 : les certifications TÜV Rheinland de CO.ME.T. Officine S.p.A.", en: "ISO 9001, 14001, 45001, 37001, 50001: the TÜV Rheinland certifications of CO.ME.T. Officine S.p.A." }),
      }}
      hero={{
        eyebrow: pick({ fr: "Entreprise", en: "Company" }),
        title: pick({ fr: ["Certifié", "à chaque étape."], en: ["Certified", "at every step."] }),
        text: pick({ fr: "Les systèmes de management du constructeur, CO.ME.T. Officine S.p.A., sont certifiés par TÜV Rheinland.", en: "The manufacturer's management systems are certified by TÜV Rheinland." }),
        image: "https://www.officinecomet.com/wp-content/uploads/2024/02/certification-3.jpg",
        size: "sm",
      }}
      crumbs={[{ label: pick({ fr: "À propos", en: "About" }), to: "/a-propos" }, { label: "Certifications" }]}
    >
      <section className="section">
        <div className="wrap pg-docs">
          {CERTS.map((c, i) => (
            <a key={c.name} className="pg-doc rise" style={{ "--i": i % 3 } as CSSProperties} href={c.href} target="_blank" rel="noopener noreferrer">
              <span className="pg-doc-kind">Certification</span>
              <h3>{c.name}</h3>
              <p>{pick(c.text)}</p>
              <span className="link-arrow">
                {pick({ fr: "Certificat (PDF, italien)", en: "Certificate (PDF, Italian)" })}
                <ArrowRight aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>
      <CompanyLinks current="/certifications" />
    </PageTemplate>
  );
};

export default Certifications;
