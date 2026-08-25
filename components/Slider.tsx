import { slides } from "@/lib/slides";
import PhotoCarousel from "./PhotoCarousel";

/** Le bloc « séduction ». Il vend la sensation, pas le produit. */
export default function Slider() {
  return (
    <section aria-label="Photos de l'école" className="mx-auto max-w-5xl px-5.5 pt-9 pb-2">
      <h2 className="font-display text-[28px] leading-[1.1] text-navy sm:text-4xl">
        Apprendre à surfer chez nous
      </h2>
      <p className="mt-2 max-w-md text-[15px] leading-[1.55] text-navy/72 text-pretty">
        De l&apos;eau à 29 °C, des vagues d&apos;apprentissage et personne pour vous presser.
      </p>

      <div className="mt-5">
        <PhotoCarousel slides={slides} label="Photos de l'école" />
      </div>
    </section>
  );
}
