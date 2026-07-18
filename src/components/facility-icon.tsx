import {
  CookingPot,
  Sailboat,
  Umbrella,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import type { Facility } from "@/data/site";

const icons = {
  boat: Sailboat,
  gazebo: Umbrella,
  canteen: UtensilsCrossed,
  cooking: CookingPot,
  wifi: Wifi,
} as const;

/** Satu set ikon line yang konsisten untuk fasilitas (lucide, stroke 1.5) */
export function FacilityIcon({
  name,
  className = "h-6 w-6",
}: {
  name: Facility["icon"];
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon strokeWidth={1.5} aria-hidden="true" className={className} />;
}
