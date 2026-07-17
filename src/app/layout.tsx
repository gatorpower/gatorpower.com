import type { Metadata } from 'next';
import * as Gator from '@/components/layout';
import './globals.css';

const YEARS_EXPERIENCE = new Date().getFullYear() - 1999;

export const metadata: Metadata = {
  metadataBase: new URL('https://gatorpower.com'),
  title: {
    default: 'Gatorpower | Full-Stack Web Development',
    template: '%s | Gatorpower',
  },
  description: `Gatorpower builds for the web — React, TypeScript, GraphQL, Node, Java, and SQL. ${YEARS_EXPERIENCE} years of full-stack workmanship across government, healthcare, and e-commerce.`,
  openGraph: {
    title: 'Gatorpower — Full-Stack Web Development',
    description: `React, TypeScript, GraphQL, Node, Java, and SQL. ${YEARS_EXPERIENCE} years of full-stack workmanship across government, healthcare, and e-commerce.`,
    url: 'https://gatorpower.com',
    siteName: 'Gatorpower',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Gator.Header />
        <Gator.Main>{children}</Gator.Main>
        <Gator.Footer />
      </body>
    </html>
  );
}