"use client";

import { useState } from "react";
import { accommodations } from "@/data/site";
import { bookingMessage, waLink } from "@/lib/wa";
import { WaIcon } from "@/components/wa-icon";

/**
 * Booking inquiry: menyusun pesan WhatsApp berisi unit, tanggal, dan jumlah
 * tamu — lalu membuka wa.me. Tidak ada data yang dikirim ke server mana pun.
 */
export function BookingBar({
  defaultUnit,
  variant = "overlay",
}: {
  defaultUnit?: string;
  variant?: "overlay" | "panel";
}) {
  const [unit, setUnit] = useState(defaultUnit ?? accommodations[0].name);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const url = waLink(bookingMessage(unit, checkIn, checkOut, guests));
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const labelCls =
    "text-[0.68rem] font-medium uppercase tracking-[0.14em] text-mist";
  const fieldCls =
    "w-full rounded-lg border border-sand-deep bg-ivory px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sunset";

  return (
    <form
      onSubmit={submit}
      aria-label="Susun pesan pemesanan WhatsApp"
      className={
        variant === "overlay"
          ? "grid grid-cols-1 gap-4 rounded-2xl border border-sand-deep bg-ivory p-5 shadow-[0_24px_60px_rgba(11,34,40,0.18)] sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.7fr_auto] lg:items-end lg:gap-5 lg:p-6"
          : "grid grid-cols-1 gap-4 rounded-2xl border border-sand-deep bg-sand p-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.7fr_auto] lg:items-end lg:gap-5 lg:p-6"
      }
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bb-unit" className={labelCls}>
          Tipe menginap
        </label>
        <select
          id="bb-unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className={fieldCls}
        >
          {accommodations.map((a) => (
            <option key={a.slug} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bb-in" className={labelCls}>
          Check-in
        </label>
        <input
          id="bb-in"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className={fieldCls}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bb-out" className={labelCls}>
          Check-out
        </label>
        <input
          id="bb-out"
          type="date"
          value={checkOut}
          min={checkIn || undefined}
          onChange={(e) => setCheckOut(e.target.value)}
          className={fieldCls}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bb-guests" className={labelCls}>
          Tamu
        </label>
        <input
          id="bb-guests"
          type="number"
          min={1}
          max={30}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className={fieldCls}
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sunset-deep sm:col-span-2 lg:col-span-1"
      >
        <WaIcon className="h-4 w-4" />
        Pesan via WhatsApp
      </button>
    </form>
  );
}
