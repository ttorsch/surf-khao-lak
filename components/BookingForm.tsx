"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import type { SurfClass } from "@/lib/classes";
import { formatPrice } from "@/lib/format";
import { COUNTRIES, OTHER_COUNTRY, countryLabel, dialOf } from "@/lib/countries";
import {
  HEIGHT,
  LEVELS,
  MAX,
  WEIGHT,
  emptyParticipant,
  validateParticipant,
  type Level,
  type Participant,
} from "@/lib/participants";

const today = () => new Date().toISOString().slice(0, 10);

const field =
  "mt-1.5 block h-12 w-full rounded-soft border border-line-strong bg-surface px-4 text-navy focus:border-orange focus:outline-none";
const labelClass = "text-[15px] font-semibold text-navy";
const hint = "mt-1.5 text-[13px] text-navy/65";
const optional = <span className="font-normal text-navy/60">(facultatif)</span>;

/**
 * Le formulaire n'envoie JAMAIS de prix : uniquement le slug du cours et les
 * détails de la réservation. Le serveur retrouve le tarif réel.
 *
 * Une fiche par élève, remplie l'une après l'autre : la fiche du participant
 * suivant n'apparaît qu'une fois la précédente complète et « Suivant » cliqué.
 * Quatre formulaires affichés d'un coup, c'est un mur qui fait fuir ; une fiche
 * à la fois avec la progression visible, ça se termine.
 *
 * Le participant 1 est le contact de la réservation — lui seul donne un
 * téléphone ou un e-mail.
 */
