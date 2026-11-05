import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Lightbulb, Building2, Radio, Wrench, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import secteurEclairage from "@/assets/secteur-eclairage.jpg";
import secteurNettoyage from "@/assets/secteur-nettoyage.jpg";
import cometVanArticulee from "@/assets/comet-van-articulee.jpg";
import cometCamionTelesco from "@/assets/comet-camion-telescopique.jpg";
import { Seo } from "@/seo/Seo";

const Secteurs = () => {
  const sectors = [{
    icon: Lightbulb,
    title: "Éclairage Public",
    image: secteurEclairage,
    description: "Maintenance et installation d'éclairage urbain en toute sécurité",
    useCases: ["Maintenance préventive et curative des candélabres", "Installation de nouveaux luminaires LED", "Travaux sur colonnes d'éclairage autoroutier", "Interventions municipales rapides"],
    benefits: ["Hauteur adaptée aux standards internationaux (12-20m)", "Accès latéral pour éviter circulation", "Panier isolé pour travaux électriques", "Stabilité renforcée sur terrain urbain"],
    recommendedModels: ["COMET X-160", "COMET T-200"]
  }, {
    icon: Building2,
    title: "Nettoyage & Façades",
    image: secteurNettoyage,
    description: "Entretien de bâtiments et nettoyage en hauteur professionnel",
    useCases: ["Nettoyage de vitrages en hauteur", "Entretien de façades de bâtiments", "Travaux de peinture extérieure", "Rénovation de bardages et revêtements"],
    benefits: ["Portée latérale pour accès façades", "Panier spacieux pour matériel de nettoyage", "Commandes précises pour travail délicat", "Prise 230V pour équipements électriques"],
    recommendedModels: ["COMET A-180", "COMET A-220"]
  }, {
    icon: Radio,
    title: "Télécom & Réseaux",
    image: cometCamionTelesco,
    description: "Installation et maintenance d'infrastructures télécoms",
    useCases: ["Installation d'antennes relais", "Maintenance de pylônes télécoms", "Déploiement de la fibre optique", "Inspection d'infrastructures réseau"],
    benefits: ["Grande hauteur de travail (jusqu'à 25m)", "Charge utile élevée pour équipements", "Stabilité optimale pour travaux précis", "Accès dans zones difficiles"],
    recommendedModels: ["COMET T-200", "COMET T-250"]
  }, {
    icon: Wrench,
    title: "Maintenance Industrielle",
    image: cometVanArticulee,
    description: "Interventions techniques en environnement industriel",
    useCases: ["Entretien d'équipements en hauteur", "Inspections de ponts roulants", "Maintenance de systèmes CVC", "Travaux dans entrepôts et ateliers"],
    benefits: ["Compacité pour travail en intérieur", "Précision pour accès étroits", "Rotation 360° dans espaces restreints", "Facilité de manœuvre en atelier"],
    recommendedModels: ["COMET X-140", "COMET A-180"]
  }];
  return <>
    <Seo
      path="/secteurs"
      title="Usages nacelles : éclairage, façades, télécom, maintenance"
      description="Synthèse des usages nacelles C.O.M.E.T : collectivités, nettoyage de façades, pylônes télécom et maintenance industrielle. Choix véhicule porteur après étude projet."
      keywords="nacelle éclairage public, nacelle télécom, nettoyage façade nacelle, maintenance industrielle hauteur, CO.ME.T. Officine"
    />
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-hover text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-50">Secteurs d'Activité</h1>
              <p className="text-xl text-white/90">C.O.M.E.T accompagne les professionnels de tous secteurs avec des solutions adaptées à chaque métier</p>
            </div>
          </div>
        </section>

        {/* Sectors Detail */}
        {sectors.map((sector, index) => <section key={index} className={`py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                    <sector.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-4xl font-bold">{sector.title}</h2>
                </div>

                <p className="text-xl text-muted-foreground mb-8">
                  {sector.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3">Tâches Typiques</h3>
                    <ul className="space-y-2">
                      {sector.useCases.map((useCase, i) => <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{useCase}</span>
                      </li>)}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-3">Avantages COMET</h3>
                    <ul className="space-y-2">
                      {sector.benefits.map((benefit, i) => <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>)}
                    </ul>
                  </div>

                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Modèles Recommandés</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {sector.recommendedModels.map((model, i) => <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {model}
                        </span>)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <img
                  src={sector.image}
                  alt={`${sector.title} - Solutions COMET`}
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>)}

        {/* CTA Section */}
        <section className="py-20 bg-primary/5 border-y border-primary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Votre Secteur Ne Figure Pas Ici ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nos experts analysent votre activité et vous recommandent la nacelle parfaite. Événementiel, construction, agriculture, énergie : nous avons la solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary-hover" asChild>
                  <NavLink to="/contact">Parler à un Expert Secteur</NavLink>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <NavLink to="/produits">Voir Tous les Modèles</NavLink>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  </>;
};
export default Secteurs;