import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, type Crumb } from "@/components/PageHero";
import { Seo, type SeoProps } from "@/seo/Seo";
import "@/pages/pages.css";

type PageTemplateProps = {
  seo: SeoProps;
  hero: {
    title: string[];
    eyebrow?: string;
    text?: string;
    image?: string;
    size?: "sm" | "md" | "lg";
    actions?: ReactNode;
  };
  /** after "Accueil", which the hero adds itself */
  crumbs: Crumb[];
  /** the "Un chantier en hauteur ?" band above the footer */
  cta?: boolean;
  children: ReactNode;
};

/** An inner page: the dark hero, the content, the footer. */
export const PageTemplate = ({ seo, hero, crumbs, cta = true, children }: PageTemplateProps) => (
  <div className="min-h-screen flex flex-col">
    <Seo {...seo} />
    <Header />
    <main className="flex-1">
      <PageHero title={hero.title} eyebrow={hero.eyebrow} text={hero.text} image={hero.image} size={hero.size} crumbs={crumbs}>
        {hero.actions}
      </PageHero>
      {children}
    </main>
    <Footer cta={cta} />
  </div>
);

export default PageTemplate;
