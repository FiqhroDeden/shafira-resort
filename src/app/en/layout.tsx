import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaFloat } from "@/components/wa-float";

/** Kerangka halaman berbahasa Inggris (di bawah /en). */
export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Root layout memasang lang="id"; subtree /en mengoreksinya sebelum paint */}
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.lang='en'",
        }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ivory"
      >
        Skip to main content
      </a>
      <SiteHeader locale="en" />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter locale="en" />
      <WaFloat locale="en" />
    </>
  );
}
