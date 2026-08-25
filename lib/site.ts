/**
 * Informations de l'entreprise — SOURCE UNIQUE DE VÉRITÉ.
 *
 * ⚠️ DONNÉES PROVISOIRES — À CONFIRMER AVANT MISE EN LIGNE.
 * Chaque champ marqué TODO est une invention de développement et doit être
 * remplacé par une information réelle fournie par le client.
 */

export const PLACEHOLDER_DATA = true; // ⚠️ passer à false une fois tout confirmé

export const site = {
  // TODO — nom commercial définitif à confirmer
  name: "Surf Khao Lak",
  tagline: "Cours de surf à Khao Lak, Thaïlande",
  beach: "Memories Beach",
  city: "Khao Lak",
  country: "Thaïlande",
  // Secteur confirmé par OpenStreetMap (หาดแหลมปะการัง, Khuk Khak, Takua Pa).
  // TODO — adresse précise du point de rendez-vous (bar / surf house).
  address: "Pakarang Beach, Khuk Khak, Takua Pa, Phang Nga",
  // Recherche Google Maps du point de rendez-vous.
  // TODO — si l'établissement a une fiche Google, préférer son lien direct :
  // il pointe la fiche exacte plutôt qu'un résultat de recherche.
  mapsQuery: "Memories Surfhouse Khao Lak",
  contact: {
    phone: "+66 63 737 4599",
    whatsapp: "66637374599", // format international sans « + » pour wa.me
    // TODO — adresse e-mail et compte Instagram réels
    email: "contact@example.com",
    instagram: "surfkhaolak",
  },
  // TODO — mentions légales : raison sociale, immatriculation, hébergeur, directeur de publication
  legal: {
    company: "TODO — raison sociale",
    registration: "TODO — numéro d'immatriculation",
    director: "TODO — directeur de la publication",
    host: "Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA",
  },
} as const;

/** Lien Google Maps du point de rendez-vous (ouvre l'app sur mobile). */
export const mapsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

/** Message pré-rempli de tous les boutons WhatsApp du site. */
export const WHATSAPP_MESSAGE =
  "Bonjour ! Puis-je avoir plus d'informations sur les cours de surf ?";

export const whatsappUrl = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
