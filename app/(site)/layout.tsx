import LanguageBootMask from "@/app/components/LanguageBootMask";
import SeoUpdater from "@/app/components/SeoUpdater";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LanguageBootMask />
      <SeoUpdater />
      {children}
    </>
  );
}
