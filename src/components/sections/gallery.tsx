import { copy } from "@/data/copy";
import { getContent, type Locale } from "@/data/i18n";
import { Reveal } from "@/components/reveal";
import { GalleryGrid } from "@/components/sections/gallery-grid";

export function Gallery({ locale = "id" }: { locale?: Locale }) {
  const t = copy[locale];
  const { galleryImages } = getContent(locale);

  return (
    <section id={t.anchors.gallery} className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
              {t.gallery.eyebrow}
            </p>
            <h2 className="font-display text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              {t.gallery.heading}
            </h2>
          </div>
        </Reveal>

        <GalleryGrid images={galleryImages} />
      </div>
    </section>
  );
}
