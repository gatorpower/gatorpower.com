import * as Gator from '@/components/layout';

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Gator.Header />
      <Gator.Main>{children}</Gator.Main>
      <Gator.Footer />
    </>
  );
}