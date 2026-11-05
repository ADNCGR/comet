import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NavLink } from "@/components/NavLink";
import { Card, CardContent } from "@/components/ui/card";

import imgPickup from "@/assets/comet-pickup-140.jpg";
import imgCamion from "@/assets/comet-camion-telescopique.jpg";
import imgVan from "@/assets/comet-van-articulee.jpg";
import imgArtic from "@/assets/modele-1.png";

/** Familles métier — visuels réels assets (plus de carte « Insert image » en vitrine principale). */

type Spotlight = {
  id: string;
  title: string;
  teaser: string;
  linkTo: string;
  image: string;
  imageAlt: string;
};

const SPOTLIGHTS: Spotlight[] = [
  {
    id: "pickup",
    title: "Pick-up & 4×4",
    teaser: "Porteurs légers fréquents pour équipes mobiles.",
    linkTo: "/produits#pickup",
    image: imgPickup,
    imageAlt: "Nacelle sur pick-up — photo catalogue",
  },
  {
    id: "articulees",
    title: "Bras articulé",
    teaser: "Exemple van porteur avec configuration articulée (visuel modèle dossier média).",
    linkTo: "/produits#articulees",
    image: imgArtic,
    imageAlt: "Nacelle articulée sur van — illustration modèle",
  },
  {
    id: "telescopiques",
    title: "Bras télescopique camion",
    teaser: "Grande famille porteur VL/PL selon nomenclature fabricant.",
    linkTo: "/produits#telescopiques",
    image: imgCamion,
    imageAlt: "Nacelle sur porteur camion — photo catalogue",
  },
  {
    id: "van",
    title: "Van équipé",
    teaser: "Profil urbain avec cellule plus compacte.",
    linkTo: "/produits#pickup",
    image: imgVan,
    imageAlt: "Nacelle sur van utilitaire — photo catalogue",
  },
];

export const FeaturedSpotlightSection = () => {
  return (
    <section className="relative py-14 md:py-20 bg-background border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">
            Explorer par famille
          </p>
          <h2 className="font-serif text-3xl md:text-[2.35rem] font-semibold tracking-tight text-foreground mb-4">
            Par type de véhicule porteur
          </h2>
          <p className="text-muted-foreground text-[15px] md:text-[16px] leading-relaxed">
            Faire défiler pour comparer les silhouettes avant d&apos;entrer dans le détail dimensions et options sur la
            page Produits.
          </p>
          <div className="mt-5 h-px w-14 bg-primary" aria-hidden />
        </div>

        <div className="relative">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-3 md:-ml-4">
              {SPOTLIGHTS.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-3 md:pl-4 basis-full sm:basis-[92%] md:basis-[48%] xl:basis-[32%]"
                >
                  <Card className="h-full overflow-hidden border border-border bg-card hover:border-muted-foreground/25 transition-colors">
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted border-b border-border">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <CardContent className="p-5 flex flex-col gap-3">
                      <h3 className="font-serif text-lg font-semibold text-foreground leading-snug">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.teaser}</p>
                      <p className="text-xs text-muted-foreground border border-dashed border-border rounded-lg px-3 py-2 bg-muted/35">
                        Fiche dimensions &amp; conformité : page produit officielle uniquement.
                      </p>
                      <div className="flex flex-col gap-2 mt-auto pt-1">
                        <Button variant="outline" size="sm" className="w-full justify-center rounded-lg" asChild>
                          <NavLink to={item.linkTo}>
                            Voir au catalogue
                            <ArrowRight className="h-4 w-4 ml-1" strokeWidth={1.5} />
                          </NavLink>
                        </Button>
                        <Button size="sm" className="w-full justify-center rounded-lg" asChild>
                          <NavLink to="/contact#devis">Devis</NavLink>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center sm:justify-end gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 left-auto top-auto relative rounded-full" />
              <CarouselNext className="static translate-y-0 right-auto top-auto relative rounded-full" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
