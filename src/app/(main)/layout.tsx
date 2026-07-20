import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaFloat } from "@/components/wa-float";

/** Kerangka halaman berbahasa Indonesia (default, di root URL). */
export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ivory"
      >
        Lewati ke konten utama
      </a>
      <SiteHeader locale="id" />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter locale="id" />
      <WaFloat locale="id" />
    </>
  );
}
