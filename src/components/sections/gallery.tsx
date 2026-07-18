import Image from "next/image";
import { copy } from "@/data/copy";
import { getContent, type Locale } from "@/data/i18n";
import { Reveal } from "@/components/reveal";

/* Pola mosaik 4 kolom (desktop): 1 foto besar, 1 foto tinggi, sisanya mengisi */
const spans = [
  "md:col-span-2 md:row-span-2",
  "",
  "md:row-span-2",
  "",
  "md:col-span-2",
  "col-span-2",
];

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

        <div className="grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[13rem] md:grid-cols-4 md:gap-4">
          {galleryImages.map((img, i) => (
            <Reveal
              key={img.src}
              delay={(i % 3) * 0.08}
              className={`${spans[i] ?? ""} ${i === 0 ? "col-span-2" : ""}`}
            >
              <figure className="group relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="img-drift object-cover"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
