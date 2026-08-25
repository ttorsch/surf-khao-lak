import { Car, ExternalLink, MapPin } from "lucide-react";
import { beachSlides } from "@/lib/beach-slides";
import { mapsUrl, site } from "@/lib/site";
import PhotoCarousel from "./PhotoCarousel";

export default function Localisation() {
  return (
    <section id="localisation" className="mx-auto max-w-5xl scroll-mt-4 px-5.5 pt-11 pb-2">
      <h2 className="font-display text-[28px] leading-[1.1] text-navy sm:text-4xl">
        Où nous trouver
      </h2>
      <p className="mt-2 max-w-xl text-[15px] leading-[1.55] text-navy/72 text-pretty">
        Nous surfons sur {site.beach}, à {site.city}. Rendez-vous directement sur le sable, à
        l&apos;heure convenue par message la veille.
      </p>

      {/* La plage d'abord : on donne envie avant de donner l'itinéraire. */}
      <div className="mt-5">
        <PhotoCarousel slides={beachSlides} label={`Photos de ${site.beach}`} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* Le point de rendez-vous ouvre Google Maps : sur mobile, l'app prend
            le relais et l'itinéraire est à un geste. */}
        <a
          href={mapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-3 rounded-soft bg-surface px-4.5 py-4 shadow-soft transition-colors hover:bg-sand-100"
        >
          <MapPin className="mt-0.5 size-[18px] shrink-0 text-orange" aria-hidden />
          <span className="flex-1">
            <span className="block text-[13px] font-semibold text-navy">Point de rendez-vous</span>
            <span className="mt-0.5 block text-sm leading-[1.45] text-navy/70">
              {site.beach}, {site.city}, {site.country}
            </span>
            <span className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold text-blue">
              Ouvrir dans Google Maps
              <ExternalLink className="size-3.5" aria-hidden />
            </span>
          </span>
        </a>

        <div className="flex gap-3 rounded-soft bg-surface px-4.5 py-4 shadow-soft">
          <Car className="mt-0.5 size-[18px] shrink-0 text-orange" aria-hidden />
          <div>
            <p className="text-[13px] font-semibold text-navy">Comment venir</p>
            <p className="mt-0.5 text-sm leading-[1.45] text-navy/70">
              Accessible en scooter ou en taxi depuis tous les hôtels de {site.city}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
