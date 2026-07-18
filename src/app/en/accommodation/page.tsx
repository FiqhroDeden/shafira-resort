import type { Metadata } from "next";
import { RoomsPage } from "@/components/rooms-page";

export const metadata: Metadata = {
  title: "Rooms & Rates",
  description:
    "Ways to stay at Shafira Resort on Memit Beach, Morella: Grand Villa Rp1,500,000/night, Double Room Rp500,000/night, and Beach Glamping Rp350,000/night. Book directly via WhatsApp.",
  alternates: {
    canonical: "/en/accommodation",
    languages: {
      id: "/akomodasi",
      en: "/en/accommodation",
      "x-default": "/akomodasi",
    },
  },
  openGraph: {
    locale: "en_US",
    title: "Rooms & Rates — Shafira Resort",
    description:
      "Grand Villa, Double Room, and Beach Glamping on Memit Beach, Morella. Book directly via WhatsApp.",
    url: "/en/accommodation",
  },
};

export default function AccommodationPageEN() {
  return <RoomsPage locale="en" />;
}
