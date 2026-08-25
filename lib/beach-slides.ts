import p1 from "@/public/plage-1.jpg";
import p2 from "@/public/plage-2.jpg";
import p3 from "@/public/plage-3.jpg";
import p4 from "@/public/plage-4.jpg";
import p5 from "@/public/plage-5.jpg";
import p6 from "@/public/plage-6.jpg";
import p7 from "@/public/plage-7.jpg";
import p8 from "@/public/plage-8.jpg";
import p9 from "@/public/plage-9.jpg";
import p10 from "@/public/plage-10.jpg";
import p11 from "@/public/plage-11.jpg";
import p12 from "@/public/plage-12.jpg";
import p13 from "@/public/plage-13.jpg";
import p14 from "@/public/plage-14.jpg";
import type { Slide } from "./slides";

/**
 * Memories Beach — carrousel de la section « Où nous trouver ».
 *
 * L'ordre suit une journée : la plage vide au petit matin, le surf, le lieu
 * lui-même, les gens, puis le coucher de soleil et la nuit.
 *
 * `objectPosition` compte surtout sur grand écran : le cadre y est très large,
 * l'image est donc rognée en hauteur.
 */
export const beachSlides: Slide[] = [
  {
    src: p9,
    alt: "Sable à perte de vue et eau turquoise à marée basse, quelques planches posées",
    objectPosition: "50% 60%",
  },
  {
    src: p13,
    alt: "Une personne glisse seule sur une vague turquoise",
    objectPosition: "50% 55%",
  },
  {
    src: p8,
    alt: "Parasol, transats et planche jaune posés sur le sable",
    objectPosition: "50% 60%",
  },
  {
    src: p6,
    alt: "Le pavillon rond en bambou et chaume, entre les cocotiers",
    objectPosition: "50% 50%",
  },
  {
    src: p11,
    alt: "Salas en bambou à l'ombre des arbres, au bord de la plage",
    objectPosition: "50% 55%",
  },
  {
    src: p5,
    alt: "L'intérieur en bambou et rotin, ouvert sur la plage",
    objectPosition: "50% 50%",
  },
  {
    src: p12,
    alt: "Le bar en bambou sous les filaos",
    objectPosition: "50% 50%",
  },
  {
    src: p1,
    alt: "Un adulte et un enfant entrent dans l'eau avec leurs planches",
    objectPosition: "45% 50%",
  },
  {
    src: p10,
    alt: "Trois personnes assises sur leurs planches dans une eau lisse, signe shaka",
    objectPosition: "50% 50%",
  },
  {
    src: p7,
    alt: "Retour vers la plage, planches sous le bras, dans l'écume",
    objectPosition: "50% 55%",
  },
  {
    src: p14,
    alt: "Deux surfeurs sur la même vague",
    objectPosition: "50% 50%",
  },
  {
    src: p2,
    alt: "Assis sur le sable en fin de journée, des surfeurs encore à l'eau",
    objectPosition: "50% 60%",
  },
  {
    src: p3,
    alt: "Coucher de soleil sur la plage : parasol, transats et un chien allongé sur le sable",
    objectPosition: "50% 45%",
  },
  {
    src: p4,
    alt: "La structure en bambou illuminée à la tombée de la nuit",
    objectPosition: "50% 50%",
  },
];
