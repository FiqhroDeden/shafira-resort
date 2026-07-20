"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import type { SiteImage } from "@/data/site";

/* Pola mosaik 4 kolom (desktop): 1 foto besar, 1 foto tinggi, sisanya mengisi */
const spans = [
  "md:col-span-2 md:row-span-2",
  "",
  "md:row-span-2",
  "",
  "md:col-span-2",
  "col-span-2",
];

/** Versi teroptimasi next/image (webp, jauh lebih kecil dari sumber asli) */
const optimized = (src: string) =>
  src.startsWith("/")
    ? `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`
    : src;

/** Grid galeri + lightbox pakai <dialog> native (ESC & klik latar untuk tutup) */
export function GalleryGrid({ images }: { images: SiteImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<SiteImage | null>(null);
  const preloaded = useRef<Set<string>>(new Set());

  function preload(src: string) {
    if (preloaded.current.has(src)) return;
    preloaded.current.add(src);
    new window.Image().src = optimized(src);
  }

  async function open(img: SiteImage) {
    // Muat penuh dulu agar tidak sempat menampilkan foto sebelumnya
    const pre = new window.Image();
    pre.src = optimized(img.src);
    try {
      await pre.decode();
    } catch {
      /* abaikan; tetap buka walau decode gagal */
    }
    setActive(img);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <div className="grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[13rem] md:grid-cols-4 md:gap-4">
        {images.map((img, i) => (
          <Reveal
            key={img.src}
            delay={(i % 3) * 0.08}
            className={`${spans[i] ?? ""} ${i === 0 ? "col-span-2" : ""}`}
          >
            <button
              type="button"
              onClick={() => open(img)}
              onMouseEnter={() => preload(img.src)}
              onFocus={() => preload(img.src)}
              aria-label={`Perbesar foto: ${img.alt}`}
              className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="img-drift object-cover"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClick={() => dialogRef.current?.close()}
        className="m-auto max-w-none cursor-zoom-out bg-transparent p-4 backdrop:bg-ink/85"
      >
        {active && (
          // eslint-disable-next-line @next/next/no-img-element -- ukuran dinamis, dimuat hanya saat diklik
          <img
            key={active.src}
            src={optimized(active.src)}
            alt={active.alt}
            className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />
        )}
      </dialog>
    </>
  );
}
