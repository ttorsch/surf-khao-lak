import { getImageProps } from "next/image";
import { MapPin } from "lucide-react";
import heroDesktop from "@/public/hero-surf-desktop.jpg";
import heroMobile from "@/public/hero-surf.jpg";
import { site, whatsappUrl } from "@/lib/site";
import CtaButton from "./CtaButton";
import Logo from "./Logo";
import Wave from "./Wave";

/**
 * Photo du héros, en direction artistique : deux cadrages différents.
 *
 * - Mobile : recadrage serré 4:3, le sujet remplit le cadre vertical.
 * - Desktop (≥ 640 px) : la photo d'origine en 3:2, qui respire dans un
 *   cadre large.
 *
 * `<picture>` + `media` est indispensable ici : deux <Image> masqués en CSS
 * seraient tous les deux téléchargés, et le mobile paierait la version
 * desktop pour rien. Une source non retenue par `media`, elle, n'est jamais
 * chargée.
 */
function HeroPhoto() {
  const common = {
    alt: "Debout sur la planche, bras écartés, en train de glisser sur une vague",
    sizes: "100vw",
    fill: true,
    priority: true,
    quality: 80,
  } as const;

  const { props: desktop } = getImageProps({ ...common, src: heroDesktop });
  const { props: mobile } = getImageProps({ ...common, src: heroMobile });

  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
      <img
        {...mobile}
        alt={common.alt}
        /* Le cadrage suit la source : chaque photo a son propre point d'ancrage. */
        className="absolute inset-0 size-full object-cover object-[35%_50%] sm:object-[50%_30%]"
      />
    </picture>
  );
}

/**
 * Héros : 80 % de la hauteur d'écran, CTA visible sans défiler sur 390×844.
 * La photo est l'élément LCP — d'où `priority`.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[80svh] flex-col">
      <HeroPhoto />

      {/* Assombrissement neutre, sans teinte : les couleurs de la photo restent
          fidèles, mais le texte garde son contraste sur l'écume blanche. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col px-5.5 pt-5 pb-16">
        <div className="flex items-center">
          <Logo tone="onLight" variant="badge" markSize={40} spread />
        </div>

        <div className="mt-auto pt-24">
          <p className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-cream/40 bg-cream/15 py-1.5 pr-3 pl-2.5 text-xs text-cream">
            <MapPin className="size-3.5" aria-hidden />
            {site.city}, {site.country}
          </p>
          <h1 className="font-display text-[40px] leading-[1.02] tracking-[-0.03em] text-cream text-pretty sm:text-6xl">
            Apprenez à surfer à {site.city}
          </h1>
          <p className="mt-3 max-w-[330px] text-[15px] leading-[1.55] text-cream/90 text-pretty">
            Cours tous niveaux au paradis du surf à {site.beach}. Matériel et équipement
            inclus
          </p>
          <div className="mt-6 flex gap-2.5">
            <CtaButton href="#cours" size="sm" className="flex-1 sm:flex-none">
              Voir les cours
            </CtaButton>
            <CtaButton
              href={whatsappUrl()}
              external
              variant="ghost"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              Poser une question
            </CtaButton>
          </div>
        </div>
      </div>

      <Wave fill="var(--color-sand-50)" />
    </section>
  );
}
