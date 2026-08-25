import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowLeft, CalendarClock, Timer, Users } from "lucide-react";
import { classes, getClass, totalMinutes } from "@/lib/classes";
import { formatDuration, formatGroup, formatPrice } from "@/lib/format";
import { classPhotos } from "@/lib/photos";
import { site, whatsappUrl } from "@/lib/site";
import CtaButton from "@/components/CtaButton";
import { LogoBadge } from "@/components/Logo";
import PlaceholderImage from "@/components/PlaceholderImage";
import StickyCta from "@/components/StickyCta";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return classes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const surfClass = getClass(slug);
  if (!surfClass) return { title: "Cours introuvable" };
  return { title: surfClass.name, description: surfClass.pitch };
}

/** Information que l'école n'a pas encore communiquée : jamais inventée. */
function AConfirmer() {
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900 uppercase">
      à confirmer
    </span>
  );
}

export default async function ClassPage({ params }: Params) {
  const { slug } = await params;
  const surfClass = getClass(slug);
  if (!surfClass) notFound();

  const { conditions } = surfClass;
  const photo = classPhotos[surfClass.slug];

  return (
    <main className="pb-28">
      <div className="relative aspect-4/3 sm:aspect-21/9">
        <PlaceholderImage
          src={photo?.src}
          objectPosition={photo?.objectPosition}
          label={surfClass.name.toLowerCase()}
          alt={photo?.alt ?? `Séance : ${surfClass.name}`}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
        <Link
          href="/#cours"
          className="absolute top-4 left-4 z-10 flex min-h-11 items-center gap-1.5 rounded-full bg-black/40 px-4 text-sm font-medium text-white backdrop-blur-sm"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Tous les cours
        </Link>
        <Link
          href="/"
          aria-label={`${site.name} — retour à l'accueil`}
          className="absolute top-4 right-4 z-10 flex"
        >
          <LogoBadge size={44} />
        </Link>
      </div>

      <div className="mx-auto max-w-3xl px-5">
        <header className="relative z-10 -mt-10 rounded-card bg-surface p-6 shadow-sm shadow-soft">
          <h1 className="font-display text-3xl text-navy sm:text-4xl">{surfClass.name}</h1>
          <p className="mt-2 text-navy/72">{surfClass.experience}</p>

          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-navy/72">
            <div className="flex items-center gap-1.5">
              <Timer className="size-4" aria-hidden />
              <dt className="sr-only">Durée</dt>
              <dd>{formatDuration(totalMinutes(surfClass))} au total</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="size-4" aria-hidden />
              <dt className="sr-only">Encadrement</dt>
              <dd>{surfClass.ratio}</dd>
            </div>
          </dl>

          <p className="font-display mt-5 text-3xl text-navy">
            {formatPrice(surfClass.priceThb)}
          </p>
          {surfClass.frenchSupplementThb !== null && (
            <p className="mt-1.5 text-sm text-navy/70">
              Cours en français : + {formatPrice(surfClass.frenchSupplementThb)} par réservation
            </p>
          )}

          <CtaButton href={`/reservation/${surfClass.slug}`} className="mt-5 w-full">
            Réserver
          </CtaButton>
        </header>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-navy">Le déroulé</h2>
          <ol className="mt-4 space-y-4">
            {[surfClass.land, surfClass.water].map((part, i) => (
              <li
                key={part.text}
                className="flex gap-4 rounded-soft bg-surface p-5 shadow-soft"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-navy">
                    {i === 0 ? "Sur le sable" : "Dans l'eau"} · {formatDuration(part.minutes)}
                  </p>
                  <p className="mt-1 text-navy/85">{part.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {surfClass.schedule && (
          <section className="mt-6 flex gap-3 rounded-soft bg-sand-100 p-5">
            <CalendarClock className="mt-0.5 size-5 shrink-0 text-orange" aria-hidden />
            <p className="text-navy/85">{surfClass.schedule}</p>
          </section>
        )}

        <section className="mt-10 rounded-card bg-sand-100 p-6">
          <h2 className="font-display flex items-center gap-2 text-2xl text-navy">
            <AlertCircle className="size-5 text-orange-dark" aria-hidden />
            Conditions
          </h2>
          <dl className="mt-4 space-y-4 text-navy/85">
            <div>
              <dt className="font-semibold text-navy">Âge</dt>
              <dd>
                De {surfClass.ageMin} à {surfClass.ageMax} ans
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Niveau requis</dt>
              <dd>{surfClass.experience}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Taille du groupe</dt>
              <dd>
                {formatGroup(surfClass)} — {surfClass.ratio}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Niveau de nage requis</dt>
              <dd>{conditions.swimming ?? <AConfirmer />}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">À apporter</dt>
              <dd>{conditions.bring?.join(", ") ?? <AConfirmer />}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Fourni par l&apos;école</dt>
              <dd>{conditions.provided?.join(", ") ?? <AConfirmer />}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Météo</dt>
              <dd>{conditions.weather ?? <AConfirmer />}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Annulation et remboursement</dt>
              <dd>{conditions.cancellation ?? <AConfirmer />}</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-navy/60">
            Conditions complètes sur la page{" "}
            <Link href="/conditions" className="underline">
              conditions de vente
            </Link>
            .
          </p>
        </section>

        <section className="mt-10 rounded-card bg-sand-100 p-6">
          <h2 className="font-display text-2xl text-navy">Un doute sur votre niveau ?</h2>
          <p className="mt-2 text-navy/80">
            Écrivez-nous sur WhatsApp avant de réserver, on vous dira franchement quelle formule
            vous convient.
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center rounded-full bg-orange px-6 font-semibold text-white transition-colors hover:bg-orange-dark"
          >
            Poser la question sur WhatsApp
          </a>
        </section>
      </div>

      <StickyCta
        href={`/reservation/${surfClass.slug}`}
        label="Réserver"
        price={formatPrice(surfClass.priceThb)}
      />
    </main>
  );
}
