import { Link, useLocation } from "react-router-dom";
import { PageTemplate } from "@/components/PageTemplate";
import { useLang } from "@/lib/locale";

/** An address that leads nowhere: say so, and offer the usual ways on. */
const NotFound = () => {
  const { pathname } = useLocation();
  const { pick } = useLang();

  return (
    <PageTemplate
      seo={{
        path: pathname || "/404",
        title: pick({ fr: "Page introuvable | COMET Maroc", en: "Page not found | COMET Morocco" }),
        description: pick({ fr: "Cette page n'existe pas ou a été déplacée.", en: "This page does not exist or has moved." }),
        noindex: true,
      }}
      hero={{
        eyebrow: "404",
        title: pick({ fr: ["Page", "introuvable."], en: ["Page", "not found."] }),
        text: pick({ fr: "Cette adresse n'existe pas ou a été déplacée.", en: "This address does not exist or has moved." }),
        size: "sm",
        actions: (
          <>
            <Link to="/" className="btn btn--light">
              {pick({ fr: "Retour à l'accueil", en: "Back to home" })}
            </Link>
            <Link to="/produits" className="btn btn--ghost">
              {pick({ fr: "Voir les gammes", en: "See the ranges" })}
            </Link>
          </>
        ),
      }}
      crumbs={[{ label: "404" }]}
    >
      {null}
    </PageTemplate>
  );
};

export default NotFound;
