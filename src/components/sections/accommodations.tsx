import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { copy } from "@/data/copy";
import { getContent, type Locale } from "@/data/i18n";
import { formatRupiah, waBookingLink } from "@/lib/wa";
import { Reveal } from "@/components/reveal";
import { WaIcon } from "@/components/wa-icon";

export function Accommodations({ locale = "id" }: { locale?: Locale }) {
  const t = copy[locale];
  const { accommodations } = getContent(locale);
  const [vila, ...rest] = accommodations;

  return (
    <section id={t.anchors.rooms} className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <div>
              <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
                {t.rooms.eyebrow}
              </p>
              <h2 className="max-w-xl font-display text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
                {t.rooms.heading}
              </h2>
            </div>
            <Link
              href={t.paths.rooms}
              className="group/link flex items-center gap-2 text-sm font-medium tracking-wide text-ink transition-colors hover:text-sunset"
            >
              {t.rooms.viewAll}
              <ArrowRight
                strokeWidth={1.5}
                className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        {/* Unit unggulan: kartu lebar */}
        <Reveal>
          <article className="group grid overflow-hidden rounded-2xl bg-ivory lg:grid-cols-12">
            <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[30rem]">
              <Image
                src={vila.image.src}
                alt={vila.image.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="img-drift object-cover"
              />
              <span className="absolute top-5 left-5 rounded-full bg-ink/80 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ivory">
                {t.rooms.premiumBadge}
              </span>
            </div>
            <div className="flex flex-col justify-center p-7 md:p-10 lg:col-span-5 lg:p-12">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-mist">
                {vila.tagline}
              </p>
              <h3 className="mt-2 font-display text-3xl md:text-4xl">
                {vila.name}
              </h3>
              <p className="mt-1.5 text-sm text-mist">{vila.capacity}</p>
              <p className="mt-5 leading-relaxed text-mist">
                {vila.description}
              </p>
              <p className="mt-7 font-display text-3xl text-sunset md:text-4xl">
                {formatRupiah(vila.price)}
                <span className="ml-1 font-sans text-sm text-mist">
                  {t.rooms.perNight}
                </span>
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={waBookingLink(vila.waLabel ?? vila.name, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep"
                >
                  <WaIcon className="h-4 w-4" />
                  {t.rooms.book}
                </a>
                <Link
                  href={`${t.paths.rooms}#${vila.slug}`}
                  className="flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
                >
                  {t.rooms.detail}
                </Link>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Dua unit lainnya */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((unit, i) => (
            <Reveal key={unit.slug} delay={i * 0.12}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-ivory">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={unit.image.src}
                    alt={unit.image.alt}
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="img-drift object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-mist">
                    {unit.tagline}
                  </p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl">
                    {unit.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-mist">{unit.capacity}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">
                    {unit.description}
                  </p>
                  <p className="mt-6 font-display text-2xl text-sunset md:text-3xl">
                    {formatRupiah(unit.price)}
                    <span className="ml-1 font-sans text-sm text-mist">
                      {t.rooms.perNight}
                    </span>
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={waBookingLink(unit.waLabel ?? unit.name, locale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-sunset px-5 py-2.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep"
                    >
                      <WaIcon className="h-4 w-4" />
                      {t.rooms.book}
                    </a>
                    <Link
                      href={`${t.paths.rooms}#${unit.slug}`}
                      className="flex items-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
                    >
                      {t.rooms.detailShort}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
