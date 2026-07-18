"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { waGeneralLink } from "@/lib/wa";
import { WaIcon } from "@/components/wa-icon";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/akomodasi", label: "Akomodasi" },
  { href: "/#fasilitas", label: "Fasilitas" },
  { href: "/#sekitar", label: "Sekitar Morella" },
  { href: "/#galeri", label: "Galeri" },
];

/**
 * Header transparan di atas hero. Setiap halaman diawali blok gelap,
 * jadi teks ivory selalu terbaca.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40 text-ivory">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8 md:py-7">
        <Link
          href="/"
          className="font-display text-xl tracking-wide md:text-2xl"
          onClick={() => setOpen(false)}
        >
          Shafira<span className="text-sunset"> Resort</span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-ivory/85 transition-colors hover:text-ivory"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-ivory/35 px-5 py-2.5 text-sm tracking-wide transition-colors hover:border-sunset hover:bg-sunset"
          >
            <WaIcon className="h-4 w-4" />
            Pesan Sekarang
          </a>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/35 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X strokeWidth={1.5} className="h-5 w-5" />
          ) : (
            <Menu strokeWidth={1.5} className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Panel menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="mx-5 rounded-2xl border border-ivory/15 bg-ink-deep/95 p-6 backdrop-blur-sm lg:hidden"
      >
        <nav aria-label="Navigasi mobile" className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-display text-2xl text-ivory/90 transition-colors hover:bg-ivory/10 hover:text-ivory"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-sunset px-5 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep"
          >
            <WaIcon className="h-4 w-4" />
            Pesan via WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
