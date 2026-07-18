import Image from "next/image";
import { heroImage } from "@/data/site";
import { BookingBar } from "@/components/booking-bar";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section aria-label="Sambutan Shafira Resort">
      <div className="relative min-h-[86svh] overflow-hidden">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay agar teks di atas foto selalu kontras */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/75"
        />

        <div className="absolute inset-x-0 bottom-0 pb-28 md:pb-36">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ivory/80 md:text-xs">
                Pantai Memit · Negeri Morella · Maluku Tengah
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="max-w-3xl font-display text-4xl leading-[1.08] text-ivory sm:text-5xl md:text-6xl lg:text-7xl">
                Laut jernih <em className="text-sunset">Morella</em>,
                tepat di depan pintu Anda
              </h1>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/85 md:text-lg">
                Vila, kamar, dan glamping di tepi pantai pesisir utara Pulau
                Ambon — lengkap dengan perahu, gazebo, dan sunset yang tidak
                perlu dicari.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Booking bar menimpa tepi bawah hero */}
      <div className="relative z-10 mx-auto -mt-16 max-w-5xl px-5 md:-mt-14 md:px-8">
        <Reveal delay={0.3}>
          <BookingBar />
        </Reveal>
      </div>
    </section>
  );
}
