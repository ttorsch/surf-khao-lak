/**
 * Fiche participant — SOURCE UNIQUE DE VÉRITÉ pour le formulaire et l'API.
 *
 * Chaque élève remplit sa propre fiche : l'école a besoin du poids et de la
 * taille pour préparer la planche et la combinaison, et du niveau pour
 * composer les groupes. Le formulaire et /api/checkout valident avec les
 * mêmes règles ; le serveur reste l'autorité.
 *
 * ⚠️ Données sensibles. Le numéro de passeport n'est JAMAIS
 * transmis en entier : seuls les 4 derniers caractères partent chez Stripe
 * (voir `maskId`). Les informations de santé sont plafonnées et ne sont
 * jamais journalisées.
 */

import {
  DEFAULT_COUNTRY,
  OTHER_COUNTRY,
  dialOf,
  isKnownCountry,
} from "./countries";

export const LEVELS = [
  "Jamais surfé",
  "Quelques fois",
  "Je surfe régulièrement",
] as const;

export type Level = (typeof LEVELS)[number];

export type Participant = {
  /** Obligatoire */
  fullName: string;
  /** Numéro de passeport — facultatif */
  idNumber: string;
  /** Facultatif */
  nationality: string;
  /** Code ISO du pays de l'indicatif, ou `OTHER_COUNTRY` */
  country: string;
  /**
   * Participant 1 uniquement : téléphone OU e-mail, au moins l'un des deux.
   * `phone` ne contient que la partie nationale — sauf en « autre pays », où le
   * visiteur saisit son numéro complet.
   */
  phone: string;
  email: string;
  /** Obligatoires — préparation du matériel */
  weightKg: string;
  heightCm: string;
  /** Facultatif */
  health: string;
  level: Level;
};

/** Plafonds de longueur, appliqués côté client et côté serveur. */
export const MAX = {
  fullName: 60,
  idNumber: 30,
  nationality: 30,
  phone: 25,
  email: 100,
  health: 200,
} as const;

/** Bornes physiologiques larges : le cours accueille dès 6 ans. */
export const WEIGHT = { min: 20, max: 200 } as const;
export const HEIGHT = { min: 80, max: 230 } as const;

export const emptyParticipant = (): Participant => ({
  fullName: "",
  idNumber: "",
  nationality: "",
  country: DEFAULT_COUNTRY,
  phone: "",
  email: "",
  weightKg: "",
  heightCm: "",
  health: "",
  level: LEVELS[0],
});

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Caractères tolérés dans un numéro saisi à la main. */
const PHONE_SHAPE = /^[\d\s().-]+$/;
const digitsOf = (v: string) => v.replace(/\D/g, "");

/**
 * Partie nationale : seulement des chiffres et des séparateurs, 5 à 14 chiffres.
 * L'indicatif vient du sélecteur, jamais du texte saisi.
 */
const isNationalNumber = (v: string) => {
  if (!PHONE_SHAPE.test(v)) return false;
  const digits = digitsOf(v).length;
  return digits >= 5 && digits <= 14;
};

/** « Autre pays » : le numéro complet, indicatif compris. */
const isInternationalNumber = (v: string) => {
  if (!/^\+[\d\s().-]+$/.test(v)) return false;
  const digits = digitsOf(v).length;
  return digits >= 6 && digits <= 15;
};

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "";

