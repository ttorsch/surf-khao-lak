import { Clock, Users } from "lucide-react";
import type { SurfClass } from "@/lib/classes";
import { formatDuration, formatPrice } from "@/lib/format";
import CtaButton from "./CtaButton";
import PlaceholderImage from "./PlaceholderImage";

export default function ClassCard({ surfClass }: { surfClass: SurfClass }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ocean-900/8">
      <div className="relative aspect-16/10">
        <PlaceholderImage
          label={surfClass.name.toLowerCase()}
          alt={`Séance : ${surfClass.name}`}
          sizes="(max-width: 640px) 100vw, 380px"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl text-ocean-900">{surfClass.name}</h3>
        <p className="mt-1.5 flex-1 text-ocean-800/75">{surfClass.pitch}</p>

        <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ocean-800/70">
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden />
            <dt className="sr-only">Durée</dt>
            <dd>{formatDuration(surfClass.durationMin)}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="size-4" aria-hidden />
            <dt className="sr-only">Groupe</dt>
            <dd>
              {surfClass.groupSize === 1
                ? "Cours particulier"
                : `${surfClass.groupSize} personnes max.`}
            </dd>
          </div>
        </dl>

        <p className="mt-4 font-display text-2xl text-ocean-900">
          {formatPrice(surfClass.priceThb)}
          <span className="ml-1 text-sm font-normal text-ocean-800/60">/ personne</span>
        </p>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <CtaButton href={`/cours/${surfClass.slug}`} className="w-full sm:flex-1">
            Réserver
          </CtaButton>
          <CtaButton
            href={`/cours/${surfClass.slug}`}
            variant="secondary"
            className="w-full sm:flex-1"
          >
            En savoir plus
          </CtaButton>
        </div>
      </div>
    </article>
  );
}
