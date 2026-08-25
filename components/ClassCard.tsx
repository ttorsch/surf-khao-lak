import { Timer, Users } from "lucide-react";
import { totalMinutes, type SurfClass } from "@/lib/classes";
import { formatDuration, formatGroup, formatPrice } from "@/lib/format";
import { classPhotos } from "@/lib/photos";
import CtaButton from "./CtaButton";
import PlaceholderImage from "./PlaceholderImage";

export default function ClassCard({ surfClass }: { surfClass: SurfClass }) {
  const photo = classPhotos[surfClass.slug];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card">
      <div className="relative h-[170px]">
        <PlaceholderImage
          src={photo?.src}
          objectPosition={photo?.objectPosition}
          label={surfClass.name.toLowerCase()}
          alt={photo?.alt ?? `Séance : ${surfClass.name}`}
          sizes="(max-width: 640px) 100vw, 480px"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pt-5 pb-5.5">
        <h3 className="font-display text-[23px] leading-[1.15] text-navy">{surfClass.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-[1.5] text-navy/72 text-pretty">
          {surfClass.pitch}
        </p>

        <dl className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-b border-line pb-3.5 text-[13px] text-navy/68">
          <div className="flex items-center gap-1.5">
            <Timer className="size-[15px] text-orange" aria-hidden />
            <dt className="sr-only">Durée</dt>
            <dd>{formatDuration(totalMinutes(surfClass))}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="size-[15px] text-orange" aria-hidden />
            <dt className="sr-only">Groupe</dt>
            <dd>{formatGroup(surfClass)}</dd>
          </div>
        </dl>

        <div className="pt-4 pb-4.5">
          <p className="font-display text-[32px] tracking-[-0.02em] tabular-nums text-blue">
            {formatPrice(surfClass.priceThb)}
          </p>
          {surfClass.frenchSupplementThb !== null && (
            <p className="mt-1 text-[13px] text-navy/60">
              Cours en français : + {formatPrice(surfClass.frenchSupplementThb)} par réservation
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <CtaButton href={`/reservation/${surfClass.slug}`}>Réserver</CtaButton>
          <CtaButton href={`/cours/${surfClass.slug}`} variant="secondary">
            En savoir plus
          </CtaButton>
        </div>
      </div>
    </article>
  );
}
