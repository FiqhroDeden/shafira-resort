import { testimonials } from "@/data/site";
import { Reveal } from "@/components/reveal";

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
              Kata Tamu Kami
            </p>
            <h2 className="font-display text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              Yang mereka bawa pulang dari Memit
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 2) * 0.1}
              className={i % 2 === 1 ? "md:translate-y-10" : ""}
            >
              <figure className="flex h-full flex-col rounded-2xl border border-sand-deep bg-sand/60 p-8 md:p-10">
                <span
                  aria-hidden="true"
                  className="font-display text-6xl leading-none text-sunset/70"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1">
                  <p className="font-display text-lg leading-relaxed text-ink md:text-xl">
                    {t.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-7 border-t border-sand-deep pt-5">
                  <span className="block font-medium text-ink">{t.name}</span>
                  <span className="mt-0.5 block text-sm text-mist">
                    {t.origin}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
