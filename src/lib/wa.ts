import { site } from "@/data/site";
import type { Locale } from "@/data/i18n";

/**
 * Susun pesan pemesanan WhatsApp sesuai bahasa pengunjung.
 * Bagian kosong diisi "___" agar tamu tinggal melengkapi.
 */
export function bookingMessage(
  unitName: string,
  checkIn?: string,
  checkOut?: string,
  guests?: number | string,
  locale: Locale = "id",
) {
  const masuk =
    checkIn && checkIn.length > 0 ? formatDate(checkIn, locale) : "___";
  const keluar =
    checkOut && checkOut.length > 0 ? formatDate(checkOut, locale) : "___";
  const orang = guests ? String(guests) : "___";
  if (locale === "en") {
    return `Hello Shafira Resort, I would like to book the ${unitName} from ${masuk} to ${keluar}, for ${orang} guest(s).`;
  }
  return `Halo Shafira Resort, saya ingin memesan ${unitName} untuk tanggal ${masuk} sampai ${keluar}, untuk ${orang} orang.`;
}

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function waBookingLink(unitName: string, locale: Locale = "id") {
  return waLink(bookingMessage(unitName, undefined, undefined, undefined, locale));
}

/** Link WA umum tanpa unit tertentu */
export function waGeneralLink(locale: Locale = "id") {
  return waLink(
    locale === "en"
      ? "Hello Shafira Resort, I have a question about staying at the resort."
      : "Halo Shafira Resort, saya ingin bertanya tentang menginap di resort.",
  );
}

function formatDate(iso: string, locale: Locale) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatRupiah(value: number) {
  return `Rp${new Intl.NumberFormat("id-ID").format(value)}`;
}
