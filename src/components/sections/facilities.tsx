import { facilities } from "@/data/site";
import { FacilityIcon } from "@/components/facility-icon";
import { Reveal } from "@/components/reveal";

export function Facilities() {
  return (
    <section id="fasilitas" className="bg-ink py-24 text-ivory md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
              Fasilitas Resort
            </p>
            <h2 className="font-display text-3xl leading-[1.12] sm:text-4xl md:text-[2.75rem]">
              Semua yang perlu ada, tidak lebih
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ivory/70">
              Kami tidak menjanjikan kolam tak berujung atau spa bertaraf
              bintang. Yang kami siapkan adalah hal-hal yang benar-benar
              dipakai di pantai: perahu, gazebo, dapur, dan sinyal yang tetap
              hidup.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-ivory/12 border-y border-ivory/12">
            {facilities.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <li className="flex gap-5 py-6 md:gap-7 md:py-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ivory/20 text-sunset">
                    <FacilityIcon name={f.icon} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ivory/65 md:text-base">
                      {f.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
