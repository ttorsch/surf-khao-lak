import { Car, MapPin } from "lucide-react";
import { site } from "@/lib/site";

export default function Localisation() {
  const { lat, lng, zoom } = site.map;
  const bbox = `${lng - 0.02},${lat - 0.015},${lng + 0.02},${lat + 0.015}`;

  return (
    <section id="localisation" className="mx-auto max-w-5xl scroll-mt-4 px-5.5 pt-11 pb-2">
      <h2 className="font-display text-[28px] leading-[1.1] text-navy sm:text-4xl">
        Où nous trouver
      </h2>
      <p className="mt-2 max-w-xl text-[15px] leading-[1.55] text-navy/72 text-pretty">
        Nous surfons sur {site.beach}, à {site.city}. Rendez-vous directement sur le sable, à
        l&apos;heure convenue par message la veille.
      </p>

      <div className="mt-5 overflow-hidden rounded-card">
        <iframe
          title={`Carte : ${site.beach}, ${site.city}`}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}#map=${zoom}`}
          loading="lazy"
          className="h-[210px] w-full border-0 sm:h-96"
        />
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          {
            icon: MapPin,
            term: "Point de rendez-vous",
            detail: `${site.beach}, ${site.city}, ${site.country}`,
          },
          {
            icon: Car,
            term: "Comment venir",
            detail: "Accessible en scooter ou en taxi depuis tous les hôtels de Khao Lak.",
          },
        ].map(({ icon: Icon, term, detail }) => (
          <div
            key={term}
            className="flex gap-3 rounded-soft bg-surface px-4.5 py-4 shadow-soft"
          >
            <Icon className="mt-0.5 size-[18px] shrink-0 text-orange" aria-hidden />
            <div>
              <dt className="text-[13px] font-semibold text-navy">{term}</dt>
              <dd className="mt-0.5 text-sm leading-[1.45] text-navy/70">{detail}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
