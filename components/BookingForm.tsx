"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { SurfClass } from "@/lib/classes";
import { formatPrice } from "@/lib/format";

const today = () => new Date().toISOString().slice(0, 10);

/**
 * Le formulaire n'envoie JAMAIS de prix : uniquement le slug du cours et les
 * détails de la réservation. Le serveur retrouve le tarif réel.
 */
export default function BookingForm({ surfClass }: { surfClass: SurfClass }) {
  const [participants, setParticipants] = useState(1);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxParticipants = surfClass.groupSize === 1 ? 1 : surfClass.groupSize;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: surfClass.slug,
          name: data.get("name"),
          email: data.get("email"),
          date: data.get("date"),
          participants: Number(data.get("participants")),
          level: data.get("level"),
          notes: data.get("notes"),
        }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Réservation impossible.");
      window.location.href = payload.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setPending(false);
    }
  }

  const field =
    "mt-1.5 block w-full min-h-12 rounded-xl border-0 bg-white px-4 text-ocean-900 ring-1 ring-ocean-900/15 focus:ring-2 focus:ring-ocean-500 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="font-medium text-ocean-900">
          Votre nom
        </label>
        <input id="name" name="name" type="text" required minLength={2} autoComplete="name" className={field} />
      </div>

      <div>
        <label htmlFor="email" className="font-medium text-ocean-900">
          Votre e-mail
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        <p className="mt-1.5 text-sm text-ocean-800/65">
          C&apos;est là que vous recevrez votre confirmation.
        </p>
      </div>

      <div>
        <label htmlFor="date" className="font-medium text-ocean-900">
          Date souhaitée
        </label>
        <input id="date" name="date" type="date" required min={today()} className={field} />
        <p className="mt-1.5 text-sm text-ocean-800/65">
          Nous confirmons l&apos;horaire par message la veille, selon les marées.
        </p>
      </div>

      <div>
        <label htmlFor="participants" className="font-medium text-ocean-900">
          Nombre de participants
        </label>
        <select
          id="participants"
          name="participants"
          className={field}
          value={participants}
          onChange={(e) => setParticipants(Number(e.target.value))}
        >
          {Array.from({ length: maxParticipants }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n > 1 ? "personnes" : "personne"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="level" className="font-medium text-ocean-900">
          Votre niveau
        </label>
        <select id="level" name="level" className={field} defaultValue="Jamais surfé">
          <option>Jamais surfé</option>
          <option>Quelques fois</option>
          <option>Je surfe régulièrement</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="font-medium text-ocean-900">
          Quelque chose à nous signaler ? <span className="font-normal text-ocean-800/60">(facultatif)</span>
        </label>
        <textarea id="notes" name="notes" rows={3} maxLength={400} className={`${field} py-3`} />
      </div>

      <div className="rounded-2xl bg-sand-100 p-4">
        <p className="flex items-baseline justify-between text-ocean-900">
          <span>
            {surfClass.name} × {participants}
          </span>
          <span className="font-display text-2xl">
            {formatPrice(surfClass.priceThb * participants)}
          </span>
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-800 ring-1 ring-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-sunset-500 px-6 text-base font-semibold text-white shadow-lg shadow-sunset-600/25 transition-colors hover:bg-sunset-600 disabled:opacity-70"
      >
        {pending && <Loader2 className="size-5 animate-spin" aria-hidden />}
        {pending ? "Redirection vers le paiement…" : "Payer et réserver"}
      </button>

      <p className="text-center text-sm text-ocean-800/65">
        Paiement sécurisé par Stripe. Aucune donnée bancaire ne transite par ce site.
      </p>
    </form>
  );
}
