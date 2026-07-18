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
      <SiteHeader locale="en" />
      <main>{children}</main>
      <SiteFooter locale="en" />
      <WaFloat locale="en" />
    </>
  );
}
