/**
 * Catalogue des cours — SOURCE UNIQUE DE VÉRITÉ.
 *
 * La page d'accueil, les pages /cours/[slug], le formulaire de réservation et
 * la route /api/checkout lisent tous ce fichier. Un prix ne doit JAMAIS être
 * écrit en dur dans du JSX.
 *
 * ⚠️ DONNÉES PROVISOIRES : noms, prix, durées, tailles de groupe et conditions
 * ci-dessous sont des exemples de développement. Ils doivent être remplacés par
 * les informations réelles de l'école avant toute mise en production.
 */

export type SurfClass = {
  slug: string;
  name: string;
  /** Accroche courte affichée sur la carte de la page d'accueil */
  pitch: string;
  /** Description longue affichée sur /cours/[slug] */
  description: string;
  /** Prix par personne, en bahts (unité entière, pas en satangs) */
  priceThb: number;
  /** Durée de la séance, en minutes */
  durationMin: number;
  /** Taille maximale du groupe (1 = cours particulier) */
  groupSize: number;
  level: "Débutant" | "Intermédiaire" | "Tous niveaux";
  included: string[];
  conditions: {
    minAge: number;
    swimming: string;
    bring: string[];
    provided: string[];
    weather: string;
    cancellation: string;
  };
};

export const classes: SurfClass[] = [
  {
    slug: "cours-decouverte",
    name: "Cours découverte",
    pitch: "Votre première vague, encadrée du début à la fin.",
    description:
      "Une séance pensée pour celles et ceux qui n'ont jamais touché une planche. On commence au sec sur le sable : sécurité, position, technique du lever. Puis on entre dans l'eau, dans une zone peu profonde et sans courant, et vous prenez vos premières vagues avec le moniteur à côté de vous. La grande majorité des participants tient debout dès la première séance.",
    priceThb: 1500,
    durationMin: 120,
    groupSize: 4,
    level: "Débutant",
    included: [
      "Planche adaptée à votre taille",
      "Lycra anti-UV",
      "Moniteur dans l'eau avec vous",
      "Eau fraîche",
      "Photos de la séance",
    ],
    conditions: {
      minAge: 8,
      swimming: "Savoir nager 25 mètres et être à l'aise avec la tête sous l'eau.",
      bring: ["Maillot de bain", "Serviette", "Crème solaire", "Chapeau"],
      provided: ["Planche", "Lycra", "Leash", "Eau"],
      weather:
        "En cas de conditions dangereuses (mer trop forte, orage), la séance est reportée sans frais ou intégralement remboursée.",
      cancellation:
        "Annulation gratuite jusqu'à 48 h avant la séance. Entre 48 h et 24 h, 50 % du montant est retenu. Moins de 24 h avant, la séance est due.",
    },
  },
  {
    slug: "cours-prive",
    name: "Cours privé",
    pitch: "Un moniteur, rien que pour vous. La progression la plus rapide.",
    description:
      "Séance individuelle entièrement adaptée à votre niveau et à vos objectifs. Le moniteur reste avec vous pendant toute la session, corrige chaque vague et choisit le spot en fonction des conditions du jour. C'est la formule idéale si vous avez peu de temps, si vous voulez débloquer un point technique précis, ou simplement si vous préférez apprendre sans groupe.",
    priceThb: 2800,
    durationMin: 120,
    groupSize: 1,
    level: "Tous niveaux",
    included: [
      "Moniteur dédié",
      "Planche adaptée à votre niveau",
      "Lycra anti-UV",
      "Analyse vidéo de vos vagues",
      "Photos de la séance",
    ],
    conditions: {
      minAge: 8,
      swimming: "Savoir nager 25 mètres et être à l'aise avec la tête sous l'eau.",
      bring: ["Maillot de bain", "Serviette", "Crème solaire", "Chapeau"],
      provided: ["Planche", "Lycra", "Leash", "Eau"],
      weather:
        "En cas de conditions dangereuses (mer trop forte, orage), la séance est reportée sans frais ou intégralement remboursée.",
      cancellation:
        "Annulation gratuite jusqu'à 48 h avant la séance. Entre 48 h et 24 h, 50 % du montant est retenu. Moins de 24 h avant, la séance est due.",
    },
  },
  {
    slug: "stage-3-jours",
    name: "Stage 3 jours",
    pitch: "Trois séances pour passer de la mousse aux vraies vagues.",
    description:
      "Trois séances réparties sur trois jours, pensées comme une progression continue. Jour 1 : les bases, la sécurité, le lever. Jour 2 : la rame, le placement et le décollage seul. Jour 3 : les vagues non déferlées et les premiers virages. C'est la formule qui donne le plus de résultats sur un séjour, et celle que nous recommandons si vous restez au moins une semaine à Khao Lak.",
    priceThb: 3900,
    durationMin: 120,
    groupSize: 4,
    level: "Débutant",
    included: [
      "3 séances de 2 h",
      "Planche et lycra fournis à chaque séance",
      "Suivi de progression",
      "Analyse vidéo le dernier jour",
      "Photos du stage",
    ],
    conditions: {
      minAge: 10,
      swimming: "Savoir nager 25 mètres et être à l'aise avec la tête sous l'eau.",
      bring: ["Maillot de bain", "Serviette", "Crème solaire", "Chapeau"],
      provided: ["Planche", "Lycra", "Leash", "Eau"],
      weather:
        "Si une séance ne peut pas avoir lieu à cause de la météo, elle est reportée sur un autre jour de votre séjour, ou remboursée au prorata.",
      cancellation:
        "Annulation gratuite jusqu'à 48 h avant la première séance. Entre 48 h et 24 h, 50 % du montant est retenu. Moins de 24 h avant, le stage est dû.",
    },
  },
];

export const getClass = (slug: string): SurfClass | undefined =>
  classes.find((c) => c.slug === slug);

export const classSlugs = classes.map((c) => c.slug);
