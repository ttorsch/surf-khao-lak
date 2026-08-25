/**
 * Catalogue des cours — SOURCE UNIQUE DE VÉRITÉ.
 *
 * La page d'accueil, les pages /cours/[slug], le formulaire de réservation, la
 * page CGV et la route /api/checkout lisent tous ce fichier. Un prix ne doit
 * JAMAIS être écrit en dur dans du JSX.
 *
 * Données issues de la grille tarifaire de l'école (4 forfaits).
 * ⚠️ Seul le PRIX DE VENTE figure ici. Le « net price » de la grille est la
 * marge de l'école : il ne doit jamais apparaître sur le site.
 *
 * `null` = information non fournie par l'école. Jamais inventée : la page
 * affiche alors un encart « à confirmer » bien visible.
 */

/** Unité de facturation : le tarif duo et famille est global, pas par personne. */
export type PriceUnit = "personne" | "forfait" | "groupe";

export type SurfClass = {
  slug: string;
  name: string;
  /** Accroche courte affichée sur la carte de la page d'accueil */
  pitch: string;
  /** Partie 1 : théorie sur le sable */
  land: { minutes: number; text: string };
  /** Partie 2 : pratique dans l'eau */
  water: { minutes: number; text: string };
  priceThb: number;
  priceUnit: PriceUnit;
  minParticipants: number;
  maxParticipants: number;
  /** Encadrement, ex. « 4 élèves pour 1 moniteur » */
  ratio: string;
  ageMin: number;
  ageMax: number;
  experience: string;
  /** Supplément pour un cours en français, en bahts. `null` = non proposé. */
  frenchSupplementThb: number | null;
  /** Disponibilité particulière, quand l'école en impose une */
  schedule: string | null;
  conditions: {
    /** Non fournis par l'école — à confirmer avant la mise en ligne. */
    swimming: string | null;
    bring: string[] | null;
    provided: string[] | null;
    weather: string | null;
    cancellation: string | null;
  };
};

/** Conditions que l'école n'a pas encore communiquées. */
const conditionsAConfirmer = {
  swimming: null,
  bring: null,
  provided: null,
  weather: null,
  cancellation: null,
} as const;

export const classes: SurfClass[] = [
  {
    slug: "cours-collectif",
    name: "Cours collectif",
    pitch: "Votre première vague, en petit groupe de 4 maximum.",
    land: {
      minutes: 30,
      text: "Cours théorique sur le sable : consignes de sécurité en groupe et bases du surf, pour partir dans l'eau avec la bonne technique.",
    },
    water: {
      minutes: 60,
      text: "Cours pratique en petit groupe, 4 élèves au maximum pour 1 moniteur, une heure dans l'eau sous la surveillance rapprochée d'un moniteur professionnel.",
    },
    priceThb: 1800,
    priceUnit: "personne",
    minParticipants: 2,
    maxParticipants: 4,
    ratio: "4 élèves pour 1 moniteur",
    ageMin: 12,
    ageMax: 50,
    experience: "Réservé aux personnes n'ayant jamais surfé.",
    // Le cours collectif ne propose pas l'option française.
    frenchSupplementThb: null,
    schedule:
      "Une seule session par jour. L'horaire dépend des marées et vous est confirmé à l'avance.",
    conditions: { ...conditionsAConfirmer },
  },
  {
    slug: "cours-prive",
    name: "Cours particulier 1:1",
    pitch: "Un moniteur rien que pour vous. La progression la plus rapide.",
    land: {
      minutes: 30,
      text: "Cours théorique en tête-à-tête : consignes de sécurité personnalisées et accompagnement rapproché.",
    },
    water: {
      minutes: 60,
      text: "Cours pratique avec un moniteur dédié, en tête-à-tête, une heure dans l'eau.",
    },
    priceThb: 2200,
    priceUnit: "personne",
    minParticipants: 1,
    maxParticipants: 1,
    ratio: "1 élève pour 1 moniteur",
    ageMin: 6,
    ageMax: 60,
    experience: "Ouvert aux débutants comme à celles et ceux qui ont déjà un peu surfé.",
    /** Forfaitaire : une fois par réservation, quel que soit le nombre de participants. */
    frenchSupplementThb: 200,
    schedule: null,
    conditions: { ...conditionsAConfirmer },
  },
  {
    slug: "cours-duo",
    name: "Cours duo 2:1",
    pitch: "À deux, avec un moniteur dédié pour vous seuls.",
    land: {
      minutes: 30,
      text: "Cours théorique en privé : consignes de sécurité et accompagnement rapproché.",
    },
    water: {
      minutes: 60,
      text: "Cours pratique à deux avec un moniteur dédié, une heure dans l'eau.",
    },
    priceThb: 3200,
    priceUnit: "forfait",
    minParticipants: 2,
    maxParticipants: 2,
    ratio: "2 élèves pour 1 moniteur",
    ageMin: 12,
    ageMax: 50,
    experience: "Ouvert aux débutants comme à celles et ceux qui ont déjà un peu surfé.",
    /** Forfaitaire : une fois par réservation, quel que soit le nombre de participants. */
    frenchSupplementThb: 300,
    schedule: null,
    conditions: { ...conditionsAConfirmer },
  },
  {
    slug: "cours-famille",
    name: "Cours famille 3:1",
    pitch: "À trois, en famille ou entre amis, avec un moniteur pour vous.",
    land: {
      minutes: 30,
      text: "Cours théorique sur le sable pour un groupe de 3, en famille ou entre amis, avec un moniteur dédié — une expérience plus privée et personnalisée.",
    },
    water: {
      minutes: 60,
      text: "Cours pratique à trois avec notre moniteur dédié, une heure dans l'eau.",
    },
    priceThb: 4500,
    priceUnit: "groupe",
    minParticipants: 3,
    maxParticipants: 3,
    ratio: "3 élèves pour 1 moniteur",
    ageMin: 12,
    ageMax: 50,
    experience: "Ouvert aux débutants comme à celles et ceux qui ont déjà un peu surfé.",
    /** Forfaitaire : une fois par réservation, quel que soit le nombre de participants. */
    frenchSupplementThb: 400,
    schedule: null,
    conditions: { ...conditionsAConfirmer },
  },
];

export const getClass = (slug: string): SurfClass | undefined =>
  classes.find((c) => c.slug === slug);

/** Durée totale de la séance : théorie sur le sable + pratique dans l'eau. */
export const totalMinutes = (c: SurfClass) => c.land.minutes + c.water.minutes;

/**
 * Nombre d'unités facturées par Stripe.
 * Un tarif « forfait » ou « groupe » est global : il se vend en un exemplaire,
 * quel que soit le nombre de participants.
 */
export const billableQuantity = (c: SurfClass, participants: number) =>
  c.priceUnit === "personne" ? participants : 1;
