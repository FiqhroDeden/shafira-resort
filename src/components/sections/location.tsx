import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import { copy } from "@/data/copy";
import { getContent, type Locale } from "@/data/i18n";
import { introImages } from "@/data/site";
import { Reveal } from "@/components/reveal";

/* Peta lokasi tanpa iframe: foto asli + tautan langsung ke Google Maps */
export function Location({ locale = "id" }: { locale?: Locale }) {
  const t = copy[locale];
  const l = t.location;
  const { site } = getContent(locale);
  const { address, geo } = site;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${geo.lat},${geo.lng}`;

  return (
    <section id={t.anchors.location} className="relative overflow-hidden">
      <div className="relative min-h-[30rem] md:min-h-[34rem]">
        <Image
          src={introImages.portrait.src}
          alt={introImages.portrait.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/60" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
            <Reveal className="max-w-xl">
              <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ivory/80">
                {l.eyebrow}
              </p>
              <h2 className="font-display text-3xl leading-[1.12] text-ivory sm:text-4xl md:text-5xl">
                {l.heading}
              </h2>

              <address className="mt-6 flex gap-3 not-italic leading-relaxed text-ivory/85">
                <MapPin
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 text-sunset"
                />
                <span>
                  {address.beach}, {address.village}, {address.district},{" "}
                  {address.regency}, {address.province}
                </span>
              </address>

              <p className="mt-3 text-sm text-ivory/70">
                {l.coords}: {geo.lat}, {geo.lng} · {l.plusCode}: {site.plusCode}
              </p>
              <p className="mt-5 max-w-lg leading-relaxed text-ivory/85">{l.sub}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full bg-sunset px-7 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep"
                >
                  <MapPin strokeWidth={1.75} className="h-4 w-4" />
                  {l.mapButton}
                </a>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:border-sunset hover:bg-sunset"
                >
                  <Navigation strokeWidth={1.75} className="h-4 w-4" />
                  {l.directionsButton}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
