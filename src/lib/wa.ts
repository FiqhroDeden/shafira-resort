import { site } from "@/data/site";

/** Susun pesan pemesanan WhatsApp. Bagian kosong diisi "___" agar tamu tinggal melengkapi. */
export function bookingMessage(
  unitName: string,
  checkIn?: string,
  checkOut?: string,
  guests?: number | string,
) {
  const masuk = checkIn && checkIn.length > 0 ? formatDate(checkIn) : "___";
  const keluar = checkOut && checkOut.length > 0 ? formatDate(checkOut) : "___";
  const orang = guests ? String(guests) : "___";
  return `Halo Shafira Resort, saya ingin memesan ${unitName} untuk tanggal ${masuk} sampai ${keluar}, untuk ${orang} orang.`;
}

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function waBookingLink(unitName: string) {
  return waLink(bookingMessage(unitName));
}

/** Link WA umum tanpa unit tertentu */
export function waGeneralLink() {
  return waLink(
    "Halo Shafira Resort, saya ingin bertanya tentang menginap di resort.",
  );
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatRupiah(value: number) {
  return `Rp${new Intl.NumberFormat("id-ID").format(value)}`;
}
