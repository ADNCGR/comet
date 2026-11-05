import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/seo/Seo";
import { useLang } from "@/lib/locale";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeRanges } from "@/components/home/HomeRanges";
import { HomeStatement } from "@/components/home/HomeStatement";
import { HomeFigures } from "@/components/home/HomeFigures";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeSectors } from "@/components/home/HomeSectors";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeQuote } from "@/components/home/HomeQuote";
import "@/components/home/home.css";

/**
 * Home: the machine, the ranges, why COMET, how it goes, who it is for, the
 * usual questions, and the quote request to finish.
 */
const Index = () => {
  const { pick } = useLang();

  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        path="/"
        title={pick({
          fr: "Nacelles élévatrices COMET au Maroc · Pick-up, van & camion | COMET Maroc",
          en: "COMET aerial platforms in Morocco · Pick-up, van & truck | COMET Morocco",
        })}
        description={pick({
          fr: "COMET Maroc : nacelles élévatrices C.O.M.E.T. sur pick-up 4×4, van et camion, de 12 à 45 m. Devis, démonstration et accompagnement depuis Casablanca.",
          en: "COMET Morocco: C.O.M.E.T. aerial platforms on 4×4 pick-ups, vans and trucks, from 12 to 45 m. Quotes, demos and support from Casablanca.",
        })}
        keywords="nacelle élévatrice Maroc, nacelle pick-up Maroc, nacelle sur camion, nacelle sur van, plateforme élévatrice, travaux en hauteur, COMET Maroc, Casablanca"
      />
      <Header />
      <main className="flex-1">
        <HomeHero />
        <HomeRanges />
        <HomeStatement />
        <HomeFigures />
        <HomeProcess />
        <HomeSectors />
        <HomeFaq />
        <HomeQuote />
      </main>
      <Footer cta={false} />
    </div>
  );
};

export default Index;
