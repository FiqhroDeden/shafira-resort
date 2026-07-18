import Image from "next/image";
import { copy } from "@/data/copy";
import { getContent, type Locale } from "@/data/i18n";
import { waGeneralLink } from "@/lib/wa";
import { Reveal } from "@/components/reveal";
import { WaIcon } from "@/components/wa-icon";

export function Cta({ locale = "id" }: { locale?: Locale }) {
  const t = copy[locale].cta;
  const { ctaImage, site } = getContent(locale);

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[32rem] md:min-h-[36rem]">
        <Image
          src={ctaImage.src}
          alt={ctaImage.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
            <Reveal className="max-w-2xl">
              <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ivory/80">
                {t.eyebrow}
              </p>
              <h2 className="font-display text-3xl leading-[1.12] text-ivory sm:text-4xl md:text-5xl">
                {t.heading}
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-ivory/85">
                {t.sub}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href={waGeneralLink(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full bg-sunset px-8 py-4 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep"
                >
                  <WaIcon className="h-5 w-5" />
                  {t.button}
                </a>
                <span className="text-sm tracking-wide text-ivory/80">
                  +{site.whatsapp}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
