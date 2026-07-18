import Link from "next/link";
import { AtSign, Clock, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { waGeneralLink } from "@/lib/wa";
import { WaIcon } from "@/components/wa-icon";

export function SiteFooter() {
  const { address } = site;

  return (
    <footer id="kontak" className="bg-ink-deep text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-5">
          <p className="font-display text-2xl">
            Shafira<span className="text-sunset"> Resort</span>
          </p>
          <p className="mt-4 max-w-sm leading-relaxed text-ivory/65">
            {site.tagline}. Resort pantai keluarga di pesisir utara Pulau
            Ambon — menginap, berlayar kecil-kecilan, dan menonton sunset dari
            gazebo.
          </p>
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-sunset px-6 py-3 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep"
          >
            <WaIcon className="h-4 w-4" />
            +{site.whatsapp}
          </a>
        </div>

        {/* Alamat & jam */}
        <div className="lg:col-span-4">
          <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ivory/50">
            Alamat &amp; Jam
          </h2>
          <address className="mt-5 flex gap-3 not-italic leading-relaxed text-ivory/80">
            <MapPin
              strokeWidth={1.5}
              aria-hidden="true"
              className="mt-1 h-4 w-4 shrink-0 text-sunset"
            />
            <span>
              {address.beach}, {address.village}
              <br />
              {address.district}, {address.regency}
              <br />
              {address.province}, Indonesia
            </span>
          </address>
          <p className="mt-4 flex gap-3 leading-relaxed text-ivory/80">
            <Clock
              strokeWidth={1.5}
              aria-hidden="true"
              className="mt-1 h-4 w-4 shrink-0 text-sunset"
            />
            <span>{site.hours}</span>
          </p>
          {site.instagram ? (
            <a
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-3 text-ivory/80 transition-colors hover:text-ivory"
            >
              <AtSign
                strokeWidth={1.5}
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-sunset"
              />
              @{site.instagram}
            </a>
          ) : (
            /* TODO: isi site.instagram di src/data/site.ts agar tautan tampil */
            <p className="mt-4 flex items-center gap-3 text-ivory/50">
              <AtSign
                strokeWidth={1.5}
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
              />
              Instagram segera hadir
            </p>
          )}
        </div>

        {/* Navigasi */}
        <nav aria-label="Navigasi footer" className="lg:col-span-3">
          <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ivory/50">
            Jelajahi
          </h2>
          <ul className="mt-5 space-y-3">
            {[
              { href: "/", label: "Beranda" },
              { href: "/akomodasi", label: "Akomodasi & Harga" },
              { href: "/#fasilitas", label: "Fasilitas" },
              { href: "/#sekitar", label: "Sekitar Morella" },
              { href: "/#galeri", label: "Galeri" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-ivory/80 transition-colors hover:text-ivory"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} Shafira Resort, Negeri Morella.
          </p>
          <p>
            Foto sementara dari{" "}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-ivory/30 underline-offset-2 transition-colors hover:text-ivory/70"
            >
              Pexels
            </a>{" "}
            — akan diganti foto asli resort.
          </p>
        </div>
      </div>
    </footer>
  );
}
