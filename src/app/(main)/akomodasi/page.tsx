import type { Metadata } from "next";
import { RoomsPage } from "@/components/rooms-page";

export const metadata: Metadata = {
  title: "Akomodasi & Harga",
  description:
    "Pilihan menginap di Shafira Resort, Pantai Memit Morella: Vila Besar Rp1.500.000/malam, Kamar Rp500.000/malam, dan Glamping Rp350.000/malam. Pesan langsung via WhatsApp.",
  alternates: {
    canonical: "/akomodasi",
    languages: {
      id: "/akomodasi",
      en: "/en/accommodation",
      "x-default": "/akomodasi",
    },
  },
  openGraph: {
    title: "Akomodasi & Harga — Shafira Resort",
    description:
      "Vila Besar, Kamar, dan Glamping di tepi Pantai Memit, Morella. Pesan langsung via WhatsApp.",
    url: "/akomodasi",
  },
};

export default function AkomodasiPage() {
  return <RoomsPage locale="id" />;
}
