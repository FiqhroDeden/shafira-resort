import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaFloat } from "@/components/wa-float";

/** Kerangka halaman berbahasa Indonesia (default, di root URL). */
export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader locale="id" />
      <main>{children}</main>
      <SiteFooter locale="id" />
      <WaFloat locale="id" />
    </>
  );
}
