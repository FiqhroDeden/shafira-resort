import Image from "next/image";
import { copy } from "@/data/copy";
import { getContent, type Locale } from "@/data/i18n";
import { BookingBar } from "@/components/booking-bar";
import { Reveal } from "@/components/reveal";

export function Hero({ locale = "id" }: { locale?: Locale }) {
  const t = copy[locale].hero;
  const { heroImage } = getContent(locale);

  return (
    <section aria-label={t.ariaLabel}>
      <div className="relative min-h-[86svh] overflow-hidden">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay agar teks kontras tanpa menggelapkan seluruh foto:
            atas untuk navigasi, bawah + kiri untuk area teks */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 via-20% to-transparent to-35%"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 via-45% to-transparent to-80%"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-ink/70 via-ink/30 via-45% to-transparent to-70% md:block"
        />

        <div className="absolute inset-x-0 bottom-0 pb-28 md:pb-36">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <p className="mb-4 hero-text-shadow text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-ivory md:text-xs">
                {t.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="hero-text-shadow max-w-3xl font-display text-4xl leading-[1.08] text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
                {t.h1pre}
                <em className="text-sunset-light">{t.h1em}</em>
                {t.h1post}
              </h1>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="hero-text-shadow mt-5 max-w-xl text-base leading-relaxed text-ivory md:text-lg">
                {t.sub}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Booking bar menimpa tepi bawah hero */}
      <div className="relative z-10 mx-auto -mt-16 max-w-5xl px-5 md:-mt-14 md:px-8">
        <Reveal delay={0.3}>
          <BookingBar locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
