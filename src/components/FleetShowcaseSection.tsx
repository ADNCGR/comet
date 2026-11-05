import { NavLink } from "@/components/NavLink";
import { ArrowRight } from "lucide-react";
import imgPickup from "@/assets/comet-pickup-140.jpg";
import imgCamion from "@/assets/comet-camion-telescopique.jpg";
import imgVan from "@/assets/comet-van-articulee.jpg";
import imgTerrain from "@/assets/hero-pickup-nacelle.jpg";

/**
 * REFACTORED — uniquement du visuel catalogue (pas de citations clients fictives).
 * Photos issues des assets projet : focus produits / porteurs.
 */
const SHOTS: { src: string; title: string; caption: string; to: string }[] = [
  {
    src: imgTerrain,
    title: "Pick-up terrain",
    caption: "Plateforme sur porteur léger tout-terrain.",
    to: "/produits#pickup",
  },
  {
    src: imgPickup,
    title: "Pick-up équipé",
    caption: "Configuration courante chantier — détail dans le catalogue.",
    to: "/produits#pickup",
  },
  {
    src: imgCamion,
    title: "Porteur poids lourd",
    caption: "Nacelle montée véhicule utilitaire / camion selon mise en oeuvre.",
    to: "/produits#camion",
  },
  {
    src: imgVan,
    title: "Van intégré",
    caption: "Encombrement réduit en zone urbaine.",
    to: "/produits#pickup",
  },
];

export const FleetShowcaseSection = () => {
  return (
    <section className="border-b border-border bg-muted/35 py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">Vitrine machines</p>
            <h2 className="font-serif text-3xl md:text-[2.35rem] font-semibold tracking-tight text-foreground">
              Plateformes sur pick-up, van et camion
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
              Illustrations tirées du dossier média projet. Les fiches techniques officielles et options disponibles sont
              listées dans la page Produits.
            </p>
          </div>
          <NavLink
            to="/produits"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline decoration-primary/40 underline-offset-4 self-start md:self-auto"
          >
            Ouvrir le catalogue
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {SHOTS.map((shot) => (
            <NavLink
              key={shot.title}
              to={shot.to}
              className="group block border border-border bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-muted-foreground/25 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={shot.src}
                  alt={shot.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-4 border-t border-border">
                <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {shot.title}
                </h3>
                <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">{shot.caption}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};
