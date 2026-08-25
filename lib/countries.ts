/**
 * Indicatifs téléphoniques — SOURCE UNIQUE DE VÉRITÉ pour le sélecteur du
 * formulaire et pour la validation côté serveur.
 *
 * La France arrive en tête : c'est le public de la page, et donc la valeur par
 * défaut. Le reste suit l'ordre alphabétique français.
 *
 * `AUTRE` est la porte de sortie : un visiteur dont le pays ne figure pas dans
 * la liste saisit son numéro complet, indicatif compris. Un champ qui bloque,
 * c'est une réservation perdue.
 */

/** [code ISO 3166-1 alpha-2, indicatif, nom en français] */
type Country = readonly [iso: string, dial: string, name: string];

export const OTHER_COUNTRY = "AUTRE";

export const COUNTRIES: readonly Country[] = [
  ["FR", "+33", "France"],
  ["ZA", "+27", "Afrique du Sud"],
  ["DZ", "+213", "Algérie"],
  ["DE", "+49", "Allemagne"],
  ["AD", "+376", "Andorre"],
  ["SA", "+966", "Arabie saoudite"],
  ["AR", "+54", "Argentine"],
  ["AU", "+61", "Australie"],
  ["AT", "+43", "Autriche"],
  ["BE", "+32", "Belgique"],
  ["BR", "+55", "Brésil"],
  ["BG", "+359", "Bulgarie"],
  ["KH", "+855", "Cambodge"],
  ["CA", "+1", "Canada"],
  ["CL", "+56", "Chili"],
  ["CN", "+86", "Chine"],
  ["CY", "+357", "Chypre"],
  ["CO", "+57", "Colombie"],
  ["KR", "+82", "Corée du Sud"],
  ["HR", "+385", "Croatie"],
  ["DK", "+45", "Danemark"],
  ["EG", "+20", "Égypte"],
  ["AE", "+971", "Émirats arabes unis"],
  ["ES", "+34", "Espagne"],
  ["EE", "+372", "Estonie"],
  ["US", "+1", "États-Unis"],
  ["FI", "+358", "Finlande"],
  ["GR", "+30", "Grèce"],
  ["HK", "+852", "Hong Kong"],
  ["HU", "+36", "Hongrie"],
  ["IN", "+91", "Inde"],
  ["ID", "+62", "Indonésie"],
  ["IE", "+353", "Irlande"],
  ["IS", "+354", "Islande"],
  ["IL", "+972", "Israël"],
  ["IT", "+39", "Italie"],
  ["JP", "+81", "Japon"],
  ["LA", "+856", "Laos"],
  ["LV", "+371", "Lettonie"],
  ["LB", "+961", "Liban"],
  ["LT", "+370", "Lituanie"],
  ["LU", "+352", "Luxembourg"],
  ["MY", "+60", "Malaisie"],
  ["MT", "+356", "Malte"],
  ["MA", "+212", "Maroc"],
  ["MU", "+230", "Maurice"],
  ["MX", "+52", "Mexique"],
  ["MC", "+377", "Monaco"],
  ["MM", "+95", "Myanmar"],
  ["NO", "+47", "Norvège"],
  ["NZ", "+64", "Nouvelle-Zélande"],
  ["NL", "+31", "Pays-Bas"],
  ["PH", "+63", "Philippines"],
  ["PL", "+48", "Pologne"],
  ["PT", "+351", "Portugal"],
  ["QA", "+974", "Qatar"],
  ["CZ", "+420", "République tchèque"],
  ["RO", "+40", "Roumanie"],
  ["GB", "+44", "Royaume-Uni"],
  ["RU", "+7", "Russie"],
  ["SN", "+221", "Sénégal"],
  ["RS", "+381", "Serbie"],
  ["SG", "+65", "Singapour"],
  ["SK", "+421", "Slovaquie"],
  ["SI", "+386", "Slovénie"],
  ["SE", "+46", "Suède"],
  ["CH", "+41", "Suisse"],
  ["TW", "+886", "Taïwan"],
  ["TH", "+66", "Thaïlande"],
  ["TN", "+216", "Tunisie"],
  ["TR", "+90", "Turquie"],
  ["UA", "+380", "Ukraine"],
  ["VN", "+84", "Vietnam"],
] as const;

export const DEFAULT_COUNTRY = "FR";

const byIso = new Map(COUNTRIES.map(([iso, dial, name]) => [iso, { dial, name }]));

export const isKnownCountry = (iso: string) => iso === OTHER_COUNTRY || byIso.has(iso);

/** Indicatif du pays, ou "" pour « autre pays » (le numéro le contient déjà). */
export const dialOf = (iso: string) => byIso.get(iso)?.dial ?? "";

export const nameOf = (iso: string) => byIso.get(iso)?.name ?? "";

/** Code ISO → drapeau emoji, via les indicateurs régionaux Unicode. */
export const flagOf = (iso: string) =>
  byIso.has(iso)
    ? String.fromCodePoint(...[...iso].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))
    : "🌍";

/**
 * Libellé du sélecteur. L'indicatif passe AVANT le nom : sur mobile le champ
 * fermé est étroit et tronque la fin, or c'est l'indicatif qui doit rester
 * lisible.
 */
export const countryLabel = (iso: string) =>
  iso === OTHER_COUNTRY ? "🌍 Autre pays" : `${flagOf(iso)} ${dialOf(iso)} ${nameOf(iso)}`;
