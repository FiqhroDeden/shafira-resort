import Link from "next/link";
import { waGeneralLink } from "@/lib/wa";
import { WaIcon } from "@/components/wa-icon";

export default function NotFound() {
  return (
    <section className="flex min-h-[92svh] items-center bg-ink text-ivory">
      <div className="mx-auto max-w-3xl px-5 py-32 text-center md:px-8">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-sunset">
          Kesalahan 404
        </p>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
          Halaman ini hanyut terbawa arus
        </h1>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-ivory/75">
          Alamat yang Anda tuju tidak ada di peta kami. Kembali ke pantai —
          atau tanyakan langsung lewat WhatsApp.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-sunset px-7 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep"
          >
            Kembali ke Beranda
          </Link>
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-ivory/30 px-7 py-3.5 text-sm font-medium tracking-wide transition-colors hover:border-sunset hover:bg-sunset"
          >
            <WaIcon className="h-4 w-4" />
            Chat WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
