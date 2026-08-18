import { AtSign, ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";

/**
 * Beaucoup de clients veulent parler à quelqu'un avant de payer.
 * WhatsApp est mis en avant : c'est un vrai chemin de conversion.
 */
export default function ContactBlock() {
  const others = [
    { href: `tel:${site.contact.phone.replace(/\s/g, "")}`, icon: Phone, label: "Téléphone", value: site.contact.phone },
    { href: `mailto:${site.contact.email}`, icon: Mail, label: "E-mail", value: site.contact.email },
    {
      href: `https://instagram.com/${site.contact.instagram}`,
      icon: AtSign,
      label: "Instagram",
      value: `@${site.contact.instagram}`,
    },
  ];

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-4 px-5.5 pt-11 pb-10">
      <h2 className="font-display text-[28px] leading-[1.1] text-navy sm:text-4xl">
        Une question avant de réserver ?
      </h2>
      <p className="mt-2 max-w-xl text-[15px] leading-[1.55] text-navy/72 text-pretty">
        Écrivez-nous, on répond en français. Niveau, météo, horaires, enfants : rien n&apos;est
        bête à demander.
      </p>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center gap-3.5 rounded-banner bg-orange px-5 py-4.5 text-cream shadow-orange transition-colors hover:bg-orange-dark"
      >
        <span className="flex size-[38px] flex-none items-center justify-center rounded-full bg-cream/20">
          <MessageCircle className="size-[19px]" aria-hidden />
        </span>
        <span className="flex-1">
          <span className="block text-base font-semibold">WhatsApp</span>
          <span className="block text-[13px] opacity-85">Réponse en général sous une heure</span>
        </span>
        <ChevronRight className="size-[18px]" aria-hidden />
      </a>

      <ul className="mt-3 flex flex-col gap-2.5">
        {others.map(({ href, icon: Icon, label, value }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3.5 rounded-soft bg-surface px-4.5 py-3.5 text-navy shadow-soft transition-colors hover:bg-sand-100"
            >
              <Icon className="size-[18px] flex-none text-blue" aria-hidden />
              <span className="flex-1">
                <span className="block text-[13px] font-semibold">{label}</span>
                <span className="block text-sm text-navy/70">{value}</span>
              </span>
              <ChevronRight className="size-4 text-navy/40" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