export default function BookingForm({ surfClass }: { surfClass: SurfClass }) {
  const { minParticipants: min, maxParticipants: max } = surfClass;
  const fixedSize = min === max;

  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState(min);
  const [people, setPeople] = useState<Participant[]>(() =>
    Array.from({ length: min }, emptyParticipant),
  );
  /** Fiche actuellement ouverte. */
  const [current, setCurrent] = useState(0);
  /** Fiche la plus avancée atteinte : au-delà, rien n'est encore affiché. */
  const [furthest, setFurthest] = useState(0);
  const [french, setFrench] = useState(false);
  const supplement = surfClass.frenchSupplementThb;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const last = participants - 1;
  /** Le récapitulatif et le paiement n'apparaissent qu'une fois tout le monde saisi. */
  const ready = current === last && furthest === last;

  /** Les fiches suivent le nombre de participants, sans perdre ce qui est déjà saisi. */
  function changeCount(next: number) {
    setError(null);
    setParticipants(next);
    setPeople((rows) => Array.from({ length: next }, (_, i) => rows[i] ?? emptyParticipant()));
    // Réduire le groupe ne doit pas laisser le parcours pointer dans le vide.
    setCurrent((i) => Math.min(i, next - 1));
    setFurthest((i) => Math.min(i, next - 1));
  }

  function update<K extends keyof Participant>(index: number, key: K, value: Participant[K]) {
    setPeople((rows) => rows.map((p, i) => (i === index ? { ...p, [key]: value } : p)));
  }

  /** Valide la fiche ouverte avant de révéler la suivante. */
  function goNext() {
    setError(null);

    if (!date) {
      setError("Merci de choisir d'abord une date.");
      return;
    }

    const problem = validateParticipant(people[current], current, current === 0);
    if (problem) {
      setError(problem);
      return;
    }

    // Après correction d'une fiche déjà validée, on repart d'où on en était.
    const next = current < furthest ? furthest : current + 1;
    setCurrent(next);
    setFurthest((f) => Math.max(f, next));
  }

  /** Un tarif « forfait » ou « groupe » est global, pas multiplié. */
  const base =
    surfClass.priceUnit === "personne" ? surfClass.priceThb * participants : surfClass.priceThb;
  /** Le supplément langue est forfaitaire : une fois par réservation. */
  const total = base + (french && supplement !== null ? supplement : 0);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    // Contrôle immédiat côté client ; le serveur revalide tout de son côté.
    for (const [index, person] of people.entries()) {
      const problem = validateParticipant(person, index, index === 0);
      if (problem) {
        setError(problem);
        setCurrent(index);
        return;
      }
    }

    setPending(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: surfClass.slug, date, french, people }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Réservation impossible.");
      window.location.href = payload.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="date" className={labelClass}>
          Date souhaitée
        </label>
        <input
          id="date"
          type="date"
          required
          min={today()}
          className={field}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <p className={hint}>
          Nous confirmons l&apos;horaire par message la veille, selon les marées.
        </p>
      </div>

      <div>
        <label htmlFor="participants" className={labelClass}>
          Nombre de participants
        </label>
        {fixedSize ? (
          <p className={`${field} flex items-center text-navy/70`}>
            {max} {max > 1 ? "personnes" : "personne"} — imposé par la formule
          </p>
        ) : (
          <select
            id="participants"
            className={field}
            value={participants}
            onChange={(e) => changeCount(Number(e.target.value))}
          >
            {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
              <option key={n} value={n}>
                {n} {n > 1 ? "personnes" : "personne"}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Seules les fiches déjà atteintes existent : la suivante se mérite. */}
      {people.slice(0, furthest + 1).map((person, index) =>
        index === current ? (
          <ParticipantFields
            key={index}
            person={person}
            index={index}
            total={participants}
            onChange={(key, value) => update(index, key, value)}
          />
        ) : (
          <CompletedRow
            key={index}
            person={person}
            index={index}
            onEdit={() => {
              setError(null);
              setCurrent(index);
            }}
          />
        ),
      )}

      {error && (
        <p role="alert" className="rounded-soft bg-red-50 p-3 text-red-800">
          {error}
        </p>
      )}

      {!ready && (
        <button
          type="button"
          onClick={goNext}
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-navy px-6 text-[15px] font-semibold text-cream transition-opacity hover:opacity-90"
        >
          {current < furthest
            ? "Enregistrer"
            : `Suivant — participant ${current + 2} sur ${participants}`}
        </button>
      )}

      {ready && (
        <>
          {supplement !== null && (
            <label className="flex cursor-pointer items-start gap-3 rounded-soft border border-line-strong bg-surface p-4">
              <input
                type="checkbox"
                checked={french}
                onChange={(e) => setFrench(e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-orange"
              />
              <span>
                <span className="block font-semibold text-navy">
                  Je souhaite un cours en français
                </span>
                <span className="block text-[13px] text-navy/65">
                  Supplément de {formatPrice(supplement)} par réservation, quel que soit le nombre
                  de participants.
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
        </>
      )}
    </form>
  );
}

/** Fiche déjà validée, repliée sur une ligne et rouvrable d'un tap. */
function CompletedRow({
  person,
  index,
  onEdit,
}: {
  person: Participant;
  index: number;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-soft border border-line bg-sand-100 px-4 py-3">
      <Check className="size-5 shrink-0 text-blue" aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] text-navy/60">Participant {index + 1}</span>
        <span className="block truncate font-semibold text-navy">{person.fullName}</span>
      </span>
      <button
        type="button"
        onClick={onEdit}
        className="min-h-11 shrink-0 px-1 text-sm font-semibold text-blue underline underline-offset-2"
      >
        Modifier
      </button>
    </div>
  );
}

/** Une fiche par élève. Seul le participant 1 renseigne un moyen de contact. */
function ParticipantFields({
  person,
  index,
  total,
  onChange,
}: {
  person: Participant;
  index: number;
  total: number;
  onChange: <K extends keyof Participant>(key: K, value: Participant[K]) => void;
}) {
  const isLead = index === 0;
  const solo = total === 1;
  const id = (name: string) => `p${index}-${name}`;
  const isOther = person.country === OTHER_COUNTRY;

  return (
    <fieldset className="space-y-5 rounded-soft border border-line-strong bg-surface/60 p-4">
      <legend className="px-1 font-display text-lg text-navy">
        {solo ? "Vos informations" : `Participant ${index + 1} sur ${total}`}
      </legend>

      {!solo && isLead && (
        <p className="-mt-1 text-[13px] text-navy/65">
          Vous recevrez la confirmation de toute la réservation.
        </p>
      )}

      <div>
        <label htmlFor={id("name")} className={labelClass}>
          Nom complet
        </label>
        <input
          id={id("name")}
          type="text"
          required
          minLength={2}
          maxLength={MAX.fullName}
          autoComplete={isLead ? "name" : "off"}
          className={field}
          value={person.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor={id("id")} className={labelClass}>
          N° de passeport {optional}
        </label>
        <input
          id={id("id")}
          type="text"
          maxLength={MAX.idNumber}
          className={field}
          value={person.idNumber}
          onChange={(e) => onChange("idNumber", e.target.value)}
        />
        <p className={hint}>Demandé par l&apos;assurance de l&apos;école.</p>
      </div>

      <div>
        <label htmlFor={id("nationality")} className={labelClass}>
          Nationalité {optional}
        </label>
        <input
          id={id("nationality")}
          type="text"
          maxLength={MAX.nationality}
          className={field}
          value={person.nationality}
          onChange={(e) => onChange("nationality", e.target.value)}
        />
      </div>

      {isLead && (
        <div className="space-y-4">
          <div>
            <label htmlFor={id("phone")} className={labelClass}>
              Téléphone
            </label>
            <div className="mt-1.5 grid grid-cols-[7.5rem_1fr] gap-2">
              <label htmlFor={id("country")} className="sr-only">
                Indicatif du pays
              </label>
              <select
                id={id("country")}
                className={`${field} mt-0 truncate px-3`}
                value={person.country}
                onChange={(e) => onChange("country", e.target.value)}
              >
                {COUNTRIES.map(([iso]) => (
                  <option key={iso} value={iso}>
                    {countryLabel(iso)}
                  </option>
                ))}
                <option value={OTHER_COUNTRY}>{countryLabel(OTHER_COUNTRY)}</option>
              </select>
              <input
                id={id("phone")}
                type="tel"
                inputMode="tel"
                maxLength={MAX.phone}
                autoComplete="tel-national"
                placeholder={isOther ? "+212 6 12 34 56 78" : "6 12 34 56 78"}
                className={`${field} mt-0`}
                value={person.phone}
                onChange={(e) => onChange("phone", e.target.value)}
              />
            </div>
            <p className={hint}>
              {isOther
                ? "Saisissez le numéro complet, indicatif compris."
                : `Sans l'indicatif : il est déjà sélectionné (${dialOf(person.country)}).`}
            </p>
          </div>

          <div>
            <label htmlFor={id("email")} className={labelClass}>
              E-mail
            </label>
            <input
              id={id("email")}
              type="email"
              maxLength={MAX.email}
              autoComplete="email"
              className={field}
              value={person.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </div>

          <p className={hint}>
            Téléphone ou e-mail : l&apos;un des deux suffit. C&apos;est là que vous recevrez votre
            confirmation.
          </p>
        </div>
      )}

      <div>
        <span className={labelClass}>Poids et taille</span>
        <div className="mt-1.5 grid grid-cols-2 gap-3">
          <div className="relative">
            <label htmlFor={id("weight")} className="sr-only">
              Poids en kilogrammes
            </label>
            <input
              id={id("weight")}
              type="number"
              inputMode="numeric"
              required
              min={WEIGHT.min}
              max={WEIGHT.max}
              className={`${field} mt-0 pr-12`}
              value={person.weightKg}
              onChange={(e) => onChange("weightKg", e.target.value)}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/55">
              kg
            </span>
          </div>
          <div className="relative">
            <label htmlFor={id("height")} className="sr-only">
              Taille en centimètres
            </label>
            <input
              id={id("height")}
              type="number"
              inputMode="numeric"
              required
              min={HEIGHT.min}
              max={HEIGHT.max}
              className={`${field} mt-0 pr-12`}
              value={person.heightCm}
              onChange={(e) => onChange("heightCm", e.target.value)}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/55">
              cm
            </span>
          </div>
        </div>
        <p className={hint}>
          Nécessaire pour préparer la planche et la combinaison à votre gabarit.
        </p>
      </div>

      <div>
        <label htmlFor={id("health")} className={labelClass}>
          Problème de santé à signaler ? {optional}
        </label>
        <textarea
          id={id("health")}
          rows={3}
          maxLength={MAX.health}
          className="mt-1.5 block w-full rounded-soft border border-line-strong bg-surface px-4 py-3 text-navy focus:border-orange focus:outline-none"
          value={person.health}
          onChange={(e) => onChange("health", e.target.value)}
        />
        <p className={hint}>
          Asthme, blessure, traitement en cours… Le moniteur en tient compte dans l&apos;eau.
        </p>
      </div>

      <div>
        <label htmlFor={id("level")} className={labelClass}>
          Niveau de surf
        </label>
        <select
          id={id("level")}
          className={field}
          value={person.level}
          onChange={(e) => onChange("level", e.target.value as Level)}
        >
          {LEVELS.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </div>
    </fieldset>
  );
}
