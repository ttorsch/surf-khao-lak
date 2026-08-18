import type { StaticImageData } from "next/image";
import collectif from "@/public/cours-collectif.jpg";
import duo from "@/public/cours-duo.jpg";
import famille from "@/public/cours-famille.jpg";
import prive from "@/public/cours-prive.jpg";

/** Photo de chaque cours, avec le cadrage qui garde les sujets dans l'image. */
export const classPhotos: Record<
  string,
  { src: StaticImageData; alt: string; objectPosition: string }
> = {
  "cours-collectif": {
    src: collectif,
    alt: "Un petit groupe et ses planches sur la plage, face à la mer",
    objectPosition: "50% 72%",
  },
  "cours-prive": {
    src: prive,
    alt: "Un moniteur guide un élève debout sur la planche pendant l'exercice de lever",
    objectPosition: "45% 78%",
  },
  "cours-duo": {
    src: duo,
    alt: "Deux élèves travaillent leur position sur la planche avec un moniteur",
    objectPosition: "50% 78%",
  },
  "cours-famille": {
    src: famille,
    alt: "Trois élèves alignés sur leurs planches pendant l'échauffement avec le moniteur",
    objectPosition: "50% 70%",
  },
};
