import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowLeft, Check, Clock, Users } from "lucide-react";
import { classes, getClass } from "@/lib/classes";
import { formatDuration, formatPrice } from "@/lib/format";
import { whatsappUrl } from "@/lib/site";
import CtaButton from "@/components/CtaButton";
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

export default async function ClassPage({ params }: Params) {
  const { slug } = await params;
  const surfClass = getClass(slug);
  if (!surfClass) notFound();

  const { conditions } = surfClass;

  return (
    <main className="pb-28">
      <div className="relative aspect-4/3 sm:aspect-21/9">
        <PlaceholderImage
          label={surfClass.name.toLowerCase()}
          alt={`Séance : ${surfClass.name}`}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/70 to-transparent" />
        <Link
          href="/#cours"
          className="absolute top-4 left-4 flex min-h-11 items-center gap-1.5 rounded-full bg-black/40 px-4 text-sm font-medium text-white backdrop-blur-sm"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Tous les cours
        </Link>
      </div>

      <div className="mx-auto max-w-3xl px-5">
        <header className="relative z-10 -mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ocean-900/8">
          <p className="text-sm font-medium text-sunset-600">{surfClass.level}</p>
          <h1 className="font-display mt-1 text-3xl text-ocean-900 sm:text-4xl">
            {surfClass.name}
          </h1>

          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-ocean-800/75">
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

          <p className="font-display mt-5 text-3xl text-ocean-900">
            {formatPrice(surfClass.priceThb)}
            <span className="ml-1.5 text-base font-normal text-ocean-800/60">/ personne</span>
          </p>

          <CtaButton href={`/reservation/${surfClass.slug}`} className="mt-5 w-full">
            Réserver
          </CtaButton>
        </header>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-ocean-900">La séance</h2>
          <p className="mt-3 text-ocean-800/85">{surfClass.description}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-ocean-900">Ce qui est compris</h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {surfClass.included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-ocean-800/85">
                <Check className="mt-0.5 size-5 shrink-0 text-ocean-500" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-3xl bg-sand-100 p-6">
          <h2 className="font-display flex items-center gap-2 text-2xl text-ocean-900">
            <AlertCircle className="size-5 text-sunset-600" aria-hidden />
            Conditions
          </h2>
          <dl className="mt-4 space-y-4 text-ocean-800/85">
            <div>
              <dt className="font-semibold text-ocean-900">Âge minimum</dt>
              <dd>{conditions.minAge} ans</dd>
            </div>
            <div>
              <dt className="font-semibold text-ocean-900">Niveau de nage requis</dt>
              <dd>{conditions.swimming}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ocean-900">À apporter</dt>
              <dd>{conditions.bring.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ocean-900">Fourni par l&apos;école</dt>
              <dd>{conditions.provided.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ocean-900">Météo</dt>
              <dd>{conditions.weather}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ocean-900">Annulation et remboursement</dt>
              <dd>{conditions.cancellation}</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-sand-700">
            Conditions complètes sur la page{" "}
            <Link href="/conditions" className="underline">
              conditions de vente
            </Link>
            .
          </p>
        </section>

        <section className="mt-10 rounded-3xl bg-ocean-50 p-6">
          <h2 className="font-display text-2xl text-ocean-900">Un doute sur votre niveau ?</h2>
          <p className="mt-2 text-ocean-800/80">
            Écrivez-nous sur WhatsApp avant de réserver, on vous dira franchement quelle formule
            vous convient.
          </p>
          <a
            href={whatsappUrl(`Bonjour ! Je m'intéresse au cours « ${surfClass.name} ».`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center rounded-full bg-ocean-600 px-6 font-semibold text-white transition-colors hover:bg-ocean-800"
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
