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
  // TODO — adresse et plage exactes
  beach: "Nang Thong Beach",
  city: "Khao Lak",
  country: "Thaïlande",
  address: "TODO — adresse complète de l'école",
  // TODO — coordonnées réelles de la plage pour la carte
  map: { lat: 8.6392, lng: 98.2451, zoom: 14 },
  contact: {
    // TODO — numéros et comptes réels
    phone: "+66 00 000 0000",
    whatsapp: "66000000000", // format international sans "+" pour wa.me
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

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
