import type { SiteImage } from "@/data/site";

/** Keterangan sumber foto pihak ketiga, ditempel di pojok kanan atas foto */
export function PhotoCredit({
  source,
  locale = "id",
}: {
  source: SiteImage["source"];
  locale?: "id" | "en";
}) {
  if (!source) return null;
  // Foto stok Pexels hanya ilustrasi, bukan foto tempat aslinya
  const isIllustration = source.license === "Pexels License";
  const label = isIllustration
    ? locale === "en"
      ? "Illustration"
      : "Foto ilustrasi"
    : locale === "en"
      ? "Photo"
      : "Foto";

  return (
    <p className="absolute right-3 top-3 z-10 max-w-[85%] rounded-full bg-ink/60 px-3 py-1 text-[0.65rem] leading-snug text-ivory/90 backdrop-blur-sm">
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {isIllustration
          ? `${label} · ${source.author}`
          : `${label}: ${source.author}`}
      </a>
      {!isIllustration && (
        <>
          {" · "}
          <a
            href={source.licenseUrl}
            target="_blank"
            rel="noopener noreferrer license"
            className="hover:underline"
          >
            {source.license}
          </a>
        </>
      )}
    </p>
  );
}
