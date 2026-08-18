import { AtSign, Mail, MessageCircle, Phone } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";

/**
 * Beaucoup de clients veulent parler à quelqu'un avant de payer.
 * Ce bloc est un vrai chemin de conversion, pas une politesse de bas de page.
 */
export default function ContactBlock() {
  const links = [
    {
      href: whatsappUrl("Bonjour ! J'aimerais des informations sur vos cours de surf."),
      icon: MessageCircle,
      label: "WhatsApp",
      detail: "Réponse en général sous une heure",
      primary: true,
    },
    { href: `tel:${site.contact.phone.replace(/\s/g, "")}`, icon: Phone, label: "Téléphone", detail: site.contact.phone },
    { href: `mailto:${site.contact.email}`, icon: Mail, label: "E-mail", detail: site.contact.email },
    {
      href: `https://instagram.com/${site.contact.instagram}`,
      icon: AtSign,
      label: "Instagram",
      detail: `@${site.contact.instagram}`,
    },
  ];

  return (
    <section id="contact" className="bg-ocean-50 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl scroll-mt-4 px-5">
        <h2 className="font-display text-3xl text-ocean-900 sm:text-4xl">
          Une question avant de réserver ?
        </h2>
        <p className="mt-2 max-w-xl text-ocean-800/75">
          Écrivez-nous, on répond en français. Niveau, météo, horaires, enfants : rien n&apos;est
          bête à demander.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {links.map(({ href, icon: Icon, label, detail, primary }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex min-h-16 items-center gap-3.5 rounded-2xl p-4 transition-colors ${
                  primary
                    ? "bg-ocean-600 text-white hover:bg-ocean-800"
                    : "bg-white text-ocean-900 ring-1 ring-ocean-900/8 hover:bg-white/70"
                }`}
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                <span>
                  <span className="block font-semibold">{label}</span>
                  <span className={`block text-sm ${primary ? "text-white/80" : "text-ocean-800/70"}`}>
                    {detail}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
