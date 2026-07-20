import { PlaneLanding, CarFront, Map, Ticket, ArrowUpRight } from "lucide-react";
import { copy } from "@/data/copy";
import type { Locale } from "@/data/i18n";
import { waLink } from "@/lib/wa";
import { Reveal } from "@/components/reveal";
import { WaIcon } from "@/components/wa-icon";

const icons = {
  pickup: PlaneLanding,
  rental: CarFront,
  tour: Map,
  ticket: Ticket,
} as const;

export function Services({ locale = "id" }: { locale?: Locale }) {
  const t = copy[locale];

  return (
    <section id={t.anchors.services} className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
              {t.services.eyebrow}
            </p>
            <h2 className="font-display text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              {t.services.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-mist">{t.services.blurb}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 2) * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-sand-deep bg-ivory p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-sand-deep text-sunset">
                    <Icon strokeWidth={1.5} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">
                    {s.desc}
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={waLink(s.waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-wa={`service-${s.icon}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-sunset px-5 py-2.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep"
                    >
                      <WaIcon className="h-4 w-4" />
                      {s.cta}
                    </a>
                    {s.extUrl && (
                      <a
                        href={s.extUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 text-sm font-medium text-ink/70 transition-colors hover:text-sunset"
                      >
                        {s.extLabel}
                        <ArrowUpRight strokeWidth={1.5} className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
