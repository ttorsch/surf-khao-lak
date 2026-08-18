import type { SurfClass } from "./classes";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

/** Prix en bahts → chaîne affichable, ex. « 1 800 THB » */
export const formatPrice = (thb: number) => priceFormatter.format(thb);

/** Suffixe du tarif, ex. « / personne » ou « / forfait (2 personnes) » */
export const priceSuffix = (c: SurfClass) =>
  c.priceUnit === "personne"
    ? "/ personne"
    : `/ ${c.priceUnit} (${c.maxParticipants} personnes)`;

/** Durée en minutes → « 2 h » / « 1 h 30 » / « 45 min » */
export const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m}` : `${h} h`;
};

/** Taille de groupe lisible, ex. « 2 à 4 personnes » ou « 3 personnes » */
export const formatGroup = (c: SurfClass) =>
  c.minParticipants === c.maxParticipants
    ? `${c.maxParticipants} ${c.maxParticipants > 1 ? "personnes" : "personne"}`
    : `${c.minParticipants} à ${c.maxParticipants} personnes`;

/** THB est une devise à 2 décimales chez Stripe : le montant s'exprime en satangs. */
export const toStripeAmount = (thb: number) => Math.round(thb * 100);
