"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import type { SiteImage } from "@/data/site";

/* Pola mosaik 4 kolom (desktop): 1 foto besar, 1 tile tinggi (video potret), sisanya mengisi */
const spans = [
  "md:col-span-2 md:row-span-2",
  "",
  "row-span-2",
  "",
  "md:col-span-2",
  "",
  "col-span-2 md:col-span-1",
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
  const gridRef = useRef<HTMLDivElement>(null);

  function preload(src: string) {
    if (preloaded.current.has(src)) return;
    preloaded.current.add(src);
    new window.Image().src = optimized(src);
  }

  // Touch/tanpa-hover: muat foto pertama saat galeri mendekati viewport
  useEffect(() => {
    const el = gridRef.current;
    const first = images[0]?.src;
    if (!el || !first) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          preload(first);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  async function open(img: SiteImage) {
    if (img.video) {
      setActive(img);
      dialogRef.current?.showModal();
      return;
    }
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
      <div
        ref={gridRef}
        className="grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[13rem] md:grid-cols-4 md:gap-4"
      >
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
              aria-label={`${img.video ? "Putar video" : "Perbesar foto"}: ${img.alt}`}
              className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="img-drift object-cover"
              />
              {img.video && (
                <span className="absolute inset-0 grid place-items-center bg-ink/15 transition-colors group-hover:bg-ink/25">
                  <span className="grid size-14 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition-transform group-hover:scale-105">
                    <Play className="ml-0.5 size-6 fill-current" aria-hidden />
                  </span>
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClick={() => dialogRef.current?.close()}
        onClose={() => setActive(null)}
        className="m-auto max-w-none cursor-zoom-out bg-transparent p-4 backdrop:bg-ink/85"
      >
        {active?.video ? (
          <video
            key={active.video}
            src={active.video}
            poster={active.src}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            aria-label={active.alt}
            className="max-h-[90vh] max-w-[92vw] cursor-auto rounded-lg shadow-2xl"
          />
        ) : active && (
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
