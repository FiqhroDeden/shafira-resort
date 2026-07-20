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

/** Grid galeri + lightbox pakai <dialog> native (ESC & klik latar untuk tutup) */
export function GalleryGrid({ images }: { images: SiteImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<SiteImage | null>(null);

  function open(img: SiteImage) {
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
            src={active.src}
            alt={active.alt}
            className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />
        )}
      </dialog>
    </>
  );
}
