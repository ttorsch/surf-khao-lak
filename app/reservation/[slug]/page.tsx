import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { classes, getClass, totalMinutes } from "@/lib/classes";
import { formatDuration } from "@/lib/format";
import BookingForm from "@/components/BookingForm";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return classes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const surfClass = getClass(slug);
  return { title: surfClass ? `Réserver — ${surfClass.name}` : "Réservation" };
}

export default async function BookingPage({ params }: Params) {
  const { slug } = await params;
  const surfClass = getClass(slug);
  if (!surfClass) notFound();

  return (
    <main className="mx-auto max-w-xl px-5 py-8">
      <Link
        href={`/cours/${surfClass.slug}`}
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-navy"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Retour au cours
      </Link>

      <h1 className="font-display mt-2 text-3xl text-navy">Réserver</h1>
      <p className="mt-1.5 text-navy/72">
        {surfClass.name} · {formatDuration(totalMinutes(surfClass))}
      </p>

      <div className="mt-7">
        <BookingForm surfClass={surfClass} />
      </div>
    </main>
  );
}
