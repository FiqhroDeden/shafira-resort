import { copy } from "@/data/copy";
import type { Locale } from "@/data/i18n";
import { waGeneralLink } from "@/lib/wa";
import { WaIcon } from "@/components/wa-icon";

/** Tombol WhatsApp mengambang — tampil di semua halaman */
export function WaFloat({ locale = "id" }: { locale?: Locale }) {
  return (
    <a
      href={waGeneralLink(locale)}
      target="_blank"
      rel="noopener noreferrer"
      data-wa="float"
      aria-label={copy[locale].waFloatLabel}
      className="fixed right-5 bottom-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-sunset text-ivory shadow-[0_10px_28px_rgba(18,51,59,0.32)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-sunset-deep md:right-7 md:bottom-7"
    >
      <WaIcon className="h-6 w-6" />
    </a>
  );
}
