import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { accommodations } from "@/data/site";
import { formatRupiah, waBookingLink } from "@/lib/wa";
import { BookingBar } from "@/components/booking-bar";
import { Reveal } from "@/components/reveal";
import { WaIcon } from "@/components/wa-icon";

export const metadata: Metadata = {
  title: "Akomodasi & Harga",
  description:
    "Pilihan menginap di Shafira Resort, Pantai Memit Morella: Vila Besar Rp1.500.000/malam, Kamar Rp500.000/malam, dan Glamping Rp350.000/malam. Pesan langsung via WhatsApp.",
  alternates: { canonical: "/akomodasi" },
  openGraph: {
    title: "Akomodasi & Harga — Shafira Resort",
    description:
      "Vila Besar, Kamar, dan Glamping di tepi Pantai Memit, Morella. Pesan langsung via WhatsApp.",
    url: "/akomodasi",
  },
};

export default function AkomodasiPage() {
  return (
    <>
      {/* Pembuka gelap agar header transparan tetap terbaca */}
      <section className="bg-ink pt-32 pb-16 text-ivory md:pt-44 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
              Akomodasi &amp; Harga
            </p>
            <h1 className="max-w-3xl font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
              Pilih cara Anda menginap di tepi Memit
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-ivory/75">
              Tiga tipe unit dengan harga yang jelas — semuanya beberapa
              langkah dari air. Pesan langsung ke pemilik lewat WhatsApp,
              tanpa perantara dan tanpa biaya tambahan.
            </p>
          </Reveal>
        </div>
      </section>

      {accommodations.map((unit, i) => (
        <section
          key={unit.slug}
          id={unit.slug}
          className={`scroll-mt-24 py-20 md:py-28 ${i % 2 === 1 ? "bg-sand" : ""}`}
        >
          <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-14">
            {/* Foto: utama + tiga pendukung */}
            <div
              className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <Reveal>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={unit.image.src}
                    alt={unit.image.alt}
                    fill
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="img-drift object-cover"
                  />
                </div>
              </Reveal>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {unit.gallery.map((img, j) => (
                  <Reveal key={img.src} delay={j * 0.08}>
                    <div className="group relative aspect-square overflow-hidden rounded-xl">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 18vw, 30vw"
                        className="img-drift object-cover"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Detail */}
            <div
              className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}
            >
              <Reveal>
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-mist">
                  {unit.tagline}
                </p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">
                  {unit.name}
                </h2>
                <p className="mt-1.5 text-sm text-mist">{unit.capacity}</p>
                <p className="mt-6 font-display text-3xl text-sunset md:text-4xl">
                  {formatRupiah(unit.price)}
                  <span className="ml-1 font-sans text-sm text-mist">
                    / malam
                  </span>
                </p>
                <p className="mt-6 leading-relaxed text-mist">
                  {unit.description}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-7 space-y-3">
                  {unit.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm md:text-base">
                      <Check
                        strokeWidth={2}
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-sunset"
                      />
                      <span className="text-ink/85">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waBookingLink(unit.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-sunset px-7 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep"
                >
                  <WaIcon className="h-4 w-4" />
                  Pesan {unit.name}
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Penutup: susun pesan pemesanan */}
      <section className="bg-ink py-20 text-ivory md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
                Susun Pesan Anda
              </p>
              <h2 className="font-display text-3xl leading-[1.12] sm:text-4xl">
                Sudah menentukan pilihan?
              </h2>
              <p className="mt-4 leading-relaxed text-ivory/75">
                Isi tanggal dan jumlah tamu — pesan WhatsApp akan tersusun
                otomatis dan langsung terkirim ke pemilik resort.
              </p>
            </div>
            <BookingBar />
          </Reveal>
        </div>
      </section>
    </>
  );
}
