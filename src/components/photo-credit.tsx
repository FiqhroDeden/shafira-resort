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
  const label = locale === "en" ? "Photo" : "Foto";

  return (
    <p className="absolute right-3 top-3 z-10 max-w-[85%] rounded-full bg-ink/60 px-3 py-1 text-[0.65rem] leading-snug text-ivory/90 backdrop-blur-sm">
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {`${label}: ${source.author}`}
      </a>
      {source.license && source.licenseUrl && (
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
