import Image from "next/image";
import { copy } from "@/data/copy";
import { getContent, type Locale } from "@/data/i18n";
import { Reveal } from "@/components/reveal";

export function Intro({ locale = "id" }: { locale?: Locale }) {
  const t = copy[locale].intro;
  const { introImages } = getContent(locale);

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Teks */}
        <div className="lg:col-span-6 lg:pr-10">
          <Reveal>
            <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
              {t.eyebrow}
            </p>
            <h2 className="font-display text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              {t.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 leading-relaxed text-mist">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-sand-deep pt-8">
              {t.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl text-ink md:text-3xl">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-mist md:text-sm">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Foto asimetris: potret besar + lanskap kecil menimpa */}
        <div className="relative lg:col-span-6">
          <Reveal className="relative ml-auto w-[86%] md:w-[78%]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={introImages.portrait.src}
                alt={introImages.portrait.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 78vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal
            delay={0.15}
            className="absolute -bottom-10 left-0 w-[52%] md:w-[46%]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-ivory shadow-[0_18px_44px_rgba(11,34,40,0.2)]">
              <Image
                src={introImages.landscape.src}
                alt={introImages.landscape.alt}
                fill
                sizes="(min-width: 1024px) 24vw, 46vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
