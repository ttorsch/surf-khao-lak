const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

/** Prix en bahts → chaîne affichable, ex. « 1 500 ฿ » */
export const formatPrice = (thb: number) => priceFormatter.format(thb);

/** Durée en minutes → « 2 h » / « 1 h 30 » / « 45 min » */
export const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m}` : `${h} h`;
};

/** THB est une devise à 2 décimales chez Stripe : le montant s'exprime en satangs. */
export const toStripeAmount = (thb: number) => Math.round(thb * 100);
