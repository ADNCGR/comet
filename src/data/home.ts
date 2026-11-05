import type { Copy } from "@/lib/locale";

/**
 * The home page's words, French first. Figures are the manufacturer's
 * (CO.ME.T. Officine); delivery times and services are the ones COMET Maroc
 * already states on its current site.
 */
export const HOME = {
  hero: {
    eyebrow: { fr: "Nacelles élévatrices · Casablanca", en: "Aerial platforms · Casablanca" } as Copy,
    title: { fr: ["Nacelles COMET,", "au Maroc."], en: ["COMET platforms,", "in Morocco."] } as Copy<string[]>,
    text: {
      fr: "Sur pick-up 4×4, van ou camion : plus de 80 modèles conçus et fabriqués en Italie depuis 1960, avec devis, démonstration et suivi depuis Casablanca.",
      en: "On 4×4 pick-ups, vans or trucks: over 80 models designed and built in Italy since 1960, with quotes, demos and follow-up from Casablanca.",
    } as Copy,
    primary: { fr: "Demander un devis", en: "Request a quote" } as Copy,
    secondary: { fr: "Voir les gammes", en: "See the ranges" } as Copy,
    imageAlt: { fr: "Nacelle COMET montée sur un pick-up 4×4", en: "COMET platform mounted on a 4×4 pick-up" } as Copy,
    facts: [
      { fr: "Fabricant italien depuis 1960", en: "Italian manufacturer since 1960" },
      { fr: "Plus de 80 modèles", en: "Over 80 models" },
      { fr: "Devis et démonstration au Maroc", en: "Quotes and demos in Morocco" },
    ] as Copy[],
  },

  ranges: {
    eyebrow: { fr: "Les gammes", en: "The ranges" } as Copy,
    title: { fr: ["Une nacelle", "pour chaque hauteur."], en: ["A platform", "for every height."] } as Copy<string[]>,
    text: {
      fr: "Du fourgon de 12 m au camion de 45 m, chaque gamme se configure selon votre véhicule porteur et votre chantier.",
      en: "From a 12 m van to a 45 m truck, each range is configured for your carrier vehicle and your job.",
    } as Copy,
    see: { fr: "Voir la gamme", en: "See the range" } as Copy,
    all: { fr: "Tout le catalogue", en: "Full catalogue" } as Copy,
    allText: { fr: "Plus de 80 modèles, du van au poids lourd.", en: "Over 80 models, from vans to heavy trucks." } as Copy,
  },

  statement: {
    lines: { fr: ["Conçues en Italie.", "Suivies au Maroc."], en: ["Designed in Italy.", "Looked after in Morocco."] } as Copy<string[]>,
    caption: {
      fr: "CO.ME.T. Officine conçoit et fabrique ses nacelles près de Bologne depuis 1960. COMET Maroc vous accompagne sur place, du premier devis à l'après-vente.",
      en: "CO.ME.T. Officine has designed and built its platforms near Bologna since 1960. COMET Morocco is with you on the ground, from the first quote to after-sales.",
    } as Copy,
    image: "https://www.officinecomet.com/wp-content/uploads/2024/03/officine-comet-eurosky-hd.jpg",
  },

  figures: {
    eyebrow: { fr: "Le constructeur en chiffres", en: "The manufacturer in figures" } as Copy,
    items: [
      { value: 1960, count: false, label: { fr: "Année de fondation, en Italie", en: "Founded, in Italy" } as Copy },
      { value: 85, count: true, label: { fr: "Modèles au catalogue", en: "Models in the range" } as Copy },
      { value: 35, count: true, label: { fr: "Pays équipés", en: "Countries" } as Copy },
      { value: 20000, count: true, label: { fr: "Nacelles produites", en: "Platforms built" } as Copy },
    ],
  },

  process: {
    eyebrow: { fr: "Comment ça se passe", en: "How it works" } as Copy,
    title: { fr: ["De la demande", "à la mise en service."], en: ["From the first call", "to the first lift."] } as Copy<string[]>,
    text: {
      fr: "Un seul interlocuteur à Casablanca, cinq étapes claires, et une nacelle prête à travailler.",
      en: "One contact in Casablanca, five clear steps, and a platform ready to work.",
    } as Copy,
    steps: [
      {
        title: { fr: "Votre besoin", en: "Your need" },
        time: { fr: "Premier échange", en: "First call" },
        text: {
          fr: "Hauteur de travail, charge, terrain, véhicule porteur : on fait le point ensemble, au téléphone ou sur place.",
          en: "Working height, load, ground, carrier vehicle: we go through it together, by phone or on site.",
        },
      },
      {
        title: { fr: "Votre devis", en: "Your quote" },
        time: { fr: "Proposition écrite", en: "In writing" },
        text: {
          fr: "Une offre détaillée : configuration, options, formation et service après-vente.",
          en: "A detailed offer: configuration, options, training and after-sales service.",
        },
      },
      {
        title: { fr: "La démonstration", en: "The demo" },
        time: { fr: "Sans engagement", en: "No commitment" },
        text: {
          fr: "Vos équipes essaient la nacelle sur votre chantier ou votre dépôt avant de décider.",
          en: "Your teams try the platform on your site or at your depot before deciding.",
        },
      },
      {
        title: { fr: "Livraison et montage", en: "Delivery and fitting" },
        time: { fr: "4 à 8 semaines en général", en: "Usually 4 to 8 weeks" },
        text: {
          fr: "Import, mise en conformité, montage sur votre véhicule et contrôle final avant la mise en service.",
          en: "Import, compliance, fitting on your vehicle and a final check before commissioning.",
        },
      },
      {
        title: { fr: "Formation et SAV", en: "Training and service" },
        time: { fr: "Dans la durée", en: "For the long run" },
        text: {
          fr: "Prise en main de vos opérateurs, pièces détachées d'origine et maintenance préventive.",
          en: "Operator training, original spare parts and preventive maintenance.",
        },
      },
    ] as { title: Copy; time: Copy; text: Copy }[],
  },

  sectors: {
    eyebrow: { fr: "Secteurs", en: "Industries" } as Copy,
    title: { fr: ["Partout où l'on", "travaille en hauteur."], en: ["Wherever work", "happens at height."] } as Copy<string[]>,
    items: [
      { name: { fr: "Éclairage public", en: "Street lighting" }, text: { fr: "Entretien des candélabres et des réseaux d'éclairage des villes.", en: "Upkeep of street lights and city lighting networks." } },
      { name: { fr: "Télécoms", en: "Telecoms" }, text: { fr: "Antennes, pylônes et déploiement de la fibre optique.", en: "Antennas, masts and fibre roll-out." } },
      { name: { fr: "Réseaux électriques", en: "Power networks" }, text: { fr: "Interventions près des lignes, avec des nacelles isolées.", en: "Work near power lines, with insulated platforms." } },
      { name: { fr: "Façades et vitrages", en: "Façades and glazing" }, text: { fr: "Nettoyage, rénovation et inspection des bâtiments.", en: "Cleaning, renovation and inspection of buildings." } },
      { name: { fr: "Industrie et logistique", en: "Industry and logistics" }, text: { fr: "Maintenance des usines, entrepôts et équipements en hauteur.", en: "Maintenance of plants, warehouses and equipment at height." } },
      { name: { fr: "Collectivités et espaces verts", en: "Municipalities and green spaces" }, text: { fr: "Élagage, signalisation et entretien urbain.", en: "Tree work, signage and city upkeep." } },
    ] as { name: Copy; text: Copy }[],
  },

  faq: {
    eyebrow: { fr: "Questions fréquentes", en: "Questions" } as Copy,
    title: { fr: ["Ce qu'on nous", "demande souvent."], en: ["What people", "often ask us."] } as Copy<string[]>,
    items: [
      {
        q: { fr: "Quels sont les délais de livraison ?", en: "How long does delivery take?" },
        a: {
          fr: "Ils dépendent du modèle et de la configuration. Comptez en général 4 à 8 semaines après validation de la commande, installation et formation comprises.",
          en: "It depends on the model and configuration. Usually 4 to 8 weeks after the order is confirmed, installation and training included.",
        },
      },
      {
        q: { fr: "Peut-on voir la nacelle avant d'acheter ?", en: "Can we see the platform before buying?" },
        a: {
          fr: "Oui. Nous organisons une démonstration sur votre chantier ou votre dépôt, sans engagement.",
          en: "Yes. We arrange a demo on your site or at your depot, with no commitment.",
        },
      },
      {
        q: { fr: "Sur quels véhicules la nacelle peut-elle être montée ?", en: "Which vehicles can the platform be fitted on?" },
        a: {
          fr: "Pick-up 4×4, fourgon, camion léger ou porteur poids lourd. La compatibilité avec votre châssis (Ford, Toyota, Isuzu, Iveco…) se vérifie au moment du devis.",
          en: "4×4 pick-ups, vans, light trucks or heavy trucks. Compatibility with your chassis (Ford, Toyota, Isuzu, Iveco…) is checked when quoting.",
        },
      },
      {
        q: { fr: "Proposez-vous des solutions de financement ?", en: "Do you offer financing?" },
        a: {
          fr: "Oui. Nous travaillons avec des partenaires financiers pour proposer un crédit professionnel ou une location longue durée adaptés à votre trésorerie.",
          en: "Yes. We work with financial partners to offer business credit or long-term leasing that fits your cash flow.",
        },
      },
      {
        q: { fr: "Assurez-vous la maintenance et les pièces détachées ?", en: "Do you handle maintenance and spare parts?" },
        a: {
          fr: "Oui. Pièces détachées d'origine et techniciens formés pour la maintenance préventive et les réparations, partout au Maroc.",
          en: "Yes. Original spare parts and trained technicians for preventive maintenance and repairs, across Morocco.",
        },
      },
    ] as { q: Copy; a: Copy }[],
  },

  quote: {
    eyebrow: { fr: "Devis", en: "Quote" } as Copy,
    title: { fr: ["Parlons de", "votre chantier."], en: ["Tell us about", "your job."] } as Copy<string[]>,
    text: {
      fr: "Décrivez votre besoin en deux minutes : nous revenons vers vous avec une proposition adaptée à votre véhicule et à vos travaux.",
      en: "Describe what you need in two minutes: we come back with an offer that fits your vehicle and your work.",
    } as Copy,
  },
};
