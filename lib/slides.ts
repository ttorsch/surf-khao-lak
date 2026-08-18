import type { StaticImageData } from "next/image";
import s1 from "@/public/slide-1.jpg";
import s2 from "@/public/slide-2.jpg";
import s3 from "@/public/slide-3.jpg";
import s4 from "@/public/slide-4.jpg";
import s5 from "@/public/slide-5.jpg";
import s6 from "@/public/slide-6.jpg";

/**
 * Diaporama sous le héros — le bloc « séduction ».
 *
 * L'ordre raconte une séance : on arrive, on descend à l'eau, on surfe, on
 * traîne au large, les enfants aussi, et on finit à l'ombre.
 *
 * `objectPosition` compte surtout sur grand écran : le cadre y est très
 * large, l'image est donc rognée en hauteur.
 */
export type Slide = {
  src: StaticImageData;
  alt: string;
  objectPosition: string;
};

export const slides: Slide[] = [
  {
    src: s6,
    alt: "Quatre personnes rejoignent la plage à pied, planches sur la tête, entre les cocotiers",
    objectPosition: "50% 62%",
  },
  {
    src: s2,
    alt: "Quatre personnes marchent sur le sable, planches sous le bras",
    objectPosition: "50% 75%",
  },
  {
    src: s3,
    alt: "Debout sur sa planche, une personne glisse sur une vague",
    objectPosition: "50% 55%",
  },
  {
    src: s4,
    alt: "Trois élèves assis sur leurs planches au large, sourire et signe shaka",
    objectPosition: "50% 66%",
  },
  {
    src: s5,
    alt: "Un moniteur prépare la planche d'un enfant au bord de l'eau",
    objectPosition: "55% 70%",
  },
  {
    src: s1,
    alt: "Deux personnes rient autour de noix de coco fraîches, à l'ombre d'un parasol",
    objectPosition: "50% 45%",
  },
];
