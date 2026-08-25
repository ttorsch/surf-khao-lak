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
  const { minParticipants: min, maxParticipants: max } = surfClass;
  const fixedSize = min === max;

  const [participants, setParticipants] = useState(min);
  const [french, setFrench] = useState(false);
  const supplement = surfClass.frenchSupplementThb;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Un tarif « forfait » ou « groupe » est global, pas multiplié. */
  const base =
    surfClass.priceUnit === "personne" ? surfClass.priceThb * participants : surfClass.priceThb;
  /** Le supplément langue est forfaitaire : une fois par réservation. */
  const total = base + (french && supplement !== null ? supplement : 0);

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
          participants,
          french,
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
    "mt-1.5 block h-12 w-full rounded-soft border border-line-strong bg-surface px-4 text-navy focus:border-orange focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-[15px] font-semibold text-navy">
          Votre nom
        </label>
        <input id="name" name="name" type="text" required minLength={2} autoComplete="name" className={field} />
      </div>

      <div>
        <label htmlFor="email" className="text-[15px] font-semibold text-navy">
          Votre e-mail
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        <p className="mt-1.5 text-[13px] text-navy/65">
          C&apos;est là que vous recevrez votre confirmation.
        </p>
      </div>

      <div>
        <label htmlFor="date" className="text-[15px] font-semibold text-navy">
          Date souhaitée
        </label>
        <input id="date" name="date" type="date" required min={today()} className={field} />
        <p className="mt-1.5 text-[13px] text-navy/65">
          Nous confirmons l&apos;horaire par message la veille, selon les marées.
        </p>
      </div>

      <div>
        <label htmlFor="participants" className="text-[15px] font-semibold text-navy">
          Nombre de participants
        </label>
        {fixedSize ? (
          <p className={`${field} flex items-center text-navy/70`}>
            {max} {max > 1 ? "personnes" : "personne"} — imposé par la formule
          </p>
        ) : (
          <select
            id="participants"
            name="participants"
            className={field}
            value={participants}
            onChange={(e) => setParticipants(Number(e.target.value))}
          >
            {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
              <option key={n} value={n}>
                {n} {n > 1 ? "personnes" : "personne"}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label htmlFor="level" className="text-[15px] font-semibold text-navy">
          Votre niveau
        </label>
        <select id="level" name="level" className={field} defaultValue="Jamais surfé">
          <option>Jamais surfé</option>
          <option>Quelques fois</option>
          <option>Je surfe régulièrement</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="text-[15px] font-semibold text-navy">
          Quelque chose à nous signaler ?{" "}
          <span className="font-normal text-navy/60">(facultatif)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          maxLength={400}
          className="mt-1.5 block w-full rounded-soft border border-line-strong bg-surface px-4 py-3 text-navy focus:border-orange focus:outline-none"
        />
      </div>

      {supplement !== null && (
        <label className="flex cursor-pointer items-start gap-3 rounded-soft border border-line-strong bg-surface p-4">
          <input
            type="checkbox"
            checked={french}
            onChange={(e) => setFrench(e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-orange"
          />
          <span>
            <span className="block font-semibold text-navy">Je souhaite un cours en français</span>
            <span className="block text-[13px] text-navy/65">
              Supplément de {formatPrice(supplement)} par réservation, quel que soit le nombre de
              participants.
            </span>
          </span>
        </label>
      )}

      <div className="space-y-1.5 rounded-soft bg-sand-100 p-4">
        <p className="flex items-baseline justify-between gap-3 text-navy">
          <span>
            {surfClass.name}
            {surfClass.priceUnit === "personne" && ` × ${participants}`}
          </span>
          <span className="tabular-nums">{formatPrice(base)}</span>
        </p>
        {french && supplement !== null && (
          <p className="flex items-baseline justify-between gap-3 text-sm text-navy/70">
            <span>Cours en français</span>
            <span className="tabular-nums">+ {formatPrice(supplement)}</span>
          </p>
        )}
        <p className="flex items-baseline justify-between gap-3 border-t border-line pt-2 text-navy">
          <span className="font-semibold">Total</span>
          <span className="font-display text-2xl tabular-nums text-blue">
            {formatPrice(total)}
          </span>
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-soft bg-red-50 p-3 text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-orange px-6 text-[15px] font-semibold text-cream shadow-orange transition-colors hover:bg-orange-dark disabled:opacity-70"
      >
        {pending && <Loader2 className="size-5 animate-spin" aria-hidden />}
        {pending ? "Redirection vers le paiement…" : "Payer et réserver"}
      </button>

      <p className="text-center text-[13px] text-navy/65">
        Paiement sécurisé par Stripe. Aucune donnée bancaire ne transite par ce site.
      </p>
    </form>
  );
}
