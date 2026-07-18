"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { copy } from "@/data/copy";
import type { Locale } from "@/data/i18n";
import { waGeneralLink } from "@/lib/wa";
import { WaIcon } from "@/components/wa-icon";

/** Peta halaman ID ↔ EN untuk switcher bahasa */
const counterparts: Record<string, string> = {
  "/": "/en",
  "/akomodasi": "/en/accommodation",
  "/en": "/",
  "/en/accommodation": "/akomodasi",
};

/**
 * Header transparan di atas hero. Setiap halaman diawali blok gelap,
 * jadi teks ivory selalu terbaca.
 */
export function SiteHeader({ locale = "id" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = copy[locale];

  const navLinks = [
    { href: t.paths.home, label: t.nav.home },
    { href: t.paths.rooms, label: t.nav.rooms },
    { href: `${t.paths.home}#${t.anchors.facilities}`, label: t.nav.facilities },
    { href: `${t.paths.home}#${t.anchors.around}`, label: t.nav.around },
    { href: `${t.paths.home}#${t.anchors.gallery}`, label: t.nav.gallery },
  ];

  const switchHref =
    counterparts[pathname] ?? (locale === "id" ? "/en" : "/");
  const switchLabel = locale === "id" ? "EN" : "ID";
  const switchTitle =
    locale === "id" ? "Read in English" : "Baca dalam Bahasa Indonesia";

  return (
    <header className="absolute inset-x-0 top-0 z-40 text-ivory">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8 md:py-7">
        <Link
          href={t.paths.home}
          className="font-display text-xl tracking-wide md:text-2xl"
          onClick={() => setOpen(false)}
        >
          Shafira<span className="text-sunset"> Resort</span>
        </Link>

        <div className="flex items-center gap-3">
          <nav
            aria-label={t.nav.mainNavLabel}
            className="hidden items-center gap-8 lg:flex"
          >
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
              href={waGeneralLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-ivory/35 px-5 py-2.5 text-sm tracking-wide transition-colors hover:border-sunset hover:bg-sunset"
            >
              <WaIcon className="h-4 w-4" />
              {t.nav.cta}
            </a>
          </nav>

          {/* Switcher bahasa */}
          <Link
            href={switchHref}
            title={switchTitle}
            className="rounded-full border border-ivory/35 px-3.5 py-2 text-xs font-medium tracking-[0.14em] transition-colors hover:border-sunset hover:bg-sunset"
          >
            {switchLabel}
          </Link>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/35 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X strokeWidth={1.5} className="h-5 w-5" />
            ) : (
              <Menu strokeWidth={1.5} className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Panel menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="mx-5 rounded-2xl border border-ivory/15 bg-ink-deep/95 p-6 backdrop-blur-sm lg:hidden"
      >
        <nav aria-label={t.nav.mobileNavLabel} className="flex flex-col gap-1">
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
            href={waGeneralLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-sunset px-5 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep"
          >
            <WaIcon className="h-4 w-4" />
            {t.nav.ctaLong}
          </a>
        </nav>
      </div>
    </header>
  );
}
