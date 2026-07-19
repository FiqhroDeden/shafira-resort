import { ChevronDown } from "lucide-react";
import { copy } from "@/data/copy";
import { getContent, type Locale } from "@/data/i18n";
import { waGeneralLink } from "@/lib/wa";
import { Reveal } from "@/components/reveal";

/**
 * Tanya jawab dengan <details>/<summary> murni (tanpa JS) + schema
 * FAQPage — tipe structured data yang paling andal terindeks mesin
 * pencari dan model AI.
 */
export function Faq({ locale = "id" }: { locale?: Locale }) {
  const t = copy[locale];
  const { faqs } = getContent(locale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id={t.anchors.faq} className="bg-sand py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
              {t.faq.eyebrow}
            </p>
            <h2 className="font-display text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              {t.faq.heading}
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-mist">
              {t.faq.blurb}{" "}
              <a
                href={waGeneralLink(locale)}
                target="_blank"
                rel="noopener noreferrer"
                data-wa="faq"
                className="font-medium text-sunset underline decoration-sunset/40 underline-offset-2 transition-colors hover:text-sunset-deep"
              >
                WhatsApp
              </a>
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-sand-deep border-y border-sand-deep">
            {faqs.map((f, i) => (
              <Reveal key={f.question} delay={(i % 3) * 0.06}>
                <details className="group py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg text-ink transition-colors hover:text-sunset md:text-xl [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <ChevronDown
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-sunset transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="max-w-2xl pb-5 leading-relaxed text-mist">
                    {f.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
