"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Pelacakan klik WhatsApp untuk seluruh situs.
 *
 * Alih-alih menempel handler di tiap tombol, satu listener global menangkap
 * klik pada link mana pun menuju wa.me (mengambang, footer, CTA, FAQ, 404).
 * Tombol form BookingBar memakai window.open — dia memanggil track() sendiri.
 *
 * Event yang dikirim: "whatsapp_click" dengan konteks lokasi, halaman, bahasa.
 * Data ini muncul di tab Events dashboard Vercel Web Analytics.
 */
export function WaTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.(
        'a[href*="wa.me"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      track("whatsapp_click", {
        location: anchor.dataset.wa ?? "other",
        // Unit yang diminati (bila klik berasal dari kartu kamar tertentu)
        unit: anchor.dataset.waUnit ?? "",
        page: window.location.pathname,
        locale: document.documentElement.lang || "id",
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
