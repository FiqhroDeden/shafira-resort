import Image from "next/image";
import { MapPin } from "lucide-react";
import { copy } from "@/data/copy";
import { getContent, type Locale } from "@/data/i18n";
import { Reveal } from "@/components/reveal";

export function Maluku({ locale = "id" }: { locale?: Locale }) {
  const t = copy[locale];
  const { malukuDestinations } = getContent(locale);

  return (
    <section
      id={t.anchors.maluku}
      className="bg-ink py-24 text-ivory md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
              {t.maluku.eyebrow}
            </p>
            <h2 className="font-display text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              {t.maluku.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-ivory/70">
              {t.maluku.blurb}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {malukuDestinations.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={d.image.src}
                    alt={d.image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
                    className="img-drift object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="mb-2 flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ivory/80">
                    <MapPin strokeWidth={1.5} className="h-3.5 w-3.5" />
                    {d.distance}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl">{d.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/75">
                    {d.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