/** Normalise une fiche reçue du client. Aucune valeur n'est acceptée telle quelle. */
export function normalizeParticipant(raw: unknown): Participant {
  const r = (raw ?? {}) as Record<string, unknown>;
  const level = LEVELS.find((l) => l === r.level) ?? LEVELS[0];

  // Le pays vient forcément du catalogue : une valeur inconnue retombe sur la
  // France plutôt que d'inventer un indicatif.
  const candidate = clean(r.country, 8).toUpperCase();
  const country = isKnownCountry(candidate) ? candidate : DEFAULT_COUNTRY;

  // Beaucoup de gens ressaisissent leur indicatif dans le champ alors que le
  // sélecteur le fournit déjà. On l'enlève, sinon le numéro part en double.
  const dial = dialOf(country);
  let phone = clean(r.phone, MAX.phone);
  if (dial && phone.startsWith(dial)) phone = phone.slice(dial.length).trim();

  return {
    fullName: clean(r.fullName, MAX.fullName),
    idNumber: clean(r.idNumber, MAX.idNumber),
    nationality: clean(r.nationality, MAX.nationality),
    country,
    phone,
    email: clean(r.email, MAX.email).toLowerCase(),
    weightKg: clean(r.weightKg, 6),
    heightCm: clean(r.heightCm, 6),
    health: clean(r.health, MAX.health),
    level,
  };
}

/**
 * Valide une fiche. Retourne un message en français, ou `null` si tout va bien.
 * `isLead` = participant 1, celui qui reçoit la confirmation.
 */
export function validateParticipant(p: Participant, index: number, isLead: boolean): string | null {
  const who = isLead ? "Participant 1" : `Participant ${index + 1}`;

  if (p.fullName.length < 2) return `${who} : merci d'indiquer le nom complet.`;

  if (isLead) {
    const hasPhone = p.phone.length > 0;
    const hasEmail = p.email.length > 0;
    if (!hasPhone && !hasEmail) {
      return `${who} : indiquez un téléphone ou un e-mail pour recevoir la confirmation.`;
    }
    if (hasEmail && !isEmail(p.email)) return `${who} : adresse e-mail invalide.`;
    if (hasPhone) {
      const ok =
        p.country === OTHER_COUNTRY
          ? isInternationalNumber(p.phone)
          : isNationalNumber(p.phone);
      if (!ok) {
        return p.country === OTHER_COUNTRY
          ? `${who} : indiquez le numéro complet avec l'indicatif, par exemple +212 6 12 34 56 78.`
          : `${who} : numéro de téléphone invalide.`;
      }
    }
  }

  const weight = Number(p.weightKg);
  if (!Number.isFinite(weight) || weight < WEIGHT.min || weight > WEIGHT.max) {
    return `${who} : indiquez un poids entre ${WEIGHT.min} et ${WEIGHT.max} kg.`;
  }

  const height = Number(p.heightCm);
  if (!Number.isFinite(height) || height < HEIGHT.min || height > HEIGHT.max) {
    return `${who} : indiquez une taille entre ${HEIGHT.min} et ${HEIGHT.max} cm.`;
  }

  return null;
}

/**
 * Numéro au format international, prêt à composer.
 * En « autre pays », le visiteur a déjà saisi son indicatif.
 */
export const fullPhone = (p: Participant) => {
  if (!p.phone) return "";
  const dial = dialOf(p.country);
  return dial ? `${dial} ${p.phone}` : p.phone;
};

/** 4 derniers caractères seulement — le numéro complet ne quitte pas le navigateur. */
export const maskId = (id: string) => (id ? `****${id.slice(-4)}` : "non communiqué");

/**
 * Fiches → métadonnées Stripe, lisibles telles quelles dans le tableau de bord.
 * Deux clés par participant : chacune reste très en dessous des 500 caractères
 * autorisés par Stripe.
 */
export function participantsMetadata(people: Participant[]): Record<string, string> {
  const meta: Record<string, string> = {};

  people.forEach((p, i) => {
    const n = i + 1;
    meta[`participant_${n}`] = [
      p.fullName,
      p.nationality || "nationalité non précisée",
      `passeport ${maskId(p.idNumber)}`,
      `${p.weightKg} kg`,
      `${p.heightCm} cm`,
    ].join(" · ");

    meta[`participant_${n}_infos`] = [
      `Niveau : ${p.level}`,
      `Santé : ${p.health || "rien à signaler"}`,
    ].join(" · ");
  });

  const lead = people[0];
  if (lead) {
    meta.contact = [fullPhone(lead) || "pas de téléphone", lead.email || "pas d'e-mail"].join(
      " · ",
    );
  }

  return meta;
}
