import { Car, MapPin } from "lucide-react";
import { site } from "@/lib/site";

export default function Localisation() {
  const { lat, lng, zoom } = site.map;
  const bbox = `${lng - 0.02},${lat - 0.015},${lng + 0.02},${lat + 0.015}`;

  return (
    <section id="localisation" className="mx-auto max-w-5xl scroll-mt-4 px-5 py-14 sm:py-20">
      <h2 className="font-display text-3xl text-ocean-900 sm:text-4xl">Où nous trouver</h2>
      <p className="mt-2 max-w-xl text-ocean-800/75">
        Nous surfons sur {site.beach}, à {site.city}. Rendez-vous directement sur le sable, à
        l&apos;heure convenue par message la veille.
      </p>

      <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-ocean-900/10">
        <iframe
          title={`Carte : ${site.beach}, ${site.city}`}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}#map=${zoom}`}
          loading="lazy"
          className="h-72 w-full border-0 sm:h-96"
        />
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-ocean-900/8">
          <MapPin className="mt-0.5 size-5 shrink-0 text-ocean-500" aria-hidden />
          <div>
            <dt className="font-semibold text-ocean-900">Point de rendez-vous</dt>
            <dd className="text-ocean-800/75">
              {site.beach}, {site.city}, {site.country}
            </dd>
          </div>
        </div>
        <div className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-ocean-900/8">
          <Car className="mt-0.5 size-5 shrink-0 text-ocean-500" aria-hidden />
          <div>
            <dt className="font-semibold text-ocean-900">Comment venir</dt>
            <dd className="text-ocean-800/75">
              Accessible en scooter ou en taxi depuis tous les hôtels de Khao Lak.
            </dd>
          </div>
        </div>
      </dl>
    </section>
  );
}
