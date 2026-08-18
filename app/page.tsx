import { classes } from "@/lib/classes";
import ClassCard from "@/components/ClassCard";
import ContactBlock from "@/components/ContactBlock";
import Hero from "@/components/Hero";
import Localisation from "@/components/Localisation";
import Reveal from "@/components/Reveal";
import Slider from "@/components/Slider";
import StickyCta from "@/components/StickyCta";

/** Une seule page, un seul récit : héros → séduction → cours → lieu → contact. */
export default function Home() {
  return (
    <main>
      <Hero />
      <Slider />

      <section id="cours" className="mx-auto max-w-5xl scroll-mt-4 px-5 py-14 sm:py-20">
        <h2 className="font-display text-3xl text-ocean-900 sm:text-4xl">Nos cours</h2>
        <p className="mt-2 max-w-xl text-ocean-800/75">
          Trois formules, du premier essai au stage complet. Tout le matériel est fourni.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((surfClass, i) => (
            <Reveal key={surfClass.slug} delay={i * 0.08}>
              <ClassCard surfClass={surfClass} />
            </Reveal>
          ))}
        </div>
      </section>

      <Localisation />
      <ContactBlock />
      <StickyCta href="#cours" label="Réserver un cours" />
    </main>
  );
}
