import { MapPin, Sun } from "lucide-react";
import { site } from "@/lib/site";
import CtaButton from "./CtaButton";
import PlaceholderImage from "./PlaceholderImage";

/**
 * Au-dessus de la ligne de flottaison sur 390×844 : titre, promesse, CTA.
 * L'image de fond est l'élément LCP — d'où `priority`.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden">
      <PlaceholderImage
        label="héros — vague + surfeur, Khao Lak"
        alt="Un surfeur prend une vague au coucher du soleil à Khao Lak"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 via-ocean-900/40 to-ocean-900/15" />

      <div className="relative mx-auto w-full max-w-3xl px-5 pb-12 text-white sm:pb-16">
        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium ring-1 ring-white/30 backdrop-blur-sm">
          <MapPin className="size-3.5" aria-hidden />
          {site.beach}, {site.city}
        </p>
        <h1 className="font-display text-4xl leading-[1.05] font-semibold text-balance sm:text-6xl">
          Debout sur votre première vague dès aujourd&apos;hui
        </h1>
        <p className="mt-4 max-w-lg text-lg text-white/90 text-pretty">
          Cours de surf en français à Khao Lak. Petits groupes, moniteurs dans l&apos;eau avec
          vous, planche et lycra fournis.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <CtaButton href="#cours" className="w-full sm:w-auto">
            Voir les cours
          </CtaButton>
          <CtaButton href="#contact" variant="ghost" className="w-full sm:w-auto">
            <Sun className="size-4" aria-hidden />
            Poser une question
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
